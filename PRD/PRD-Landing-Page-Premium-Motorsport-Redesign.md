# SynchroTech Landing Page — Premium Motorsport Redesign

## Context

The current landing page (`app/page.tsx`, ~905 lines, single file) is a light-themed, generic SaaS layout styled with plain CSS in `app/globals.css`. The goal is a full redesign into a premium dark motorsport-telemetry brand (Porsche Motorsport / Linear / Vercel caliber): almost-black `#07070A` background, deep/electric purple + orange `#FF8A00` accents, massive typography, Framer Motion micro-interactions, and cinematic CSS-generated visuals (no stock photos — user confirmed).

**User decisions:**
- **Full Tailwind CSS v4 + shadcn/ui migration** (new stack, per command)
- **CSS-driven cinematic visuals** (gradients/grid/glow + existing `demo.webm` + live telemetry mockups; no photos)

**Must preserve:** SynchroTech branding, EN/ID bilingual toggle + all translation content, contact form Gmail flow, Coming Soon overlay behavior, admin pages (`/admin/*` — they use existing globals.css classes and must not break), SEO metadata, accessibility.

**Already installed:** framer-motion v12, lucide-react, Next 16 App Router, React 19.

## Approach

### 1. Install & configure stack
- `npm i -D tailwindcss @tailwindcss/postcss` (Tailwind v4, CSS-first config — no tailwind.config.js needed)
- Add `postcss.config.mjs` with `@tailwindcss/postcss` plugin
- shadcn/ui: `npx shadcn@latest init` (style: new-york, base color: neutral, CSS variables). Add components: `button`, `card`, `input`, `textarea`, `label`, `badge`. This creates `components/ui/*`, `lib/utils.ts` (cn helper), and installs `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`.
- Fonts in `app/layout.tsx` via `next/font/google`: **Space Grotesk** (display/headings), **Inter** (body), **JetBrains Mono** (telemetry numbers/labels). Drop Outfit.

### 2. Restructure globals.css
- Top of file: `@import "tailwindcss";` + `@theme` block defining brand tokens:
  - `--color-background: #07070A`, `--color-surface: #0D0D14`, deep purple `#1A0A2E`, electric purple `#A855F7`, orange `#FF8A00`, text white/zinc grays
  - Font variables mapped to next/font vars
- Keep ALL existing admin/login/modal/table CSS classes below the Tailwind import (admin pages depend on them). Verify preflight doesn't visually break admin (their styles are explicit per-class, low risk; check in browser).
- Delete landing-page-only CSS classes that get replaced (hero, card-grid, footer, contact, etc.) once new components land.

### 3. New component architecture
Break the monolith into `components/landing/`:

```
components/
  landing/
    navbar.tsx          — floating, blur bg, shrinks on scroll (useScroll), mobile menu
    hero.tsx            — full-screen, massive Space Grotesk headline, stagger/blur reveal,
                          animated grid + glow orbs bg, animated stat counters (25Hz GNSS,
                          24-bit ADC, 4G LTE), dual CTA
    products.tsx        — 3 hardware cards (Joulemeter / Nexus One / Display) as spotlight
                          cards with glow border on hover; live Display mockup kept (lap timer)
    features.tsx        — bento grid (wireless / IO / IMU + telemetry stats), asymmetric
    software.tsx        — Podium dashboard section: sticky text left, demo.webm in premium
                          browser shell right, parallax on scroll
    metrics.tsx         — full-width performance metrics band, monospace animated counters
    contact.tsx         — glass info card + shadcn form (Input/Textarea/Button), keep
                          Gmail/mailto submit logic exactly as-is
    cta.tsx             — final CTA with pulse-glow
    footer.tsx          — dark minimal footer, keep all links/socials/coming-soon triggers
    coming-soon.tsx     — extract existing ComingSoon overlay, restyle to new tokens
  motion/
    reveal.tsx          — viewport reveal wrapper (whileInView, respects useReducedMotion)
    counter.tsx         — animated number counter (useSpring/useInView)
  ui/                   — shadcn components
lib/
  i18n.ts               — move translations object + t() helper out of page.tsx
```

`app/page.tsx` becomes a thin client composition (~80 lines): lang state, coming-soon state, section list. State passed via props (no context needed — shallow tree).

### 4. Design system rules (applied across all sections)
- Dark `#07070A` everywhere; color only for hierarchy (purple = interactive/brand, orange = highlight/data)
- Typography: Space Grotesk uppercase tracking-tight for h1/h2 (hero ~ `text-6xl md:text-8xl`), Inter for body, JetBrains Mono for every number/technical label
- Buttons: `rounded-xl`, soft shadow, purple glow on hover, spring whileHover/whileTap
- Cards: thin `border-white/8`, `bg-white/[0.03]`, backdrop-blur, hover lift + border glow
- Sections: generous py-24/py-32, alternating asymmetric compositions
- All motion behind `useReducedMotion` guard; transform/opacity only (no layout animation)
- Semantic HTML + aria labels preserved from current page; visible focus rings (`focus-visible:ring`)

### 5. SEO & metadata
- Keep/extend `metadata` in layout.tsx (add openGraph). `html lang="id"` stays.

## Files changed
- **New:** `postcss.config.mjs`, `components.json`, `components/ui/*` (shadcn), `components/landing/*` (10 files), `components/motion/*` (2), `lib/i18n.ts`, `lib/utils.ts`
- **Modified:** `package.json`, `app/layout.tsx` (fonts), `app/globals.css` (tailwind import + tokens; prune replaced landing CSS), `app/page.tsx` (rewritten as composition)
- **Untouched:** all `/admin/*` pages, `/api/*`, prisma, `lib/db|auth|crypto|license`

## Verification
1. `npm run dev` → browse `http://localhost:3000`
2. Landing: hero animations, nav scroll shrink, card hovers, counters, video section, lang toggle EN↔ID (all strings switch), contact form submit → Gmail tab opens, coming-soon overlay triggers + back button
3. Admin regression: `/admin/login` and `/admin` render unchanged (globals.css classes intact)
4. Responsive: check 375px / 768px / 1024px / 1440px viewports
5. `prefers-reduced-motion` emulation → no animations
6. `npm run build` passes
