# Content Enrichment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Curate and restructure the site's editorial content using `../jonang-payload/content.md`, enriching the Astro site with stronger page narratives, denser but readable longform sections, and content-linked visual presentation.

**Architecture:** Keep existing route structure for the major public pages, replace the hardcoded longform content with curated editorial sections, and upgrade the homepage to act as a clearer narrative gateway. Retain CMS-backed dynamic areas where they still fit the product, but treat doctrine/history/curriculum copy as code-first editorial content.

**Tech Stack:** Astro, Tailwind CSS v4, CMS-backed fetches for selected sections, hardcoded Astro page components for editorial content.

---

### Task 1: Audit current editorial entry points

**Files:**
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/pages/index.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/pages/about-us/index.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/pages/jonang-doctrine/index.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/pages/kalachakra/index.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/pages/curriculum/index.astro`

**Step 1: Identify which routes remain route-stable**

Confirm that the rewrite will target the existing high-value routes and not add unnecessary new pages.

**Step 2: Define page roles**

Document, in code comments or implementation notes, the intended role of each page:

- `index`: gateway and narrative overview
- `about-us`: Shimla monastery and living institution
- `jonang-doctrine`: history, philosophy, survival, revival
- `kalachakra`: practice and transmission
- `curriculum`: study path and training structure

**Step 3: Commit**

```bash
git add /Users/norov/workspace/projects/jonang-astro/docs/plans/2026-04-08-content-enrichment-design.md /Users/norov/workspace/projects/jonang-astro/docs/plans/2026-04-08-content-enrichment.md
git commit -m "docs: plan Jonang content enrichment"
```

### Task 2: Rebuild the homepage as a content gateway

**Files:**
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/pages/index.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/layouts/HeroSection.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/layouts/WelcomeSection.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/layouts/ProminenceSection.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/layouts/NavigationSection.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/components/SiteTitle.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/base.css`

**Step 1: Replace generic intro flow with narrative sequence**

Make the homepage communicate:

- what Jonang is
- why it matters
- how the lineage survived
- why Kalachakra matters
- where to go next

**Step 2: Add home page section patterns**

Introduce or adapt section wrappers for:

- core pillars
- historical survival
- sacred geography / global revival
- visit / support transitions

**Step 3: Keep CMS-backed data only where it still adds value**

Retain dynamic items like teachers, quotes, or donations where they contribute freshness. Remove or subordinate generic filler sections.

**Step 4: Verify in local dev**

Run:

```bash
ASTRO_TELEMETRY_DISABLED=1 pnpm astro check
```

Expected: PASS with zero diagnostics.

**Step 5: Commit**

```bash
git add /Users/norov/workspace/projects/jonang-astro/src/pages/index.astro /Users/norov/workspace/projects/jonang-astro/src/layouts/HeroSection.astro /Users/norov/workspace/projects/jonang-astro/src/layouts/WelcomeSection.astro /Users/norov/workspace/projects/jonang-astro/src/layouts/ProminenceSection.astro /Users/norov/workspace/projects/jonang-astro/src/layouts/NavigationSection.astro /Users/norov/workspace/projects/jonang-astro/src/components/SiteTitle.astro /Users/norov/workspace/projects/jonang-astro/base.css
git commit -m "feat: turn homepage into Jonang content gateway"
```

### Task 3: Rewrite the monastery page around living institutional identity

**Files:**
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/components/pages/AboutUsContent.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/pages/about-us/index.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/components/RichTextSection.astro`

**Step 1: Curate the source material into page sections**

Restructure the page around:

- founding and naming
- lineage continuity and abbots
- student body and geography
- curriculum and formation
- the monastery today

**Step 2: Break up longform blocks**

Use headings, callouts, lists, and side-panels instead of continuous paragraphs.

**Step 3: Add visual rhythm**

Use content-aware wrappers and layout shifts so this page reads like an editorial page rather than a generic article shell.

**Step 4: Verify in local dev**

Load `/about-us` and confirm heading hierarchy, spacing, and readability.

**Step 5: Commit**

```bash
git add /Users/norov/workspace/projects/jonang-astro/src/components/pages/AboutUsContent.astro /Users/norov/workspace/projects/jonang-astro/src/pages/about-us/index.astro /Users/norov/workspace/projects/jonang-astro/src/components/RichTextSection.astro
git commit -m "feat: enrich monastery page with curated editorial content"
```

### Task 4: Turn the Jonang doctrine page into the intellectual overview

**Files:**
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/components/pages/JonangDoctrineContent.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/pages/jonang-doctrine/index.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/base.css`

**Step 1: Rebuild the narrative**

Cover:

- genesis and early transmission
- Dolpopa and Taranatha
- Zhentong and its Buddhist context
- suppression and eastern survival
- Mongolia and modern recognition

