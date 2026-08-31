import type { APIRoute } from "astro";
import { STATIC_PAGE_PATHS } from "../data/staticPages";

const SITE_URL = import.meta.env.SITE ?? "https://jonang.in";

const paths = [
  "/",
  STATIC_PAGE_PATHS.aboutUs,
  STATIC_PAGE_PATHS.jonangDoctrine,
  STATIC_PAGE_PATHS.jonangBeginners,
  STATIC_PAGE_PATHS.kalachakra,
  STATIC_PAGE_PATHS.curriculum,
  STATIC_PAGE_PATHS.gallery,
  "/teachers",
  "/donate",
  "/sitemap",
];

const lastmod = new Date().toISOString();

function toUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${toUrl(path)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
