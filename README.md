# Fashionist

A cinematic, scroll-driven fashion lookbook website. The website *is* the lookbook — it doesn't describe the aesthetic, it *embodies* the aesthetic.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Package Manager | pnpm |
| Typography | Noto serif + Inter |
| Animation | GSAP + Lenis |
| Deployment | Vercel (static export) |

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
```

Produces a static export in `out/`.

## Key Features

- **Scroll-driven narrative** — 6 chapters: Title Sequence → Designer Philosophy → Collection Intro → Look Cards → BTS Collage → Contact
- **Grain texture** — Subtle analog film grain overlay for tactile warmth
- **Kraft palette** — Warm neutrals replacing cool grays, matte black UI hardware
- **Asymmetric layouts** — 35/65 philosophy split, bento grid collage
- **Full-bleed imagery** — Editorial magazine format, text-free look cards
- **Scroll animations** — Fade-in reveals, scale-in transitions, staggered grids
- **Accessible** — `prefers-reduced-motion` respected, keyboard navigable, WCAG AA
- **Responsive** — Desktop, tablet, and mobile breakpoints

## GSAP/Lenis Integration Pattern
```tsx
// lib/gsap-registry.ts
'use client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

export function initGSAP() {
  if (typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger, CustomEase)
  CustomEase.create("disruption",  "0.45,0.05,0.55,0.95")
  CustomEase.create("curiosity",   "0.33,0,0.2,1")
  CustomEase.create("respect",     "0.25,0.1,0.25,1")
  CustomEase.create("aspiration",  "0.34,1.56,0.64,1")
  CustomEase.create("intimacy",    "0.4,0,0.6,1")
  CustomEase.create("belonging",   "0.0,0.0,0.2,1")
}
```

## Design System

### Colors

| Token | Hex | Role |
|-------|-----|------|
| Kraft Cream | `#F5F0E8` | Primary background |
| Kraft Beige | `#E8E0D0` | Section alternation |
| Kraft Tan | `#D4C9B8` | Hover states, dividers |
| Matte Black | `#1A1A1A` | Navigation, UI hardware |
| Text | `#2C2C2C` | Body copy |
| Off White | `#FAFAF5` | Inverted sections |

### Typography

- **Noto serif** : Headings, display — `wght` 700–900, `SOFT` axis
- **Inter**: Body copy, labels, captions

### Sections
each sections is separated by an hero image with scrolling effect
- hero section
- looks section
- bts section 
keep the aspect ratio of images

### Motion
Respects `prefers-reduced-motion`.


## License

All rights reserved.
