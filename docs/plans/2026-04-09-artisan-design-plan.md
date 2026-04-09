# Artisan Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the 4 distinct artisan design treatments (Rigid Cards, Thangka Collage, Fresco Mural, Sacred Centerpiece) to create an immersive, living-manuscript feel across the site.

**Architecture:** Extend Tailwind config and `base.css` with new animations and utility classes. Create reusable Astro components for each treatment. Integrate these components into the main index page to break up the rigid grid and introduce handcrafted, temple-inspired pacing.

**Tech Stack:** Astro, Tailwind CSS (v4/v3 via standard utilities), standard CSS animations, SVG.

---

### Task 1: Extend Base Styles and Tailwind Config

**Files:**
- Modify: `tailwind.config.mjs`
- Modify: `base.css`

- [ ] **Step 1: Add animation keyframes to Tailwind Config**

Update `tailwind.config.mjs` to include the new keyframes and animation utilities.

```javascript
// tailwind.config.mjs (snippet inside extend:)
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        drawLine: {
          to: { strokeDashoffset: "0" },
        },
        drawKnot: {
          to: { strokeDashoffset: "0" },
        },
        slowSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        revealUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "draw-line": "drawLine 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        "draw-knot": "drawKnot 2s ease-in-out forwards",
        "slow-spin": "slowSpin 60s linear infinite",
        "slow-spin-reverse": "slowSpin 40s linear infinite reverse",
        "reveal-up": "revealUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
      },
```

- [ ] **Step 2: Add Artisan utilities to base.css**

Add the base utility classes for the artisan treatments to `base.css` under `@layer components`.

```css
/* base.css */
@layer components {
  /* ... existing components ... */
  
  /* Reduce motion */
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Artisan Card Effects */
  .artisan-card {
    @apply relative overflow-hidden transition-all duration-500 ease-out;
  }
  .artisan-card:hover {
    @apply -translate-y-2 shadow-[0_20px_40px_rgba(112,16,35,0.12)];
  }
  .artisan-card::after {
    content: '';
    @apply absolute inset-0 rounded-inherit transition-all duration-500 ease-out pointer-events-none z-10;
    box-shadow: inset 0 0 0 1px rgba(var(--gold) / 0);
  }
  .artisan-card:hover::after {
    box-shadow: inset 0 0 0 1px rgba(var(--gold) / 0.4);
    inset: 4px;
  }

  /* Mandala Watermark */
  .mandala-watermark {
    @apply absolute -top-5 -right-5 w-[150px] h-[150px] opacity-[0.04] transition-all duration-500 ease-out pointer-events-none;
  }
  .artisan-card:hover .mandala-watermark {
    @apply opacity-[0.09] rotate-12 scale-110;
  }

  /* Thangka Frame */
  .thangka-frame {
    @apply relative p-3 bg-gold shadow-2xl transition-transform duration-700 ease-out rounded-sm;
    background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 4px);
  }
  .thangka-frame::before {
    content: '';
    @apply absolute inset-1 border border-white/40 pointer-events-none;
  }
  .thangka-frame::after {
    content: '';
    @apply absolute inset-2 bg-accent -z-10;
  }
  
  /* Pecha Backdrop */
  .pecha-backdrop {
    @apply absolute -inset-x-6 -inset-y-4 bg-surface-muted shadow-lg rounded-sm transform -rotate-1 -z-10;
    background-image: 
      linear-gradient(to right, rgba(var(--gold) / 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(var(--gold) / 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    border-left: 8px solid rgb(var(--accent));
  }
  .pecha-backdrop::after {
    content: '';
    @apply absolute right-2.5 top-2.5 bottom-2.5 w-[2px] bg-gold/20;
  }

  /* Fresco Wall */
  .fresco-wall {
    @apply relative py-24 px-8 bg-surface-muted shadow-inner rounded-sm overflow-hidden;
    background-image: 
      radial-gradient(ellipse at top right, rgba(var(--gold)/0.1), transparent 60%),
      linear-gradient(180deg, transparent 0%, rgba(var(--accent)/0.05) 100%);
  }
  
  .fresco-image-blend {
    @apply absolute md:-right-[10%] md:-bottom-[10%] w-full h-full md:w-[60%] md:h-[120%] bg-cover bg-center mix-blend-multiply opacity-60 transition-opacity duration-1000 ease-out;
    mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
    -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
  }
  @media (max-width: 767px) {
    .fresco-image-blend {
       mask-image: linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%);
       -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 50%, transparent 100%);
       opacity: 0.15;
    }
  }
  .fresco-wall:hover .fresco-image-blend {
    @apply opacity-80;
  }
  @media (max-width: 767px) {
    .fresco-wall:hover .fresco-image-blend {
      @apply opacity-20;
    }
  }

  /* Mandala Centerpiece */
  .mandala-ring {
    @apply absolute inset-0 border-2 border-dashed border-gold/40 rounded-full animate-slow-spin;
  }
  .mandala-ring-inner {
    @apply absolute inset-5 border border-solid border-accent/20 rounded-full animate-slow-spin-reverse;
  }
}

/* Base utility for drop caps */
@layer utilities {
  .artisan-dropcap::first-letter {
    @apply float-left mr-2 mt-1 text-7xl leading-[0.8] text-gold font-display drop-shadow-[0_0_15px_rgba(var(--gold),0.3)];
  }
}
```

