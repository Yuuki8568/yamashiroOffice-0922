import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/google-chrome", args=["--no-sandbox"]
        )
        pg = await browser.new_page(viewport={"width": 1280, "height": 860})
        await pg.goto("http://[::1]:4200/demo", wait_until="networkidle")
        # dismiss cookie consent
        btn = await pg.query_selector("text=同意する")
        if btn:
            await btn.click()
            await pg.wait_for_timeout(600)
        await pg.wait_for_timeout(1000)
        await pg.screenshot(path="/tmp/demo-page-clean.png")
        await pg.close()
        await browser.close()

asyncio.run(main())
print("DONE")
