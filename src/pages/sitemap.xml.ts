import type { APIRoute } from "astro";
import { STATIC_PAGE_PATHS } from "../data/staticPages";

const SITE_URL = import.meta.env.SITE ?? "https://jonang.in";

interface SitemapEntry {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: string;
  lastmod: string;
  images?: Array<{
    loc: string;
    title: string;
    caption?: string;
  }>;
}

const entries: SitemapEntry[] = [
  {
    path: "/",
    changefreq: "weekly",
    priority: "1.0",
    lastmod: "2026-09-10",
    images: [
      {
        loc: `${SITE_URL}/logo512x512.jpg`,
        title: "Main Jonang Takten Phuntsok Choeling Monastery Seal",
      },
    ],
  },
  {
    path: STATIC_PAGE_PATHS.monastery,
    changefreq: "monthly",
    priority: "0.9",
    lastmod: "2026-09-10",
  },
  {
    path: STATIC_PAGE_PATHS.introduction,
    changefreq: "monthly",
    priority: "0.9",
    lastmod: "2026-09-10",
  },
  {
    path: STATIC_PAGE_PATHS.doctrine,
    changefreq: "monthly",
    priority: "0.95",
    lastmod: "2026-09-10",
  },
  {
    path: STATIC_PAGE_PATHS.kalachakra,
    changefreq: "monthly",
    priority: "0.95",
    lastmod: "2026-09-10",
  },
  {
    path: STATIC_PAGE_PATHS.curriculum,
    changefreq: "monthly",
    priority: "0.85",
    lastmod: "2026-09-10",
  },
  {
    path: STATIC_PAGE_PATHS.teachers,
    changefreq: "monthly",
    priority: "0.85",
    lastmod: "2026-09-10",
  },
  {
    path: STATIC_PAGE_PATHS.livingTradition,
    changefreq: "monthly",
    priority: "0.85",
    lastmod: "2026-09-10",
  },
  {
    path: STATIC_PAGE_PATHS.glossary,
    changefreq: "monthly",
    priority: "0.9",
    lastmod: "2026-09-10",
  },
  {
    path: STATIC_PAGE_PATHS.gallery,
    changefreq: "monthly",
    priority: "0.8",
    lastmod: "2026-09-10",
  },
  {
    path: STATIC_PAGE_PATHS.donate,
    changefreq: "monthly",
    priority: "0.75",
    lastmod: "2026-09-10",
  },
  {
    path: STATIC_PAGE_PATHS.sitemap,
    changefreq: "monthly",
    priority: "0.5",
    lastmod: "2026-09-10",
  },
];

function toUrl(path: string) {
  if (path === "/") return `${SITE_URL}/`;
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${SITE_URL}/${clean}`;
}

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries
  .map((entry) => {
    const imgTags = entry.images
      ? entry.images
          .map(
            (img) => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
    </image:image>`
          )
          .join("\n")
      : "";

    return `  <url>
    <loc>${toUrl(entry.path)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${imgTags ? `\n${imgTags}` : ""}
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
