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
