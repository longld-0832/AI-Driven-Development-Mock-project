# Tasks: Hệ thống giải (Award System)

**Frame**: `zFYDgyj_pD-HeThongGiai`
**Prerequisites**: plan.md ✅ | spec.md ✅ | design-style.md ✅
**User Stories**: US1 — Browse Award Categories (P1), US2 — Navigate Between Award Categories (P1), US3 — View Sun\* Kudos Promotion (P2), US4 — Responsive Layout (P2)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this belongs to (US1–US4)
- **|**: Primary file affected by this task

---

## Phase 1: Setup (Asset Preparation)

**Purpose**: Download all Figma media assets for the Award System page. No component
work can begin until icons and images are in place.

### 1.1 — Asset Directories & Icons

- [ ] T001 Create `public/assets/awards/` and `public/assets/awards/icons/` directories | `public/assets/awards/`
- [ ] T002 [P] Download MM_MEDIA_Target icon (24×24 SVG) from MoMorph media (Figma node `I313:8460;186:1745`, componentId `214:1808`, componentSetId `178:1020`) | `public/assets/awards/icons/icon-target.svg`
- [ ] T003 [P] Download MM_MEDIA_Diamond icon (24×24 SVG) from MoMorph media (Figma node `I313:8467;214:2535`, componentId `214:1817`, componentSetId `178:1020`) | `public/assets/awards/icons/icon-diamond.svg`
- [ ] T004 [P] Download MM_MEDIA_License icon (24×24 SVG) from MoMorph media (Figma node `I313:8467;214:2543`, componentId `214:1830`, componentSetId `178:1020`) | `public/assets/awards/icons/icon-license.svg`

### 1.2 — Keyvisual & Illustration Images

- [ ] T005 [P] Download Keyvisual background image from Figma frame `313:8437` (export as PNG, ~1440×547px) | `public/assets/awards/keyvisual-bg.png`
- [ ] T006 [P] Download Sun\* Kudos illustration image from Figma node `335:12023` (Kudos block right-side graphic) | `public/assets/awards/kudos-illustration.png`

### 1.3 — Verify Existing Assets

- [ ] T007 [P] Verify all 6 award card images exist at `public/assets/homepage/awards/`: `top-talent.png`, `top-project.png`, `project-leader.png`, `best-manager.png`, `signature.png`, `mvp.png` — these are shared with the homepage | `public/assets/homepage/awards/`
- [ ] T008 [P] Verify `public/assets/homepage/root-further-logo.png` exists — reuse from homepage (no download needed; awards page renders at 338×150 via `next/image` width/height props) | `public/assets/homepage/root-further-logo.png`

**Checkpoint**: 3 icon SVGs downloaded to `public/assets/awards/icons/`; keyvisual PNG and Kudos illustration in `public/assets/awards/`; 6 existing award thumbnails and Root Further logo verified.

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Design tokens, TypeScript types, static data, i18n strings, and service layer.
No user story components can compile correctly until this phase is done.

**⚠️ CRITICAL**: No user story work can begin until Phase 2 is complete.

### 2.1 — Design Tokens

- [ ] T009 Add Award System design tokens to `:root` block in `globals.css`: `--color-notification-dot: #D4271D`, `--spacing-page-px: 144px`, `--spacing-page-py: 96px`, `--spacing-card-inner-gap: 40px`, `--spacing-card-text-gap: 24px`, `--spacing-card-section-gap: 32px`, `--spacing-menu-gap: 16px`, `--spacing-menu-content-gap: 80px`, `--spacing-nav-item-padding: 16px`, `--spacing-title-gap: 16px`, `--radius-award-image: 24px`, `--radius-card-content: 16px`. Reuse existing: `--shadow-widget`, `--spacing-section-gap: 120px`, `--spacing-awards-row-gap: 80px`, `--color-bg-dark`, `--color-accent-yellow`, `--color-divider`, `--color-homepage-header-bg` | `src/app/globals.css`
- [ ] T010 [P] Add `html { scroll-behavior: smooth; }` rule to `globals.css` (global change — CSS-level smooth scrolling as progressive enhancement; no other page relies on instant scroll) | `src/app/globals.css`

