/**
 * 参考見積コンポーネント【下書き・非公開】
 *
 * 金額は事業者の承認が取れていないため、現時点では空欄のまま非公開とする。
 * 承認済みの金額・条件が確定したら ESTIMATES を埋め、ページに組み込んで公開する。
 * （homepage_improvement_prompt 第8節の方針に基づく）
 */

export type EstimateItem = {
  label: string;
  value: string; // 未確定は空文字
};

export type ReferenceEstimate = {
  title: string;
  targetWork: string;
  deliverables: string[];
  assumptions: string[];
  scope: string[];
  initialCost: string; // 例: "150,000円（税別）" / 未確定は ""
  recurringCost: string; // 例: "月額 8,000円（税別）" / なしは "なし"
  externalServiceCost: string; // 例: "別途発生（利用サービスによる）"
  taxNote: string; // "税別" など
  deliveryNote: string; // 納期の前提
  exclusions: string[];
  conditionsNote: string; // 追加見積の条件
  confirmedAt: string; // 事業者確認日 "YYYY-MM-DD" / 未確認は ""
};

export const ESTIMATES: ReferenceEstimate[] = [
  {
    title: "参考見積A：元データ1種類から集計表1種類を作る",
    targetWork: "元データ（表計算ソフト等）から、月次などの集計表を1種類作る",
    deliverables: ["集計ツール", "操作手順"],
    assumptions: ["元データの形式：要確認", "利用人数：要確認", "外部連携：要確認"],
    scope: ["初回打ち合わせ", "制作", "操作説明", "修正の範囲：要確認"],
    initialCost: "",
    recurringCost: "",
    externalServiceCost: "",
    taxNote: "税別",
    deliveryNote: "条件確認後に提示",
    exclusions: ["外部サービスの利用料", "対象外業務：要確認"],
    conditionsNote: "内容の変更・追加は別途見積",
    confirmedAt: "",
  },
  {
    title: "参考見積B：問い合わせの対応状況を一覧で管理する",
    targetWork: "問い合わせの受付・対応状況を一覧で確認できる管理画面を作る",
    deliverables: ["管理画面", "運用ルール", "操作手順"],
    assumptions: ["元データの形式：要確認", "利用人数：要確認", "外部連携：要確認"],
    scope: ["初回打ち合わせ", "制作", "操作説明", "修正の範囲：要確認"],
    initialCost: "",
    recurringCost: "",
    externalServiceCost: "",
    taxNote: "税別",
    deliveryNote: "条件確認後に提示",
    exclusions: ["外部サービスの利用料", "対象外業務：要確認"],
    conditionsNote: "内容の変更・追加は別途見積",
    confirmedAt: "",
  },
];

/** すべての必須金額項目が埋まっている場合のみ true。公開判定に使う。 */
export function isEstimateReady(e: ReferenceEstimate): boolean {
  return Boolean(
    e.initialCost && e.recurringCost && e.externalServiceCost && e.confirmedAt,
  );
}
