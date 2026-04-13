# Feature Specification: Homepage SAA

**Frame ID**: `i87tDx10uM`
**Internal Node ID**: `2167:9026`
**Frame Name**: `Homepage SAA`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-09
**Status**: Draft

---

## Overview

The Homepage SAA is the main landing screen for authenticated users of the SAA 2025
(Sun Annual Awards) platform. It serves as the central hub for event discovery,
displaying a pre-event countdown, the theme narrative, the awards system overview,
and a promotional block for Sun* Kudos.

**Target users**: All authenticated Sun* employees who have completed login via Google OAuth.

**Business context**: The homepage acts as the event portal entry point — broadcasting
the countdown to the awards ceremony, surfacing the awards categories, and promoting the
Sun* Kudos recognition initiative. It must load quickly, scroll smoothly, and adapt from
the 1512px desktop canvas down to mobile viewports.

**Visual reference**: `design-style.md` | Frame image:
`https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/2167:9026/e6b9526bed512d707db105ecd2e780dd.png`

---

## User Scenarios & Testing

### User Story 1 — View Countdown & Event Info (Priority: P1)

**As an** authenticated Sun* employee visiting the homepage,
**I want to** see the countdown timer and event logistics (date, time, venue),
**So that** I know exactly when and where SAA 2025 will take place.

**Why this priority**: This is the most time-sensitive information on the screen. It is
visible above the fold and directly answers "when is the event?" without requiring any
interaction.

**Independent Test**: Navigate to `/` as an authenticated user → hero section renders with
countdown tiles (DAYS/HOURS/MINUTES showing valid numbers), event date `26/12/2025`,
time `18h30`, venue `Nhà hát nghệ thuật quân đội`, and note `Tường thuật trực tiếp tại Group Facebook Sun* Family`.

**Acceptance Scenarios**:

1. **Given** the user is authenticated and navigates to `/`, **When** the page renders,
   **Then** the countdown section shows correct remaining DAYS, HOURS, MINUTES until
   `18h30 26/12/2025` with each value zero-padded to 2 digits using Digital Numbers font.

2. **Given** the event start time has not yet passed, **When** the page is loaded,
   **Then** the "Comming soon" label is visible above the countdown blocks.

3. **Given** the event start time has passed (countdown reaches zero), **When** the
   page is loaded or ticking naturally reaches 00 00 00, **Then** the "Comming soon"
   label is hidden and all countdown units remain at `00`.

4. **Given** the countdown is displayed, **When** 1 minute elapses without page reload,
   **Then** the MINUTES value decrements by 1 automatically (client-side tick, interval-based).

5. **Given** the event info block is rendered, **When** the user views the page,
   **Then** the labels `"Thời gian:"` and `"Địa điểm:"` render in **white** (`#FFFFFF`,
   16px/700) and their corresponding values `"18h30"` and `"Nhà hát nghệ thuật quân đội"` render
   in **accent yellow** (`#FFEA9E`, 24px/700). The livestream note
   `"Tường thuật trực tiếp tại Group Facebook Sun* Family"` renders in white (16px/700) beneath.

---

### User Story 2 — Navigate to Awards Information or Kudos (Priority: P1)

**As an** authenticated user on the homepage,
**I want to** click the "ABOUT AWARDS" or "ABOUT KUDOS" CTA buttons,
**So that** I am taken to the relevant detail page to learn more.

**Why this priority**: These are the two primary conversion actions from the homepage.
Without working navigation the homepage delivers no user flow beyond viewing.

**Independent Test**: Click "ABOUT AWARDS" CTA → navigates to Awards Information page;
click "ABOUT KUDOS" CTA → navigates to Sun* Kudos page; each link is keyboard focusable
with visible outline; hover state swaps button appearances (primary ↔ secondary).

**Acceptance Scenarios**:

1. **Given** the hero CTA area is visible, **When** the user clicks "ABOUT AWARDS",
   **Then** the browser navigates to the Awards Information page (route TBD, e.g. `/awards`).

2. **Given** the hero CTA area is visible, **When** the user clicks "ABOUT KUDOS",
   **Then** the browser navigates to the Sun* Kudos page (route TBD, e.g. `/kudos`).

