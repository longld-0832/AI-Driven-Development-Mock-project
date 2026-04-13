# Implementation Plan: Homepage SAA

**Frame**: `i87tDx10uM-HomepageSAA`
**Date**: 2026-04-09
**Spec**: `specs/i87tDx10uM-HomepageSAA/spec.md`
**Design**: `specs/i87tDx10uM-HomepageSAA/design-style.md`

---

## Summary

Replace the stub `src/app/page.tsx` with the fully-featured SAA 2025 Homepage — a
static-first server-rendered page with a single client island (`CountdownTimer`) and a
fixed floating widget (`KudosWidget`). Data is entirely static (no API calls at runtime):
the event date comes from an env var, award data from a constants file. Auth protection is
already handled by the existing middleware. The header must gain homepage-specific nav
links and active-state logic. Design tokens shared with Login already exist in
`globals.css`; new Homepage tokens (shadow-widget, accent-yellow-dim, surface-dark,
etc.) must be added.

**Tech stack**: Next.js 15 App Router · TypeScript strict · TailwindCSS v4 · Supabase SSR
(auth only) · Cloudflare Workers edge runtime · Self-hosted Digital Numbers & SVN-Gotham
fonts.

---

## Technical Context

| Key | Value |
|-----|-------|
| Language/Framework | TypeScript 5 / Next.js 15 App Router |
| Styling | TailwindCSS v4, CSS custom-property design tokens |
| Auth | Supabase Auth via `@supabase/ssr` (session verified in RSC) |
| Deployment | Cloudflare Workers — `@opennextjs/cloudflare` |
| State Management | Local React state only (`CountdownTimer`, `LanguageToggle`) |
| Data fetching | None at page render (env var + static constants) |
| Testing | No test framework currently installed (deferred — see Risks) |
| Fonts | Montserrat + Montserrat Alternates (Google, existing) · Digital Numbers + SVN-Gotham (self-hosted, **new**) |

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

| Requirement | Constitution Rule | Status |
|-------------|-------------------|--------|
| TypeScript strict | Principle I — no implicit `any` | ✅ Compliant |
| RSC first, `"use client"` only where needed | Principle II | ✅ `CountdownTimer` + `KudosWidget` only |
| Auth via Supabase server client | Principle III | ✅ `getUser()` in page RSC |
| Edge-compatible (no Node APIs) | Principle IV | ✅ Only `Date`, `setInterval`, env vars |
| Design tokens in `globals.css` | Principle V | ✅ All new tokens added in Phase 0 |
| Mobile-first responsive | Principle VI | ✅ All breakpoints: 375/768/1280px |
| `getUser()` before page render | Principle VII — A01 | ✅ middleware + page dual-check |
| No secrets in `NEXT_PUBLIC_*` | Principle VII — A02 | ✅ Only event date in public env |
| SRP — thin `page.tsx` | Coding Standards | ✅ page composes feature components only |
| Function size ≤ 40 lines | Coding Standards | ✅ each component scoped to one concern |
| Asset naming `kebab-case` | Coding Standards | ✅ `keyvisual-bg.png`, `award-top-talent.png` |

**Violations (if any)**: None.

> **Open pre-implementation question**:
> - "Comming soon" typo — keep as-is from Figma or fix to "Coming soon"? (must confirm with team/designer; plan documents both code paths)
> - Widget quick-action menu content is TBD per spec — implement as a stub link for now.
> - B4 theme narrative exact text must be provided by content owner before Phase 2.

---

## Architecture Decisions

### Component Architecture

The page is composed of **independent RSC leaf components** assembled in `src/app/page.tsx`.
Only two client islands break the RSC boundary:

