export const SITE_METADATA = {
  name: "Main Jonang Takten Phuntsok Choeling",
  shortName: "Jonang Monastery",
  tibetanName: "༄༅།། འཕགས་ཡུལ་ཇོ་ནང་མ་དགོན་རྟག་བརྟན་ཕུན་ཚོགས་ཆོས་གླིང་།",
  subheading: "Seat of the Unbroken Kālacakra and Shentong Lineage",
  tagline:
    "A Tibetan Buddhist monastery in Shimla, India, dedicated to learning and practice in the Jonang tradition.",
  description:
    "Main Jonang Takten Phuntsok Choeling, a Tibetan Buddhist monastery in Sanjauli, Shimla, India. Discover the Jonang tradition, monastic life and ways to contact and support the monastery.",
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

  sameAs: [],

  blessing: {
    mantra: "OṂ ĀḤ HŪṂ HOḤ HA KṢA MA LA VA RA YA SVĀHĀ",
    tibetanMantra: "༄༅། ཨོཾ་ཨཱཿཧཱུྃ་ཧོཿ ཧ་ཀྵ་མ་ལ་ཝ་ར་ཡ་སྭཱ་ཧཱ།",
    tibetanMantraPrefix: "༄༅།",
    text: "Through the virtue of the glorious Kālacakra, may obstacles and discord be pacified, may the definitive Dharma flourish, and may all sentient beings attain supreme awakening.",
  },
} as const;

export type SiteMetadata = typeof SITE_METADATA;
