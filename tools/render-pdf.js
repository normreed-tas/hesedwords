/* ================================================================
   RENDER A COMPANION PDF from a built page.

   Run from the repo root:
     node tools/render-pdf.js articles/our-god-sponsored-projects.html
     node tools/render-pdf.js books/what-we-did-without-knowing.html

   Output defaults to the conventional place for the page's kind:
     articles/<slug>.html  ->  articles/pdf/<slug>.pdf
     books/<slug>.html     ->  books/<slug>.pdf
   Pass a second argument to override.

   WHY THIS EXISTS. The render used to be typed out by hand each time,
   and the same three things went wrong each time: the wrong npx cache
   directory was picked for playwright, printBackground was left off so
   every Selah rule and filled block vanished, and one of the screen-only
   elements was forgotten. All three are settled here.

   What it does, per CONVENTIONS.md "PDF companions":
     - inlines the working-tree css/tokens.css (a file:// page cannot
       fetch /css/tokens.css, and the deployed copy would be wrong
       whenever tokens.css has unpushed changes)
     - strips site nav, site footer, any .hw-companion line, and the
       in-page .pdf-download block
     - forces a white page background rather than the site's paper tone
     - hides footnote backlinks and the dotted rule under a.gloss, both
       of which are screen affordances that do nothing on paper
     - renders with printBackground: true

   The stripped intermediate is written next to the PDF as
   <slug>-PRINT.html so the result can be screenshotted and checked —
   this machine has no PDF rasteriser. It is gitignored.
   ================================================================ */
const fs = require('fs');
const path = require('path');

const repo = path.resolve(__dirname, '..');
const rel = process.argv[2];
const outArg = process.argv[3];

if (!rel) {
  console.error('usage: node tools/render-pdf.js <path/to/page.html> [out.pdf]');
  process.exit(1);
}

const src = path.join(repo, rel);
if (!fs.existsSync(src)) {
  console.error('no such file: ' + rel);
  process.exit(1);
}

const LINK = /<link rel="stylesheet" href="\/css\/tokens\.css"\s*\/?>/;
let html = fs.readFileSync(src, 'utf8');
if (!LINK.test(html)) {
  console.error('no /css/tokens.css link in ' + rel + ' — nothing to inline.');
  process.exit(1);
}

const tokens = fs.readFileSync(path.join(repo, 'css', 'tokens.css'), 'utf8');

// Print-only overrides. Appended AFTER the page's own <style>, so a
// page-local rule cannot win over them.
const PRINT_CSS = `
/* ---- injected by tools/render-pdf.js ---- */
html, body.hw { background: #fff !important; }
.hw-nav, .hw-foot, .hw-companion, .pdf-download { display: none !important; }
.hw-notes a.back { display: none !important; }
a.gloss { border-bottom: none !important; text-decoration: none !important; color: inherit !important; }
.hw-article { padding-top: 0 !important; }
@page { margin: 18mm 16mm; }
`;

html = html
  .replace(LINK, '<style>\n' + tokens + '\n</style>')
  .replace('</head>', '<style>' + PRINT_CSS + '</style>\n</head>');

const slug = path.basename(rel).replace(/\.html$/i, '');
const dir = path.dirname(rel);
const defaultOut = dir === 'articles'
  ? path.join('articles', 'pdf', slug + '.pdf')
  : path.join(dir, slug + '.pdf');
const outPdf = path.join(repo, outArg || defaultOut);
const printHtml = path.join(path.dirname(outPdf), slug + '-PRINT.html');

fs.mkdirSync(path.dirname(outPdf), { recursive: true });
fs.writeFileSync(printHtml, html, 'utf8');

(async () => {
  let chromium;
  try {
    ({ chromium } = require('playwright'));
  } catch (e) {
    console.error('Cannot find playwright.');
    console.error('Playwright lives in one of several npx cache dirs and only one has it.');
    console.error('Re-run with NODE_PATH set — pick the dir by TESTING, not by taking the first:');
    console.error('  PW=$(for d in "$LOCALAPPDATA"/npm-cache/_npx/*/node_modules; do \\');
    console.error('    [ -d "$d/playwright" ] && echo "$d" && break; done)');
    console.error('  NODE_PATH="$PW" node tools/render-pdf.js ' + rel);
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///' + printHtml.replace(/\\/g, '/'), { waitUntil: 'networkidle' });
  await page.pdf({
    path: outPdf,
    format: 'A4',
    printBackground: true,   // without this the Selah rules and every filled block vanish
    margin: { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' }
  });
  await browser.close();

  const kb = Math.round(fs.statSync(outPdf).size / 1024);
  console.log('wrote ' + path.relative(repo, outPdf).replace(/\\/g, '/') + ' (' + kb + ' KB)');
  console.log('check it by screenshotting ' + path.relative(repo, printHtml).replace(/\\/g, '/'));
})();
