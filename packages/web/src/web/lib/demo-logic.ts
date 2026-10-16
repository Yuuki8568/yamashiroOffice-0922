/**
 * 体験デモ「月末の確認作業を、サンプルで体験」の照合ロジック。
 *
 * - 生成AIは使わない。決まったルールだけで照合する。
 * - 推測で金額を選ばない、黙って重複を除去しない。
 * - 異常なデータは「保留」として結果とは別に列挙し、正常候補に混ぜない。
 */

export interface OrderRow {
  id: string;
  name: string;
  amount: number | null;
  owner: string;
}

export interface CompletionRow {
  id: string;
  amount: number | null;
}

export type CaseKind = "candidate" | "mismatch" | "no-record";

export interface CaseResult {
  id: string;
  kind: CaseKind;
  reason: string;
  owner: string;
  next: string;
  orderAmount?: number;
  doneAmount?: number;
  diff?: number;
}

export interface HoldItem {
  where: "order" | "completion";
  id: string;
  reason: string;
}

export type ReconcileResult =
  | { status: "unavailable" }
  | { status: "ok"; results: CaseResult[]; holds: HoldItem[] };

export const yen = (n: number) => `${n.toLocaleString("ja-JP")}円`;

const isValidAmount = (v: number | null): v is number =>
  typeof v === "number" && Number.isFinite(v);

export function reconcile(
  orders: OrderRow[],
  completions: CompletionRow[] | null,
): ReconcileResult {
  // 完了一覧が届かないシナリオ：照合は実施しない
  if (completions === null) return { status: "unavailable" };

  const holds: HoldItem[] = [];

  // 受注一覧の検査（ID空欄・重複・金額不正は保留。黙って直さない）
  const orderIdCount = new Map<string, number>();
  for (const o of orders) {
    if (!o.id || o.id.trim() === "") {
      holds.push({ where: "order", id: "（IDなし）", reason: "案件IDが空欄です" });
      continue;
    }
    orderIdCount.set(o.id, (orderIdCount.get(o.id) ?? 0) + 1);
  }
  const dupOrderIds = new Set(
    [...orderIdCount].filter(([, c]) => c > 1).map(([id]) => id),
  );

  const usableOrders: OrderRow[] = [];
  const heldOrderIds = new Set<string>();
  for (const o of orders) {
    if (!o.id || o.id.trim() === "") continue;
    if (dupOrderIds.has(o.id)) {
      heldOrderIds.add(o.id);
      continue;
    }
    if (!isValidAmount(o.amount)) {
      heldOrderIds.add(o.id);
      holds.push({
        where: "order",
        id: o.id,
        reason: "受注金額が欠落しているか、形式が不正です",
      });
      continue;
    }
    usableOrders.push(o);
  }
  for (const id of dupOrderIds) {
    holds.push({
      where: "order",
      id,
      reason: "受注一覧に同じ案件IDが複数あります",
    });
  }

  // 完了一覧の検査
  const compIdCount = new Map<string, number>();
  for (const c of completions) {
    if (!c.id || c.id.trim() === "") {
      holds.push({ where: "completion", id: "（IDなし）", reason: "完了記録のIDが空欄です" });
      continue;
    }
    compIdCount.set(c.id, (compIdCount.get(c.id) ?? 0) + 1);
  }
  const dupCompIds = new Set(
    [...compIdCount].filter(([, c]) => c > 1).map(([id]) => id),
  );

  const usableOrderIds = new Set(usableOrders.map((o) => o.id));
  const compById = new Map<string, CompletionRow>();
  const heldCompIds = new Set<string>();
  const orderIdsWithHeldCompletion = new Set<string>();
  const holdCompletion = (c: CompletionRow, reason: string) => {
    if (!heldCompIds.has(c.id)) {
      heldCompIds.add(c.id);
      holds.push({ where: "completion", id: c.id, reason });
    }
    orderIdsWithHeldCompletion.add(c.id);
  };
  for (const c of completions) {
    if (!c.id || c.id.trim() === "") continue;
    if (dupCompIds.has(c.id)) {
      holdCompletion(c, "完了一覧に同じIDが複数あります");
      continue;
    }
    if (!isValidAmount(c.amount)) {
      holdCompletion(c, "完了金額が欠落しているか、形式が不正です");
      continue;
    }
    if (!usableOrderIds.has(c.id)) {
      holds.push({
        where: "completion",
        id: c.id,
        reason: heldOrderIds.has(c.id)
          ? "対応する受注が保留中のため照合できません"
          : "受注一覧にない完了記録です",
      });
      continue;
    }
    compById.set(c.id, c);
  }

  // 照合
  const results: CaseResult[] = [];
  for (const o of usableOrders) {
    const c = compById.get(o.id);
    if (!c && orderIdsWithHeldCompletion.has(o.id)) {
      // 対応する完了記録が保留中＝記録はあるが照合できない。「記録なし」扱いにしない
      holds.push({
        where: "order",
        id: o.id,
        reason: "対応する完了記録が保留中のため照合できません",
      });
      continue;
    }
    if (!c) {
      results.push({
        id: o.id,
        kind: "no-record",
        owner: o.owner,
        reason: "完了一覧にこの案件の記録がありません",
        next: "完了状況と記録漏れの有無を確認してください（記録がないことは、未完了の確定ではありません）",
      });
      continue;
    }
    if (c.amount === o.amount) {
      results.push({
        id: o.id,
        kind: "candidate",
        owner: o.owner,
        reason: "案件IDと金額が一致し、完了の記録があります",
        orderAmount: o.amount,
        doneAmount: c.amount,
        next: "原資料・契約条件を確認してください（この表示は請求の確定ではありません）",
      });
    } else {
      results.push({
        id: o.id,
        kind: "mismatch",
        owner: o.owner,
        reason: `受注${yen(o.amount)}と完了記録${yen(c.amount)}が一致しません`,
        orderAmount: o.amount,
        doneAmount: c.amount,
        diff: c.amount - o.amount,
        next: "変更合意の有無と原資料を確認してください。正しい金額をこちらで推測して選ぶことはしません",
      });
    }
  }

  return { status: "ok", results, holds };
}

