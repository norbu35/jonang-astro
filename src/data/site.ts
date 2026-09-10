export const SITE_METADATA = {
  name: "Main Jonang Takten Phuntsok Choeling",
  shortName: "Jonang Monastery",
  tibetanName: "༄༅།། འཕགས་ཡུལ་ཇོ་ནང་མ་དགོན་རྟག་བརྟན་ཕུན་ཚོགས་ཆོས་གླིང་།",
  subheading: "Monastery of the Unwavering Path to Liberation",
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

  blessing: {
    mantra: "OṂ HĀ KṢA MA LA VA RA YAṂ SVĀHĀ",
    tibetanMantra: "༄༅། ཨོཾ་ཧཱ་ཀྵ་མ་ལ་ཝ་ར་ཡཱཾ་སྭཱ་ཧཱ།",
    tibetanMantraPrefix: "༄༅།",
    text: "May the resonant power of the Kālacakra mantra radiate wisdom, compassion, and realization, awakening bodhicitta to bring liberation to all sentient beings.",
  },
} as const;

export type SiteMetadata = typeof SITE_METADATA;