- [ ] **Step 3: Verify build**
Run: `npm run build` or `npx astro build`
Expected: Successful build without CSS or Tailwind errors.

- [ ] **Step 4: Commit**
```bash
git add tailwind.config.mjs base.css
git commit -m "feat(styles): add artisan design system animations and utility classes"
```

---

### Task 2: Create AnimatedDivider.astro

**Files:**
- Create: `src/components/AnimatedDivider.astro`

- [ ] **Step 1: Write component code**

```astro
---
interface Props {
  type?: 'lotus' | 'knot';
  class?: string;
}

const { type = 'lotus', class: className = '' } = Astro.props;
---

<div class={`flex items-center justify-center my-8 text-gold ${className}`}>
  {type === 'lotus' ? (
    <svg class="animate-draw-line" width="300" height="30" viewBox="0 0 300 30" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray: 400; stroke-dashoffset: 400;">
      <path d="M 0,15 L 120,15" />
      <path d="M 150,5 C 150,5 160,10 160,15 C 160,20 150,25 150,25 C 150,25 140,20 140,15 C 140,10 150,5 150,5 Z" />
      <path d="M 140,15 C 128,12 125,15 125,15 C 125,15 128,18 140,15 Z" />
      <path d="M 160,15 C 172,12 175,15 175,15 C 175,15 172,18 160,15 Z" />
      <path d="M 180,15 L 300,15" />
    </svg>
  ) : (
    <svg width="40" height="30" viewBox="0 0 40 30" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path class="animate-draw-knot" d="M 10,15 L 20,5 L 30,15 L 20,25 Z M 15,10 L 25,20 M 15,20 L 25,10" style="stroke-dasharray: 100; stroke-dashoffset: 100;" />
    </svg>
  )}
</div>
```

- [ ] **Step 2: Commit**
```bash
git add src/components/AnimatedDivider.astro
git commit -m "feat(components): create AnimatedDivider with lotus and knot SVGs"
```

---

### Task 3: Update Card.astro to ArtisanCard

**Files:**
- Modify: `src/components/Card.astro`

- [ ] **Step 1: Add artisan classes and watermarks to existing Card.astro**

Update the root `<astro-card>` element and interior to match the artisan spec.

