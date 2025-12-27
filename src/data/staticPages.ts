export const STATIC_PAGE_PATHS = {
  aboutUs: "/about-us",
  jonangDoctrine: "/jonang-doctrine",
  jonangBeginners: "/jonang-doctrine/beginners-introduction",
  kalachakra: "/kalachakra",
  curriculum: "/curriculum",
  gallery: "/gallery",
} as const;

export const STATIC_PAGE_BY_SLUG: Record<string, string> = {
  "about-us": STATIC_PAGE_PATHS.aboutUs,
  "jonang-doctrine": STATIC_PAGE_PATHS.jonangDoctrine,
  "jonang-doctrine/beginners-introduction": STATIC_PAGE_PATHS.jonangBeginners,
  kalachakra: STATIC_PAGE_PATHS.kalachakra,
  curriculum: STATIC_PAGE_PATHS.curriculum,
  gallery: STATIC_PAGE_PATHS.gallery,
  "photo-gallery": STATIC_PAGE_PATHS.gallery,
  photogallery: STATIC_PAGE_PATHS.gallery,
  "photo_gallery": STATIC_PAGE_PATHS.gallery,
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
