# Feature Specification: Sun* Kudos (Live Board)

**Frame ID**: `MaZUn5xHXZ`
**Frame Name**: `Sun* Kudos - Live board`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**MoMorph Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/MaZUn5xHXZ
**Created**: 2026-04-14
**Status**: Draft

---

## Overview

The **Sun\* Kudos** screen is the primary recognition and appreciation hub for SAA 2025.
It enables Sun\* employees to browse, search, filter, and interact with kudos messages
sent between colleagues. The page features a hero section with search capabilities, a
highlighted kudos carousel, a live spotlight board showing real-time kudos activity,
and a full kudos feed with personal stats and a leaderboard sidebar.

**Target users**: All authenticated Sun\* employees.

**Business context**: Sun\* Kudos is the recognition system that promotes peer
appreciation. This screen surfaces all kudos content, personal statistics, a
gamified leaderboard, Secret Box rewards, and a live video spotlight. It is the
most engagement-heavy screen in the SAA 2025 platform.

**Visual reference**: `design-style.md` | Frame image:
`https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/MaZUn5xHXZ`

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — View Hero & Search for Kudos/Profiles (Priority: P1)

**As an** authenticated Sun\* employee visiting the Sun\* Kudos page,
**I want to** see the Kudos branding and quickly search for kudos or a colleague's profile,
**So that** I can find specific kudos or people efficiently.

**Why this priority**: The hero section is above the fold and the two search inputs
are the primary quick-access entry points for the most common user intentions —
sending a kudo and finding someone's profile.

**Independent Test**: Navigate to `/sun-kudos` → hero renders with "Hệ thống ghi nhận
và cảm ơn" subtitle, KUDOS wordmark in SVN-Gotham font, Sun\* logo prefix icon,
and two pill-shaped search inputs.

**Acceptance Scenarios**:

1. **Given** the user navigates to the Sun\* Kudos page, **When** the page renders,
   **Then** the hero section displays "Hệ thống ghi nhận và cảm ơn" in white (20px/700),
   the Sun\* KUDOS wordmark in yellow (`#FFEA9E`, SVN-Gotham, 80px), and two search
   inputs side by side — the first with a pencil/edit icon prefix and the second with
   a magnifying glass (🔍) icon prefix.

2. **Given** the hero section is rendered, **When** the user focuses the first search
   input, **Then** it shows placeholder text "Hôm nay, bạn muốn gửi lời cảm ơn và
   ghi nhận đến ai?" and the border highlights to `#FFEA9E`.

3. **Given** the hero section is rendered, **When** the user focuses the second search
   input, **Then** it shows placeholder text "Tìm kiếm profile Sunner" and the border
   highlights to `#FFEA9E`.

4. **Given** the user types in the profile search input, **When** at least 2 characters
   are entered, **Then** a dropdown shows matching Sunner profiles (name, department,
   avatar) after a 300ms debounce.

5. **Given** the user selects a profile from search results, **When** the user clicks
   a profile entry, **Then** the user is navigated to that Sunner's profile page.

6. **Given** the user types in the first search input ("send kudo"), **When** at least
   2 characters are entered, **Then** a dropdown shows matching Sunner profiles and
   selecting one navigates to the Write Kudo flow (screen `ihQ26W78P2`) with the
   recipient pre-filled.

---

### User Story 2 — Browse Highlight Kudos Carousel (Priority: P1)

**As an** authenticated user on the Sun\* Kudos page,
**I want to** browse highlighted/featured kudos in a carousel format,
**So that** I can see the most notable kudos without scrolling through the full feed.

**Why this priority**: Highlight Kudos is the first content section visible after the
hero. It curates the best kudos and drives engagement by surfacing quality content.

**Independent Test**: Verify the Highlight Kudos section renders with carousel cards,
navigation arrows, pagination, and filter dropdowns.

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** the Highlight Kudos section is in view,
   **Then** it shows the label "Sun\* Annual Awards 2025" (16px/700, white), the
   heading "HIGHLIGHT KUDOS" (57px/700, yellow), and two filter dropdown buttons
   ("Hashtag" and "Phòng ban") aligned to the right.

