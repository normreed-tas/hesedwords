/* ================================================================
   REFLECTIONS MANIFEST
   To add a new article, copy one object and fill in its values.
   The page sorts newest-first automatically.
   ================================================================ */
const ARTICLES = [
  {
    title:    "The Last Word of the Road",
    date:     "2026-05-30",
    url:      "/reflections/the-last-word-of-the-road.html",
    summary:  "The road ends in blessing given, not blessing received — and then the blessing turns.",
    scripture: ["Psalm 134"],
    themes:   ["barak", "blessing", "arrival", "psalms of ascent"]
  },
  {
    title:    "How Good and Pleasant",
    date:     "2026-05-29",
    url:      "/reflections/how-good-and-pleasant.html",
    summary:  "Oil running down the beard of Aaron, and the blessing commanded where the gathering happens.",
    scripture: ["Psalm 133"],
    themes:   ["yachad", "unity", "blessing", "psalms of ascent"]
  },
  {
    title:    "The Place Where God Rests",
    date:     "2026-05-28",
    url:      "/reflections/the-place-where-god-rests.html",
    summary:  "The theological centre of the ascent — God declaring where he will settle.",
    scripture: ["Psalm 132"],
    themes:   ["menuha", "covenant", "dwelling", "psalms of ascent"]
  },
  {
    title:    "The Quiet Soul",
    date:     "2026-05-27",
    url:      "/reflections/the-quiet-soul.html",
    summary:  "Three verses on the soul that has been weaned from the need to carry what was never its to carry.",
    scripture: ["Psalm 131"],
    themes:   ["batach", "menuha", "rest", "humility", "psalms of ascent"]
  },
  {
    title:    "Out of the Depths",
    date:     "2026-05-26",
    url:      "/reflections/out-of-the-depths.html",
    summary:  "Forgiveness that refuses to let the ledger be the last word, and a watchman waiting for morning.",
    scripture: ["Psalm 130"],
    themes:   ["selichah", "qavah", "forgiveness", "psalms of ascent"]
  },
  {
    title:    "They Have Not Prevailed",
    date:     "2026-05-25",
    url:      "/reflections/they-have-not-prevailed.html",
    summary:  "Long affliction, generational furrows, and the second sentence that must be added to the first.",
    scripture: ["Psalm 129"],
    themes:   ["affliction", "testimony", "tzaddiq", "psalms of ascent"]
  },
  {
    title:    "The Ordinary Blessing",
    date:     "2026-05-24",
    url:      "/reflections/the-ordinary-blessing.html",
    summary:  "What a life built on the fear of the LORD actually looks like from the inside — a table, a vine, a kitchen.",
    scripture: ["Psalm 128"],
    themes:   ["yirat Adonai", "blessing", "family", "psalms of ascent"]
  },
  {
    title:    "The House the LORD Builds",
    date:     "2026-05-23",
    url:      "/reflections/the-house-the-lord-builds.html",
    summary:  "At the centre of the collection, a question about whose hands are doing the building.",
    scripture: ["Psalm 127"],
    themes:   ["menuha", "nachalah", "building", "rest", "psalms of ascent"]
  },
  {
    title:    "Like Those Who Dream",
    date:     "2026-05-22",
    url:      "/reflections/like-those-who-dream.html",
    summary:  "The psalm of incomplete restoration — celebrating what has been given while crying out for what has not.",
    scripture: ["Psalm 126"],
    themes:   ["shub shebut", "restoration", "tears", "psalms of ascent"]
  },
  {
    title:    "The Mountain That Cannot Be Moved",
    date:     "2026-05-21",
    url:      "/reflections/the-mountain-that-cannot-be-moved.html",
    summary:  "Security that is entirely derived — the mountain does not hold itself up.",
    scripture: ["Psalm 125"],
    themes:   ["batach", "security", "shalom", "psalms of ascent"]
  },
  {
    title:    "Let Israel Say",
    date:     "2026-05-20",
    url:      "/reflections/let-israel-say.html",
    summary:  "The summons to communal testimony, and the snare that breaks before the bird gets out.",
    scripture: ["Psalm 124"],
    themes:   ["testimony", "deliverance", "communal memory", "psalms of ascent"]
  },
  {
    title:    "Eyes Fixed Upward",
    date:     "2026-05-19",
    url:      "/reflections/eyes-fixed-upward.html",
    summary:  "Inside the city and still despised — the psalm that refuses the expectation that arrival resolves everything.",
    scripture: ["Psalm 123"],
    themes:   ["chanan", "contempt", "waiting", "psalms of ascent"]
  },
  {
    title:    "Our Feet Are Standing",
    date:     "2026-05-18",
    url:      "/reflections/our-feet-are-standing.html",
    summary:  "Arrival turns immediately into intercession for those still on the road.",
    scripture: ["Psalm 122"],
    themes:   ["arrival", "intercession", "mishpat", "shalom", "psalms of ascent"]
  },
  {
    title:    "The Keeper on the Road",
    date:     "2026-05-17",
    url:      "/reflections/the-keeper-on-the-road.html",
    summary:  "One Hebrew word, six times in eight verses: the God who keeps does not sleep.",
    scripture: ["Psalm 121"],
    themes:   ["shamar", "keeping", "presence", "psalms of ascent"]
  },
  {
    title:    "The Far Country",
    date:     "2026-05-16",
    url:      "/reflections/the-far-country.html",
    summary:  "The ascent begins not at the temple gate but in the honest recognition of where your feet actually are.",
    scripture: ["Psalm 120"],
    themes:   ["gur", "exile", "shalom", "honesty", "psalms of ascent"]
  },
  {
    title:    "The One Thing He Wouldn't Delegate",
    date:     "2026-08-05",
    url:      "/reflections/the-one-thing-he-wouldnt-delegate.html",
    summary:  "A young man in Zechariah's second vision is stopped mid-survey — the cord was not the wrong instrument, just not the last word. A reflection on a hard man in Papua New Guinea who handed over every authority except the one to be merciful, and what it took thirty years to understand about that.",
    scripture: ["Zechariah 2"],
    themes:   ["mercy", "delegation", "authority", "Papua New Guinea"]
  },
  {
    title:    "The Vow?",
    date:     "2026-08-04",
    url:      "/reflections/the-vow.html",
    summary:  "Psalm 61 asks four times for a place — a rock, a tower, a tent, the shelter of wings — and every one of them has an owner. Then a vow appears and the prayer tilts: does the wing come at a price? Heard first, performed last, with the shelter sitting in between. Not the shape of a bargain.",
    scripture: ["Psalm 61"],
    themes:   ["neder", "shalem", "vows", "shelter", "belonging", "prison ministry"]
  },
  {
    title:    "What Is Wicked in This Story?",
    date:     "2026-08-03",
    url:      "/reflections/what-is-wicked-in-this-story.html",
    summary:  "Psalm 58 ends with the righteous bathing their feet in the blood of the wicked — unusable, until verse one turns out to say who it's actually addressed to. Not criminals. The bench. A reflection on twenty-five placements, a debt nobody thought they were carrying, and hesed withheld by people whose office existed to extend it.",
    scripture: ["Psalm 58"],
    themes:   ["rasha", "wicked", "justice", "the bench", "prison ministry", "hesed withheld"]
  },
  {
    title:    "Those Who Know Their God",
    date:     "2026-08-01",
    url:      "/reflections/those-who-know-their-god.html",
    summary:  "Daniel 11:32 promises that those who know their God shall be strong and do exploits — a verse that once became, for a young Christian with an explanation for every date, a chapter about knowing better instead of a chapter about knowing God. The exploit is the instructing, not the solving.",
    scripture: ["Daniel 11:32-33"],
    themes:   ["Daniel", "certainty", "unity", "prophecy", "knowing God"]
  },
  {
    title:    "This I Know",
    date:     "2026-07-31",
    url:      "/reflections/this-i-know.html",
    summary:  "Psalm 56 never says we, only I. Batach — to lean your whole weight on something and find out whether it holds. A reflection on trust, the tears God counts and bottles, and the one line in the psalm that only comes after the tossings have been numbered: this I know, that God is for me.",
    scripture: ["Psalm 56"],
    themes:   ["batach", "trust", "tears", "knowing God", "fear"]
  },
  {
    title:    "Pride",
    date:     "2026-07-30",
    url:      "/reflections/pride.html",
    summary:  "Waking with thoughts upon the bed, like Nebuchadnezzar at the start of Daniel 4 — and the discovery that pride never feels like pride from the inside, only ever like accuracy. The verdict we reach about our own humility is useless; the only real test is whether we can still be corrected.",
    scripture: ["Daniel 4:5"],
    themes:   ["pride", "humility", "correction", "Nebuchadnezzar"]
  },
  {
    title:    "I Am Like an Olive Tree",
    date:     "2026-07-28",
    url:      "/reflections/i-am-like-an-olive-tree.html",
    summary:  "Two men stand in the same psalm under the same verb. Doeg trusted in the abundance of his riches; David answers, but I am like a green olive tree in the house of God. Batach — to lean your weight on something and let it take you. The same posture, different ground: one man is uprooted, the other is a tree that cannot be.",
    scripture: ["Psalm 52"],
    themes:   ["batach", "trust", "hesed", "the olive tree", "Doeg", "endurance"]
  },
  {
    title:    "Coincidence",
    date:     "2026-07-27",
    url:      "/reflections/coincidence.html",
    summary:  "The book of Esther never once names God, and reads at first like a story about luck — until nahafokh hu, the reverse happened, arrives at the pivot. A reflection on the dice that named Purim, and on a Friday-the-thirteenth morning that turned about the same way.",
    scripture: ["Esther"],
    themes:   ["providence", "Purim", "coincidence", "prayer meeting", "cardiac arrest"]
  },
  {
    title:    "God Seeks What Has Been Driven Away",
    date:     "2026-06-12",
    url:      "/reflections/god-seeks-what-has-been-driven-away.html",
    summary:  "There are mornings when a passage of Scripture that you have read many times suddenly opens differently. Ecclesiastes 3 on time, mortality, and God's pursuit of those who have been driven away.",
    scripture: ["Ecclesiastes 3"],
    themes:   ["time", "mortality", "providence", "the driven-away"]
  },
  {
    title:    "What Cannot Be Counted",
    date:     "2026-06-11",
    url:      "/reflections/what-cannot-be-counted.html",
    summary:  "God told Abraham to count the stars — knowing he could not. Centuries later, the Teacher in Ecclesiastes observes that what is lacking cannot be counted either. The same impossibility. Two entirely different registers. And the same God holding both.",
    scripture: ["Ecclesiastes 1:15", "Genesis 15:5"],
    themes:   ["providence", "Abraham", "the Teacher", "counting", "limits"]
  },
  {
    title:    "Justice Is Not What You Think",
    date:     "2026-06-10",
    url:      "/reflections/justice-is-not-what-you-think.html",
    summary:  "The deepest problem is not injustice done but justice unperceived. A thread from Proverbs through Isaiah's Servant to the Spirit's work in John.",
    scripture: ["Proverbs 28:5", "Isaiah 42:1-4", "Matthew 12:18-21", "John 16:8-11", "John 17:3"],
    themes:   ["mishpat", "tzedakah", "da'at", "justice", "perception", "the Spirit", "the Servant"]
  },
  {
    title:    "The Love That Kindles",
    date:     "2026-06-15",
    url:      "/reflections/the-love-that-kindles.html",
    summary:  "A brief reflection on hesed — the love that does not wait for sufficient desire but kindles it. On desire, idols, and the Song of Songs.",
    scripture: ["Song of Songs 5", "Song of Songs 8"],
    themes:   ["hesed", "desire", "idols", "kindling", "the Spirit"]
  },
  {
    title:    "Kiss the Son",
    date:     "2026-06-06",
    url:      "/reflections/kiss-the-son.html",
    summary:  "The psalm ends where you don't expect it to end — not with the enemies destroyed but with an invitation. Kiss the Son. The gesture of vassalage, the transfer of allegiance, and the connection to Psalm 85 where the same verb appears: righteousness and peace have kissed each other.",
    scripture: ["Psalm 2", "Psalm 85"],
    themes:   ["nashaq", "refuge", "submission", "hesed", "blessing"]
  },
  {
    title:    "Listening for the Score in Job",
    date:     "2026-05-29",
    url:      "/reflections/listening-for-the-score.html",
    summary:  "We read scripture for what it says. Rarely for how it sounds. But tone carries meaning the words alone cannot — and the voice from the whirlwind sounds nothing like I expected.",
    scripture: ["Job 38", "Job 39"],
    themes:   ["whirlwind"]
  },
  {
    title:    "What Is Already Yours",
    date:     "2026-05-18",
    url:      "/reflections/what-is-already-yours.html",
    poster:   "/reflections/jonah-2-8-poster.html",
    summary:  "Jonah speaks the truth about idolaters from the belly of the fish — without recognising that the description fits him precisely. He has identified the mechanism exactly: the clinging to vapour, the abandoning of hesed.",
    scripture: ["Jonah 2:8"],
    themes:   ["hesed", "idolatry", "self-deception"]
  },
  {
    title:    "Called in Righteousness",
    date:     "2026-05-01",
    url:      "/reflections/called-in-righteousness.html",
    summary:  "Forty years of ministry with the word righteousness — preaching it, building theology on it — and never quite trusting that I understood it. A reflection on tzedakah, the Servant of Isaiah 42, and the three words that stopped everything.",
    scripture: ["Isaiah 42:6"],
    themes:   ["tzedakah", "righteousness", "the Servant", "covenant", "justice"]
  },
  {
    title:    "Stand by the Roads",
    date:     "2026-06-17",
    url:      "/reflections/stand-by-the-roads.html",
    summary:  "Somewhere in the middle of a judgment speech, God interrupts himself. A reflection on Jeremiah 6:16 — the invitation to stand before walking, and the ancient paths that lead to rest.",
    scripture: ["Jeremiah 6:16"],
    themes:   ["ancient paths", "crossroads", "rest", "stillness", "judgment"]
  },
  {
    title:    "My Oath — and What It Really Means",
    date:     "2026-06-17",
    url:      "/reflections/my-oath.html",
    summary:  "I have been a Justice of the Peace for many years. Jeremiah 4:2 stopped me: an oath is only as real as the person swearing it. On emet, mishpat, and tzedakah — the three conditions that hollow or fill the formula.",
    scripture: ["Jeremiah 4:2"],
    themes:   ["oath", "truth", "justice", "righteousness", "emet", "mishpat", "tzedakah"]
  },
  {
    title:    "Delivered to What?",
    date:     "2026-06-18",
    url:      "/reflections/delivered-to-what.html",
    summary:  "Jesus walks into the temple and quotes two prophets. Most readers think he was angry about the buying and selling. What he was actually saying is far larger — and everyone in the crowd knew exactly how the sermon ended.",
    scripture: ["Jeremiah 7:9-11", "Isaiah 56:7"],
    themes:   ["Jesus", "temple"]
  },
  {
    title:    "Deceived",
    date:     "2026-06-20",
    url:      "/reflections/deceived.html",
    summary:  "A true sentence repeated as a charm. Jeremiah 7 opens with words without weight, closes with the only boast that holds — a life that cannot lie. Jesus tells the same story twice: the goats were certain, not hesitant. That is what unsettles me.",
    scripture: ["Jeremiah 7:4", "Jeremiah 9:23-24", "Matthew 7:22-23"],
    themes:   ["self-deception", "certainty", "yada", "sheep and goats", "temple"]
  },
  {
    title:    "Have They No Knowledge?",
    date:     "2026-06-20",
    url:      "/reflections/have-they-no-knowledge.html",
    summary:  "Psalm 14 surfaced in my reading plan the same day I finished tracing the pattern through Jeremiah and Matthew. David asked centuries earlier the very question the rest of my reading this week had been answering.",
    scripture: ["Psalm 14:1", "Psalm 14:4"],
    themes:   ["yada", "sakal", "knowledge", "fool", "self-deception"]
  },
  {
    title:    "I Shall Be Satisfied",
    date:     "2026-06-21",
    url:      "/reflections/i-shall-be-satisfied.html",
    summary:  "There is a verb in Psalm 17:15 I keep turning over. David's 'I shall be satisfied' is not a prediction — the Hebrew turns it into a resolve. He is choosing, in the middle of a circumstance that gives him every reason not to, what he will let fill him.",
    scripture: ["Psalm 17:15"],
    themes:   ["David", "satisfaction", "sava", "temunah", "likeness", "Moses", "resolve"]
  },
  {
    title:    "Did the Word Become a List?",
    date:     "2026-06-23",
    url:      "/reflections/did-the-word-become-a-list.html",
    summary:  "Six lines in Psalm 19 look like a list of demands. They are not. Look at the back of each line — what the word does to a person — and the list becomes a description of what a young person is often missing and cannot name. That changes everything about how you hand it on.",
    scripture: ["Psalm 19:7-8"],
    themes:   ["word of God", "Torah", "translation", "simplicity", "mission", "plain language"]
  },
  {
    title:    "Let Him Kiss Me",
    date:     "2026-06-25",
    url:      "/reflections/let-him-kiss-me.html",
    summary:  "The greatest of all songs opens on a woman wanting. Not a story, not a setting — just the longing, before we have been given anything safe to hold. A reflection on what it means that the Song begins here, and what the Shulammite's reach shares with David's one thing and Paul's pressing on.",
    scripture: ["Song of Songs 1:1"],
    themes:   ["longing", "desire", "knowing God", "da'at", "David", "Paul", "one thing"]
  },
  {
    title:    "The Dogs at the Perimeter",
    date:     "2026-06-26",
    url:      "/reflections/the-dogs-at-the-perimeter.html",
    summary:  "The lion strikes once and is gone. The dogs are different — they wait, they circle, they win by duration. A reflection on Psalm 22 and the persistent small things at the edges of every life, and what it means to stop throwing stones and give yourself over to hands stronger than yours.",
    scripture: ["Psalm 22"],
    themes:   ["crucifixion", "perseverance", "prayer", "trust"]
  },
  {
    title:    "We All Need Our Rechabites",
    date:     "2026-06-26",
    url:      "/reflections/we-all-need-our-rechabites.html",
    summary:  "A lighthouse does not chase the ship. It stays lit on the headland, and a boat in the dark takes a bearing off it. The Rechabites are that fixed point in Jeremiah 35 — their not-moving is the whole service they render, and the diagnostic they offer Judah is the one they offer us.",
    scripture: ["Jeremiah 35"],
    themes:   ["Rechabites", "obedience", "fixed point", "drift", "conviction", "witness"]
  },
  {
    title:    "Communion",
    date:     "2026-06-28",
    url:      "/reflections/communion.html",
    summary:  "This morning I led communion at church. The words come without effort now, which is its own kind of warning. Between my hands the bread went quiet and strange — and I saw something I had said for years without seeing. The loaf I was breaking was the one we were all in.",
    scripture: ["Luke 24", "1 Corinthians 11"],
    themes:   ["communion", "Lord's Supper", "Emmaus", "breaking of bread", "body of Christ", "ritual", "presence"]
  },
  {
    title:    "Make Me",
    date:     "2026-06-29",
    url:      "/reflections/make-me.html",
    summary:  "A grandson learning to walk on a video call — reaching, then saying down and crawling. And Psalm 25:4–5, where David prays not give me the will but make me tread. The desire was never the missing thing. The treading was.",
    scripture: ["Psalm 25"],
    themes:   ["prayer", "obedience", "walking", "dependence", "Hebrew", "make me", "will of God"]
  },
  {
    title:    "His Name Is Oil Poured Out",
    date:     "2026-06-30",
    url:      "/reflections/let-his-name-be-poured-out.html",
    summary:  "There is a scent that goes before him. His name and his fragrance are nearly the same Hebrew word. The maidens love him for the scent — but the Shulammite is brought into the chamber. Same oil, two distances from the jar.",
    scripture: ["Song of Songs 1"],
    themes:   ["name of God", "longing", "presence", "desire"]
  },
  {
    title:    "My Stomach Churns",
    date:     "2026-07-01",
    url:      "/reflections/my-stomach-churns.html",
    summary:  "Reading Lamentations in the morning schedule — a poet giving grief a shape A to Z, so it wouldn't drown the page. Then a body speaks: my stomach churns. And a man from the visiting room rises under it: guilty, and grievously wronged, both at once, with no formula that nets one against the other.",
    scripture: ["Lamentations 1", "Lamentations 2"],
    themes:   ["lament", "grief", "justice", "prison ministry", "acrostic", "body", "guilt", "the wronged", "selah"]
  },
  {
    title:    "Unless I Had Believed",
    date:     "2026-07-01",
    url:      "/reflections/unless-i-had-believed.html",
    summary:  "At the hinge of Psalm 27 David reaches for a word he uses nowhere else — he'emanti, the root behind amen, the kind of ground you build a life on. Not strategy. Not resolve. One word kept him from fainting: believed.",
    scripture: ["Psalm 27"],
    themes:   ["belief", "faith", "goodness of God", "Hebrew", "waiting", "lament", "character of God"]
  },
  {
    title:    "New Every Morning",
    date:     "2026-07-02",
    url:      "/reflections/new-every-morning.html",
    summary:  "There is a man in the ruins who does not look up for twenty verses — and then turns something back to his heart on purpose. The hesed of the LORD sits at the exact centre of Lamentations, placed in the middle of the ruins.",
    scripture: ["Lamentations 3"],
    themes:   ["hesed", "lament", "hope", "acrostic", "meditation", "faithfulness", "morning", "memory", "recall"]
  },
  {
    title:    "The Watchman at the Railing",
    date:     "2026-07-04",
    url:      "/reflections/the-watchman-at-the-railing.html",
    summary:  "Ezekiel is not sent to succeed. He is sent to be there. God will not let a rebellious people arrive at their ruin able to say that no one came. The warning is not the opposite of the care — the warning is the care.",
    scripture: ["Ezekiel 2", "Ezekiel 3"],
    themes:   ["watchman", "prophet", "presence", "faithfulness", "warning", "care", "prison ministry", "incarnation", "staying"]
  }
  ,{
    title:    "The Third That Survived",
    date:     "2026-07-05",
    url:      "/reflections/the-third-that-survived.html",
    summary:  "Ezekiel 7 would not stay in the past — the ancient words rose off the page as modern horror, then turned their finger on the reader. The scattered third who survived still needed the prophet. Survival handed them a new question: what do we do now, with having come through the fire? The table answers it.",
    scripture: ["Ezekiel 7", "Lamentations 3", "1 Corinthians 11"],
    themes:   ["exile", "judgment", "survival", "communion", "hesed", "Holocaust", "history", "remembering", "mercy", "sin"]
  }
  ,{
    title:    "Into Your Hand",
    date:     "2026-07-05",
    url:      "/reflections/into-your-hand.html",
    summary:  "He did not have much breath left. What a man spends his last air on tells you what he was holding onto at the end. He spent it on a line from a psalm — a deposit-word, the language of placing something valuable into the keeping of someone who will be accountable for it.",
    scripture: ["Psalm 31"],
    themes:   ["cross", "crucifixion", "trust", "entrust", "afqid", "spirit", "keeper", "shamar", "resurrection", "prayer", "Jesus", "David", "last words", "heart"]
  }
  ,{
    title:    "Blessed Is the Man",
    date:     "2026-07-06",
    url:      "/reflections/blessed-is-the-man.html",
    summary:  "It doesn't say the man who never sinned. It says the man whose sin isn't counted against him. Three names for sin, and not one on the ledger. But when David kept quiet, his bones wore out — the shut mouth and the drying bones were the same thing.",
    scripture: ["Psalm 32"],
    themes:   ["confession", "forgiveness", "sin", "covering", "silence", "vulnerability", "penitential psalms", "blessing", "hiding", "trust"]
  }
  ,{
    title:    "Taste and See",
    date:     "2026-07-09",
    url:      "/reflections/taste-and-see.html",
    summary:  "Psalm 34 does not tell you God is good. It dares you to find out. Taste first, then see — the seeing is downstream of the tasting. You do not verify God from across the room and then approach. You approach, and the approach is how you come to know.",
    scripture: ["Psalm 34", "Isaiah 55", "1 Peter 2"],
    themes:   ["goodness", "taste", "ta'am", "fear of the Lord", "approach", "testimony", "homelessness", "incarnation", "knowing God", "refuge"]
  }
  ,{
    title:    "Idle Words",
    date:     "2026-07-10",
    url:      "/reflections/idle-words.html",
    summary:  "Ezekiel was mute for a season — his speech reserved for God alone — yet he never stopped communicating; his life became the conversation. Jesus said we give account for every idle word: argos, literally without work. Ezekiel's silence was the opposite of idle. It worked.",
    scripture: ["Matthew 12", "Ezekiel", "James 3"],
    themes:   ["silence", "idle words", "argos", "speech", "tongue", "restraint", "witness", "word study"]
  }
  ,{
    title:    "Star Wars",
    date:     "2026-07-12",
    url:      "/reflections/star-wars.html",
    summary:  "Four Hebrew words — hesed, emunah, tzedaqah, mishpat — given the dimensions of creation. Psalm 36 states the theme plainly: the bar where the orchestra stops accompanying and simply plays it. And Paul, in Romans 3, quotes the darkest line of the same psalm and then — without a hinge — lets the theme come in.",
    scripture: ["Psalm 36", "Romans 3"],
    themes:   ["hesed", "emunah", "tzedakah", "mishpat", "righteousness", "justice", "faithfulness", "Paul", "creation"]
  }
  ,{
    title:    "Selah",
    date:     "2026-07-13",
    url:      "/reflections/selah.html",
    summary:  "Twice in Psalm 39 the reading stops on the same word — hevel, a mere breath. Selah's meaning is unknown, but its function is to stop you, and to stop you somewhere in particular. One stop David takes himself; the other is handed to him. A bearing taken where you did not expect to be.",
    scripture: ["Psalm 39"],
    themes:   ["selah", "hevel", "breath", "mortality", "pause", "meditation", "providence", "discipline", "waiting", "hope"]
  }
  ,{
    title:    "A Shepherd Is What a Shepherd Does",
    date:     "2026-07-14",
    url:      "/reflections/a-shepherd-is-what-a-shepherd-does.html",
    summary:  "In Ezekiel 34 the fat sheep trample the pasture and foul the water, and the lean sheep go thin — yet the weak sheep are corrected not once. In most churches they are the ones corrected, because correcting the strong costs the shepherd his pasture. The binding and the breaking are one hand. Whose correction costs me something?",
    scripture: ["Ezekiel 34", "John 21"],
    themes:   ["shepherds", "sheep", "the weak", "correction", "power", "church", "leadership", "Peter", "justice", "prison ministry"]
  }
  ,{
    title:    "Church Leadership — Marching Orders",
    date:     "2026-07-15",
    url:      "/reflections/church-leadership-marching-orders.html",
    summary:  "A fragment of transliterated Hebrew arrives before a leadership meeting: chokmah elohim asah mishpat — the wisdom of God does justice. Mishpat was never a verdict from the bench; it is restoration, and it has to walk. The test at every table is not 'have we been fair' but 'has anything been healed' — and who was not in the room.",
    scripture: ["Proverbs 8", "Micah 6:8"],
    themes:   ["chokmah", "mishpat", "wisdom", "justice", "church leadership", "restoration", "the vulnerable", "governance", "prison ministry"]
  }
  ,{
    title:    "I Cannot Pray This",
    date:     "2026-07-16",
    url:      "/reflections/i-cannot-pray-this.html",
    summary:  "Psalm 41 stops me at verse twelve — 'you uphold me in my integrity' — which sounds like a man standing before God on his own wholeness. The release was one verse earlier: 'you delight in me.' Delight comes first, integrity second. And the delight David reached for from the bed was spoken freely over the Son: this is my beloved, in whom I am well pleased.",
    scripture: ["Psalm 41", "Isaiah 42", "Matthew 3"],
    themes:   ["integrity", "delight", "prayer", "grace", "the Servant", "baptism", "the poor", "David", "Jesus"]
  }
  ,{
    title:    "A Place for Salt",
    date:     "2026-07-17",
    url:      "/reflections/a-place-for-salt.html",
    summary:  "Ezekiel's river heals the Dead Sea — and then one line no one preaches: 'but its swamps and marshes will not become fresh; they are to be left for salt.' Cut it and nothing in the vision breaks. The prophet left it in. In the greatest picture of renewal in the prophets, the salt stays — healed does not mean smoothed into sweetness.",
    scripture: ["Ezekiel 47:11"],
    themes:   ["renewal", "healing", "salt", "the Dead Sea", "covenant", "restoration", "honesty", "wholeness"]
  }
  ,{
    title:    "Our God-Sponsored Projects",
    date:     "2026-07-18",
    url:      "/reflections/our-god-sponsored-projects.html",
    summary:  "I put the song on myself — 'I don't want to leave a legacy.' Then I turned to Nehemiah, praying the other way: remember me for the good I have done. Ezra–Nehemiah records what men finished and could not keep; the one durable thing, named once at the foundation stone, is God's hesed. Jesus builds what he has not finished, and therefore cannot lose.",
    scripture: ["Ezra 3:11", "Nehemiah 13", "Matthew 7:23"],
    themes:   ["legacy", "achievement", "hesed", "faithfulness", "Jesus", "the church", "prison ministry", "remembrance"]
  }
  ,{
    title:    "Not the Lesson I First Thought",
    date:     "2026-07-19",
    url:      "/reflections/not-the-lesson-i-first-thought.html",
    summary:  "In Ezra 4 the neighbours offer to help build, and Zerubbabel refuses. They raised worship; he answered architecture. The invitation was written into the founding charter — Solomon prayed for the foreigner, Isaiah called it a house of prayer for all peoples — and he did not reach for it. Five hundred years later a woman at a well raises the same grievance, and Jesus changes not the standard but what kind of thing makes a person suitable. They thought they were building a house. They were meant to be gathering worshippers.",
    scripture: ["Ezra 4", "John 4", "1 Kings 8", "Isaiah 56"],
    themes:   ["worship", "temple", "mission", "exclusion", "the Samaritan woman", "Jesus", "the church", "gatekeeping", "hospitality"]
  }
  ,{
    title:    "Is There Not a Cause",
    date:     "2026-07-20",
    url:      "/reflections/is-there-not-a-cause.html",
    summary:  "When I was young in the faith I wanted a cause — something to ride toward and take. Then I found David's 'is there not a cause,' and the same word in Psalm 45, of a King riding out for truth and meekness and righteousness. But he does not ride toward them; he rides for them. They are not the objective — they are what the ride is made of. I wanted a cause to die for; what was on offer was harder: a way to live on the way to dying.",
    scripture: ["Psalm 45:4", "1 Samuel 17"],
    themes:   ["meekness", "cause", "David", "kingship", "following", "the Servant", "discipleship"]
  }
  ,{
    title:    "See Me Trying",
    date:     "2026-07-22",
    url:      "/reflections/see-me-trying.html",
    summary:  "Lying in the dark, I found myself asking why I gave up what I gave up — and then found Nehemiah asking God the same thing, four times across his book. I had misread his prayer as ledger-keeping. It is the vulnerability of worship itself: a child carrying a crayon drawing to their father. Not asking for payment. Asking to be seen.",
    scripture: ["Nehemiah 5:19", "Nehemiah 13"],
    themes:   ["prayer", "worship", "being known", "giving", "stewardship", "legacy", "remembrance"]
  }
  ,{
    title:    "In the Midst of the Temple",
    date:     "2026-07-23",
    url:      "/reflections/in-the-midst-of-the-temple.html",
    summary:  "Psalm 48 builds the city — the mountain, the palaces, the kings retreating — and then Selah. When the pause ends, the question surfaces: not what does the city look like, but what is it for? 'We have thought on your steadfast love, O God, in the midst of your temple.' If hesed is what Zion is built on, does my life exude it? Does the church?",
    scripture: ["Psalm 48:9-11"],
    themes:   ["hesed", "selah", "Zion", "temple", "the church", "prison ministry", "faithfulness", "witness"]
  }
  ,{
    title:    "Understanding?",
    date:     "2026-07-23",
    url:      "/reflections/understanding.html",
    summary:  "Reading Psalm 49, a state funeral came back to me — the accolades, the news clips, the kind of man for whom a city stages a farewell. 'Man in his pomp, yet without understanding, is like the beasts that perish.' Not intelligence. Da'at — the knowing of God that turns everything outward, that is not in the head but in the hands.",
    scripture: ["Psalm 49"],
    themes:   ["da'at", "hesed", "understanding", "wealth", "mortality", "justice", "knowing God"]
  }
  ,{
    title:    "The Sacrifice of Thanksgiving",
    date:     "2026-07-24",
    url:      "/reflections/the-sacrifice-of-thanksgiving.html",
    summary:  "Psalm 50 opens like a courtroom, and the first thing God says is that he is not hungry — the offerings were never supply. What he wants: offer to God a sacrifice of thanksgiving; the one who offers thanksgiving glorifies me. Kavod means weight. Two old men in Papua New Guinea had grounds for grievance and carried thanksgiving instead — and standing next to them you could tell which of the two weighed more.",
    scripture: ["Psalm 50"],
    themes:   ["thanksgiving", "kavod", "glory", "gratitude", "sacrifice", "soli Deo gloria", "grievance", "worship"]
  }
  ,{
    title:    "Draw Me",
    date:     "2026-07-25",
    url:      "/reflections/draw-me.html",
    summary:  "You cannot argue a fire back to life — I learned that at an old hearth, waiting for the coals to draw. Reading 'draw me' in the Song, that stopped being doctrine and became recognition. She cannot work this up. All she can do is ask for the breath that starts the pull.",
    scripture: ["Song of Songs 1:4"],
    themes:   ["Song of Songs", "mashak", "longing", "prayer", "grace", "desire", "asking"]
  }
  /* ── add new articles above this line ── */
];
