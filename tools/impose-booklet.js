/* ================================================================
   IMPOSE AN A5 PDF AS A FOLDED A4 BOOKLET

   Run from the repo root:
     NODE_PATH=<dir with pdf-lib> node tools/impose-booklet.js <in-A5.pdf> <out-A4.pdf>

   Added 25 Oct 2026 for Therefore. The Tamid print booklets were
   imposed in a drafting session and uploaded; this does the same job
   repo-side, so a print booklet travels like every other PDF.

   Saddle-stitch order. The A5 pages are padded with blanks to a multiple
   of four, then placed two to a landscape A4 side: (last, 1), (2, last-1),
   (last-2, 3), ... Print double-sided, flipping on the SHORT edge, stack
   the sheets in order, fold down the middle and staple on the fold.

   Needs pdf-lib, which is not a repo dependency. Install it anywhere
   outside the repo (npm install pdf-lib) and point NODE_PATH at that
   node_modules, the same way render-pdf.js finds playwright.
   ================================================================ */
const fs = require('fs');

let PDFLib;
try { PDFLib = require('pdf-lib'); }
catch (e) {
  console.error('Cannot find pdf-lib. npm install pdf-lib somewhere outside the repo,');
  console.error('then re-run with NODE_PATH pointing at that node_modules.');
  process.exit(1);
}
const { PDFDocument } = PDFLib;

const [inPath, outPath] = process.argv.slice(2);
if (!inPath || !outPath) {
  console.error('usage: node tools/impose-booklet.js <in-A5.pdf> <out-A4.pdf>');
  process.exit(1);
}

const A4W = 841.89, A4H = 595.28;   // landscape A4, in points

(async () => {
  const src = await PDFDocument.load(fs.readFileSync(inPath));
  const n = src.getPageCount();
  const total = Math.ceil(n / 4) * 4;
  const out = await PDFDocument.create();
  const embedded = await out.embedPages(src.getPages());
  const page = i => (i < n ? embedded[i] : null);   // null = blank padding

  for (let s = 0; s < total / 2; s++) {
    // Even sides carry (last, first); odd sides (second, second-last).
    const left  = s % 2 === 0 ? total - 1 - s : s;
    const right = s % 2 === 0 ? s : total - 1 - s;
    const sheet = out.addPage([A4W, A4H]);
    [[left, 0], [right, A4W / 2]].forEach(([idx, x]) => {
      const p = page(idx);
      if (!p) return;
      const scale = Math.min((A4W / 2) / p.width, A4H / p.height);
      const w = p.width * scale, h = p.height * scale;
      sheet.drawPage(p, { x: x + (A4W / 2 - w) / 2, y: (A4H - h) / 2, width: w, height: h });
    });
  }

  fs.writeFileSync(outPath, await out.save());
  console.log(`wrote ${outPath}: ${n} A5 pages (+${total - n} blank) on ${total / 4} A4 sheets, ${total / 2} sides`);
})();
