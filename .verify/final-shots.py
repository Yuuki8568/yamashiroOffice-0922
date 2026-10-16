import asyncio
from playwright.async_api import async_playwright

URL = "http://[::1]:4200/"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/google-chrome", args=["--no-sandbox"]
        )
        # 768px hero
        pg = await browser.new_page(viewport={"width": 768, "height": 900})
        await pg.goto(URL, wait_until="networkidle")
        await pg.wait_for_timeout(1200)
        await pg.screenshot(path="/tmp/final-768-hero.png")
        # 390px hero
        await pg.set_viewport_size({"width": 390, "height": 844})
        await pg.goto(URL, wait_until="networkidle")
        await pg.wait_for_timeout(1200)
        await pg.screenshot(path="/tmp/final-390-hero.png")
        await pg.close()

        # desktop pricing + faq + security
        pg = await browser.new_page(viewport={"width": 1366, "height": 900})
        await pg.goto(URL, wait_until="networkidle")
        await pg.wait_for_timeout(1500)
        for sec, name in [("#pricing", "pricing"), ("#faq", "faq"), ("#security", "security")]:
            el = await pg.query_selector(sec)
            await el.scroll_into_view_if_needed()
            await pg.wait_for_timeout(900)
            await pg.screenshot(path=f"/tmp/final-{name}.png")
        # open FAQ Q7 to check text
        faq_btns = await pg.query_selector_all("#faq button")
        if faq_btns:
            await faq_btns[-1].click()
            await pg.wait_for_timeout(500)
            await pg.screenshot(path="/tmp/final-faq-q7-open.png")
        await pg.close()
        await browser.close()

asyncio.run(main())
print("SHOTS DONE")
