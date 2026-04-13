# Feature Specification: Hệ thống giải (Award System)

**Frame ID**: `313:8436`
**Screen ID**: `zFYDgyj_pD`
**Frame Name**: `Hệ thống giải`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/zFYDgyj_pD
**Created**: 2026-04-09
**Status**: Draft

---

## Overview

The **Award System** screen presents a comprehensive overview of all SAA 2025 (Sun\* Annual Awards 2025) award categories. It displays detailed information about each award — including description, number of awards, and prize value — organized with a sticky left-side navigation menu and scrollable right-side award cards. At the bottom, a promotional block for the **Sun\* Kudos** recognition program is featured with a link to its detail page.

Target users: All Sun\* employees (authenticated).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browse Award Categories (Priority: P1)

A user visits the Award System page to understand the full list of SAA 2025 awards, their criteria, quantities, and prize values.

**Why this priority**: This is the core purpose of the screen — presenting award information is the primary value delivered.

**Independent Test**: Load the page and verify all 6 award category cards are rendered with correct titles, descriptions, quantities, and values.

**Acceptance Scenarios**:

1. **Given** a logged-in user navigates to the Award System page, **When** the page loads, **Then** a hero banner (keyvisual) is displayed at the top, followed by the section title "Hệ thống giải thưởng SAA 2025", and 6 award cards (Top Talent, Top Project, Top Project Leader, Best Manager, Signature 2025 - Creator, MVP) are rendered below.
2. **Given** the page is loaded, **When** the user scrolls down, **Then** each award card displays: an image/icon (336×336px), award title, description paragraph, "Số lượng giải thưởng" (number of awards), award unit type (Cá nhân/Tập thể/Đơn vị), and "Giá trị giải thưởng" (prize value in VNĐ).

---

### User Story 2 - Navigate Between Award Categories (Priority: P1)

A user uses the side navigation menu to quickly jump to a specific award category without manually scrolling.

**Why this priority**: With 6 award categories on a long page (~6410px), quick navigation is essential for usability.

**Independent Test**: Click each navigation item and verify the page scrolls to the corresponding award card section.

**Acceptance Scenarios**:

1. **Given** the page is loaded, **When** the user clicks "Top Talent" in the left menu, **Then** the page scrolls to the Top Talent award card section and the menu item shows active state (yellow text with underline and glow).
2. **Given** the user has scrolled to "Best Manager" section, **When** the user clicks "MVP" in the left menu, **Then** the page scrolls to the MVP award card and the "MVP" menu item becomes active.
3. **Given** any menu item is clicked, **When** the scroll completes, **Then** only the clicked item has the active state (yellow text `#FFEA9E`, bottom border, text-shadow glow); all other items show default state (white text, no underline).

---

### User Story 3 - View Sun\* Kudos Promotion (Priority: P2)

A user sees the Sun\* Kudos promotional block at the bottom and can navigate to the Kudos detail page.

**Why this priority**: Secondary feature — promotional content that drives engagement but is not the page's primary function.

**Independent Test**: Verify the Sun\* Kudos block renders and the "Chi tiết" button navigates correctly.

**Acceptance Scenarios**:

1. **Given** the user scrolls past all award categories, **When** the Sun\* Kudos block appears, **Then** it displays: label "Phong trào ghi nhận", title "Sun\* Kudos", description text, an illustration image, and a "Chi tiết" button.
2. **Given** the Sun\* Kudos block is visible, **When** the user clicks the "Chi tiết" button, **Then** the user is navigated to the Sun\* Kudos detail page.

---

### User Story 4 - Responsive Layout (Priority: P2)

The page renders correctly on mobile, tablet, and desktop viewports.

**Why this priority**: Per constitution Principle VI, all UI must be mobile-first and work at 375px, 768px, and 1440px.

**Independent Test**: Load the page at each breakpoint and verify layout integrity.

**Acceptance Scenarios**:

1. **Given** the page is loaded on desktop (≥1280px), **When** rendered, **Then** the two-column layout is displayed: left sticky navigation (178px) + right award cards (853px) with 80px gap.
2. **Given** the page is loaded on tablet (768px), **When** rendered, **Then** the left navigation collapses and award cards stack vertically at full width.
3. **Given** the page is loaded on mobile (375px), **When** rendered, **Then** the navigation becomes a horizontal scrollable bar or accordion, and cards stack vertically with reduced padding.

