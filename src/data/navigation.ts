import { STATIC_PAGE_PATHS } from "./staticPages";

export type SiteLink = {
  label: string;
  href: string;
  shortLabel?: string;
};

export type NavLink = SiteLink & {
  sublinks?: SiteLink[];
};

export const PRIMARY_NAVIGATION: NavLink[] = [
  { label: "Start here", href: STATIC_PAGE_PATHS.introduction },
  {
    label: "The monastery",
    shortLabel: "Monastery",
    href: STATIC_PAGE_PATHS.monastery,
    sublinks: [
      { label: "About the monastery", href: STATIC_PAGE_PATHS.monastery },
      { label: "Daily life", href: STATIC_PAGE_PATHS.livingTradition },
    ],
  },
  {
    label: "Explore the teachings",
    shortLabel: "Teachings",
    href: STATIC_PAGE_PATHS.doctrine,
    sublinks: [
      { label: "Shentong philosophy", href: STATIC_PAGE_PATHS.doctrine },
      { label: "Kālacakra practice", href: STATIC_PAGE_PATHS.kalachakra },
      { label: "Monastic education", href: STATIC_PAGE_PATHS.curriculum },
      { label: "Glossary", href: STATIC_PAGE_PATHS.glossary },
    ],
  },
  { label: "Teachers", href: STATIC_PAGE_PATHS.teachers },
  { label: "Photo gallery", shortLabel: "Gallery", href: STATIC_PAGE_PATHS.gallery },
  { label: "Contact", href: "/#contact" },
];

export const FOOTER_NAVIGATION = [
  {
    heading: "Read the tradition",
    links: [
      { label: "Home", href: "/" },
      { label: "Beginner's Guide", href: STATIC_PAGE_PATHS.introduction },
      { label: "The Monastery", href: STATIC_PAGE_PATHS.monastery },
      { label: "Living Tradition", href: STATIC_PAGE_PATHS.livingTradition },
      { label: "The Jonang Doctrine", href: STATIC_PAGE_PATHS.doctrine },
      { label: "Glossary", href: STATIC_PAGE_PATHS.glossary },
      { label: "Kalachakra Practice", href: STATIC_PAGE_PATHS.kalachakra },
      { label: "Curriculum", href: STATIC_PAGE_PATHS.curriculum },
    ],
  },
  {
    heading: "Community and support",
    links: [
      { label: "Teachers", href: STATIC_PAGE_PATHS.teachers },
      { label: "Photo Gallery", href: STATIC_PAGE_PATHS.gallery },
      { label: "Website readership", href: STATIC_PAGE_PATHS.intelligence },
      { label: "Donate", href: STATIC_PAGE_PATHS.donate },
      { label: "Sitemap", href: STATIC_PAGE_PATHS.sitemap },
    ],
  },
] as const;
