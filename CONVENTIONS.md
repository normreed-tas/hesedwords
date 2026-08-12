# Hesed Words — Page Conventions (Direction A)

Give this file (or the fenced block below) to any assistant generating a page for
the site, so new pages arrive matching the live site and need no nav/footer fixes.

This describes the **current** design system ("Direction A" — cool bone paper, dark
slate hero/footer, oxblood accent, brass reserved for Hebrew + numerals, Newsreader/IBM
Plex Mono/Frank Ruhl Libre). The site was fully redesigned into this system in August
2026; the previous Cinzel/parchment design is preserved read-only at `/old/` (see
"The old design" below) — do not build new pages in that style.

---

## Paste-in block

````
SITE CONVENTIONS — match these exactly.

BYLINE: always "Norm Reed" (never "Norman Reed").

SHARED STYLESHEET: every page links the shared tokens file — do not inline a
reimplementation of nav/footer/article CSS. Include in <head>:
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..700;1,6..72,200..700&family=IBM+Plex+Mono:wght@400;500&family=Frank+Ruhl+Libre:wght@300..700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/css/tokens.css" />
<body class="hw"> — the "hw" class is required; tokens.css scopes almost everything under it.

Page-specific styling (drop caps, callouts, one-off boxes) goes in a <style> block in
the page's own <head>, built from the shared CSS custom properties (--paper, --paper-hover,
--ground, --ink, --muted, --hairline, --oxblood, --oxblood-dark, --brass, --font-serif,
--font-mono, --font-heb) — never hardcode a hex value that already has a token.

NAV — use this exact markup near the top of <body>. Add class="current" to the one
link matching this page's section (Reflections / Articles / Word Studies / Books /
Glossary / Resources). Do NOT include a "Contact" or "Home" item — the wordmark is the
home link.

<header class="hw-nav">
  <div class="hw-nav-inner">
    <a href="/index.html" class="hw-wordmark">
      <span class="name">HesedWords</span>
      <span class="heb">חֶסֶד</span>
    </a>
    <nav>
      <a class="current" href="/reflections.html">Reflections</a>
      <a href="/articles.html">Articles</a>
      <a href="/word-studies.html">Word Studies</a>
      <a href="/books.html">Books</a>
      <a href="/glossary.html">Glossary</a>
      <a href="/resources.html">Resources</a>
    </nav>
  </div>
</header>

FOOTER — every page, last thing before </body>. Reuse verbatim (including the
"Previous design" link, which points at the old-design snapshot):

<footer class="hw-foot">
  <div class="hw-foot-inner">
    <div>
      <div class="hw-foot-word">HesedWords</div>
      <div class="hw-foot-tag">Hesed words. Written for the road.</div>
    </div>
    <div><a href="/about.html">About</a><br><a href="/contact.html">Contact</a><br><a href="/follow.html">Follow</a><br><a href="/old/index.html">Previous design</a></div>
    <div>Onesimus Foundation<br>Hobart, Tasmania<br>© Norm Reed</div>
  </div>
</footer>

READING PAGES (reflection / article / word study / book chapter) — standard skeleton:

<article class="hw-article">
  <div class="hw-article-grid">
    <div class="hw-article-meta">
      <div class="kind">Reflection</div>       <!-- or Article / Word Study / Book -->
      <div>Psalm 62</div>                       <!-- scripture reference -->
      <div>9 Aug 2026</div>                     <!-- date, "D Mon YYYY" -->
      <div class="byline">Norm Reed</div>
    </div>
    <div>
      <h1>Page Title</h1>
      <div class="hw-article-body">
        <!-- prose: <p>, <p class="verse"> for scripture quotes, <p class="pull"> for
             pull-quotes, <blockquote> for longer quoted passages, .hw-selah block,
             a.gloss links -->
      </div>
    </div>
  </div>
</article>

GLOSSARY LINKS (standing practice) — whenever the piece uses a Hebrew OR Greek word
that has a glossary entry, make its FIRST mention a link to the glossary; leave every
later mention as plain <em>. Only link words that actually exist in the glossary.
Deep-link form (class="gloss" is already styled by tokens.css, no extra CSS needed):
  <a class="gloss" href="/glossary.html#hesed"><em>hesed</em></a>