---

### Edge Cases

- What happens when the page is accessed by an unauthenticated user? → Redirect to Login via Supabase middleware.
- What happens if award data fails to load from API? → Show `error.tsx` boundary with retry button.
- What happens on extremely slow connections? → Show `loading.tsx` skeletons for award cards.
- What happens when user scrolls past all 6 award cards (below MVP)? → The last visible card (MVP) stays highlighted in the left menu.
- What happens when viewport is resized from desktop to mobile while viewing? → Layout transitions gracefully; sticky nav becomes horizontal tabs.
- What happens when the "Chi tiết" target (Sun\* Kudos page) is not yet built? → Button navigates to a placeholder or shows a toast "Coming soon".

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| Component | Node ID | Description | Interactions |
|-----------|---------|-------------|--------------|
| Header | `313:8440` | Shared site header with logo, nav links (About SAA 2025, **Award Information** active, Sun\* Kudos), language selector, notification bell, user avatar | Nav links navigate to respective pages; language dropdown toggles locale |
| Keyvisual (Hero Banner) | `313:8437` | Full-width background image (1440×547px) with gradient overlay | Static display, no interactions |
| Root Further Logo | `2789:12915` | Campaign logo image (338×150px) displayed over keyvisual | Static display |
| Title Section | `313:8453` | Sub-heading "Sun\* Annual Awards 2025" + main heading "Hệ thống giải thưởng SAA 2025" with divider line | Static display |
| Menu List (Left Nav) | `313:8459` | Sticky vertical navigation with 6 category items and icons | Click scrolls to corresponding section; active state with yellow highlight |
| Award Card (×6) | `313:8467`–`313:8510` | Each card: image (336×336px), title, description, quantity line, value line, dividers | Static display per card |
| Sun\* Kudos Block | `335:12023` | Promotional section with title, description, illustration, CTA button | Click "Chi tiết" → navigate to Kudos page |
| Footer | (shared) | Site footer with nav links (About SAA 2025, Award Information, Sun\* Kudos), secondary links (Tiêu chuẩn chung), copyright "Bản quyền thuộc về Sun\* © 2025" | Nav links navigate to respective pages |

**Note on Signature 2025 - Creator Card**: This card has a unique layout compared to the other 5 — it displays **two** "Giá trị giải thưởng" rows: one for individual (Cá nhân: 5,000,000 VNĐ) and one for team (Tập thể: 8,000,000 VNĐ). The component must handle this special case.

### Navigation Flow

- **From**: Homepage SAA (`i87tDx10uM`) → Header nav "Award Information" or Awards section link
- **To**: Sun\* Kudos page (via "Chi tiết" button), other header nav targets
- **Internal**: Left nav items scroll to corresponding award card sections

### Visual Requirements

- **See**: [design-style.md](design-style.md) for full visual specifications
- Responsive breakpoints: mobile (375px), tablet (768px), desktop (1440px)
- Animations: Smooth scroll on menu item click; hover highlight on menu items
- Accessibility:
  - ARIA: `role="navigation"` with `aria-label="Award categories"` on left menu; `aria-current="true"` on active menu item
  - Keyboard: Tab through menu items; Enter/Space to activate scroll; Skip-to-content link
  - Screen reader: Proper heading hierarchy (h2 for "Hệ thống giải thưởng SAA 2025", h3 for each award name)
  - Images: `alt` text on each award image (e.g., "Top Talent award illustration")
  - Focus: Visible focus ring on interactive elements (menu items, "Chi tiết" button)
  - Color contrast: WCAG AA compliant — yellow `#FFEA9E` on dark `#00101A` passes (contrast ratio ≈ 12.5:1)

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render all 6 award categories with correct data (title, description, quantity, unit type, prize value)
- **FR-002**: System MUST provide a left-side navigation menu that scrolls to the corresponding award section on click
- **FR-003**: Navigation menu MUST show active state for the currently visible award section (intersection observer or scroll spy)
- **FR-004**: The "Chi tiết" button in the Sun\* Kudos block MUST navigate to the Kudos detail page
- **FR-005**: Header MUST show "Award Information" nav link in active state (yellow text, bottom border)
- **FR-006**: System MUST display the keyvisual hero banner at the top with gradient overlay
- **FR-007**: Left navigation menu SHOULD be sticky while scrolling through award cards on desktop
- **FR-008**: Page MUST support i18n via the existing locale system (`src/libs/i18n/`) for Vietnamese, English, and Japanese
- **FR-009**: Footer MUST be rendered at the bottom with navigation links and copyright text
- **FR-010**: Signature 2025 - Creator card MUST display two separate prize value rows (Cá nhân: 5,000,000 VNĐ and Tập thể: 8,000,000 VNĐ)