3. **Given** both CTA buttons are rendered in their default state, **When** text is rendered,
   **Then** both buttons show the secondary/outline style (`rgba(255,234,158,0.1)` bg,
   `1px solid #998C5F` border, white text). **When** the user hovers over either button,
   **Then** that button transitions to primary style (`#FFEA9E` bg, `#00101A` text).

   > **Design note**: In the Figma frame, B3.1 is rendered in hover state (yellow fill)
   > and B3.2 in normal state (outline) to illustrate both interaction states simultaneously.
   > Both buttons share identical default and hover styles; they differ only in destination.

4. **Given** the user tabs to either CTA button, **When** focus is received,
   **Then** a visible focus ring (`outline: 2px solid #FFEA9E`) is displayed.

---

### User Story 3 — Browse Awards Cards (Priority: P2)

**As an** authenticated user scrolling the homepage,
**I want to** see the award categories with names and thumbnail images,
**So that** I get an overview of what awards SAA 2025 has and can click to learn more.

**Why this priority**: The awards grid is the core content section after the hero. Each
card navigates to the detailed awards page — the grid itself bootstraps user interest.

**Independent Test**: Scroll to "Hệ thống giải thưởng" section → 6 award cards are visible
(Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP) →
clicking any card name or "Chi tiết" link navigates to the Awards Information page anchored
at that award's section.

**Acceptance Scenarios**:

1. **Given** the awards section is rendered, **When** the user scrolls to it,
   **Then** 6 award cards appear in a **3-column × 2-row grid** (3 cards per row, 80px
   row gap, ~108px column gap), each showing a thumbnail image (336×336px, `0.955px
   solid #FFEA9E` border), the award name in `#FFEA9E` at 24px (weight 400), a max
   2-line description in white at 16px, and a "Chi tiết" link.

2. **Given** an award card is visible, **When** the user clicks the card image or
   award name, **Then** navigation goes to the Awards Information page with the correct
   anchor hash matching the award slug (e.g. `#top-talent`).

3. **Given** an award card "Chi tiết" link is visible, **When** the user clicks it,
   **Then** navigation goes to the same Awards Information page + anchor.

4. **Given** a description text exceeds 2 lines, **When** rendered, **Then** it is
   truncated with an ellipsis to avoid layout overflow.

---

### User Story 4 — Header Navigation (Priority: P2)

**As an** authenticated user on any scroll position,
**I want to** use the sticky navigation header to jump between sections or pages,
**So that** I can navigate the app without scrolling back to the top.

**Why this priority**: The header is always visible (sticky/fixed) and contains primary
navigation. Without it, users have no app-wide orientation mechanism.

**Independent Test**: On homepage, header is visible at top; **clicking logo** scrolls
to top/navigates to `/`; **clicking "Award Information"** navigates to awards page;
**clicking "Sun* Kudos"** navigates to kudos page; **notification bell** icon is
clickable (state TBD); **language toggle** opens dropdown; **user button** opens
user menu.

**Acceptance Scenarios**:

1. **Given** the user is on the homepage, **When** they scroll down, **Then** the
   header remains stuck at the top with `rgba(16, 20, 23, 0.8)` semi-transparent background.

2. **Given** the header is displayed, **When** "About SAA 2025" is the active route,
   **Then** the link shows a yellow underline (`border-bottom: 1px solid #FFEA9E`) and
   yellow text to indicate selected state.

3. **Given** the user hovers over a nav link, **When** hover is active, **Then** the
   link shows a hover background and text colour shift.

4. **Given** the notification bell `A1.6_Notification` is clicked, **When** the action
   fires, **Then** a notification panel or badge state updates (exact behaviour TBD).

5. **Given** the user button `A1.8_Button-IC` is clicked, **When** the action fires,
   **Then** a user profile menu or sign-out flow is triggered (exact behaviour TBD).

---

### User Story 5 — Floating Kudos Write Widget (Priority: P3)

**As an** authenticated user on the homepage,
**I want to** see a persistent floating button for writing a Kudos,
**So that** I can quickly start a Kudos post without navigating away.

**Why this priority**: The widget is a convenient shortcut but not essential for
understanding the homepage content.

