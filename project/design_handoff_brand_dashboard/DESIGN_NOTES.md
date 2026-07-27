# Design Notes: Brand Creative Dashboard

## Runtime architecture (read this first)

This prototype is a **Design Component (`.dc.html`)** file, not a plain static page. It works like this:

1. `Brand Strategy Dashboard.dc.html` contains a `<x-dc>` template with `{{ }}` data-binding holes, `<sc-for>`/`<sc-if>` control-flow tags, and a `<script data-dc-script>` logic class — this is the authoring format, not the rendered output.
2. `support.js` (included in this package) is the runtime that parses that document, loads React/ReactDOM/Babel from CDN, and renders the template to the DOM in the browser. **This is why the previous export showed raw `{{ placeholder }}` text** — `support.js` was missing, so nothing ever interpreted the template.
3. `image-slot.js` (included) is a small custom element (`<image-slot>`) used for every drag-and-drop image upload area (logo, favicon, moodboard tiles, stress-test previews).
4. The `_ds/` folder (included, full) is the bound design system — token CSS, `styles.css`, and `_ds_bundle.js` (compiled UI primitives: Button, Input, Card, Heading, Badge).

Open `Brand Strategy Dashboard.dc.html` directly in a browser (double-click, or `python3 -m http.server` and visit it) with an internet connection — no build step. Do not treat the `.dc.html` source (the `{{ }}` holes, `<sc-for>`, `x-import` tags) as syntax to port literally into your framework; it is a templating layer specific to this prototyping tool. Port the **rendered result** (DOM structure, styles, states, copy) described below and in the README.

## External CDN dependencies (not vendored)

`support.js` fetches these at runtime; the file references them by URL, so a network connection is required the first time the page loads:
- `react@18.3.1` / `react-dom@18.3.1` (unpkg) — the rendering engine itself
- `@babel/standalone@7.29.0` (unpkg) — transpiles the logic class in-browser
- Google Fonts: Manrope, Poppins, Caudex
- `html2canvas@1.4.1` and `jspdf@2.5.1` (cdnjs) — power the Export PDF/PNG buttons

These were left as CDN links rather than vendored inline: they're standard, versioned, publicly-hosted open-source libraries with subresource-integrity hashes already pinned in `support.js`, and inlining ~1MB+ of minified library code into the HTML would make the file unwieldy for a developer to read. If you need a fully offline copy, download each URL above and swap the `<script src>`/CDN reference for a local path — no other changes required.

## State shape

```js
formData = {
  brandName, industry, businessWhat, originStory,
  idealAudience, audiencePain, whyChooseYou,
  competitor1, competitor2, competitor3, competitorGap,
  archetypesSelected: [id, id],       // max 2
  value1Always, value1Never, value2Always, value2Never,
  vpAudience, vpGoal, vpSystem,
  vibeWord1, vibeWord2, vibeWord3, vibeWord4,
  headerFont, bodyFont, accentFont,
  colorPrimary, colorSecondary, colorAccent1, colorAccent2,
  logoVariations: [file, ...], favicon: file,
  moodboardImages: [file, ...] /* 8 */, stressTestImage: file,
  logoUsageRules
}

uiState = {
  sidebarOpen, sidebarWidth /* 27–35% */, isMobile,
  headerFontOpen, bodyFontOpen, accentFontOpen,
  exportMenuOpen, summaryMode
}
```

Computed: per-section completion flags (used by the sidebar checklist), combined "always/never" value display strings, filtered font list for the searchable dropdowns, archetype labels for the 2 selected cards.

## Interactive behaviors to reproduce exactly

- **Sidebar collapse/expand** — click toggle, animates width (0.25s ease) between collapsed (40px icon rail) and expanded (27–35vw).
- **Archetype selection** — click a card in the 6-card grid to select; max 2 selected at once; selecting a 3rd deselects the oldest (FIFO), not a hard block.
- **Font dropdowns** (header/body/accent) — click to open, type to filter the list live, click a row to select and close; blur closes after a short delay so click-selection registers first.
- **Image upload slots** — drag-and-drop or click-to-browse; stores the file in memory and swaps in a cropped preview; the Primary Logo upload also mirrors into the stress-test preview slots automatically.
- **Section-completion checklist** — bottom of sidebar; each of the 6 sections shows complete/incomplete based on its required fields; clicking an item scrolls the form to that section.
- **Export menu** — toolbar button opens a small menu with "Export as PDF" / "Export as PNG", using html2canvas + jsPDF against the live preview panel.

## Verified locally

Sidebar collapse, archetype max-2 selection, font dropdown search/select, image-slot drag-and-drop, and the section-completion checklist were all clicked through in this package before export and behave as described above.