```astro
---
import { Image } from "astro:assets";
import type { Media } from "../../payload-types";
import AnimatedDivider from "./AnimatedDivider.astro";

interface Props {
  img: string | Media;
  header: string;
  body: string;
  link: string;
}

const { img, header, body, link } = Astro.props;
---

<astro-card
  class="focus group w-full max-w-sm overflow-hidden bg-white artisan-card"
  tabindex="0"
  id="card"
  data-link={link}
  role="link"
>
  <a href={link} tabindex="-1" class="block h-full relative">
    <!-- Decorative Mandala Watermark -->
    <svg class="mandala-watermark" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1" style="color: rgb(var(--gold));">
      <circle cx="50" cy="50" r="40"/>
      <path d="M 50,10 A 20,20 0 0,1 50,50 A 20,20 0 0,1 50,10" transform="rotate(0 50 50)"/>
      <path d="M 50,10 A 20,20 0 0,1 50,50 A 20,20 0 0,1 50,10" transform="rotate(45 50 50)"/>
      <path d="M 50,10 A 20,20 0 0,1 50,50 A 20,20 0 0,1 50,10" transform="rotate(90 50 50)"/>
      <path d="M 50,10 A 20,20 0 0,1 50,50 A 20,20 0 0,1 50,10" transform="rotate(135 50 50)"/>
    </svg>

    <div class="relative aspect-[4/3]">
      <!-- Replaced the top squiggly SVG with a cleaner boundary for artisan style -->
      {
        typeof img !== "string" ? (
          <Image
            src={img.sizes!.thumbnail!.url!}
            alt={img.alt!}
            width={img.sizes!.thumbnail!.width!}
            height={img.sizes!.thumbnail!.height!}
            class="h-full w-full object-cover border-b border-border/20"
          />
        ) : (
          <div class="h-full w-full bg-surface-muted flex items-center justify-center text-muted">Error fetching image.</div>
        )
      }
    </div>
    
    <div class="px-6 pb-8 pt-8 text-center text-ink relative z-10">
      <!-- Lotus/Cloud Corners -->
      <svg class="absolute top-2 left-2 w-4 h-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12 C4 4, 12 4, 12 4"/></svg>
      <svg class="absolute top-2 right-2 w-4 h-4 text-gold transform scale-x-[-1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12 C4 4, 12 4, 12 4"/></svg>
      
      <div class="font-display text-lg font-semibold uppercase tracking-widest text-accent md:h-12 md:text-xl">
        {header}
      </div>
      
      <AnimatedDivider type="knot" class="!my-4 mx-auto" />
      
      <div class="hidden h-28 items-center justify-center overflow-hidden text-[1.05rem] text-ink/80 font-garamond md:flex md:items-center">
        {body}
      </div>
    </div>
  </a>
</astro-card>
<script>
  class Card extends HTMLElement {
    constructor() {
      super();
      const link = this.dataset.link!;
      this.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.code === "Enter" || event.code === "Space") {
          event.preventDefault();
          location.assign(link);
        }
      });
    }
  }
  customElements.define("astro-card", Card);
</script>
```

- [ ] **Step 2: Commit**
```bash
git add src/components/Card.astro
git commit -m "feat(components): update Card.astro to artisan rigid card treatment"
```

---

### Task 4: Create ThangkaCollageSection.astro

**Files:**
- Create: `src/components/ThangkaCollageSection.astro`

- [ ] **Step 1: Write component code**

