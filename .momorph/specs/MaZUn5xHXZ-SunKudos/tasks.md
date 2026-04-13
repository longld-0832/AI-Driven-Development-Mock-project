# Tasks: Sun* Kudos (Live Board)

**Frame**: `MaZUn5xHXZ-SunKudos`
**Prerequisites**: plan.md ✅ | spec.md ✅ | design-style.md ✅
**User Stories**: US1 — Hero & Search (P1), US2 — Highlight Kudos Carousel (P1), US3 — Spotlight Board (P2), US4 — All Kudos Feed (P1), US5 — Personal Stats & Secret Box (P1), US6 — Leaderboard (P2), US7 — Like a Kudo (P2), US8 — Responsive Layout (P2)

---

## Task Format

```text
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this belongs to (US1–US8)
- **|**: Primary file affected by this task

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare assets, testing tooling, and route scaffolding inputs before
feature development starts.

- [ ] T001 Create `public/assets/kudos/icons/` and `public/assets/kudos/images/` directories for Sun Kudos media assets | public/assets/kudos/
- [ ] T002 [P] Download Sun Kudos hero art, wordmark, and interaction icons from MoMorph media into the new kudos asset directories | public/assets/kudos/
- [ ] T003 [P] Add Sun Kudos testing dev dependencies (`vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@playwright/test`) | package.json
- [ ] T004 [P] Create or extend Vitest configuration for React component and hook testing under jsdom | vitest.config.ts
- [ ] T005 [P] Add base test scripts for unit/component and E2E execution (`test`, `test:watch`, `test:e2e`) | package.json

**Checkpoint**: Kudos assets directory exists, required media is available locally, and test tooling can be installed and invoked.

---

## Phase 2: Foundation (Blocking Prerequisites)

**Purpose**: Establish the shared data, tokens, database, and service infrastructure
required by all user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T006 Create Sun Kudos domain types (`Kudo`, `KudoUser`, `PersonalKudosStats`, `LeaderboardEntry`, `SpotlightData`, `KudoCategory`) | src/types/kudos.ts
- [ ] T007 [P] Create mock Sun Kudos data for kudos, spotlight items, leaderboard entries, and personal stats | src/data/kudos-mock.ts
- [ ] T008 [P] Add Sun Kudos i18n dictionaries for Vietnamese and English following the homepage locale structure | src/libs/i18n/sun-kudos.ts
- [ ] T009 [P] Add Sun Kudos design tokens from the reviewed design-style document to `:root` and shared font/token sections | src/app/globals.css
- [ ] T010 Create Supabase migration for kudos, kudos_images, kudos_hashtags, kudos_likes, user_profiles, and secret_boxes with RLS policies | supabase/migrations/YYYYMMDDHHMMSS_create_kudos_tables.sql
- [ ] T011 [P] Add development seed data for Sun Kudos entities and relationships used by local testing | supabase/seeds/dev/kudos-seed.sql
- [ ] T012 Create the debouncing hook with configurable delay and SSR-safe behavior | src/hooks/useDebounce.ts
- [ ] T013 Create the shared Sun Kudos service layer with mock-backed reads, mutation stubs, and cache-tag strategy from the plan | src/services/kudos-service.ts
- [ ] T014 [P] Add unit tests for `useDebounce` and service return-shape coverage before implementation consumers are added | tests/unit/kudos/kudos-foundation.spec.ts

**Checkpoint**: Types, tokens, mock data, service layer, migration, and seed files compile cleanly and support downstream page development.

---

## Phase 3: User Story 1 — View Hero & Search for Kudos/Profiles (Priority: P1) 🎯 MVP

**Goal**: Authenticated users land on `/kudos`, see the Sun Kudos brand hero, and can
use the two search inputs to find profiles or start the write-kudo flow.

**Independent Test**: Navigate to `/kudos` as an authenticated user and verify the hero
renders the correct branding, both search inputs show the right placeholders, typing 2+
characters shows debounced results, and selecting a result navigates to the expected target.

### Tests (US1)

- [ ] T015 [P] [US1] Write component tests for search input debounce, focus state, empty state, and result selection behavior | tests/unit/kudos/search-input.spec.tsx
- [ ] T016 [P] [US1] Write route integration test for authenticated `/kudos` page shell and hero rendering | tests/integration/kudos/page-hero.spec.tsx

### Implementation (US1)

- [ ] T017 [P] [US1] Create the reusable hero search input client component with icon variants, dropdown states, and locale-driven labels | src/components/kudos/SearchInput.tsx
- [ ] T018 [P] [US1] Create the Sun Kudos hero server component with background treatment, subtitle, wordmark, and two search inputs | src/components/kudos/KudosHero.tsx
- [ ] T019 [US1] Create the `/kudos` App Router page with authenticated RSC data loading and initial page composition around the hero | src/app/(home)/kudos/page.tsx

**Checkpoint**: User Story 1 is independently testable and delivers the core entry experience for the screen.

---

## Phase 4: User Story 2 — Browse Highlight Kudos Carousel (Priority: P1)

**Goal**: Users can browse featured kudos in a paginated, filterable carousel with
video, relationship badges, detail link, and copy-link action.

**Independent Test**: Scroll to the highlight section and verify 4 desktop cards render,
carousel arrows and pagination work, hashtag/department filters apply, and each card shows
the expected sender/receiver, preview, badges, hashtags, and actions.

### Tests (US2)

- [ ] T020 [P] [US2] Write tests for carousel paging, disabled arrow state, keyboard navigation, and pagination announcements | tests/unit/kudos/kudo-carousel.spec.tsx
- [ ] T021 [P] [US2] Write tests for filter dropdown open/select/close behavior and filtered data application | tests/unit/kudos/filter-dropdown.spec.tsx

### Implementation (US2)

- [ ] T022 [P] [US2] Create the relationship badge pill component with all supported visual variants | src/components/kudos/RelationshipBadge.tsx
- [ ] T023 [P] [US2] Create the hashtag pill component for highlight and feed card reuse | src/components/kudos/HashtagPill.tsx
- [ ] T024 [P] [US2] Create the carousel arrow component with disabled and active states | src/components/kudos/CarouselArrow.tsx
- [ ] T025 [P] [US2] Create the pagination component with current-page announcement support | src/components/kudos/Pagination.tsx
- [ ] T026 [P] [US2] Create the base reusable kudo card server component with highlight/feed variants, thumbnails, and detail-link slot | src/components/kudos/KudoCard.tsx
- [ ] T027 [P] [US2] Create the filter dropdown client component with hashtag and department selection states | src/components/kudos/FilterDropdown.tsx
- [ ] T028 [P] [US2] Create the carousel client component with swipe, arrow-key, and page state support | src/components/kudos/KudoCarousel.tsx
- [ ] T029 [US2] Create the highlight section server wrapper and wire it into the `/kudos` page with initial highlighted data | src/components/kudos/HighlightKudos.tsx

**Checkpoint**: User Story 2 is independently testable and the highlight carousel works without relying on the rest of the feed.

---

## Phase 5: User Story 4 — Browse All Kudos Feed (Priority: P1)

**Goal**: Users can browse the full kudos feed, load more content, open images, and copy
permalinks from the main feed column.

**Independent Test**: Scroll the All Kudos section and verify cards render vertically,
additional records load on demand, thumbnails open in a full-size modal, and copy-link
feedback appears.

### Tests (US4)

- [ ] T030 [P] [US4] Write tests for feed pagination or infinite scroll and empty-feed fallback behavior | tests/unit/kudos/kudo-feed.spec.tsx
- [ ] T031 [P] [US4] Write tests for image lightbox open/close behavior and copy-link feedback display | tests/unit/kudos/kudo-card-interactions.spec.tsx

### Implementation (US4)

- [ ] T032 [P] [US4] Create the client-side feed component that reuses `KudoCard`, loads more data, and handles empty/loading states | src/components/kudos/KudoFeed.tsx
- [ ] T033 [P] [US4] Create the image lightbox client component for full-resolution gallery viewing and keyboard dismissal | src/components/kudos/ImageLightbox.tsx
- [ ] T034 [P] [US4] Create the reusable toast component for copy-link success and recoverable interaction feedback | src/components/kudos/Toast.tsx
- [ ] T035 [US4] Create the All Kudos section server wrapper and connect it to the `/kudos` page layout | src/components/kudos/AllKudosSection.tsx

**Checkpoint**: User Story 4 is independently testable and the main feed can be explored without the sidebar stories being complete.

---

## Phase 6: User Story 5 — View Personal Stats & Open Secret Box (Priority: P1)

**Goal**: Users see their personal stats in a sticky sidebar and can navigate to the
Secret Box screen.

**Independent Test**: On desktop the sidebar remains sticky while the feed scrolls, the
five stat rows render with correct styles, and the Secret Box CTA navigates to the correct target.

### Tests (US5)

- [ ] T036 [P] [US5] Write tests for personal stats rendering, zero-value states, and Secret Box CTA destination | tests/unit/kudos/personal-stats.spec.tsx

### Implementation (US5)

- [ ] T037 [P] [US5] Create the Secret Box CTA server component with route target, accessible label, and token-based styling | src/components/kudos/SecretBoxButton.tsx
- [ ] T038 [P] [US5] Create the personal stats server component with sticky desktop behavior and mobile/tablet relocation hooks via props or layout classes | src/components/kudos/PersonalStats.tsx
- [ ] T039 [US5] Wire personal stats and Secret Box CTA into the All Kudos page sidebar region | src/app/(home)/kudos/page.tsx

**Checkpoint**: User Story 5 is independently testable and the stats/CTA experience works even before leaderboard data is added.

---

## Phase 7: User Story 3 — View Spotlight Board (Priority: P2)

**Goal**: Users can view the spotlight board with video preview, kudos count, avatar grid,
and a continuously scrolling ticker.

**Independent Test**: Scroll to the spotlight section and verify the section heading,
video preview, total kudos count, avatar grid, and auto-scrolling ticker all render and degrade gracefully when video is unavailable.

### Tests (US3)

- [ ] T040 [P] [US3] Write tests for spotlight fallback poster rendering, count display, and ticker content visibility | tests/unit/kudos/spotlight-board.spec.tsx

### Implementation (US3)

- [ ] T041 [P] [US3] Create the ticker client component with continuous motion, reduced-motion handling, and accessibility-safe markup | src/components/kudos/SpotlightTicker.tsx
- [ ] T042 [P] [US3] Create the spotlight board server component with lazy video, avatar grid, fallback poster, and spotlight summary layout | src/components/kudos/SpotlightBoard.tsx
- [ ] T043 [US3] Wire the spotlight board section into the `/kudos` page between highlights and the full feed | src/app/(home)/kudos/page.tsx

**Checkpoint**: User Story 3 is independently testable and spotlight content displays without blocking initial page render.

---

## Phase 8: User Story 6 — View Leaderboard (Priority: P2)

**Goal**: Users can see the top 10 recognized Sunners below the stats panel and navigate
from leaderboard entries to profile pages.

**Independent Test**: Verify the leaderboard title, 10 entries max, rank/identity display,
and profile navigation from each entry.

### Tests (US6)

- [ ] T044 [P] [US6] Write tests for leaderboard entry count, rank formatting, and profile-link navigation | tests/unit/kudos/leaderboard.spec.tsx

### Implementation (US6)

- [ ] T045 [P] [US6] Create the individual leaderboard entry component for rank, avatar, and profile link rendering | src/components/kudos/LeaderboardEntry.tsx
- [ ] T046 [P] [US6] Create the leaderboard list server component for the sidebar ranking block | src/components/kudos/Leaderboard.tsx
- [ ] T047 [US6] Wire leaderboard data into the sidebar composition on the `/kudos` page | src/app/(home)/kudos/page.tsx

**Checkpoint**: User Story 6 is independently testable and completes the sidebar information architecture.

---

## Phase 9: User Story 7 — Like a Kudo (Priority: P2)

**Goal**: Users can like and unlike kudos with optimistic UI and rollback on failure.

**Independent Test**: Click the heart icon on any kudo card and verify optimistic count
change, persisted liked state on reload, and rollback toast when the mutation fails.

### Tests (US7)

- [ ] T048 [P] [US7] Write tests for optimistic like/unlike state, rollback handling, and persisted liked rendering | tests/unit/kudos/like-button.spec.tsx

### Implementation (US7)

- [ ] T049 [P] [US7] Create the reusable video play button component for video-enabled kudos cards | src/components/kudos/VideoPlayButton.tsx
- [ ] T050 [P] [US7] Create the kudo interaction client wrapper for like and copy-link actions across card variants | src/components/kudos/KudoCardInteractions.tsx
- [ ] T051 [US7] Implement optimistic like/unlike mutation flow through the Sun Kudos service layer with cache invalidation hooks | src/services/kudos-service.ts

**Checkpoint**: User Story 7 is independently testable and interactive feedback behaves correctly under success and failure paths.

---

## Phase 10: User Story 8 — Responsive Layout (Priority: P2)

**Goal**: The entire `/kudos` experience adapts cleanly across mobile, tablet, and desktop,
including stacked hero search, 1/2/4-card carousel behavior, and sidebar relocation.

**Independent Test**: Verify the page at 375px, 768px, and 1440px with no horizontal scroll,
correct component reflow, readable headings, and 44×44 minimum touch targets.

### Tests (US8)

- [ ] T052 [P] [US8] Write viewport-focused integration tests for mobile, tablet, and desktop layout behavior | tests/integration/kudos/responsive-layout.spec.tsx

### Implementation (US8)

- [ ] T053 [P] [US8] Create co-located loading skeletons for the `/kudos` route matching hero, cards, sidebar, and spotlight shapes | src/app/(home)/kudos/loading.tsx
- [ ] T054 [P] [US8] Create the co-located error boundary with retry action for the `/kudos` route segment | src/app/(home)/kudos/error.tsx
- [ ] T055 [US8] Apply and validate responsive layout rules across the page composition and major Kudos components | src/app/(home)/kudos/page.tsx

**Checkpoint**: User Story 8 is independently testable and confirms constitution-compliant responsive behavior across the full screen.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Finish the feature with accessibility, performance, navigation, and final validation across all stories.

- [ ] T056 [P] Add the shared section label component used across highlight, spotlight, and feed sections | src/components/kudos/SectionLabel.tsx
- [ ] T057 [P] Add the shared section heading component used across highlight, spotlight, and feed sections | src/components/kudos/SectionHeading.tsx
- [ ] T058 [P] Update shared navigation to ensure `/kudos` is active in the header navigation state logic | src/components/layout/NavLinks.tsx
- [ ] T059 [P] Verify and adjust footer routing and labels for the shipped `/kudos` destination if needed | src/components/layout/Footer.tsx
- [ ] T060 [P] Run accessibility hardening for focus states, `aria-label`s, `aria-live`, reduced-motion handling, and keyboard support across all Kudos components | src/components/kudos/
- [ ] T061 [P] Optimize page and media performance with `next/image` sizing, lazy loading, and cache usage verification against the 2-second target | src/app/(home)/kudos/page.tsx
- [ ] T062 Execute final end-to-end validation for auth gating, hero search, carousel, feed, spotlight, sidebar, likes, and responsive layouts | tests/e2e/kudos-live-board.spec.ts

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundation (Phase 2)**: Depends on Setup completion; blocks all story work.
- **US1, US2, US4, US5**: Start after Foundation; these form the recommended MVP path.
- **US3, US6, US7, US8**: Depend on Foundation and can proceed once the page shell exists.
- **Polish (Phase 11)**: Depends on all desired user stories being complete.

### Within Each User Story

- Tests must be written first and fail before implementation begins.
- Shared primitives before section wrappers.
- Service or state wiring before page composition updates that depend on it.
- A story is only complete once its independent test passes.

### Story Completion Order

1. **US1** → establishes the route and hero.
2. **US2** → adds the highlighted carousel.
3. **US4** → adds the main feed.
4. **US5** → completes the sidebar MVP with personal stats.
5. **US3** → adds spotlight board.
6. **US6** → completes leaderboard.
7. **US7** → finalizes interactive likes.
8. **US8** → validates and closes responsive layout requirements.

### Parallel Opportunities

- In **Phase 1**, T002–T005 can run in parallel after T001.
- In **Phase 2**, T007–T009, T011, and T014 can run in parallel with T006/T010 as dependencies allow.
- In **US2**, T022–T024 can run in parallel after tests are authored.
- In **US4**, T028–T030 can run in parallel after tests are authored.
- In **US3**, T037 and T038 can run in parallel after the test scaffold is in place.
- In **Polish**, T056–T061 can run in parallel before final E2E execution in T062.

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete Phase 1 + Phase 2.
2. Complete US1, US2, US4, and US5.
3. **STOP and VALIDATE** with integration tests and a manual authenticated walkthrough.
4. Ship MVP if stakeholder answers for open business questions are still pending on non-MVP stories.

### Incremental Delivery

1. Setup + Foundation.
2. Deliver Hero/Search.
3. Deliver Highlight Carousel.
4. Deliver All Kudos Feed + Personal Stats sidebar.
5. Add Spotlight + Leaderboard.
6. Add Like interactions.
7. Close responsive and cross-cutting concerns.

---

## Notes

- Keep route naming aligned with the existing app navigation: `/kudos`.
- Treat `relationship_badge` as derived display data unless backend contracts confirm a stored field.
- Keep open business questions from `plan.md` visible during implementation, especially pagination strategy and Spotlight video source.
- Mark tasks complete as work progresses: `[x]`.