# Implementation Plan: Login

**Frame**: `GzbNeVGJHz-Login`
**Date**: 2026-04-08
**Spec**: `specs/GzbNeVGJHz-Login/spec.md`
**Design Style**: `specs/GzbNeVGJHz-Login/design-style.md`
**Constitution**: `constitution.md` v1.1.0

---

## Summary

Implement the Login screen for SAA 2025 using **Next.js 15 App Router** (RSC-first),
**Supabase Auth with Google OAuth** (`@supabase/ssr`), and **Cloudflare Workers** as the
deployment target. The screen has no user-input fields — the sole authentication path is
Google SSO via a single CTA button. All auth session management is delegated to
`@supabase/ssr` HTTP-only cookies. The page is a Server Component; only the Login button
and Language toggle require `"use client"` due to event handling and local state.

---

## Technical Context

| Property | Value |
|----------|-------|
| **Language/Framework** | TypeScript `strict: true` / Next.js 15.5.9 App Router |
| **Primary Dependencies** | TailwindCSS v4, `@supabase/ssr ^0.8.0`, `next/font/google` (Montserrat) |
| **Auth Provider** | Supabase (Google OAuth via `signInWithOAuth`) |
| **Database** | Supabase Auth — platform-managed; no app schema changes |
| **State Management** | React local state in `LoginButton` (`isLoading`, `error`); auth session via HTTP-only cookie |
| **API Style** | Supabase Browser SDK for OAuth init; Route Handler for callback |
| **Edge Runtime** | Cloudflare Workers via `@opennextjs/cloudflare`; no Node.js APIs in server code |
| **Asset Pipeline** | Static images under `public/assets/`; downloaded from MoMorph media |

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **Principle I — TypeScript-First**: All new files use TypeScript with explicit types; no implicit `any`
- [x] **Principle II — RSC by Default**: `LoginPage` is a Server Component; `"use client"` only on `LoginButton` and `LanguageToggle`
- [x] **Principle III — Supabase Single Backend**: Server client (`server.ts`) for `getUser()` in middleware and page; browser client (`client.ts`) for `signInWithOAuth`
- [x] **Principle IV — Edge-Compatible**: No `fs`, `path`, or Node.js crypto; Web Platform APIs only. Cloudflare Workers compliant
- [x] **Principle V — Design-Token Driven UI**: All colors, shadows, radii added to `globals.css` `:root`; components reference CSS variables or Tailwind utilities derived from tokens
- [x] **Principle VI — Responsive Design**: Mobile-first with `md:` (768px) and `xl:` (1280px) breakpoints; touch targets ≥ 44×44px; no horizontal scroll
- [x] **Principle VII — Secure by Default**: `getUser()` for session validation; `public/_headers` with CSP/X-Frame-Options; `/auth/callback` validates `code` param; no secrets in `NEXT_PUBLIC_*`

**Violations**: None.

---

## Architecture Decisions

### Frontend

- **Component Structure**: Feature-co-located. Auth-specific components under
  `src/components/auth/`; shared layout components under `src/components/layout/`.
- **Styling Strategy**: TailwindCSS v4 utility classes with design tokens declared in
  `src/app/globals.css`. Hard-coded hex values used only for tokens not yet in the system
  (documented with `/* TODO: add utility */`).
- **Data Fetching**: Server Component reads auth state via `getUser()` at request time;
  no client-side data fetching on this screen.
- **Font Loading**: `next/font/google` with `Montserrat` and `Montserrat_Alternates` —
  zero CLS, self-hosted at build time, added to `layout.tsx`.

### Backend / Middleware

- **Auth Middleware** (`src/middleware.ts`): Runs on every matched request. Refreshes
  the Supabase session cookie and redirects unauthenticated users to `/login`. Excludes
  `/login`, `/auth/callback`, and all static asset paths from protection.
- **OAuth Callback** (`src/app/auth/callback/route.ts`): Validates the `code` query
  param, exchanges it for a session via the Supabase server client, then redirects to
  `/`. On error: 302 to `/login?error=invalid_callback` with no Supabase internals
  exposed (A09 compliance). Uses PKCE implicitly via `@supabase/ssr`.
- **No new schema**: Supabase Auth tables are platform-managed; this feature adds no
  migrations.

### Integration Points

