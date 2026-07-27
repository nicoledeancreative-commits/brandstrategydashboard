# Brand Strategy Dashboard

A brand-strategy intake tool: fill out a form describing a brand (foundation, values,
visual direction, stress tests, moodboard, logo variations) and see a live, styled
preview build itself alongside it. Supports multiple saved brand projects.

Built from a Claude Design handoff (`.dc.html` prototype) as a full Next.js app —
see `../README.md` and `../chats/` in the repo root for the original design source.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** + **shadcn/ui** (`new-york` style) for app chrome (project list,
  dialogs, dropdown menu, toasts). The brand-dashboard editor itself is hand-styled to
  match the design prototype pixel-for-pixel.
- **Prisma** + **SQLite** (via `@prisma/adapter-better-sqlite3`) for persistence —
  one `Project` row per saved brand dashboard.
- Uploaded images are written to `public/uploads/` and referenced by URL.
- `html2canvas` + `jsPDF` power the toolbar's Export as PDF/PNG.

## Getting started

```bash
npm install
npx prisma migrate deploy   # creates dev.db from the committed migrations
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page lists saved brand
projects; "New Project" creates one and opens its editor at `/project/[id]`.

## Data model

See `prisma/schema.prisma` for the full `Project` shape. Array-ish fields
(`archetypesSelected`, `moodboardImages`, `logoVariations`) are stored as JSON text
columns since SQLite has no native list type — see `src/lib/project-serializer.ts`
for the (de)serialization.

## Notable implementation choices

- **Save vs. persist-immediately**: text/color/font field edits update local state
  only until you click **Save** (matches the original prototype's behavior). Image
  uploads and removals persist to the backend immediately, independent of Save.
- **Image editing**: uploads support drag-and-drop and click-to-browse with
  replace/remove controls, but not the original prototype's pan/zoom crop-reframe
  interaction — that was specific to the design tool's own persistence model.
- **Fonts**: the header/body/accent font pickers eagerly load Google Fonts
  stylesheets for every visible option (same as the original design). Export
  temporarily disables all but the three fonts actually in use, both because
  html2canvas's document clone re-resolves every stylesheet it finds (slow with
  ~180 of them) and because Tailwind's default oklch()-based theme isn't parseable
  by html2canvas at all — this app's theme uses hsl() instead for that reason.
- **No auth**: every saved project is visible to anyone who can reach the app, by
  design (matches what was scoped for this build).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` / `npm start` — production build and serve
- `npx prisma studio` — browse/edit the SQLite data directly
- `npx prisma migrate dev --name <name>` — after changing `schema.prisma`
