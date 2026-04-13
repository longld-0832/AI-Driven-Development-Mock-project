# Tasks: Homepage SAA

**Frame**: `i87tDx10uM-HomepageSAA`
**Prerequisites**: plan.md ✅ | spec.md ✅ | design-style.md ✅
**User Stories**: US1 — Countdown & Event Info (P1), US2 — Navigate Awards/Kudos (P1), US3 — Browse Awards Cards (P2), US4 — Header Navigation (P2), US5 — Floating Kudos Widget (P3), US6 — Sun* Kudos Block (P3)

---

## Task Format

```
- [x] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this belongs to (US1–US6)
- **|**: Primary file affected by this task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Download all Figma media assets, obtain self-hosted fonts, and configure
environment variables. No component work can begin until assets are in place.

### 1.1 — Asset Directory & Keyvisual

- [x] T001 Create `public/assets/homepage/`, `public/assets/homepage/awards/`, and `public/fonts/` directories; download keyvisual background PNG from MoMorph media (Figma node `2167:9028`) | `public/assets/homepage/keyvisual-bg.png`
- [x] T002 [P] Download SAA logo PNG from MoMorph media (Figma node `I2167:9091;178:1033;178:1030`) | `public/assets/homepage/saa-logo.png`
- [x] T003 [P] Download Root Further logo from MoMorph media (Figma node `2788:12911`) | `public/assets/homepage/root-further-logo.png`
- [x] T004 [P] Download theme narrative image 1 from MoMorph media (Figma node `3204:10155`) | `public/assets/homepage/theme-narrative-img-1.png`
- [x] T005 [P] Download theme narrative image 2 from MoMorph media (Figma node `3204:10154`) | `public/assets/homepage/theme-narrative-img-2.png`
- [x] T006 [P] Download footer SAA logo PNG from MoMorph media (Figma node `I5001:14800;342:1408;178:1030`) | `public/assets/homepage/footer-logo.png`

### 1.2 — Header & Widget Icons

- [x] T007 [P] Download notification bell SVG from MoMorph media (Figma node `I2167:9091;186:2101;186:2020;186:1420`) | `public/assets/homepage/icon-notification.svg`
- [x] T008 [P] Download language icon SVG from MoMorph media (Figma node `I2167:9091;186:1597;186:1420`) | `public/assets/homepage/icon-language.svg`
- [x] T009 [P] Download ABOUT AWARDS arrow icon SVG from MoMorph media (Figma node `I2167:9063;186:1766`) | `public/assets/homepage/icon-up-arrow-awards.svg`
- [x] T010 [P] Download ABOUT KUDOS arrow icon SVG from MoMorph media (Figma node `I2167:9064;186:2761`) | `public/assets/homepage/icon-up-arrow-kudos.svg`
- [x] T011 [P] Download Kudos widget pencil icon SVG from MoMorph media (Figma node `I5022:15169;214:3839;186:1763`) | `public/assets/homepage/icon-widget-pencil.svg`
- [x] T012 [P] Download Kudos widget SAA icon SVG from MoMorph media (Figma node `I5022:15169;214:3839;186:1766;214:3762`) | `public/assets/homepage/icon-widget-saa.svg`

### 1.3 — Award Thumbnails

- [x] T013 [P] Download Top Talent award thumbnail from MoMorph media (Figma node `I2167:9075;214:1019;81:2442`) | `public/assets/homepage/awards/top-talent.png`
- [x] T014 [P] Download Top Project award thumbnail from MoMorph media (Figma node `I2167:9076;214:1019;81:2442`) | `public/assets/homepage/awards/top-project.png`
- [x] T015 [P] Download Top Project Leader award thumbnail from MoMorph media (Figma node `I2167:9077;214:1019;81:2442`) | `public/assets/homepage/awards/project-leader.png`
- [x] T016 [P] Download Best Manager award thumbnail from MoMorph media (Figma node `I2167:9079;214:1019;81:2442`) | `public/assets/homepage/awards/best-manager.png`
- [x] T017 [P] Download Signature 2025 – Creator award thumbnail from MoMorph media (Figma node `I2167:9080;214:1019;81:2442`) | `public/assets/homepage/awards/signature.png`
- [x] T018 [P] Download MVP award thumbnail from MoMorph media (Figma node `I2167:9081;214:1019;81:2442`) | `public/assets/homepage/awards/mvp.png`

### 1.4 — Kudos Block Assets

- [x] T019 [P] Download Kudos section background image from MoMorph media (Figma node `I3390:10349;313:8416`) | `public/assets/homepage/kudos-bg.png`
- [x] T020 [P] Download Kudos logo / wordmark from MoMorph media (Figma node `I3390:10349;329:2948`) | `public/assets/homepage/kudos-logo.png`

### 1.5 — Self-hosted Fonts

- [x] T021 Obtain Digital Numbers `.woff2` from licensed source and place in `public/fonts/`; confirm commercial license before proceeding (fallback: system `monospace` if unlicensed) | `public/fonts/digital-numbers.woff2`
- [x] T022 [P] Obtain SVN-Gotham `.woff2` from licensed source and place in `public/fonts/`; confirm commercial license before proceeding (fallback: `Montserrat` if unlicensed) | `public/fonts/svn-gotham.woff2`

### 1.6 — Environment Variables

- [x] T023 Add `NEXT_PUBLIC_EVENT_DATE=2025-12-26T18:30:00+07:00` to `.env.local` and document the variable in the **Required Environment Variables** section of `README.md` | `.env.local`
- [x] T024 [P] Add `NEXT_PUBLIC_EVENT_DATE` to `wrangler.jsonc` under `[vars]` for Cloudflare Workers deployment | `wrangler.jsonc`

**Checkpoint**: All 20 media files downloaded to correct paths; both fonts present in `public/fonts/`; `NEXT_PUBLIC_EVENT_DATE` set locally and in `wrangler.jsonc`.

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Design tokens, TypeScript types, static data constants, and shared
infrastructure. No user story components can compile correctly until this phase is done.

**⚠️ CRITICAL**: No user story work can begin until Phase 2 is complete.

- [x] T025 Add Homepage design tokens to `:root` block in `globals.css`: `--color-accent-yellow-dim: rgba(255,234,158,0.10)`, `--color-border-btn: #998c5f`, `--color-surface-dark: #0f0f0f`, `--shadow-widget: 0 4px 4px rgba(0,0,0,0.25), 0 0 6px #fae287`, `--shadow-award-glow: 0 0 24px rgba(255,234,158,0.25)`, `--spacing-section-gap: 120px`, `--spacing-countdown-gap: 40px`, `--spacing-countdown-inner: 14px`, `--spacing-awards-row-gap: 80px` | `src/app/globals.css`
- [x] T026 [P] Add `@font-face` rule for Digital Numbers in `globals.css`: `font-family: 'Digital Numbers'`, `src: url('/fonts/digital-numbers.woff2') format('woff2')`, `font-display: swap` | `src/app/globals.css`
- [x] T027 [P] Add `@font-face` rule for SVN-Gotham in `globals.css`: `font-family: 'SVN-Gotham'`, `src: url('/fonts/svn-gotham.woff2') format('woff2')`, `font-display: swap` | `src/app/globals.css`
- [x] T028 [P] Create `TimeLeft` TypeScript interface: `{ days: number; hours: number; minutes: number }` | `src/types/countdown.ts`
- [x] T029 [P] Create `Award` interface and `AWARDS` constant with 6 entries (Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 – Creator, MVP); each entry has `slug`, `name`, `description`, `thumbnailSrc: string`, `thumbnailAlt: string` | `src/data/awards.ts`
- [x] T030 Update `public/_headers`: add `font-src 'self'` to the `Content-Security-Policy` directive to allow self-hosted fonts; verify `script-src` does not include `unsafe-inline` | `public/_headers`
- [x] T031 [P] Create `src/app/(home)/error.tsx` as a `"use client"` error boundary for the homepage route segment: renders a generic error message and "Thử lại" retry button | `src/app/(home)/error.tsx`

