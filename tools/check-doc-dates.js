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
  return matchDate(text, /current as of\s+(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/i);
}

// "Last reviewed: 1 September 2026"
function reviewDate(text) {
  return matchDate(text, /Last reviewed:\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/i);
}

function matchDate(text, re) {
  const m = text.match(re);
  if (!m) return null;
  const mon = MONTHS.indexOf(m[2].toLowerCase());
  if (mon < 0) return null;
  return new Date(Date.UTC(+m[3], mon, +m[1]));
}

function sh(cmd) {
  return execSync(cmd, { cwd: repo, encoding: 'utf8' }).trim();
}

// Local calendar day, not UTC. The maintainer is UTC+10, so a UTC "today" can be
// yesterday for him — which had this telling him to bump a date backwards.
function localDay(dt) {
  const d = dt || new Date();
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
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
  const commitDay = committed ? localDay(committed) : null;

  if (dirty) {
    const today = localDay();
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

// ---- the register's review cadence -----------------------------------------
// FUTURE-ARTICLES.md is only useful if the review actually happens. Three entries
// and no review and it becomes a place ideas go to be forgotten politely. Eight
// weeks is the outer end of the stated six-to-eight cadence.

const REGISTER = 'notes/FUTURE-ARTICLES.md';
const WEEKS = 8;

const regPath = path.join(repo, REGISTER);
if (fs.existsSync(regPath)) {
  const reviewed = reviewDate(fs.readFileSync(regPath, 'utf8'));
  if (!reviewed) {
    console.log(`NO DATE  ${REGISTER} — no "Last reviewed: <date>" line`);
    stale = true;
  } else {
    const days = Math.max(0, Math.floor((Date.now() - reviewed.getTime()) / 86400000));
    const d = localDay(reviewed);
    if (days > WEEKS * 7) {
      console.log(`OVERDUE  ${REGISTER} — last reviewed ${d}, ${days} days ago`);
      console.log(`         the register only works if the review happens; read it through,`);
      console.log(`         strike what is no longer a piece, and bump the date`);
      stale = true;
    } else {
      console.log(`OK       ${REGISTER} — reviewed ${d} (${days}d ago, due at ${WEEKS * 7}d)`);
    }
  }
}

// ---- which context files just changed --------------------------------------
// These four are pasted into the drafting project. The repo copy is authoritative
// but the session reads the paste, so a commit that changes one is only half done
// until it is re-uploaded. Name them explicitly rather than leaving it to be
// inferred from the commit message.

const CONTEXT = ['CONVENTIONS.md', 'COLLABORATION.md',
                 'notes/FUTURE-ARTICLES.md', 'SITE-INDEX.md'];

// Files in HEAD itself — NOT `git log -1 -- <path>`, which finds the most recent
// commit touching that path whenever it exists and so matches everything.
const inHead = new Set(
  sh('git diff-tree --no-commit-id --name-only -r HEAD').split('\n').filter(Boolean)
);

const touched = CONTEXT.filter(f =>
  inHead.has(f) || sh(`git status --porcelain -- "${f}"`) !== ''
);

if (touched.length) {
  console.log('\nRE-PASTE — these context files changed and the drafting project');
  console.log('still holds the previous copy:');
  for (const f of touched) console.log('  ' + f);
  console.log('The repo copy is authoritative, but the session reads the paste.');
}

if (stale) {
  console.log('\nRe-paste the affected file into the drafting project after bumping,');
  console.log('or the date says current while the content is not.');
  process.exit(1);
}
process.exit(0);
