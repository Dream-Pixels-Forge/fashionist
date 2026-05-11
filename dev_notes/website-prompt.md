# Fashionist — Cinematic Website Prompt

## Creative Brief

- **Type**: Fashion Lookbook / Editorial Portfolio (Visual-First)
- **Audience**: Fashion enthusiasts, stylists, brand collaborators, editorial buyers
- **Goal**: Immerse visitors in the aesthetic. The website *is* the lookbook — embody, don't describe.
- **Tone**: Warm, tactile, editorial, unhurried. Quiet confidence with material presence.
- **Cinematic Reference**: Paolo Sorrentino frame compositions + Wim Wenders documentary pacing. Think: Italian Vogue editorial meets slow cinema.
- **Language**: English

---

## PROJECT

Fashionist is a scroll-driven fashion lookbook. It presents a designer's collection through 6 cinematic chapters — Title Sequence → Designer Philosophy → Collection Intro → Look Cards → BTS Collage → Contact. The aesthetic is "Kraft Palette": warm neutrals (cream, beige, tan) against matte black UI hardware, with subtle analog film grain overlaying full-bleed editorial imagery.

## GOAL

Make visitors *feel* the fabric, *sense* the cut, *understand* the designer's ethos — all through visual storytelling alone. The primary action is not a purchase but a connection: reaching out to the designer.

### RULES — NON NEGOTIABLE

DO:
- Use `pnpm` for all dependency management
- Use Next.js 16 App Router with static export (`output: "export"`)
- Use Tailwind CSS v4 for all styling
- Use GSAP + Lenis for smooth scrolling and scroll-driven animations
- Use Noto Serif (headings) + Inter (body) typography
- Respect `prefers-reduced-motion` globally
- Keep image aspect ratios intact
- Implement the grain texture overlay

DO NOT:
- Override the Kraft color palette (cream/beige/tan/matte black)
- Use generic fashion photography tropes
- Autoplay heavy animations without user initiation
- Animate `width`, `height`, `top`, `left` — only use `transform`
- Use scroll hijacking — Lenis provides smooth scroll without breaking native behavior

---

## STYLE FOUNDATION

**Editorial Warm** — The lookbook as a physical object translated to screen. Grain, texture, weight.

- Full-bleed editorial imagery with generous white/cream space
- Asymmetric 35/65 layout splits for text-image relationships
- Subtle analog grain overlay for tactile warmth
- Strong typographic hierarchy (Noto Serif for presence, Inter for clarity)
- Each section separated by a full-bleed hero image with parallax scroll effect

### COLOR SYSTEM

| Token | Hex | Role |
|-------|-----|------|
| Kraft Cream | `#F5F0E8` | Primary background |
| Kraft Beige | `#E8E0D0` | Section alternation |
| Kraft Tan | `#D4C9B8` | Hover states, dividers |
| Matte Black | `#1A1A1A` | Navigation, UI hardware |
| Text | `#2C2C2C` | Body copy |
| Off White | `#FAFAF5` | Inverted sections |

### TYPOGRAPHY

- **Headings**: Noto Serif — weight 700–900, optical sizing, editorial gravitas
- **Body/UI**: Inter — weight 300–500, clean clarity against the serif warmth
- **Scale**: Hero heading `clamp(3rem, 8vw, 7rem)`, section headings `clamp(2rem, 4vw, 3.5rem)`
- **Letter-spacing**: Headings -0.02em to -0.01em for tight editorial feel

---

## EXPERIENCE STRUCTURE (SCROLL-DRIVEN)

6 chapters, each a near-full-screen section separated by a full-bleed hero transition image with parallax scroll effect. The journey is designed as a film:

| Chapter | Beat | Section |
|---------|------|---------|
| 1 | Hook | Title Sequence (Hero) |
| 2 | Context | Designer Philosophy |
| 3 | Introduction | Collection Intro |
| 4 | Proof | Look Cards Gallery |
| 5 | Depth | BTS Collage |
| 6 | Decision | Contact |

---

## SECTIONS AND BEHAVIORS

### 1. TITLE SEQUENCE — HOOK

Full-screen hero. Full-bleed background image (`hero_section.webp`) with subtle Ken Burns zoom (1.0 → 1.05, 12s). Overlaid with dark gradient (bottom fade to 60% opacity) for text readability. Analog grain overlay.

- Brand name "FASHIONIST" — large, letter-spaced, text-reveal animation (mask bottom-up, 1.2s)
- Tagline in Inter light — fade-up, 0.6s after title reveal
- Scroll-down indicator — gentle bounce (translateY 0 → 8px, 2s loop)
- Grain texture overlay div (fixed position, pointer-events: none)

SCROLL EFFECT:
- Ken Burns zoom on background (continuous)
- Parallax on scroll (0.4× speed)
- Grain overlay remains fixed during parallax

RULES:
- Text must remain readable against the background — use gradient overlay
- Title must be the first thing that draws the eye

SKILLS TO USE:
- dpf-gsap-engineer — ScrollTrigger for pinning + parallax, text reveal timeline

---

### 2. DESIGNER PHILOSOPHY — CONTEXT

