# Implementation Plan: Sun* Kudos (Live Board)

**Frame**: `MaZUn5xHXZ-SunKudos`
**Date**: 2026-04-14
**Spec**: `specs/MaZUn5xHXZ-SunKudos/spec.md`

---

## Summary

The Sun* Kudos screen is the primary recognition and appreciation hub for SAA 2025.
It provides a hero with dual search, a highlighted kudos carousel, a live spotlight
board, a full kudos feed with personal stats sidebar, and a leaderboard. The
implementation uses Next.js App Router (RSC-first) with Supabase for auth and data,
TailwindCSS for design-token-driven UI, and deploys on Cloudflare Workers via
`@opennextjs/cloudflare`.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 15.5 App Router
**Primary Dependencies**: React 19, TailwindCSS 4, `@supabase/ssr`, `@supabase/supabase-js`
**Database**: PostgreSQL via Supabase (RLS-enabled)
**Testing**: Vitest (unit) + Playwright (E2E)
**State Management**: RSC for server state; `useState`/`useEffect` for client state
**API Style**: Supabase SDK queries (no REST endpoints needed — direct DB access via RLS)
**Deployment**: Cloudflare Workers via `@opennextjs/cloudflare`

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **Principle I — TypeScript-First**: Strict mode enabled, all types explicit
- [x] **Principle II — RSC by Default**: Page and data-fetching components are server components; only interactive sections use `"use client"`
- [x] **Principle III — Supabase as Single Backend**: All data through Supabase SDK with RLS. Auth via `getUser()` server-side
- [x] **Principle IV — Edge-Compatible**: No Node.js-only APIs. All code compatible with Cloudflare Workers runtime
- [x] **Principle V — Design-Token Driven UI**: All visual properties from CSS variables in `globals.css`, consumed via Tailwind
- [x] **Principle VI — Responsive Design**: Mobile-first, three breakpoints (0/768px `md:`/1280px `xl:`), touch targets ≥ 44×44px
- [x] **Principle VII — Secure by Default**: `getUser()` at route level, parameterized Supabase queries, no secrets in client

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-based (`src/components/kudos/`), composable atomic components
- **Styling Strategy**: TailwindCSS utilities with CSS variables from `globals.css`. New kudos-specific tokens added to `:root`
- **Data Fetching**: RSC with Supabase server client for initial page load. Client-side Supabase for mutations (like/unlike) and infinite scroll
- **Rendering Strategy**:
  - **Server Components (RSC)**: Page shell, KudosHero (static), initial highlighted kudos, initial feed (page 1), personal stats, leaderboard, spotlight board metadata
  - **Client Components** (`"use client"`): `KudoCarousel` (carousel interaction), `SearchInput` (debounced input + dropdown), `FilterDropdown` (open/close state), `LikeButton` (optimistic UI), `CopyLinkButton` (clipboard API), `KudoFeed` (infinite scroll), `SpotlightTicker` (CSS animation control)

### Backend Approach

- **API Design**: Direct Supabase SDK queries — no custom API route handlers needed. Supabase RLS policies enforce access control
- **Data Access**: Supabase server client in RSC for reads; Supabase browser client in client components for mutations
- **Validation**: Supabase RLS + server-side `getUser()` for auth. No user input that needs Zod validation on this screen (read-heavy, only like/unlike mutation)

### Integration Points

