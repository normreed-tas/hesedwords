# Hesed Words — start here

**This is the entry point for any Claude project writing for hesedwords.com.**
It is deliberately short. Read all of it, then fetch what you need below.

Give a new project this one URL and nothing else, **with today's date typed in by Norm**
(a session must never fill in the date itself — see below):
`https://raw.githubusercontent.com/normreed-tas/hesedwords/main/CONTEXT.md?v=YYYY-MM-DD`

---

## Fetch the files you need — do not ask for them to be pasted

The repo is public. These are **raw text**, not rendered pages, and the repo copy is
always current. **Your fetch tool's copy may not be.**

**Use the addresses in the table below exactly as written. Do not change them.** Each one
ends in `?v=` and a code that changes automatically whenever that file changes. GitHub
ignores the code and serves the current file; a fetch tool that caches by address sees a new
address whenever there is a new file, and cannot hand you an old one.

This replaced an earlier rule — "put today's date on the end" — which failed on 16 October
2026. That session's fetch tool would only open addresses it had seen written out in full,
so it fetched the placeholder `?v=YYYY-MM-DD` literally, the same address it had fetched that
morning, and was handed the morning's copy: a 147-line CONTEXT.md with the wrong token. The
token caught it. The codes below need nothing filled in, so the failure cannot recur.

The history of why any of this exists: On 29 September 2026 a
session fetched `CONVENTIONS.md` at the plain URL and was given the **July** version —
the retired Cinzel design, replaced on 9 August — with nothing to say it was old. The
four other files it fetched came back current. `CONVENTIONS.md` was the only one that
had existed at that address since July. With the date added, the same session got the
current file first time.

Full addresses, so you never have to build one:

| File | When |
|---|---|
| Page conventions — https://raw.githubusercontent.com/normreed-tas/hesedwords/main/CONVENTIONS.md?v=473dedb4 | **Always**, before building any page |
| Brief inventory — https://raw.githubusercontent.com/normreed-tas/hesedwords/main/SITE-INDEX-BRIEF.md?v=04d318c8 | **Always**, before proposing a subject |
| How we work — https://raw.githubusercontent.com/normreed-tas/hesedwords/main/COLLABORATION.md?v=12bd386b | Always, for voice and working practice |
| Full inventory — https://raw.githubusercontent.com/normreed-tas/hesedwords/main/SITE-INDEX.md?v=f2e7d74c | When hunting themes, summaries or a companion |
| Unwritten pieces — https://raw.githubusercontent.com/normreed-tas/hesedwords/main/notes/FUTURE-ARTICLES.md?v=85050be5 | When deciding what to write next |
| Design tokens — https://raw.githubusercontent.com/normreed-tas/hesedwords/main/css/tokens.css?v=d1ab02bf | When writing page-local CSS |
| Song of Songs overlay — https://raw.githubusercontent.com/normreed-tas/hesedwords/main/notes/PROJECT-SONGS.md?v=212b1001 | Song of Songs project only |
| Verification answers — the full address is in Code's report, and Norm pastes it to you | When Norm says Code has answered |

If your fetch tool refuses an address it did not see written out, the ones above are written out.
If a fetch still returns a token Norm did not expect, the five-minute rule below applies; if
it persists after that, stop and say so.

**If you have no fetch tool, try `curl` from bash before concluding you are cut off.**
On 14 October 2026 a session with no fetch tool assumed it had no access and said so;
`raw.githubusercontent.com` turned out to be on its container's allow-list all along, and
this worked first time:

```
curl -s "<an address from the table, exactly as written>"
```

Same rules as any fetch: the address as written, read to the end, quote the token. The absence of
a tool is not the absence of access — test it before reporting it.

If both routes are blocked, say so plainly and ask — do not work from memory of a previous
session, and do not guess the markup.

## Which project are you?

The files above are shared and identical for every project. Where a project works
differently, that difference lives in one overlay file and nowhere else — so the
shared files never fork.

| Project | Also read | Remit |
|---|---|---|
| **Song of Songs** | `notes/PROJECT-SONGS.md` | That book, in depth. Owns all Song of Songs material. Default output is a held note, not a finished page. |
| **Devotional** | nothing further | Everything else. Defers on Song of Songs — reference the existing pieces, but start no new Song work without checking. |

If you do not know which you are, ask before writing anything.

## The read-token protocol

**Which files carry one:** every Markdown file in the table above, `notes/PROJECT-SONGS.md`,
**every held note** (`notes/NOTE-*.md`) and every verification answer file
(`notes/VERIFY-*.md`). These are stamped automatically, so a new one carries a token from
its first commit. These do **not**, and for them a missing token means
nothing: `css/tokens.css` (it is a stylesheet, and an HTML comment cannot go in one — an
earlier version of this paragraph said "every file in the table" and was wrong about it),
page files (`.html`), and the reference texts under `resources/`.

Each of those files ends with a line like:

```
<!-- READ-TOKEN a1b2c3d4 · 452 lines · … -->
```

The token is a hash of that file's own content. **If you cannot quote it, you have
not read the file to the end.** Say so. Do not report anything as absent, and do not
summarise what you have not finished reading.

This exists because of two specific failures, both of which looked identical from
outside — a confident session, holding something, wrong about it:

- A session reported two pieces missing from the index. Both were present, hundreds
  of lines below where its read had stopped.
