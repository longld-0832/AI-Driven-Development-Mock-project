# Feature Specification: Login

**Frame ID**: `GzbNeVGJHz`
**Internal Node ID**: `662:14387`
**Frame Name**: `Login`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-08
**Status**: Draft

---

## Overview

The Login screen is the entry point for unauthenticated users accessing the SAA 2025
(Sun Annual Awards) platform. It presents a full-screen branded hero experience with
a single sign-on action — **Google OAuth** — and a language switcher in the header.

**Target users**: All SAA 2025 participants and administrators who have not yet
authenticated in the current session.

**Business context**: Centralised authentication via Google ensures every user is a
verified Sun* account holder. After a successful login, the platform can identify the
user and load their personalised home feed.

**Visual reference**: `design-style.md` | Frame image:
`https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/662:14387/9b6a80531ed3a0744c2a0c2ed06a55af.png`

---

## User Scenarios & Testing

### User Story 1 — Google Login (Priority: P1)

**As a** Sun* employee visiting the SAA 2025 platform for the first time (or after
session expiry),
**I want to** log in with my Google (@sun-asterisk.com) account by clicking a single
button,
**So that** I am authenticated and redirected to the homepage without managing a
separate password.

**Why this priority**: Authentication is the prerequisite for every other feature. No
other screen is reachable without successfully completing this story.

**Independent Test**: Navigate to `/` (or `/login`) without a valid session → Login
page renders → click "LOGIN With Google" → Google consent screen appears → accept →
user is redirected to the authenticated homepage.

**Acceptance Scenarios**:

1. **Given** the user is unauthenticated, **When** they visit any protected route,
   **Then** they are redirected to the Login page.

2. **Given** the Login page is rendered, **When** the user clicks "LOGIN With Google",
   **Then** the button enters a loading/disabled state and the Google OAuth popup or
   redirect flow is initiated.

3. **Given** the Google OAuth flow completes successfully with a valid Sun* account,
   **When** the OAuth callback is processed,
   **Then** the user session is created (Supabase Auth) and the user is redirected to
   the authenticated Homepage (`/`).

4. **Given** the Google OAuth flow is cancelled or the user denies consent,
   **When** the popup is closed or the error callback is received,
   **Then** the Login page is shown again with the button restored to its default
   state (no error disrupts the page).

5. **Given** the Google OAuth returns an error (e.g., non-Sun* domain, network failure, or
   Supabase Auth error),
   **When** the error callback is received,
   **Then** an inline error message is rendered directly below the "LOGIN With Google"
   button in `#FF4D4F` (red) using Montserrat 14px/400, the button is restored to
   its default enabled state, and no page reload or navigation occurs.
   Error copy: `"Đăng nhập thất bại. Vui lòng thử lại."` (vi) / `"Login failed. Please try again."` (en).

---

### User Story 2 — Language Selection (Priority: P2)

**As a** user who prefers a different interface language,
**I want to** click the language selector (VN flag + "VN" + chevron) in the header,
**So that** a language dropdown opens and I can switch the UI to my preferred language.

**Why this priority**: Language switching is a supported UX affordance visible on the
Login screen, but it is not required to complete authentication.

**Independent Test**: Navigate to Login page → click "VN" language button → dropdown
`Dropdown-ngôn ngữ` (frame `721:4942`) appears.

**Acceptance Scenarios**:

1. **Given** the Login page is rendered, **When** the user clicks the language button
   (A.2_Language), **Then** the language dropdown overlay opens.

2. **Given** the dropdown is open, **When** the user selects a different language,
   **Then** the UI text updates to the selected locale and the dropdown closes.

3. **Given** the dropdown is open, **When** the user clicks outside the dropdown,
   **Then** the dropdown closes without changing the language.

---

### Edge Cases

- What happens if Supabase Auth is unreachable? → Show an inline error and restore
  the button; do not crash the page.
- What happens if the user's browser blocks popups for Google OAuth? → Fall back to
  redirect-based OAuth flow.
- What if the user navigates directly to an authenticated route while already logged
  in? → Skip Login page and go directly to the target route.

---

## Data Requirements

This screen has **no user-input fields**. All data entry is delegated to the Google
OAuth consent screen. The only data the screen reads or writes locally is:

| Field | Source | Display | Validation |
|-------|--------|---------|------------|
| Access token / session | Supabase Auth (post-OAuth) | Not displayed; stored as cookie | Managed by `@supabase/ssr` |
| Error message | OAuth callback `error` param | Inline below login button | Non-empty string |
| Language preference | User selection via dropdown | Current locale flag + code in header | Must be a supported locale |

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| C_Keyvisual | `662:14388` | Full-bleed background artwork image | None |
| Gradient veils | `662:14392`, `662:14390` | Left and bottom gradient overlays for readability | None |
| A_Header | `662:14391` | Top navigation bar (80px, semi-transparent dark bg) | Container only |
| A.1_Logo | `I662:14391;186:2166` | SAA 2025 logo image, top-left | None |
| A.2_Language | `I662:14391;186:1601` | Language toggle (VN flag + "VN" text + chevron) | Click → open dropdown |
| B.1_Key Visual | `662:14395` | "ROOT FURTHER" text-as-logo image | None |
| B.2_content | `662:14753` | Two-line hero copy encouraging login | None |
| B.3_Login | `662:14425` | Primary CTA — "LOGIN With Google" | Click → OAuth flow |
| D_Footer | `662:14447` | Copyright bar with divider | None |

### Navigation Flow

- **From**: Any unauthenticated entry point (app root, direct URL, link)
- **To (success)**: Authenticated homepage (`/`)
- **To (language button)**: Language dropdown overlay (`Dropdown-ngôn ngữ`, `721:4942`)
- **Triggers**:
  - Successful Google OAuth callback → redirect to `/`
  - Click on A.2_Language → open language dropdown

### Visual Requirements

- **Canvas**: 1440 × 1024px (desktop-first Figma design)
- **Responsive breakpoints** (mandatory per constitution v1.1.0 Principle VI):

  | Breakpoint | Width | Layout changes |
  |------------|-------|----------------|
  | Mobile | ≥ 0px (default) | Stack content vertically; `ROOT FURTHER` image scales to 100% container width; button stretches full-width; padding reduces to `px-4`; header padding reduces to `px-4`; footer padding reduces to `px-4` |
  | Tablet | ≥ 768px (`md:`) | `ROOT FURTHER` image max-width 60%; button fixed-width 305px centered; header/footer padding `px-10` |
  | Desktop | ≥ 1280px (`xl:`) | Full design as per Figma 1440px canvas; hero left-aligned |

  Touch targets: login button and language button MUST be ≥ 44×44px at all breakpoints.
  Horizontal scrolling is forbidden at all breakpoints.

- **Animations/Transitions**:
  - Login button hover: slight lift effect — `box-shadow: 0 4px 16px rgba(255,234,158,0.35)` + background `#FFE082`.
  - Login button: loading spinner replaces Google icon on click; button opacity
    drops to 0.6 and pointer-events disabled during OAuth.
  - Language button: hover highlights with a subtle background tint.
  - Language dropdown: standard dropdown slide-in/fade (per `Dropdown-ngôn ngữ` spec).
- **Accessibility**:
  - Login button MUST have `aria-label="Login with Google"`.
  - Language button MUST have `aria-label="Select language"` and `aria-expanded`
    reflecting dropdown state.
  - All interactive elements MUST be keyboard-focusable (Tab order: Language button →
    Login button).
  - Color contrast: white text on `#00101A` background meets WCAG AA (21:1).
  - `#FFEA9E` button text `#00101A` contrast: ~12.6:1 — passes WCAG AAA.

For exact pixel values, spacing, and typography, see `design-style.md`.

---

## Requirements

### Functional Requirements

- **FR-001**: The system MUST redirect unauthenticated users to the Login page when
  they access any protected route.
- **FR-002**: The system MUST initiate the Supabase Google OAuth flow when the user
  clicks "LOGIN With Google".
- **FR-003**: The system MUST create a valid Supabase session upon successful OAuth
  callback and redirect the user to the homepage.
- **FR-004**: The Login button MUST enter a loading/disabled state immediately upon
  click to prevent duplicate submissions.
- **FR-005**: The system MUST restore the Login button to its default state if the
  OAuth flow is cancelled or returns an error.
- **FR-006**: The language selector MUST open the language dropdown overlay when
  clicked.
- **FR-007**: The system MUST display the copyright footer text:
  `Bản quyền thuộc về Sun* © 2025`.

### Technical Requirements

- **TR-001**: Authentication MUST be implemented using `@supabase/ssr` with the
  server client (`src/libs/supabase/server.ts`) for session validation in middleware
  and the browser client (`src/libs/supabase/client.ts`) for client-side OAuth
  initiation.