- **Existing Services**: Extend pattern from `src/services/award-service.ts` → new `src/services/kudos-service.ts`
- **Shared Components**: Reuse `Header`, `Footer`, `NavLinks` from `src/components/layout/`
- **Existing Kudos Components**: `SunKudosBlock`, `KudosWidget`, `SunKudosPromo` remain unchanged — they link TO this new page
- **i18n**: Follow pattern from `src/libs/i18n/homepage.ts` → new `src/libs/i18n/sun-kudos.ts`
- **Auth**: Reuse `src/libs/supabase/server.ts` `createClient()` + `getUser()` pattern from existing pages

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/MaZUn5xHXZ-SunKudos/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design specifications ✅
├── plan.md              # This file ✅
├── tasks.md             # Task breakdown (next step)
└── assets/              # Reference screenshots
```

### Source Code (affected areas)

```text
# New Files
src/
├── app/
│   └── (home)/
│       └── kudos/
│           ├── page.tsx              # Main Sun* Kudos page (RSC)
│           ├── loading.tsx           # Suspense skeleton
│           └── error.tsx             # Error boundary
├── components/
│   └── kudos/
│       ├── KudosHero.tsx             # Hero section with branding (RSC)
│       ├── SearchInput.tsx           # Debounced search input ("use client")
│       ├── HighlightKudos.tsx        # Highlight section wrapper (RSC)
│       ├── KudoCarousel.tsx          # Carousel with navigation ("use client")
│       ├── KudoCard.tsx              # Reusable kudo card (RSC)
│       ├── KudoCardInteractions.tsx  # Like + CopyLink wrapper ("use client")
│       ├── RelationshipBadge.tsx     # Badge pill component (RSC)
│       ├── HashtagPill.tsx           # Hashtag pill component (RSC)
│       ├── VideoPlayButton.tsx       # Video overlay button ("use client")
│       ├── FilterDropdown.tsx        # Dropdown filter ("use client")
│       ├── SpotlightBoard.tsx        # Spotlight section (RSC)
│       ├── SpotlightTicker.tsx       # Scrolling ticker ("use client")
│       ├── AllKudosSection.tsx       # All Kudos wrapper (RSC)
│       ├── KudoFeed.tsx              # Infinite scroll feed ("use client")
│       ├── PersonalStats.tsx         # Stats sidebar (RSC)
│       ├── SecretBoxButton.tsx       # CTA button (RSC — simple link)
│       ├── Leaderboard.tsx           # Top 10 ranking (RSC)
│       ├── LeaderboardEntry.tsx      # Single leaderboard row (RSC)
│       ├── SectionLabel.tsx          # "Sun* Annual Awards 2025" label (RSC)
│       ├── SectionHeading.tsx        # Section heading component (RSC)
│       ├── Pagination.tsx            # Carousel pagination ("use client")
│       ├── CarouselArrow.tsx         # Arrow navigation button (RSC)
│       ├── ImageLightbox.tsx         # Full-resolution image modal ("use client")
│       └── Toast.tsx                 # Transient feedback toast ("use client")
├── hooks/
│   └── useDebounce.ts               # Debounce hook for search inputs
├── data/
│   └── kudos-mock.ts                # Mock kudo/user/stats data (dev seed)
├── services/
│   └── kudos-service.ts             # Kudos data fetching (server + client)
├── libs/
│   └── i18n/
│       └── sun-kudos.ts             # i18n locale strings (vi + en)
└── types/
    └── kudos.ts                     # Kudos TypeScript types

# Modified Files
src/
├── app/
│   └── globals.css                  # Add kudos-specific CSS variables
└── components/
    └── layout/
        └── NavLinks.tsx             # Ensure "/kudos" route is active-aware

supabase/
├── migrations/
│   └── YYYYMMDDHHMMSS_create_kudos_tables.sql  # Schema migration (version-controlled)
└── seeds/
    └── dev/
        └── kudos-seed.sql           # Dev seed data for kudos, profiles, likes
