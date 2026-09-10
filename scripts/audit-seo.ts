import fs from "fs";
import path from "path";

console.log("==================================================");
console.log("  JONANG ASTRO — SYSTEMATIC SEO & METADATA AUDIT  ");
console.log("==================================================\n");

const DIST_DIR = path.resolve("dist");
const PUBLIC_DIR = path.resolve("public");

let failureCount = 0;
let warningCount = 0;

function fail(msg: string) {
  console.error(`  ❌ [ERROR] ${msg}`);
  failureCount++;
}

function warn(msg: string) {
  console.warn(`  ⚠️  [WARN]  ${msg}`);
  warningCount++;
}

function pass(msg: string) {
  console.log(`  ✓ ${msg}`);
}

// 1. Audit public/robots.txt
console.log("1. Auditing robots.txt...");
const robotsPath = path.join(PUBLIC_DIR, "robots.txt");
if (!fs.existsSync(robotsPath)) {
  fail("public/robots.txt does not exist!");
} else {
  const robotsContent = fs.readFileSync(robotsPath, "utf-8");
  if (!robotsContent.includes("User-agent:")) fail("robots.txt missing User-agent directive");
  if (!robotsContent.includes("Sitemap: https://jonang.in/sitemap.xml"))
    fail("robots.txt missing Sitemap directive pointing to https://jonang.in/sitemap.xml");
  if (!robotsContent.includes("Host: https://jonang.in")) warn("robots.txt missing Host directive");
  pass("public/robots.txt is valid and points to canonical sitemap.");
}

// 2. Audit dist/sitemap.xml
console.log("\n2. Auditing dist/sitemap.xml...");
const sitemapPath = path.join(DIST_DIR, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) {
  fail("dist/sitemap.xml does not exist! (Did you run 'pnpm run build'?)");
} else {
  const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
  const expectedPaths = [
    "https://jonang.in/",
    "https://jonang.in/monastery",
    "https://jonang.in/introduction",
    "https://jonang.in/doctrine",
    "https://jonang.in/kalachakra",
    "https://jonang.in/curriculum",
    "https://jonang.in/teachers",
    "https://jonang.in/living-tradition",
    "https://jonang.in/glossary",
    "https://jonang.in/gallery",
    "https://jonang.in/donate",
    "https://jonang.in/sitemap",
  ];

  for (const exp of expectedPaths) {
    if (!sitemapContent.includes(`<loc>${exp}</loc>`)) {
      fail(`sitemap.xml is missing expected URL: ${exp}`);
    }
  }

  if (!sitemapContent.includes("xmlns:image=")) {
    fail("sitemap.xml missing Google Image XML namespace");
  }
  if (!sitemapContent.includes("<image:image>")) {
    warn("sitemap.xml does not include any <image:image> extensions");
  }

  pass(`sitemap.xml verified with all ${expectedPaths.length} canonical routes.`);
}

// 3. Page-by-page HTML metadata, heading, and JSON-LD audit
console.log("\n3. Auditing HTML files in dist/ for on-page SEO...");

interface PageCheck {
  relPath: string;
  expectedCanonical: string;
  expectedH1Contains?: string;
  requireBreadcrumbs?: boolean;
}

const PAGES_TO_CHECK: PageCheck[] = [
  { relPath: "index.html", expectedCanonical: "https://jonang.in/", requireBreadcrumbs: false },
  {
    relPath: "monastery/index.html",
    expectedCanonical: "https://jonang.in/monastery",
    expectedH1Contains: "Monastery",
    requireBreadcrumbs: true,
  },
  {
    relPath: "doctrine/index.html",
    expectedCanonical: "https://jonang.in/doctrine",
    expectedH1Contains: "Doctrine",
    requireBreadcrumbs: true,
  },
  {
    relPath: "kalachakra/index.html",
    expectedCanonical: "https://jonang.in/kalachakra",
    expectedH1Contains: "Kālacakra",
    requireBreadcrumbs: true,
  },
  {
    relPath: "curriculum/index.html",
    expectedCanonical: "https://jonang.in/curriculum",
    expectedH1Contains: "Curriculum",
    requireBreadcrumbs: true,
  },
  {
    relPath: "teachers/index.html",
    expectedCanonical: "https://jonang.in/teachers",
    expectedH1Contains: "Lineage",
    requireBreadcrumbs: true,
  },
  {
    relPath: "living-tradition/index.html",
    expectedCanonical: "https://jonang.in/living-tradition",
    expectedH1Contains: "Tradition",
    requireBreadcrumbs: true,
  },
  {
    relPath: "introduction/index.html",
    expectedCanonical: "https://jonang.in/introduction",
    expectedH1Contains: "Introduction",
    requireBreadcrumbs: true,
  },
  {
    relPath: "glossary/index.html",
    expectedCanonical: "https://jonang.in/glossary",
    requireBreadcrumbs: true,
  },
  {
    relPath: "gallery/index.html",
    expectedCanonical: "https://jonang.in/gallery",
    requireBreadcrumbs: true,
  },
  {
    relPath: "donate/index.html",
    expectedCanonical: "https://jonang.in/donate",
    requireBreadcrumbs: true,
  },
  {
    relPath: "sitemap/index.html",
    expectedCanonical: "https://jonang.in/sitemap",
    requireBreadcrumbs: true,
  },
];

