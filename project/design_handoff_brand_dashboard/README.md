# Handoff: Brand Creative Dashboard

## Overview
The **Brand Creative Dashboard** is a comprehensive, interactive form-based tool for capturing and organizing brand strategy information. It serves as a structured intake system for creative professionals to document brand foundation, values, visual direction, and system documentation. The dashboard provides real-time preview of brand outputs (moodboards, logo variations, stress tests) alongside the form inputs.

## About the Design Files
The file `Brand Strategy Dashboard.dc.html` is a **high-fidelity design prototype** showing the intended look, behavior, and interactions. This is **not production code** — it is a reference design. Your task is to **recreate this dashboard in your target framework** (React, Vue, Next.js, or other) using your codebase's established patterns, libraries, and design tokens. The prototype demonstrates the complete visual design, layout, interactions, and state management flow.

This bundle is fully self-contained for local files: extract the zip, open `Brand Strategy Dashboard.dc.html` directly in a browser (no build step, no server required — though a live internet connection is needed the first time, to fetch React/Babel/fonts/export libraries from CDN; see **DESIGN_NOTES.md** for exactly which files/URLs and why). Read **DESIGN_NOTES.md** before diving into the HTML source — it explains the templating syntax you'll see (`{{ }}`, `<sc-for>`, `x-import`) so you don't try to port it literally.

## Fidelity
**High-fidelity (hifi)**: This design includes pixel-perfect layouts, exact color values, typography scales, spacing, border radius, shadows, and interactive states. Recreate the UI to match these specifications using your framework's component library and styling approach.

---

## Screens / Views

### Main Dashboard Layout
**Purpose**: Two-panel interface for data entry and live preview.

**Layout**:
- **Left Panel (Sidebar Form)**: Collapsible sidebar containing all form inputs. Width adjusts based on collapse state (collapsed: 40px, expanded: ~27-35% of viewport). Background: #051B19 (dark teal). Scrollable when content exceeds viewport height. On mobile, fixed position with overlay backdrop.
- **Right Panel (Preview Canvas)**: Live preview of brand outputs. Flex-grow to fill remaining space. Background: #F4F4F2 (light gray). Contains scrollable content grid showing moodboards, stress tests, color palettes, and logos.
- **Toolbar**: Fixed top bar with export buttons and brand name display. Background: #000000 (black). Height: 64px.

**Responsive Behavior**:
- Desktop (976px+): Two-column layout with fixed sidebar widths
- Tablet (600–975px): Sidebar collapses to 40px icon button; content adjusts
- Mobile (<600px): Sidebar becomes fixed overlay on right side; backdrop dimming applied

---

## Form Sections (Sidebar)

### Section Header Bar
- **Background**: #000000 (black)
- **Title**: Font family Caudex serif, 21px, weight 700, color #CBCBCB
- **Description**: Font family Manrope sans-serif, 12px, weight 500, color #CBCBCB, line-height 1.5
- **Padding**: 24px 32px
- **Display**: Flex, align-items baseline, justify-content space-between

### Form Input Fields (Textareas & Inputs)
- **Background**: #2A2A2A (dark gray) for textareas; #3A3A3A for certain fields
- **Text Color**: #FFFFFF (white) or #CBCBCB depending on context
- **Border**: 1px solid #999999
- **Border Radius**: 8px
- **Padding**: 11px 14px
- **Font**: Manrope sans-serif, 11px–12px, weight 400
- **Placeholder Color**: #808080
- **Focus State**: Outline: none (custom focus handled via border highlight)

### Labels
- **Color**: #CBCBCB (light gray)
- **Font**: Manrope, 12px, weight 400
- **Required Indicator**: Color #CB8F16 (warm gold), weight 700

---

## Key Form Sections

### 01. Brand Foundation
**Fields**:
- What is your service or product? (textarea, 3 rows, required)
- Is there a unique story behind the name? (textarea, 6 rows)
- Who is your ideal audience? (textarea, 2 rows, required)
- What core stressor is keeping your ideal client up at 2am? (textarea, 2 rows, required)
- Why would customers pick YOU over competitors? (textarea, 2 rows, required)