**Checkpoint**: New design tokens visible in browser DevTools `:root`; `awards.ts` exports 6 entries without TypeScript errors; `_headers` updated; `error.tsx` compiles cleanly.

---

## Phase 3: User Story 1 — View Countdown & Event Info (Priority: P1) 🎯 MVP

**Goal**: An authenticated user visiting `/` sees the hero section with a live countdown
(DAYS/HOURS/MINUTES in Digital Numbers font) and event logistics (18h30 · Nhà hát nghệ
thuật quân đội · Group Facebook Sun* Family).

**Independent Test**: Navigate to `/` as authenticated user → hero renders; countdown shows
valid zero-padded numbers; "Comming soon" label visible; EventInfo shows labels in white
and values in `#FFEA9E`; 1 minute after load the MINUTES value decrements by 1 without
page reload.

### Components (US1)

- [x] T032 [P] [US1] Create `DigitBox` RSC: `props: { digit: string }`; renders a single digit in Digital Numbers font; `60×76.55px`; gradient background (`linear-gradient(180deg, rgba(255,234,158,0.15) 0%, rgba(255,234,158,0.05) 100%)`); `0.5px solid #FFEA9E` border; `border-radius: 4px` | `src/components/homepage/DigitBox.tsx`
- [x] T033 [P] [US1] Create `CountdownUnit` RSC: `props: { value: number; label: string }`; zero-pads `value` to 2 digits with `String(value).padStart(2, '0')`; renders tens + ones `<DigitBox>`; label below in white `12px/700` uppercase; gap `var(--spacing-countdown-inner)` between digits | `src/components/homepage/CountdownUnit.tsx`
- [x] T034 [P] [US1] Create `EventInfo` RSC: static display of two label/value rows (`Thời gian:` / `18h30` and `Địa điểm:` / `Nhà hát nghệ thuật quân đội`); labels white `16px/700`, values `#FFEA9E 24px/700`; third row `Tường thuật trực tiếp tại Group Facebook Sun* Family` in white `16px/700`; `gap-2` between rows | `src/components/homepage/EventInfo.tsx`
- [x] T035 [US1] Create `CountdownTimer` `"use client"` component: reads `NEXT_PUBLIC_EVENT_DATE` via `new Date(process.env.NEXT_PUBLIC_EVENT_DATE ?? '')` inside `try/catch`; `parseEventDate()` returns `Date | null`; `useState<TimeLeft>` initialized to calculated value; `setInterval(60_000)` in `useEffect` with cleanup on unmount; `isEventPast` derived when all units are `0`; renders `aria-live="polite"` wrapper, "Comming soon" label (hidden when `isEventPast`), 3 `<CountdownUnit>` components with `gap-[var(--spacing-countdown-gap)]`; shows `"--"` per unit when `parseEventDate()` returns `null` | `src/components/homepage/CountdownTimer.tsx`
- [x] T036 [P] [US1] Create `CountdownSection` RSC wrapper: renders `<CountdownTimer>` stacked above `<EventInfo>` with a 1px `#998C5F` horizontal divider separator between; section aligned `text-center` on mobile, `text-left xl:items-start` on desktop | `src/components/homepage/CountdownSection.tsx`