```
src/app/page.tsx                          ← RSC (Auth check → compose)
├── <Header />            RSC             ← Updated: adds homepage nav links + active state
├── <KeyvisualSection />  RSC             ← New: full-bleed bg + gradient overlay
│   ├── <CountdownSection />
│   │   ├── <CountdownTimer />  "use client"  ← setInterval, reads NEXT_PUBLIC_EVENT_DATE
│   │   └── <EventInfo />  RSC
│   └── <HeroCTA />       RSC             ← Two CTAButton next/link elements
├── <ThemeNarrative />    RSC             ← Static text block
├── <AwardsSection />     RSC             ← C1 header + AwardsGrid
│   └── <AwardCard />     RSC (×6)
├── <SunKudosBlock />     RSC             ← D1 block
├── <KudosWidget />       "use client"    ← Fixed pill, opens quick-action stub
└── <Footer />            RSC             ← Updated: adds 4 nav links
```

### State Management approach

| Component | State | Rationale |
|-----------|-------|-----------|
| `CountdownTimer` | `timeLeft: { days, hours, minutes }` (local, `useState`) | `setInterval` requires browser — must be client |
| `CountdownTimer` | `isEventPast: boolean` (derived) | Hides "Comming soon" label |
| `KudosWidget` | none | Stateless; renders as `<button>` stub |
| `Header` | `activeRoute` from `usePathname()` | RSC cannot read pathname — Header nav island needed |

> **Architecture note for Header**: The Header RSC renders the static shell; a tiny
> `<NavLinks />` client island uses `usePathname()` to apply active/selected state.
> This keeps the majority of the Header as RSC.

### Font strategy

Two fonts are **not** Google Fonts and must be self-hosted:

| Font | Usage | Action |
|------|-------|--------|
| `Digital Numbers` | Countdown digit boxes | Download `.woff2` → `public/fonts/digital-numbers.woff2`; add `@font-face` in `globals.css` |
| `SVN-Gotham` | KUDOS wordmark | Download `.woff2` → `public/fonts/svn-gotham.woff2`; add `@font-face` in `globals.css` |

### Static award data

Award cards are static content represented as a typed constant:

```ts
// src/data/awards.ts
export interface Award {
  slug: string;
  name: string;
  description: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
}
export const AWARDS: Award[] = [ /* 6 entries */ ];
```

### Env var strategy

```
NEXT_PUBLIC_EVENT_DATE=2025-12-26T18:30:00+07:00
```

- Exposed to client (needed by `CountdownTimer`)
- Contains no PII or secrets — compliant with Principle VII A02
- Must be added to `.env.local`, `wrangler.jsonc` (CF Workers), and documented in README

---

## Project Structure

### Documentation (this feature)

```
.momorph/specs/i87tDx10uM-HomepageSAA/
├── spec.md              ✅ Done
├── design-style.md      ✅ Done
├── plan.md              ← This file
└── tasks.md             ← Next step
```

### Source Code Changes

