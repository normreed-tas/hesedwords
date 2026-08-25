/* ================================================================
   BUILD A -PREVIEW COPY
   Inlines the LOCAL css/tokens.css in place of the /css/tokens.css
   link, so a deploy page can be viewed as it will actually appear
   before it ships.

   Run from the repo root:
     node tools/build-preview.js reflections/some-piece.html

   Writes reflections/some-piece-PREVIEW.html alongside it.
   *-PREVIEW.html is gitignored and must never be committed.

   Uses the working-tree stylesheet, not the deployed one, so a page
   previewed alongside unpushed tokens.css changes shows those too.
   ================================================================ */
const fs = require('fs');
const path = require('path');

const repo = path.resolve(__dirname, '..');
const rel = process.argv[2];

if (!rel) {
  console.error('usage: node tools/build-preview.js <path/to/page.html>');
  process.exit(1);
}
if (/-PREVIEW\.html$/i.test(rel)) {
  console.error('refusing: that is already a preview file.');
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
  console.error('no /css/tokens.css link found in ' + rel + '.');
  console.error('Either it is one of the documented exceptions that legitimately does');
  console.error('not link the shared stylesheet, or the link is malformed — check before');
  console.error('assuming this script is at fault.');
  process.exit(1);
}

const tokens = fs.readFileSync(path.join(repo, 'css', 'tokens.css'), 'utf8');
html = html.replace(LINK, '<style>\n' + tokens + '\n</style>');

const out = src.replace(/\.html$/i, '-PREVIEW.html');
fs.writeFileSync(out, html, 'utf8');
console.log('wrote ' + path.relative(repo, out).replace(/\\/g, '/') +
            ' (' + fs.statSync(out).size + ' bytes)');
