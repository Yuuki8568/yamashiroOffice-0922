import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import Tokusho from "../pages/legal/tokusho";
import Terms from "../pages/legal/terms";
import Disclaimer from "../pages/legal/disclaimer";
import Privacy from "../pages/legal/privacy";

test("legal page server renders show approved conditions without false registration", () => {
  const html = renderToStaticMarkup(<Router ssrPath="/tokusho"><Tokusho /></Router>);
  expect(html).toContain("T3810986792894");
  expect(html).toContain("税込");
  expect(html).toContain("前日23:59");
  expect(html).not.toContain("免税事業者");
  expect(html).not.toContain("初回ミーティング実施後");
  const disclaimer = renderToStaticMarkup(<Router ssrPath="/disclaimer"><Disclaimer /></Router>);
  expect(disclaimer).toContain("算入額は税込");
  expect(disclaimer).toContain("一つの原因事由に関する賠償額の累計");
  expect(disclaimer).toContain("双方に適用");
  expect(disclaimer).toContain("故意・重大な過失によらない秘密保持義務違反には、双方について通常の賠償上限");
  expect(disclaimer).toContain("直接かつ通常の損害に限る損害範囲の制限の両方を適用");
  expect(disclaimer).toContain("不可抗力による終了にもお客様都合の返金不可を一律に適用せず");
  expect(renderToStaticMarkup(<Router ssrPath="/terms"><Terms /></Router>)).toContain("白河簡易裁判所");
  const privacy = renderToStaticMarkup(<Router ssrPath="/privacy"><Privacy /></Router>);
  expect(privacy).toContain("事前書面承諾");
  expect(privacy).toContain("生成AIサービスには送信しません");
  expect(privacy).toContain("2026年10月23日");
});