```
# New files
src/
├── app/
│   └── (home)/
│       └── error.tsx                          ← Homepage error boundary
├── components/
│   └── homepage/
│       ├── CountdownSection.tsx               ← "use client" wrapper
│       ├── CountdownTimer.tsx                 ← "use client" setInterval logic
│       ├── CountdownUnit.tsx                  ← RSC: renders one DAYS/HOURS/MINUTES unit
│       ├── DigitBox.tsx                       ← RSC: single digit box (gradient bg)
│       ├── EventInfo.tsx                      ← RSC: time/venue/livestream block
│       ├── HeroCTA.tsx                        ← RSC: two CTAButton links
│       ├── CTAButton.tsx                      ← RSC: shared outline→hover-fill button
│       ├── ThemeNarrative.tsx                 ← RSC: Root Further text block
│       ├── AwardsSection.tsx                  ← RSC: C1 header + AwardsGrid
│       ├── AwardsGrid.tsx                     ← RSC: 3×2 flex layout
│       ├── AwardCard.tsx                      ← RSC: single award card
│       ├── SunKudosBlock.tsx                  ← RSC: D1 Kudos promo
│       └── KudosWidget.tsx                    ← "use client": fixed pill button
├── components/
│   └── layout/
│       └── NavLinks.tsx                       ← "use client": active-state nav (new island)
├── data/
│   └── awards.ts                              ← Static award constants + Award type
└── types/
    └── countdown.ts                           ← TimeLeft interface

# Modified files
src/app/page.tsx                               ← Replace stub with homepage RSC
src/app/layout.tsx                             ← Add @font-face for Digital Numbers + SVN-Gotham
src/app/globals.css                            ← Add Homepage design tokens + @font-face rules
src/components/layout/Header.tsx              ← Add nav links area, use NavLinks island
src/components/layout/Footer.tsx              ← Add 4 nav links + copyright

# New public assets
public/
├── fonts/
│   ├── digital-numbers.woff2                  ← Self-hosted (download from source)
│   └── svn-gotham.woff2                       ← Self-hosted (download from source)
└── assets/
    └── homepage/
        ├── keyvisual-bg.png                   ← Figma media: 2167:9028
        ├── root-further-logo.png              ← Figma media: 2788:12911
        ├── theme-narrative-img-1.png          ← Figma media: 3204:10155
        ├── theme-narrative-img-2.png          ← Figma media: 3204:10154
        ├── kudos-bg.png                       ← Figma media: I3390:10349;313:8416
        ├── kudos-logo.png                     ← Figma media: I3390:10349;329:2948
        ├── saa-logo.png                       ← Figma media: I2167:9091;178:1033;178:1030
        ├── footer-logo.png                    ← Figma media: I5001:14800;342:1408;178:1030
        ├── icon-notification.svg              ← Figma media: I2167:9091;186:2101;...
        ├── icon-language.svg                  ← Figma media: I2167:9091;186:1597;...
        ├── icon-up-arrow.svg                  ← Figma media: I2167:9063;186:1766
        ├── icon-widget-pencil.svg             ← Figma media: I5022:15169;214:3839;186:1763
        ├── icon-widget-saa.svg                ← Figma media: I5022:15169;214:3839;186:1766;214:3762
        └── awards/
            ├── top-talent.png                 ← Figma media: I2167:9075 variants
            ├── top-project.png                ← Figma media: I2167:9076 variants
            ├── project-leader.png             ← Figma media: I2167:9077 variants
            ├── best-manager.png               ← Figma media: I2167:9079 variants
            ├── signature.png                  ← Figma media: I2167:9080 variants
            └── mvp.png                        ← Figma media: I2167:9081 variants
```

---

## Implementation Strategy

### Phase 0 — Asset Preparation & Tokens (blocker for all phases)

> Must be complete before any component work begins.

**0.1 Download Figma media assets**
- Use `get_media_files` for screen `i87tDx10uM` (already fetched above)
- Download all URLs into `public/assets/homepage/` using `curl`/`wget` with correct `kebab-case` names
- Award card thumbnails: download the `81:2442` variant (thumbnail image) for each award card node

**0.2 Obtain self-hosted fonts**
- `Digital Numbers`: obtain `.woff2` from licensed source → `public/fonts/digital-numbers.woff2`
- `SVN-Gotham`: obtain `.woff2` from licensed source → `public/fonts/svn-gotham.woff2`
- Add `@font-face` declarations in `globals.css`

**0.3 Homepage design tokens → `globals.css`**

Add to `:root`:
```css
/* Homepage — Colors (new) */
--color-accent-yellow-dim: rgba(255, 234, 158, 0.10);
--color-border-btn: #998c5f;
--color-surface-dark: #0f0f0f;

/* Homepage — Shadows */
--shadow-widget: 0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #fae287;
--shadow-award-glow: 0 0 24px rgba(255, 234, 158, 0.25);

/* Homepage — Spacing */
--spacing-section-gap: 120px;
--spacing-countdown-gap: 40px;
--spacing-countdown-inner: 14px;
--spacing-awards-row-gap: 80px;
```

**0.4 Confirm content**
- Obtain B4 theme narrative paragraphs from content owner (blocker for ThemeNarrative)
- Confirm "Comming soon" vs "Coming soon" with team

---

