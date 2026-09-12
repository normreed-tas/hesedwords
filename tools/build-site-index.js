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