**Independent Test**: Homepage loads → floating pill button visible fixed at bottom-right of viewport →
clicking it opens a quick-action menu (exact options TBD).

**Acceptance Scenarios**:

1. **Given** the homepage is loaded, **When** the page renders, **Then** a floating
   pill button (yellow background `#FFEA9E`, pencil icon + SAA icon, `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` glow) is visible fixed at the lower-right of the viewport (right: 19px).

2. **Given** the floating button is visible, **When** the user clicks it, **Then** a
   quick-action menu is displayed (exact options and target routes TBD).

---

### User Story 6 — Sun* Kudos Promotional Block (Priority: P3)

**As an** authenticated user scrolling the homepage,
**I want to** see the Sun* Kudos promotional block with a "Chi tiết" link,
**So that** I can discover what Sun* Kudos is and click through to learn more.

**Why this priority**: Separate discovery surface from the hero CTA; lower conversion
priority but important for brand exposure of the Kudos programme.

**Independent Test**: Scroll to D1_Sunkudos block → "Sun* Kudos" heading visible in
yellow at 57px → "Chi tiết" button navigates to Sun* Kudos page.

**Acceptance Scenarios**:

1. **Given** the Kudos block is rendered, **When** viewed, **Then** the **"Phong trào ghi nhận"** caption (white, 24px/700), **"Sun* Kudos"** heading (57px/700/`#FFEA9E`), KUDOS wordmark logo (`SVN-Gotham`/`#DBD1C1`), event description text (16px/700/white), and **"Chi tiết"** button (127×56px, yellow bg `#FFEA9E`, `border-radius: 4px`) are all present.

2. **Given** the "Chi tiết" button is clicked, **When** navigation fires, **Then** the
   browser goes to the Sun* Kudos page.

---

### Edge Cases

- **"Comming soon" typo**: The design uses `"Comming soon"` (double-m). Spec documents
  this as-is from Figma. Team must confirm: keep the design typo or fix to `"Coming soon"`
  before implementation.
- What happens when the event date environment variable is misconfigured or missing?
  → Countdown should show `--` or `00` gracefully rather than crashing.
- What happens when the user's session expires while on the homepage?
  → Middleware redirects to `/login` on the next navigation or API call.
- What happens on viewport widths below 768px (mobile)?
  → Layout stacks vertically; header collapses to mobile variant; awards grid wraps to
  fewer columns; text sizes scale down per responsive tokens.
- What happens if an award card thumbnail image fails to load?
  → A fallback placeholder or the yellow-bordered box without image background is shown.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| A1_Header | `2167:9091` | Sticky nav bar: logo, nav links, bell, language, user btn | Click links → navigate; sticky on scroll |