Asymmetric 35/65 split layout. Left column (35%): text content. Right column (65%): `designer-portrait.webp` full-height image.

- Section label "THE PHILOSOPHY" — small uppercase, tracked
- Block quote from designer — large serif italic, noto serif
- Short paragraph describing the ethos
- "SCROLL TO EXPLORE" micro-text at bottom

SCROLL EFFECT:
- Text content fades up on entry (0.7s, cubic-bezier)
- Image panel has subtle parallax (0.5× speed)
- Stagger: label → quote → paragraph (0.15s intervals)
- Background shifts from Kraft Cream to Kraft Beige on scroll through

---

### 3. COLLECTION INTRO — INTRODUCTION

Full-bleed transition image (`looks-hero.webp`) with parallax. Then a bento-grid layout introducing the collection themes.

- Full-bleed hero transition image with parallax (0.5× speed, pinned for 60vh scroll)
- Below: 3-column bento grid with collection highlights
- Each card: image + collection name + season/year
- Subtle staggered fade-in on scroll

SCROLL EFFECT:
- Hero image: pin + parallax as section enters
- Bento grid: staggered fade-up cards (0.12s delay each)
- Background toggles between Kraft Beige and Kraft Cream

HOVER:
- Bento cards: scale 1.02, image within card scales 1.05 (parent-child transform)

---

### 4. LOOK CARDS — PROOF

Full-bleed full-viewport look cards. 5 looks (look-01 through look-05). Each is a full-screen image with look number overlaid. Horizontal scroll alternative: vertical scroll with full-viewport snap sections.

- Each look is a full-viewport section
- Image fills the viewport (object-fit: cover)
- Look number in bottom-right corner — "01/05", "02/05", etc.
- Minimal — no text other than the look number
- Next look indicator (small arrow or line)

SCROLL EFFECT:
- Full-viewport snap scrolling between looks (CSS scroll-snap-type: y mandatory)
- Each look fades in as it enters viewport
- Image scale subtle entrance (0.98 → 1.0, 1.2s)
- Look number slides in from below (0.6s, 0.3s after section enters)

RULES:
- No text overlays on the garments themselves
- Keep original aspect ratios
- Must work on all screen sizes

---

### 5. BTS COLLAGE — DEPTH

Full-bleed transition image (`bts-hero.webp`) with parallax. Then a dynamic bento grid collage of behind-the-scenes imagery.

- Hero transition image with parallax (0.5× speed)
- Bento grid: 2-3-2 asymmetrical layout (7 images: bts-01 through bts-07)
- Images at varying aspect ratios creating a magazine collage feel
- Section label "BEHIND THE SEAMS"

SCROLL EFFECT:
- Hero image: pin + parallax
- Bento grid: staggered fade-in with some images sliding from left, others from right
- Images scale slightly on hover (1.03)
- Background: Kraft Beige

---

### 6. CONTACT — DECISION

Minimal contact section with brand mark and connection points. Clean, uncluttered.

- Brand mark/logo centered
- Contact email/button
- Social links (icon-only)
- Copyright notice

SCROLL EFFECT:
- Elements fade up on entry (stagger: 0.15s)
- Button has subtle pulse idle animation (scale 1.0 → 1.02, 2s loop)
- Background: Matte Black with Off White text (inverted)

HOVER:
- Contact button: background fill animation
- Social icons: subtle lift (translateY -2px, 0.2s)

---

## ANIMATION SYSTEM

**PHILOSOPHY:** One well-orchestrated moment beats scattered micro-interactions. Prioritize scroll-driven, user-initiated animations over autoplay.

### GLOBAL BEHAVIOR

- Smooth scrolling via Lenis
- **Scroll-triggered animations only** — no autoplay heavy features
- Hero section: animate on page load (set initial state + immediate trigger)
- First viewport sections: animate immediately on scroll trigger (10% in view)
- Deeper sections: use delayed triggers (element 20% in view)
- Duration range: 500ms–1200ms
- Primary easing: CustomEase named curves (see GSAP registry)

### CUSTOM EASE CURVES (from gsap-registry.ts)

| Name | Curve | Use |
|------|-------|-----|
| disruption | `0.45,0.05,0.55,0.95` | Hero reveals, dramatic entrances |
| curiosity | `0.33,0,0.2,1` | Section heading reveals |
| respect | `0.25,0.1,0.25,1` | Text content fades |
| aspiration | `0.34,1.56,0.64,1` | Scroll-down indicator, CTAs |
| intimacy | `0.4,0,0.6,1` | Look card number reveals |
| belonging | `0.0,0.0,0.2,1` | BTS collage entries |

### EFFECTS TO USE (Priority Order)

1. **Fade-up** — Default reveal for text/blocks (30–40px travel, 0.6s)
2. **Stagger** — Card grids, bento items (0.1–0.15s delay)
3. **Parallax** — Hero backgrounds, full-bleed transition images (0.4–0.6× speed)
4. **Scale** — Hover states, CTAs, look card entrances
5. **Text Reveal** — Hero title, section headings (mask bottom-up, 0.8s)
6. **Ken Burns** — Hero background image (1.0 → 1.05, 12s continuous)