The href fragment is the word's transliteration, letters only; the glossary's
hash-matcher resolves it against the term id (seed_<slug>) or transliteration, so
#mishpat opens seed_mishpat. Confirmed slugs include:
hesed, emunah, mishpat, tzedakah (NOTE: spelled with a k, not q), rahamim, tuv,
shem, derek, torah, lev, chanan, shalom, shuvah, zakar, sod, selichah, shamar,
selah, hevel (note: some pieces spell hevel "hebel" — the glossary slug is #hevel),
yada, da'at (paired entry, slug #yada), emet, paga, argos, ta'am, nashaq, sava, sakal,
chokmah, anavah, gibbor, rachash, mashak, eleos, charis, aletheia, agape, rasha, tzaddiq,
hagioi (paired entry with hagios, filed under the plural since that's the form articles use),
batach, menuha, yachad, nachalah, qavah, barak, shub (slug for the phrase "shub shebut"),
yirat (slug for the phrase "yirat Adonai"), neder, gur, kavod, ruth (a proper name, not a
transliterated word — scope exception since the whole point of its companion article is
that "Ruth" is the standing picture of hesed).
NOTE: this list has previously fallen out of sync with the actual glossary — if a word looks
plausible but isn't listed here, grep glossary.html for its slug before assuming it needs
seeding.
If unsure of a slug, still use the natural transliteration — the glossary matches
on the transliteration, so close spellings resolve.

AI DISCLAIMER — articles, word studies, and books carry this block near the end of
the .hw-article-body (reflections usually do not). Reuse verbatim inside a
<div class="hw-disclaimer">:
<p>These reflections did not begin with artificial intelligence. They began with years of ministry, reading, prayer, suffering, and conversation.</p>
<p>During the development of this manuscript, AI became a conversation partner. It challenged assumptions, tested arguments, suggested structures, and helped refine expression. Many of the words that follow emerged through that dialogue.</p>
<p>The experiences, convictions, interpretations, and conclusions remain my own.</p>
(Adjust "reflections" to "this story" / "this book" etc. where the piece calls for it —
see books/who-would-have-thought.html for a book-appropriate variant.)

COPYRIGHT — before hosting or quoting any third-party text (not Norm's own writing),
check whether the author is public domain. Confirmed public domain sources already on
the site: James Hudson Taylor (d. 1905), Bernard of Clairvaux (12th c.), C.H. Spurgeon
(d. 1892). Authors who died after 1955 or so are very likely still in copyright — do
NOT host their full text. Instead: a resource-card description, one short attributed
quote (a sentence, not a paragraph), and a link out to a legitimate third-party page
about the work (never a URL you can't verify — ask the maintainer for one, don't invent
it). See resources.html's "The Weight of Glory" (C.S. Lewis) card for the pattern.
Where a piece is substantively ABOUT a copyrighted work — criticism or review, which is
stronger ground than illustration — two or three short attributed quotes across the
article is the ceiling. Choose them deliberately; don't let favourites accumulate.

DELIVER TWO FILES, ALWAYS — the deploy page, and a preview copy.
  1. The deploy page links /css/tokens.css exactly as above. Opened on its own, outside
     the site, it renders as unstyled black-on-white text, because the stylesheet lives
     on the server. That is correct and expected — do not "fix" it by inlining.
  2. The preview copy has the SAME filename with -PREVIEW appended, and the entire
     current contents of tokens.css pasted into a <style> block in place of that link.
     Nothing else differs. This is the only way to see the page as it will actually
     appear before it is deployed.
Fetch the current stylesheet from https://hesedwords.com/css/tokens.css each time rather
than reusing an old copy. NEVER deploy the -PREVIEW file — it goes stale the moment
tokens.css changes, and it defeats the shared-stylesheet rule.

DO NOT create a card or landing-page/manifest entry yourself — just build the page.
The card copy and manifest entry are added separately by the maintainer.
````

---

## Maintainer notes (not for the generating prompt)

- **Deploy:** GitHub Pages, auto-deploys on push to `main`. (Not Cloudflare — Cloudflare
  only handles DNS.) If a deploy fails with "Deployment failed, try again later," it's a
  transient Pages issue — push an empty commit to re-trigger:
  `git commit --allow-empty -m "Trigger Pages redeploy"; git push`
  If it stalls in "Queued" for many minutes, cancel and push an empty commit.
- **Branches:** `main` is the live Direction A site. `old-site` is a frozen snapshot of
  the previous design, kept as a full backup — do not develop on it. A static copy of
  that same old design also lives at `/old/` inside `main` (its internal links are
  rewritten to stay under `/old/`), purely so a human can browse the previous design
  live at hesedwords.com/old/ for comparison. Don't add new content to `/old/` — it's a
  frozen comparison copy, not a second live site.
- **Preview files:** the `-PREVIEW` copies are throwaway. Don't commit them; they exist
  only to be looked at before the real page ships. `.gitignore` carries `*-PREVIEW.html`
  so a stray one can't be published by accident.
- **Home page panels:** `index.html`'s "Current reading" ledger (`#current-reading`,
  built from `.hw-row` blocks) should have its newest entry updated whenever a new
  reflection is published — add a new `.hw-row` at the top.
- **Reflections listing** is generated from the `ARTICLES` manifest in
  `js/reflections-data.js` (loaded via `<script src>` by `reflections.html`) — NOT
  inline in the page. Edit that file when adding a reflection, newest first.
- **Word Studies listing** is generated from the `STUDIES` manifest in
  `js/word-studies-data.js` (loaded via `<script src>` by `word-studies.html`). Each
  study: one object (id `ws-slug`, `lang` "hebrew"/"greek", plus `date`, `scripture[]`,
  `themes[]` — used by the combined home-page index).
- **Combined home-page index** (site-wide "Browse everything" grid on `index.html`,
  powered by `js/browse.js`) reads from FOUR files in `js/`: `reflections-data.js`,
  `word-studies-data.js`, `articles-data.js`, `books-data.js`. The first two are the
  single source of truth for their own listing pages (see above). The last two are
  metadata MIRRORS — `articles.html` and `books.html` remain hand-written HTML cards.
  **Whenever you add a new article or book card by hand, also add a matching entry to
  the corresponding `-data.js` file** (title, url, date, scripture[], themes[], summary)
  or it won't appear in the combined index. Do not rename the class names `browse-*`
  used in `css/tokens.css` — `js/browse.js` injects markup against those exact selectors.
- **RSS:** `feed.xml` at the repo root is the reflections feed (linked from the home
  page via `follow.html`). When adding a new reflection, add one `<item>` at the TOP:
  title, absolute link + guid (same URL), pubDate in RFC-822 form (e.g.
  `Sun, 09 Aug 2026 06:00:00 +1000`), an `<enclosure>` + `<media:thumbnail>` pair
  pointing at `https://hesedwords.com/images/feed-banner.png`, and a one-sentence
  description (reuse the manifest summary, shortened). Keep roughly the 15–16 most
  recent items; drop the oldest when adding.
- **Feed images:** `images/feed-banner.png` (1200×630) and `images/feed-icon.png`
  (512×512) are reused site-wide in `feed.xml` — don't regenerate per upload.
- **In-page PDF link:** articles/books with a companion PDF need a download link on the
  page itself, styled per the page's own palette (see `.hw-disclaimer`-adjacent blocks
  in converted articles), not just on the listing card.
- **Resource pages** (`resources/*.html`) intentionally keep the OLD Cinzel/parchment
  styling, not Direction A — they're public-domain classical texts, and the older look
  suits reprinted historical material. `resources.html` itself (the index/listing page)
  IS Direction A, using `.resource-card`. Do not convert the individual resource reading
  pages to Direction A unless specifically asked.
- **Pages that legitimately do NOT link `/css/tokens.css`.** The shared-stylesheet rule
  has a small set of deliberate exceptions. An audit that flags one of these as a stray
  `-PREVIEW` copy or a broken page is wrong — leave them alone unless asked to convert:
  - `/old/**` — the frozen previous-design snapshot.
  - `resources/*.html` — the reprinted classical texts described above.
  - `books/the-oldest-loneliness.html` — deliberately in **Onesimus Foundation house
    style** (navy/teal/Arial, not Direction A). It is a pastoral book written for people
    in prison, presented as Onesimus material rather than as a Hesed Words reading page.
  - `books/who-would-have-thought-illustrated.html` — a **self-contained illustrated
    edition** with its own honey/sky/rose palette and five base64-embedded fonts (which
    is why the file runs to several MB). It is built to survive being printed or passed
    around offline, so it embeds everything and styles its own `.hw-nav`/`.hw-foot`
    instead of relying on the server's stylesheet.
  - `reflections/jonah-2-8-poster.html` — a standalone A4 printable poster, with no site
    nav or footer at all.
  - `articles/hesedwords-article-template.html` and `articles/article-card-snippet.html`
    — not pages; a template (still carrying `{{PLACEHOLDER}}` tokens) and a markup
    snippet kept for reference.

## Established patterns for long-form / paired pieces

- **Selah block**: `<div class="hw-selah">` with `.rule` / `.word` / `.rule` children —
  already fully styled by tokens.css, no per-page CSS needed. Use for a personal,
  reflective pause in a reflection. The block is the ornamental divider; the reflective
  text follows it as ordinary `<p>`.
- **Pull-quotes**: `<p class="pull">` — already styled (large italic, dark ink). Rules
  of use: maximum two or three per piece; never lifted from a Selah block; never placed
  on the same screen as its own occurrence in the prose — set it further down (or ahead,
  if it foreshadows) so the repetition reads as a bridge, not an echo. Reserve for
  sentences carrying the piece's actual argument, not for decoration. In a piece under
  roughly 900 words there is nowhere to put one legitimately — leave them out.
  At least one pull-quote in any piece should be Norm's own sentence rather than a
  quoted author's, or the page reads as though it quotes its way to its conclusion.
- **Scripture quotes**: `<p class="verse">` for a short quoted line inline in prose
  (oxblood left border, italic); `<blockquote>` (page-local CSS, border-left +
  italic + muted color) for a longer quoted passage set off from the text — see
  `reflections/kept-anyway.html` for a worked example of both used together (epigraph
  as blockquote, single citation line as `.verse`). Reserve `.verse` for text the piece
  is presenting AS scripture at that moment: if a phrase is quoted before the piece
  reveals it is scripture, the oxblood border gives the reveal away — set it as plain
  italic until the citation arrives.
- **Footnotes**: superscript numeral (`sup.fn`, already styled) immediately after
  punctuation in the text; notes collected in `.hw-notes` (already styled) at the foot
  of the article, above the AI disclaimer, numbered per-article from 1.
- **Cross-links between companion pieces**: `.hw-companion` (already styled, italic
  muted line with an oxblood link) for a single inline sentence pointing to a paired
  article/reflection.
- **Books / long-form works** — establish a page-local `<style>` for structural
  components as needed (`.toc`, `.chapter-heading`, `.part-divider`, `.callout`,
  `.definition-box`, etc.), built from the shared CSS variables. There is no single
  fixed "book template" — each book's one-off components should still key off
  `--brass`/`--oxblood`/`--hairline`/`--font-mono` so they read as the same site. See
  `books/he-has-told-you.html` for the fullest example of this pattern, and
  `books/who-would-have-thought.html` for an example of deliberately deviating from the
  site's default type size (larger body text, ragged-right) for a younger readership —
  a legitimate page-local override when the audience calls for it.

## PDF companions

Companion PDFs are produced outside this repo's normal edit/preview/deploy loop and
arrive as a finished file plus the article HTML, both to be uploaded together — the
maintainer's job is to link them, not generate them. Notes for whoever generates them:
- Render from a nav/footer-stripped copy of the article, not via `@media print` rules on
  the live page — background suppression and elements like the cross-link box are
  unreliable that way.
- Strip from the print copy: site nav, site footer, any `.hw-companion` box, the
  in-page PDF-download block.
- White page background, not the site's paper tone — it reads muddy on paper and costs
  ink.
- A translation note (e.g. a memory verse quoted in older wording where the rest of the
  piece uses ESV) counts as a footnote — mark the exception at first occurrence.
