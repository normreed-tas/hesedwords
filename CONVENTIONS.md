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

GLOSSARY LINKS — link only the FIRST mention of each Hebrew word; leave later
mentions as plain <em>. The glossary supports deep links:
  <a href="/glossary.html#hesed"><em>hesed</em></a>
The fragment is the word's transliteration, letters only. Confirmed slugs include:
hesed, emunah, mishpat, tzedakah (NOTE: spelled with a k, not q), rahamim, tuv,
shem, derek, torah, lev, chanan, shalom, shuvah, zakar, sod, selichah, shamar.
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
- **Reflections listing** is generated from the `ARTICLES` manifest in `reflections.html`.
- **Word Studies listing** is generated from the `STUDIES` manifest in `word-studies.html`
  (index + cards). Each study: add one object (id `ws-slug`, `lang` "hebrew"/"greek").
- **Handout PDFs** that are only meant to be reached from inside an article get no card.