### Page Wiring (US1)

- [x] T037 [US1] Replace stub `src/app/page.tsx` with `HomePage` RSC: `import { createClient } from '@/libs/supabase/server'`; `await createClient().auth.getUser()` (middleware already guards — no redirect needed here); render full page: `<Header />` sticky, keyvisual `<Image fill priority alt="" />` (z-0), two gradient overlay `<div>`s (z-1), hero content `<div>` (z-10) containing `<CountdownSection />`; remaining section shells added in later phases | `src/app/page.tsx`

**Checkpoint**: User Story 1 complete — countdown + EventInfo visible for authenticated user at `/`; timer ticks per minute; "Comming soon" hides when event date is past; `--` displayed when env var is missing.

---

## Phase 4: User Story 2 — Navigate to Awards/Kudos (Priority: P1)

**Goal**: "ABOUT AWARDS" and "ABOUT KUDOS" CTA buttons are visible in the hero zone,
fully styled with hover/focus states, and link to the correct routes.

**Independent Test**: Click "ABOUT AWARDS" → navigates to `/awards`; click "ABOUT KUDOS" → navigates to `/kudos`; hover transitions button from outline to yellow-fill; Tab key shows `outline: 2px solid #FFEA9E` focus ring.

### Components (US2)

- [x] T038 [P] [US2] Create `CTAButton` RSC: `props: { href: string; label: string; iconSrc: string; iconAlt: string }`; renders as Next.js `<Link>`; default state: `bg-[rgba(255,234,158,0.1)] border border-[#998C5F] text-white`; hover: `hover:bg-[#FFEA9E] hover:border-transparent hover:text-[#00101A]`; focus: `focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2`; `transition-all duration-150 ease-in-out`; `h-[60px] px-6 py-4 rounded-[4px]`; includes arrow `<Image>` icon at end | `src/components/homepage/CTAButton.tsx`
- [x] T039 [P] [US2] Create `HeroCTA` RSC: flex row `gap-6`; renders `<CTAButton href="/awards" label="ABOUT AWARDS" iconSrc="icon-up-arrow-awards.svg">` and `<CTAButton href="/kudos" label="ABOUT KUDOS" iconSrc="icon-up-arrow-kudos.svg">` | `src/components/homepage/HeroCTA.tsx`

