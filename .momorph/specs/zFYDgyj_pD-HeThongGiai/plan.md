# Implementation Plan: Hệ thống giải (Award System)

**Frame**: `zFYDgyj_pD-HeThongGiai`
**Date**: 2026-04-09
**Spec**: `specs/zFYDgyj_pD-HeThongGiai/spec.md`

---

## Summary

Build the Award System screen — a full-page two-column layout presenting all 6 SAA 2025 award categories with sticky left-side navigation (scroll-spy), award cards with images, and a Sun\* Kudos promotional block. The page is a React Server Component fetching semi-static award data, with a thin client wrapper for IntersectionObserver-based scroll spying. Route: `/awards`.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 15 App Router
**Primary Dependencies**: React 19, TailwindCSS v4, next/image, next/font
**Database**: Supabase (PostgreSQL + RLS) — award data may be static initially
**Testing**: Vitest (unit), Playwright (E2E)
**State Management**: Minimal — single `activeCategory` state in client component
**API Style**: REST (GET /api/awards) or static data import
**Edge Runtime**: Cloudflare Workers via @opennextjs/cloudflare

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **I. TypeScript-First** — strict mode, explicit types for all award entities and component props
- [x] **II. RSC by Default** — page.tsx is a Server Component; only scroll-spy wrapper + nav are client components
- [x] **III. Supabase Backend** — auth via middleware (getUser), award data via Supabase or static fallback
- [x] **IV. Edge-Compatible** — no Node.js APIs; IntersectionObserver is browser-side only (client component)
- [x] **V. Design-Token UI** — all tokens from design-style.md added to globals.css, consumed via Tailwind/var()
- [x] **VI. Responsive Design** — mobile-first, breakpoints 375px/768px/1280px, 44px touch targets
- [x] **VII. Secure by Default** — session validation via Supabase middleware (A01), no secrets in client

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Pattern**: Feature-based under `src/components/awards/`. Shared components (`Header`, `Footer`) are reused from `src/components/layout/`.
- **RSC / Client Split**:
  - `page.tsx` (RSC) — fetches award data server-side, renders static content
  - `AwardsCategoryNav` (client) — IntersectionObserver scroll-spy, click→smooth-scroll
  - `Header`, `Footer`, `NavLinks` — already exist as client components with `activeNav` path detection
