# inbox/

**Drop new pieces here. Nothing in this folder is ever published.**

Everything in `inbox/` except this README is gitignored, so a half-finished
page or a draft note cannot reach the live site by accident — which matters,
because the site serves from the repo root and anything committed is public.

## How to use it

Save the file here straight from the drafting project. Don't rename it, don't
decide which folder it belongs in, don't tidy it. Then say "uploaded".

Claude Code takes it from there: reads the meta block to work out whether it
is a reflection, an article, a word study or a book; moves it to the right
folder; checks it against `CONVENTIONS.md`; resolves any `[verify]` items;
renders a PDF if one is wanted; wires up the card, manifest entry, feed item
and ledger row; rebuilds the index; and commits.

## Why the sorting is not yours to do

Pieces have arrived in the wrong folder twice, in both directions — a
reflection built as an article and filed under `articles/`, and an article
called a reflection and filed under `reflections/`. Both were caught by
reading the meta block, which says what the page actually is. Deciding at the
point of saving adds a judgement call that has to be made again anyway.

## What this folder is not

It is not storage. Once a piece is processed its file moves out; anything
still sitting here is unprocessed. If something has been here a while, it was
missed — say so.

It is not a place for material that exists nowhere else. On 16 Sep 2026 two
substantial working notes were found living only in a drafting project's
uploaded knowledge, with no copy in the repo and no fetch path; deleting those
uploads would have destroyed them. Anything worth keeping gets committed to
`notes/`, not left in an ignored folder.

## A multi-file handover may arrive as one zip

On 18 Sep 2026 a drafting session delivered three files and then reported that
its file cards had "failed twice" and come through blank, and offered to paste
the HTML into the chat as plain text instead. Nothing had failed: the delivery
had landed here as a single `files1.zip`, which unzipped to exactly the three
files described. The session could not see this, because it has no route to
this machine and no way to confirm what arrived.

So: **look in this folder before accepting a report that delivery failed**, and
unzip anything that turns up. A drafting project's account of the transport is
a guess about a thing it cannot observe. That is not a fault in the project —
it is a limit of where it sits — but it is a guess, and it can be wrong in the
direction of extra work.