### 2.2 — Types & Data

- [ ] T011 [P] Create `AwardPrizeValue` and `AwardDetail` TypeScript interfaces: `AwardPrizeValue { label: string; amount: string }`, `AwardDetail { id: string; slug: string; name: string; descriptionVi: string; descriptionEn: string; quantity: string; unitType: string; prizeValues: AwardPrizeValue[]; imageSrc: string; imageAlt: string; displayOrder: number }` | `src/types/award.ts`
- [ ] T012 Create `AWARDS_DETAIL` constant with 6 entries: Top Talent (10 Cá nhân, 7M VNĐ), Top Project (02 Tập thể, 15M VNĐ), Top Project Leader (03 Cá nhân, 7M VNĐ), Best Manager (01 Cá nhân, 10M VNĐ), Signature 2025 - Creator (01, dual prize: Cá nhân 5M + Tập thể 8M), MVP (01, 15M VNĐ). Reference `src/data/awards.ts` for slugs and image paths. Full Vietnamese descriptions from Figma design items. | `src/data/awards-detail.ts`

### 2.3 — i18n

- [ ] T013 [P] Create awards i18n strings (vi + en): section titles ("Sun\* Annual Awards 2025", "Hệ thống giải thưởng SAA 2025"), award labels ("Số lượng giải thưởng", "Giá trị giải thưởng", "cho mỗi giải thưởng"), Kudos block text ("Phong trào ghi nhận", "Sun\* Kudos", "BIẾN MỚI CỦA SAA 2025", description paragraph, "Chi tiết" button). Add Japanese (`ja`) entries as placeholder copies of English — defer full ja support to separate ticket. | `src/libs/i18n/awards.ts`

### 2.4 — Service Layer

- [ ] T014 Create `getAwardDetails(): AwardDetail[]` function: imports from `awards-detail.ts` (static data). Includes `// TODO: Replace with Supabase query + unstable_cache when API is ready` comment. Constitution mandates no business logic in `page.tsx`. | `src/services/award-service.ts`

**Checkpoint**: New design tokens visible in browser DevTools `:root`; `awards-detail.ts` exports 6 entries without TypeScript errors; `award-service.ts` returns correct data; i18n strings compile; `scroll-behavior: smooth` applied to `<html>`.

---

## Phase 3: User Story 1 — Browse Award Categories (Priority: P1) 🎯 MVP

**Goal**: An authenticated user visiting `/awards` sees the full page: hero banner,
title section, and all 6 award cards with images, titles, descriptions, quantities,
and prize values.

**Independent Test**: Navigate to `/awards` as authenticated user → hero keyvisual
renders → Root Further logo + title section visible → 6 award cards render with correct
data → Signature 2025 card shows 2 prize value rows → images display with yellow border
and glow.

### Route & Page Shell (US1)

- [ ] T015 [US1] Create `page.tsx` RSC with `generateMetadata` (title: "Hệ thống giải thưởng \| SAA 2025", description: "Tổng quan hệ thống giải thưởng Sun\* Annual Awards 2025", Open Graph tags). Page scaffold: `<div className="min-h-screen flex flex-col" style={{ backgroundColor: "#00101A" }}>` → `<Header />` → hero → content → `<Footer />`. Call `getAwardDetails()` from service layer. | `src/app/awards/page.tsx`
- [ ] T016 [P] [US1] Create `loading.tsx` skeleton: 6 card skeletons matching award card layout (336×336px image placeholder + content lines). Animated pulse on `bg-[rgba(255,234,158,0.05)]`. | `src/app/awards/loading.tsx`
- [ ] T017 [P] [US1] Create `error.tsx` `"use client"` error boundary: generic error message + "Thử lại" retry button. Follow pattern from `src/app/(home)/error.tsx`. | `src/app/awards/error.tsx`

### Hero & Title Components (US1)

