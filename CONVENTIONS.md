# Hesed Words — Page Conventions

Give this file (or the fenced block below) to any assistant generating a page for
the site, so new pages arrive matching the live site and need no nav/footer fixes.

---

## Paste-in block

````
SITE CONVENTIONS — match these exactly.

BYLINE: always "Norm Reed" (never "Norman Reed").

NAV — use this exact markup near the top of <body>. Add class="current" to the one
link matching this page's section (Reflections / Articles / Word Studies / Books /
Glossary / Resources). Do NOT include a "Contact" item.

<nav class="hw-nav">
  <a href="/index.html">Home</a>
  <a href="/reflections.html">Reflections</a>
  <a href="/articles.html">Articles</a>
  <a href="/word-studies.html">Word Studies</a>
  <a href="/books.html">Books</a>
  <a href="/glossary.html">Glossary</a>
  <a href="/resources.html">Resources</a>
</nav>

NAV CSS (include in the page's <style>):
nav.hw-nav{background:#1f1b16;font-family:'Cinzel',serif;font-size:.78rem;letter-spacing:.18em;text-transform:uppercase;display:flex;justify-content:center;gap:2.2rem;padding:1.05rem 1rem;flex-wrap:wrap;}
nav.hw-nav a{color:#f5edd6;text-decoration:none;opacity:.82;transition:opacity .2s;}
nav.hw-nav a:hover{opacity:1;color:#fff;}
nav.hw-nav a.current{opacity:1;border-bottom:1px solid #b8922c;padding-bottom:.15rem;}

FOOTER — content pages use this single-line benediction footer, last thing before </body>:
<footer class="hw-foot">Hesed Words. Written for the road.</footer>

FOOTER CSS:
footer.hw-foot{text-align:center;font-family:'Cinzel',serif;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;color:#8a6d2b;padding:2.5rem 1rem 3.5rem;opacity:.8;}

GLOSSARY LINKS (standing practice) — whenever the piece uses a Hebrew OR Greek word
that has a glossary entry, make its FIRST mention a link to the glossary; leave every
later mention as plain <em>. Only link words that actually exist in the glossary.
Deep-link form (use class="gloss"):
  <a class="gloss" href="/glossary.html#hesed"><em>hesed</em></a>
Established link style — include in the page's <style>:
  a.gloss{color:inherit;text-decoration:none;border-bottom:1px dotted var(--gold-deep);}
  a.gloss:hover{color:var(--gold-deep);}
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
yirat (slug for the phrase "yirat Adonai"), neder, gur.
NOTE: this list has previously fallen out of sync with the actual glossary — if a word looks
plausible but isn't listed here, grep glossary.html for its slug before assuming it needs
seeding. A prior upload brief wrongly assumed 8 of 9 candidate words were missing when they
already existed.
If unsure of a slug, still use the natural transliteration — the glossary matches
on the transliteration, so close spellings resolve.

AI DISCLAIMER — articles and word studies carry this block near the end (reflections
usually do not). Reuse verbatim:
<p>These reflections did not begin with artificial intelligence. They began with years of ministry, reading, prayer, suffering, and conversation.</p>
<p>During the development of this manuscript, AI became a conversation partner. It challenged assumptions, tested arguments, suggested structures, and helped refine expression. Many of the words that follow emerged through that dialogue.</p>
<p>The experiences, convictions, interpretations, and conclusions remain my own.</p>

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
- **Home page panels:** a new **psalm** reflection updates the *Psalms* panel; any other
  reflection updates the *Current Reading* panel (`index.html`, `.daily-reflection`).
- **Reflections listing** is generated from the `ARTICLES` manifest, which now lives in
  `js/reflections-data.js` (loaded via `<script src>` by `reflections.html`) — NOT inline in the
  page anymore. Edit that file when adding a reflection, newest first.
- **Word Studies listing** is generated from the `STUDIES` manifest, which now lives in
  `js/word-studies-data.js` (loaded via `<script src>` by `word-studies.html`). Each study: add
  one object (id `ws-slug`, `lang` "hebrew"/"greek", plus `date`, `scripture[]`, `themes[]` —
  added for the combined home-page index, not used by the word-studies page itself).
- **Handout PDFs** that are only meant to be reached from inside an article get no card.
- **Combined home-page index** (site-wide Browse Everything, below the hub cards) reads from
  FOUR shared files in `js/`: `reflections-data.js`, `word-studies-data.js`, `articles-data.js`,
  `books-data.js`. The first two are the single source of truth for their own pages (see above).
  The last two (`articles-data.js`, `books-data.js`) are metadata MIRRORS — `articles.html` and
  `books.html` remain hand-written HTML cards, unchanged. **Whenever you add a new article or
  book card by hand, also add a matching entry to the corresponding `-data.js` file** (title,
  url, date, scripture[], themes[], summary) or it won't appear in the combined index. Books
  spanning many chapters (e.g. a set of Psalms) get a single light representative scripture
  anchor (first chapter), not every chapter enumerated — see Songs for the Road.
- **RSS:** `feed.xml` at the repo root is the reflections feed (linked from the home page via
  `follow.html`). When adding a new reflection, also add one `<item>` at the TOP of the list:
  title, absolute link + guid (same URL), pubDate in RFC-822 form (e.g.
  `Fri, 24 Jul 2026 06:00:00 +1000`), an `<enclosure>` + `<media:thumbnail>` pair pointing at
  `https://hesedwords.com/images/feed-banner.png` (every item reuses this one site graphic — see
  below), and a one-sentence description (reuse the manifest summary, shortened). Keep roughly
  the 15 most recent items; drop the oldest when adding.
- **Feed images:** `images/feed-banner.png` (1200×630) is the reusable graphic attached to every
  RSS item via `<enclosure>`/`<media:thumbnail>`, and `images/feed-icon.png` (512×512) is the
  feed's own icon, set once in `feed.xml`'s channel-level `<image>` block — readers like Inoreader
  show this instead of a generic placeholder avatar. Both were rendered from throwaway HTML via
  `npx playwright screenshot --viewport-size=W,H file:///path/to.html out.png` (Playwright's
  Chromium must be installed first: `npx playwright install chromium`). Neither file is
  reflection-specific — don't regenerate per upload; only touch them if the site's visual identity
  changes.
- **In-page PDF link:** articles with a companion PDF need a "Download as PDF" link on the
  article page itself (a `.pdf-download` block after the AI disclaimer, before `</div>`), not
  just on the articles.html listing card. Easy to drop when building a new article page — check
  for it explicitly.

## Established patterns for long-form / paired pieces

These are not fixed classes shared across a stylesheet — this site has no shared CSS file, and
every page styles itself inline. Treat what follows as a documented pattern to reproduce
per-page, not a rule that a class name must match exactly.

- **Numeral-and-interlude sections** (for articles long enough to need markers — not shorter
  pieces, not reflections): sections are centred Roman numerals in Cinzel small caps
  (`h2.numeral`). An interlude breaks the sequence by name instead of number — heading word in
  Cinzel small caps with an italic subtitle beneath (`h2.interlude > span`), signalling a change
  of register and marking it as outside the argument's progression. See
  `articles/reading-daniel-without-arithmetic.html` for a full example.
- **Footnotes:** superscript numeral (`sup.fn`) immediately after punctuation in the text; notes
  collected in a ruled block (`.notes`) at the foot of the article, above the AI disclaimer,
  numbered per-article from 1. Reserved for citing sources, never for asides — if it's saying
  something rather than citing something, it belongs in the prose.
- **Cross-links between companion pieces:** where an article and a reflection are written as a
  pair, each links to the other near the end of the body. Two variants are in live use — an
  inline italic sentence (`.companion`, e.g. `articles/nobody-left-to-say-no.html`) and a boxed
  callout (`.crosslink`, e.g. `articles/reading-daniel-without-arithmetic.html`). Either is fine;
  match whichever the piece's tone suits. Both are screen-only — strip from any print/PDF copy.
- **Selah block** (reflections): a personal, italicised aside set off from the surrounding prose,
  usually with gold rules top and bottom on a slightly lighter background and a small centred
  "Selah" heading. Every reflection that uses one restyles it locally to match that page's
  palette — there is no single canonical version to copy verbatim; see any recent reflection
  (e.g. `reflections/those-who-know-their-god.html`) for a representative example.

## PDF companions

Companion PDFs are produced outside this repo's normal edit/preview/deploy loop (currently by a
separate Claude session working from a Word-style manuscript) and arrive here as a finished file
plus the article HTML, both to be uploaded together — the maintainer's job is to link them, not
to generate them. Notes for whoever generates them:
- Render from a nav/footer-stripped copy of the article, not via `@media print` rules on the live
  page — background suppression and elements like the cross-link box are unreliable that way.
- Strip from the print copy: site nav, site footer, any `.companion`/`.crosslink` box, the
  in-page `.pdf-download` block.
- White page background, not parchment — parchment reads muddy on paper and costs ink.
- A translation note (e.g. a memory verse quoted in older wording where the rest of the piece
  uses ESV) counts as a footnote — mark the exception at first occurrence.