| Integration | Direction | Notes |
|-------------|-----------|-------|
| Supabase Auth (Google provider) | App → External | Must be enabled in Supabase dashboard; callback URL `{SITE_URL}/auth/callback` must be listed in Google Cloud OAuth allowed redirect URIs |
| `src/libs/supabase/middleware.ts` | Used by `src/middleware.ts` | Existing helper; creates Supabase client scoped to the request |
| `src/libs/supabase/server.ts` | Used by page + callback | Existing helper for server-side `getUser()` |
| `src/libs/supabase/client.ts` | Used by `LoginButton` | Existing browser client for `signInWithOAuth` |
| `public/_headers` | App → Cloudflare | Cloudflare Pages static headers file; new sections added |

---

## Project Structure

### Documentation

```text
.momorph/specs/GzbNeVGJHz-Login/
├── spec.md              # Feature specification (complete)
├── design-style.md      # Design tokens + component styles (complete)
├── plan.md              # This file
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

```text
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       ├── page.tsx          # RSC — Login page entry; redirects if authenticated
│   │       ├── loading.tsx       # Suspense skeleton while server reads auth state
│   │       └── error.tsx         # Error boundary for unexpected render errors
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # Route Handler — exchange OAuth code for session
│   ├── globals.css               # EXTEND: add Login design tokens to :root
│   └── layout.tsx                # EXTEND: add Montserrat + Montserrat Alternates fonts
├── components/
│   ├── auth/
│   │   ├── LoginButton.tsx       # "use client" — CTA with isLoading + error state
│   │   └── LanguageToggle.tsx    # "use client" — language selector with aria-expanded
│   └── layout/
│       ├── Header.tsx            # RSC — sticky header (Logo + LanguageToggle slot)
│       └── Footer.tsx            # RSC — copyright bar
├── libs/
│   └── supabase/
│       ├── client.ts             # EXISTING — browser client (no changes)
│       ├── server.ts             # EXISTING — server client (no changes)
│       └── middleware.ts         # EXISTING — middleware helper (no changes)
└── middleware.ts                 # NEW — route protection + session refresh

public/
├── _headers                      # EXTEND: add security headers block
└── assets/
    ├── common/
    │   └── logos/
    │       └── saa-logo.[ext]            # SAA 2025 logo (download Phase 0)
    └── login/
        ├── images/
        │   ├── keyvisual-bg.[ext]        # Hero background artwork (download Phase 0)
        │   └── root-further-logo.[ext]   # "ROOT FURTHER" logotype (download Phase 0)
        └── icons/
            ├── google-icon.[ext]         # Google G icon (download Phase 0)
            ├── vn-flag.[ext]             # Vietnamese flag (used in LanguageToggle — download Phase 0)
            └── chevron-down.[ext]        # Chevron icon for LanguageToggle (download Phase 0)
