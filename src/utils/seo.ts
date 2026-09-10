import { SITE_METADATA } from "../data/site";
import { GLOSSARY_ENTRIES } from "../data/glossary";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildCanonicalUrl(pathname: string, siteUrl = SITE_METADATA.siteUrl): string {
  if (!pathname || pathname === "/") {
    return `${siteUrl}/`;
  }
  const clean = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${siteUrl}/${clean}`;
}

export function getGlobalKnowledgeGraph() {
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE_METADATA.siteUrl}/#website`,
    url: `${SITE_METADATA.siteUrl}/`,
    name: SITE_METADATA.name,
    alternateName: [
      SITE_METADATA.tibetanName,
      SITE_METADATA.shortName,
      "Jonang Monastery",
      "Sanjauli Monastery",
    ],
    description: SITE_METADATA.description,
    inLanguage: ["en", "bo"],
    publisher: {
      "@id": `${SITE_METADATA.siteUrl}/#monastery`,
    },
  };

  const monasterySchema = {
    "@type": ["BuddhistTemple", "Place", "Organization"],
    "@id": `${SITE_METADATA.siteUrl}/#monastery`,
    name: SITE_METADATA.name,
    alternateName: [
      SITE_METADATA.tibetanName,
      SITE_METADATA.shortName,
      "Jonang Takten Phuntsok Choeling",
      "Jonang Monastery",
      "Sanjauli Monastery",
      "ཇོ་ནང་མ་དགོན་རྟག་བརྟན་ཕུན་ཚོགས་ཆོས་གླིང་།",
    ],
    description: SITE_METADATA.description,
    url: `${SITE_METADATA.siteUrl}/`,
    logo: `${SITE_METADATA.siteUrl}/logo512x512.jpg`,
    image: `${SITE_METADATA.siteUrl}/logo512x512.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sanjauli",
      addressLocality: "Shimla",
      addressRegion: "Himachal Pradesh",
      postalCode: "171006",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_METADATA.geo.latitude,
      longitude: SITE_METADATA.geo.longitude,
    },
    telephone: SITE_METADATA.contact.phone,
    email: SITE_METADATA.contact.email,
    foundingDate: SITE_METADATA.foundingDate,
    sameAs: [...SITE_METADATA.sameAs],
    knowsAbout: [
      "Jonang Tibetan Buddhism",
      "Shentong Madhyamaka",
      "Kālacakra Tantra",
      "Six-fold Vajrayoga",
      "Dölpopa Sherab Gyaltsen",
      "Jetsun Tāranātha",
      "Tathāgatagarbha",
      "Buddhist Epistemology (Pramāṇa)",
    ],
  };

  return [websiteSchema, monasterySchema];
}

export function getBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_METADATA.siteUrl}/`,
    },
    ...breadcrumbs.map((b, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: b.name,
      item: buildCanonicalUrl(b.path),
    })),
  ];

  return {
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

export function getPageSpecificSchema(pathname: string) {
  const clean = pathname.replace(/^\/+/, "").replace(/\/+$/, "");

  if (clean === "glossary") {
    return {
      "@type": "DefinedTermSet",
      "@id": `${SITE_METADATA.siteUrl}/glossary#terms`,
      name: "Jonang Doctrinal & Philosophical Lexicon",
      description:
        "Canonical glossary of Tibetan, Sanskrit, and English terminology for Shentong Madhyamaka, Kālacakra Tantra, and monastic life.",
      inLanguage: ["en", "bo", "sa"],
      hasDefinedTerm: GLOSSARY_ENTRIES.map((entry) => ({
        "@type": "DefinedTerm",
        termCode: entry.id,
        name: entry.termEn,
        alternateName: [entry.termBo, entry.wylie, ...(entry.termSkt ? [entry.termSkt] : [])],
        description: entry.shortDef,
        inDefinedTermSet: `${SITE_METADATA.siteUrl}/glossary#terms`,
        url: `${SITE_METADATA.siteUrl}/glossary#${entry.id}`,
      })),
    };
  }

  if (clean === "monastery") {
    return {
      "@type": "AboutPage",
      "@id": `${SITE_METADATA.siteUrl}/monastery#about`,
      url: `${SITE_METADATA.siteUrl}/monastery`,
      name: "Main Jonang Takten Phuntsok Choeling Monastery",
      description:
        "History, sacred shrines, abbots, and sangha community of the Jonang seat in exile in Sanjauli, Shimla, India.",
      mainEntity: {
        "@id": `${SITE_METADATA.siteUrl}/#monastery`,
      },
    };
  }

  if (clean === "doctrine") {
    return {
      "@type": "ScholarlyArticle",
      "@id": `${SITE_METADATA.siteUrl}/doctrine#article`,
      headline: "The Jonang Doctrine & Shentong View of Ultimate Buddha-Nature",
      description:
        "Comprehensive scholarly presentation of Shentong Great Madhyamaka, the Third Turning of the Dharma Wheel, and Dölpopa's Mountain Doctrine.",
      author: {
        "@id": `${SITE_METADATA.siteUrl}/#monastery`,
      },
      publisher: {
        "@id": `${SITE_METADATA.siteUrl}/#monastery`,
      },
      about: [
        "Shentong",
        "Madhyamaka",
        "Tathāgatagarbha",
        "Dölpopa Sherab Gyaltsen",
        "Rangtong vs Shentong",
      ],
      url: `${SITE_METADATA.siteUrl}/doctrine`,
    };
  }

  if (clean === "kalachakra") {
    return {
      "@type": "ScholarlyArticle",
      "@id": `${SITE_METADATA.siteUrl}/kalachakra#article`,
      headline: "The Kālacakra Six-fold Vajrayoga in the Jonang Dro Transmission",
      description:
        "Doctrinal and contemplative manual of the Dro lineage completion stage: dark retreat three isolations and the Six-fold Vajrayoga (Sbyor drug).",
      author: {
        "@id": `${SITE_METADATA.siteUrl}/#monastery`,
      },
      publisher: {
        "@id": `${SITE_METADATA.siteUrl}/#monastery`,
      },
      about: [
        "Kālacakra Tantra",
        "Six-fold Vajrayoga",
        "Dro Lineage",
        "Three Isolations (Mun khang)",
        "Sahajakāya",
      ],
      url: `${SITE_METADATA.siteUrl}/kalachakra`,
    };
  }

  if (clean === "curriculum") {
    return {
      "@type": "EducationalOccupationalProgram",
      "@id": `${SITE_METADATA.siteUrl}/curriculum#program`,
      name: "18-Year Jonang Monastic Curriculum & Dzamthang Shedra",
      description:
        "Rigorous 18-year progressive monastic degree syllabus spanning Tibetan grammar, Buddhist epistemology (Pramāṇa), the Five Great Treatises, and solitary Kālacakra retreat.",
      provider: {
        "@id": `${SITE_METADATA.siteUrl}/#monastery`,
      },
      educationalProgramMode: "Full-time monastic residency",
      timeToComplete: "P18Y",
      url: `${SITE_METADATA.siteUrl}/curriculum`,
    };
  }

  if (clean === "teachers") {
    return {
      "@type": "ItemList",
      "@id": `${SITE_METADATA.siteUrl}/teachers#masters`,
      name: "Holders of the Jonang Lineage",
      description:
        "Historic and contemporary masters, abbots, and Vajra holders of the unbroken Jonang Dro transmission.",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Person",
            name: "Dölpopa Sherab Gyaltsen",
            alternateName: "དོལ་པོ་པ་ཤེས་རབ་རྒྱལ་མཚན།",
            birthDate: "1292",
            deathDate: "1361",
            description: "The Omniscient Buddha from Dölpo, formulator of Shentong Madhyamaka.",
            sameAs: "https://en.wikipedia.org/wiki/Dolpopa_Sherab_Gyaltsen",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Person",
            name: "Jetsun Tāranātha",
            alternateName: "རྗེ་བཙུན་ཏཱ་ར་ནཱ་ཐ།",
            birthDate: "1575",
            deathDate: "1635",
            description: "Paramount Jonang historian, scholar, and master of Kālacakra Tantra.",
            sameAs: "https://en.wikipedia.org/wiki/Taranatha",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Person",
            name: "H.H. 9th Khalkha Jetsun Dampa",
            alternateName: "འཇམ་དཔལ་རྣམ་གྲོལ་ཆོས་ཀྱི་རྒྱལ་མཚན།",
            birthDate: "1933",
            deathDate: "2012",
            description:
              "Appointed head of the Jonang tradition in exile by H.H. the 14th Dalai Lama.",
            sameAs: "https://en.wikipedia.org/wiki/Jampel_Namdrol_Ch%C3%B6kyi_Gyaltsen",
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "Person",
            name: "Khenpo Choekyi Nangpa Rinpoche",
            alternateName: "མཁན་པོ་ཆོས་ཀྱི་སྣང་བ།",
            description: "Vajra Master (Dorje Lopön) and 2nd Jonang Gyaltsab (Regent).",
          },
        },
        {
          "@type": "ListItem",
          position: 5,
          item: {
            "@type": "Person",
            name: "Khenpo Kunga Choephel Rinpoche",
            alternateName: "མཁན་པོ་ཀུན་དགའ་ཆོས་འཕེལ།",
            description: "Fourth and incumbent abbot of Main Jonang Takten Phuntsok Choeling.",
          },
        },
      ],
    };
  }

  if (clean === "introduction") {
    return {
      "@type": "FAQPage",
      "@id": `${SITE_METADATA.siteUrl}/introduction#faq`,
      name: "Frequently Asked Questions About the Jonang Tradition",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the Jonang tradition of Tibetan Buddhism?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jonang is one of the distinct historical schools of Tibetan Buddhism, formally recognized as the fifth tradition alongside Nyingma, Kagyu, Sakya, and Gelug. Founded in the 13th century by Kunpang Thukje Tsöndrü, Jonang is renowned as the primary custodian of the Shentong Madhyamaka philosophical view and the completion-stage Six-fold Vajrayoga of the Kālacakra Tantra.",
          },
        },
        {
          "@type": "Question",
          name: "What is Shentong (Other-Emptiness)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Shentong (Other-Emptiness) is a Great Madhyamaka view championed by the 14th-century Jonang master Dölpopa Sherab Gyaltsen. It asserts that conventional phenomena are empty of self-nature (rangtong), while ultimate reality—the unconditioned luminous awareness and Buddha-nature (Tathāgatagarbha)—is permanent, replete with enlightened qualities, and empty only of adventitious obscurations (āgantukamala).",
          },
        },
        {
          "@type": "Question",
          name: "How does the Jonang Kālacakra transmission differ from other Tibetan schools?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "While other Tibetan schools preserved primarily the ritual and explanatory branches of the Ra lineage (rwa lugs), Jonang became the supreme guardian of the contemplative Dro lineage ('bro lugs). Jonang monks undergo intensive solitary three-year retreats practicing the completion-stage Six-fold Vajrayoga (Sbyor drug) in total darkness (mun khang).",
          },
        },
        {
          "@type": "Question",
          name: "Where is the main Jonang monastery in exile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The primary seat of the Jonang tradition in exile is Main Jonang Takten Phuntsok Choeling, located on the pine-covered ridge of Sanjauli in Shimla, Himachal Pradesh 171006, India.",
          },
        },
      ],
    };
  }

  return null;
}
