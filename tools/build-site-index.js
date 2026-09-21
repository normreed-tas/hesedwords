/* ================================================================
   BUILD SITE-INDEX.md
   Regenerates the site inventory from the four js/*-data.js manifests.
   Run from the repo root:  node tools/build-site-index.js
   Re-run whenever content is added — SITE-INDEX.md is generated and
   must never be hand-edited.
   ================================================================ */
const fs = require('fs');
const path = require('path');

const repo = path.resolve(__dirname, '..');

// The manifests are plain scripts declaring a top-level const. Evaluate each
// in isolation and hand back the binding by name.
function loadManifest(file, binding) {
  const src = fs.readFileSync(path.join(repo, 'js', file), 'utf8');
  return new Function(src + '\nreturn ' + binding + ';')();
}

const sections = [
  { label: 'Reflections',  kind: 'reflection', items: loadManifest('reflections-data.js',  'ARTICLES') },
  { label: 'Articles',     kind: 'article',    items: loadManifest('articles-data.js',     'ARTICLES_META') },
  { label: 'Books',        kind: 'book',       items: loadManifest('books-data.js',        'BOOKS_META') },
  { label: 'Word Studies', kind: 'word study', items: loadManifest('word-studies-data.js', 'STUDIES') },
];

const byDateDesc = (a, b) => String(b.date || '').localeCompare(String(a.date || ''));
const total = sections.reduce((n, s) => n + s.items.length, 0);

const out = [];
out.push('# Site index — hesedwords.com');
out.push('');
out.push('**Generated file. Do not hand-edit.** Rebuild with `node tools/build-site-index.js`');
out.push('after adding content; it reads the four `js/*-data.js` manifests, which are the');
out.push('source of truth.');
out.push('');
out.push('This exists so a drafting session with no repo access can answer two questions');
out.push('before writing: *does something on this already exist?* and *what did it say?*');
out.push('The theme index at the foot is the fastest way in — a new piece whose theme');
out.push('already appears there probably has a companion waiting.');
out.push('');
out.push(`**${total} pieces** — ` + sections.map(s => `${s.items.length} ${s.label.toLowerCase()}`).join(', ') + '.');
out.push('');

for (const s of sections) {
  out.push('---');
  out.push('');
  out.push(`## ${s.label} (${s.items.length})`);
  out.push('');
  for (const it of [...s.items].sort(byDateDesc)) {
    const scripture = (it.scripture || []).join('; ') || '—';
    const word = it.translit ? ` [${it.translit}]` : '';
    out.push(`**${it.date || 'undated'} · ${it.title}**${word}`);
    out.push(`${scripture} · \`${it.url}\``);
    if (it.themes && it.themes.length) out.push(`*Themes:* ${it.themes.join(', ')}`);
    if (it.summary) out.push(it.summary);
    out.push('');
  }
}

// ---- theme index: theme -> every piece carrying it ----
const themes = new Map();
for (const s of sections) {
  for (const it of s.items) {
    for (const t of it.themes || []) {
      const key = t.toLowerCase();
      if (!themes.has(key)) themes.set(key, []);
      themes.get(key).push({ title: it.title, url: it.url, kind: s.kind, date: it.date });
    }
  }
}

out.push('---');
out.push('');
out.push(`## Theme index (${themes.size} themes)`);
out.push('');
out.push('Every theme in use, and what carries it. A theme with more than one piece');
out.push('against it is a companion candidate.');
out.push('');
for (const key of [...themes.keys()].sort()) {
  const list = themes.get(key).sort(byDateDesc);
  const rendered = list.map(p => `[${p.title}](${p.url}) (${p.kind})`).join(' · ');
  out.push(`- **${key}** — ${rendered}`);
}
out.push('');

fs.writeFileSync(path.join(repo, 'SITE-INDEX.md'), out.join('\n'), 'utf8');
console.log(`SITE-INDEX.md written — ${total} pieces, ${themes.size} themes.`);

/* ------------------------------------------------------------------
   SITE-INDEX-BRIEF.md — the whole inventory, one line per piece.

   SITE-INDEX.md is ~140KB with summaries and a theme index, and that
   size is itself a failure mode: on 12 Sep 2026 a session read the top
   of it and reported two pieces missing that were hundreds of lines
   further down. A file too long to hold produces confident wrong
   answers about what is in it.

   So this is the same inventory with the summaries and themes stripped:
   small enough to read whole, which makes "does a piece on X already
   exist?" answerable without trusting a partial read. The full index
   stays authoritative for themes, summaries and companion-hunting.
   ------------------------------------------------------------------ */