### Page Wiring (US2)

- [x] T040 [US2] Add `<HeroCTA />` to hero zone in `page.tsx` below `<CountdownSection />`; wrap hero content in a flex-col with appropriate spacing | `src/app/page.tsx`

**Checkpoint**: Both CTAs render in hero zone; outline ↔ yellow-fill hover transition verified; both links route correctly; keyboard navigation works.

---

## Phase 5: User Story 3 — Browse Awards Cards (Priority: P2)

**Goal**: "Hệ thống giải thưởng" section shows 6 award cards in a 3×2 grid, each with
thumbnail, name, description, and "Chi tiết" link to `/awards#slug`.

**Independent Test**: Scroll to awards section → 6 cards visible in 3×2 layout (80px
row gap) → thumbnail images displayed → clicking card name or "Chi tiết" navigates to
`/awards#top-talent` etc. → broken image shows yellow-bordered fallback.

### Components (US3)

- [x] T041 [P] [US3] Create `AwardCardImage` `"use client"` sub-component: `props: { src: string; alt: string }`; uses `next/image` with `width={336} height={336}`; `onError` state flag → renders yellow `border border-[#FFEA9E]` fallback `<div>` with same dimensions when image fails to load | `src/components/homepage/AwardCardImage.tsx`
- [x] T042 [P] [US3] Create `AwardCard` RSC: `props: { award: Award }`; outer `<Link href={\`/awards#\${award.slug}\`}>` wrapper on image; separate `<Link href={\`/awards#\${award.slug}\`}>` on award name; renders `<AwardCardImage>`; award name `#FFEA9E 24px/400`; description `text-white text-base line-clamp-2`; "Chi tiết" `<Link href={\`/awards#\${award.slug}\`}>` styled as small arrow link | `src/components/homepage/AwardCard.tsx`
- [x] T043 [P] [US3] Create `AwardsGrid` RSC: `props: { awards: Award[] }`; `flex flex-col gap-20` outer; two `flex flex-row gap-[108px]` inner rows mapping `awards.slice(0,3)` and `awards.slice(3,6)` to `<AwardCard>` | `src/components/homepage/AwardsGrid.tsx`
- [x] T044 [P] [US3] Create `AwardsSection` RSC: section header with caption (`Giải thưởng` white `24px/700`) and title (`Hệ thống giải thưởng` `#FFEA9E 57px/700`); renders `<AwardsGrid awards={AWARDS} />`; section `bg-[var(--color-surface-dark)] py-[120px]` | `src/components/homepage/AwardsSection.tsx`

### Page Wiring (US3)

- [x] T045 [US3] Add `<AwardsSection />` to `page.tsx` below `<ThemeNarrative />` shell placeholder | `src/app/page.tsx`

**Checkpoint**: User Stories 1–3 complete — 6 cards visible in 3×2 grid; thumbnail images load; `line-clamp-2` truncation works; all Chi tiết links route to `/awards#slug`.

---