- [ ] T018 [P] [US1] Create `AwardSystemHero` RSC: `next/image` with `fill`, `priority`, `alt="Keyvisual Sun* Annual Award 2025"`, source `public/assets/awards/keyvisual-bg.png`; gradient overlay via separate absolutely-positioned `<div>` with `linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)` (match homepage hero pattern — do NOT use `::after`); container `w-full h-[547px] relative overflow-hidden` | `src/components/awards/AwardSystemHero.tsx`
- [ ] T019 [P] [US1] Create `AwardsTitleSection` RSC: Root Further Logo via `<Image src="/assets/homepage/root-further-logo.png" width={338} height={150} alt="ROOT FURTHER" />`; sub-heading "Sun\* Annual Awards 2025" `(24px/32px 700, #FFF, text-center)`; 1px divider `bg-[var(--color-divider)]` full width; main heading "Hệ thống giải thưởng SAA 2025" `(57px/64px 700, #FFEA9E, letter-spacing: -0.25px)`. i18n via `useLocale` + awards i18n. Section `flex flex-col gap-[var(--spacing-title-gap)] items-center` max-width 1152px. | `src/components/awards/AwardsTitleSection.tsx`

### Award Card Components (US1)

- [ ] T020 [P] [US1] Create `AwardDetailImage` RSC: `props: { src: string; alt: string; priority?: boolean }`; wrapper `<div>` with `w-[336px] h-[336px] rounded-[var(--radius-award-image)] border border-[var(--color-accent-yellow)] overflow-hidden` + `box-shadow: var(--shadow-widget)` + `mix-blend-mode: screen`; inner `<Image>` with `width={336} height={336} sizes="336px"`; pass `priority` prop through to `<Image>`. | `src/components/awards/AwardDetailImage.tsx`
- [ ] T021 [P] [US1] Create `AwardDetailContent` RSC: `props: { award: AwardDetail; locale: LocaleCode }`; title row: `<Image src="/assets/awards/icons/icon-target.svg" width={24} height={24} alt="" />` + `<h3>` award name `(24px/32px 700, #FFEA9E)`; description paragraph `(16px/24px 700, #FFF, text-justify, letter-spacing: 0.5px)`; 1px divider; quantity row: diamond icon + label "Số lượng giải thưởng:" `(24px/32px 700, #FFEA9E)` + quantity `(36px/44px 700, #FFF)` + unit type `(14px/20px 700, #FFF)`; 1px divider; value row(s): license icon + label "Giá trị giải thưởng:" + amount + sub-label. **Handle Signature 2025 dual-value**: when `prizeValues.length > 1`, render multiple value rows separated by dividers. Content block `w-[480px] flex flex-col gap-[var(--spacing-card-section-gap)] backdrop-blur-[32px] rounded-[var(--radius-card-content)]`. | `src/components/awards/AwardDetailContent.tsx`
- [ ] T022 [P] [US1] Create `AwardDetailCard` RSC: `props: { award: AwardDetail; locale: LocaleCode; isFirst?: boolean }`; outer `<section id={award.id}>` for scroll target; inner flex-row `gap-[var(--spacing-card-inner-gap)]`: `<AwardDetailImage priority={isFirst} />` + `<AwardDetailContent />`; bottom divider `(853px × 1px, #2E3940)` except last card. | `src/components/awards/AwardDetailCard.tsx`

### Page Assembly (US1)

- [ ] T023 [US1] Assemble page: wire `<AwardSystemHero />`, `<AwardsTitleSection />`, content wrapper `(px: 144px, py: 96px, gap: 120px)` containing award cards section. Map `getAwardDetails()` to `<AwardDetailCard>` components with `gap-[var(--spacing-awards-row-gap)]`. Pass `isFirst={award.displayOrder === 1}` to first card for image priority loading. | `src/app/awards/page.tsx`

**Checkpoint**: User Story 1 complete — `/awards` renders hero + title + 6 award cards; Signature 2025 shows dual prize; first image prioritized; loading/error boundaries work.

---

## Phase 4: User Story 2 — Navigate Between Award Categories (Priority: P1)

**Goal**: Sticky left navigation with scroll-spy highlights the currently visible
award section. Clicking a nav item smooth-scrolls to that award.

**Independent Test**: Click "Top Project" in left nav → page scrolls to Top Project card
→ "Top Project" nav item shows active state (yellow text + bottom border + glow) →
scroll manually to Best Manager → nav active state updates to "Best Manager" within 100ms.

