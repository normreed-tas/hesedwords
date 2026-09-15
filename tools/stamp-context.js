/* ================================================================
   STAMP READ-TOKENS INTO THE CONTEXT FILES

   Run from the repo root:  node tools/stamp-context.js
   Verify only (no writes):  node tools/stamp-context.js --check

   WHY THIS EXISTS.

   Two failures kept happening that a drafting session could not detect
   in itself, and that no amount of asking fixed:

   1. PARTIAL READ. On 12 Sep 2026 a session reported two pieces missing
      from SITE-INDEX.md. Both were present, at the head of their own
      sections, hundreds of lines below where the read stopped. It had the
      right file and reported absence from the part it had seen.

   2. PARAPHRASE. A whole-file fetch can come back as a summary rather
      than the text. A summary of CONVENTIONS.md silently drops the nav
      markup, the three disclaimer variants, the footnote id placement and
      the glossary slug list — and reads as authoritative while doing it.

   Both look identical from outside: a confident session, holding
   something, wrong about it. The fix is not another warning. It is a fact
   the session can check about ITSELF.

   So every context file now ends with a READ-TOKEN line, derived from the
   file's own body. A session that has read to the end can quote it. One
   that read the first screen, or that holds a paraphrase, cannot — and it
   cannot guess, because the token is a hash of the content.

   That turns an unanswerable question ("did you read all of it?") into a
   one-line test anyone can run: "quote me the read-token."

   The token changes whenever the file changes, so it doubles as a
   freshness check: two sessions quoting different tokens are holding
   different files.

   `--check` exits non-zero if any stamp no longer matches its file, which
   is how an edited-but-unstamped file gets caught before it is committed.
   check-doc-dates.js calls this, so it runs on the existing pre-commit
   pass without anyone having to remember a new step.
   ================================================================ */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const repo = path.resolve(__dirname, '..');

const FILES = [
  'CONTEXT.md',
  'CONVENTIONS.md',
  'COLLABORATION.md',
  'notes/FUTURE-ARTICLES.md',
  'notes/PROJECT-SONGS.md',
  'SITE-INDEX.md',
  'SITE-INDEX-BRIEF.md',
];

const TOKEN_RE = /\n*<!-- READ-TOKEN [0-9a-f]{8} · \d+ lines[^>]*-->\s*$/;

// Normalise trailing whitespace before hashing. Without the strip this is not
// idempotent: stripping the token also eats the newline that preceded it, so a
// freshly-stamped file hashes differently from the one just written and --check
// fails the moment after a successful stamp.
function bodyOf(text) {
  return text.replace(TOKEN_RE, '').replace(/\s*$/, '') + '\n';
}

function tokenFor(body) {
  return crypto.createHash('sha256').update(body, 'utf8').digest('hex').slice(0, 8);
}

function stampLine(body) {
  const lines = body.replace(/\n$/, '').split('\n').length;
  return `<!-- READ-TOKEN ${tokenFor(body)} · ${lines} lines · ` +
         `if you cannot quote this line, you have not read this file to the end: ` +
         `say so rather than reporting anything as absent -->`;
}

const check = process.argv.includes('--check');
let problems = 0;
let changed = 0;

for (const rel of FILES) {
  const full = path.join(repo, rel);
  if (!fs.existsSync(full)) {
    console.log(`MISSING   ${rel}`);
    problems++;
    continue;
  }

  const text = fs.readFileSync(full, 'utf8');
  const body = bodyOf(text);
  const want = stampLine(body);
  const have = (text.match(TOKEN_RE) || [''])[0].trim();

  if (have === want) {
    console.log(`OK        ${rel} — ${tokenFor(body)}`);
    continue;
  }

  if (check) {
    console.log(`UNSTAMPED ${rel} — content changed since it was last stamped`);
    problems++;
  } else {
    fs.writeFileSync(full, body + want + '\n', 'utf8');
    console.log(`STAMPED   ${rel} — ${tokenFor(body)}`);
    changed++;
  }
}

if (check && problems) {
  console.log('\nRun: node tools/stamp-context.js');
  console.log('A file whose stamp does not match its content will let a session');
  console.log('quote a token it did not actually read to the end of.');
  process.exit(1);
}
if (!check && changed) {
  console.log(`\n${changed} file(s) re-stamped. Commit them.`);
}
process.exit(problems && check ? 1 : 0);
