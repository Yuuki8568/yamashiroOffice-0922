import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path="/usr/bin/google-chrome", args=["--no-sandbox"]
        )
        pg = await browser.new_page(viewport={"width": 1366, "height": 900})
        await pg.goto("http://[::1]:4200/", wait_until="networkidle")
        btn = await pg.query_selector("text=同意する")
        if btn:
            await btn.click()
            await pg.wait_for_timeout(500)
        el = await pg.query_selector("#projects")
        await el.scroll_into_view_if_needed()
        await pg.wait_for_timeout(1200)
        await pg.screenshot(path="/tmp/final-projects.png")
        await pg.close()
        await browser.close()

asyncio.run(main())
print("DONE")