## Phase 6: User Story 4 — Header Navigation (Priority: P2)

**Goal**: Sticky header shows 3 nav links with active + hover states, notification bell,
language toggle, and user button.

**Independent Test**: On `/` while scrolling — header remains at top; About SAA 2025 shows `#FFEA9E` text + `border-b border-[#FFEA9E]` (selected state); hovering Award Information or Sun* Kudos shows hover style; bell and user button are clickable (TBD actions).

### Components (US4)

- [x] T046 [P] [US4] Create `NavLinks` `"use client"` island: `usePathname()` from `next/navigation`; array of 3 nav items `(About SAA 2025 → /, Award Information → /awards, Sun* Kudos → /kudos)`; selected variant when `pathname === href`: `text-[#FFEA9E] border-b border-[#FFEA9E]`; hover variant: `hover:text-[#FFEA9E]`; `aria-current="page"` on active link; Montserrat `16px/700` | `src/components/layout/NavLinks.tsx`

### Modifications (US4)

- [x] T047 [US4] Update `Header.tsx` RSC: change `absolute` to `sticky top-0`; import and render `<NavLinks />`; add notification bell `<button>` with `<Image src="/assets/homepage/icon-notification.svg" width={40} height={40} alt="Thông báo" />`; place bell button to the right of nav; wire up existing `<LanguageToggle />` and add user icon button `<button>` (40×40px); ensure header bg `rgba(16,20,23,0.8)` + `backdrop-blur-sm` | `src/components/layout/Header.tsx`
- [x] T048 [US4] Update `Footer.tsx` RSC to homepage variant: footer logo `<Image src="/assets/homepage/footer-logo.png">`; 4 nav `<Link>` items (About SAA 2025 `/`, Award Information `/awards`, Sun* Kudos `/kudos`, Tiêu chuẩn chung `/criteria`); copyright `Bản quyền thuộc về Sun* © 2025` in Montserrat Alternates `16px/700`; `max-w-[1224px] mx-auto` inner container | `src/components/layout/Footer.tsx`

**Checkpoint**: User Story 4 complete — sticky header remains visible on scroll; active link highlighted; nav links route correctly; footer shows all 4 links.

---

## Phase 7: User Story 5 — Floating Kudos Widget (Priority: P3)

**Goal**: Yellow pill button fixed at lower-right viewport, persistent on all scroll
positions, aria-labelled, click stub for TBD menu.

**Independent Test**: Homepage loads → pill visible at bottom-right → persists while scrolling → clicking logs stub message (no crash); `aria-label` readable by screen reader.

### Components (US5)

- [x] T049 [US5] Create `KudosWidget` `"use client"` component: `position: fixed; bottom: 30px; right: 19px; z-50`; `bg-[#FFEA9E] w-[106px] h-[64px] rounded-[100px]`; `box-shadow: var(--shadow-widget)`; inner flex row: `<Image src="icon-widget-pencil.svg" width={24} height={24} alt="" />`, `<span className="text-[#00101A] font-bold">/</span>`, `<Image src="icon-widget-saa.svg" width={24} height={24} alt="" />`; `aria-label="Mở Kudos nhanh"`; `onClick` stub (`// TODO: open quick-action menu`) | `src/components/homepage/KudosWidget.tsx`

### Page Wiring (US5)

- [x] T050 [US5] Add `<KudosWidget />` to `page.tsx` at root level (outside main content flow; fixed positioning handles placement) | `src/app/page.tsx`

**Checkpoint**: Pill button visible at fixed bottom-right; passes across all scroll positions; clickable without crash.

---

## Phase 8: User Story 6 — Theme Narrative & Sun* Kudos Block (Priority: P3)

**Goal**: `ThemeNarrative` B4 section (Root Further logo + narrative text) and
`SunKudosBlock` D1 section (Kudos promo + "Chi tiết" link) are visible when scrolling.

**Independent Test**: Scroll past awards section → Root Further logo visible; scroll to D1_Sunkudos → "Phong trào ghi nhận" caption + "Sun* Kudos" 57px yellow heading → clicking "Chi tiết" navigates to `/kudos`.

### Components (US6)