```

---

## Implementation Strategy

### Phase 0 — Asset Download *(prerequisite)*

Download all media assets from MoMorph before writing any component code. Missing
assets are a blocking dependency for accurate pixel-level implementation.

**Steps:**
1. Call `mcp_momorph_get_media_files(screen_id: GzbNeVGJHz)` to list all assets and
   their download URLs.
2. Download each asset and place under `public/assets/` following kebab-case naming
   (constitution Coding Standards).
3. Verify dimensions match design spec (logo 52×56, ROOT FURTHER 451×200, Google icon 24×24).

**Expected assets:**
| Asset | Figma Name | Target Path |
|-------|-----------|-------------|
| Hero background | Keyvisual / C_Keyvisual | `public/assets/login/images/keyvisual-bg.[ext]` |
| ROOT FURTHER logo | MM_MEDIA_Root Further Logo | `public/assets/login/images/root-further-logo.[ext]` |
| SAA 2025 logo | MM_MEDIA (logo in header) | `public/assets/common/logos/saa-logo.[ext]` |
| Google icon | MM_MEDIA_Google | `public/assets/login/icons/google-icon.[ext]` |
| VN flag | MM_MEDIA_VN | `public/assets/login/icons/vn-flag.[ext]` |
| Chevron down | MM_MEDIA_Down | `public/assets/login/icons/chevron-down.[ext]` |

---

### Phase 1 — Infrastructure *(US0 — foundation)*

Establish all shared infrastructure required by both US1 and US2.

#### 1.1 — Design Tokens (`src/app/globals.css`)

Add the following to the `:root` block (extend, do not replace existing tokens):

```css
/* Login Screen Design Tokens */
--color-bg-dark: #00101A;
--color-bg-dark-alt: #000D14;
--color-header-bg: rgba(11, 15, 18, 0.8);
--color-accent-yellow: #FFEA9E;
--color-accent-yellow-hover: #FFE082;
--color-white: #FFFFFF;
--color-divider: #2E3940;
--color-error: #FF4D4F;
--shadow-button-hover: 0 4px 16px rgba(255, 234, 158, 0.35);
```

#### 1.2 — Font Loading (`src/app/layout.tsx`)

Add `Montserrat` and `Montserrat_Alternates` using `next/font/google`. Expose as CSS
variables (`--font-montserrat`, `--font-montserrat-alt`) added to `<body>` className.
Ensure `display: 'swap'` for CLS compliance.

#### 1.3 — Middleware (`src/middleware.ts`)

Create root middleware. Responsibilities:
- Call the existing `createClient(request)` helper from `src/libs/supabase/middleware.ts`
- Call `supabase.auth.getUser()` to validate the session (Principle III)
- If unauthenticated AND the path is not in the public allowlist → redirect to `/login`
- Always return the `supabaseResponse` to propagate refreshed cookies

**Matcher config** — export the `config` object from `src/middleware.ts` to restrict middleware to non-static paths:

```typescript
export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon* (favicon files)
     * - assets/ (public static assets)
     * - login (public auth page)
     * - auth/callback (OAuth callback — must not redirect during code exchange)
     */
    '/((?!_next/static|_next/image|favicon|assets/|login|auth/callback).*)',
  ],
};
```

This ensures the middleware only runs on protected application routes and never on the auth flow itself, preventing redirect loops.

#### 1.4 — Auth Callback Route (`src/app/auth/callback/route.ts`)

Route Handler for `GET /auth/callback`:
1. Extract `code` and `next` (optional redirect target) from URL search params
2. Validate `code` is a non-empty string — if missing/malformed, 302 to `/login?error=invalid_callback`
3. Call `supabase.auth.exchangeCodeForSession(code)` using the server client
4. Validate `next` against an **explicit relative-path allowlist** to prevent open-redirect (OWASP A01):
   ```typescript
   const ALLOWED_NEXT_PATHS = ['/']; // extend as app grows
   const redirectTo = ALLOWED_NEXT_PATHS.includes(next ?? '') ? next! : '/';
   // Alternatively: only accept paths starting with '/' and reject any '//' or external hostname
   // const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next : '/';
   ```
5. On success: 302 to `redirectTo`
6. On Supabase error: 302 to `/login?error=auth_failed` — log error server-side (no
   error details to client, A09 compliance)

#### 1.5 — Security Headers (`public/_headers`)

Add the following block (append if file exists):

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co; frame-ancestors 'none'

```

> **Note**: Each header line is indented with exactly 2 spaces. The blank line after the last header is required by the Cloudflare Pages `_headers` format to close the block.

---

### Phase 2 — US1: Google Login *(P1)*

Implement the primary user story: unauthenticated user arrives at `/login`, clicks the
button, completes Google OAuth, and lands on `/`.

#### 2.1 — Login Page (`src/app/(auth)/login/page.tsx`)

Server Component. Steps:
1. Create Supabase server client via `src/libs/supabase/server.ts`
2. Call `getUser()` — if user is authenticated, `redirect('/')` immediately
3. Read optional `error` search param (from callback redirect) and pass to `LoginButton`
4. Render full-page layout:
   - `<Header>` (absolute top, z-10)
   - `<main>` with `relative min-h-screen bg-[#00101A] overflow-hidden`:
     - `<Image>` (`next/image`) for keyvisual with `fill` prop + `object-cover`, `priority`,
       `alt=""` (decorative), `z-0`. Use `next/image` — not raw `<img>` — to match the
       project convention established in `src/app/page.tsx` and gain automatic WebP/AVIF
       optimization at the CF edge.
     - Gradient veil overlays (`<div>` with inline Tailwind gradient classes, absolute, z-1)
     - Hero section (absolute/relative content, px responsive, z-10):
       - `<Image>` for ROOT FURTHER logo (width=451, height=200 at desktop; responsive via `className`)
       - Hero description `<p>` text
       - `<LoginButton>` (receives `initialError` prop)
   - `<Footer>` (absolute bottom, z-10)

#### 2.2 — Login Button (`src/components/auth/LoginButton.tsx`)

`"use client"` component. Interface:

```typescript
interface LoginButtonProps {
  initialError?: string | null;
}
```

State: `isLoading: boolean`, `error: string | null` (initialized from `initialError`).

