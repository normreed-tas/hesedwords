/* ================================================================
   CHECK THE GOVERNING DOCS' HEADER DATES
   CONVENTIONS.md and COLLABORATION.md each carry "Full text current
   as of <date>" in their header. That date is what a drafting session
   uses to tell whether its pasted copy is stale.

   An unbumped date is worse than no date: it is a confident false
   signal. This compares each header date against the file's own last
   commit (and against uncommitted changes) and says so when they
   disagree.

   Run from the repo root:  node tools/check-doc-dates.js
   Exit 0 = both current. Exit 1 = at least one stale.
   ================================================================ */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repo = path.resolve(__dirname, '..');
const DOCS = ['CONVENTIONS.md', 'COLLABORATION.md'];

const MONTHS = ['january','february','march','april','may','june',
                'july','august','september','october','november','december'];

// "Full text current as of 29 August 2026"
function headerDate(text) {
  const m = text.match(/current as of\s+(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/i);
  if (!m) return null;
  const mon = MONTHS.indexOf(m[2].toLowerCase());
  if (mon < 0) return null;
  return new Date(Date.UTC(+m[3], mon, +m[1]));
}

function sh(cmd) {
  return execSync(cmd, { cwd: repo, encoding: 'utf8' }).trim();
}

let stale = false;

for (const doc of DOCS) {
  const full = path.join(repo, doc);
  if (!fs.existsSync(full)) { console.log(`MISSING  ${doc}`); stale = true; continue; }

  const declared = headerDate(fs.readFileSync(full, 'utf8'));
  if (!declared) {
    console.log(`NO DATE  ${doc} — header has no "current as of <date>" line`);
    stale = true;
    continue;
  }

  const dirty = sh(`git status --porcelain -- "${doc}"`) !== '';
  const lastCommit = sh(`git log -1 --format=%cI -- "${doc}"`);
  const committed = lastCommit ? new Date(lastCommit) : null;

  const d = declared.toISOString().slice(0, 10);

  // Compare by calendar day: a same-day bump-and-commit is correct.
  const commitDay = committed ? committed.toISOString().slice(0, 10) : null;

  if (dirty) {
    const today = new Date().toISOString().slice(0, 10);
    if (d < today) {
      console.log(`STALE    ${doc} — uncommitted edits, header still says ${d}`);
      console.log(`         bump it to ${today} before committing`);
      stale = true;
    } else {
      console.log(`OK       ${doc} — ${d} (uncommitted edits, date already current)`);
    }
  } else if (commitDay && d < commitDay) {
    console.log(`STALE    ${doc} — header says ${d}, last committed ${commitDay}`);
    console.log(`         a session trusting that date would read an outdated paste as current`);
    stale = true;
  } else {
    console.log(`OK       ${doc} — ${d}`);
  }
}

if (stale) {
  console.log('\nRe-paste the affected file into the drafting project after bumping,');
  console.log('or the date says current while the content is not.');
  process.exit(1);
}
process.exit(0);