### Navigation Components (US2)

- [ ] T024 [P] [US2] Create `CategoryNavItem` `"use client"` component: `props: { isActive: boolean; slug: string; label: string; onClick: (slug: string) => void }`; styles: default `(#FFF 14px/20px 700, letter-spacing: 0.25px, px: 16px, py: 16px, rounded: 4px)`, active `(#FFEA9E, border-bottom: 1px solid #FFEA9E, text-shadow: 0 4px 4px rgba(0,0,0,0.25) 0 0 6px #FAE287)`, hover `(bg: rgba(255,255,255,0.08))`, focus `(outline: 2px solid #FFEA9E, outline-offset: 2px)`; icon `<Image src="/assets/awards/icons/icon-target.svg" width={24} height={24} alt="" />` + gap 4px; `transition: color 200ms ease-in-out, border-bottom 200ms ease-in-out, text-shadow 200ms ease-in-out, background-color 150ms ease-in-out`; `aria-current={isActive ? "true" : undefined}` | `src/components/awards/CategoryNavItem.tsx`
- [ ] T025 [US2] Create `AwardsCategoryNav` `"use client"` component: `props: { categories: { slug: string; name: string }[] }`; `useState<string>('top-talent')` for `activeCategory`; `useEffect` with `IntersectionObserver` — observe all `[id]` elements matching category slugs, `threshold: [0, 0.25, 0.5]`, `rootMargin: "-96px 0px 0px 0px"` (offset for sticky header); on intersection → pick lowest visible → `setActiveCategory()`; on click → `document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth' })`; render 6 `<CategoryNavItem>` with `isActive={slug === activeCategory}`; outer `<nav role="navigation" aria-label="Award categories">` with `w-[178px] sticky top-[96px] flex flex-col gap-[var(--spacing-menu-gap)] self-start` | `src/components/awards/AwardsCategoryNav.tsx`

### Page Layout Update (US2)

- [ ] T026 [US2] Update page layout to two-column: wrap award cards and nav in `flex flex-row gap-[var(--spacing-menu-content-gap)]`; left column: `<AwardsCategoryNav categories={...} />`; right column: award cards `flex-1 flex flex-col gap-[var(--spacing-awards-row-gap)]`. Pass categories array derived from `getAwardDetails()` (slug + name). Sun\* Kudos block follows below the two-column section. | `src/app/awards/page.tsx`

**Checkpoint**: User Story 2 complete — sticky nav visible on desktop; click scrolls smoothly; scroll-spy updates active state; keyboard Tab + Enter/Space works.

---

## Phase 5: User Story 3 — View Sun\* Kudos Promotion (Priority: P2)

**Goal**: Sun\* Kudos promotional block renders below award cards with CTA linking to `/kudos`.

**Independent Test**: Scroll past all 6 award cards → Kudos block visible with label,
title, sub-label, description, illustration, and "Chi tiết" button → click button →
navigates to `/kudos` (404 if page not built yet — acceptable).

### Component (US3)

- [ ] T027 [US3] Create `SunKudosPromo` RSC: flex-row layout `(content left, illustration right)`; labels: "Phong trào ghi nhận" `(small text)`, "Sun\* Kudos" `(large heading, #FFEA9E)`, "BIẾN MỚI CỦA SAA 2025" `(sub-label)`; description paragraph `(16px/24px 700, #FFF, justified)`; illustration `<Image src="/assets/awards/kudos-illustration.png" />` right side; "Chi tiết" CTA: `<Link href="/kudos">` styled as text link with arrow icon `(16px/24px 500, #FFEA9E, letter-spacing: 0.15px)`, `min-height: 44px` touch target, hover `(opacity: 0.8, slight translate-x)`, focus `(outline: 2px solid #FFEA9E, outline-offset: 2px)`. i18n via locale. Edge case: `/kudos` 404 is acceptable — no "coming soon" toast. | `src/components/awards/SunKudosPromo.tsx`

### Page Wiring (US3)

- [ ] T028 [US3] Add `<SunKudosPromo />` to page below the two-column awards section, within the main content padding wrapper. | `src/app/awards/page.tsx`

