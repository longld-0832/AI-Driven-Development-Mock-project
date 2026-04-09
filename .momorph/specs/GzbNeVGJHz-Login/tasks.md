# Tasks: Login

**Frame**: `GzbNeVGJHz-Login`
**Prerequisites**: plan.md ✅ | spec.md ✅ | design-style.md ✅
**User Stories**: US1 — Google Login (P1), US2 — Language Toggle (P2)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this belongs to (US1, US2)
- **|**: Primary file affected by this task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, asset download, and token scaffolding. No user story
work can begin until Phase 1 is complete.

- [x] T001 Download keyvisual background image from MoMorph media (Figma: C_Keyvisual `662:14388`) | `public/assets/login/images/keyvisual-bg.png`
- [x] T002 [P] Download ROOT FURTHER logo from MoMorph media (Figma: MM_MEDIA_Root Further Logo) | `public/assets/login/images/root-further-logo.png`
- [x] T003 [P] Download SAA 2025 logo from MoMorph media (Figma: A.1_Logo) | `public/assets/common/logos/saa-logo.png`
- [x] T004 [P] Download Google icon from MoMorph media (Figma: MM_MEDIA_Google, 24×24px) | `public/assets/login/icons/google-icon.svg`
- [x] T005 [P] Download Vietnamese flag icon from MoMorph media (Figma: MM_MEDIA_VN, 24×24px) | `public/assets/login/icons/vn-flag.svg`
- [x] T006 [P] Download chevron-down icon from MoMorph media (Figma: MM_MEDIA_Down, 24×24px) | `public/assets/login/icons/chevron-down.svg`
- [x] T007 Add Login design tokens to `:root` block: `--color-bg-dark`, `--color-bg-dark-alt`, `--color-header-bg`, `--color-accent-yellow`, `--color-accent-yellow-hover`, `--color-white`, `--color-divider`, `--color-error`, `--shadow-button-hover` | `src/app/globals.css`
- [x] T008 [P] Add `NEXT_PUBLIC_SITE_URL` to `.env.local` and document in README | `.env.local`

**Checkpoint**: All 6 assets downloaded to correct paths; all 9 design tokens added to `globals.css`; `NEXT_PUBLIC_SITE_URL` set locally.

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Shared infrastructure required by both US1 and US2. Must be complete before
any user story work begins.

- [x] T009 Add `Montserrat` and `Montserrat_Alternates` fonts via `next/font/google`; expose as CSS variables `--font-montserrat` and `--font-montserrat-alt` on `<body>`; set `display: 'swap'` | `src/app/layout.tsx`
- [x] T010 Create root middleware: import `createClient` from `src/libs/supabase/middleware.ts`; call `getUser()`; redirect unauthenticated requests to `/login`; always return `supabaseResponse` to propagate refreshed cookies; export `config.matcher` regex to exclude login, auth/callback, and static assets from protection | `src/middleware.ts`
- [x] T011 [P] Create OAuth callback route handler: validate `code` param (redirect to `/login?error=invalid_callback` if absent/malformed); call `exchangeCodeForSession(code)`; validate `next` param against allowlist before redirect; on Supabase error log server-side and redirect to `/login?error=auth_failed` (no internals in response per A09) | `src/app/auth/callback/route.ts`
- [x] T012 [P] Add HTTP security headers block to `public/_headers`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Content-Security-Policy` (no `unsafe-inline` scripts; allowlist `fonts.googleapis.com`, `fonts.gstatic.com`, `*.supabase.co`) | `public/_headers`

**Checkpoint**: Foundation ready — unauthenticated navigation to `/` redirects to `/login`; POST to `/auth/callback?code=invalid` redirects to `/login?error=invalid_callback`; security headers present in all responses (verify with `curl -I`).

---

## Phase 3: User Story 1 — Google Login (Priority: P1) 🎯 MVP

**Goal**: An unauthenticated user visits `/login`, clicks "LOGIN With Google", completes
Google OAuth, and lands on the homepage (`/`) with a valid session.

**Independent Test**: Navigate to `http://localhost:3000/login` → click button → complete
Google consent → lands on `/`; clicking button again shows loading state; navigating back
to `/login` when authenticated redirects to `/`.

