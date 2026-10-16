import { describe, expect, test } from "bun:test";
import {
  reconcile,
  buildMemo,
  SAMPLE_ORDERS,
  SAMPLE_COMPLETIONS,
  type OrderRow,
  type CompletionRow,
} from "./demo-logic";

describe("照合ロジック（公開サンプル）", () => {
  const r = reconcile(SAMPLE_ORDERS, SAMPLE_COMPLETIONS);

  test("試験1: 通常サンプルが3分類に分かれる", () => {
    if (r.status !== "ok") throw new Error("unavailable");
    expect(r.results).toHaveLength(3);
    expect(r.results.find((x) => x.id === "DEMO-001")?.kind).toBe("candidate");
    expect(r.results.find((x) => x.id === "DEMO-002")?.kind).toBe("mismatch");
    expect(r.results.find((x) => x.id === "DEMO-003")?.kind).toBe("no-record");
  });

  test("試験1: 金額不一致の差額が20,000円", () => {
    if (r.status !== "ok") throw new Error("unavailable");
    expect(r.results.find((x) => x.id === "DEMO-002")?.diff).toBe(20000);
  });

  test("試験2: 完了記録なしを「未完了確定」としない", () => {
    if (r.status !== "ok") throw new Error("unavailable");
    const d3 = r.results.find((x) => x.id === "DEMO-003")!;
    expect(d3.kind).toBe("no-record");
    expect(d3.next).toContain("未完了の確定ではありません");
  });

  test("試験4: 推測で金額を選ばない（mismatch の next に明記）", () => {
    if (r.status !== "ok") throw new Error("unavailable");
    expect(
      r.results.find((x) => x.id === "DEMO-002")?.next,
    ).toContain("推測して選ぶことはしません");
  });
});

describe("照合ロジック（異常系）", () => {
  test("試験3: 完了一覧が未取得なら照合未実施", () => {
    const r = reconcile(SAMPLE_ORDERS, null);
    expect(r.status).toBe("unavailable");
  });

  test("試験4: 重複ID・受注にない完了ID・金額欠落は保留し、正常候補に混ぜない", () => {
    const orders: OrderRow[] = [
      { id: "A-1", name: "正常", amount: 1000, owner: "担当" },
      { id: "A-2", name: "重複1", amount: 2000, owner: "担当" },
      { id: "A-2", name: "重複2", amount: 3000, owner: "担当" },
      { id: "A-3", name: "金額欠落", amount: null, owner: "担当" },
    ];
    const completions: CompletionRow[] = [
      { id: "A-1", amount: 1000 },
      { id: "A-2", amount: 2000 },
      { id: "X-9", amount: 500 }, // 受注にない
      { id: "A-3", amount: 800 },
    ];
    const r = reconcile(orders, completions);
    if (r.status !== "ok") throw new Error("unavailable");

    // 正常な A-1 だけが候補になる
    expect(r.results.map((x) => x.id)).toEqual(["A-1"]);
    expect(r.results[0].kind).toBe("candidate");

    // 重複 A-2 は結果に出ず保留（黙った重複除去をしない）
    expect(r.results.find((x) => x.id === "A-2")).toBeUndefined();
    expect(
      r.holds.some(
        (h) => h.where === "order" && h.id === "A-2" && h.reason.includes("複数"),
      ),
    ).toBe(true);

    // 金額欠落 A-3 は保留
    expect(
      r.holds.some((h) => h.id === "A-3" && h.reason.includes("欠落")),
    ).toBe(true);

    // 受注にない X-9 は保留
    expect(
      r.holds.some((h) => h.id === "X-9" && h.reason.includes("受注一覧にない")),
    ).toBe(true);
  });

  test("試験4: 完了金額が不正形式でも推測補完しない", () => {
    const r = reconcile(
      [{ id: "B-1", name: "x", amount: 100, owner: "担当" }],
      [{ id: "B-1", amount: null }],
    );
    if (r.status !== "ok") throw new Error("unavailable");
    expect(r.results).toHaveLength(0);
    expect(r.holds.some((h) => h.id === "B-1")).toBe(true);
  });
});

describe("確認メモ生成", () => {
  test("試験6: 選択内容がそのまま反映され、効果・料金は算出されない", () => {
    const m = buildMemo(
      { worries: ["W1", "W2"], places: ["P1"], assignee: "R2" },
      "2026-09-20",
    );
    expect(m).toContain("情報が別々（W1）");
    expect(m).toContain("金額の確認が多い（W2）");
    expect(m).toContain("表計算（P1）");
    expect(m).toContain("一部だけ決まっている（R2）");
    expect(m).toContain("金額変更の記録方法");
    expect(m).toContain("website-consultation-memo");
    expect(m).toContain("形式版: 1.0");
    expect(m).toContain("個別の診断・導入効果・料金を確定するものではありません");
    expect(m).not.toMatch(/\d+円/);
  });

  test("試験6: 未選択は未確認として扱い、勝手に確定しない", () => {
    const m = buildMemo({ worries: [], places: [], assignee: null }, "2026-09-20");
    expect(m.match(/未確認（未選択）/g)?.length).toBe(3);
    expect(m).toContain("相談時に一緒に整理します");
  });

  test("試験6: 未確認コードを選んだ場合も他項目と混ぜずそのまま記録", () => {
    const m = buildMemo(
      { worries: ["W9"], places: ["P9"], assignee: "R9" },
      "2026-09-20",
    );
    expect(m).toContain("未確認（W9）");
    expect(m).toContain("未確認（P9）");
    expect(m).toContain("未確認（R9）");
  });
});