### Technical Requirements

- **TR-001**: Page MUST load within 3 seconds on a 4G connection (heavy images require lazy loading / optimized formats)
- **TR-002**: Award card images (336×336px each × 6) MUST use `next/image` with responsive sizing and lazy loading
- **TR-003**: Page MUST be rendered as a Server Component (RSC) per constitution Principle II; scroll behavior managed via client component wrapper
- **TR-004**: All design tokens MUST use CSS variables from `globals.css` per constitution Principle V
- **TR-005**: Session MUST be validated via Supabase middleware before rendering (constitution Principle VII — A01)
- **TR-006**: Route segment MUST include co-located `loading.tsx` (skeleton) and `error.tsx` (error boundary with retry) per Next.js best practices from constitution
- **TR-007**: Route MUST use `generateMetadata` for SEO (title: "Hệ thống giải thưởng | SAA 2025", description, Open Graph)
- **TR-008**: Award data fetch SHOULD use `use cache` / `unstable_cache` with appropriate revalidation since award data is semi-static

### Key Entities

- **Award Category**: Represents one award type (e.g., Top Talent). Attributes: id, name, description, quantity, unit_type (Cá nhân/Tập thể/Đơn vị), prize_value, image_url, display_order.

---

## Award Categories Data

| # | Award Name | Quantity | Unit Type | Prize Value |
|---|-----------|----------|-----------|-------------|
| 1 | Top Talent | 10 | Cá nhân (Individual) | 7,000,000 VNĐ per award |
| 2 | Top Project | 02 | Tập thể (Team) | 15,000,000 VNĐ per award |
| 3 | Top Project Leader | 03 | Cá nhân (Individual) | 7,000,000 VNĐ |
| 4 | Best Manager | 01 | Cá nhân (Individual) | 10,000,000 VNĐ |
| 5 | Signature 2025 - Creator | 01 | Cá nhân + Tập thể | 5,000,000 VNĐ (Cá nhân) / 8,000,000 VNĐ (Tập thể) |
| 6 | MVP (Most Valuable Person) | 01 | — | 15,000,000 VNĐ |

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/api/awards` | GET | Fetch all award categories with details | New |
| Supabase Auth `getUser` | Server SDK | Validate session in middleware | Exists |

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| activeCategory | string | `'top-talent'` | Currently active/visible award category for nav highlight (client component — IntersectionObserver) |

> **Note**: Loading and error states are **not** managed as component state. Per TR-006, they are handled by Next.js route-level boundaries: `loading.tsx` (Suspense skeleton) and `error.tsx` (error boundary with retry). Since the page is an RSC (TR-003), data fetching occurs server-side during rendering.

### Global State

| State | Store | Read/Write | Purpose |
|-------|-------|------------|---------|
| user | authStore (Supabase session) | Read | Authenticated user context |
| locale | i18n | Read | Language for content rendering |

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 6 award cards render with correct data and images within 3 seconds on desktop
- **SC-002**: Navigation menu correctly highlights active section during scroll with ≤100ms delay
- **SC-003**: Page scores ≥90 on Lighthouse Performance audit
- **SC-004**: Zero horizontal scrolling at any viewport width (375px–1440px)

---

## Out of Scope

- Editing or managing award data (admin functionality)
- Voting or nomination features for awards
- Award ceremony live streaming integration
- Individual award detail drill-down pages (each card is self-contained)

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)

---

## Notes

- Award data may be static/hardcoded initially if the API is not ready, with a TODO to switch to dynamic fetch later.
- The left navigation uses a sticky position with scroll-spy behavior — requires a thin client component wrapper for `IntersectionObserver`.
- All text content is in Vietnamese; i18n support for English/Japanese should be planned per the existing locale system (`src/libs/i18n/`).
- The Sun\* Kudos promotional block is visually distinct from award cards — it uses a different layout (horizontal with CTA button) and may be conditionally hidden based on campaign dates.