Button behavior:
1. On click: set `isLoading = true`, clear `error`
2. Call `createClient().auth.signInWithOAuth`:
   ```typescript
   const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin}/auth/callback`;
   await createClient().auth.signInWithOAuth({ provider: 'google', options: { redirectTo } });
   ```
   > **Env var required**: `NEXT_PUBLIC_SITE_URL` MUST be set in `.env.local` (development)
   > and in the Cloudflare Workers environment variables (production). Without it, the callback
   > URL falls back to `window.location.origin`, which works locally but may break in preview
   > deployments with dynamic URLs. Add `NEXT_PUBLIC_SITE_URL=http://localhost:3000` to `.env.local`.
3. On error from SDK: set `isLoading = false`, set `error` to a generic message (never
   expose raw Supabase error to DOM — A09 compliance)
4. On OAuth redirect: page navigates away (no cleanup needed)

Render:
- Button with `aria-label="Login with Google"`, `aria-disabled={isLoading}`
- When `isLoading`: spinner SVG replaces Google icon, opacity 0.6, `pointer-events-none`
- When `!isLoading`: trailing Google icon (from `public/assets/login/icons/google-icon.[ext]`)
- Hover classes: `hover:bg-[#FFE082] hover:shadow-[var(--shadow-button-hover)]`
- Focus classes: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFEA9E]`
- When `error`: render `<p role="alert" className="text-[#FF4D4F] text-sm mt-2">{error}</p>`
  below the button

#### 2.3 — Loading / Error Boundaries

- `src/app/(auth)/login/loading.tsx`: minimal dark-screen skeleton (full-height `#00101A` div)
- `src/app/(auth)/login/error.tsx`: `"use client"` error component per Next.js convention;
  display a generic "Something went wrong" message and a retry button

---

### Phase 3 — US2: Language Toggle *(P2)*

Implement the language selector button in the header.

#### 3.1 — Language Toggle (`src/components/auth/LanguageToggle.tsx`)

`"use client"` component. Interface:

```typescript
interface LanguageToggleProps {
  currentLocale?: string; // default 'VN'
}
```

State: `isOpen: boolean`.

Behavior:
- Click button: toggle `isOpen`
- Click outside (or Escape): close dropdown (`useEffect` + `ref` for click-outside detection)
- When `isOpen`: render dropdown overlay (placeholder for `Dropdown-ngôn ngữ` spec `721:4942`);
  for this phase, a minimal `<ul>` with "VN" and "EN" options that `console.log` the selection
  and close the dropdown. Full implementation is scoped to the Language Dropdown screen spec.