**Checkpoint**: User Story 3 complete — Kudos block renders with all content; CTA link functional; 44px touch target met.

---

## Phase 6: User Story 4 — Responsive Layout (Priority: P2)

**Goal**: Page renders correctly at mobile (375px), tablet (768px), and desktop (1280px+) viewports.

**Independent Test**: Load `/awards` at each breakpoint → no horizontal scrollbar →
layout adapts per spec → all content readable → nav usable at all viewports.

### Responsive Implementation (US4)

- [ ] T029 [P] [US4] Mobile responsive (< 768px): nav → horizontal scrollable tab bar at top (remove sticky sidebar); cards → single column, image stacks above content (flex-col), full width image (max 336px centered); page padding → 16px; main heading → 32px; hero height reduced (~300px); Sun\* Kudos block → stacks vertically | multiple `src/components/awards/` files
- [ ] T030 [P] [US4] Tablet responsive (768px – 1279px): nav → narrow sidebar 120px or horizontal tabs; cards → row layout with reduced image (250px); page padding → 48px; main heading → ~40px | multiple `src/components/awards/` files
- [ ] T031 [P] [US4] Desktop layout (≥ 1280px): verify full design renders as-is — 1440px canvas concept, 144px padding, two-column (178px nav + 80px gap + 853px cards), 547px keyvisual | `src/app/awards/page.tsx`
- [ ] T032 [P] [US4] Cross-browser: add `-webkit-backdrop-filter: blur(32px)` fallback alongside `backdrop-filter: blur(32px)` on `AwardDetailContent`; add semi-transparent background fallback for browsers without support | `src/components/awards/AwardDetailContent.tsx`

**Checkpoint**: User Story 4 complete — zero horizontal scroll at 375px/768px/1440px; nav usable at all breakpoints; backdrop-filter works in Firefox.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, performance, SEO, and code quality refinements affecting
multiple components.

### Accessibility

- [ ] T033 [P] Audit and apply ARIA attributes: `role="navigation"` + `aria-label="Award categories"` on `AwardsCategoryNav`; `aria-current="true"` on active `CategoryNavItem`; heading hierarchy `h2` for section title, `h3` for each award name; descriptive `alt` text on all `<Image>` elements | multiple `src/components/awards/` files
- [ ] T034 [P] Keyboard navigation: verify Tab through nav items works; Enter/Space triggers scroll; visible `outline: 2px solid #FFEA9E; outline-offset: 2px` focus rings on all interactive elements (nav items, "Chi tiết" button); Tab order follows visual layout | `src/components/awards/CategoryNavItem.tsx`, `src/components/awards/SunKudosPromo.tsx`
- [ ] T035 [P] Touch targets: verify all clickable elements meet 44×44px minimum — nav items (padding: 16px ✓), "Chi tiết" button (min-height: 44px ✓); fix any that fall short | multiple files

### Performance

- [ ] T036 [P] Verify image loading strategy: first card `<AwardDetailImage priority />` (Top Talent — above-the-fold); cards 2–6 lazy loaded (default `next/image` behavior); `sizes="336px"` on all award images; keyvisual has `priority`; Root Further logo does NOT need `priority` (below fold) | `src/components/awards/AwardDetailImage.tsx`, `src/components/awards/AwardSystemHero.tsx`
- [ ] T037 [P] Verify `generateMetadata` output: title "Hệ thống giải thưởng \| SAA 2025", description, Open Graph `og:title`, `og:description`, `og:image` (keyvisual URL) | `src/app/awards/page.tsx`

### Code Quality

- [ ] T038 [P] Run `npx tsc --noEmit` and fix all TypeScript strict-mode errors; ensure no `any` types; add explicit return type annotations to all new component functions | all new `.tsx`/`.ts` files
- [ ] T039 Run `npx next lint` and fix all ESLint errors/warnings | all new files
- [ ] T040 Manual visual verification: compare rendered output at 1440px against Figma screenshot (frame image: `https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/313:8436/bd17cac24871c9513f259333a5431530.png`); flag any pixel-level discrepancies for designer review | visual check