- [x] T051 [P] [US6] Create `ThemeNarrative` RSC: Root Further `<Image src="root-further-logo.png" width={…} height={…} alt="Root Further">` centered; narrative images `theme-narrative-img-1.png` and `theme-narrative-img-2.png` via `<Image>`; placeholder `{/* TODO: B4 theme narrative text from content owner */}` paragraph elements; section `bg-[var(--color-surface-dark)] py-[120px]` | `src/components/homepage/ThemeNarrative.tsx`
- [x] T052 [P] [US6] Create `SunKudosBlock` RSC: full-width `<section relative overflow-hidden>`; `kudos-bg.png` as `<Image fill objectFit="cover" alt="" />` background (z-0); inner content `z-10`: "Phong trào ghi nhận" caption `white 24px/700`; "Sun* Kudos" heading `#FFEA9E 57px/700`; KUDOS wordmark `<Image src="kudos-logo.png">` (with `font-family: 'SVN-Gotham'` fallback text `#DBD1C1`); event description `white 16px/700`; "Chi tiết" `<Link href="/kudos">` button `127×56px bg-[#FFEA9E] rounded-[4px] text-[#00101A] font-bold text-[22px]` | `src/components/homepage/SunKudosBlock.tsx`

### Page Wiring (US6)

- [x] T053 [US6] Add `<ThemeNarrative />` and `<SunKudosBlock />` to `page.tsx` in correct vertical order: `<ThemeNarrative />` after hero, `<SunKudosBlock />` after `<AwardsSection />`; complete the full page composition | `src/app/page.tsx`

**Checkpoint**: Full page assembled — all 6 user stories deliver visible, linked content. Navigate through the complete page top-to-bottom without errors.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Responsive layout, accessibility, performance, and environment hardening
across all components produced in Phases 3–8.

- [x] T054 [P] Mobile responsive layout (< 768px): awards grid → `flex-col` 1-column; countdown row → `overflow-x-auto` to prevent overflow; hero text sizes scale down (`text-4xl` → `text-2xl`); header collapses to mobile variant (hide nav links, show hamburger placeholder or compact layout) | `src/components/homepage/`, `src/components/layout/Header.tsx`
- [x] T055 [P] Tablet layout (768–1279px `md:` prefix): awards grid → 2-column (`flex-wrap justify-center`); hero font sizes intermediate; CTA buttons stack or narrow | various files
- [x] T056 [P] Add `aria-live="polite"` wrapper on the `<CountdownTimer>` output region; ensure "Comming soon" label has `aria-hidden="true"` when hidden (not just visually hidden) | `src/components/homepage/CountdownTimer.tsx`
- [x] T057 [P] Audit and apply all accessibility attributes: `aria-current="page"` in `NavLinks` (verify correct), `aria-label="Mở Kudos nhanh"` on `KudosWidget`, `alt` text on all `<Image>` elements, descriptive anchor text for all award "Chi tiết" links | multiple files
- [x] T058 [P] Validate all interactive elements meet 44×44px minimum touch target: CTA buttons, award card links, nav links, bell button, user button, KudosWidget | multiple files
- [x] T059 [P] Set `priority` on keyvisual `<Image>` in hero; set `loading="lazy"` on all award thumbnail images; set `loading="lazy"` on Kudos bg and narrative images | `src/app/page.tsx`, `src/components/homepage/AwardCardImage.tsx`, `src/components/homepage/SunKudosBlock.tsx`
- [x] T060 [P] Run `npx tsc --noEmit` and fix all TypeScript strict-mode errors; ensure no `any` types; add explicit return type annotations to all component functions | all new `.tsx`/`.ts` files
- [x] T061 Run `wrangler dev` (Cloudflare Workers preview) and verify: no Node.js API usage errors, homepage loads, countdown renders, fonts load | local testing

**Checkpoint**: All 9 phases complete — full Homepage SAA is production-ready, responsive at 375/768/1280px, passes WCAG 2.1 AA checks, and deploys without error on Cloudflare Workers.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)           → No dependencies; start immediately
Phase 2 (Foundation)      → Depends on Phase 1 completion (fonts + assets needed)
                            BLOCKS all user story phases