| A1.1_LOGO | `I2167:9091;178:1033` | SAA logo 52×48px | Click → home (top of page) |
| A1.2_Selected (About SAA) | `I2167:9091;186:1579` | Active nav link with yellow underline | Click → About SAA 2025 section |
| A1.3_Hover (Awards Info) | `I2167:9091;186:1587` | Awards Information nav link | Click → /awards; hover background |
| A1.5_Normal (Kudos) | `I2167:9091;186:1593` | Sun* Kudos nav link | Click → /kudos |
| A1.6_Notification | `I2167:9091;...` | Bell icon 40×40px | Click → notification panel (TBD) |
| A1.7_Language | `I2167:9091;...` | Language toggle 108×56px | Click → language dropdown |
| A1.8_Button-IC | `I2167:9091;...` | User icon button 40×40px, yellow border | Click → user menu (TBD) |
| 3.5_Keyvisual | `2167:9027` | Full-bleed hero background illustration (1512×1392) | Static |
| B1_Countdown | `2167:9035` | Countdown timer with "Comming soon" label | Auto-tick every minute |
| B1.2_Coming soon | `2167:9036` | "Comming soon" text, hidden post-event | Conditionally hidden |
| B1.3_Countdown | `2167:9037` | 3 digit groups: DAYS, HOURS, MINUTES | Live update |
| B2_Thông tin sự kiện | `2167:9053` | Event date, time, venue, livestream note | Static |
| B3_Call-To-Action | `2167:9062` | Two CTA buttons side by side | Click → navigate |
| B3.1_About Awards | `2167:9063` | Secondary/outline default; primary yellow on hover (Figma shows hover state) | Click → /awards |
| B3.2_About Kudos | `2167:9064` | Secondary/outline default; primary yellow on hover (Figma shows normal state) | Click → /kudos |
| B4_content | `5001:14827` | "Root Further" theme narrative text block | Static |
| 6_Widget Button | `5022:15169` | Floating pill (yellow, 106×64, fixed bottom-right); pencil icon + SAA icon + `/` separator | Click → opens quick action menu (TBD) |
| C1_Header Giải thưởng | `2167:9069` | Section header: caption + 57px title | Static |
| C2_Award list | `5005:14974` | 6-card award grid | Click card → /awards#slug |
| C2.x Award Cards | `2167:9075-9081` | Individual award cards with thumbnails | Click → /awards#slug |
| D1_Sunkudos | `3390:10349` | Sun* Kudos promo block 1224×500px. Contains: "Phong trào ghi nhận" caption, "Sun* Kudos" title (57px yellow), KUDOS logo, description text, "Chi tiết" button | Click Chi tiết → /kudos |
| 7_Footer | `5001:14800` | Footer: logo + 4 nav links + copyright | Click nav links |
| 7.2_About SAA | footer link | "About SAA 2025" footer link | Click → / |
| 7.3_Award Information | footer link | "Award Information" footer link (highlighted bg) | Click → /awards |
| 7.4_Sun* Kudos | footer link | "Sun* Kudos" footer link | Click → /kudos |
| 7.5_Tiêu chuẩn chung | footer link | "Tiêu chuẩn chung" footer link | Click → /criteria (TBD) |

### Navigation Flow

- **From**: Login page (`/login`) after successful OAuth
- **To**:
  - `/awards` — via "ABOUT AWARDS" CTA, "Award Information" nav link, award card clicks
  - `/kudos` — via "ABOUT KUDOS" CTA, "Sun* Kudos" nav link, D1 "Chi tiết" button
  - `/awards#{slug}` — via individual award card name or "Chi tiết" link
  - Kudos quick-action menu — via floating widget button (exact actions TBD)
- **Triggers**: Button clicks, nav link clicks, scroll (sticky header behaviour)

### Visual Requirements

- **Responsive breakpoints**: mobile `< 768px`, tablet `768–1279px`, desktop `≥ 1280px`
  (design canvas is 1512px; content max-width `1224px`, padding `144px` each side on desktop)
- **Animations / Transitions**:
  - Countdown digits update (flip or fade transition per-digit)
  - Button hover: background/colour swap with `transition: all 150ms ease`
  - Header: backdrop-blur or solid background fade on scroll (optional enhancement)
- **Accessibility**: WCAG 2.1 AA
  - Countdown: `aria-live="polite"` on the timer region
  - Buttons: `aria-label` where text is ambiguous
  - Nav links: `aria-current="page"` on active link
  - Award cards: `alt` text on all images; anchors have descriptive text
  - Floating widget: `aria-label="Open Kudos quick actions"`
  - Touch targets ≥ 44×44px

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a real-time countdown (DAYS/HOURS/MINUTES) from the
  current time to the configured event date/time (`NEXT_PUBLIC_EVENT_DATE` env var).
- **FR-002**: System MUST hide the "Comming soon" label when the event date/time has passed.
- **FR-003**: Users MUST be able to navigate to `/awards` via "ABOUT AWARDS" CTA and
  navigation header.
- **FR-004**: Users MUST be able to navigate to `/kudos` via "ABOUT KUDOS" CTA,
  header, and D1 block.
- **FR-005**: System MUST display 6 award cards (Top Talent, Top Project, Top Project
  Leader, Best Manager, Signature 2025 - Creator, MVP) linking to award detail anchors.
- **FR-006**: The header MUST be sticky and visible at all scroll positions.
- **FR-007**: The floating Kudos widget MUST be visible and clickable on the page.
- **FR-008**: Unauthenticated users visiting `/` MUST be redirected to `/login` by
  middleware (already implemented in `src/middleware.ts`).

### Technical Requirements

- **TR-001**: Countdown MUST run in a React client component using `setInterval`; updates
  once per minute. The target timestamp is read from `NEXT_PUBLIC_EVENT_DATE`.
