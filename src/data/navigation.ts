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
  {
    label: "The Monastery",
    shortLabel: "Monastery",
    href: STATIC_PAGE_PATHS.aboutUs,
  },
  {
    label: "The Jonang Tradition",
    shortLabel: "Tradition",
    href: STATIC_PAGE_PATHS.jonangDoctrine,
    sublinks: [
      {
        label: "Overview & Philosophy",
        href: STATIC_PAGE_PATHS.jonangDoctrine,
      },
      {
        label: "Beginner's Introduction",
        href: STATIC_PAGE_PATHS.jonangBeginners,
      },
    ],
  },
  {
    label: "Kalachakra Practice",
    shortLabel: "Kalachakra",
    href: STATIC_PAGE_PATHS.kalachakra,
  },
  {
    label: "Curriculum",
    href: STATIC_PAGE_PATHS.curriculum,
  },
  {
    label: "Teachers",
    href: STATIC_PAGE_PATHS.teachers,
  },
  {
    label: "Photo Gallery",
    shortLabel: "Gallery",
    href: STATIC_PAGE_PATHS.gallery,
  },
];

export const FOOTER_NAVIGATION = [
  {
    heading: "Read the tradition",
    links: [
      { label: "Home", href: "/" },
      { label: "The Monastery", href: STATIC_PAGE_PATHS.aboutUs },
      { label: "The Jonang Tradition", href: STATIC_PAGE_PATHS.jonangDoctrine },
      { label: "Beginner's Introduction", href: STATIC_PAGE_PATHS.jonangBeginners },
      { label: "Kalachakra Practice", href: STATIC_PAGE_PATHS.kalachakra },
      { label: "Curriculum", href: STATIC_PAGE_PATHS.curriculum },
    ],
  },
  {
    heading: "Community and support",
    links: [
      { label: "Teachers", href: STATIC_PAGE_PATHS.teachers },
      { label: "Photo Gallery", href: STATIC_PAGE_PATHS.gallery },
      { label: "Donate", href: STATIC_PAGE_PATHS.donate },
      { label: "Sitemap", href: STATIC_PAGE_PATHS.sitemap },
    ],
  },
] as const;