```

### Dependencies

**Existing** (no changes):
- `next/image` for responsive images
- `next/link` for navigation
- `@supabase/ssr` + `@supabase/supabase-js` for data
- TailwindCSS for styling

**New dev dependencies** (required for testing per constitution TDD mandate):

| Package | Version | Purpose |
|---------|---------|---------|
| `vitest` | `^3` | Unit + component test runner |
| `@vitejs/plugin-react` | `^4` | React transform for Vitest |
| `@testing-library/react` | `^16` | Component test utilities |
| `@testing-library/jest-dom` | `^6` | DOM assertion matchers |
| `jsdom` | `^25` | Browser environment for Vitest |
| `@playwright/test` | `^1` | E2E test framework |

---

## Implementation Strategy

> **TDD Mandate**: Per constitution governance, every phase follows the Red → Green →
> Refactor cycle. Tests are written BEFORE implementation code. Each phase lists test
> targets alongside deliverables.

### Phase 0: Asset Preparation

- Download required UI assets from Figma via `get_media_files`:
  - Hero background abstract art image
  - Sun* KUDOS wordmark/logo SVG
  - Pencil/edit icon SVG (search input prefix)
  - Magnifying glass icon SVG (search input prefix)
  - Arrow icons SVG (carousel prev/next, sender→receiver)
  - Heart icon SVG (like button, filled + unfilled)
  - External link icon SVG (copy link, xem chi tiết)
  - Play button icon SVG (video overlay)
  - Chevron down icon SVG (filter dropdown)
  - Secret Box gift icon
- Organize in `public/assets/kudos/{icons,images}/`
- Verify asset naming follows kebab-case convention

### Phase 1: Foundation (Types, Tokens, i18n, Service)

**Goal**: Set up all shared infrastructure before any UI work.

1. **Types** (`src/types/kudos.ts`):
   - `Kudo` interface (id, sender, receiver, message, category, images, video_url, hashtags, like_count, is_liked_by_me, is_highlighted, created_at)
   - `KudoUser` interface (id, name, avatar_url, department, role, relationship_badge)
   - `PersonalKudosStats` interface
   - `LeaderboardEntry` interface
   - `SpotlightData` interface
   - `KudoCategory` type union

2. **Design Tokens** (`src/app/globals.css`):
   - Add kudos-specific tokens not yet in global scope:
     - `--color-surface-card`, `--color-hashtag-bg`, `--color-heart`, `--color-heart-unfilled`
     - `--color-hero-gradient-end`, `--color-role-text`, `--color-play-btn`
     - `--color-rank-gold`, `--color-btn-secret-box`, `--color-btn-secret-box-text`
     - `--radius-pill`, `--radius-search-input`
     - Typography tokens: `--text-hero-title`, `--text-section-heading`, etc.

3. **i18n** (`src/libs/i18n/sun-kudos.ts`):
   - All user-facing strings in Vietnamese (default) and English
   - Follow `HOMEPAGE_I18N` pattern from `src/libs/i18n/homepage.ts`

4. **Service layer** (`src/services/kudos-service.ts`):
   - `getHighlightKudos(filters?)` — fetch highlighted kudos
   - `getAllKudos(page, cursor?)` — fetch paginated kudo feed
   - `getPersonalStats(userId)` — fetch user's kudos stats
   - `getLeaderboard()` — fetch top 10
   - `getSpotlightData()` — fetch spotlight board data
   - `searchUsers(query)` — search users by name
   - `searchKudos(query)` — search kudos by message/hashtag
   - `toggleLike(kudoId)` — like/unlike a kudo (client-side mutation)
   - Initially return mock data from `src/data/kudos-mock.ts` (following `award-service.ts` + `awards-detail.ts` pattern), with TODO for Supabase queries
   - **Caching**: Server-side reads MUST use `unstable_cache` (or `"use cache"` when stable) with `revalidate: 60` for feed/highlights/leaderboard and `revalidate: 0` (no cache) for personal stats. Cache tags: `["kudos-feed"]`, `["kudos-highlights"]`, `["kudos-leaderboard"]`, `["kudos-spotlight"]`

5. **Custom Hook** (`src/hooks/useDebounce.ts`):
   - Debounce hook with configurable delay (default 300ms)

6. **Database Migration** (`supabase/migrations/`):
   - Create migration file with all tables from Database Schema section
   - Create dev seed file (`supabase/seeds/dev/kudos-seed.sql`) with sample data
   - Run `supabase db reset` to verify migration + seed

7. **Test setup**:
   - Install dev dependencies (vitest, testing-library, playwright)
   - Create `vitest.config.ts` if not exists
   - Write initial tests for: types compile, service functions return correct shapes, `useDebounce` hook behavior

### Phase 2: Core Page Shell & Layout (US8 — Responsive)

**Goal**: Establish the page route, layout, loading/error boundaries.

1. **Route**: `src/app/(home)/kudos/page.tsx`
   - Route path: `/kudos` (matches existing `NavLinks.tsx` and `Footer.tsx` references)
   - RSC page, calls `getUser()` for auth check
   - Fetches initial data via service functions (with `unstable_cache`)
   - Composes all section components
   
2. **Loading state**: `src/app/(home)/kudos/loading.tsx`
   - Full-page skeleton matching the design (hero skeleton + card skeletons)
   
3. **Error boundary**: `src/app/(home)/kudos/error.tsx`
   - Error UI with retry button (follow existing `(home)/error.tsx` pattern)

4. **NavLinks update**: Ensure `/kudos` route shows active yellow state

### Phase 3: Hero & Search (US1 — P1)

**Goal**: Implement the hero section with branding and dual search inputs.

1. `KudosHero` — RSC container with gradient background, subtitle, KUDOS wordmark
2. `SearchInput` — Client component with debounce, dropdown results, prefix icon variants
3. Navigation: Search selection → Write Kudo flow or Profile page

### Phase 4: Highlight Kudos Carousel (US2 — P1)

**Goal**: Featured kudos carousel with filters and pagination.

1. `HighlightKudos` — RSC wrapper with section label/heading
2. `FilterDropdown` — Client component for hashtag/department filters
3. `KudoCarousel` — Client component with slide animation, arrow keys, swipe
4. `KudoCard` — Shared card component (RSC portion) with size variant prop
5. `KudoCardInteractions` — Client wrapper for like button, copy link
6. `RelationshipBadge` — Badge pill with 3 color variants
7. `HashtagPill` — Hashtag pill component
8. `VideoPlayButton` — Play overlay for video kudos
9. `Pagination` — Page indicator "2/5" with prev/next
10. `CarouselArrow` — Arrow navigation buttons

### Phase 5: All Kudos Feed + Sidebar (US4, US5, US6 — P1/P2)

**Goal**: Full kudos feed with infinite scroll, personal stats, and leaderboard.

1. `AllKudosSection` — RSC two-column layout wrapper
2. `KudoFeed` — Client component with infinite scroll (reuses `KudoCard`)
3. `PersonalStats` — RSC sidebar with stats display
4. `SecretBoxButton` — Simple link to Secret Box page
5. `Leaderboard` — RSC component with top 10 entries
6. `LeaderboardEntry` — Individual entry with rank, avatar, name, department

### Phase 6: Spotlight Board (US3 — P2)

**Goal**: Live spotlight board with video, avatar grid, and scrolling ticker.

1. `SpotlightBoard` — RSC wrapper with section heading and card
2. `SpotlightTicker` — Client component with CSS-based continuous scroll animation
3. Video preview with lazy-loaded `<video>` or embed
4. Avatar grid with names and departments

### Phase 7: Interactions & Polish (US7 — P2)

**Goal**: Like/unlike, copy link, image lightbox, toast feedback, and final polish.

1. `LikeButton` (inside `KudoCardInteractions`) — optimistic UI with rollback
2. `CopyLinkButton` — clipboard API with toast feedback via `Toast.tsx`
3. `ImageLightbox.tsx` — modal overlay for full-resolution image on thumbnail click (Escape to close, arrow keys to navigate)
4. `Toast.tsx` — reusable transient notification component (auto-dismiss 3s, used for copy success, like error rollback)
5. Keyboard navigation for carousel (ArrowLeft/ArrowRight)
6. ARIA labels + screen reader announcements
7. Touch target verification (≥ 44×44px)
8. Responsive testing at 375px, 768px, 1440px
9. **TDD tests**: LikeButton optimistic + rollback, CopyLinkButton clipboard mock, ImageLightbox open/close/keyboard, Toast auto-dismiss

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Supabase API not ready (tables/RLS) | High | High | Use mock data service layer; swap when API ready. Service abstraction makes this seamless |
| Carousel performance on mobile | Medium | Medium | Use CSS transforms (GPU-accelerated), limit DOM nodes to visible + 1 buffer card |
| Spotlight video lazy-load + edge compat | Medium | Medium | Use HTML5 `<video>` with `loading="lazy"`, fallback poster image. Avoid Node.js video processing |
| Large image gallery in kudo cards | Low | Medium | Use `next/image` with responsive `sizes`, `loading="lazy"` for below-fold, limit max visible thumbnails |
| Search dropdown performance (many results) | Low | Low | Debounce 300ms, limit results to 10, virtualize if needed |
| i18n string volume | Low | Low | Follow existing pattern; all strings in one locale file per screen |

### Estimated Complexity

- **Frontend**: High (17+ components, carousel, infinite scroll, optimistic UI, responsive)
- **Backend**: Low (Supabase direct queries, no custom API logic)
- **Testing**: Medium (unit tests for components/hooks, E2E for critical flows)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component/Module interactions**: KudoCard ↔ KudoCardInteractions, KudoCarousel ↔ Pagination, SearchInput ↔ service layer
- [x] **External dependencies**: Supabase auth (getUser), Supabase data queries (RLS)
- [x] **Data layer**: Kudos CRUD via Supabase SDK
- [x] **User workflows**: Search → navigate, Like → persist, Carousel → paginate, Infinite scroll → load more

### Test Categories

| Category | Applicable? | Key Scenarios |
|----------|-------------|---------------|
| UI ↔ Logic | Yes | Like/unlike optimistic update, search debounce → dropdown, carousel slide → pagination sync |
| Service ↔ Service | No | N/A — single service layer |
| App ↔ External API | Yes | Supabase auth check, kudos fetch, like mutation, search query |
| App ↔ Data Layer | Yes | Feed pagination, filter application, stats fetch |
| Cross-platform | Yes | Mobile carousel swipe, tablet layout collapse, responsive breakpoints |

### Test Environment

- **Environment type**: Local (Supabase CLI) + Staging (Supabase cloud project)
- **Test data strategy**: Seed files in `supabase/seeds/dev/` with sample kudos, users, stats
- **Isolation approach**: Fresh Supabase state per test suite via seed reset

### Mocking Strategy

| Dependency Type | Strategy | Rationale |
|-----------------|----------|-----------|
| Supabase Auth | Mock (Vitest)  / Real (E2E) | Unit tests mock `getUser()`; E2E uses real auth flow |
| Supabase Data | Mock (Vitest) / Real (E2E) | Unit tests use mock service; E2E hits local Supabase |
| Clipboard API | Mock (Vitest) | Browser API not available in test environment |
| IntersectionObserver | Mock (Vitest) | Not available in jsdom |

### Test Scenarios Outline

1. **Happy Path**
   - [x] Page loads with hero, highlighted kudos, all kudos feed, stats, leaderboard
   - [x] User searches for a Sunner and navigates to profile
   - [x] User clicks like → count increments → persists on reload
   - [x] User navigates carousel with arrows and pagination
   - [x] User applies hashtag filter → carousel updates
   - [x] User scrolls → infinite scroll loads next page
   - [x] User clicks "Mở Secret Box" → navigates to Secret Box page

2. **Error Handling**
   - [x] Kudos API fails → error.tsx renders with retry
   - [x] Like API fails → optimistic update rolls back
   - [x] Search fails → error message in dropdown
   - [x] Unauthenticated → redirect to /login

3. **Edge Cases**
   - [x] Empty kudos feed → empty state message
   - [x] Kudo with no images → image section hidden
   - [x] Kudo with no hashtags → hashtag section hidden
   - [x] Carousel at first/last page → arrow disabled
   - [x] Spotlight video unavailable → poster fallback
   - [x] Mobile viewport → single column, collapsed sidebar

### Tooling & Framework

- **Test framework**: Vitest (unit + component) + Playwright (E2E)
- **Supporting tools**: `@testing-library/react` for component tests, Supabase CLI for local DB
- **CI integration**: GitHub Actions — lint → type-check → unit tests → build → E2E

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Core user flows (search, like, navigate) | 90%+ | High |
| Component rendering (all variants) | 85%+ | High |
| Service layer (all queries) | 90%+ | High |
| Responsive layouts | 80%+ | Medium |
| Edge cases / error states | 75%+ | Medium |

---

## Database Schema (Supabase)

> Predicted schema — to be confirmed when `BACKEND_API_TESTCASES.md` is available.
>
> **Note on `relationship_badge`**: The badge text ("Lãnh đạo", "Phòng ban",
> "Cùng phòng") indicates the org-chart relationship between sender and receiver
> (e.g., same department, cross-department, manager). This is a **derived field**
> computed from the `department` and `role` fields of both users — NOT a stored
> column. The service layer or a Supabase database function should compute it at
> query time. If performance requires it, a materialized view or stored column on
> the `kudos` table can be added later.

### Tables

```sql
-- kudos table
CREATE TABLE kudos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  receiver_id UUID NOT NULL REFERENCES auth.users(id),
  message TEXT NOT NULL CHECK (char_length(message) <= 2000),
  category TEXT,
  video_url TEXT,
  is_highlighted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- kudos_images table (1:N)
