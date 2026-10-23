import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { BUSINESS_TERMS } from "./business-terms";

const read = (relative: string) => readFileSync(new URL(relative, import.meta.url), "utf8");

describe("approved business terms", () => {
  test("prepayment, agreed start and refund timing", () => {
    expect(BUSINESS_TERMS.payment).toContain("発行日から14日以内");
    expect(BUSINESS_TERMS.start).toContain("入金確認後");
    expect(BUSINESS_TERMS.start).toContain("合意し当方が通知した開始日");
    expect(BUSINESS_TERMS.refundTiming).toContain("確定後14日以内");
    expect(BUSINESS_TERMS.refundTiming).toContain("当方が負担");
  });
  test("approved A-D anchor, per-cause scope and exceptions", () => {
    expect(BUSINESS_TERMS.renewal).toContain("前日23:59（日本時間）");
    expect(BUSINESS_TERMS.renewal).toContain("翌月以降は元の応当日");
    expect(BUSINESS_TERMS.cap).toContain("算入額は税込");
    expect(BUSINESS_TERMS.cap).toContain("一つの原因事由に関する賠償額の累計");
    expect(BUSINESS_TERMS.cap).toContain("原因事由が発生した日");
    expect(BUSINESS_TERMS.capExceptions).toContain("故意・重大な過失によらない秘密保持義務違反には、双方について通常の賠償上限");
    expect(BUSINESS_TERMS.capExceptions).toContain("直接かつ通常の損害に限る損害範囲の制限の両方を適用");
    expect(BUSINESS_TERMS.capExceptions).not.toContain("重大な過失、秘密保持義務違反、反社会的勢力");
    expect(BUSINESS_TERMS.priority).not.toContain("秘密保持違反の上限例外");
    expect(BUSINESS_TERMS.capExceptions).toContain("個別上限を合意するまで");
    expect(BUSINESS_TERMS.capExceptions).toContain("損害範囲の制限を適用しません");
  });
  test("A-D preserves incomplete operational facts and agreed safeguards", () => {
    expect(BUSINESS_TERMS.notice).toContain("到達時");
    expect(BUSINESS_TERMS.lateInvoice).toContain("発行日から14日");
    expect(BUSINESS_TERMS.officeExit).toContain("30日前");
    expect(BUSINESS_TERMS.nda).toContain("終了後3年間");
    expect(BUSINESS_TERMS.nda).toContain("保有期間中");
    expect(BUSINESS_TERMS.ip).toContain("引渡し時から");
    expect(BUSINESS_TERMS.ip).toContain("その成果物の対価");
    expect(BUSINESS_TERMS.caseGate).toContain("確認・合意が完了するまで");
    const privacy = read("../pages/legal/privacy.tsx");
    expect(privacy).not.toContain("契約終了後7年間");
    expect(privacy).not.toContain("当方（山代 悠生）のみに限定");
    expect(privacy).toContain("最終接触から3年間");
  });
  test("gross prices preserve explicit net economic price on both surfaces", () => {
    for (const path of ["../pages/service.tsx", "../components/site/sections/pricing.tsx"]) {
      const source = read(path);
      for (const price of ["5.5万〜8.8万円", "16.5万〜19.8万円", "60.5万〜88万円", "8.8万〜11万円"]) expect(source).toContain(price);
      expect(source).not.toContain("税抜");
      expect(source).toContain("税込（消費税10%）");
    }
  });
  test("visible FAQs match JSON-LD for changed terms", () => {
    const html = read("../../../index.html");
    const faq = read("../components/site/sections/faq.tsx");
    for (const answer of [BUSINESS_TERMS.start, BUSINESS_TERMS.storage + BUSINESS_TERMS.ai, BUSINESS_TERMS.ip]) {
      expect(html).toContain(answer);
      expect(faq).toContain(answer);
    }
  });
  test("invoice identity, existing contracts, public address and demo privacy preserved", () => {
    expect(read("./links.ts")).toContain("T3810986792894");
    expect(read("./links.ts")).toContain("東京都港区北青山1-3-3 三橋ビル 3階");
    expect(read("../pages/legal/tokusho.tsx")).not.toContain("免税事業者");
    expect(BUSINESS_TERMS.existing).toContain("自動的に変更することはありません");
    expect(read("../pages/legal/privacy.tsx")).toContain("発注工房の承認はデモ内の記録であり、仕入先への注文送信は行いません。");
  });
});