**Checkpoint**: All 7 phases complete — Award System page is production-ready, responsive at 375/768/1280px, passes WCAG 2.1 AA checks, and deploys without error on Cloudflare Workers.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)              → No dependencies; start immediately
Phase 2 (Foundation)         → Depends on Phase 1 (icons needed for components)
                               BLOCKS all user story phases
Phase 3 (US1 — P1 MVP)      → Depends on Phase 2
Phase 4 (US2 — P1)          → Depends on Phase 3 (needs card sections with id attributes for scroll targets)
Phase 5 (US3 — P2)          → Depends on Phase 2; can run in parallel with Phase 4
Phase 6 (US4 — P2)          → Depends on Phases 3–5 (all components must exist to make responsive)
Phase 7 (Polish)             → Depends on all story phases being complete
```

### User Story Execution Order (recommended for single developer)

```
Phase 1 → Phase 2 → Phase 3 (US1) → Phase 4 (US2) → Phase 5 (US3)
→ Phase 6 (US4) → Phase 7 (Polish)
```

### Parallel Execution (if 2 developers available)

**Dev A**: Phase 3 (US1 — hero + cards) → Phase 4 (US2 — scroll-spy nav)
**Dev B**: Phase 5 (US3 — Kudos block, after Phase 2) → assist Phase 6 (responsive)

### Within Each Story

- Asset/type prerequisites → leaf components (no deps) → composition component → page wiring

---

## Implementation Strategy

### MVP Scope (minimum shippable)

Complete **Phase 1 + Phase 2 + Phase 3** = all 6 award cards visible with hero at
`/awards`. Page is meaningful to an end user even without scroll-spy navigation.

### Incremental Delivery

1. **Iteration 1 (MVP)**: Phases 1–3 → hero + title + 6 award cards (single column)
2. **Iteration 2 (Navigation)**: Phase 4 → sticky nav + scroll-spy
3. **Iteration 3 (Kudos)**: Phase 5 → Sun\* Kudos promotional block
4. **Iteration 4 (Polish)**: Phases 6–7 → responsive + a11y + performance + SEO

---

## Open Items (must resolve before or during implementation)

| # | Owner | Question | Impact |
|---|-------|----------|--------|
| Q1 | Content Team | Full Vietnamese descriptions for all 6 award categories — Figma design items have partial descriptions, need confirmation of final copy | Blocks T012 data entry |
| Q2 | Designer | Top Talent "Đơn vị" vs "Cá nhân" discrepancy — Figma seems inconsistent on unit type | Affects T012 for Top Talent entry |
| Q3 | Team | Japanese (ja) i18n — part of this feature or separate ticket? Plan recommends placeholder only | Affects T013 scope |
| Q4 | Team | Vitest + Playwright installation — should test framework setup be a prerequisite (Phase 0) or a separate project-wide ticket? Testing tasks deferred until resolved | Blocks automated testing |
| Q5 | Designer | Keyvisual image file — needs Figma export (not available as MoMorph media item, it's a background image in the group node `313:8437`) | Blocks T005 |
| Q6 | Designer | Sun\* Kudos illustration — needs Figma export from node `335:12023` area | Blocks T006 |

---

## Task Summary

| Phase | Purpose | Tasks | Parallel Opportunities |
|-------|---------|-------|------------------------|
| 1 — Setup | Assets & Verification | T001–T008 (8) | T002–T008 all parallelizable |
| 2 — Foundation | Tokens + Types + Data + Service | T009–T014 (6) | T010–T013 parallel after T009 |
| 3 — US1 MVP | Hero + Title + Award Cards | T015–T023 (9) | T016–T022 parallel; T015, T023 sequential |
| 4 — US2 | Scroll-Spy Navigation | T024–T026 (3) | T024 parallel; T025–T026 sequential |
| 5 — US3 | Sun\* Kudos Block | T027–T028 (2) | T028 sequential after T027 |
| 6 — US4 | Responsive Layout | T029–T032 (4) | T029–T032 all parallelizable |
| 7 — Polish | A11y + Perf + QA | T033–T040 (8) | T033–T038 parallel; T039–T040 sequential |
| **Total** | | **40 tasks** | **~30 parallelizable** |