Button render:
- `aria-label="Select language"`, `aria-expanded={isOpen}`, `aria-haspopup="listbox"`
- VN flag `<img>`, "VN" text, chevron icon
- Hover: `hover:bg-white/[0.08]`
- Focus: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50`
- Active: `active:bg-white/[0.12]`

#### 3.2 — Header (`src/components/layout/Header.tsx`)

Server Component. Accepts no props. Renders:
- Outer: `absolute top-0 w-full z-10 h-20 flex items-center justify-between bg-[#0B0F12]/80`
- Responsive padding: `px-4 md:px-10 xl:px-36`
- Left: SAA logo `<img>` (`w-[52px] h-14 object-contain`)
- Right: `<LanguageToggle />` (client island embedded in RSC)

---

### Phase 4 — Polish *(cross-cutting concerns)*

#### 4.1 — Responsive Layout

Apply responsive Tailwind classes as specified in `design-style.md` Responsive Behavior:

| Section | Mobile (default) | Tablet (`md:`) | Desktop (`xl:`) |
|---------|--------------------|----------------|-----------------|
| Header padding | `px-4` | `md:px-10` | `xl:px-36` |
| Logo | `w-10 h-10` | `md:w-[52px] md:h-14` | — |
| Language label | hidden (`hidden`) | `md:inline` | — |
| Hero padding | `px-4 py-16` | `md:px-10 md:py-20` | `xl:px-36 xl:py-24` |
| ROOT FURTHER image | `w-full max-w-[320px]` | `md:max-w-[340px]` | `xl:w-[451px] xl:h-[200px]` |
| Hero text | `text-base leading-7` | — | `xl:text-[20px] xl:leading-10` |
| Login button | `w-full min-h-[44px]` | `md:w-[305px]` | — |
| Footer padding | `px-4 py-6` | `md:px-10` | `xl:px-[90px] xl:py-10` |

**Verification**: No horizontal scroll at 375px viewport. All interactive elements ≥ 44px touch target.

#### 4.2 — Accessibility Audit

- [ ] Tab order: Language toggle → Login button (natural DOM order)
- [ ] `aria-label="Login with Google"` on `LoginButton`
- [ ] `aria-label="Select language"` + `aria-expanded` on `LanguageToggle`
- [ ] Error message has `role="alert"` for screen reader announcement
- [ ] All images have descriptive `alt` text or `alt=""` if decorative (keyvisual, gradient veils)
- [ ] Color contrast: white (`#FFFFFF`) on dark (`#00101A`) = 21:1 ✅ WCAG AAA
- [ ] Button text (`#00101A`) on yellow (`#FFEA9E`) = ~12.6:1 ✅ WCAG AAA

#### 4.3 — Footer (`src/components/layout/Footer.tsx`)

Server Component. Renders:
- `absolute bottom-0 w-full flex justify-between items-center border-t border-[#2E3940]`
- Responsive padding: `px-4 py-6 md:px-10 xl:px-[90px] xl:py-10`
- Text: `Bản quyền thuộc về Sun* © 2025`, `font-montserrat-alt text-base font-bold text-white`

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Browser popup blocker | Low | Low | **Non-issue**: `signInWithOAuth` with no `skipBrowserRedirect` option defaults to **redirect mode** (redirects the current tab to Google, no popup). The spec's popup-blocker fallback is already satisfied by the default Supabase SDK behavior. No extra logic needed. |
| Montserrat loaded from Google Fonts blocked by CSP | Low | Medium | CSP `style-src` includes `https://fonts.googleapis.com`; `font-src` includes `https://fonts.gstatic.com` (see Phase 1.5); `next/font` self-hosts fonts at build time, so this is a fallback concern only |
| Middleware redirect loop on `/login` | Medium | High | Exclude `/login` and `/auth/callback` from middleware matcher; test with browser DevTools Network tab |
| `/auth/callback` code replay attack | Low | High | Supabase PKCE flow makes codes single-use; `exchangeCodeForSession` fails on replay — return 302 to `/login?error=auth_failed` |
| Cloudflare Workers `public/_headers` not applied | Low | Medium | Use `wrangler pages dev --local` to verify headers during development; check CF Pages asset serving rules |
| Asset MIME types wrong (SVG CSP) | Low | Medium | Serve icons as `<img>` not `<object>`/inline SVG if CSP disallows `data:` for icons |
| Missing Supabase Google provider config | High | High | Document in README: Supabase dashboard → Authentication → Providers → Google must be enabled with matching `SITE_URL` |

---

## Integration Testing Strategy

### Test Scope

- [x] **UI ↔ Logic**: `LoginButton` loading state prevents double-click; error message renders on OAuth failure; `LanguageToggle` dropdown open/close keyboard and mouse
- [x] **App ↔ External API**: Full Google OAuth flow — button click → Google consent → callback → session cookie created → redirect `/`
- [x] **App ↔ Data Layer**: Middleware reads session from cookie via `getUser()`; callback writes session via `exchangeCodeForSession`; page redirects authenticated users
- [x] **Cross-platform**: Viewport 375px (mobile), 768px (tablet), 1440px (desktop) — no horizontal scroll; touch targets ≥ 44px at all breakpoints

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Button click → loading state; error prop → error message rendered; Cancel OAuth → button restores |
| App ↔ External API | Yes | `signInWithOAuth` with Google → callback URL called; `exchangeCodeForSession` succeeds/fails |
| App ↔ Data Layer | Yes | Middleware `getUser()` → redirect unauthenticated; `page.tsx` `getUser()` → redirect authenticated |
| Cross-platform | Yes | Responsive at 375/768/1440px; keyboard navigation; screen reader announcements |

### Test Environment

| Environment | Purpose |
|-------------|---------|
| `supabase start` (local) | Local Supabase with `wrangler pages dev --local` for end-to-end OAuth testing |
| Browser DevTools | Responsive viewport simulation (375px, 768px, 1440px) |
| VoiceOver / NVDA | Accessibility verification |

### Verification Checklist (Definition of Done)

- [ ] SC-001: Unauthenticated user can complete Google login within 3 clicks from any protected route
- [ ] SC-002: After successful login, user lands on homepage in < 2 seconds (excluding Google OAuth RTT)
- [ ] SC-003: Cancelled or failed OAuth attempt leaves Login page functional with no console errors
- [ ] SC-004: "LOGIN With Google" button is visually disabled during OAuth flow (prevents double submission)
- [ ] TR-006: HTTP security headers present in responses (verified via `curl -I` or DevTools)
- [ ] TR-007: `/auth/callback` with missing `code` returns redirect to `/login?error=invalid_callback`
- [ ] TR-008: Page is functional at 375px, 768px, and 1440px (no horizontal scroll, touch targets ≥ 44px)
- [ ] All constitution principles checked green above
