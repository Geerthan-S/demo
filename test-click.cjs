const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/projects');

    await page.waitForTimeout(2000);

    const btn = await page.$('text="VIEW PROJECTS"');
    if (btn) {
        const box = await btn.boundingBox();
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;

        const result = await page.evaluate(({ x, y }) => {
            const el = document.elementFromPoint(x, y);
            if (el) {
                return {
                    tagName: el.tagName,
                    className: el.className,
                    outerHTML: el.outerHTML.substring(0, 300)
                };
            }
            return null;
        }, { x, y });

        fs.writeFileSync('click-result-projects.json', JSON.stringify(result, null, 2));
        console.log("Written click-result-projects.json");
    } else {
        // try CONTACT US on another page if VIEW PROJECTS doesn't exist on projects page
        const btnContact = await page.$('text="CONTACT US"');
        if (btnContact) {
            const box = await btnContact.boundingBox();
            const x = box.x + box.width / 2;
            const y = box.y + box.height / 2;

            const result = await page.evaluate(({ x, y }) => {
                const el = document.elementFromPoint(x, y);
                if (el) {
                    return {
                        tagName: el.tagName,
                        className: el.className,
                        outerHTML: el.outerHTML.substring(0, 300)
                    };
                }
                return null;
            }, { x, y });

            fs.writeFileSync('click-result-projects.json', JSON.stringify(result, null, 2));
            console.log("Written click-result-projects.json from CONTACT US");
        } else {
            console.log("Buttons not found");
        }
    }

    await browser.close();
})();
