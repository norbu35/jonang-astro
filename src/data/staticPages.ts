export const STATIC_PAGE_PATHS = {
  monastery: "/monastery",
  aboutUs: "/monastery",
  doctrine: "/doctrine",
  jonangDoctrine: "/doctrine",
  kalachakra: "/kalachakra",
  curriculum: "/curriculum",
  teachers: "/teachers",
  gallery: "/gallery",
  donate: "/donate",
  sitemap: "/sitemap",
} as const;

export const STATIC_PAGE_BY_SLUG: Record<string, string> = {
  monastery: STATIC_PAGE_PATHS.monastery,
  "the-monastery": STATIC_PAGE_PATHS.monastery,
  "about-us": STATIC_PAGE_PATHS.monastery,
  about: STATIC_PAGE_PATHS.monastery,
  doctrine: STATIC_PAGE_PATHS.doctrine,
  "the-doctrine": STATIC_PAGE_PATHS.doctrine,
  teachings: STATIC_PAGE_PATHS.doctrine,
  "jonang-doctrine": STATIC_PAGE_PATHS.doctrine,
  "doctrine/beginners-introduction": STATIC_PAGE_PATHS.doctrine,
  "jonang-doctrine/beginners-introduction": STATIC_PAGE_PATHS.doctrine,
  "beginners-introduction": STATIC_PAGE_PATHS.doctrine,
  kalachakra: STATIC_PAGE_PATHS.kalachakra,
  curriculum: STATIC_PAGE_PATHS.curriculum,
  teachers: STATIC_PAGE_PATHS.teachers,
  gallery: STATIC_PAGE_PATHS.gallery,
  "photo-gallery": STATIC_PAGE_PATHS.gallery,
  photogallery: STATIC_PAGE_PATHS.gallery,
  "photo_gallery": STATIC_PAGE_PATHS.gallery,
  donate: STATIC_PAGE_PATHS.donate,
  sitemap: STATIC_PAGE_PATHS.sitemap,
};

export const STATIC_PAGE_SLUGS = new Set(Object.keys(STATIC_PAGE_BY_SLUG));

export function resolveStaticPageHref(slug?: string | null): string | null {
  if (!slug) return null;
  return STATIC_PAGE_BY_SLUG[slug] ?? null;
}

export function normalizeGalleryHref(href: string): string {
  const trimmed = href.trim();
  if (!trimmed) return trimmed;
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;
  const normalized = trimmed.replace(/^\/+/, "").replace(/\/+$/, "").toLowerCase();
  return STATIC_PAGE_BY_SLUG[normalized] ?? trimmed;
}