- **TR-002**: The OAuth provider MUST be Google; the Supabase project MUST have the
  Google provider enabled with the correct callback URL.
- **TR-003**: The page MUST render as a Next.js Server Component; only the Login
  button sub-component requires `"use client"` for event handling.
- **TR-004**: The page MUST be edge-compatible — no Node.js-only APIs in server code
  (Cloudflare Workers deployment target).
- **TR-005**: All Tailwind styles MUST use CSS variable tokens defined in
  `globals.css` wherever possible; hard-coded hex values are only permitted for
  tokens not yet in the design system (document as TODO in `globals.css`).
- **TR-006**: HTTP security headers MUST be set in `public/_headers` as mandated by
  constitution v1.1.0 Security Standards. Minimum required: `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Content-Security-Policy` (no `unsafe-inline`
  scripts), `Referrer-Policy: strict-origin-when-cross-origin`.
- **TR-007**: The `/auth/callback` route MUST validate the OAuth `code` parameter
  before exchanging for a session; reject requests with missing or malformed `code`
  with a 400 redirect to `/login?error=invalid_callback`. The route MUST NOT expose
  Supabase error details to the client response body.
- **TR-008**: The page MUST be responsive — functional at 375px, 768px, and 1440px
  viewport widths as per constitution v1.1.0 Principle VI.

### Key Entities

- **User Session**: Created by Supabase Auth after successful OAuth. Contains `user.id`,
  `user.email`, `user.user_metadata` (name, avatar from Google).

---

## State Management

### Local Component State (`LoginButton` — `"use client"`)

| State Variable | Type | Initial Value | Description |
|----------------|------|---------------|-------------|
| `isLoading` | `boolean` | `false` | True while OAuth flow is in progress; disables button |
| `error` | `string \| null` | `null` | OAuth error message to display inline |

### Global / Session State

| State | Owner | Mechanism |
|-------|-------|-----------|
| Auth session | Supabase SSR | HTTP-only cookie managed by `@supabase/ssr` middleware |
| Locale | Language dropdown | To be determined by language spec; likely `localStorage` or cookie |

### Loading State Behaviour

- On button click: set `isLoading = true`, clear `error`.
- On OAuth redirect: page navigates away — no cleanup required.
- On OAuth callback error or cancel: set `isLoading = false`, set `error` message.

### Error State Behaviour

- Error displayed inline below button (see US1/scenario 5).
- Error clears on next button click attempt.
- Error does NOT prevent the user from retrying immediately.

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase Auth — `signInWithOAuth` | Browser SDK | Initiate Google OAuth flow | Exists (Supabase) |
| `/auth/callback` | GET | Supabase OAuth callback handler — exchange code for session | New (must implement) |
| Supabase Auth — `getUser` | Server SDK | Validate session in middleware | Exists (Supabase) |

---

## Success Criteria

- **SC-001**: An unauthenticated user can reach the Login page and complete Google
  login within 3 clicks from any protected route.
- **SC-002**: After successful login, the user lands on the homepage in under 2 seconds
  (excluding Google OAuth redirect RTT).
- **SC-003**: A cancelled or failed OAuth attempt leaves the Login page functional
  with no console errors or broken state.
- **SC-004**: The "LOGIN With Google" button is visually disabled during the OAuth
  flow, preventing double submission.

---

## Out of Scope

- Email/password login — this screen supports Google SSO only.
- Mobile-specific layout — desktop-first; responsive version is a separate task.
- Registration / account creation UI — handled by Google OAuth (new users are created
  automatically by Supabase on first login if the Google provider allows it).
- Forgot password flow — not applicable for Google SSO.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`) — predicted above; formal spec pending
- [ ] Database design completed — Supabase Auth tables managed by platform; app schema TBD
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- The Supabase OAuth callback route (`/auth/callback`) must be implemented as a
  Next.js Route Handler (`app/auth/callback/route.ts`) that uses the server client
  to exchange the `code` parameter for a session and then redirects to `/`.
- The `src/libs/supabase/middleware.ts` already scaffolds session refresh — verify
  it protects all non-login routes before implementing.
- The hero background image (`C_Keyvisual`) and "ROOT FURTHER" logo image
  (`B.1_Key Visual`) should be downloaded from Figma/MoMorph media and placed under
  `public/assets/login/images/`.
- Logo asset (`A.1_Logo`) should be placed under `public/assets/common/logos/`.
- Google icon (`MM_MEDIA_Google`) should be placed under `public/assets/login/icons/`.
