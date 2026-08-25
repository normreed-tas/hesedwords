/* ================================================================
   ARTICLES MANIFEST (metadata mirror)
   This powers the site-wide combined index on the home page only.
   articles.html itself is hand-written HTML cards — NOT generated
   from this file. When you add a new article card to articles.html,
   ALSO add a matching entry here (title/url/date/scripture/themes/
   summary), newest first. Article dates have no exact day recorded
   on their cards, so month-level dates use the 1st as a placeholder.
   ================================================================ */
const ARTICLES_META = [
  {
    title:    "Fitting",
    url:      "/articles/fitting.html",
    date:     "2026-08-25",
    scripture: ["Matthew 3:15", "Romans 3:21-26"],
    themes:   ["tzedaqah", "righteousness", "baptism", "John the Baptist", "translation", "dikaiosyne"],
    summary:  "The first recorded public words of the adult Jesus are not a claim but a concession — let it be so now, for thus it is fitting for us. Not required, not owed. Fitting, and fitting for the two of them together. On what tzedaqah carried into Greek, why righteousness has no units, and a man who stood in a queue of people confessing sins he did not have."
  },
  {
    title:    "The Thursday Psalm",
    url:      "/articles/the-thursday-psalm.html",
    date:     "2026-08-24",
    scripture: ["Psalm 81"],
    themes:   ["gittith", "superscriptions", "daily psalms", "liturgy", "Jewish tradition", "justice", "reading"],
    summary:  "Psalm 81 has been said every Thursday since the Temple, and six others hold the rest of the week. Seven psalms out of a hundred and fifty, fixed to the days — three of them about justice, one about God's grief that his people will not listen, and no Psalm 23 among them. Forty-five years of reading, twice through the Psalter a year, and I did not know."
  },
  {
    title:    "Reading the Label",
    url:      "/articles/reading-the-label.html",
    date:     "2026-08-19",
    scripture: ["Psalm 76"],
    themes:   ["superscriptions", "mizmor", "maskil", "tehillah", "Asaph", "Sennacherib"],
    summary:  "The line above a psalm is not a filing note — it is the only thing the psalm tells you about itself. Six headings, six reading instructions, and a book named after the label that appears exactly once. Psalm 76 as the worked example: a victory song about a morning nobody in the city fought for, which is why there is nothing in it to ask for."
  },
  {
    title:    "Psalm 75 — How Do I Pray This?",
    url:      "/articles/how-do-i-pray-this.html",
    date:     "2026-08-18",
    scripture: ["Psalm 75"],
    themes:   ["horn", "antiphon", "prayer", "promotion", "pride", "judgement", "thanksgiving"],
    summary:  "Ten verses read, one verse prayed. Looking up horn recovered the picture — a ram coming up the road with its head back — and the psalm still would not pray. Recovering the picture was not the same as finding the occasion. On counting who is speaking, and what is left when the lines you cannot say are taken off you."
  },
  {
    title:    "Telling It Wrong",
    url:      "/articles/telling-it-wrong.html",
    date:     "2026-08-17",
    scripture: ["1 Samuel 17:29", "Psalm 74:22"],
    themes:   ["davar", "riv", "translation", "cause", "preaching", "children's telling"],
    summary:  "There is no word for cause in either famous verse. David said something nearer to \"I only asked a question\"; Psalm 74 asks God to prosecute a case. The translators did not change — English did. On four places a person can stand in front of a verse, and why the telling that carries the weight is the one that gets the details wrong."
  },
  {
    title:    "The Treasure",
    url:      "/articles/the-treasure.html",
    date:     "2026-08-16",
    scripture: ["Matthew 13:44-46", "John 17"],
    themes:   ["kavod", "hevel", "glory", "treasure", "pearl of great price", "C.S. Lewis", "exchange"],
    summary:  "Two of the shortest stories Jesus told, read backwards from John 17. The man sells everything and buys the field — not the treasure, the dirt around it. If he is the buyer, what did he count worth everything? On kavod and hevel, the exchange Romans 1 calls a trade, and the one offer he refused."
  },
  {
    title:    "Who Are the Enemies of God? — Reading Psalm 68",
    url:      "/articles/who-are-the-enemies-of-god.html",
    date:     "2026-08-13",
    scripture: ["Psalm 68"],
    themes:   ["sorerim", "enemies", "selah", "dwelling", "love your enemies", "Dead Sea Scrolls"],
    summary:  "Everyone knows the first line. Almost nobody reads the other thirty-three verses. Psalm 68 never names an enemy — it describes one, four times over, and a description fits whoever fits it. The same word for the rebellious in the parched land is the word for the people God chooses to live among."
  },
  {
    title:    "He Named the Gatekeepers",
    url:      "/articles/he-named-the-gatekeepers.html",
    date:     "2026-08-10",
    scripture: ["1 Chronicles 15-17"],
    themes:   ["genealogy", "names", "Obed-Edom", "Chronicles", "storytelling"],
    summary:  "Samuel tells the ark's arrival in twelve verses and names four people. Chronicles tells the same story in eighty-six verses and names more than forty. On what the Chronicler chose to expand, what he chose to leave out entirely, and why the lists were never a failure of storytelling."
  },
  {
    title:    "Sitting with a Sinner",
    url:      "/articles/sitting-with-a-sinner.html",
    date:     "2026-08-07",
    scripture: ["Luke 15:1-2", "Luke 5:30", "Luke 7:34"],
    themes:   ["hesed", "sinner", "labels", "family", "prison ministry"],
    summary:  "A companion to An Interview with a Saint. My sister Ruth calls herself the black sheep of the family — and has quietly been the backbone of a church and a prison ministry for over a decade, without ever filing any of it under a category. On the two words we keep in our pockets for people, and the one Jesus refused to be embarrassed by."
  },
  {
    title:    "An Interview with a Saint",
    url:      "/articles/an-interview-with-a-saint.html",
    date:     "2026-08-06",
    scripture: ["Romans 1:7", "1 Corinthians 1:2", "Philippians 1:1", "Ephesians 1:1"],
    themes:   ["hagioi", "saints", "testimony", "AIDS ministry", "community"],
    summary:  "The word arrives already furnished — Francis, Teresa, held at a distance so the rest of us are let off. The New Testament's word for saint, hagioi, is almost always plural: not one figure but a room full of ordinary ones. A recorded conversation with the author's sister Jessica, about a week spent training to care for people with AIDS thirty years ago, and what it means that nobody is a saint alone."
  },
  {
    title:    "Measured, and Immeasurable",
    url:      "/articles/measured-and-immeasurable.html",
    date:     "2026-08-05",
    scripture: ["Zechariah 1:16", "Zechariah 2", "2 Kings 21:13", "Lamentations 2:8", "Ephesians 3:18-19"],
    themes:   ["rachamim", "mercy", "measure", "prison ministry", "forgiveness", "delegation"],
    summary:  "A young man in Zechariah's second vision goes out to survey Jerusalem, and is stopped — the city will not hold still to be measured. What that reversal of the demolition-line has to do with a burned man in a prison visits room, a tablet with a poor signal, and the sentence that took fourteen years to get truer rather than easier: grace is not grace if you don't know the offence."
  },
  {
    title:    "The Vow That Is Not a Payment",
    url:      "/articles/vows.html",
    date:     "2026-08-04",
    scripture: ["Psalm 61", "Ecclesiastes 5", "Matthew 5", "Numbers 30", "Deuteronomy 23"],
    themes:   ["neder", "shalem", "vows", "oaths", "obligation", "thanksgiving"],
    summary:  "Most vows to God are made in a car park or a waiting room, and they all have the same shape: if you get me out of this, I will — which assumes a trade. The obligation is real; what is misplaced is what the obligation is for. On what a neder was, why Ecclesiastes warns against making one lightly, and what Jesus was actually objecting to."
  },
  {
    title:    "What Did Jesus Call Wicked?",
    url:      "/articles/what-did-jesus-call-wicked.html",
    date:     "2026-08-03",
    scripture: ["Psalm 58", "Psalm 82", "Matthew 23:23", "Matthew 25:26", "Matthew 18:32", "John 10:34"],
    themes:   ["rasha", "wicked", "justice", "mercy", "the bench", "imprecatory psalms"],
    summary:  "Psalm 58 is a psalm most Christians have never heard read aloud. Read alongside Psalm 82 and Matthew 23, it turns out to be saying what the gospel says — that authority given to protect the vulnerable, turned and used against them, has a name. Not a text the gospel improved on. A text that says what the gospel says."
  },
  {
    title:    "Is There No Hesed in John?",
    url:      "/articles/is-there-no-hesed-in-john.html",
    date:     "2026-08-02",
    scripture: ["John 1:14", "John 1:17", "John 13:1-17", "Hosea 6:6"],
    themes:   ["hesed", "eleos", "charis", "aletheia", "agape", "John's Gospel"],
    summary:  "The Greek word the Septuagint reaches for when translating hesed never appears in John's Gospel — not once in twenty-one chapters. But grace and truth, said twice in four verses at the very start, are almost certainly hesed we'emet in Greek clothing. The word doesn't go missing. It gets spent, once, and then John makes us watch it for twenty chapters."
  },
  {
    title:    "Reading Daniel Without Arithmetic",
    url:      "/articles/reading-daniel-without-arithmetic.html",
    date:     "2026-08-01",
    scripture: ["Daniel 11:32-33", "Daniel 12:2-3", "Daniel 12:10"],
    themes:   ["Daniel", "prophecy", "certainty", "eschatology", "endurance"],
    summary:  "Daniel 11–12 has cost the church more peace than almost anything else in the Old Testament. Four broad readings, each guarding something real, and not one of them defending a date. The book itself says who reads it rightly — not the one with the best chronology, but the one being refined."
  },
  {
    title:    "Nobody Left to Say No",
    url:      "/articles/nobody-left-to-say-no.html",
    date:     "2026-07-30",
    scripture: ["Daniel 4:30", "Daniel 4:27", "Daniel 4:33", "Daniel 4:34", "Daniel 4:36", "Isaiah 14:13-14", "2 Kings 5:11-14"],
    themes:   ["pride", "humility", "correction", "Nebuchadnezzar", "Naaman"],
    summary:  "Nebuchadnezzar on the roof of his palace, Howard Hughes in a sealed hotel room, Naaman in the Jordan, and a preacher buried in a pine box built by prisoners. Pride does not announce itself — it sounds, from the inside, like accuracy. The only real test is whether anyone is still able to tell you the truth, and whether you would listen."
  },
  {
    title:    "Spot the Difference",
    url:      "/articles/spot-the-difference.html",
    date:     "2026-07-28",
    scripture: ["Psalm 14", "Psalm 53"],
    themes:   ["Zion", "the fool", "salvation", "the poor", "refuge", "paired psalms"],
    summary:  "Psalm 14 and Psalm 53 are almost the same psalm — same opening, same verdict, same ache at the end. Two lines have gone missing from the middle of Psalm 53: the company God is with, and the place the poor could hide. The same cry goes up out of Zion, with nowhere else to look."
  },
  {
    title:    "Draw Me! The Voice Matters",
    url:      "/articles/draw-me-the-voice-matters.html",
    date:     "2026-07-01",
    scripture: ["Song of Songs 1:2-4"],
    themes:   ["mashak", "hesed", "desire", "prayer", "asking"],
    summary:  "Song of Songs 1:2–4 traces desire as it learns to speak — from report, to address, to a request small enough to be answered. Mashak is not a delicate word: it is the word for drawing a bow taut, for hauling a body from a pit. She is not inventing a metaphor. She is asking, by name, for hesed."
  },
  {
    title:    "Meekness",
    url:      "/articles/psalm-45-meekness.html",
    date:     "2026-07-01",
    scripture: ["Psalm 45"],
    themes:   ["meekness", "anavah", "gibbor", "rachash", "power", "kingship"],
    summary:  "Psalm 45 and the strange word at its centre. A King rides out in majesty for truth and righteousness — and meekness, sitting between two words about power where it should not be. Not softness, but power that refuses to grasp."
  },
  {
    title:    "Ezra Had the Scroll",
    url:      "/articles/ezra-had-the-scroll.html",
    date:     "2026-07-01",
    scripture: ["Nehemiah 8"],
    themes:   ["the scroll", "public reading", "assembly", "names", "the people"],
    summary:  "Twenty-six names sit in the middle of Nehemiah 8, and most of us read straight past them. They are not a pause before the action — they are the subject of the sentence that matters most."
  },
  {
    title:    "Learning to Pray by Praying the Psalms — Until We Reach Psalm 83",
    url:      "/articles/until-we-reach-psalm-83.html",
    date:     "2026-07-01",
    scripture: ["Psalm 83"],
    themes:   ["imprecatory psalms", "difficult prayer", "vengeance", "enemies", "praying scripture"],
    summary:  "We say the Psalms will teach us to pray. Then the ground gives way."
  },
  {
    title:    "The Song Begins in Longing",
    url:      "/articles/the-song-begins-in-longing.html",
    date:     "2026-06-01",
    scripture: ["Song of Songs 1:1"],
    themes:   ["longing", "desire", "grammar", "kiss", "time", "poetry"],
    summary:  "Why the greatest of all songs opens not with the kiss but with the wanting of it — a close reading of Song of Songs 1:1. The grammar that lurches from third person to second, the doubled kiss the Hebrew refuses to simplify, and the time the poem declines to fix."
  },
  {
    title:    "Not Finished Waking",
    url:      "/articles/not-finished-waking.html",
    date:     "2026-06-01",
    scripture: ["Job 19:25-27", "Psalm 17:15"],
    themes:   ["resurrection", "hope", "grief", "graveside", "waiting for God"],
    summary:  "What Job and David staked everything on before either of them had proof — and what it gives a pastor standing at a graveside. Six movements from the ash heap to the resurrection, and the one word both men reached for when pressed to the floor."
  },
  {
    title:    "He Does Not Afflict From His Heart",
    url:      "/articles/he-does-not-afflict-from-his-heart.html",
    date:     "2026-06-01",
    scripture: ["Jeremiah 6:16", "Jeremiah 20:9", "Jeremiah 12:7", "Lamentations 3:32-33"],
    themes:   ["judgment", "grief", "ancient paths", "the prophets", "God's reluctance"],
    summary:  "What Jeremiah reveals about the God who interrupts his own judgment. The grief behind the oracle, the ancient paths of Jeremiah 6:16, and the sentence from Lamentations that changes everything about how we read the prophets."
  },
  {
    title:    "Jesus as Leader",
    url:      "/articles/jesus-as-leader.html",
    date:     "2026-06-01",
    scripture: ["Mark 10:42-45"],
    themes:   ["leadership", "servanthood", "pastoral formation", "family", "ministry"],
    summary:  "If we take the gospels seriously as the description of how Jesus actually conducted his ministry, does the leadership he modelled map onto the formation the contemporary church offers its pastors? Five movements, two weekly calendars, and the questions that don't go away."
  },
  {
    title:    "When the Heart Was Awake",
    url:      "/articles/when-the-heart-was-awake.html",
    date:     "2026-06-01",
    scripture: ["Song of Songs 5", "Romans 7"],
    themes:   ["desire", "idolatry", "the divided self", "hesed", "belonging"],
    summary:  "The arc of desire in the Song of Songs — from longing into belonging into open-handed offering — and what interrupts it. The warm bed, the idol as ordinary comfort, Paul's anatomy of the divided self in Romans 7, and the hesed that kindles what we cannot work up in ourselves."
  }
  /* ── add new articles above this line ── */
];