### Phase 1 — Foundation: Types, Data, Shared Tokens (P0)

| Task | File | Notes |
|------|------|-------|
| Define `TimeLeft` interface | `src/types/countdown.ts` | `{ days: number; hours: number; minutes: number }` |
| Create `AWARDS` constants | `src/data/awards.ts` | 6 entries with `slug`, `name`, `description`, `thumbnailSrc`, `thumbnailAlt` |
| Add `NavLinks` client island | `src/components/layout/NavLinks.tsx` | `usePathname()` → apply Selected/Normal variant per link |
| Update `Header.tsx` | `src/components/layout/Header.tsx` | Add nav links slot (renders `<NavLinks />`), bell icon, language toggle, user button |
| Update `Footer.tsx` | `src/components/layout/Footer.tsx` | 4 nav links + copyright (already partially updated for login) |

---

### Phase 2 — Core: Hero Zone + Countdown (US1, TR-001 – TR-007)

| Task | File | Priority |
|------|------|----------|
| `CountdownTimer` client island | `src/components/homepage/CountdownTimer.tsx` | P1 |
| `DigitBox` RSC | `src/components/homepage/DigitBox.tsx` | P1 |
| `CountdownUnit` RSC | `src/components/homepage/CountdownUnit.tsx` | P1 |
| `CountdownSection` wrapper | `src/components/homepage/CountdownSection.tsx` | P1 |
| `EventInfo` RSC | `src/components/homepage/EventInfo.tsx` | P1 |
| Keyvisual background section | Inside `page.tsx` | P1 — `<Image fill priority>` |
| Hero gradient overlay | Inside `page.tsx` or dedicated RSC | P1 |
| Replace stub `page.tsx` | `src/app/page.tsx` | P1 — `getUser()` auth check, compose hero |

**`CountdownTimer` implementation notes**:
```tsx
// Key requirements from spec TR-001, TR-007
const parseEventDate = (): Date | null => {
  try {
    const d = new Date(process.env.NEXT_PUBLIC_EVENT_DATE ?? '');
    return isNaN(d.getTime()) ? null : d;
  } catch { return null; }
};
// setInterval every 60_000ms — update { days, hours, minutes }
// isEventPast = days===0 && hours===0 && minutes===0
// fallback: show '--' when eventDate is null
```

---

### Phase 3 — Navigation CTAs + Hero Buttons (US2, US4)

| Task | File | Priority |
|------|------|----------|
| `CTAButton` shared component | `src/components/homepage/CTAButton.tsx` | P1 — outline default → fill on hover |
| `HeroCTA` RSC (two buttons) | `src/components/homepage/HeroCTA.tsx` | P1 |
| Header `NavLinks` active state | `src/components/layout/NavLinks.tsx` | P2 |
| Keyboard nav / focus ring | All interactive elements | P2 — WCAG 2.1 |

**`CTAButton` notes**:
- Renders as Next.js `<Link>` (not `<button>`) — navigation is the primary action
- Default state: `bg-[rgba(255,234,158,0.1)] border border-[var(--color-border-btn)] text-white`
- Hover state via Tailwind group: `hover:bg-[var(--color-accent-yellow)] hover:border-transparent hover:text-[var(--color-bg-dark)]`
- Focus: `focus-visible:outline-2 focus-visible:outline-[var(--color-accent-yellow)] focus-visible:outline-offset-2`
- Transition: `transition-all duration-150 ease-in-out`

---

### Phase 4 — Content Sections (US3, US6)

| Task | File | Priority |
|------|------|----------|
| `ThemeNarrative` RSC | `src/components/homepage/ThemeNarrative.tsx` | P2 — blocked on B4 text content |
| `AwardCard` RSC | `src/components/homepage/AwardCard.tsx` | P2 |
| `AwardsGrid` RSC | `src/components/homepage/AwardsGrid.tsx` | P2 — flex-col two rows of flex-row |
| `AwardsSection` RSC (C1 header + grid) | `src/components/homepage/AwardsSection.tsx` | P2 |
| `SunKudosBlock` RSC | `src/components/homepage/SunKudosBlock.tsx` | P3 |
| `KudosWidget` client island | `src/components/homepage/KudosWidget.tsx` | P3 — stub button only |