### Infrastructure (US1)

- [x] T013 [US1] Create `src/app/(auth)/login/` route group directory; create `loading.tsx` with full-height `#00101A` dark skeleton div | `src/app/(auth)/login/loading.tsx`
- [x] T014 [P] [US1] Create `error.tsx` as `"use client"` component: display generic "Something went wrong" message and retry button | `src/app/(auth)/login/error.tsx`

### Components (US1)

- [x] T015 [US1] Create `LoginButton` client component (`"use client"`): `LoginButtonProps { initialError?: string | null }`; state `isLoading: boolean`, `error: string | null`; on click call `createClient().auth.signInWithOAuth({ provider: 'google', options: { redirectTo: \`${process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin}/auth/callback\` } })`; loading spinner replaces Google icon; on SDK error set generic error string; render `<p role="alert">` below button when error; `aria-label="Login with Google"`, `aria-disabled={isLoading}` | `src/components/auth/LoginButton.tsx`
- [x] T016 [US1] Apply full button styles to `LoginButton`: `w-full md:w-[305px] h-[60px] min-h-[44px] bg-[#FFEA9E] rounded-lg flex items-center justify-center gap-2 px-6 py-4 cursor-pointer font-bold text-[22px] leading-7 text-[#00101A]`; hover: `hover:bg-[#FFE082] hover:shadow-[var(--shadow-button-hover)]`; focus: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2`; loading: `opacity-60 pointer-events-none`; Google icon trailing `w-6 h-6`; error text: `text-[#FF4D4F] text-sm mt-2` | `src/components/auth/LoginButton.tsx`
- [x] T017 [P] [US1] Create `Footer` RSC: `absolute bottom-0 w-full flex justify-between items-center border-t border-[#2E3940] px-4 py-6 md:px-10 xl:px-[90px] xl:py-10`; text "Bản quyền thuộc về Sun* © 2025" in Montserrat Alternates 16px/700 white | `src/components/layout/Footer.tsx`

### Page (US1)

- [x] T018 [US1] Create `LoginPage` RSC: import Supabase server client; call `getUser()` — if authenticated call `redirect('/')`; read `error` search param; render full-page layout: `<Header>`, `<main relative min-h-screen bg-[#00101A] overflow-hidden>` containing `<Image fill object-cover>` keyvisual (priority, alt="", z-0), two gradient veil `<div>`s (absolute, z-1), hero section (z-10) with ROOT FURTHER `<Image>`, hero `<p>` text, `<LoginButton initialError={error}>`, `<Footer>` | `src/app/(auth)/login/page.tsx`

**Checkpoint**: User Story 1 complete — full happy-path Google OAuth flow works end-to-end; error state renders correctly; authenticated users are redirected.

---

## Phase 4: User Story 2 — Language Toggle (Priority: P2)

**Goal**: The user can click the "VN" language selector in the header to open a language
dropdown, select a language, and close the dropdown; keyboard (Escape) and click-outside
dismiss also work.

**Independent Test**: Navigate to `/login` → click "VN" button → dropdown opens showing
VN/EN options → click outside → dropdown closes without locale change; press Escape while
open → dropdown closes; tab to button + Enter → dropdown opens with `aria-expanded="true"`.

### Components (US2)

- [x] T019 [US2] Create `LanguageToggle` client component (`"use client"`): `LanguageToggleProps { currentLocale?: string }`; state `isOpen: boolean`; click button toggles `isOpen`; click-outside via `useEffect` + `useRef` closes dropdown; Escape keydown closes dropdown; render VN flag `<Image>`, label text, chevron `<Image>`; `aria-label="Select language"`, `aria-expanded={isOpen}`, `aria-haspopup="listbox"` | `src/components/auth/LanguageToggle.tsx`
- [x] T020 [US2] Apply full styles to `LanguageToggle`: button `w-[108px] h-14 min-h-[44px] p-4 rounded flex items-center gap-0.5 justify-between cursor-pointer`; Default bg: transparent; Hover: `hover:bg-white/[0.08]`; Focus: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2`; Active: `active:bg-white/[0.12]`; dropdown `<ul role="listbox">` minimal placeholder with VN/EN `<li>` options; hidden label text on mobile (`hidden md:inline`) | `src/components/auth/LanguageToggle.tsx`
- [x] T021 [US2] Create `Header` RSC: `absolute top-0 w-full z-10 h-20 flex items-center justify-between bg-[#0B0F12]/80 px-4 md:px-10 xl:px-36 py-3`; left: SAA logo `<Image>` (`w-10 h-10 md:w-[52px] md:h-14 object-contain`, alt="SAA 2025"); right: `<LanguageToggle />` client island | `src/components/layout/Header.tsx`

**Checkpoint**: User Story 2 complete — language toggle opens/closes correctly via click, Escape, and click-outside; `aria-expanded` toggles correctly; Header renders with correct layout at all three breakpoints.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Responsive verification, accessibility audit, and final Principle VI/VII compliance.

- [ ] T022 Verify responsive layout at 375px viewport: no horizontal scroll, Login button `w-full`, header/footer `px-4`, ROOT FURTHER image `max-w-[320px]`, touch targets ≥ 44px; fix any violations | `src/app/(auth)/login/page.tsx`
- [ ] T023 [P] Verify responsive layout at 768px (`md:`) and 1280px (`xl:`): Login button `w-[305px]`, header `px-10`/`xl:px-36`, ROOT FURTHER image `md:max-w-[340px]`/`xl:w-[451px]`; fix any violations | `src/app/(auth)/login/page.tsx`
- [ ] T024 [P] Accessibility audit: confirm tab order (Language toggle → Login button); `role="alert"` on error `<p>`; all decorative images have `alt=""`; SAA logo has descriptive alt; run axe DevTools or equivalent; fix violations | `src/components/auth/LoginButton.tsx`, `src/components/layout/Header.tsx`
- [ ] T025 [P] Add `generateMetadata` export to Login page: title "Login — SAA 2025", description, `robots: noindex` (auth page should not be indexed) | `src/app/(auth)/login/page.tsx`
- [ ] T026 Verify HTTP security headers are served in Cloudflare Workers/Pages dev mode: `curl -I http://localhost:3000` must show `X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`; fix if missing | `public/_headers`
- [ ] T027 [P] Verify TR-007: `curl "http://localhost:3000/auth/callback"` (no code) must redirect to `/login?error=invalid_callback` not expose any error message body | `src/app/auth/callback/route.ts`
- [ ] T028 Remove placeholder `console.log` calls from `LanguageToggle`; replace with proper locale state stub (localStorage key `locale`) for future i18n integration | `src/components/auth/LanguageToggle.tsx`
- [x] T029 **Bug fix** — Language toggle selection not persisted: add internal `selectedLocale` state (initialized from `currentLocale` prop + `localStorage`); on option click update state, persist to `localStorage` key `locale`, and close dropdown; update `aria-selected` and button label/flag to reflect new selection; show VN flag only for `vi`, text-only for other locales | `src/components/auth/LanguageToggle.tsx`
- [x] T030 **Bug fix** — Language toggle dropdown invisible after click (onClick appears broken): `<header>` and `<section>` share the same `z-index: 10`; CSS paints DOM-later siblings on top, so the hero section covers the header's stacking context including the dropdown; fix by raising `<header>` to `z-20` so the dropdown always paints above the hero section | `src/components/layout/Header.tsx`
- [x] T031 **Bug fix** — Page text does not update when language is changed: `LoginPage` is an RSC whose HTML is static; extract locale constants to `src/libs/i18n/locale.ts`; create `src/hooks/useLocale.ts` hook that reads `localStorage` on mount and subscribes to a `localechange` window custom event; update `LanguageToggle.selectLocale()` to dispatch that event; create `LoginHeroText` client component that uses the hook and renders translated hero copy; replace hardcoded `<p>` in `LoginPage` with `<LoginHeroText />` | `src/libs/i18n/locale.ts`, `src/hooks/useLocale.ts`, `src/components/auth/LoginHeroText.tsx`, `src/components/auth/LanguageToggle.tsx`, `src/app/(auth)/login/page.tsx`
- [x] T032 **Bug fix** — On mobile the fixed `<Header>` (`h-20` = 80px) overlaps the ROOT FURTHER hero text because the hero section only had `pt-16` (64px); also the Login button was not anchored to the bottom of the viewport on small screens; fix: change hero section top padding to `pt-24` (96px) to clear the header, add `min-h-screen md:min-h-0` so section fills the full viewport height on mobile, give the content block `flex-1 md:flex-none` to expand and consume remaining space, wrap `<LoginButton>` in `<div className="mt-auto md:mt-0">` to push it to the bottom on mobile while preserving normal flow on `md+` | `src/app/(auth)/login/page.tsx`

**Checkpoint**: All Success Criteria (SC-001–SC-004) and Technical Requirements (TR-006–TR-008) verified and passing. Plan's Definition of Done checklist complete.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
  └─► Phase 2 (Foundation)       ← BLOCKS all user story work
        ├─► Phase 3 (US1 — P1)  🎯 MVP
        │     └─► Phase 5 (Polish) — after both US1 + US2 complete
        └─► Phase 4 (US2 — P2)
              └─► Phase 5 (Polish)
```

### Within Phase 2

| Task | Depends on |
|------|-----------|
| T009 (Fonts) | T007 (tokens in globals.css) |
| T010 (Middleware) | — (independent) |
| T011 (Callback route) | — (independent) |
| T012 (_headers) | — (independent) |

### Within Phase 3 (US1)

| Task | Depends on |
|------|-----------|
| T013 (loading.tsx) | Phase 2 complete |
| T014 (error.tsx) | Phase 2 complete |
| T015 (LoginButton — logic) | Phase 2 complete, T001/T004 (assets) |
| T016 (LoginButton — styles) | T015 |
| T017 (Footer) | T009 (Montserrat Alternates font) |
| T018 (LoginPage) | T015, T016, T017, T013, T014, T001, T002, T003 |

### Within Phase 4 (US2)

| Task | Depends on |
|------|-----------|
| T019 (LanguageToggle — logic) | Phase 2 complete, T005/T006 (assets) |
| T020 (LanguageToggle — styles) | T019 |
| T021 (Header) | T019, T020, T003 (SAA logo), T009 (fonts) |

### Parallel Opportunities

**Phase 1 (Setup)**: T001–T006 all asset downloads can run in parallel. T007 + T008 can
also run in parallel with each other and with asset downloads.

**Phase 2 (Foundation)**: T010, T011, T012 can run in parallel. T009 depends only on
T007.

**Phase 3 and Phase 4**: Once Phase 2 is complete, US1 (Phase 3) and US2 (Phase 4) can
be worked on in parallel by different developers. Within each story: component tasks
marked `[P]` can be worked in parallel.

---

## Implementation Strategy

### MVP Scope (Recommended Sprint 1)

1. Phase 1 (Setup) — all 8 tasks
2. Phase 2 (Foundation) — all 4 tasks
3. Phase 3 (US1 — Google Login) — all 6 tasks

**Stop and validate**: full OAuth happy-path works, error state works, redirect works.
Deploy Phase 1–3 if ready.

### Incremental Delivery

1. Phases 1–2 + Phase 3 → Test & Deploy (Login works, language toggle shows placeholder)
2. Phase 4 (US2) → Test & Deploy (language toggle interactive)
3. Phase 5 (Polish) → Test & Deploy (all TRs verified)

---

## Summary

| Phase | Tasks | Parallel? | Blocking |
|-------|-------|-----------|---------|
| Phase 1 — Setup | T001–T008 (8 tasks) | T001–T006 fully parallel | Yes — blocks Phase 2 |
| Phase 2 — Foundation | T009–T012 (4 tasks) | T010–T012 parallel | Yes — blocks US phases |
| Phase 3 — US1 Google Login (P1) | T013–T018 (6 tasks) | T013/T014/T017 parallel | Blocks Phase 5 |
| Phase 4 — US2 Language Toggle (P2) | T019–T021 (3 tasks) | T019 parallel with T017 | Blocks Phase 5 |
| Phase 5 — Polish | T022–T028 (7 tasks) | T023/T024/T025/T026/T027 parallel | — |
| **Total** | **28 tasks** | **17 parallelizable** | — |

**MVP scope**: Phases 1–3 = 18 tasks (Google Login fully working).
