# Artisan Design System for Jonang Monastery

## Overview
Transform the current clean, structured design into an immersive, artisan-crafted experience that reflects the spiritual and historical depth of the Jonang tradition. The design will combine rich Buddhist ornaments, subtle interactive motion, and selective mixed-media collage elements to create a "living manuscript" feel.

## Architecture & Visual Directives

### 1. Rich Ornaments & Textures (Option A)
- **Textures:** Subtle paper/canvas textures in backgrounds (e.g., fractal noise filters, radial gradients).
- **Typography:** Elegant typography with drop caps (`Playfair Display`, `Cormorant Garamond`).
- **Dividers:** Stylized section dividers replacing simple lines (e.g., Lotus motifs, Endless Knots).
- **Corners:** Decorative corner treatments on cards (cloud/lotus curves rather than hard geometric angles).
- **Watermarks:** Subtle mandala watermarks behind key text or in card corners.

### 2. Interactive Scroll & Motion (Option B)
- **Entrance Animations:** Subtle reveal animations (elements floating up and fading in softly).
- **SVG Drawing Effects:** Lines and knots that "draw" themselves on scroll.
- **Card Depth:** Interactive depth on cards (lifting on hover, revealing inner gold borders, casting warmer shadows, and gently rotating watermarks).
- **Alive Backgrounds:** Very slow, faint floating gradients or light effects to ensure the page never feels completely static.

### 3. Selective Immersive Mixed Media (Option C)
- **Selective Application:** Interleave standard "rigid" card designs with broken grid, overlapping elements to prevent visual noise.
- **Organic Framing:** Use organic, non-rectangular border radii on select images to look hand-cut or natural.
- **Layering:** Overlap text cards over images for depth (collage style).
- **Brush Strokes:** Occasional brush-stroke or paper-tear backgrounds behind introductory texts to give a handcrafted, pasted-on feel.

## Implementation Plan Outline
1. **Extend Base Styles (`base.css`):**
   - Add new animation keyframes (`float`, `drawLine`, `drawKnot`, `revealUp`).
   - Define utility classes for interactive hover effects, organic shapes (`.organic-image`), and watermarks (`.mandala-watermark`).
2. **Create/Update SVG Assets & Components:**
   - Create `AnimatedDivider.astro` with inline SVGs for Lotus and Endless Knot to allow CSS stroke animations.
   - Update `Card.astro` (or create `ArtisanCard.astro`) with new corner treatments, inner borders, and mandala hover states.
   - Create a `CollageSection.astro` component specifically for the overlapping text/image pattern (Option C).
3. **Integration (`src/pages/index.astro`):**
   - Replace standard dividers with `AnimatedDivider.astro`.
   - Update text blocks to use drop caps and subtle background mandalas.
   - Interleave `ArtisanCard` grids with new `CollageSection` layouts to balance clean/rigid design with immersive mixed media.