```astro
---
import { Image } from "astro:assets";
import AnimatedDivider from "./AnimatedDivider.astro";

interface Props {
  title: string;
  body: string;
  imageSrc: any; // ImageMetadata
  imageAlt: string;
  reverse?: boolean;
}

const { title, body, imageSrc, imageAlt, reverse = false } = Astro.props;
---

<div class={`relative max-w-4xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} my-24`}>
  
  <!-- Image Layer (Background) -->
  <div class={`relative w-full md:w-[65%] z-0 group ${reverse ? 'md:-ml-8' : 'md:-mr-8'}`}>
    <div class="thangka-frame w-full aspect-[4/3]">
      <div class="relative z-10 border-2 border-[#D4AF37] w-full h-full overflow-hidden">
        <Image src={imageSrc} alt={imageAlt} class="w-full h-full object-cover" width={800} />
        <div class="absolute inset-0 bg-accent/10 transition-opacity duration-500 group-hover:opacity-0"></div>
      </div>
    </div>
    <!-- Tibetan Cloud Ornament -->
    <svg class={`absolute -top-4 ${reverse ? '-left-4' : '-right-4'} w-12 h-12 text-gold opacity-90 animate-float`} viewBox="0 0 100 100" fill="currentColor">
      <path d="M70,40 C75,40 80,45 80,50 C80,55 75,60 70,60 L30,60 C20,60 15,50 20,40 C25,30 35,30 40,35 C45,25 60,25 65,35 C68,35 70,38 70,40 Z" opacity="0.8"/>
      <path d="M70,40 C75,40 80,45 80,50 C80,55 75,60 70,60 L30,60 C20,60 15,50 20,40 C25,30 35,30 40,35 C45,25 60,25 65,35 C68,35 70,38 70,40 Z" fill="none" stroke="#Fdfbf7" stroke-width="2"/>
    </svg>
  </div>

  <!-- Text Layer (Foreground Overlap) -->
  <div class={`relative w-full md:w-[50%] z-10 mt-[-2rem] md:mt-16 artisan-card bg-white p-8 md:p-10 shadow-card ${reverse ? 'md:mr-auto' : 'md:ml-auto'}`}>
    <div class="pecha-backdrop hidden md:block"></div>
    
    <svg class="mandala-watermark text-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1">
      <circle cx="50" cy="50" r="40"/>
      <path d="M 50,10 A 20,20 0 0,1 50,50 A 20,20 0 0,1 50,10" transform="rotate(0 50 50)"/>
      <path d="M 50,10 A 20,20 0 0,1 50,50 A 20,20 0 0,1 50,10" transform="rotate(45 50 50)"/>
      <path d="M 50,10 A 20,20 0 0,1 50,50 A 20,20 0 0,1 50,10" transform="rotate(90 50 50)"/>
      <path d="M 50,10 A 20,20 0 0,1 50,50 A 20,20 0 0,1 50,10" transform="rotate(135 50 50)"/>
    </svg>
    
    <h4 class="font-display text-accent uppercase tracking-widest text-lg relative z-10 m-0">{title}</h4>
    
    <AnimatedDivider type="knot" class="!my-4 justify-start" />
    
    <p class="font-garamond text-xl text-ink/80 m-0 relative z-10 leading-relaxed">{body}</p>
  </div>

</div>
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ThangkaCollageSection.astro
git commit -m "feat(components): create ThangkaCollageSection for immersive overlap treatment"
```

---

### Task 5: Create FrescoMuralSection.astro

**Files:**
- Create: `src/components/FrescoMuralSection.astro`

- [ ] **Step 1: Write component code**

```astro
---
interface Props {
  title: string;
  body: string;
  imagePath: string; // Provide direct URL for the background inline style
}

const { title, body, imagePath } = Astro.props;
---

<div class="fresco-wall animate-reveal-up my-24 mx-auto max-w-5xl">
  <div class="fresco-image-blend" style={`background-image: url('${imagePath}');`}></div>
  <div class="relative z-10 max-w-[85%] md:max-w-[50%] ml-4 md:ml-8">
    <h4 class="font-display text-4xl md:text-5xl text-accent mb-4 leading-tight">{title}</h4>
    <div class="w-16 h-0.5 bg-gold mb-6"></div>
    <p class="font-garamond text-xl md:text-2xl text-ink/90 text-justify leading-relaxed m-0">
      {body}
    </p>
  </div>
</div>
```

- [ ] **Step 2: Commit**
```bash
git add src/components/FrescoMuralSection.astro
git commit -m "feat(components): create FrescoMuralSection for blended background treatment"
```

---

### Task 6: Create SacredCenterpiece.astro

**Files:**
- Create: `src/components/SacredCenterpiece.astro`

- [ ] **Step 1: Write component code**

```astro
---
import { Image } from "astro:assets";

interface Props {
  title: string;
  body: string;
  imageSrc: any;
  imageAlt: string;
}

const { title, body, imageSrc, imageAlt } = Astro.props;
---

<div class="py-20 px-8 flex flex-col items-center text-center bg-surface-muted/30 border border-border/40 rounded-sm relative my-24 max-w-4xl mx-auto">
  
  <h4 class="font-display text-3xl md:text-4xl text-accent m-0 mb-4">{title}</h4>
  <div class="w-12 h-[1px] bg-gold mx-auto"></div>

  <div class="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] my-12 flex items-center justify-center group">
    <div class="mandala-ring"></div>
    <div class="mandala-ring-inner"></div>
    
    <div class="relative z-10 w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-full overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 border-4 border-surface border-x-gold">
      <Image src={imageSrc} alt={imageAlt} width={400} height={400} class="w-full h-full object-cover" />
    </div>
    
    <!-- Directional Dots -->
    <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full"></div>
    <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent rounded-full"></div>
    <div class="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full"></div>
    <div class="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-accent rounded-full"></div>
  </div>

  <p class="max-w-[600px] font-garamond text-xl md:text-2xl text-ink/80 leading-relaxed">
    {body}
  </p>
  
</div>
```