const brief = [];
brief.push('# Hesed Words — brief index');
brief.push('');
brief.push(`**${total} pieces** — ` +
  sections.map(s => `${s.items.length} ${s.label.toLowerCase()}`).join(', ') + '.');
brief.push('');
brief.push('One line per piece: date · title · scripture · url. Deliberately short enough');
brief.push('to read in full. Use it to answer "does this already exist?" — then read');
brief.push('SITE-INDEX.md for summaries, themes and companion candidates.');
brief.push('');
for (const s of sections) {
  brief.push(`## ${s.label} (${s.items.length})`);
  brief.push('');
  for (const it of [...s.items].sort(byDateDesc)) {
    const scrip = (it.scripture || []).join('; ') || '—';
    brief.push(`- ${it.date || 'undated'} · **${it.title}** · ${scrip} · \`${it.url}\``);
  }
  brief.push('');
}

fs.writeFileSync(path.join(repo, 'SITE-INDEX-BRIEF.md'), brief.join('\n'), 'utf8');
const briefKb = Math.round(Buffer.byteLength(brief.join('\n'), 'utf8') / 1024);
const fullKb  = Math.round(Buffer.byteLength(out.join('\n'), 'utf8') / 1024);
console.log(`SITE-INDEX-BRIEF.md written — ${briefKb} KB against the full index's ${fullKb} KB.`);

// Both index files were just rewritten from scratch, which drops their
// read-tokens. Re-stamp here rather than leaving it as a second command to
// remember — an unstamped index fails the pre-commit check for no reason, and
// a check that cries wolf gets ignored.
require('child_process').execSync(
  `node "${path.join(__dirname, 'stamp-context.js')}"`,
  { cwd: repo, stdio: 'pipe' });
console.log('Read-tokens re-stamped.');

/* ------------------------------------------------------------------
   LEDGER ORDER CHECK

   The home-page "Current reading" panel holds exactly two rows, newest
   first. Getting that order wrong is the most repeated mistake in this
   repo — CONVENTIONS has warned about it in prose for weeks and it kept
   happening anyway, because the failure mode is dropping a new row into
   whichever slot the removed one vacated rather than placing it by date.
   A warning that relies on being remembered is the form that keeps
   failing, so it is a check now.

   It lives here because build-site-index.js is already the mandatory last
   step of any commit that adds a piece, so it cannot be skipped without
   skipping the index rebuild too.
   ------------------------------------------------------------------ */
const MONTHS = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5,
                 Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };

const idxHtml = fs.readFileSync(path.join(repo, 'index.html'), 'utf8');
const panel = (idxHtml.split('id="current-reading"')[1] || '').split('</section>')[0];
const ledgerRows = [...panel.matchAll(/<h3>([\s\S]*?)<\/h3>/g)].map(m => m[1].trim());
const ledgerDates = [...panel.matchAll(/<div>(\d{1,2}) (\w{3}) (\d{4})<\/div>/g)]
  .map(m => new Date(+m[3], MONTHS[m[2]], +m[1]));

const ledgerProblems = [];
if (ledgerRows.length !== 2) {
  ledgerProblems.push(`panel has ${ledgerRows.length} rows; CONVENTIONS says exactly two`);
}
if (ledgerDates.length === ledgerRows.length) {
  for (let i = 1; i < ledgerDates.length; i++) {
    if (ledgerDates[i] > ledgerDates[i - 1]) {
      ledgerProblems.push(
        `row ${i + 1} ("${ledgerRows[i]}") is NEWER than row ${i} ` +
        `("${ledgerRows[i - 1]}") — the panel must run newest first`);
    }
  }
}