2. **Given** the carousel is loaded, **When** rendered, **Then** up to 4 kudo cards
   are visible at desktop width, each showing: video play button (if kudo has video),
   sender avatar + name + role + relationship badge pill (e.g., "Lãnh đạo", "Phòng ban",
   "Cùng phòng" — colored background), receiver avatar + name + role + badge pill,
   date range, category badge (e.g., "IDOL GIỚI TRẺ"), message preview (clamped to
   4 lines), image thumbnails, hashtag pills, ❤️ like count, "Copy Link 🔗", and
   "Xem chi tiết ↗" actions.

3. **Given** there are more than 4 highlighted kudos, **When** the user clicks the
   right arrow or the next button in pagination, **Then** the carousel slides to show
   the next set of cards with a smooth animation (300ms ease-in-out), and pagination
   updates (e.g., "2/5" → "3/5").

4. **Given** the carousel is at page 1, **When** the user clicks the left arrow,
   **Then** it is disabled (opacity: 0.3, cursor: not-allowed).

5. **Given** the user clicks the "Hashtag" filter dropdown, **When** the dropdown
   opens, **Then** it shows available hashtags (#Dedicated, #Inspiring, etc.) and
   selecting one filters the carousel to show only kudos with that hashtag.

6. **Given** the user clicks the "Phòng ban" filter dropdown, **When** a department
   is selected, **Then** the carousel filters to show only kudos from/to that department.

---

### User Story 3 — View Spotlight Board (Priority: P2)

**As an** authenticated user,
**I want to** view the Spotlight Board with live kudos activity,
**So that** I can see real-time recognition happening across the company.

**Why this priority**: The Spotlight Board provides a social proof and engagement
mechanism but is not actionable — it's a view-only section.

**Independent Test**: Verify the Spotlight Board section renders with video preview,
total kudos count, avatar grid, and scrolling ticker.

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** the Spotlight Board section is in view,
   **Then** it shows the label "Sun\* Annual Awards 2025", heading "SPOTLIGHT BOARD"
   (57px/700, yellow), and a full-width card with dark background.

2. **Given** the Spotlight Board is rendered, **When** viewed, **Then** it displays:
   a video preview area (left) with play button overlay, total kudos count
   ("388 KUDOS" in 32px/700), user avatar grid with names and departments, and a
   scrolling ticker of recent kudos messages along the bottom.

3. **Given** the user clicks the play button on the video preview, **When** clicked,
   **Then** the video plays inline (or opens in a modal/lightbox).

4. **Given** the ticker is active, **When** observed, **Then** it continuously scrolls
   horizontally showing recent kudo snippets with smooth linear animation.

---

### User Story 4 — Browse All Kudos Feed (Priority: P1)

**As an** authenticated user,
**I want to** scroll through the full kudos feed,
**So that** I can see all kudos messages shared across the company.

**Why this priority**: The All Kudos feed is the core content of this page, providing
the complete browsable list of kudos — it is the main reason users visit this screen.

**Independent Test**: Verify the All Kudos section renders kudo cards in a vertical
feed with two-column layout (feed + sidebar).

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** the All Kudos section is in view, **Then**
   it shows the label "Sun\* Annual Awards 2025" and heading "ALL KUDOS" (57px/700, yellow).

2. **Given** the feed is rendered, **When** viewed, **Then** kudo cards are displayed
   vertically with 32px gap. Each card contains:
   - Video play button (▶ triangle overlay, top-left) if kudo includes a video
   - Sender avatar + name + role + relationship badge pill (colored, e.g., "Lãnh đạo",
     "Phòng ban", "Cùng phòng") → arrow → Receiver avatar + name + role + badge pill
   - Date range (e.g., "10:05 - 10/30/2025")
   - Category badge (e.g., "IDOL GIỚI TRẺ") in yellow
   - Message body (14px/400, white, clamped to 4 lines with "...")
   - Image gallery (grid of square thumbnails, up to ~8 visible)
   - Hashtag pills (#Dedicated, #Inspiring, etc. in yellow on semi-transparent bg)
   - Footer: ❤️ like count (e.g., "1,000") + "Copy Link ↗"

3. **Given** the feed is loaded with many kudos, **When** the user scrolls down,
   **Then** additional kudos load (infinite scroll or "Load more" button).

4. **Given** a kudo card has images, **When** the user clicks an image thumbnail,
   **Then** it opens in a lightbox/modal with full resolution.

5. **Given** a kudo card is displayed, **When** the user clicks the "Copy Link"
   button, **Then** the kudo's permalink is copied to the clipboard and a brief
   toast/feedback indicates success.

---

### User Story 5 — View Personal Stats & Open Secret Box (Priority: P1)

**As an** authenticated user,
**I want to** see my personal kudos statistics and open my Secret Boxes,
**So that** I know my engagement level and can claim my rewards.

**Why this priority**: Personal stats and Secret Box are gamification elements that
directly drive user engagement and return visits. The Secret Box is a core reward
mechanism.

**Independent Test**: Verify the right sidebar shows personal stats panel and
"Mở Secret Box" button.

**Acceptance Scenarios**:

1. **Given** the user is in the All Kudos section, **When** viewed at desktop width,
   **Then** a sticky right sidebar (320px) displays the personal stats panel with:
   - "Số Kudos bạn nhận được:" + value (e.g., "25")
   - "Số Kudos bạn đã gửi:" + value
   - "Tổng số nhận được: 🔥" + value
   - "Số Secret Box bạn đã mở:" + value
   - "Số Secret Box chưa mở:" + value
   
   Each label in white 14px/400, each value in yellow (`#FFEA9E`) 20px/700.

2. **Given** the stats panel is visible, **When** the user clicks "Mở Secret Box 🎁",
   **Then** the user is navigated to the Secret Box opening page (screen `J3-4YFIpMM`).

3. **Given** the user scrolls the feed, **When** on desktop, **Then** the sidebar
   remains sticky at `top: 80px` and stays visible alongside the scrolling feed.

4. **Given** the viewport is mobile or tablet, **When** the sidebar would not fit
   next to the feed, **Then** the stats panel moves above the feed or becomes an
   expandable drawer.

---

### User Story 6 — View Leaderboard (Priority: P2)

**As an** authenticated user,
**I want to** see the top 10 Sunners who received the most kudos,
**So that** I can see who is most recognized in the company.

**Why this priority**: Leaderboard adds gamification but is supplementary to the core
feed and stats functionality.

**Independent Test**: Verify the leaderboard section renders below the stats panel
in the right sidebar.

**Acceptance Scenarios**:

1. **Given** the right sidebar is displayed, **When** the leaderboard section is
   visible, **Then** it shows the title "10 SUNNER NHẬN QUÀ NỐI NHẤT" in yellow
   (12px/600) and up to 10 entries.

2. **Given** the leaderboard is rendered, **When** viewed, **Then** each entry
   displays: rank number (yellow), user avatar (32px circle), name (13px/600, white),
   department "Nhận được 1 ảo phòng SAA" (11px/400, gray), with 12px gap between entries.

3. **Given** the leaderboard is rendered, **When** the user clicks on a leaderboard
   entry, **Then** the user is navigated to that person's profile page.

---

### User Story 7 — Like a Kudo (Priority: P2)

**As an** authenticated user,
**I want to** like a kudo to express appreciation,
**So that** I can show support for meaningful recognition messages.

**Why this priority**: Engagement feature that adds interactivity but is not core
to the browsing experience.

**Independent Test**: Click the heart icon on a kudo card and verify the like is registered.

**Acceptance Scenarios**:

1. **Given** a kudo card is displayed, **When** the user clicks the ❤️ heart icon,
   **Then** the heart animates (scale 200ms), the like count increments by 1
   (optimistic UI), and the state persists on page reload.

2. **Given** the user has already liked a kudo, **When** the user clicks the heart
   again, **Then** the like is removed (unlike), count decrements by 1.

3. **Given** the user likes a kudo, **When** the API call fails, **Then** the
   optimistic update is rolled back and a toast indicates the error.

---

### User Story 8 — Responsive Layout (Priority: P2)

**As a** user accessing the Sun\* Kudos page from any device,
**I want** the page to render correctly on mobile, tablet, and desktop,
**So that** I have a good experience regardless of device.

**Why this priority**: Per constitution Principle VI, mobile-first is mandatory.

**Independent Test**: Load the page at 375px, 768px, and 1440px widths.

**Acceptance Scenarios**:

1. **Given** the page is loaded on desktop (≥1280px), **When** rendered, **Then** the
   full layout is visible: hero with side-by-side search, 4-card carousel, full
   spotlight board, two-column feed + sticky sidebar.

2. **Given** the page is loaded on tablet (768px), **When** rendered, **Then** the
   hero search inputs may stack, carousel shows 2 cards, sidebar moves above the
   feed in a horizontal compact layout, and all content is readable.

3. **Given** the page is loaded on mobile (375px), **When** rendered, **Then** search
   inputs stack vertically, carousel shows 1 card (swipeable), sidebar is hidden
   or collapsed into a drawer, section headings are 32px, and padding is 16px.

---

### Edge Cases

- What happens when the user is unauthenticated? → Redirect to Login via Supabase middleware.
- What happens if kudos data fails to load? → Show `error.tsx` boundary with retry button.
- What happens on slow connections? → Show `loading.tsx` skeletons for cards and stats.
- What happens when a kudo has no images? → Image gallery section is hidden.
- What happens when a kudo has no hashtags? → Hashtag pills section is hidden.
- What happens when the user has 0 Secret Boxes? → "Số Secret Box chưa mở: 0" and button remains active (navigates to empty state on Secret Box page).
- What happens when the video in Spotlight Board is unavailable? → Show a fallback poster image.
- What happens when the leaderboard has fewer than 10 entries? → Show only available entries.
- What happens when search returns no results? → Show empty state message.
- What happens when the user types in the "send kudo" search? → It navigates to the Write Kudo flow (screen `ihQ26W78P2`) with the recipient pre-filled.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Description | Interactions |
|-----------|-------------|--------------|
| Header | Shared navigation bar with active "Sun* Kudos" link | Nav click → route change |
| KudosHero | Hero section with brand, subtitle, two search inputs | Focus → highlight, Type → search |
| HighlightKudos | Carousel of featured kudo cards with filters | Arrow click → slide, Filter → filter |
| FilterDropdown | Hashtag / Department filter buttons | Click → open dropdown, Select → filter |
| KudoCarousel | Horizontal scrollable card track | Arrow keys, swipe on mobile |
| KudoCard | Individual kudo card with sender, receiver, message, images, hashtags, actions | Like click, Copy link click, Image click |
| SpotlightBoard | Live board with video, avatars, scrolling ticker | Play video click |
| AllKudos | Full feed of kudo cards | Scroll → load more |
| PersonalStats | Sticky sidebar with user's kudos statistics | Secret Box btn click |
| SecretBoxButton | CTA to navigate to Secret Box page | Click → navigate to Secret Box |
| Leaderboard | Top 10 sunner ranking | Entry click → navigate to profile |
| Pagination | Carousel page indicator with prev/next | Click → navigate pages |
| Footer | Shared footer with nav links and copyright | Nav click → route change |

### Navigation Flow

- From: Homepage (`/`) via "ABOUT KUDOS" CTA or Header "Sun* Kudos" link
- From: Awards page (`/awards`) via "Chi tiết" button in Sun* Kudos promo
- To: Write Kudo (`ihQ26W78P2`) via first search input selection
- To: Sunner Profile (`3FoIx6ALVb`) via second search input or leaderboard click
- To: Secret Box (`J3-4YFIpMM`) via "Mở Secret Box" button

### Visual Requirements

- Responsive breakpoints: mobile (375px), tablet (768px / `md:`), desktop (1280px / `xl:`) — per constitution Principle VI
- Animations: Carousel slide (300ms), heart scale (200ms), ticker scroll (continuous), filter dropdown (200ms)
- Accessibility:
  - WCAG AA contrast (4.5:1) on dark backgrounds — verified for `#FFFFFF` on `#00101A` and `#FFEA9E` on `#00101A`
  - Keyboard-navigable carousel (Arrow Left/Right keys), focus-visible outlines
  - `aria-label` on all interactive elements (search inputs, filter buttons, carousel arrows, like button, copy link)
  - `aria-live="polite"` on carousel pagination for screen reader updates
  - `role="region"` with `aria-label` on major sections (Hero, Highlight, Spotlight, All Kudos)
  - Touch targets ≥ 44×44px per constitution Principle VI

### Internationalisation (i18n)

- All user-facing strings MUST be sourced from i18n locale files (following existing pattern in `src/libs/i18n/`)
- Page supports Vietnamese (default) and English
- Locale switching via shared Header language toggle

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display paginated list of all kudos with sender, receiver, message, images, hashtags, and like count
- **FR-002**: System MUST provide a carousel of highlighted/featured kudos with navigation and pagination
- **FR-003**: System MUST allow filtering highlighted kudos by hashtag and department
- **FR-004**: System MUST display personal kudos statistics (sent, received, secret boxes)
- **FR-005**: System MUST display a leaderboard of top 10 kudos recipients
- **FR-006**: System MUST allow users to like/unlike kudos with optimistic UI
- **FR-007**: System MUST allow users to copy a kudo's permalink to clipboard
- **FR-008**: System MUST display a Spotlight Board with video preview, total count, and scrolling ticker
- **FR-009**: System MUST provide search for kudos (by message/hashtag) and profile search (by name)
- **FR-010**: System MUST navigate to Write Kudo flow when user selects a recipient from search
- **FR-011**: System MUST navigate to Secret Box page when "Mở Secret Box" is clicked

### Technical Requirements

- **TR-001**: Page MUST load initial content within 2s on 4G connection (Core Web Vitals)
- **TR-002**: Kudo feed MUST use server-side rendering for initial load (RSC) with client-side pagination
- **TR-003**: Like/unlike MUST use optimistic updates with server reconciliation
- **TR-004**: Carousel MUST be keyboard-navigable (arrow keys) for accessibility
- **TR-005**: All protected routes MUST verify session via `getUser()` from Supabase server client
- **TR-006**: All API calls MUST use parameterized queries via Supabase SDK (no string interpolation)
- **TR-007**: Spotlight Board video MUST lazy-load to avoid blocking initial page render
- **TR-008**: Search inputs MUST debounce at 300ms to avoid excessive API calls
- **TR-009**: All user-facing strings MUST use i18n locale files (`src/libs/i18n/sun-kudos.ts`) — Vietnamese and English
- **TR-010**: Kudo card component MUST be reusable across Highlight carousel and All Kudos feed with prop-based size variant
- **TR-011**: `loading.tsx` and `error.tsx` MUST be co-located with the route segment per Next.js App Router conventions
- **TR-012**: Images in kudo cards MUST use `next/image` with responsive sizing and `loading="lazy"` except above-the-fold

### Key Entities

- **Kudo**: Recognition message with sender, receiver, message body, category, images, hashtags, like count, creation date
- **User (Sunner)**: Employee profile with name, department, avatar, role
- **SecretBox**: Reward box with open/unopened state
- **Hashtag**: Tag for categorizing kudos (#Dedicated, #Inspiring, etc.)
- **Category**: Kudo category type (e.g., "IDOL GIỚI TRẺ")

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/kudos` | GET | Fetch paginated kudo list (with filters) | Predicted |
| `/api/kudos/highlights` | GET | Fetch highlighted/featured kudos | Predicted |
| `/api/kudos/:id/like` | POST | Like a kudo | Predicted |
| `/api/kudos/:id/like` | DELETE | Unlike a kudo | Predicted |
| `/api/kudos/stats` | GET | Fetch personal kudos statistics | Predicted |
| `/api/kudos/leaderboard` | GET | Fetch top 10 kudos recipients | Predicted |
| `/api/kudos/spotlight` | GET | Fetch spotlight board data (count, recent) | Predicted |
| `/api/users/search` | GET | Search users by name | Predicted |
| `/api/kudos/search` | GET | Search kudos by message/hashtag | Predicted |
| Supabase Auth `getUser` | Server SDK | Validate session | Exists |

---

## State Management

### Server State (RSC / Supabase Server Client)
- Initial kudo feed (paginated, page 1)
- Highlighted kudos list
- Personal stats (sent/received/secret boxes)
- Leaderboard top 10
- Spotlight board data (count, recent kudos, video URL)

### Client State (`"use client"` components)
- **Carousel**: current page index, slide animation state
- **Filter dropdowns**: open/closed state, selected hashtag, selected department
- **Search inputs**: query text, debounced value, dropdown open state, search results
- **Like button**: optimistic like count per kudo, liked status per kudo
- **Copy link**: toast visibility state
- **Feed pagination**: current page / cursor for infinite scroll
- **Spotlight ticker**: scroll position (CSS animation, no JS state needed)

### Loading States
- Hero: instant (static content)
- Highlight carousel: skeleton cards (4 placeholder cards at desktop)
- Spotlight board: skeleton with placeholder poster
- All Kudos feed: skeleton cards (3 placeholder cards)
- Personal stats: skeleton rows
- Leaderboard: skeleton entries

### Error States
- API failure for kudos feed → `error.tsx` boundary with retry
- API failure for stats/leaderboard → inline error message with retry button
- API failure for search → "Không thể tìm kiếm, thử lại" message in dropdown
- Network offline → show cached content if available, banner at top

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Page loads with visible hero and first content section within 2 seconds (LCP < 2.5s)
- **SC-002**: Carousel interaction (slide/filter) responds within 300ms
- **SC-003**: Like/unlike reflects in UI within 100ms (optimistic)
- **SC-004**: Search shows results dropdown within 500ms of 2+ character input
- **SC-005**: All content is readable on mobile (375px) without horizontal scrolling

---

## Out of Scope

- Writing/sending a new kudo (handled by screen `ihQ26W78P2` — Viết Kudo)
- Opening a Secret Box (handled by screen `J3-4YFIpMM` — Open Secret Box)
- User profile page (handled by screen `3FoIx6ALVb` — Profile bản thân)
- Real-time WebSocket updates for the kudo feed (phase 2)
- Admin moderation of kudos content

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [x] Homepage spec exists (`.momorph/specs/i87tDx10uM-HomepageSAA/spec.md`)
- [x] Awards spec exists (`.momorph/specs/zFYDgyj_pD-HeThongGiai/spec.md`)
- [ ] i18n locale file exists (`src/libs/i18n/sun-kudos.ts`)

---

## Data Requirements

### Kudo Entity Fields

| Field | Type | Required | Validation | Display |
|-------|------|----------|------------|---------|
| id | UUID | Yes | — | Permalink, like key |
| sender_id | UUID (FK → users) | Yes | — | Sender avatar, name, role, badge |
| receiver_id | UUID (FK → users) | Yes | — | Receiver avatar, name, role, badge |
| message | string | Yes | Max 2000 chars | Card body (clamped 4 lines) |
| category | string | No | Enum of categories | Category badge |
| images | string[] (URLs) | No | Max 10 images | Image gallery grid |
| video_url | string (URL) | No | Valid URL | Video play button |
| hashtags | string[] | No | Max 10 | Hashtag pills |
| like_count | integer | Yes | ≥ 0 | Like count display |
| is_liked_by_me | boolean | Yes | — | Heart filled/unfilled |
| is_highlighted | boolean | Yes | — | Appears in carousel |
| created_at | timestamp | Yes | — | Date range display |

### User (Sunner) Entity Fields

| Field | Type | Required | Display |
|-------|------|----------|---------|
| id | UUID | Yes | Navigation target |
| name | string | Yes | Name in cards, leaderboard |
| avatar_url | string | No | Avatar circle (40px card, 32px leaderboard) |
| department | string | No | Role/dept text |
| role | string | No | Role text under name |
| relationship_badge | string | No | Badge pill text ("Lãnh đạo", "Phòng ban", "Cùng phòng") |

### Personal Stats Fields

| Field | Type | Display |
|-------|------|---------|
| kudos_received | integer | "Số Kudos bạn nhận được" |
| kudos_sent | integer | "Số Kudos bạn đã gửi" |
| total_received_fire | integer | "Tổng số nhận được 🔥" |
| secret_boxes_opened | integer | "Số Secret Box bạn đã mở" |
| secret_boxes_remaining | integer | "Số Secret Box chưa mở" |

---

## Notes

- The header "Sun* Kudos" nav link should show active state (yellow text, bottom border) on this page
- The hero background uses abstract art similar to the homepage hero — reuse the same background treatment
- Consider reusing `KudoCard` component across Highlight Carousel and All Kudos feed with prop-based size variants
- The Spotlight Board video may be hosted externally — use a responsive embed or HTML5 video tag
- Secret Box count in stats should update when the user opens a box and returns
- Constitution compliance verified: TypeScript strict, RSC default, Supabase backend, edge-compatible, token-driven UI, responsive mobile-first, OWASP security
