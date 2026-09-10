# Jonang Astro — Project Architecture & Design System Guidelines

This document establishes the canonical design system tokens, typography rules, layout contracts, and agent development guidelines for the **Jonang Takten Phuntsok Choeling** web platform.

---

## 1. Tech Stack

- **Framework:** Astro 5.x (SSG / Static Output) + Preact for interactive hydration
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) + `base.css` design tokens
- **Icons & Assets:** Optimized SVGs in `src/components/icons/` and WebP imagery in `src/assets/images/`

---

## 2. Canonical Typography System

The project strictly decouples Latin typography from multi-tier Tibetan typography:

| Font Token                    | Typeface Stack                              | Intended Usage                                                                                                        |
| :---------------------------- | :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| `font-display` / `font-serif` | `Cormorant Garamond`, `Georgia`, `serif`    | English section titles, chapter headings, and quotes.                                                                 |
| `font-sans` / `font-body`     | `Plus Jakarta Sans`, `Outfit`, `sans-serif` | English UI labels, button text, and body copy.                                                                        |
| `font-mono`                   | `JetBrains Mono`, `monospace`               | Kicker tags, chapter numbers, timestamps, dates.                                                                      |
| `font-tibetan`                | `Noto Serif Tibetan`, `serif`               | **Default Tibetan:** UI labels, cards, master names, navigation, and bilingual subtitles (`line-height: 1.6`).        |
| `font-tibetan-scholarly`      | `Jomolhari`, `Noto Serif Tibetan`, `serif`  | **Classical Scripture:** Root verses (_rtsa ba_), philosophical treatises, and pecha citations (`line-height: 1.85`). |
| `font-tibetan-display`        | `Monlam Uni Ouchan3`, `serif`               | **Display Titles:** Hero banners and ornamental headline calligraphy (`line-height: 1.5`).                            |

---

## 3. Color Tokens & Theme Hierarchy

- **Sangha Crimson (Primary Accent):** `var(--accent)` (`#992224`)
- **Sacred Gold / Saffron (Secondary Accent):** `var(--accent-secondary)` / `var(--gold)` (`#fdbc2d` / `#c67f1b`)
- **Monastic Maroon (Surfaces & Dark Accents):** `var(--maroon)` (`#500c0e`), `var(--maroon-dark)` (`#3b0809`)
- **Mineral Lapis (Tertiary Accent):** `var(--accent-tertiary)` (`#244b6e`)
- **Surface Backgrounds:** `var(--surface)` (`#faf6f4`), `var(--surface-subtle)` (`#f4eae6`)
- **Ink / Foreground:** `var(--fg)` / `var(--ink)` (`#190a0c`)
- **Muted Text:** `var(--muted)` (`#6e4d52`)
- **Border:** `var(--border)` (`#ebdcd7`)

---

## 4. Layout & Spacing Rules for AI Agents

To maintain uniform spacing and design integrity across pages, **AI agents must NEVER write raw unconstrained `<div>` soup with arbitrary inline spacing (`space-y-2`, `m-0`, `p-6`)**.

### Rule 1: Always Use Centralized UI Components

Always import and compose components from `src/components/ui/`:

1. **Chapter & Section Headers:**

   ```astro
   import ChapterHeader from "../../components/ui/ChapterHeader.astro";

   <ChapterHeader
     chapter="Chapter 01"
     title="Section Title in Latin Serif"
     tibetanTitle="བོད་ཡིག་ཁ་བྱང་།"
     lede="Introductory lede paragraph text..."
   />
   ```

2. **Lineage Master & Teacher Cards:**

   ```astro
   import MasterCard from "../../components/ui/MasterCard.astro";

   <MasterCard
     dates="1292 – 1361"
     nameEn="Dölpopa Sherab Gyaltsen"
     nameBo="དོལ་པོ་པ་ཤེས་རབ་རྒྱལ་མཚན།"
     highlighted={true}
     bio="Revered as The Omniscient Buddha from Dölpo..."
   />
   ```

3. **Pillar & Framework Cards:**

   ```astro
   import PillarCard from "../../components/ui/PillarCard.astro";

   <PillarCard
     title="The Four Noble Truths"
     tibetanTitle="བདེན་པ་བཞི།"
     accent="accent"
     description="Core summary..."
   >
     <!-- Optional custom list or slot content -->
   </PillarCard>
   ```

### Rule 2: Grid and Spacing Standards

- **Section vertical rhythm:** Use `space-y-8` or `space-y-12` between major section blocks.
- **Grid systems:**
  - 3-column feature grids: `grid grid-cols-1 md:grid-cols-3 gap-6`
  - 4-column card grids: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
  - 5-column lineage grids: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5`
- **Card internals:** Always use Flexbox column with `gap-1.5` or `gap-2` for text hierarchies. Never use negative margins or uncoordinated `space-y-*` overrides on children.
- **Tibetan script clearance:** Always ensure a minimum of `0.25rem` (`mt-1` or `pt-1`) top clearance for Tibetan spans beneath Latin headings to prevent vowel diacritic collisions.
