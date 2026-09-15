/* ================================================================
   CHECK THE GOVERNING DOCS' HEADER DATES
   CONVENTIONS.md and COLLABORATION.md each carry "Full text current
   as of <date>" in their header. Drafting sessions now fetch these
   files rather than holding a paste, so the date is no longer a
   staleness signal — it is a human-readable record of when the content
   last moved, and the read-token stamp is what proves which version a
   session is holding.

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

// ---- paste tracking: REMOVED 16 Sep 2026 ------------------------------------
// This block recorded which commit each context file was last pasted into the
// drafting project, and reported RE-PASTE when the repo had moved on. It existed
// because the project read an uploaded copy rather than the repo, so a commit
// changing a context file was only half done until someone re-uploaded it. It
// caught real drift — SITE-INDEX.md had gone seven pieces stale and silent.
//
// It is gone because the problem is gone. Both drafting projects now fetch the
// files from raw.githubusercontent.com, so the copy a session reads IS the repo
// copy and cannot lag it. `--pasted` and notes/context-pasted.json went with it.
//
// Removed rather than left running, deliberately. A check that reports a
// condition nobody acts on any more trains the maintainer to skim past this
// tool's output — and the two checks that remain below, the header dates and the
// read-token stamps, both matter. A noisy check makes the quiet ones invisible.
//
// If a project is ever set up that cannot reach GitHub, the answer is not to
// restore this: it is CONTEXT.md's rule — say so plainly and ask — because a
// paste that no one can verify was read is the failure the read-token replaced.

// ---- read-token stamps ------------------------------------------------------
// Every context file ends with a hash of its own content, so a session can prove
// to itself whether it read the whole file. A stamp that no longer matches its
// body is worse than none: it lets a session quote a token for text it did not
// finish. Verified here so it rides the existing pre-commit pass.

console.log('');
try {
  execSync(`node "${path.join(repo, 'tools', 'stamp-context.js')}" --check`,
           { cwd: repo, stdio: 'inherit' });
} catch {
  stale = true;
}

if (stale) {
  console.log('\nBump the date before committing, or the header says current');
  console.log('while the content has moved.');
  process.exit(1);
}
process.exit(0);
