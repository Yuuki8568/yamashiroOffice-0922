import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import { BUSINESS_TERMS } from "./business-terms";
import Service from "../pages/service";
import Disclaimer from "../pages/legal/disclaimer";
import { Contact } from "../components/site/sections/contact";

test("approved exclusions appear consistently at service, contact and disclaimer", () => {
  for (const page of [<Service />, <Contact />, <Disclaimer />]) {
    const html = renderToStaticMarkup(<Router ssrPath="/service">{page}</Router>);
    expect(html).toContain(BUSINESS_TERMS.serviceExclusions);
    expect(html).toContain("作成代行・実質的な代筆");
    expect(html).toContain("提出代行・代理を受託しません");
    expect(html).toContain("自動で受任を判断せず");
    expect(html).toContain("確認が終わるまで受託・着手しません");
  }
});

test("law explanation preserves legal conditions and separates voluntary service limits", () => {
  const law = BUSINESS_TERMS.reservedServicesLaw;
  for (const clause of ["同条ただし書に定める例外", "他人の依頼", "名目を問わず報酬", "業として", "第1条の3", "すべてを一律に行政書士の独占業務とするものではなく", "他の士業法", "当事務所の提供範囲"]) expect(law).toContain(clause);
  const html = renderToStaticMarkup(<Router ssrPath="/disclaimer"><Disclaimer /></Router>);
  expect(html).toContain(law);
  expect(html).toContain("https://www.maff.go.jp/j/kokusai/boueki/attach/pdf/triff-29.pdf");
  expect(html).toContain("締結済みの契約や同意済みの文書を自動的に変更することはありません");
});