/** 公開用の固定サンプル（金額はすべて架空の照合用数値。料金・売上実績ではない） */
export const SAMPLE_ORDERS: OrderRow[] = [
  { id: "DEMO-001", name: "サンプルA・サイト制作", amount: 100000, owner: "営業担当" },
  { id: "DEMO-002", name: "サンプルB・システム改修", amount: 150000, owner: "案件担当" },
  { id: "DEMO-003", name: "サンプルC・保守対応", amount: 80000, owner: "作業担当" },
];

export const SAMPLE_COMPLETIONS: CompletionRow[] = [
  { id: "DEMO-001", amount: 100000 },
  { id: "DEMO-002", amount: 170000 },
];

/* ------------------------------------------------------------------ */
/* 自社に置き換える確認メモ                                             */
/* ------------------------------------------------------------------ */

export const WORRY_OPTIONS = [
  { code: "W1", label: "情報が別々" },
  { code: "W2", label: "金額の確認が多い" },
  { code: "W3", label: "完了報告が集まらない" },
  { code: "W4", label: "確認担当が曖昧" },
  { code: "W9", label: "未確認" },
] as const;

export const PLACE_OPTIONS = [
  { code: "P1", label: "表計算" },
  { code: "P2", label: "業務システム" },
  { code: "P3", label: "メール・チャット" },
  { code: "P4", label: "紙" },
  { code: "P5", label: "複数に分散" },
  { code: "P9", label: "未確認" },
] as const;

export const ASSIGNEE_OPTIONS = [
  { code: "R1", label: "決まっている" },
  { code: "R2", label: "一部だけ決まっている" },
  { code: "R3", label: "決まっていない" },
  { code: "R9", label: "未確認" },
] as const;

export interface MemoAnswers {
  worries: string[];
  places: string[];
  assignee: string | null;
}

const labelWithCode = (
  options: readonly { code: string; label: string }[],
  codes: string[],
) =>
  options
    .filter((o) => codes.includes(o.code))
    .map((o) => `${o.label}（${o.code}）`);

export function buildMemo(answers: MemoAnswers, today: string): string {
  const worries =
    answers.worries.length > 0
      ? labelWithCode(WORRY_OPTIONS, answers.worries)
      : ["未確認（未選択）"];
  const places =
    answers.places.length > 0
      ? labelWithCode(PLACE_OPTIONS, answers.places)
      : ["未確認（未選択）"];
  const assignee = answers.assignee
    ? (ASSIGNEE_OPTIONS.find((o) => o.code === answers.assignee)?.label ?? "未確認") +
      `（${answers.assignee}）`
    : "未確認（未選択）";

  // 定型ルールで論点を組み立てる（導入可否の判定はしない）
  const topics = ["原資料の所在", "案件IDの有無"];
  if (answers.worries.includes("W2")) topics.push("金額変更の記録方法");
  if (answers.worries.includes("W3")) topics.push("完了報告の集め方とタイミング");
  if (answers.worries.includes("W4")) topics.push("最終確認者の決め方");
  if (answers.worries.includes("W1") || answers.places.includes("P5"))
    topics.push("情報の集約先の候補");
  if (
    (answers.assignee === "R2" || answers.assignee === "R3") &&
    !topics.includes("最終確認者の決め方")
  )
    topics.push("最終確認者の決め方");
  const allUnknown =
    answers.worries.length === 0 &&
    answers.places.length === 0 &&
    answers.assignee === null;

  return `# 自社で確認したいことメモ（相談準備用）

- 文書形式名: website-consultation-memo
- 形式版: 1.0
- 対象デモ: 月末の確認作業を、サンプルで体験（架空データによる機能説明）
- 作成日: ${today}

## 選択した内容

- 困りごと: ${worries.join("、")}
- 現在の管理場所: ${places.join("、")}
- 最終確認をする担当者: ${assignee}
${allUnknown ? "\n（選択はすべて「未確認」です。相談時に一緒に整理します）\n" : ""}
## 仮の業務の流れ

情報を集める → 照合する → 担当者が判断する

## 相談で確認したい論点（例）

${topics.map((t) => `- ${t}`).join("\n")}

## まだ分からないこと

- 対象件数、例外の扱い、締めまでの期限、データの利用条件 など

---

※このメモは選択内容に基づく相談準備用のメモです。個別の診断・導入効果・料金を確定するものではありません。
※このメモはブラウザ内の一時的な状態だけに保持され、ページを更新すると消えます。サーバーへの送信は行われていません。
`;
}
