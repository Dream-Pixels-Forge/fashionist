# Changelog

## [0.1.0] — 2026-05-11

### Added
- **Next.js 16 App Router** scaffold with TypeScript and static export
- **Tailwind CSS v4** integration with custom Kraft color theme
- **GSAP + Lenis** smooth scroll and scroll-driven animation system
- **6 CustomEase curves**: disruption, curiosity, respect, aspiration, intimacy, belonging

### Sections Implemented
- **HeroSection** — Full-screen title sequence with Ken Burns zoom, text reveal, parallax background, scroll indicator
- **PhilosophySection** — 35/65 asymmetric split with designer portrait, staggered text reveals, image parallax
- **CollectionIntro** — Full-bleed transition hero image with parallax + 3-column bento collection grid
- **LookCards** — 5 full-viewport editorial look images with scale entrance animations and look number overlays
- **BtsCollage** — Full-bleed transition hero + asymmetrical 2-3-2 bento grid collage of 7 BTS images
- **ContactSection** — Inverted matte-black contact section with grain overlay, CTA, social links, pulse animation

### Features
- Analog film grain overlay (SVG noise, mix-blend-mode)
- Responsive navigation with scroll-aware background and mobile hamburger menu
- `prefers-reduced-motion` accessibility support
- Static export (`output: "export"`)
- Lazy-loaded images with `loading="lazy"`
- Hover effects (scale, lift) on cards, images, and social links
- Decorative fashion element SVGs (ruler, scissors, compass, bag, heel) with GSAP float/parallax/entrance
- @fontsource self-hosted fonts (Noto Serif + Inter, latin-only subsets)
- Width/height attributes on all `<img>` tags for CLS prevention
- Post-build optimization script strips .woff files (keeps only .woff2)
- Hero image preloaded via `<link rel="preload">`

## [0.2.0] — 2026-05-11

### Added
- **ESLint flat config** with typescript-eslint, @next/eslint-plugin-next, eslint-plugin-react-hooks
- **Playwright layout test suite** — 4 viewport screenshots, section visibility, nav scroll, text clipping detection
- **Performance audit** — Navigation Timing + resource breakdown
- **Test scripts**: `pnpm test`, `pnpm test:ui`, `pnpm lint:fix`

### Fixed
- **ScrollTrigger registration timing** — Moved `gsap.registerPlugin(ScrollTrigger)` to module level.
  React fires child `useEffect` hooks before parent hooks, so registering ScrollTrigger
  inside `initGSAP()` (called from Home's useEffect) was too late — child section components
  created ScrollTrigger-driven animations before the plugin was registered.
  Fixed by registering eagerly at module load time. Load time improved from 2168ms → 444ms.

### Changed
- `pnpm lint` now uses `eslint src/` directly (Next.js 16's `next lint` has path resolution issues)
- Updated `dev_notes/TASKS.md` and `dev_notes/PROGRESS.md` with completed items

### Security
- No changes (static site, no user input or data handling)