CREATE TABLE kudos_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kudo_id UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0
);

-- kudos_hashtags table (M:N via junction)
CREATE TABLE kudos_hashtags (
  kudo_id UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
  hashtag TEXT NOT NULL,
  PRIMARY KEY (kudo_id, hashtag)
);

-- kudos_likes table
CREATE TABLE kudos_likes (
  kudo_id UUID NOT NULL REFERENCES kudos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (kudo_id, user_id)
);

-- user_profiles table (extends auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  department TEXT,
  role TEXT
);

-- secret_boxes table
CREATE TABLE secret_boxes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  is_opened BOOLEAN DEFAULT FALSE,
  opened_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### RLS Policies

```sql
-- kudos: anyone authenticated can read, only sender can insert
ALTER TABLE kudos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Kudos are viewable by authenticated users" ON kudos FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can create kudos" ON kudos FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- kudos_likes: anyone authenticated can read/insert/delete their own likes
ALTER TABLE kudos_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Likes are viewable" ON kudos_likes FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can like" ON kudos_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON kudos_likes FOR DELETE USING (auth.uid() = user_id);

-- kudos_images: readable by authenticated, insertable by kudo sender (via FK)
ALTER TABLE kudos_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Images are viewable" ON kudos_images FOR SELECT USING (auth.role() = 'authenticated');

-- kudos_hashtags: readable by authenticated
ALTER TABLE kudos_hashtags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Hashtags are viewable" ON kudos_hashtags FOR SELECT USING (auth.role() = 'authenticated');

-- user_profiles: readable by authenticated
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable" ON user_profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- secret_boxes: users can only see their own
ALTER TABLE secret_boxes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own boxes" ON secret_boxes FOR SELECT USING (auth.uid() = user_id);
```

---

## Open Questions

- [ ] **Q1**: "Tổng số nhận được 🔥" — lifetime total or scoped to SAA 2025 period only?
- [ ] **Q2**: "Xem chi tiết" — navigates to a separate kudo detail page, or scrolls within feed?
- [ ] **Q3**: Spotlight Board video — pre-recorded highlight reel or live stream?
- [ ] **Q4**: Are the three relationship badge types (Lãnh đạo / Phòng ban / Cùng phòng) complete?
- [ ] **Q5**: All Kudos feed pagination — cursor-based or offset-based?
- [ ] **Q6**: Database schema confirmation — waiting for `BACKEND_API_TESTCASES.md`