- [ ] **Step 2: Commit**
```bash
git add src/components/SacredCenterpiece.astro
git commit -m "feat(components): create SacredCenterpiece for symmetrical mandala treatment"
```

---

### Task 7: Integrate Components into index.astro

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace rigid layout with artisan components**

Open `src/pages/index.astro`. We will update the layout to use the new treatments, specifically replacing the `editorial-grid--two` layouts with `ThangkaCollageSection`, `FrescoMuralSection`, and `SacredCenterpiece`.

Modify imports at the top:
```astro
// src/pages/index.astro
import AnimatedDivider from "../components/AnimatedDivider.astro";
import ThangkaCollageSection from "../components/ThangkaCollageSection.astro";
import FrescoMuralSection from "../components/FrescoMuralSection.astro";
import SacredCenterpiece from "../components/SacredCenterpiece.astro";
```

Update the introductory text to use `.artisan-dropcap`. Find the `.editorial-lede` paragraph and wrap the first letter in a span, or just add the class:
```astro
              <p class="editorial-lede artisan-dropcap">
                The Jonang tradition preserves one of Tibetan Buddhism's most
                distinctive unions of philosophy and tantric practice: the
                Zhentong view of luminous Buddha-nature and the complete Dro
                lineage of the Kalachakra system.
              </p>
```

Replace the "Kalachakra as cosmology..." section (which currently uses `editorial-grid--two`) with the `ThangkaCollageSection`:
```astro
      <AnimatedDivider type="lotus" />

      <section class="section-padding reveal-on-scroll">
        <ThangkaCollageSection
          title="Kalachakra as cosmology, contemplation, and lived path"
          body="The Kalachakra cycle is not simply one subject among many. In Jonang it provides the ritual, meditative, and subtle-body framework through which the school understands the relationship between cosmos, body, awareness, and awakening."
          imageSrc={teachingImage}
          imageAlt="A monk teaching in a monastery setting"
        />
      </section>
```

Replace the "From Shambhala legend to modern recognition" section with the `FrescoMuralSection`:
```astro
      <AnimatedDivider type="lotus" />

      <section class="section-padding reveal-on-scroll">
        <!-- Note: Fresco requires a path string for the background image -->
        <FrescoMuralSection
          title="From Shambhala legend to modern recognition"
          body="Jonang memory is carried through sacred narrative, historical transmission, and monastic continuity. The result is a tradition that links Indian tantric roots, Tibetan philosophical creativity, periods of persecution, and a modern global renaissance."
          imagePath="/src/assets/images/rite-sutra.webp" 
        />
      </section>
```

Replace the "Texts, teachers, and training still held in full" block at the end with the `SacredCenterpiece`:
```astro
      <AnimatedDivider type="lotus" />

      <section class="section-padding reveal-on-scroll">
        <SacredCenterpiece
          title="Texts, teachers, and training still held in full"
          body="What distinguishes the site today is not only memory of a lost school, but the continuity of living teachers, long-term curriculum, ritual practice, retreat, and translation work."
          imageSrc={libraryImage}
          imageAlt="Bookshelves and sacred texts in the monastery library"
        />
      </section>
```

Ensure standard grids use `Card` components with `AnimatedDivider` separating them instead of `<SectionDivider />`.

- [ ] **Step 2: Verify Build**
Run: `npx astro build`
Expected: Clean build, confirming all imports and component usages are correct.

- [ ] **Step 3: Commit**
```bash
git add src/pages/index.astro
git commit -m "feat(pages): integrate artisan design components into homepage layout"
```

---
