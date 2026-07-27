# Nicole Dean Creative Design System

A comprehensive design system for Nicole Dean Creative, a multidisciplinary design studio specializing in brand strategy, visual identity design, UI/UX design, digital illustration, creative direction, and brand systems.

## Overview

This design system provides the foundational visual language, components, and guidelines for creating cohesive, professional interfaces that reflect Nicole Dean Creative's sophisticated and multidisciplinary approach to design.

## Color System

**Primary:** `#002222` — Deep teal, the core identity color. Used for primary text, headings, and key interactive elements.

**Secondary:** `#01817F` — Bright teal accent. Used for highlights, hover states, and secondary calls-to-action.

**Accent 1:** `#ECF2F2` — Soft neutral gray-blue. Used for backgrounds and subtle accents.

**Accent 2:** `#CB8F16` — Warm golden-bronze. Used for tertiary accents and special emphasis.

## Typography

**Body Copy:** Manrope (sans-serif) — Clear, modern, and highly legible. Used for all body text, UI labels, and interface copy.

**Headings:** Caudex (serif) — Sophisticated and distinctive. Used for display, headings, and prominent titles.

### Type Scale

- Display: 48px / 700 weight / 1.2 line-height
- H1: 36px / 700 weight / 1.3 line-height
- H2: 28px / 700 weight / 1.3 line-height
- H3: 24px / 700 weight / 1.4 line-height
- Body Large: 18px / 400 weight / 1.6 line-height
- Body: 16px / 400 weight / 1.6 line-height
- Body Small: 14px / 400 weight / 1.5 line-height
- Caption: 12px / 400 weight / 1.4 line-height

## Spacing System

Consistent spacing scale based on 8px units: 4px, 8px, 16px, 24px, 32px, 48px, 64px

## Visual Foundations

### Design Approach
Nicole Dean Creative's visual language emphasizes sophistication, clarity, and intentional design. The system uses:

- **Minimal decoration** — Clean layouts with generous whitespace
- **Precise typography** — Serif headings paired with modern sans-serif body text for visual contrast
- **Refined color palette** — Limited color use focused on deep teals with warm bronze accents
- **Subtle shadows and spacing** — Depth through spacing and delicate shadows rather than heavy effects

### Imagery
- Photography: Professional, editorial style
- Illustrations: Hand-drawn, organic quality preferred
- Backgrounds: Clean white or soft neutrals; no heavy patterns
- Imagery treatment: No heavy filters; prefer clean, natural tones

### Interaction & Animation
- Hover states: Subtle color shifts and opacity changes
- Transitions: Smooth, ~200-300ms easing (ease-in-out)
- No auto-playing animations; user-controlled or minimal decorative motion
- Focus states: Clear, accessible indicators

### Layout & Spacing
- Mobile-first responsive design
- Generous whitespace; avoid dense layouts
- Consistent padding/margins using the spacing scale
- Fixed navigation patterns for consistency

## Content Fundamentals

Nicole Dean Creative's voice is professional yet warm, sophisticated yet approachable.

### Tone & Style
- **Clarity first** — Direct, clear language over flowery descriptions
- **Confidence** — Statements assert expertise without arrogance
- **Human-centered** — "We" language when speaking to process; "you" when addressing client outcomes
- **No jargon unless necessary** — Design and creative concepts explained plainly
- **Purposeful formality** — Refined tone befitting a high-end creative studio

### Casing & Conventions
- Headings: Title Case
- Body text: Sentence case
- Labels/UI: Title Case for buttons, Sentence case for instructions
- No emoji; professional presentation

### Key Phrases
- "Design that works" — solving problems, not just looking pretty
- "Brand strategy" — emphasis on strategic thinking
- "Multidisciplinary" — capability across services
- Client-focused language emphasizing outcomes and partnership

## Assets

All brand assets are located in `/assets/`:
- `icon.svg` — Mark icon (symbol only)
- `logo-horizontal.svg` — Full logo, horizontal layout
- `logo-horizontal-stacked.svg` — Logo with text below, horizontal
- `logo-stacked.svg` — Full logo, vertical/stacked layout

## Iconography

No dedicated icon system provided. When icons are needed:
- Use Lucide or Heroicons for UI icons (minimal, stroke-based)
- Maintain consistency in weight and style
- Test for clarity at small sizes

## Components

Reusable UI primitives available in `/components/`:
- **Button** — Interactive element with multiple variants (primary, secondary, outline, ghost) and sizes
- **Input** — Text input field with consistent styling
- **Card** — Container component with border and subtle shadow
- **Heading** — Semantic heading component using Caudex serif
- **Badge** — Small label component for tags and statuses

All components are compiled into `_ds_bundle.js` and available via `window.NicholeDeanCreative.<ComponentName>`.

## Starting Points

Components marked with `@startingPoint` are available in consuming projects' Starting Points picker:
- Button (Forms section)
- Input (Forms section)
- Card (Layout section)
- Heading (Typography section)
- Badge (any section)

---

**Last updated:** July 2026
