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
const argv = process.argv.slice(2);
const flags = argv.filter(a => a.startsWith('--'));
const positional = argv.filter(a => !a.startsWith('--'));
const rel = positional[0];
const outArg = positional[1];

if (!rel) {
  console.error('usage: node tools/render-pdf.js <path/to/page.html> [out.pdf] [--numbers|--no-numbers]');
  console.error('  page numbers default ON for books/, OFF elsewhere');
  process.exit(1);
}

// Books get a page number; a three-page article does not need one.
const numbered = flags.includes('--numbers') ? true
               : flags.includes('--no-numbers') ? false
               : rel.replace(/\\/g, '/').startsWith('books/');

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

/* ---- pagination ----
   Without these a chapter spills a line or two onto a page of its own and
   a chapter numeral can be left stranded at the foot of a page. Chromium
   honours orphans/widows and the break-* properties when printing. */
.hw-article-body p, .hw-article-body li { orphans: 2; widows: 2; }

/* Each chapter starts a fresh page. Not the first — it belongs with the
   title block rather than sitting alone after a page break. */
.hw-article-body .chapter-open { break-before: page; break-after: avoid; }
.hw-article-body .chapter-open.first { break-before: auto; }

/* Never strand a heading, or a scripture reference, at a page foot. */
h1, h2, h3, h4 { break-after: avoid; }
.hw-article-body .scripture-open .ref { break-before: avoid; }

/* Keep the closing blocks intact rather than split across a break. */
.hw-disclaimer, .hw-notes p.n, .hw-selah { break-inside: avoid; }
`;

/* The folio. Chromium renders header/footer templates in their own context:
   they inherit nothing from the page, web fonts are not available, and a
   template with no explicit font-size comes out unreadably small. So the
   styling is inline, with a generic monospace stack standing in for
   IBM Plex Mono and --muted (#5D6470) written out as a literal.
   Every page is numbered, the first included — Chromium offers no way to
   skip it, and @page margin boxes are not supported. */
const FOOTER = `
<div style="width:100%;padding:0 16mm;box-sizing:border-box;
            font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
            font-size:8.5pt;letter-spacing:0.12em;color:#5D6470;text-align:center;">
  <span class="pageNumber"></span>
</div>`;

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
    displayHeaderFooter: numbered,
    headerTemplate: '<div></div>',   // required, or Chromium supplies its own
    footerTemplate: FOOTER,
    margin: {
      top: '18mm',
      bottom: numbered ? '20mm' : '18mm',   // the folio needs room to sit in
      left: '16mm',
      right: '16mm'
    }
  });
  await browser.close();

  const kb = Math.round(fs.statSync(outPdf).size / 1024);
  console.log('wrote ' + path.relative(repo, outPdf).replace(/\\/g, '/') + ' (' + kb + ' KB)');
  console.log('check it by screenshotting ' + path.relative(repo, printHtml).replace(/\\/g, '/'));
})();