const seenTitles = new Map<string, string>();
const seenDescriptions = new Map<string, string>();

for (const page of PAGES_TO_CHECK) {
  const filePath = path.join(DIST_DIR, page.relPath);
  if (!fs.existsSync(filePath)) {
    fail(`Built file missing: ${page.relPath}`);
    continue;
  }

  const html = fs.readFileSync(filePath, "utf-8");

  // Title check
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    fail(`${page.relPath}: Missing or empty <title> tag`);
  } else {
    const title = titleMatch[1].trim();
    if (title.length < 25 || title.length > 85) {
      warn(`${page.relPath}: <title> length (${title.length}) outside 25-85 range: "${title}"`);
    }
    if (seenTitles.has(title)) {
      fail(`${page.relPath}: Duplicate <title> identical to ${seenTitles.get(title)}`);
    } else {
      seenTitles.set(title, page.relPath);
    }
  }

  // Meta description check
  const descMatch =
    html.match(/<meta\s+name=["']description["']\s+content="([^"]+)"/i) ||
    html.match(/<meta\s+name=["']description["']\s+content='([^']+)'/i);
  if (!descMatch || !descMatch[1].trim()) {
    fail(`${page.relPath}: Missing or empty <meta name="description">`);
  } else {
    const desc = descMatch[1].trim();
    if (desc.length < 90 || desc.length > 200) {
      warn(`${page.relPath}: Description length (${desc.length}) outside 90-200 range: "${desc}"`);
    }
    if (seenDescriptions.has(desc)) {
      fail(`${page.relPath}: Duplicate description identical to ${seenDescriptions.get(desc)}`);
    } else {
      seenDescriptions.set(desc, page.relPath);
    }
  }

  // Canonical tag check
  const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonMatch) {
    fail(`${page.relPath}: Missing <link rel="canonical">`);
  } else {
    const canonUrl = canonMatch[1].trim();
    if (canonUrl !== page.expectedCanonical) {
      fail(
        `${page.relPath}: Canonical mismatch. Got "${canonUrl}", expected "${page.expectedCanonical}"`
      );
    }
  }

  // Open Graph & Twitter checks
  if (!html.includes('property="og:title"')) fail(`${page.relPath}: Missing og:title`);
  if (!html.includes('property="og:description"')) fail(`${page.relPath}: Missing og:description`);
  if (!html.includes('property="og:image"')) fail(`${page.relPath}: Missing og:image`);
  if (!html.includes('property="og:url"')) fail(`${page.relPath}: Missing og:url`);
  if (!html.includes('name="twitter:card"')) fail(`${page.relPath}: Missing twitter:card`);

  // H1 check
  const h1Matches = Array.from(html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi));
  if (h1Matches.length === 0) {
    fail(`${page.relPath}: Missing <h1> tag`);
  } else if (h1Matches.length > 1) {
    warn(`${page.relPath}: Has ${h1Matches.length} <h1> tags (recommended: exactly 1)`);
  } else {
    const h1Content = h1Matches[0][1].replace(/<[^>]+>/g, "").trim();
    if (!h1Content) {
      fail(`${page.relPath}: <h1> tag is empty`);
    } else if (page.expectedH1Contains && !h1Content.includes(page.expectedH1Contains)) {
      warn(
        `${page.relPath}: <h1> ("${h1Content}") does not contain expected keyword "${page.expectedH1Contains}"`
      );
    }
  }

  // Schema.org JSON-LD check
  const jsonLdMatch = html.match(
    /<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
  );
  if (!jsonLdMatch) {
    fail(`${page.relPath}: Missing Schema.org JSON-LD block`);
  } else {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      if (parsed["@context"] !== "https://schema.org") {
        fail(`${page.relPath}: JSON-LD @context is not "https://schema.org"`);
      }
      if (!parsed["@graph"] || !Array.isArray(parsed["@graph"])) {
        fail(`${page.relPath}: JSON-LD does not contain a valid @graph array`);
      } else {
        const types = parsed["@graph"].flatMap((item: Record<string, unknown>) =>
          Array.isArray(item["@type"]) ? item["@type"] : [item["@type"]]
        );
        if (!types.includes("WebSite")) fail(`${page.relPath}: Schema @graph missing WebSite`);
        if (!types.includes("BuddhistTemple"))
          fail(`${page.relPath}: Schema @graph missing BuddhistTemple`);
        if (page.requireBreadcrumbs && !types.includes("BreadcrumbList")) {
          warn(`${page.relPath}: Schema @graph missing BreadcrumbList`);
        }
      }
    } catch (e: unknown) {
      const err = e instanceof Error ? e.message : String(e);
      fail(`${page.relPath}: Failed to parse JSON-LD: ${err}`);
    }
  }

  pass(`${page.relPath}: Passed all on-page metadata, canonical, H1, and Schema.org checks.`);
}

console.log("\n==================================================");
console.log(`AUDIT COMPLETE: ${failureCount} error(s), ${warningCount} warning(s).`);
console.log("==================================================");

if (failureCount > 0) {
  process.exit(1);
} else {
  console.log("🎉 All SEO invariants successfully verified!\n");
  process.exit(0);
}
