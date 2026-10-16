from playwright.sync_api import sync_playwright

URL = "http://[::1]:4200/"
errors = []
results = []

def check(name, cond, detail=""):
    results.append((name, bool(cond), detail))

with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    ctx = b.new_context(viewport={"width": 1366, "height": 900})
    pg = ctx.new_page()
    pg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errors.append(str(e)))
    pg.goto(URL, wait_until="networkidle")
    pg.evaluate("document.documentElement.style.scrollBehavior='auto'")
    btn = pg.locator("button", has_text="拒否する")
    if btn.count(): btn.first.click(); pg.wait_for_timeout(200)

    # 1. Section order (actual ids)
    ids = pg.evaluate("""() => Array.from(document.querySelectorAll('main section[id], main div[id]')).map(e=>e.id).filter(Boolean)""")
    wanted = ["worries","work-examples","projects","demo","services","pricing","fde","profile","strengths","philosophy","flow","fde-experience","fit-check","moyamoya","security","store","faq","contact"]
    pos = {i: ids.index(i) for i in wanted if i in ids}
    seq = [pos[k] for k in wanted if k in pos]
    check("section order ascending", seq == sorted(seq) and len(pos) == len(wanted),
          f"found {len(pos)}/{len(wanted)}: " + ",".join(ids))

    # 2. FDE体験 full flow
    exp = pg.locator("#fde-experience")
    exp.scroll_into_view_if_needed(); pg.wait_for_timeout(400)
    exp.locator("button", has_text="見積書づくり").click(); pg.wait_for_timeout(200)
    exp.locator("button", has_text="20時間").click(); pg.wait_for_timeout(200)
    exp.locator("button", has_text="作る へ進む").click(); pg.wait_for_timeout(300)
    run = exp.locator("button", has_text="試作を動かす")
    check("FDE step2 試作を動かす", run.count() == 1)
    run.click(); pg.wait_for_timeout(1600)
    check("FDE demo result table", exp.locator("table").count() == 1)
    exp.locator("button", has_text="根づかせる へ進む").click(); pg.wait_for_timeout(300)
    cbs = exp.locator("button[aria-pressed]")
    n = cbs.count()
    check("FDE confirm items (4)", n >= 4, f"count={n}")
    for i in range(4):
        cbs.nth(i).click(); pg.wait_for_timeout(120)
    pg.wait_for_timeout(900)  # stamp appears 0.5s after all checked
    t = exp.inner_text()
    check("FDE stamp 確認済", "確認済" in t)
    check("FDE estimate 月10時間/年間120時間", "10時間" in t and "120時間" in t, t[t.find("月"):t.find("月")+60] if "月" in t else "no 月")
    check("FDE 試算の注記", "試算であり" in t)
    pg.screenshot(path="/tmp/fde-exp-done.png")

    # 3. Klee One loaded (font-hand text now rendered)
    pg.wait_for_timeout(800)
    klee = pg.evaluate("document.fonts.check('600 16px \"Klee One\"')")
    check("Klee One font loaded", klee)

    # 4. もやもや tabs
    moya = pg.locator("#moyamoya")
    moya.scroll_into_view_if_needed(); pg.wait_for_timeout(300)
    tabs = moya.locator("[role='tab']")
    check("moyamoya 4 tabs", tabs.count() == 4, f"count={tabs.count()}")
    tabs.nth(1).click(); pg.wait_for_timeout(300)
    check("moyamoya tab switch changes panel", "システム" in moya.inner_text())

    # 5. fit-check: 2 yes + 1 no -> FDE向き
    fit = pg.locator("#fit-check")
    fit.scroll_into_view_if_needed(); pg.wait_for_timeout(300)
    fit.locator("button", has_text="はい").nth(0).click(); pg.wait_for_timeout(150)
    fit.locator("button", has_text="はい").nth(1).click(); pg.wait_for_timeout(150)
    fit.locator("button", has_text="いいえ").nth(2).click(); pg.wait_for_timeout(400)
    t = fit.inner_text()
    check("fit-check FDE向き (2 yes)", "FDE向き" in t)
    check("fit-check booking CTA", "無料相談を予約する" in t)

    # 5b. reload: 1 yes + 2 no -> 市販ツール
    pg.reload(wait_until="networkidle")
    pg.evaluate("document.documentElement.style.scrollBehavior='auto'")
    btn = pg.locator("button", has_text="拒否する")
    if btn.count(): btn.first.click(); pg.wait_for_timeout(200)
    fit = pg.locator("#fit-check")
    fit.scroll_into_view_if_needed(); pg.wait_for_timeout(300)
    fit.locator("button", has_text="いいえ").nth(0).click(); pg.wait_for_timeout(150)
    fit.locator("button", has_text="はい").nth(1).click(); pg.wait_for_timeout(150)
    fit.locator("button", has_text="いいえ").nth(2).click(); pg.wait_for_timeout(400)
    t = fit.inner_text()
    check("fit-check 市販ツール (1 yes)", "市販のツールで足りるかもしれません" in t)

    # 5c. hero: 4 changes + CTAs
    hero = pg.locator("#top")
    ht = hero.inner_text()
    check("hero 4つの変化", all(x in ht for x in ["繰り返す入力や確認","散らばった情報","担当者しか分からない","今あるExcel"]))
    check("hero 主ボタン=無料相談", "無料相談を予約する" in ht)
    check("hero 副ボタン=改善例とデモ", "改善例とデモを見る" in ht)
    check("hero 45分/オンライン/相談のみ", all(x in ht for x in ["45分","無料","オンライン","相談のみ"]))

    # 5d. contact quick mail entry
    ct = pg.locator("#contact")
    ctt = ct.inner_text()
    check("contact 軽い入口 3項目", all(x in ctt for x in ["困っている作業","今のやり方","聞きたいこと"]))
    check("contact mailto link", pg.locator("#contact a[href^='mailto:'][href*='%E4%BA%8B%E5%89%8D%E7%A2%BA%E8%AA%8D']").count() == 1)

    # 5e. demo-entry 4 choices
    de = pg.locator("#demo")
    det = de.inner_text()
    check("demo 4つの困りごと", all(x in det for x in ["月末の確認","シフト作成","問い合わせや案件","AIが自社に合うか"]))
    check("demo 誰向け/体験/調整", all(x in det for x in ["誰向け","体験できること","導入時に調整"]))

    # 5f. pricing plan details + boundaries
    pr = pg.locator("#pricing")
    prt = pr.inner_text()
    check("pricing 日本語主表記", all(x in prt for x in ["守る・整える段階","広げる・効率化する段階","業務構造を組み替える段階","継続的な運用伴走"]))
    check("pricing 向いている状況/主な作業/納品物", all(x in prt for x in ["向いている状況","主な作業","納品物の例"]))
    check("pricing 無料と有料の境界", "無料と有料の境界" in prt and "試作と本番運用の違い" in prt)
    check("pricing 期間・修正は見積書で明示", "期間の目安" in prt and "見積書に明示" in prt)

    # 5g. fde-about merits first + details collapsed
    fa = pg.locator("#fde")
    fat = fa.inner_text()
    check("fde 利点3点", all(x in fat for x in ["話の行き違いが減る","現場に合わせて調整できる","使い方・引き継ぎまで相談できる"]))
    check("fde たとえは折りたたみ内", fa.locator("details").count() == 1)
    fa.locator("summary").click(); pg.wait_for_timeout(300)
    check("fde たとえ開くと料理人", "出張料理人" in fa.inner_text())

    # 6. /service page
    pg.goto("http://[::1]:4200/service", wait_until="networkidle")
    title = pg.title()
    check("/service title", "サービスと料金" in title, title)
    desc = pg.evaluate("document.querySelector('meta[name=description]')?.content || ''")
    check("/service meta description", len(desc) > 10, desc[:50])
    st = pg.locator("main").inner_text()
    check("/service tier prices shown", all(x in st for x in ["5万〜8万円","15万〜18万円","55万〜80万円","8万〜10万円"]))
    check("/service 日本語主表記", all(x in st for x in ["守る・整える段階","広げる・効率化する段階","業務構造を組み替える段階","継続的な運用伴走"]))
    check("/service 目安・税抜の補足", "目安" in st and "税抜" in st)
    check("/service 安心4点", all(x in st for x in ["着手前に、費用と納品内容を確認","修正・保守の範囲を、始める前に決めます","情報の取り扱いを、事前に確認","納品後の連絡方法を明確"]))
    check("/service 無料と有料の境界", "無料と有料の境界" in st)
    check("/service やること/お願い", "やること" in st and "お願い" in st)
    check("/service 継続契約は任意", "任意" in st)
    # collapsed details: open both and verify contents
    ds = pg.locator("main details summary")
    check("/service 詳細は折りたたみ2件", ds.count() == 2, f"count={ds.count()}")
    for i in range(ds.count()):
        ds.nth(i).click(); pg.wait_for_timeout(200)
    st = pg.locator("main").inner_text()
    check("/service 9書類", all(x in st for x in ["NDA","発注請書","業務委託契約書","免責事項","AI特約","DPA","検収書","業務完了報告書"]))
    check("/service A/F比率", "A/F比率" in st and "1.5" in st)
    pg.screenshot(path="/tmp/fde-service.png", full_page=True)

    # 7. JSON-LD structured data (served from index.html)
    pg.goto(URL, wait_until="domcontentloaded")
    lds = pg.evaluate("""() => Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s=>JSON.parse(s.textContent)['@type'])""")
    check("JSON-LD ProfessionalService + FAQPage", "ProfessionalService" in lds and "FAQPage" in lds, ",".join(lds))
    faq_count = pg.evaluate("""() => { const s = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(x=>JSON.parse(x.textContent)).find(x=>x['@type']==='FAQPage'); return s ? s.mainEntity.length : 0; }""")
    check("FAQPage 10 questions", faq_count == 10, f"count={faq_count}")

    # 8. widths overflow
    for w in [390, 768, 1366]:
        c2 = b.new_context(viewport={"width": w, "height": 900})
        p2 = c2.new_page()
        p2.goto(URL, wait_until="networkidle")
        p2.evaluate("document.documentElement.style.scrollBehavior='auto'")
        bb = p2.locator("button", has_text="拒否する")
        if bb.count(): bb.first.click(); p2.wait_for_timeout(200)
        ov = p2.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
        check(f"no h-scroll {w}px", not ov)
        p2.close(); c2.close()

    b.close()

print("== RESULTS ==")
ok = True
for name, passed, detail in results:
    print(("PASS" if passed else "FAIL"), "-", name, ("| " + detail[:160] if detail else ""))
    if not passed: ok = False
print("== CONSOLE ERRORS ==")
for e in errors[:20]: print("ERR:", e[:200])
print("ALL PASS" if ok and not errors else "HAS FAILURES")
