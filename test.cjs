const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');

    // Wait for the button
    await page.waitForSelector('text="VIEW PROJECTS"');

    // Get the element and its bounding box
    const btn = await page.$('text="VIEW PROJECTS"');
    const box = await btn.boundingBox();

    if (box) {
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;

        // Evaluate document.elementFromPoint
        const result = await page.evaluate(({ x, y }) => {
            const el = document.elementFromPoint(x, y);
            if (el) {
                return {
                    tagName: el.tagName,
                    className: el.className,
                    id: el.id,
                    outerHTML: el.outerHTML.substring(0, 500)
                };
            }
            return null;
        }, { x, y });

        console.log("Element at button center:", result);
    } else {
        console.log("Button not found");
    }

    await browser.close();
})();
