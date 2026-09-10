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
    desc: "Kunpang Thukje Tsöndrü (1243–1313) unifies the seventeen Dro lineage transmissions of the Kālacakra Tantra and establishes the Jonang hermitage in Tsang.",
  },
  {
    era: "1292 – 1361",
    title: "Dölpopa & the Great Kumbum",
    desc: 'Kunkhyen Dölpopa Sherab Gyaltsen builds the Great Stupa of Jomonang (1330–1333) and authors the "Mountain Doctrine" (Ri chos nges don rgya mtsho), formulating the definitive Shentong Madhyamaka view.',
  },
  {
    era: "1575 – 1635",
    title: "Jetsun Tāranātha",
    desc: "The 16th throne-holder, scholar, and historian establishes Takten Damchö Ling Monastery (1615), writes definitive treatises on the Six-fold Vajrayoga (Mthong ba don ldan), and compiles the seminal *History of Buddhism in India* (1608).",
  },
  {
    era: "17th – 20th Century",
    title: "Preservation & Citadel of Amdo",
    desc: "Following the 17th-century political upheavals in Central Tibet and the conversion of its central monasteries, the Jonang contemplative lineages, scholastic commentaries, and woodblock archives were preserved in Eastern Tibet (Amdo and Kham), centered at Dzamthang Tsangwa Monastery and affiliated hermitages in Ngawa and Golok.",
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
    "Jetsun Dampa Jampal Namdrol linked the Jonang tradition in exile with the revival of Buddhism in Mongolia. The Jebtsundamba Khutuktu incarnation line shares deep historical ties with Jonang through its founder, Jetsun Tāranātha, whose works on the Kālacakra Tantra and Shentong Madhyamaka were transmitted to Mongolia.",
    "As the 9th Jebtsundamba, Jampal Namdrol worked to restore Buddhist monastic education in Mongolia following the communist era. In 1997, the 14th Dalai Lama appointed him formal head of the Jonang tradition, officially affirming Jonang's standing alongside the other principal Tibetan Buddhist schools.",
    "Through this appointment, he oversaw the consecration of the Main Jonang Takten Phuntsok Choeling monastery in Shimla and supported the transmission of Kālacakra practice cycles across Tibetan and Mongolian monastic communities.",
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
