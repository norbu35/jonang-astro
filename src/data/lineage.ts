import khalkhaJetsunDhampaImg from "../assets/portraits/khalkha_jetsun_dampa.webp";

export interface HistoricalEpoch {
  era: string;
  title: string;
  desc: string;
}

export const HISTORICAL_TIMELINE: HistoricalEpoch[] = [
  {
    era: "1294",
    title: "Establishment in Jomonang Valley",
    desc: "Kunpang Thukje Tsondru (1243–1313) unifies the seventeen Dro lineage transmissions of the Kālacakra Tantra and establishes the Jonang hermitage in Tsang.",
  },
  {
    era: "1292 – 1361",
    title: "Dolpopa & the Great Kumbum",
    desc: 'Kunkhyen Dolpopa Sherab Gyaltsen builds the Great Stupa of Jomonang (1330–1333) and authors the "Mountain Doctrine" (Ri chos nges don rgya mtsho), formulating the definitive Shentong Madhyamaka view.',
  },
  {
    era: "1575 – 1635",
    title: "Jetsun Tāranātha",
    desc: "The 16th throne-holder, scholar, and historian establishes Takten Damchö Ling Monastery (1615), writes definitive treatises on the Six-fold Vajrayoga (Mthong ba don ldan), and compiles the seminal *History of Buddhism in India* (1608).",
  },
  {
    era: "17th – 20th Century",
    title: "Preservation & Citadel of Amdo",
    desc: "While Central Tibetan monasteries navigated 17th-century political realignments, the Jonang lineage's sacred contemplative transmissions, printing blocks, and scholastic legacy flourished with vibrant vitality across Amdo and Kham—safeguarded at the monumental Dzamthang Tsangwa Monastery and affiliated hermitages in Ngawa and Golok.",
  },
  {
    era: "1960s – Present",
    title: "Exile Re-establishment in Shimla",
    desc: "Lama Jinpa Gyatso establishes the Shimla monastery. In 1990, the 14th Dalai Lama designates it Main Jonang Takten Phuntsok Choeling and appoints the 9th Khalkha Jetsun Dampa as head of the tradition in 1997.",
  },
];

export const LINEAGE_HEAD = {
  name: "H.H. 9th Khalkha Jetsun Dampa",
  tibetanName: "འཇམ་དཔལ་རྣམ་གྲོལ་ཆོས་ཀྱི་རྒྱལ་མཚན།",
  tibetanTitle: "ཁལ་ཁ་རྗེ་བཙུན་དམ་པ་སྐུ་ཕྲེང་དགུ་པ།",
  phoneticName: "Jampal Namdrol Chökyi Gyaltsen",
  dates: "1933 – 2012",
  title: "Reincarnation of Jetsun Tāranātha & Jonang Supreme Head (1997–2012)",
  portrait: khalkhaJetsunDhampaImg,
  portraitAlt: "H.H. 9th Khalkha Jetsun Dampa Jampal Namdrol Chökyi Gyaltsen",
  portraitCaption:
    "H.H. 9th Khalkha Jetsun Dampa Jampal Namdrol (1933–2012), recognized reincarnation of Jetsun Tāranātha and Supreme Head of the Jonang tradition.",

  narrativeParagraphs: [
    "Jetsun Dampa Jampal Namdrol served as a vital bridge between the esoteric teachings of the Jonang tradition and the Mongolian Buddhist community. Historically, the Jebtsundamba Khutuktu lineage has been deeply intertwined with Jonang, particularly through its emphasis on the Kālacakra Tantra and the definitive view of Shentong.",
    "As the 9th Jebtsundamba, Jampal Namdrol upheld the spiritual legacy of the Jonang teachings, emphasizing the integration of meditative realization with compassionate action. His role as a reincarnated spiritual leader not only revitalized the religious traditions of Mongolia but also solidified the recognized status of the Jonang school within the broader Tibetan Buddhist framework.",
    "In the Jonang tradition, Jetsun Dampa’s life and deeds embodied the historical continuity between Tibetan and Mongolian Buddhism, safeguarding the sacred transmission of the Kālacakra teachings and inspiring practitioners to study Shentong Madhyamaka for the liberation of all sentient beings.",
  ],

  pillars: [
    {
      kicker: "1997 Recognition",
      desc: "Appointed head of the Jonang tradition in exile by the 14th Dalai Lama.",
    },
    {
      kicker: "Mongolian Line",
      desc: "9th Bogd Gegeen, maintaining the lineage bridge founded by Zanabazar.",
    },
    {
      kicker: "Doctrinal Seat",
      desc: "Preserved Shentong Madhyamaka and Kālacakra Six Yogas transmission.",
    },
  ],
} as const;
