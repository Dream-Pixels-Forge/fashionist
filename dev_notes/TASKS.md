# Tasks

## Completed
| Task | Status | Notes |
|------|--------|-------|
| Cinematic website prompt | ✅ Done | Saved to dev_notes/website-prompt.md |
| Next.js 16 scaffold | ✅ Done | pnpm, TS, Tailwind v4, static export |
| GSAP + Lenis setup | ✅ Done | 6 CustomEase curves |
| Font configuration | ✅ Done | Noto Serif + Inter via @fontsource (self-hosted, latin-only) |
| Navigation | ✅ Done | Scroll-aware, mobile menu, Lenis scrollTo |
| HeroSection | ✅ Done | Ken Burns, text reveal, parallax, deco elements |
| PhilosophySection | ✅ Done | 35/65 split, stagger reveals, deco compass |
| CollectionIntro | ✅ Done | Transition hero + bento grid, deco bag |
| LookCards | ✅ Done | 5 full-viewport look images, horizontal accordion |
| BtsCollage | ✅ Done | Transition hero + 2-3-2 bento grid |
| ContactSection | ✅ Done | Inverted, CTA, social links, deco elements |
| Grain overlay | ✅ Done | SVG noise with CSS breathe animation (no JS rAF) |
| DecoElement component | ✅ Done | Floating deco with GSAP float/parallax/entrance |
| Image optimization | ✅ Done | width/height attrs on all img tags, hero preload |
| Font optimization | ✅ Done | Latin-only subsets, post-build woff stripping |
| Build verification | ✅ Done | pnpm build passes, static export 3.4 MB |

## Completed (This Session)
| Task | Status | Notes |
|------|--------|-------|
| ESLint configuration | ✅ Done | eslint + typescript-eslint + next/next + react-hooks, flat config, 0 warnings |
| ScrollTrigger registration fix | ✅ Done | Moved gsap.registerPlugin to module level (child effects fire before parent) |
| Mobile layout capture | ✅ Done | Playwright tests at 375×812, 768×1024, 1440×900, 1920×1080 |
| Layout validation | ✅ Done | No text clipping, all 6 sections visible, all nav scrolls work |
| Performance audit | ✅ Done | 444ms total load time (before ScrollTrigger fix: 2168ms) |
| Build verification | ✅ Done | pnpm build passes, static export 3.4 MB, 0 errors |

## Completed (This Session)
| Task | Status | Notes |
|------|--------|-------|
| Vercel Analytics | ✅ Done | @vercel/analytics added to root layout |
| Vercel deployment | ✅ Done | Live at https://fashionist-six.vercel.app |

## Future Considerations
| Task | Priority | Notes |
|------|----------|-------|
| Image optimization | Low | Compress hero_section.webp (277 KB) and look-01.webp (156 KB) further |
| Lighthouse CI | Low | Add Lighthouse CI to test pipeline for regression detection |
