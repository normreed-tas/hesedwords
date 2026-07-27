/* ================================================================
   BROWSE EVERYTHING — combined site-wide index
   ----------------------------------------------------------------
   Merges the four content manifests into one filterable list:
     reflections-data.js  -> ARTICLES
     articles-data.js     -> ARTICLES_META
     books-data.js        -> BOOKS_META
     word-studies-data.js -> STUDIES
   Those four files stay the single source of truth for their own
   pages; this file only reads them. Load this AFTER all four.

   The filter engine is the one proven on reflections.html,
   generalised to run across types. BOOK_ORDER / byBookOrder are
   kept identical to reflections.html:339 on purpose — if you change
   one, change both.
   ================================================================ */
(function () {
  "use strict";

  var TYPES = {
    reflection: { label: "Reflection", colour: "#5a3e7a" },
    article:    { label: "Article",    colour: "#1e4a3a" },
    book:       { label: "Book",       colour: "#7a3520" },
    study:      { label: "Word Study", colour: "#1e3560" }
  };

  /* ── Merge the four manifests ───────────────────────────────── */
  function collect(source, type) {
    if (typeof source === "undefined" || !Array.isArray(source)) return [];
    return source.map(function (e) {
      return {
        type:      type,
        title:     e.title || "",
        url:       e.url || "#",
        date:      e.date || "",
        summary:   e.summary || "",
        scripture: Array.isArray(e.scripture) ? e.scripture : [],
        themes:    Array.isArray(e.themes) ? e.themes : []
      };
    });
  }

  var ITEMS = []
    .concat(collect(typeof ARTICLES      !== "undefined" ? ARTICLES      : null, "reflection"))
    .concat(collect(typeof ARTICLES_META !== "undefined" ? ARTICLES_META : null, "article"))
    .concat(collect(typeof BOOKS_META    !== "undefined" ? BOOKS_META    : null, "book"))
    .concat(collect(typeof STUDIES       !== "undefined" ? STUDIES       : null, "study"))
    .filter(function (e) { return e.date; });

  /* ── Scripture reference parsing (as reflections.html) ──────── */
  function parseRef(s) {
    var m = String(s).trim().match(/^(.+?)\s+(\d+)(?::(.+))?$/);
    if (m) return { book: m[1].trim(), chapter: m[2], verse: (m[3] || "").trim() };
    return { book: String(s).trim(), chapter: "", verse: "" };
  }

  /* index: book -> { chapter -> Set(verses) } */
  var SCRIPTURE_INDEX = {};
  ITEMS.forEach(function (a) {
    a.scripture.forEach(function (s) {
      var r = parseRef(s);
      var book = (SCRIPTURE_INDEX[r.book] = SCRIPTURE_INDEX[r.book] || {});
      if (r.chapter) {
        var ch = (book[r.chapter] = book[r.chapter] || new Set());
        if (r.verse) ch.add(r.verse);
      }
    });
  });

  function byNum(a, b) { return parseInt(a, 10) - parseInt(b, 10); }

  /* Canonical book order — keep in step with reflections.html:339 */
  var BOOK_ORDER = [
    "Genesis","Exodus","Leviticus","Numbers","Deuteronomy",
    "Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings",
    "1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther",
    "Job","Psalm","Proverbs","Ecclesiastes","Song of Songs",
    "Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel",
    "Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum",
    "Habakkuk","Zephaniah","Haggai","Zechariah","Malachi",
    "Matthew","Mark","Luke","John","Acts","Romans",
    "1 Corinthians","2 Corinthians","Galatians","Ephesians",
    "Philippians","Colossians","1 Thessalonians","2 Thessalonians",
    "1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James",
    "1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"
  ];
  function byBookOrder(a, b) {
    var ia = BOOK_ORDER.indexOf(a), ib = BOOK_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  }

  function $(id) { return document.getElementById(id); }

  function populate(id, values) {
    var sel = $(id);
    values.forEach(function (v) {
      var opt = document.createElement("option");
      opt.value = v.value !== undefined ? v.value : v;
      opt.textContent = v.label !== undefined ? v.label : v;
      sel.appendChild(opt);
    });
  }

  function resetSelect(id, disabled) {
    var sel = $(id);
    sel.innerHTML = '<option value="">All</option>';
    sel.value = "";
    sel.disabled = !!disabled;
  }

  /* ── Build the dropdowns ────────────────────────────────────── */
  var THEMES = [];       // every unique theme, sorted
  var themeValue = "";   // the currently applied theme ("" = all)

  function buildFilters() {
    var themeSet = new Set(), yearSet = new Set(), typeSet = new Set();
    ITEMS.forEach(function (a) {
      a.themes.forEach(function (t) { themeSet.add(t); });
      yearSet.add(a.date.substring(0, 4));
      typeSet.add(a.type);
    });

    THEMES = Array.from(themeSet).sort(function (a, b) {
      return a.localeCompare(b, undefined, { sensitivity: "base" });
    });

    populate("browse-book",  Object.keys(SCRIPTURE_INDEX).sort(byBookOrder));
    populate("browse-year",  Array.from(yearSet).sort().reverse());
    populate("browse-type",  Object.keys(TYPES)
      .filter(function (k) { return typeSet.has(k); })
      .map(function (k) { return { value: k, label: TYPES[k].label }; }));
  }

  /* ── Theme combobox (type-to-filter) ────────────────────────── */
  var comboOpen = false, activeIndex = -1, matches = [];

  function comboInput() { return $("browse-theme-input"); }
  function comboList()  { return $("browse-theme-list"); }

  function setTheme(v) {
    themeValue = v;
    comboInput().value = v;
    $("browse-theme-clear").hidden = !v;
    render();
  }

  function closeCombo() {
    comboOpen = false;
    activeIndex = -1;
    var list = comboList();
    list.hidden = true;
    list.innerHTML = "";
    comboInput().setAttribute("aria-expanded", "false");
  }

  function openCombo(query) {
    var q = (query || "").trim().toLowerCase();
    matches = q
      ? THEMES.filter(function (t) { return t.toLowerCase().indexOf(q) !== -1; })
      : THEMES.slice();

    var list = comboList();
    list.innerHTML = "";

    if (!matches.length) {
      list.innerHTML = '<li class="browse-combo-empty" role="presentation">No matching theme</li>';
    } else {
      matches.forEach(function (t, i) {
        var li = document.createElement("li");
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", String(i === activeIndex));
        li.textContent = t;
        li.addEventListener("mousedown", function (e) {
          e.preventDefault();          // keep focus, beat the blur handler
          setTheme(t);
          closeCombo();
        });
        list.appendChild(li);
      });
    }

    list.hidden = false;
    comboOpen = true;
    comboInput().setAttribute("aria-expanded", "true");
  }

  function highlight(i) {
    var list = comboList();
    var items = list.querySelectorAll('li[role="option"]');
    if (!items.length) return;
    if (i < 0) i = items.length - 1;
    if (i >= items.length) i = 0;
    activeIndex = i;
    items.forEach(function (el, n) { el.setAttribute("aria-selected", String(n === i)); });
    items[i].scrollIntoView({ block: "nearest" });
  }

  function initCombo() {
    var input = comboInput();

    input.addEventListener("focus", function () { openCombo(input.value === themeValue ? "" : input.value); });
    input.addEventListener("input", function () {
      activeIndex = -1;
      // clearing the box clears the filter
      if (!input.value.trim() && themeValue) { themeValue = ""; $("browse-theme-clear").hidden = true; render(); }
      openCombo(input.value);
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); if (!comboOpen) openCombo(input.value); else highlight(activeIndex + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (comboOpen) highlight(activeIndex - 1); }
      else if (e.key === "Enter") {
        e.preventDefault();
        if (comboOpen && matches.length) { setTheme(matches[activeIndex >= 0 ? activeIndex : 0]); closeCombo(); }
      } else if (e.key === "Escape") {
        input.value = themeValue;   // revert any half-typed text
        closeCombo();
      }
    });

    input.addEventListener("blur", function () {
      input.value = themeValue;     // never leave an unapplied query showing
      closeCombo();
    });

    $("browse-theme-clear").addEventListener("click", function () {
      setTheme("");
      input.focus();
    });
  }

  function onBookChange() {
    var book = $("browse-book").value;
    resetSelect("browse-chapter", true);
    resetSelect("browse-verse", true);
    var chapters = book && SCRIPTURE_INDEX[book] ? Object.keys(SCRIPTURE_INDEX[book]) : [];
    if (chapters.length) {
      populate("browse-chapter", chapters.sort(byNum));
      $("browse-chapter").disabled = false;
    }
    render();
  }

  function onChapterChange() {
    var book = $("browse-book").value, chapter = $("browse-chapter").value;
    resetSelect("browse-verse", true);
    var verses = (book && chapter && SCRIPTURE_INDEX[book] && SCRIPTURE_INDEX[book][chapter])
      ? Array.from(SCRIPTURE_INDEX[book][chapter]) : [];
    if (verses.length) {
      populate("browse-verse", verses.sort(byNum));
      $("browse-verse").disabled = false;
    }
    render();
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ── Render ─────────────────────────────────────────────────── */
  function render() {
    var bookF    = $("browse-book").value,
        chapterF = $("browse-chapter").value,
        verseF   = $("browse-verse").value,
        themeF   = themeValue,
        typeF    = $("browse-type").value,
        yearF    = $("browse-year").value;

    var filtered = ITEMS.filter(function (a) {
      if (bookF && !a.scripture.some(function (s) {
        var r = parseRef(s);
        if (r.book !== bookF) return false;
        if (chapterF && r.chapter !== chapterF) return false;
        if (verseF && r.verse !== verseF) return false;
        return true;
      })) return false;
      if (themeF && a.themes.indexOf(themeF) === -1) return false;
      if (typeF && a.type !== typeF) return false;
      if (yearF && a.date.substring(0, 4) !== yearF) return false;
      return true;
    }).sort(function (a, b) { return b.date.localeCompare(a.date); });

    var listing = $("browse-listing");
    var count   = $("browse-count");
    listing.innerHTML = "";

    count.textContent = filtered.length === ITEMS.length
      ? "Showing all " + ITEMS.length + " pieces"
      : filtered.length + " of " + ITEMS.length + " pieces";

    if (!filtered.length) {
      listing.innerHTML = '<p class="browse-empty">Nothing matches those filters yet.</p>';
      return;
    }

    filtered.forEach(function (a) {
      var d = new Date(a.date + "T12:00:00");
      var dateStr = isNaN(d) ? a.date
        : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
      var t = TYPES[a.type];

      var card = document.createElement("a");
      card.className = "browse-card";
      card.href = a.url;
      card.innerHTML =
        '<div class="browse-card-main">' +
          '<div class="browse-card-date">' + esc(dateStr) + '</div>' +
          '<h3 class="browse-card-title">' + esc(a.title) + '</h3>' +
          '<p class="browse-card-summary">' + esc(a.summary) + '</p>' +
          (a.scripture.length
            ? '<div class="browse-card-ref">' + esc(a.scripture.join("  ·  ")) + '</div>'
            : '') +
        '</div>' +
        '<span class="browse-badge" style="--badge:' + t.colour + '">' + esc(t.label) + '</span>';
      listing.appendChild(card);
    });
  }

  function resetFilters() {
    $("browse-book").value = "";
    resetSelect("browse-chapter", true);
    resetSelect("browse-verse", true);
    themeValue = "";
    comboInput().value = "";
    $("browse-theme-clear").hidden = true;
    $("browse-type").value = "";
    $("browse-year").value = "";
    render();
  }

  /* ── Init ───────────────────────────────────────────────────── */
  function init() {
    if (!$("browse-listing")) return;
    buildFilters();
    initCombo();
    $("browse-book").addEventListener("change", onBookChange);
    $("browse-chapter").addEventListener("change", onChapterChange);
    $("browse-verse").addEventListener("change", render);
    $("browse-type").addEventListener("change", render);
    $("browse-year").addEventListener("change", render);
    $("browse-reset").addEventListener("click", resetFilters);
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