### 02. Operating Values & Personality
**Archetype Selection**:
- Grid of 6 archetype cards (ACADEMIC, INNOVATOR, MINIMALIST, COACH, ANCHOR, VISIONARY)
- **Unselected State**: Background #3A3A3A, border #999999, text #CBCBCB
- **Selected State**: Background #1A1A1A, border #1A1A1A, text #CBCBCB
- **Interaction**: Click to toggle; max 2 selections allowed
- **Transition**: All 100ms ease

**Values Fields** (for each of 2 selected archetypes):
- "I will always..." (input field)
- "I will never..." (input field)

### 03. Visual Direction
**Fields**:
- Header font dropdown (searchable)
- Body font dropdown (searchable)
- Accent font dropdown (searchable)
- **Dropdown UI**: Background #CBCBCB, border #1A1A1A, max-height 200px, overflow-y auto
- Strategic color palette (4 color picker inputs arranged in grid)
- Logo Variations (image upload slot)
- Favicon (image upload slot)

### 04. Stress Test & System Laws
**Fields**:
- Real-world stress test upload (image slot)
- Stress test preview grid (displays logo at 5 different sizes: 200px, 175px, 149px, 124px, 98px)
- Color hex codes display
- Typography hierarchy display
- Logo usage rules (textarea)

### 05. Moodboard Imagery
**Fields**:
- 8-image grid upload (image slots with aspect ratio 1:1)
- Section header background: #000000, text color: #FFFFFF
- Responsive: 4 columns desktop, 2 columns tablet, 1 column mobile

### 06. Logo Variations Grid
**Fields**:
- 3–6 logo upload slots
- Grid layout: auto-fit, minmax 100px
- Section header background: #000000, text color: #FFFFFF

---

## Right Panel: Live Preview

### Brand Preview Card
- **Background**: #FFFFFF (white)
- **Layout**: Grid 2 columns (light/dark background samples)
- **Typography Display**: Header font + Body font + Accent font samples
- **What You Do / Your Story / Your Customers**: Displays from form inputs
- **Archetype Cards**: 2 cards side-by-side, each showing archetype name and traits
- **Values Display**: 2 cards showing "Value 1" and "Value 2" with styling

### Moodboard Grid
- **Layout**: 4 columns, equal aspect ratio (24.6% container query width)
- **Images**: Uploaded images displayed as full-bleed crops
- **Responsive**: 2 columns at max-width 880px, 1 column at max-width 560px

### Stress Test Grid
- **Layout**: 5 columns, each showing logo at different size
- **Labels**: 200px, 175px, 149px, 124px, 98px

### Color Palette Display
- **Layout**: Grid of color swatches with hex values below
- **Swatch Size**: 60px × 60px, border-radius 8px

---

## Interactions & Behavior

### Sidebar Toggle
- **Click**: Toggle sidebar expand/collapse
- **Animation**: Smooth transition (0.25s ease)
- **Mobile**: Sidebar slides in from left with overlay backdrop

### Font Selection Dropdowns
- **Interaction**: Click input to open dropdown; type to search; click option to select
- **Search**: Real-time filtering of font list
- **Focus**: Opens dropdown; blur (with delay) closes dropdown

### Archetype Selection
- **Interaction**: Click card to toggle selection
- **Constraint**: Max 2 selections; clicking a 3rd deselects the oldest
- **Visual Feedback**: Border and background color change on select

### Image Upload (Moodboard, Logo, Favicon, Stress Test)
- **Interaction**: Drag-and-drop or click to browse
- **Behavior**: File persisted in component state
- **Preview**: Image displayed as full-bleed crop within container

### Export Menu
- **Trigger**: Click "Export" button in toolbar
- **Options**: Export as PDF, Export as PNG
- **Behavior**: Generates images of preview panel; downloads files

### Section Completion Summary
- **Location**: Bottom of sidebar
- **Display**: Checklist of all 6 sections
- **Logic**: Section marked complete when required fields are filled
- **Interaction**: Click item to scroll to that section in form

---

## State Management

### Form State
```
formData = {
  brandName: string,
  industry: string,
  businessWhat: string,
  originStory: string,
  idealAudience: string,
  audiencePain: string,
  whyChooseYou: string,
  competitor1, competitor2, competitor3: string,
  competitorGap: string,
  archetypesSelected: [id, id] (max 2),
  value1Always: string,
  value1Never: string,
  value2Always: string,
  value2Never: string,
  vpAudience: string,
  vpGoal: string,
  vpSystem: string,
  vibeWord1, vibeWord2, vibeWord3, vibeWord4: string,
  headerFont: string,
  bodyFont: string,
  accentFont: string,
  colorPrimary: string,
  colorSecondary: string,
  colorAccent1: string,
  colorAccent2: string,
  logoVariations: [file, file, ...],
  favicon: file,
  moodboardImages: [file, file, ...] (8),
  stressTestImage: file,
  logoUsageRules: string
}
```

