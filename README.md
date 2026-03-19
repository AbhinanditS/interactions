# Interaction Lab

A thinking-and-prototyping environment for exploring interactions.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the index.

## Structure

- `app/` - Next.js App Router pages
- `app/prototypes/` - Prototype pages and metadata
- `components/` - Reusable components
- `lib/` - Utility functions and hooks
  - `geometry.ts` - Math utilities for angle and position calculations
  - `usePointer.ts` - Hook for tracking pointer position
  - `useScrollProgress.ts` - Hook for tracking scroll position
- `globals.css` - Minimal global styles

## Prototypes

Each prototype lives in `app/prototypes/[slug]/` with:

- `Prototype.tsx` - Interactive component
- `page.tsx` - Page layout with prose

## Principles

- Writing, code, and interaction live together
- SVG and pointer math over UI frameworks
- No Tailwind, no design system, no visualization libraries
- Every prototype is an explorable surface