**Step 2: Add doctrine-friendly UI patterns**

Create reusable visual patterns for:

- timeline/history panels
- doctrine comparison/callout blocks
- “why this matters” summary panels

**Step 3: Keep conceptual explanations accessible**

Lead each major section with a plain-language explanation before deeper historical detail.

**Step 4: Verify in local dev**

Run:

```bash
ASTRO_TELEMETRY_DISABLED=1 pnpm astro check
```

Expected: PASS.

**Step 5: Commit**

```bash
git add /Users/norov/workspace/projects/jonang-astro/src/components/pages/JonangDoctrineContent.astro /Users/norov/workspace/projects/jonang-astro/src/pages/jonang-doctrine/index.astro /Users/norov/workspace/projects/jonang-astro/base.css
git commit -m "feat: rebuild Jonang doctrine page as editorial overview"
```

### Task 5: Reframe Kalachakra practice around transmission and experience

**Files:**
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/components/pages/KalachakraCurriculumContent.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/pages/kalachakra/index.astro`

**Step 1: Structure the page around practical meaning**

Explain:

- what Kalachakra is
- why Jonang is identified with it
- what distinguishes completion-stage emphasis
- what the six vajra yogas are in reader-friendly terms
- how it relates to subtle body, medicine, and cosmology

**Step 2: Avoid overexposure of technical jargon**

Use short explanations, then deeper sub-sections for committed readers.

**Step 3: Add section-level visual anchors**

Use cards, steps, or numbered practice phases to reduce density.

**Step 4: Verify in local dev**

Load `/kalachakra` and inspect mobile and desktop readability.

**Step 5: Commit**

```bash
git add /Users/norov/workspace/projects/jonang-astro/src/components/pages/KalachakraCurriculumContent.astro /Users/norov/workspace/projects/jonang-astro/src/pages/kalachakra/index.astro
git commit -m "feat: enrich Kalachakra practice page"
```

### Task 6: Rework curriculum into a clearer training path

**Files:**
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/components/pages/MonasteryCurriculumContent.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/pages/curriculum/index.astro`

**Step 1: Organize by learner journey**

Split content into:

- scholastic path
- mantra and ritual formation
- retreat and experiential training
- modern/secular subjects
- intended outcome of study

**Step 2: Replace generic prose with structured blocks**

Use lists, columns, and milestone sections to clarify the eighteen-year path.

**Step 3: Verify in local dev**

Load `/curriculum` and inspect spacing and text rhythm.

**Step 4: Commit**

```bash
git add /Users/norov/workspace/projects/jonang-astro/src/components/pages/MonasteryCurriculumContent.astro /Users/norov/workspace/projects/jonang-astro/src/pages/curriculum/index.astro
git commit -m "feat: restructure curriculum page around study journey"
```

### Task 7: Add resource depth and supporting content where useful

**Files:**
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/components/pages/BeginnerIntroductionContent.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/pages/jonang-doctrine/beginners-introduction/index.astro`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/pages/sitemap/index.astro`

**Step 1: Use supporting pages to absorb overflow**

If key content from `content.md` does not fit comfortably on the main doctrine pages, move the most introductory or resource-oriented material into supporting pages.

**Step 2: Add reading / orientation blocks**

Use the beginner page to direct readers into:

- monastery overview
- doctrine overview
- Kalachakra page
- teachers and visit/support pages

**Step 3: Keep the site map and navigation coherent**

Ensure the structure remains legible after the content rewrite.

**Step 4: Commit**

```bash
git add /Users/norov/workspace/projects/jonang-astro/src/components/pages/BeginnerIntroductionContent.astro /Users/norov/workspace/projects/jonang-astro/src/pages/jonang-doctrine/beginners-introduction/index.astro /Users/norov/workspace/projects/jonang-astro/src/pages/sitemap/index.astro
git commit -m "feat: deepen supporting editorial pages"
```

### Task 8: Final verification and cleanup

**Files:**
- Modify: `/Users/norov/workspace/projects/jonang-astro/base.css`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/components/*`
- Modify: `/Users/norov/workspace/projects/jonang-astro/src/pages/*`

**Step 1: Run type and Astro validation**

Run:

```bash
ASTRO_TELEMETRY_DISABLED=1 pnpm astro check
```

Expected: PASS with zero errors.

**Step 2: Smoke-test representative routes**

Check:

- `/`
- `/about-us`
- `/jonang-doctrine`
- `/kalachakra`
- `/curriculum`

Expected: Pages load and present readable hierarchy without overflow.

**Step 3: Fix any regressions**

Only make targeted cleanups required by the rewritten content.

**Step 4: Final commit**

```bash
git add /Users/norov/workspace/projects/jonang-astro
git commit -m "feat: enrich Jonang site content and editorial structure"
```