### UI State
```
uiState = {
  sidebarOpen: boolean,
  sidebarWidth: number (%), // adjustable width (27–35%)
  isMobile: boolean,
  headerFontOpen: boolean,
  bodyFontOpen: boolean,
  accentFontOpen: boolean,
  exportMenuOpen: boolean,
  summaryMode: boolean // toggle between full/summary text display
}
```

### Computed State
- Section completion flags (foundation, values, visual, stress, moodboard, logos)
- Display text for values (combining "I will always" + "I will never")
- Font availability list (derived from loaded font families)
- Archetype labels for selected items

---

## Design Tokens

### Colors
- **Primary Dark**: #002222 (deep teal)
- **Secondary Teal**: #01817F (bright teal)
- **Accent Gold**: #CB8F16 (warm bronze)
- **Dark Backgrounds**: #051B19 (sidebar), #000000 (headers), #2A2A2A (form inputs), #3A3A3A (cards)
- **Light Backgrounds**: #F4F4F2 (canvas), #CBCBCB (light gray), #ECF2F2 (soft accent)
- **Text**: #1A1A1A (dark), #FFFFFF (white), #CBCBCB (light gray), #808080 (placeholder)
- **Borders**: #999999 (input borders), #000000 (section borders)

### Typography
- **Heading Font**: Caudex (serif), weights 400/700
- **Body Font**: Manrope (sans-serif), weights 400/500/600/700
- **Accent Font**: User-selectable (Poppins or other)

**Type Scale**:
- Section titles: Caudex, 21px, weight 700
- Subsections: Manrope, 12px, weight 400–500
- Labels: Manrope, 11px–12px, weight 400–500
- Body text: Manrope, 11px, weight 400

### Spacing
- Padding (form sections): 24px 32px
- Gap (flex layouts): 8px–24px depending on context
- Border Radius: 6px–8px
- Margin (between sections): 21px–32px

### Shadows
- Form sections: Subtle (0 2px 4px rgba(0,0,0,0.1))
- Modals/dropdowns: Medium (0 4px 12px rgba(0,0,0,0.1))

---

## Files in Handoff Package

- `Brand Strategy Dashboard.dc.html` — Full prototype entry point, all sections/interactions/styling
- `support.js` — Runtime that renders the `.dc.html` template in a plain browser (required, included)
- `image-slot.js` — Drag-and-drop image upload component used by every image slot (required, included)
- `_ds/nicole-dean-creative-design-system-.../` — Full bound design system: token CSS, `styles.css`, `_ds_bundle.js` (required, included)
- `design-tokens.json` — Colors, type scale, spacing, and radii as structured data
- `DESIGN_NOTES.md` — Runtime architecture, external CDN dependencies, state shape, and interaction specs
- `README.md` — This document

No files are referenced that aren't in this package. External CDN dependencies (React, Babel, Google Fonts, html2canvas, jsPDF) are documented in DESIGN_NOTES.md rather than vendored — see that file for why.

---

## Implementation Notes

1. **Font Loading**: Load Caudex and Manrope from Google Fonts. Accent font is user-selectable and should load dynamically.
2. **Image Slots**: Use a performant image upload component that handles drag-and-drop and provides file previews.
3. **Export Functionality**: Use html2canvas or similar to capture the preview panel and generate PDF/PNG downloads.
4. **Responsive Behavior**: Use media queries and JavaScript to detect mobile and adjust layout accordingly.
5. **Accessibility**: Ensure all form inputs have proper labels, focus states, and ARIA attributes. All text meets WCAG AA contrast requirements.
6. **State Persistence**: Consider saving form data to localStorage or a backend so users don't lose work on refresh.

---

## Questions for Developer

- Target framework/stack?
- Any existing design system or component library to use?
- Backend integration needed for file uploads and data storage?
- Export functionality: client-side only, or server-side rendering?
- Should form data persist across sessions?
