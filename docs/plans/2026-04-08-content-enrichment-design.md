# Content Enrichment Design

## Goal

Curate the newly added material from `../jonang-payload/content.md` into the Astro site as a richer editorial experience that remains readable for general visitors while preserving selected depth for serious readers.

## Context

The current website mixes CMS-backed dynamic content with several hardcoded Astro editorial pages. The new source material is substantially richer than the current page bodies and covers:

- historical origins of the Jonang tradition
- philosophical distinctiveness, especially Zhentong
- the Kalachakra lineage and six vajra yogas
- persecution, survival, and modern recognition
- Mongolia and the Jebtsundampa connection
- monastic education, sacred sites, and travel context
- translations and reading lists

The site should not become a raw academic dump. The material must be curated into layered, web-readable sections with clearer narrative pacing and more visual appeal.

## Chosen Direction

The content will be curated directly in the Astro site rather than modeled into Payload. Existing CMS-backed data that still serves the site well, such as teachers, quotes, footer, donations, and gallery images, will remain dynamic. The longform doctrinal and historical material will be rewritten into code-first editorial pages.

The presentation style will remain aligned with the Jonang visual redesign already applied to the site: editorial, sacred, parchment-toned, and image-forward.

## Information Architecture

### Home

The home page becomes a clearer narrative gateway instead of a generic set of sections. It should answer:

- what Jonang is
- why it matters
- what is distinctive about the tradition
- where the lineage lives today
- where a visitor should go next

Planned sections:

- strong hero thesis
- core pillars of the tradition
- lineage and survival overview
- Kalachakra and contemplative practice overview
- living monastery and study life
- sacred geography / contemporary revival
- visit and support pathways

### The Monastery

This page will focus on Main Jonang Takten Phuntsok Choeling in Shimla as a living center in exile. It will combine founding history, abbots and continuity, student body, study structure, and daily life.

### The Jonang Tradition

This becomes the principal intellectual overview page. It will explain:

- origins from Kalachakra transmission
- emergence in Jomonang
- Dolpopa and Taranatha
- Zhentong in Buddhist context
- persecution and eastern survival
- modern recognition and revival

### Kalachakra Practice

This page will explain what makes the Jonang lineage distinct in practice:

- the role of Kalachakra in Jonang identity
- generation and completion stages
- the six vajra yogas in approachable language
- subtle body / cosmology / medicine links

### Curriculum

This page will be reframed as a structured presentation of education rather than a flat page. It should present:

- long-term scholastic study
- mantra and ritual training
- language and modern subjects
- retreat system
- intended formation of the student

### Teachers, Donate, Gallery

These remain route-stable and largely CMS-backed, but may receive lighter contextual copy or section framing if needed.

## Content Principles

- Curate, do not transplant: `content.md` is source material, not publish-ready copy.
- Keep the top layer accessible: each page should have a concise overview before deeper sections.
- Use selective depth: preserve serious material where it helps distinguish the site.
- Favor strong subsection headings and short panels over uninterrupted prose.
- Avoid unsupported claims beyond the provided source text.

## Presentation Patterns

The new content should be broken into a set of reusable editorial patterns:

- timeline sections for historical sequence
- concept panels for doctrine and practice
- field-note callouts for sites, logistics, or modern revival details
- image-anchored sections for sacred geography and monastery life
- reading/resource blocks for advanced readers

These patterns should reduce reading fatigue and let longform material breathe.

## Visual Direction

The visual system should reinforce the content rather than merely decorate it:

- parchment and tonal surface layering
- symbolic linework and section ornaments using existing assets
- selective illustrations or visual motifs tied to mandala, sacred geography, lineage, and study
- stronger asymmetry where it improves editorial rhythm

If new illustrations are added, they should support comprehension and atmosphere rather than feeling ornamental for their own sake.

## Scope Boundaries

- No Payload schema redesign for longform copy
- No route churn unless clearly necessary
- No attempt to model the entire academic source in one pass
- No doctrinal expansion beyond the source content and current site context

## Risks

### Risk: Overly Dense Pages

The source content is academically compressed. Without careful restructuring, pages will become difficult to read. This will be controlled through layered sections, concise intros, and selective use of deeper panels.

### Risk: Visual/Content Mismatch

If the layout remains too generic, the new content will feel bolted onto the existing site. This will be addressed by restructuring key pages and adding content-aware section patterns.

### Risk: Inconsistent Source of Truth

Because longform content will be curated directly into Astro rather than Payload, later editorial updates may diverge from `content.md`. This is acceptable for this pass because the goal is stronger site presentation, not full CMS normalization.

## Verification

- `astro check` must pass
- representative page smoke test in local dev
- home, doctrine, monastery, kalachakra, and curriculum pages must show clear hierarchy and readable pacing on mobile and desktop