**`AwardsGrid` layout** (from design-style.md):
```tsx
// Two flex rows, each with 3 cards
// gap-20 between rows (80px), gap-[108px] between cards within a row
<div className="flex flex-col gap-20">
  <div className="flex flex-row gap-[108px]">
    {awards.slice(0, 3).map(a => <AwardCard key={a.slug} award={a} />)}
  </div>
  <div className="flex flex-row gap-[108px]">
    {awards.slice(3, 6).map(a => <AwardCard key={a.slug} award={a} />)}
  </div>
</div>
```

**`AwardCard` image error fallback** (spec edge case):
```tsx
// next/image onError → show yellow-bordered placeholder
// Use a local state fallback — this requires "use client"
// OR: use a CSS approach with broken-image hiding — keeps RSC
// Decision: use CSS `onError` with a simple `<div>` fallback via error boundary
```
> **Architecture decision**: Use a thin `AwardCardImage` client sub-component for the
> `onError` fallback only; the rest of `AwardCard` stays RSC.

---

### Phase 5 — Polish, Responsive & Accessibility

| Task | Notes |
|------|-------|
| Mobile layout (< 768px) | Award grid → 1 col; hero stacks; font sizes scale; countdown units may scroll horizontally with `overflow-x-auto` |
| Tablet layout (768–1279px) | Award grid → 2 col; header abbreviated |
| `aria-live="polite"` on countdown | Wraps `<CountdownSection />` |
| `aria-current="page"` on active nav link | `NavLinks` client island |
| `alt` text on all `<Image>` elements | Required TR-003 |
| `aria-label="Open Kudos quick actions"` | `KudosWidget` button |
| Touch targets ≥ 44×44px | Validate on all interactive elements |
| Image priority flags | Keyvisual: `priority`; award thumbnails: `loading="lazy"` |
| `error.tsx` for homepage segment | `src/app/(home)/error.tsx` |
| `loading.tsx` for homepage segment | Optional — RSC streaming is default |
| CSP / `_headers` update | Add `font-src 'self'` for self-hosted fonts |

---

### Phase 6 — Environment & Infrastructure

| Task | File | Notes |
|------|------|-------|
| Add `NEXT_PUBLIC_EVENT_DATE` to `.env.local` | `.env.local` | `2025-12-26T18:30:00+07:00` |
| Add to Cloudflare Workers env | `wrangler.jsonc` | Under `[vars]` section |
| Document in README | `README.md` or `README_en.md` | Required env vars section |
| Verify `public/_headers` CSP | `public/_headers` | Ensure `font-src 'self'` present |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| `Digital Numbers` & `SVN-Gotham` font licensing/availability | **High** | **High** | Confirm license before Phase 0. If unavailable, use fallback: Digital Numbers → monospace system font; SVN-Gotham → Montserrat. Update `globals.css` and `layout.tsx` accordingly. |
| B4 theme narrative text not available | **Medium** | **Medium** | Use a placeholder `[TODO: Root Further narrative text]` and add a code `// TODO` comment; Phase 4 is unblocked for layout work. |
| Widget quick-action menu is TBD | **High** | **Low** | Implement `KudosWidget` as a stub `<button>` (no-op click or `console.log`). P3 priority — out of scope for MVP. |
| `CountdownTimer` hydration mismatch | **Low** | **Medium** | Seed initial `timeLeft` on server using a non-interactive RSC wrapper; hydrate client after mount. Alternative: use `suppressHydrationWarning` on the countdown container only. |
| Cloudflare Workers edge runtime: `setInterval` | **Low** | **High** | `setInterval` runs in the browser (client component), not in the edge runtime. ✅ Safe — `CountdownTimer` is `"use client"`. |
| Award thumbnail images not yet in S3 | **Medium** | **Medium** | Phase 4 can proceed with placeholder images (`/public/assets/homepage/awards/placeholder.png`). Swap when real assets are available. |
| Mobile layout complexity for countdown | **Medium** | **Low** | Add `overflow-x-auto` to countdown row on mobile; or reduce gap/size of digit boxes. Confirm with designer. |

