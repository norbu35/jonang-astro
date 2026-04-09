# Artisan Design System for Jonang Monastery

## Overview
Transform the current clean, structured design into an immersive, artisan-crafted experience that reflects the spiritual and historical depth of the Jonang tradition. The design will combine rich Buddhist ornaments, subtle interactive motion, and selective mixed-media collage elements to create a "living manuscript" feel.

To avoid repetitive and rigid layouts, the design system utilizes 4 distinct, cohesive treatments that can be scattered and interleaved throughout the site.

## The 4 Artisan Treatments

### 1. Standard Flow (Rigid Artisan Cards)
- **Purpose:** For standard content grids and philosophy points.
- **Visuals:** Clean, structured cards with subtle inner gold borders, cloud/lotus corner ornaments, and a faint mandala watermark that rotates gently on hover.
- **Interactivity:** Cards lift gently on hover, casting a warmer shadow, while the watermark and inner border become slightly more prominent.

### 2. Immersive Highlight (Thangka/Pecha Collage)
- **Purpose:** For punctuating important sections with deep, temple-inspired immersion (e.g., historical narratives).
- **Visuals:** Breaks the grid. Images are set inside traditional Tibetan Thangka-style brocade frames with subtle diagonal stitching textures. Text is presented on an overlapping card styled like a traditional Tibetan *pecha* (loose-leaf manuscript) with a red cloth binding edge and aged paper texture. Floating stylized Tibetan clouds overlap the frame.
- **Interactivity:** Image overlays fade out on hover, and the Thangka frame scales slightly.
- **Responsive Strategy:** On mobile, the overlapping Pecha card un-stacks and sits directly below the Thangka frame with a negative top margin (e.g., `-2rem`) to maintain a slight, manageable overlap without breaking horizontal scroll.

### 3. The Fresco Mural (Cardless/Blended)
- **Purpose:** For seamless, atmospheric storytelling without the boundaries of cards or boxes.
- **Visuals:** Text sits directly on a heavily textured, plaster-like background (`mix-blend-mode` multiply on noise/gradients). The accompanying image is blended seamlessly into the wall using radial gradient masks, making it feel like an ancient painted mural.
- **Interactivity:** The blended image becomes slightly more opaque on hover.
- **Responsive Strategy:** On mobile, the blended image shifts from the side to become a subtle full-bleed background behind the text, heavily faded to maintain text legibility.
- **Content Constraint:** Requires images with natural negative space or dark/muted edges that can fade out smoothly via gradient masks.

### 4. The Sacred Centerpiece (Symmetrical Mandala)
- **Purpose:** For singular, important topics or portraits where a grounded, meditative focus is desired.
- **Visuals:** A highly symmetrical layout centered around a large, circular image. It features slowly rotating outer dashed/solid rings and four traditional directional markers (dots).
- **Interactivity:** The central image scales slightly on hover, and the rotating rings change color intensity.
- **Content Constraint:** Requires images that work well in a 1:1 circular crop (portraits or central focal points).

## Global Architecture & Visual Directives

- **Textures:** Pre-rendered, seamless noise PNGs/WebPs for background textures to ensure high scrolling performance. (Do NOT use live SVG `<feTurbulence>` filters as they cause severe scroll jank on mobile).
- **Typography:** Elegant typography with drop caps (`Playfair Display`, `Cormorant Garamond`) for introductory paragraphs.
- **Dividers:** Stylized section dividers replacing simple lines (e.g., Lotus motifs, Endless Knots that "draw" themselves via SVG stroke animations).
- **Color System Integration:** All artisan elements (borders, watermarks, background tints) MUST use the existing Tailwind CSS variables defined in `base.css` (e.g., `var(--accent)`, `var(--gold)`, `var(--saffron)`, `var(--surface-muted)`). No hardcoded hex values.
- **Accessibility & Motion:**
  - Enforce `prefers-reduced-motion: reduce`.
  - For users who prefer reduced motion, all continuous floating, spinning (mandala rings), and SVG drawing animations MUST pause or disable entirely, presenting the static artisan layouts.
  - Maintain WCAG AA contrast ratios for all text over textured backgrounds.

## Implementation Strategy

1. **Extend Base Styles (`base.css` / Tailwind Config):**
   - Add new animation keyframes (`float`, `drawLine`, `drawKnot`, `revealUp`, `slowSpin`).
   - Add the `prefers-reduced-motion` media query to disable these animations when appropriate.
   - Define utility classes for the 4 treatments hooking into the theme variables (e.g., `.artisan-card`, `.thangka-frame`, `.pecha-backdrop`, `.fresco-wall`, `.mandala-container`).
   
2. **Create/Update Components (`src/components/`):**
   - Create `AnimatedDivider.astro` with inline SVGs for Lotus and Endless Knot to allow CSS stroke animations.
   - Update existing `Card.astro` to the new `ArtisanCard` style (Treatment 1).
   - Create new section layout components for the other treatments:
     - `ThangkaCollageSection.astro` (Treatment 2)
     - `FrescoMuralSection.astro` (Treatment 3)
     - `SacredCenterpiece.astro` (Treatment 4)

3. **Site-Wide Integration (`src/pages/`, `src/layouts/`):**
   - Replace standard dividers with `AnimatedDivider.astro`.
   - Update text blocks in Markdown/Astro to use drop caps.
   - Interleave the 4 treatment components across pages (especially the homepage and about sections) to create a dynamic, handcrafted rhythm.
