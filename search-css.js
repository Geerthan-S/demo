const fs = require('fs');
const path = require('path');

const cssFiles = [
    path.join(__dirname, 'src/app/globals.css'),
    path.join(__dirname, 'src/app/screenshot-home.css')
];

let results = '';
const log = (msg) => {
    results += msg + '\n';
    console.log(msg);
};

cssFiles.forEach((file) => {
    if (!fs.existsSync(file)) {
        log(`File not found: ${file}`);
        return;
    }
    log(`\nScanning: ${file}...`);
    const content = fs.readFileSync(file, 'utf8');

    // Use a parser-like regex to extract selectors and their blocks
    const ruleRegex = /([^{]+)\{([^}]+)\}/g;
    let match;
    while ((match = ruleRegex.exec(content)) !== null) {
        const selector = match[1].trim();
        const body = match[2].trim();

        // Check if selector references html or body (excluding words like body-card, html-renderer, etc.)
        const isHtmlOrBody = /\b(html|body)\b/i.test(selector);

        if (isHtmlOrBody) {
            const hasTransform = /transform|will-change|perspective|filter/i.test(body);
            if (hasTransform) {
                log(`MATCH found in ${path.basename(file)}:`);
                log(`Selector: ${selector}`);
                log(`Body:\n${body}\n`);
            }
        }
    }
});

fs.writeFileSync(path.join(__dirname, 'css-results-utf8.txt'), results, 'utf8');
console.log('Results written to css-results-utf8.txt');