---

## Integration Testing Strategy

### Test Scope

- [ ] **Countdown accuracy**: Verify `timeLeft` calculation is within ±1 minute of actual (SC-001)
- [ ] **Navigation paths**: All 6+ CTA paths navigate to correct destinations without 404 (SC-002)
- [ ] **Auth guard**: Unauthenticated direct visit to `/` redirects to `/login` (FR-008)
- [ ] **Post-event state**: When `NEXT_PUBLIC_EVENT_DATE` is past, "Comming soon" hidden, all units show `00`
- [ ] **Missing env var**: When `NEXT_PUBLIC_EVENT_DATE` is absent, countdown shows `--` without crash (TR-007)
- [ ] **Image fallback**: Award thumbnail 404 → placeholder div shown (edge case)
- [ ] **Responsive**: Page renders at 375px, 768px, 1280px without horizontal overflow

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Countdown tick, post-event hide, env var missing fallback |
| App ↔ External API | No | No external APIs at runtime |
| App ↔ Data Layer | No | Static data only |
| Cross-platform / Responsive | Yes | 375px / 768px / 1280px breakpoints |

### Test Environment

- **Environment type**: Local (dev server) + Cloudflare Workers preview (`wrangler dev`)
- **Test data strategy**: Environment variable overrides for different date scenarios
- **Test dates to cover**:
  - `NEXT_PUBLIC_EVENT_DATE` = future date (pre-event)
  - `NEXT_PUBLIC_EVENT_DATE` = past date (post-event)
  - `NEXT_PUBLIC_EVENT_DATE` = not set (fallback)

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Countdown logic (`CountdownTimer`) | Unit test: 90%+ | High |
| Navigation paths (Playwright E2E) | All 6 routes | High |
| Auth redirect (middleware) | Existing — verify unchanged | High |
| Responsive layout | Visual: 3 breakpoints | Medium |

---

## Open Questions

> Items that must be resolved **before** or **during** implementation. Do NOT block plan on these — note them and proceed with best-guess stubs.

- [ ] **Q1** (Content) — B4 theme narrative paragraph text. Source from Figma text layer or content team before Phase 4.
- [ ] **Q2** (Design) — "Comming soon" typo: keep as Figma design or fix to "Coming soon"? Confirm with lead designer.
- [ ] **Q3** (Design) — Widget bottom position: Figma `top: 830px` (absolute). What `bottom` value for `position: fixed`? Plan uses `bottom: 30px` as estimate.
- [ ] **Q4** (Design) — Widget quick-action menu items. Plan implements as a stub; detail in next spec.
- [ ] **Q5** (Design) — Should `KudosWidget` be visible on mobile (`< 768px`)? Plan shows it at all breakpoints; confirm with designer.
- [ ] **Q6** (Font) — Confirm license and source for `Digital Numbers` and `SVN-Gotham` fonts. If self-hosting is not possible, fallback fonts must be specified.
- [ ] **Q7** (Content) — Award card descriptions and exact award names (confirmation of: Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP).

---

## Estimated Complexity

| Area | Complexity | Notes |
|------|-----------|-------|
| Page skeleton + auth wiring | Low | Pattern identical to Login page |
| CountdownTimer client island | Medium | `setInterval` + edge-case handling |
| AwardsGrid layout | Low | CSS flex, static data |
| Header NavLinks island | Low | `usePathname()` pattern |
| Self-hosted fonts | Medium | License + woff2 generation + CSP |
| Responsive layout | Medium | 3 breakpoints, full page |
| KudosWidget stub | Low | Fixed pill, no menu yet |

**Overall**: Medium — primarily UI/layout work with one non-trivial client island.
