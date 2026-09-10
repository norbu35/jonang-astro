export const SITE_METADATA = {
  name: "Main Jonang Takten Phuntsok Choeling",
  shortName: "Jonang Monastery",
  tibetanName: "༄༅།། འཕགས་ཡུལ་ཇོ་ནང་མ་དགོན་རྟག་བརྟན་ཕུན་ཚོགས་ཆོས་གླིང་།",
  subheading: "Seat of the Unbroken Kālacakra and Shentong Lineage",
  tagline:
    "Head seat of the Jonang tradition in exile. Preserving Shentong Madhyamaka philosophy and the unbroken Kālacakra Six-fold Vajrayoga.",
  description:
    "Main Jonang Takten Phuntsok Choeling Tibetan Buddhist Monastery in Sanjauli, Shimla, India. Preserving the definitive Shentong view of primordial wisdom, the Kālacakra completion stage practice, and an 18-year monastic curriculum.",
  keywords:
    "Jonang, Tibetan Buddhism, Kalachakra, Shentong, Shimla monastery, Dolpopa, Taranatha, Vajrayoga, Tibetan Monastery India",
  siteUrl: "https://jonang.in",
  locationBadge: "Sanjauli, Shimla",

  contact: {
    email: "office@jonangmonastery.com",
    phone: "+91 177 2841410",
    phoneAlt: "+91 177 2645280",
    societyName: "Jonang Takten Phuntsok Choeling Cultural Society",
    addressLines: [
      "Jonang Takten Phuntsok Choeling",
      "Tibetan Buddhist Monastery,",
      "Sanjauli, Shimla,",
      "Himachal Pradesh 171006, INDIA",
    ],
    registrationNotice:
      "Registered Society under the Societies Registration Act · Sanjauli, Shimla, Himachal Pradesh 171006, India",
  },

  geo: {
    latitude: 31.1018,
    longitude: 77.1989,
  },

  denomination: "Tibetan Buddhism (Jonang Tradition)",
  foundingDate: "1963",
  rededicationDate: "1990-07-06",

  sameAs: [
    "https://en.wikipedia.org/wiki/Jonang",
    "https://en.wikipedia.org/wiki/Dolpopa_Sherab_Gyaltsen",
    "https://en.wikipedia.org/wiki/Taranatha",
    "https://en.wikipedia.org/wiki/Kalachakra",
    "https://www.wikidata.org/wiki/Q1414436",
    "https://library.bdrc.io/show/bdr:G4",
  ],

  blessing: {
    mantra: "OṂ ĀḤ HŪṂ HOḤ HA KṢA MA LA VA RA YA SVĀHĀ",
    tibetanMantra: "༄༅། ཨོཾ་ཨཱཿཧཱུྃ་ཧོཿ ཧ་ཀྵ་མ་ལ་ཝ་ར་ཡ་སྭཱ་ཧཱ།",
    tibetanMantraPrefix: "༄༅།",
    text: "Through the virtue of the glorious Kālacakra, may obstacles and discord be pacified, may the definitive Dharma flourish, and may all sentient beings attain supreme awakening.",
  },
} as const;

export type SiteMetadata = typeof SITE_METADATA;