- A whole-file fetch returned a *paraphrase* of the conventions rather than the text.
  A summary silently drops the nav markup, the three disclaimer variants, the
  footnote id placement and the glossary slug list — and reads as authoritative.

Neither could be fixed by asking more carefully. The token can be checked.

Two sessions quoting different tokens for the same file are holding different files.

**A missing token is a failed read, not a curiosity.** Every file listed above as
carrying one has one. If a
fetch comes back without it, you have either part of the file or the wrong file, and
you cannot tell which from inside it. Re-fetch with today's date on the URL. If the
token still does not come back, stop and say so — do not build from what you have.
The July `CONVENTIONS.md` above arrived with no token, the session noticed and
mentioned it, and then followed the file verbatim anyway. Noticing was not enough;
the absence should have stopped the build.

**A valid token for the wrong version is the other failure, and it looks healthy.** When
Norm gives you the token to expect and a different, well-formed one comes back, you are
holding an earlier version of the file. The usual cause is that the file changed in the
last few minutes: GitHub's raw server keeps its copy for about five minutes after a change,
and a different `?v=` does not always get past it. **Wait five minutes and fetch again
before reporting a problem.** If the expected token still does not arrive, stop and say so.
On 14 October 2026 a session fetched `CONTEXT.md` minutes after a push, got the previous
version with its own perfectly valid token, and could tell only because it had been told
which token to expect. It matched on the first retry.

## What the conventions are for

`CONVENTIONS.md` is binding and must be used **verbatim**. The nav and footer markup,
the three AI-disclaimer variants, the footnote id placement, the glossary slug list
and the PDF block only work exactly as written. If what you are holding *describes*
that file rather than reproducing it, you do not have it.

## What you deliver, and what you do not

**Deliver:** one HTML file, linking `/css/tokens.css`. Opened locally it renders as
unstyled black-on-white — that is correct. Do not inline the stylesheet.

**Do not build:** cards, manifest entries, `feed.xml` items, the home-page panel, or
PDFs. Those are done repo-side and will conflict if you write them.

**Where it goes:** Norm saves every file you produce — pages, notes, anything — into
`inbox/` and nowhere else. That folder is gitignored, so nothing you hand over can
publish by accident. **Do not tell him a destination path.** `notes/` and
`reflections/` are live, tracked directories; a file dropped straight into one is a
file one `git add` away from being on the public site unreviewed. Say what the file
*is* — kind, and for a note whether it is working or held — and the filing is done
repo-side, where the naming conventions and the index live.

**State with the handover**, or it will come back as a question: kind (Reflection /
Article / Word Study / Book); scripture reference and date exactly as they should
appear in the meta block; for a reflection only, whether a PDF is wanted (every article
and every book has one — do not ask); whether a companion line is wanted
and to which pieces; which glossary words are used; and any claim that rests on a
count or a date, flagged `[verify]` so it is checked before publishing rather than
after.

## Who resolves a `[verify]`

**You do not.** Your sandbox reaches this repo and little else, so you cannot open a
lexicon, a concordance, a sermon or an LXX text. Flag the claim and hand it on — do not
soften it into something vague enough to be safe, and do not assert it because it is
probably right.

Claude Code has the repo, the tagged Hebrew text, and general web access, and resolves
them in three kinds:

- **Repo facts** — what exists, git history, glossary slugs, which markup dominates.
- **External checks** — Hebrew and Greek lemmas, occurrence counts, dates, attributions,
  permissions wording.
- **Neither** — anything about where Norm stands, what a piece should argue, or whether
  to revise something published. Those are his, and the honest move is to say so rather
  than resolve them quietly.

**How the questions travel — as files, not pastes.**

- **When the prose locks**, before any HTML: save `<slug>.verify.md` listing every quotation,
  attribution and page reference, each with the source it claims. Norm drops it in `inbox/`.
  This is the part that cannot be fixed after publication without someone having read the
  wrong thing, so it is checked first.
- **At handover**, the same file, extended with every other `[verify]`, goes in beside the page.
- **Answers** are written repo-side to `notes/VERIFY-<slug>.md` (or into the held note, where
  one exists) and pushed. Code's report gives the full address; fetch it and quote the
  token. Do not work from Norm's summary of them, and do not ask him to paste them.

**What Code may fix, and what it must hold.**

- **Fidelity — Code fixes and publishes:** Scripture wording, references, counts, and a
  quotation corrected to match the source it already names.
- **Editorial — Code holds the piece and asks:** a different source or witness; a claim
  removed; a change to the argument; anything about Norm's life; and **a claim that survives
  on different grounds**. If the reason changes, it is editorial, even when the sentence
  looks the same.
- **Same day** is Norm's call, made at handover. It means fidelity fixes go in and the piece
  publishes. It does not let editorial fixes through: a piece that needs one waits for Norm,
  even if it slips a day. On 16 October 2026 the one editorial change made under same-day
  pressure — a commentator swapped for another — was the one that should have come to him
  first.

Answers are kept in the repo so the resolved item stops being re-raised in three months.

## Anything committed here is public

The site serves from the repo root. That includes `/notes/`. Nothing in this repo is
private, so write notes on that footing.
<!-- READ-TOKEN f59183d2 · 210 lines · if you cannot quote this line, you have not read this file to the end: say so rather than reporting anything as absent -->