Phase 3 (US1 — P1 MVP)   → Depends on Phase 2
Phase 4 (US2 — P1)       → Depends on Phase 2; can run in parallel with Phase 3
Phase 5 (US3 — P2)       → Depends on Phase 2; can run after or in parallel with P1 phases
Phase 6 (US4 — P2)       → Depends on Phase 2; can run after or in parallel with P1 phases
Phase 7 (US5 — P3)       → Depends on Phase 2; can run after P2 phases
Phase 8 (US6 — P3)       → Depends on Phase 2; can run after P2 phases
Phase 9 (Polish)          → Depends on all story phases being complete
```

### User Story Execution Order (recommended for single developer)

```
Phase 1 → Phase 2 → Phase 3 (US1) → Phase 4 (US2) → Phase 5 (US3)
→ Phase 6 (US4) → Phase 7 (US5) → Phase 8 (US6) → Phase 9 (Polish)
```

### Parallel Execution (if 2+ developers available)

**Pair A**: Phase 3 (US1 countdown components) + Phase 4 (US2 CTAButton components)
**Pair B**: Phase 5 (US3 award cards) + Phase 6 (US4 NavLinks + Header/Footer)

### Within Each Story

- Asset/type prerequisites → leaf components (no deps) → composition component → page wiring

---

## Implementation Strategy

### MVP Scope (minimum shippable)

Complete **Phase 1 + Phase 2 + Phase 3 + Phase 4** = countdown live, event info visible,
both CTA buttons functional. Homepage is meaningful to an end user. All P1 user stories
done.

### Incremental Delivery

1. **Iteration 1 (MVP)**: Phases 1–4 → hero with countdown + CTAs
2. **Iteration 2 (Content)**: Phases 5–6 → awards grid + sticky nav
3. **Iteration 3 (Kudos)**: Phases 7–8 → widget + Kudos promo block
4. **Iteration 4 (Done)**: Phase 9 → polish, responsive, a11y, deploy validation

---

## Open Items (must resolve before or during implementation)

| # | Owner | Question | Impact |
|---|-------|----------|--------|
| Q1 | Content Team | B4 theme narrative paragraph text | Blocks ThemeNarrative prose (T051) |
| Q2 | Designer | "Comming soon" typo — keep as-is or fix to "Coming soon"? | Affects T035 label string |
| Q3 | Designer | `KudosWidget` `bottom` value in fixed positioning (Figma uses `top: 830px` absolute) | Affects T049 CSS |
| Q4 | Team | Widget quick-action menu items and routes | T049 stub — unblocks after MVP |
| Q5 | Designer | Should KudosWidget appear on mobile (< 768px)? | Affects T054 responsive task |
| Q6 | Licensing | Digital Numbers + SVN-Gotham commercial license available? | Blocks T021, T022 (fallback if not) |
| Q7 | Content Team | Award descriptions and exact award names confirmed? | Blocks T029 data entry |

---

## Task Summary

| Phase | Purpose | Tasks | Parallel Opportunities |
|-------|---------|-------|------------------------|
| 1 — Setup | Assets + Fonts + Env | T001–T024 (24) | T002–T022 all parallelizable |
| 2 — Foundation | Tokens + Types + Data | T025–T031 (7) | T026–T031 parallel after T025 |
| 3 — US1 | Countdown + EventInfo | T032–T037 (6) | T032–T036 parallel; T037 sequential |
| 4 — US2 | CTA Buttons | T038–T040 (3) | T038–T039 parallel; T040 sequential |
| 5 — US3 | Award Cards Grid | T041–T045 (5) | T041–T044 parallel; T045 sequential |
| 6 — US4 | Sticky Header + Footer | T046–T048 (3) | T046 parallel; T047–T048 sequential |
| 7 — US5 | Kudos Widget | T049–T050 (2) | T050 sequential after T049 |
| 8 — US6 | Narrative + Kudos Block | T051–T053 (3) | T051–T052 parallel; T053 sequential |
| 9 — Polish | Responsive + A11y + QA | T054–T061 (8) | T054–T060 parallel; T061 sequential |
| **Total** | | **61 tasks** | **~45 parallelizable** |
