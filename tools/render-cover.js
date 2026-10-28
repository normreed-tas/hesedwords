/* ================================================================
   RENDER A FULL-BLEED A5 COVER AND PUT IT IN FRONT OF A BOOKLET PDF

   Run from the repo root:
     NODE_PATH=<dir with playwright AND pdf-lib> node tools/render-cover.js \
       <image> <body-A5.pdf> <out.pdf> --title "..." --subtitle "..." --byline "..."

   Added 28 Oct 2026 for Therefore. Norm designs the cover image (in Canva,
   no words on it) and the words are set here, so the type matches the site.

   Why a separate render: Chromium numbers every page it prints and cannot
   skip the first, so a cover printed with the body would carry a folio.
   The cover is rendered on its own, with no margins and no footer, and
   merged in front of the numbered body with pdf-lib. The body's page
   numbers therefore start at 1 on the inside front cover.

   Then impose the result with tools/impose-booklet.js as usual.
   ================================================================ */
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const opt = k => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : ''; };
const pos = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1].startsWith('--')));
const [img, bodyPdf, outPdf] = pos;
if (!img || !bodyPdf || !outPdf) {
  console.error('usage: node tools/render-cover.js <image> <body-A5.pdf> <out.pdf> --title T --subtitle S --byline B [--blurb text] [--png preview.png] [--thumb cover.jpg] [--light]  (body '-' = thumbnail only)');
  process.exit(1);
}
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const imgData = 'data:image/jpeg;base64,' + fs.readFileSync(img).toString('base64');

// --light, added 28 Oct 2026 for the younger readers' books: dark ink on a
// pale image, with a soft cream wash instead of the dark shading.
const LIGHT = `
  .cover::before { background: linear-gradient(rgba(250,246,238,.7), rgba(250,246,238,0)); }
  .cover::after { background: linear-gradient(rgba(250,246,238,0), rgba(250,246,238,.75)); }
  .top, .blurb, .byline { color: #23211d; }
  .subtitle { color: rgba(35,33,29,.8); }
`;
const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;1,6..72,300&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  @page { size: A5; margin: 0; }
  html, body { margin: 0; padding: 0; }
  .cover { position: relative; width: 148mm; height: 210mm; overflow: hidden; }
  .cover img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  /* Shade the top and foot so the words read on any image. */
  .cover::before, .cover::after { content: ''; position: absolute; left: 0; right: 0; }
  .cover::before { top: 0; height: 42%; background: linear-gradient(rgba(10,10,14,.72), rgba(10,10,14,0)); }
  .cover::after { bottom: 0; height: ${opt('blurb') ? '45%' : '22%'}; background: linear-gradient(rgba(10,10,14,0), rgba(10,10,14,${opt('blurb') ? '.85' : '.7'})); }
  .top { position: absolute; top: 16mm; left: 13mm; right: 13mm; z-index: 1; color: #fff; }
  .title { font-family: 'Newsreader', Georgia, serif; font-weight: 300; font-size: 50pt;
           line-height: 1; letter-spacing: -0.01em; margin: 0; }
  .subtitle { font-family: 'IBM Plex Mono', monospace; font-size: 8.5pt; letter-spacing: .18em;
              text-transform: uppercase; margin: 6mm 0 0; color: rgba(255,255,255,.85); }
  .blurb { position: absolute; bottom: 24mm; left: 13mm; right: 13mm; z-index: 1; margin: 0;
           font-family: 'Newsreader', Georgia, serif; font-weight: 300; font-size: 11.5pt; line-height: 1.45;
           color: rgba(255,255,255,.93); }
  .byline { position: absolute; bottom: 13mm; left: 13mm; z-index: 1; color: rgba(255,255,255,.9);
            font-family: 'IBM Plex Mono', monospace; font-size: 8.5pt; letter-spacing: .18em; text-transform: uppercase; }
${argv.includes('--light') ? LIGHT : ''}</style></head><body>
<div class="cover"><img src="${imgData}">
  <div class="top"><p class="title">${esc(opt('title'))}</p><p class="subtitle">${esc(opt('subtitle'))}</p></div>
  ${opt('blurb') ? `<p class="blurb">${esc(opt('blurb'))}</p>` : ''}
  <div class="byline">${esc(opt('byline'))}</div>
</div></body></html>`;

(async () => {
  let chromium, PDFDocument;
  try { ({ chromium } = require('playwright')); ({ PDFDocument } = require('pdf-lib')); }
  catch (e) { console.error('Needs playwright and pdf-lib on NODE_PATH (see the header).'); process.exit(1); }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 559, height: 794 }, deviceScaleFactor: 1.2 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  if (opt('png')) await page.screenshot({ path: opt('png'), fullPage: true });   // preview, for checking by eye
  // --thumb writes the finished cover (words included) as a JPG for the books page.
  if (opt('thumb')) await page.screenshot({ path: opt('thumb'), type: 'jpeg', quality: 82, fullPage: true });
  if (bodyPdf === '-') { await browser.close(); console.log('wrote ' + opt('thumb')); return; }
  const coverBytes = await page.pdf({ format: 'A5', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await browser.close();

  const out = await PDFDocument.create();
  const cover = await PDFDocument.load(coverBytes);
  const body = await PDFDocument.load(fs.readFileSync(bodyPdf));
  (await out.copyPages(cover, [0])).forEach(p => out.addPage(p));
  (await out.copyPages(body, body.getPageIndices())).forEach(p => out.addPage(p));
  fs.writeFileSync(outPdf, await out.save());
  console.log(`wrote ${outPdf}: cover + ${body.getPageCount()} pages = ${out.getPageCount()}`);
})();
