/* ================================================================
   WORD STUDIES MANIFEST
   To add a study: copy one object to the TOP of the array (newest
   first). Give it a unique id ("ws-slug"), set lang to "hebrew" or
   "greek" (this sets the reading direction of the display word),
   and the page builds the index entry and the card automatically.
   ================================================================ */
const STUDIES = [
  {
    id:       "ws-rasha",
    word:     "רָשָׁע",
    lang:     "hebrew",
    translit: "rasha'",
    title:    "Is \"Wicked\" a Verdict or a Character?",
    url:      "/word-studies/is-wicked-a-verdict-or-a-character.html",
    date:     "2026-08-03",
    scripture: ["Deuteronomy 25:1", "1 Kings 8:32", "Exodus 23:7", "Psalm 58:1"],
    themes:   ["rasha", "tzaddiq", "wicked", "justice", "verdict"],
    summary:  "The Hebrew behind \"wicked\" starts in a courtroom, not in a character. Rasha' is half of a forensic pair with tzaddiq — not two kinds of people but two outcomes of a case, and English kept the character sense while losing the courtroom that produced it."
  },
  {
    id:       "ws-idle",
    word:     "ἀργός",
    lang:     "greek",
    translit: "argos",
    title:    "What Is an Idle Word?",
    url:      "/word-studies/idle.html",
    date:     "2026-07-11",
    scripture: ["Matthew 12:36", "Matthew 20:3", "1 Timothy 5:13", "2 Peter 1:8"],
    themes:   ["idle words", "speech", "judgment", "fruitfulness"],
    summary:  "Not merely careless — workless. Argos is a-ergon, without work: a field unsown, a word that carries nothing, does nothing, employs nothing."
  },
  {
    id:       "ws-paga",
    word:     "פָּגַע",
    lang:     "hebrew",
    translit: "paga",
    title:    "Is Jesus an Intercessor?",
    url:      "/word-studies/jesus-intercessor.html",
    date:     "2026-07-10",
    scripture: ["Isaiah 59:16", "Isaiah 53:12", "1 Samuel 22:18", "Romans 8:34"],
    themes:   ["intercession", "the Servant", "suffering", "prayer"],
    summary:  "Before it ever means to intercede, it means to fall upon — to strike, to meet with force. The word for intercession has a body in it."
  }
  /* ── add new studies above this line ── */
];