### PERFORMANCE RULES (Non-Negotiable)

- Max 3 concurrent animated elements at any time
- **Never** animate `width`, `height`, or `top/left` — use `transform` only
- Use `will-change: transform` on parallax elements
- Disable complex animations on lower-end devices
- Lazy-load GSAP only when needed in client components

### SCROLL BEHAVIOR

- **Lenis** for smooth scrolling (native-feel with lerp: 0.1)
- **GSAP ScrollTrigger** for scroll-linked animations
- **Intersection Observer** as fallback for simple reveals
- Scroll speed cap: don't exceed 0.6× scroll multiplier

### REDUCED MOTION ACCESSIBILITY (Required)

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .grain-overlay { display: none; }
  .parallax-layer { transform: none !important; }
}
```

### SECTION-SPECIFIC RECIPES

**Hero Section:**
1. Background: Ken Burns (scale 1.0 → 1.05, 12s)
2. Headline: Text reveal, mask from bottom, 1.2s
3. Tagline: Fade-up, 0.6s, 400ms delay
4. Scroll indicator: Gentle bounce (translateY 0 → 8px, 2s loop)

**Look Cards:**
1. Each look: full viewport, scroll-snap
2. Image entrance: scale 0.98 → 1.0, 1.2s
3. Look number: slide-in from below, 0.6s
4. Transition: cross-fade between looks

**Bento Grid (BTS):**
1. Section heading: fade-up on scroll enter
2. Images: staggered fade-up, 0.12s intervals
3. Alternating entry direction (left/right slide for variety)
4. Hover: scale 1.03, 200ms ease

**Contact:**
1. Background: matte black (inverted)
2. Elements: fade-up stagger 0.15s
3. CTA button: pulse idle (scale 1.0 → 1.02, 2s)
4. Social links: lift on hover (translateY -2px)

### TOOLS & LIBRARIES

- **Framework**: Next.js 16 App Router, static export
- **Animation**: GSAP + ScrollTrigger + CustomEase
- **Scroll**: Lenis (smooth scroll)
- **Styling**: Tailwind CSS v4
- **Fonts**: Noto Serif (Google Fonts), Inter (Google Fonts)

SKILLS TO USE:
- dpf-gsap-engineer — ScrollTrigger pinning, parallax, text reveals, timeline sequencing
- dpf-movematics — Animation taxonomy, performance optimization, accessibility
- dpf-senior-tailwindcss-designer — Tailwind v4 configuration, custom theme, responsive design

---

## LAYOUT RULES

- Max width: `1440px` for content sections (hero and transition images are full-bleed)
- Grid: 12-column desktop, 4-column tablet, 2-column mobile
- Vertical section spacing: `clamp(80px, 12vh, 160px)` between content sections
- Full-bleed transition images: `100vw` (no max-width constraint)
- Padding: `clamp(1rem, 3vw, 4rem)` on content containers

---

## IMAGERY

- **Style**: Editorial fashion photography with natural lighting
- **Color grading**: Warm-toned, slightly desaturated, film-like
- **Grain**: Subtle analog film grain overlay (CSS pseudo-element or SVG filter)
- **Aspect ratios**: Keep original — no cropping distortion
- **Transitions**: Full-bleed hero images separate each chapter

---

## COMPONENT STYLE

Buttons:
- Border radius: `0px` (square, editorial)
- Primary: Matte Black background, Off White text
- Hover: Off White background, Matte Black text (invert)
- Transition: 0.3s ease
- Padding: `0.75rem 2rem`

Cards:
- Background: transparent or Kraft Cream (depending on parent)
- Border: `1px solid` Kraft Tan
- Border radius: `0px`
- Overflow: hidden (for image scale on hover)

Navigation:
- Fixed top, matte black, transparent on hero
- Logo left, nav links right
- Background shifts to solid on scroll past hero
- Links: Inter uppercase, tracking-wider, 0.75rem

Grain Overlay:
- Fixed position, full viewport
- Pointer-events: none, z-index: 9999
- Mix-blend-mode: overlay or soft-light
- Opacity: 0.03–0.06 (very subtle)
- CSS: repeating-conic-gradient or SVG noise filter

---

## EXPERIENCE PRINCIPLES

1. **The website IS the lookbook** — don't describe the aesthetic, embody it. Every pixel serves the editorial feel.
2. **Restraint is confidence** — fewer elements, more impact. Let images breathe with generous white space.
3. **Scroll as narrative device** — each chapter builds on the last. The visitor is guided, not pushed.
4. **Tactile warmth** — grain, texture, warm neutrals create a physical feeling in a digital medium.
5. **Mobile is not an afterthought** — the lookbook experience must translate to mobile with equal impact.

---

## OUTPUT FORMAT

Generate:
- A cinematic scrollable website with 6 chapters
- Smooth scroll (Lenis) with GSAP-powered scroll-triggered animations
- Full-bleed editorial imagery with parallax transitions between chapters
- Grain texture overlay for analog warmth
- Fully responsive (desktop, tablet, mobile)
- Static export ready for Vercel deployment