if (ledgerProblems.length) {
  console.error('\nLEDGER ORDER PROBLEM in index.html #current-reading:');
  ledgerProblems.forEach(p => console.error('  - ' + p));
  console.error('Fix the panel before committing.');
  process.exitCode = 1;
} else if (ledgerRows.length === 2) {
  // Local date parts, NOT toISOString(). These Dates are constructed at local
  // midnight, so at UTC+10 toISOString() reports the previous day and the OK
  // line confidently states the wrong date. Same bug was fixed once already in
  // check-doc-dates.js; it came back here because the formatter was rewritten
  // rather than reused.
  const fmt = d => `${d.getFullYear()}-` +
                   `${String(d.getMonth() + 1).padStart(2, '0')}-` +
                   `${String(d.getDate()).padStart(2, '0')}`;
  console.log(`Ledger OK — ${fmt(ledgerDates[0])} "${ledgerRows[0]}" ` +
              `then ${fmt(ledgerDates[1])} "${ledgerRows[1]}".`);
}

// ---------------------------------------------------------------------------
// INTERNAL LINK CHECK
//
// Added 21 Sep 2026 after the SECOND broken card link of the same shape in one
// month: books.html pointed at /books/pdf/that-day.pdf (no such directory) and
// articles.html pointed at /articles/sitting-with-a-sinner.pdf (dropping the
// /pdf/ segment). Both were live 404s on a deployed site, both sat in a card
// that had been hand-written next to a correct one, and neither was visible
// from the page it was on. Two of a shape is a pattern in how cards get
// written, not bad luck — so it becomes a check rather than a thing to
// remember.
//
// Resolves against the FILE SYSTEM, not HTTP: the point is to fail before the
// push, and the repo root is the document root on GitHub Pages, so a path that
// resolves here resolves live.
//
// Widened 21 Sep 2026 from the seven listing pages to every page in the repo.
// Both known failures were on listing cards, so it started there — but a dead
// companion link inside a reflection is the same failure and was not covered.
// Measured before widening: 166 pages, 2655 links, 0.28 seconds, nothing
// broken. At that price there was no argument for checking only some of it.
//
// EXCLUDED, deliberately:
//   old/       the retired design, 125 pages kept for reference. Its links are
//              not maintained and failing on them would train us to ignore this.
//   inbox/     gitignored staging; nothing there is published.
//   *-PREVIEW.html / *-PRINT.html  render scratch, gitignored, never served.
//
// resources/ is NOT excluded, though an earlier version of this had it in the
// list by mistake. It holds six tracked, served pages — the Bernard, Spurgeon
// and Union and Communion reprints — which are as publishable as anything else.
// Only resources/Lewis/ is untracked there, and it contains no HTML.
//
// KNOWN BLIND SPOT: resolving against disk means a link to a file that exists
// locally but is NOT COMMITTED passes here and 404s live. resources/Lewis/ is
// exactly that case — deliberately untracked, possibly in copyright. Nothing
// links to it today. If anything ever does, this check will not catch it.
// ---------------------------------------------------------------------------
const LINK_SKIP_DIRS = new Set(['.git', 'old', 'inbox', 'node_modules']);

function htmlPagesUnder(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (LINK_SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) htmlPagesUnder(full, acc);
    else if (/\.html$/.test(entry.name) && !/-(PREVIEW|PRINT)\.html$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

const linkPages = htmlPagesUnder(repo);
const linkProblems = [];
let linksChecked = 0;

// One stat() per unique target, not per link: 2655 links resolve to ~236
// distinct files, and the repeated nav and footer on every page are most of
// the difference.
const targetCache = new Map();
function targetResolves(target) {
  if (targetCache.has(target)) return targetCache.get(target);
  const ok = fs.existsSync(target) &&
             (!fs.statSync(target).isDirectory() ||
              fs.existsSync(path.join(target, 'index.html')));
  targetCache.set(target, ok);
  return ok;
}

for (const abs of linkPages) {
  const html = fs.readFileSync(abs, 'utf8');
  const page = path.relative(repo, abs).replace(/\\/g, '/');
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (href.startsWith('//')) continue;            // protocol-relative, external
    linksChecked++;
    if (!targetResolves(path.join(repo, decodeURIComponent(href)))) {
      linkProblems.push(`${page} -> ${href}`);
    }
  }
}

if (linkProblems.length) {
  console.error('\nBROKEN INTERNAL LINKS — these are 404s once pushed:');
  [...new Set(linkProblems)].forEach(p => console.error('  - ' + p));
  console.error('Fix them before committing.');
  process.exitCode = 1;
} else {
  console.log(`Links OK — ${linksChecked} internal links across ` +
              `${linkPages.length} pages.`);
}
