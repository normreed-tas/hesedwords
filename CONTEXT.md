# Hesed Words — start here

**This is the entry point for any Claude project writing for hesedwords.com.**
It is deliberately short. Read all of it, then fetch what you need below.

Give a new project this one URL and nothing else:
`https://raw.githubusercontent.com/normreed-tas/hesedwords/main/CONTEXT.md`

---

## Fetch the files you need — do not ask for them to be pasted

The repo is public. These are **raw text**, not rendered pages, and they are always
current because they are the repo itself. No paste, no upload, no stale copy.

| File | URL (prefix `https://raw.githubusercontent.com/normreed-tas/hesedwords/main/`) | When |
|---|---|---|
| Page conventions | `CONVENTIONS.md` | **Always**, before building any page |
| Brief inventory | `SITE-INDEX-BRIEF.md` | **Always**, before proposing a subject |
| How we work | `COLLABORATION.md` | Always, for voice and working practice |
| Full inventory | `SITE-INDEX.md` | When hunting themes, summaries or a companion |
| Unwritten pieces | `notes/FUTURE-ARTICLES.md` | When deciding what to write next |
| Design tokens | `css/tokens.css` | When writing page-local CSS |

If your sandbox blocks this host, say so plainly and ask — do not work from memory
of a previous session, and do not guess the markup.

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

Every file above ends with a line like:

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
appear in the meta block; whether a PDF is wanted; whether a companion line is wanted
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

Answers come back written into the note itself, in a marked section, so the resolved
item stops being re-raised in three months.

## Anything committed here is public

The site serves from the repo root. That includes `/notes/`. Nothing in this repo is
private, so write notes on that footing.
<!-- READ-TOKEN 1f73f4fc · 119 lines · if you cannot quote this line, you have not read this file to the end: say so rather than reporting anything as absent -->
