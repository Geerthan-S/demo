const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    await page.waitForTimeout(2000);

    const result = await page.evaluate(() => {
        const el = document.querySelector('.home-metrics-card');
        const child = document.querySelector('.home-metrics-card > div');
        return {
            parentBox: el ? el.getBoundingClientRect() : null,
            parentCSS: el ? {
                position: window.getComputedStyle(el).position,
                inset: window.getComputedStyle(el).inset,
                height: window.getComputedStyle(el).height
            } : null,
            childBox: child ? child.getBoundingClientRect() : null
        };
    });

    fs.writeFileSync('bounds-result.json', JSON.stringify(result, null, 2));
    console.log("Written bounds-result.json");

    await browser.close();
})();