- **Styling**: Tailwind utilities with CSS variables from `globals.css`. New design tokens added to `:root`.
- **Data Fetching**: Server-side in `page.tsx` via `src/services/award-service.ts` (constitution: no business logic in page.tsx). Initially imports static data from `src/data/awards-detail.ts`. When API is ready, switch to Supabase query with `unstable_cache`.
- **Image Strategy**: `next/image` with `priority` on the first card image (Top Talent — above the fold) and lazy loading for cards 2–6 (336×336px). `mix-blend-mode: screen` applied via wrapper div (not directly on `<Image>` since blend mode doesn't work on the `<img>` element). `sizes="336px"` attribute for proper responsive srcset.

### Backend Approach

- **API**: `GET /api/awards` — optional. Initially, award data is hardcoded in `src/data/awards-detail.ts`.
- **Database**: `awards` table in Supabase (future). Schema: `id, slug, name, description_vi, description_en, quantity, unit_type, prize_value, image_url, display_order`.
- **Validation**: Not applicable (read-only page, no user input).

### Integration Points

- **Existing Components**: `<Header />` (reuse as-is — active nav state is handled automatically by `NavLinks.tsx` via `usePathname()`, NOT via an `activeNav` prop. `Header` only accepts `variant?: "sticky" | "overlay"`), `<Footer />` (same — path detection built-in), `<NavLinks />` (already has `/awards` route).
- **NavLinks design deviations (accepted)**: Current `NavLinks.tsx` uses 14px/20px font and no `text-shadow` on active state. Design-style specifies 16px/24px and glow `text-shadow`. These are pre-existing deviations affecting all pages — fixing them is out of scope for this feature. If desired, add `NavLinks.tsx` update to a separate ticket.
- **Component Naming**: Plan uses `AwardDetailCard`, `AwardDetailImage`, `AwardDetailContent` to avoid naming collisions with existing homepage components (`AwardCard.tsx`, `AwardCardImage.tsx`). The design-style.md Implementation Mapping table uses shorter names (`<AwardCard />`, `<AwardImage />`). **Plan names take precedence** — they are the implementation-ready names.
- **Existing Data**: `src/data/awards.ts` has homepage-level award data (slug, name, short description, thumbnail). This screen needs **extended** data (full description, quantity, unit_type, prize_value). Create `awards-detail.ts`.
- **Existing i18n**: `src/libs/i18n/homepage.ts` already has `awardsSection` translations. Extend with award-detail-level strings or create `src/libs/i18n/awards.ts`.
- **Auth**: Supabase middleware already redirects unauthenticated users to `/login`.

---

## Project Structure

### Documentation

```text
.momorph/specs/zFYDgyj_pD-HeThongGiai/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design specifications ✅
├── plan.md              # This file ✅
└── tasks.md             # Task breakdown (next step)
```

### New Files

| File | Purpose |
|------|---------|
| `src/app/awards/page.tsx` | Award System page (RSC) with `generateMetadata`. Delegates data fetching to service layer. |
| `src/app/awards/loading.tsx` | Skeleton loading state (matches card layout) |
| `src/app/awards/error.tsx` | Error boundary with retry (follows `src/app/(home)/error.tsx` pattern) |
| `src/components/awards/AwardSystemHero.tsx` | Keyvisual hero banner with gradient overlay |
| `src/components/awards/AwardsTitleSection.tsx` | Root Further Logo (338×150px) + sub-heading + divider + main heading |
| `src/components/awards/AwardsCategoryNav.tsx` | Sticky left nav with scroll-spy — `"use client"` (IntersectionObserver, click handlers). Owns the `activeCategory` state and renders `CategoryNavItem` inline. |
| `src/components/awards/CategoryNavItem.tsx` | Individual nav menu item — also `"use client"` since it receives an `onClick` callback (functions are not serializable, so this cannot be a server component). Extracted for readability, not for RSC boundary. |
| `src/components/awards/AwardDetailCard.tsx` | Full award card (image + content + dividers) |
| `src/components/awards/AwardDetailImage.tsx` | Award image with glow, border, `mix-blend-mode: screen` via wrapper div |
| `src/components/awards/AwardDetailContent.tsx` | Card content: title, description, quantity, value. Handles Signature 2025 dual-value variant via `prizeValues` array. |
| `src/components/awards/SunKudosPromo.tsx` | Sun\* Kudos promotional block with CTA |
| `src/services/award-service.ts` | Service layer: `getAwardDetails()` — currently imports static data, future: Supabase query with `unstable_cache`. Constitution mandates no business logic in `page.tsx`. |
| `src/data/awards-detail.ts` | Static award data (full descriptions, quantities, values) for all 6 categories |
| `src/libs/i18n/awards.ts` | i18n strings for award system page (vi + en). Japanese strings are a placeholder — see Note below. |
| `src/types/award.ts` | TypeScript types: `AwardDetail`, `AwardPrizeValue` |

### Modified Files

| File | Changes |
|------|---------|
| `src/app/globals.css` | Add **new** tokens (not yet in `:root`): `--color-notification-dot: #D4271D`, `--spacing-page-px: 144px`, `--spacing-page-py: 96px`, `--spacing-card-inner-gap: 40px`, `--spacing-card-text-gap: 24px`, `--spacing-card-section-gap: 32px`, `--spacing-menu-gap: 16px`, `--spacing-menu-content-gap: 80px`, `--spacing-nav-item-padding: 16px`, `--spacing-title-gap: 16px`, border/radius tokens (`--radius-award-image: 24px`, `--radius-card-content: 16px`). **Reuse existing**: `--shadow-widget` (= `--shadow-award-image`), `--spacing-section-gap: 120px` ✅, `--spacing-awards-row-gap: 80px` (= `--spacing-award-gap`) ✅, `--color-bg-dark` ✅, `--color-accent-yellow` ✅, `--color-divider` ✅, `--color-homepage-header-bg` ✅. |

> **Note**: `src/app/(home)/layout.tsx` does NOT exist and is NOT needed. The homepage lives at `src/app/page.tsx` (root). The awards page will be at `src/app/awards/page.tsx` — a sibling route, not nested under `(home)`.

### Dependencies

| Package | Version | Purpose | Status |
|---------|---------|---------|--------|
| `next/image` | (built-in) | Image optimization | Exists |
| `react` | 19.x | IntersectionObserver via `useEffect` | Exists |
| TailwindCSS | v4 | Styling | Exists |
| `vitest` + `@testing-library/react` | latest | Unit tests | **Must install** — not in `devDependencies` yet |

> **Decision**: If Vitest setup is out of scope for this feature, unit tests can be deferred and the plan updated to E2E-only via Playwright (also not yet installed). Flag this during task breakdown.

---

## Implementation Strategy

### Phase 0: Asset Preparation & Design Tokens

**Goal**: Prepare all static assets and CSS custom properties.

1. Download unique media assets from Figma via `get_media_files`:
   - `MM_MEDIA_Target` icon (24×24 SVG) → `public/assets/awards/icons/icon-target.svg`
   - `MM_MEDIA_Diamond` icon (24×24 SVG) → `public/assets/awards/icons/icon-diamond.svg`
   - `MM_MEDIA_License` icon (24×24 SVG) → `public/assets/awards/icons/icon-license.svg`
   - `MM_MEDIA_Root Further Logo` → **reuse** existing `public/assets/homepage/root-further-logo.png` (already used on homepage at 451×200). Awards page renders at 338×150 via `next/image` width/height props — same source file, no duplication needed
   - Keyvisual background image → `public/assets/awards/keyvisual-bg.png`
   - Sun\* Kudos illustration → `public/assets/awards/kudos-illustration.png`
2. Verify existing award card images are available: `public/assets/homepage/awards/*.png` (all 6 exist ✅)
3. Add new CSS custom properties to `globals.css` `:root` block:
   - `--color-notification-dot: #D4271D`
   - Award-specific spacing tokens (page padding, section gaps)
   - Typography tokens (display heading, award text sizes)

### Phase 1: Foundation — Types, Data, i18n

**Goal**: Define data models, static data, and translations.

1. Create `src/types/award.ts`:
   ```typescript
   export interface AwardPrizeValue {
     label: string;
     amount: string;
   }
   export interface AwardDetail {
     id: string;           // unique identifier, also used as scroll target id (e.g. "top-talent")
     slug: string;         // URL-friendly slug, matches id
     name: string;
     descriptionVi: string;
     descriptionEn: string;
     quantity: string;
     unitType: string;
     prizeValues: AwardPrizeValue[];
     imageSrc: string;
     imageAlt: string;
     displayOrder: number;
   }
   ```
2. Create `src/data/awards-detail.ts` — full award data for all 6 categories. Reference `src/data/awards.ts` for slugs/images.
3. Create `src/libs/i18n/awards.ts` — i18n strings: section titles, labels ("Số lượng giải thưởng", "Giá trị giải thưởng", etc.), Kudos block text.

### Phase 2: Core Layout — US1 (Browse Award Categories)

**Goal**: Render the full page with all 6 award cards.

1. Create `src/services/award-service.ts`:
   - `getAwardDetails(): AwardDetail[]` — imports from `awards-detail.ts` (static), future: Supabase query
   - Constitution: no business logic in `page.tsx` — data access goes through service layer
2. Create route: `src/app/awards/page.tsx`
   - RSC with `generateMetadata` (title: "Hệ thống giải thưởng | SAA 2025", description, OG tags)
   - **Page scaffold** (match homepage `page.tsx` pattern):
     ```tsx
     <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#00101A" }}>
       <Header />
       {/* Hero + Content sections */}
       <Footer />
     </div>
     ```
   - Call `getAwardDetails()`, render all sections top-to-bottom
   - Add `html { scroll-behavior: smooth; }` to `globals.css` — **note: this is a global change** affecting all pages (login, homepage, etc.). Acceptable because no other page relies on instant scroll; CSS smooth scrolling is a progressive enhancement
3. Create `AwardSystemHero.tsx` — keyvisual with `next/image` (priority load), gradient overlay via a separate absolutely-positioned `<div>` (match existing homepage hero pattern — do NOT use `::after`)
4. Create `AwardsTitleSection.tsx` — Root Further Logo (338×150px, `next/image`) + sub-heading + divider + main heading (57px display)
5. Create `AwardDetailCard.tsx` — flex-row layout (image + content), accepts `AwardDetail` props, uses `id={award.id}` attribute for scroll target. First card (`displayOrder === 1`) passes `priority` to `AwardDetailImage`; others use lazy loading.
6. Create `AwardDetailImage.tsx` — 336×336px, border, glow shadow, `mix-blend-mode: screen` via wrapper div (not directly on `next/image`)
7. Create `AwardDetailContent.tsx` — title row (icon + h3), description (justified), quantity row, value row(s), dividers. Handles Signature 2025 dual-value variant via `prizeValues` array length.
8. Create `loading.tsx` — skeleton placeholders matching card layout (6 card skeletons)
9. Create `error.tsx` — error boundary with retry (follow existing pattern from `src/app/(home)/error.tsx`)

### Phase 3: Navigation — US2 (Side Nav with Scroll-Spy)

**Goal**: Add sticky left navigation with IntersectionObserver.

1. Create `AwardsCategoryNav.tsx` ("use client"):
   - Render 6 `CategoryNavItem` components
   - Use `IntersectionObserver` to track which award section is in viewport
   - On click → `element.scrollIntoView({ behavior: 'smooth' })`
   - Sticky positioning: `position: sticky; top: 96px`
2. Create `CategoryNavItem.tsx`:
   - Accept `isActive`, `slug`, `label`, `onClick` props
   - Styles: default (white), active (yellow + border-bottom + text-shadow glow), hover (bg highlight), focus (outline ring)
3. Wire into page layout:
   - Desktop: two-column flex (178px nav + 80px gap + flex-1 cards)
   - Mobile: horizontal scrollable tab bar at top
   - Tablet: collapsed narrow sidebar or horizontal tabs

### Phase 4: Sun\* Kudos Block — US3

**Goal**: Render the promotional block with CTA.

1. Create `SunKudosPromo.tsx`:
   - Flex-row layout (content left, illustration right)
   - Labels: "Phong trào ghi nhận", "Sun\* Kudos", "BIẾN MỚI CỦA SAA 2025"
   - Description paragraph
   - "Chi tiết" CTA link → `/kudos` (using `next/link`)
   - Min-height 44px on CTA (touch target compliance)
   - **Edge case — `/kudos` page may not exist yet**: The link will render a Next.js 404 if the Kudos page isn't built. This is acceptable (graceful 404 is better than broken UX). Do NOT add "coming soon" toast — just link to `/kudos` and let the 404 page handle it. When the Kudos screen is implemented, the link works automatically.

### Phase 5: Responsive & Polish — US4

**Goal**: Ensure all breakpoints work and refine.

1. Mobile (< 768px):
   - Nav → horizontal scrollable tabs
   - Cards → single column, image stacks above content
   - Page padding → 16px
   - Heading → 32px
2. Tablet (768px – 1279px):
   - Nav → narrow sidebar 120px or horizontal tabs
   - Cards → row layout with reduced image (250px)
   - Page padding → 48px
3. Desktop (≥ 1280px):
   - Full layout as designed
4. Cross-browser: test `backdrop-filter` in Firefox (`-webkit-backdrop-filter` fallback)
5. Accessibility:
   - `role="navigation"` + `aria-label="Award categories"` on nav
   - `aria-current="true"` on active nav item
   - Heading hierarchy: h2 for section title, h3 for each award name
   - `alt` text on all images
   - Visible focus rings on interactive elements
   - Keyboard navigation: Tab through nav items, Enter/Space to scroll
6. SEO: verify `generateMetadata` output, Open Graph tags

---

## Testing Strategy

| Type | Focus | Coverage | Prerequisite |
|------|-------|----------|--------------|
| Unit (Vitest) | `AwardDetailCard` rendering, `AwardDetailContent` variant handling (single vs dual prize), `award-service.ts` data integrity, i18n string lookup | 80% | **Requires Vitest installation** |
| Integration | Scroll-spy behavior (IntersectionObserver mock), nav→scroll interaction, `loading.tsx`/`error.tsx` boundaries | 70% | **Requires Vitest + jsdom** |
| E2E (Playwright) | Full page load, all 6 cards visible, nav click→scroll, responsive layout at 375/768/1440px, Kudos CTA navigation | Key flows | **Requires Playwright installation** |
| Visual | Compare rendered output against Figma screenshot at desktop width | Manual pass | No tooling needed |

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: AwardsCategoryNav ↔ AwardDetailCard scroll targeting
- [x] **External dependencies**: Supabase auth (middleware redirect for unauthenticated)
- [ ] **Data layer**: Not applicable initially (static data)
- [x] **User workflows**: Page load → browse → nav click → scroll → Kudos CTA

### Test Categories

| Category | Applicable | Key Scenarios |
|----------|-----------|---------------|
| UI ↔ Logic | Yes | Nav click triggers scroll to correct card; scroll position updates active nav item |
| App ↔ External API | No | Static data initially; API integration tested when endpoint exists |
| Cross-platform | Yes | 3 breakpoints (375, 768, 1440), Firefox backdrop-filter |

### Test Environment

- **Environment type**: Local dev (next dev), CI pipeline
- **Test data**: Static fixtures from `awards-detail.ts`
- **Isolation**: Supabase auth mocked in unit tests; real middleware in E2E

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Core rendering (6 cards) | 90%+ | High |
| Scroll-spy navigation | 85%+ | High |
| Responsive layouts | 80%+ | Medium |
| Error/loading states | 75%+ | Medium |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| `mix-blend-mode: screen` behaves inconsistently with `next/image` | Medium | Medium | Wrap `next/image` in a div with blend mode on the container |
| `backdrop-filter: blur(32px)` not supported in older Firefox | Low | Low | Add `-webkit-backdrop-filter` prefix; fallback to semi-transparent bg |
| Sticky nav overlaps header on scroll | Medium | Medium | Set `top` offset to header height (80px + padding); test with actual header |
| IntersectionObserver threshold tuning | Medium | Low | Use `threshold: [0, 0.25, 0.5]` and pick lowest visible; iterate in browser |
| Award data API not ready | High | Low | Static data fallback already planned; swap with fetch when API ships |
| Large image payload (6 × 336×336 PNG) | Medium | Medium | First card uses `priority`; cards 2–6 lazy loaded; `next/image` auto-converts to WebP; `sizes="336px"` prevents oversized srcset |

### Estimated Complexity

- **Frontend**: Medium (scroll-spy, responsive two-column, special card variant)
- **Backend**: Low (static data initially, simple GET endpoint later)
- **Testing**: Medium (scroll behavior, responsive, accessibility)

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved
- [x] `design-style.md` complete
- [ ] Asset files downloaded from Figma (Phase 0)
- [ ] Award detail content finalized (full Vietnamese descriptions for all 6 cards)

### External Dependencies

- Supabase auth middleware (exists ✅)
- Award card images in `public/assets/homepage/awards/` (exists ✅)
- Keyvisual background image (to be exported from Figma)
- Sun\* Kudos illustration (to be exported from Figma)
- Icon SVGs: Target, Diamond, License (to be exported from Figma)

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate detailed task breakdown
2. **Review** tasks.md for parallelization opportunities
3. **Begin** Phase 0 (asset download) immediately — unblocks all subsequent phases
4. **Phase 1–2** can be done sequentially by a single developer
5. **Phase 3** (scroll-spy) is independently developable once Phase 2 card layout exists

---

## Notes

- The existing `src/data/awards.ts` contains homepage-level data (short descriptions for the awards grid). The Awards page needs **extended** descriptions with quantity, unit type, and prize values. Create a separate `awards-detail.ts` to avoid breaking the homepage.
- `NavLinks.tsx` already includes `/awards` in its route list — the Header will automatically show the active state when on this route.
- `Footer.tsx` also detects `/awards` path for active link styling — no changes needed.
- The homepage is at `src/app/page.tsx` (root level). The `(home)` route group only contains `error.tsx` for the root page. The awards route is a sibling at `src/app/awards/` — it does NOT go under `(home)`.
- Award data descriptions in Vietnamese are available in the Figma design items but were not extracted in full during spec creation. These need to be captured during Phase 1 implementation.
- **Japanese i18n gap**: Spec FR-008 requires Vietnamese, English, **and Japanese** support. However `src/libs/i18n/locale.ts` only defines `vi` and `en` as supported locales. Adding Japanese (`ja`) requires: (1) updating `SUPPORTED_LOCALES` in `locale.ts`, (2) adding `ja` strings to all i18n files. This is a **cross-cutting concern** affecting the entire app, not just this screen. **Recommendation**: Create ja placeholder strings in `awards.ts` but defer `locale.ts` update to a separate ticket.
- **Test framework**: Neither Vitest nor Playwright is installed in the project yet. If unit testing is required for this feature, installing Vitest + @testing-library/react is a prerequisite task. Otherwise, defer to E2E-only testing when Playwright is set up.