- **TR-002**: Page MUST be a Server Component that fetches auth state via `getUser()`;
  countdown and interactive elements are client islands (`"use client"`).
- **TR-003**: All images MUST use `next/image` with explicit `width`/`height` or `fill`
  and appropriate `alt` text.
- **TR-004**: Floating widget MUST use `position: fixed` (not absolute) so it persists
  across scroll.
- **TR-005**: No secrets or user PII must be exposed in `NEXT_PUBLIC_*` variables except
  the event date.
- **TR-006**: `Digital Numbers` font is NOT a Google Font; it MUST be self-hosted under
  `public/fonts/` and loaded via `@font-face` in `globals.css`. Add to
  `src/app/layout.tsx` font declarations. `SVN-Gotham` (used for KUDOS wordmark)
  similarly requires self-hosting.
- **TR-007**: Countdown component MUST handle the case where `NEXT_PUBLIC_EVENT_DATE` is
  absent or unparseable — display `"--"` per unit and suppress the "Comming soon" label.
  Use `try/catch` around `new Date(process.env.NEXT_PUBLIC_EVENT_DATE)`.

### Key Entities

- **Event Config**: `NEXT_PUBLIC_EVENT_DATE` (ISO-8601 datetime string) — the target
  for the countdown timer.
- **Award**: Static data entity — name, slug, description, thumbnail image path. Sourced
  from a constants file or CMS.

---

## State Management

### Client-Side State

| Component | State | Type | Notes |
|-----------|-------|------|-------|
| `<CountdownTimer />` | `timeLeft` `{ days, hours, minutes }` | local | Updated every minute via `setInterval`; cleared `useEffect` cleanup |
| `<CountdownTimer />` | `isEventPast` `boolean` | derived | `true` when all units = 0; hides "Comming soon" label |
| `<KudosWidget />` | none | — | Stateless link/button |
| `<Header />` nav | `activeRoute` | derived from `usePathname()` | Drives selected/normal link states |
| `<LanguageToggle />` | `isOpen`, `selectedLocale` | local | Shared component from Login screen |

### Loading & Error States

| Scenario | Behaviour |
|----------|-----------|
| Page initial load | Next.js RSC stream; hero visible first, countdown hydrates client-side |
| `NEXT_PUBLIC_EVENT_DATE` missing | Countdown shows `"--"` per unit; no crash |
| Award thumbnail 404 | `next/image` `onError` → show yellow-bordered placeholder div |
| Session expired mid-session | Next navigation triggers middleware redirect to `/login` |
| Network error on page load | Standard Next.js error boundary catches; `error.tsx` shown |

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| Supabase Auth `getUser()` | — | Verify session server-side | Exists |
| `NEXT_PUBLIC_EVENT_DATE` | env | Countdown target timestamp | New (env var) |
| Award data | — | Static data for 6 award cards | New (constants file) |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Countdown displays correct time-remaining values within ±1 minute of
  actual remaining time.
- **SC-002**: All 6 CTA paths (2 hero buttons + 3 header links + 2 card paths) navigate
  to the correct destination without 404.
- **SC-003**: Page load (LCP) ≤ 2.5 s on a 4G connection (Next.js RSC + static hero image
  with `priority`).

---

## Out of Scope

- Sun* Kudos write modal or form (triggered by floating widget — separate screen spec).
- Awards Information page detail (separate screen spec).
- Notification panel implementation (bell icon click behaviour TBD).
- User profile menu implementation (user button click behaviour TBD).
- Mobile-specific header collapse / hamburger menu (separate concern if needed).
- Real-time event updates or WebSocket subscriptions.
- CMS-backed award data (may be static file in initial implementation).

---

## Dependencies

- `GzbNeVGJHz-Login` — Auth flow must be complete; homepage only renders for authenticated users.
- `src/middleware.ts` — Guards `/` route, already implemented.
- `src/libs/supabase/server.ts` — `getUser()` call in page Server Component.
- `NEXT_PUBLIC_EVENT_DATE` — Must be set in `.env.local` and Cloudflare env.
- Award thumbnail images — Must be downloaded to `public/assets/` from MoMorph media.
