# Feature Specification: Like / Unlike Kudo

**Feature Type**: Cross-cutting interaction (not a dedicated screen)
**Parent Screen**: Sun* Kudos Live Board (`MaZUn5xHXZ`)
**Visual Reference**: `../MaZUn5xHXZ-SunKudos/design-style.md` (Kudo Card → Footer → Heart icon + Like count)
**Created**: 2026-04-16
**Status**: Draft

---

## Overview

The **Like / Unlike Kudo** feature allows any authenticated Sun* employee to express
appreciation for a kudo by clicking a heart icon on the kudo card. The interaction is
optimistic (immediate UI feedback), reversible (clicking again removes the like), and
persistent (likes survive page reloads and are visible to all users via the like count).

**Target users**: All authenticated Sun* employees viewing the Sun* Kudos Live Board.

**Business context**: Likes are the primary lightweight engagement signal on the
platform. They give recipients a second layer of validation beyond the kudo itself
and provide data for future features (e.g., sorting by popularity, notifications, or
leaderboards). Every like is attributed to a user and counted on the target kudo.
Note: The current `HighlightKudos` carousel uses an editorial `isHighlighted` flag,
not like counts — sorting by likes is out of scope for this feature and may be
added later.

**Where this feature appears**:
- `HighlightKudos` carousel cards on the Live Board
- `AllKudosSection` feed cards on the Live Board
- Any future kudo detail page

**Current implementation status**: Partially implemented. Client-side optimistic toggle
exists in `src/components/kudos/KudoCardInteractions.tsx`. The server-side `toggleLike`
function in `kudos-service.ts` only computes a new state without persisting — no database
table exists for likes yet. This spec defines the full persistence layer.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Like a Kudo (Priority: P1) 🎯 MVP

**As an** authenticated Sun* employee,
**I want to** like a kudo that resonates with me,
**So that** I can express appreciation and help surface meaningful moments for others.

**Why this priority**: Likes are the most frequent interaction on the feed. Without
this feature, users cannot engage with kudos at all. This is the MVP of the
feature set.

**Independent Test**: Open the Live Board → click the heart icon on any kudo card →
verify the heart turns red, the count increments by 1, and the change persists
across page reload.

**Acceptance Scenarios**:

1. **Given** the user is on the Live Board and sees a kudo with 0 likes,
   **When** the user clicks the heart icon,
   **Then** the heart turns red (filled), the count changes to "1", and a
   `PUT /api/kudos/[id]/like` request with body `{ liked: true }` is sent to
   persist the like.

2. **Given** the user has liked a kudo,
   **When** the page is reloaded,
   **Then** the heart still appears red and the count still reflects the user's like.

3. **Given** the user likes a kudo,
   **When** the server request fails,
   **Then** the heart reverts to unfilled, the count decrements back, and a toast
   message "Đã xảy ra lỗi, vui lòng thử lại" is shown.

---

### User Story 2 — Unlike a Kudo (Priority: P1)

**As an** authenticated Sun* employee who previously liked a kudo,
**I want to** remove my like,
**So that** I can correct an accidental tap or change my mind.

**Why this priority**: Reversibility is expected UX for all like-based features.
Without unlike, users feel trapped by a single click.

**Independent Test**: Like a kudo → click the heart again → verify the heart turns
unfilled, count decrements by 1, and the unlike persists across reload.

**Acceptance Scenarios**:

1. **Given** the user has liked a kudo (heart red, count = N),
   **When** the user clicks the heart icon again,
   **Then** the heart turns unfilled, the count changes to N-1, and a
   `PUT /api/kudos/[id]/like` request with body `{ liked: false }` is sent to
   remove the like.

2. **Given** the user unlikes a kudo,
   **When** the page is reloaded,
   **Then** the heart appears unfilled and the count reflects the removed like.

3. **Given** the user unlikes a kudo,
   **When** the server request fails,
   **Then** the heart reverts to red, the count increments back, and an error
   toast is shown.

---

### User Story 3 — View Persistent Like Count (Priority: P1)

**As any** authenticated Sun* employee,
**I want to** see the total like count on each kudo,
**So that** I can tell which kudos resonate most with the community.

**Why this priority**: The count is a core social signal. Without it, likes are
invisible to others.

**Independent Test**: User A likes a kudo. User B (different session) reloads the
feed and sees the count incremented by 1.

**Acceptance Scenarios**:

1. **Given** multiple users have liked a kudo,
   **When** any user loads the feed,
   **Then** the card shows the aggregate like count from all users.

2. **Given** the current user has liked a kudo,
   **When** the feed loads,
   **Then** the heart is shown as filled (red) for the current user but the count
   includes likes from all users.

3. **Given** the current user has NOT liked a kudo,
   **When** the feed loads,
   **Then** the heart is shown as unfilled and the count still reflects all users' likes.

---

### User Story 4 — Idempotent Like (Priority: P2)

**As any** authenticated Sun* employee,
**I want** my repeated likes to count only once per kudo,
**So that** I cannot artificially inflate a kudo's like count by clicking multiple times.

**Why this priority**: Without deduplication, the count becomes meaningless. This is
a data-integrity requirement.

**Independent Test**: Call the like API twice for the same user + kudo without toggling
in between → verify the second call is a no-op and count stays at 1.

**Acceptance Scenarios**:

1. **Given** the user has already liked a kudo,
   **When** a duplicate like request is sent (e.g., from a stale client),
   **Then** the server responds with the current state (liked=true, count unchanged)
   and no duplicate row is inserted.

2. **Given** the user has NOT liked a kudo,
   **When** a duplicate unlike request is sent,
   **Then** the server responds idempotently with (liked=false, count unchanged).

---

### User Story 5 — Prevent Abuse via Rate Limiting (Priority: P3)

**As a** platform operator,
**I want** rate limiting on the like endpoint,
**So that** automated scripts cannot spam-like the database.

**Why this priority**: Nice-to-have defense-in-depth. Cloudflare WAF/Rate Limiting
rules (per constitution) provide baseline protection. Application-level debounce
covers UI spam-click protection.

**Independent Test**: Submit 100 rapid like toggles from a single user → verify
requests beyond a threshold are throttled or rejected.

**Acceptance Scenarios**:

1. **Given** rapid repeated clicks on the same heart button,
   **When** requests are fired faster than the server can process,
   **Then** the client debounces (200ms) and the server handles each final state
   idempotently without error.

2. **Given** the same user sends >60 like/unlike requests per minute,
   **When** the threshold is exceeded,
   **Then** the server responds 429 Too Many Requests and the UI displays a
   throttle message.

---

### Edge Cases

- **User likes their own kudo**: **Allowed** by default (matches platform norm e.g.,
  LinkedIn, Slack). Open Question Q1 below for PM confirmation.
- **Liking an anonymous kudo**: Allowed. The kudo's `sender` is hidden but the
  kudo itself still exists and can be liked.
- **Liking a kudo the user didn't author or receive**: Allowed — any Sun* employee
  can like any kudo.
- **Session expires mid-like**: Server returns 401 → client rolls back optimistic
  update, shows toast "Phiên đã hết hạn, đang chuyển hướng...", then redirects
  to `/login` after a 1s delay (see Error Responses table).
- **Kudo deleted while liked**: On DELETE of a kudo, likes cascade via `ON DELETE
  CASCADE`. The UI handles the missing kudo naturally (no longer displayed).
- **Network offline**: Optimistic update shows locally but server request fails →
  UI rolls back and shows offline toast.
- **Slow connection / in-flight request**: Subsequent clicks are debounced (200ms)
  and only the final state is sent to the server.

---

## UI/UX Requirements

### Component Location

The like button is the leftmost element in the **Kudo Card Footer**, documented in
`../MaZUn5xHXZ-SunKudos/design-style.md` under "Kudo Card — Footer (Like & Copy Link)".

### Visual Specs (inherited from parent design-style)

| Property | Value | Token |
|----------|-------|-------|
| Heart icon color (liked) | `#FF4D4D` | `--color-heart` |
| Heart icon color (unliked) | `rgba(255,255,255,0.6)` | `--color-heart-unfilled` |
| Heart icon size | 14px × 14px (carousel) / 16px × 16px (feed) | — |
| Like count font | Montserrat, 14px, 700, white | `--text-like-count` |
| Like count color | `#FFFFFF` | `--color-white` |
| Touch target | Minimum 44×44px (constitution VI) | — |
| Focus outline | 2px solid `#FFEA9E` offset 2px | — |

### Component States

| State | Heart Color | Scale | Cursor |
|-------|-------------|-------|--------|
| Default (not liked) | `--color-heart-unfilled` | 1.0 | pointer |
| Hover (not liked) | `--color-heart-unfilled` at 100% opacity | 1.05 | pointer |
| Liked | `--color-heart` | 1.0 | pointer |
| Clicking (transient) | current color | scale animation 1.0 → 1.2 → 1.0 | pointer |
| Pending (in-flight) | current color | 1.0 | pointer (button remains clickable for rapid toggles) |
| Disabled (no auth) | `--color-heart-unfilled` at 40% opacity | 1.0 | not-allowed |

### Animation

| Trigger | Property | Duration | Easing |
|---------|----------|----------|--------|
| Click (like or unlike) | `transform: scale` | 200ms | ease-out |
| Color change | `color` | 150ms | ease-in-out |

### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Keyboard activation | `Enter` / `Space` triggers toggle; button is focusable |
| ARIA label (dynamic) | `aria-label` = "Thích kudos" (unliked) or "Bỏ thích kudos" (liked) |
| ARIA pressed state | `aria-pressed={likedByMe}` on the button |
| Count announcement | Count is inside the button — screen reader reads label + count together |
| Focus visible | 2px yellow outline on `:focus-visible` |
| Touch target | ≥44×44px (padding around the 14–16px icon) |

### Responsive Behavior

The like button is part of the kudo card footer. It follows the card's responsive
rules (inherited from the Live Board spec):

- **Mobile (<768px)**: Footer elements may wrap if tight; heart + count stay on the left
- **Tablet (768–1279px)**: Standard layout
- **Desktop (≥1280px)**: Standard layout

---

## Data Requirements

### Display Fields per Kudo

| Field | Type | Source | Purpose |
|-------|------|--------|---------|
| `likeCount` | `number` | Server aggregate | Displayed next to heart icon |
| `likedByMe` | `boolean` | Server, computed per request | Controls filled vs. unfilled heart |

### Input

| Action | Input | Validation |
|--------|-------|------------|
| Like | `kudoId` (from card) + authenticated user | kudoId must be a valid UUID; user must be authenticated |
| Unlike | `kudoId` + authenticated user | Same as Like |

### Data Relationships

- A **User** can like many **Kudos** (1:N)
- A **Kudo** can be liked by many **Users** (1:N)
- A **User + Kudo** pair has at most **one Like** (unique constraint)

### TypeScript Types

```typescript
// Added to src/types/kudos.ts

/** Request body for PUT /api/kudos/[id]/like */
export interface LikeKudoPayload {
  liked: boolean;
}

/** Response from PUT /api/kudos/[id]/like */
export interface LikeKudoResult {
  kudoId: string;
  likedByMe: boolean;
  likeCount: number;
}
```

The existing `KudoItem` already has `likeCount: number` and `likedByMe: boolean`
fields — no schema change needed on the type. The service `toggleLike()` signature
is rewritten from the current mock computation to:

```typescript
// src/services/kudos-service.ts — updated signature
export async function toggleLike(params: {
  kudoId: string;
  liked: boolean;
}): Promise<LikeKudoResult>;
```

### Mock Data Integration

The existing `KUDOS_MOCKS` array already includes `likeCount` and `likedByMe` fields
with hard-coded values (e.g., `likeCount: 1000, likedByMe: false`). The feature
integrates as follows:

- **Mock mode** (no Supabase connection): `toggleLike()` falls back to the current
  in-memory toggle logic. Persistence is limited to the current dev session.
- **Supabase mode**: `toggleLike()` calls `PUT /api/kudos/[id]/like` → server
  inserts/deletes a row in `kudo_likes` → returns updated `{ likedByMe, likeCount }`.
- **Feed reads** in `getKudosPageData()`: When connected to Supabase, the query
  joins `kudos` + `kudo_likes` to compute `likedByMe` per request. When in mock
  mode, existing mock values are returned as-is.
- **New kudos created via Write Kudo**: Default to `likeCount: 0, likedByMe: false`
  (already the case in the runtime mock store).

---

## API Requirements (Predicted)

### Endpoint (single, idempotent)

| Endpoint | Method | Auth | Purpose | Request Body | Response |
|----------|--------|------|---------|--------------|----------|
| `/api/kudos/[id]/like` | PUT | ✅ | Set like state for current user | `{ liked: boolean }` | `{ kudoId: string, likedByMe: boolean, likeCount: number }` |

**Why PUT**: Idempotent — sending `{ liked: true }` twice is a no-op. This lets the
client recover gracefully from network retries or stale state without duplicate
inserts or 409 conflicts. POST/DELETE alternatives were rejected for this reason.

**No GET endpoint**: Like state and count are returned as part of the feed read
(`getKudosPageData()`). There is no standalone `GET /api/kudos/[id]/like` endpoint
— the client always has fresh data via feed hydration.

### Error Responses

| Code | Meaning | UI Action |
|------|---------|-----------|
| 401 | Session expired / unauthenticated | Roll back; show toast "Phiên đã hết hạn, đang chuyển hướng..."; then `router.push('/login')` after 1s delay |
| 404 | Kudo not found (deleted concurrently) | Roll back; show toast "Kudo không tồn tại"; trigger feed refresh |
| 429 | Rate limited | Roll back; show toast "Thao tác quá nhanh, vui lòng thử lại" |
| 500 | Server error | Roll back; show toast "Đã xảy ra lỗi, vui lòng thử lại" |

### Contract Example

```http
PUT /api/kudos/0a1b2c3d-.../like
Authorization: (session cookie)
Content-Type: application/json

{ "liked": true }
```

Response:

```json
{
  "kudoId": "0a1b2c3d-...",
  "likedByMe": true,
  "likeCount": 42
}
```

---

## Database Schema

### New Table: `kudo_likes`

```sql
create table if not exists public.kudo_likes (
  user_id    uuid not null references auth.users(id) on delete cascade,
  kudo_id    uuid not null references public.kudos(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, kudo_id)
);

create index kudo_likes_kudo_id_idx on public.kudo_likes(kudo_id);
create index kudo_likes_user_id_idx on public.kudo_likes(user_id);

alter table public.kudo_likes enable row level security;

-- Anyone authenticated can see which kudos are liked (needed for likeCount aggregation)
create policy "kudo_likes_select_authenticated"
  on public.kudo_likes for select to authenticated
  using (true);

-- Users can insert likes only for themselves
create policy "kudo_likes_insert_own"
  on public.kudo_likes for insert to authenticated
  with check (auth.uid() = user_id);

-- Users can delete likes only for themselves
create policy "kudo_likes_delete_own"
  on public.kudo_likes for delete to authenticated
  using (auth.uid() = user_id);
```

### Feed Read Strategy — Denormalized `like_count` Column (adopted)

Rationale: Feed reads with `count(*)` subqueries per row are O(N × likes). A
denormalized `kudos.like_count` column keeps feed reads O(N) and adds O(1) cost
per like/unlike write.

```sql
-- Add denormalized like_count column to kudos (new migration)
alter table public.kudos
  add column if not exists like_count integer not null default 0;

-- Trigger function: maintain kudos.like_count on insert/delete of kudo_likes
create or replace function public.sync_kudos_like_count()
returns trigger
language plpgsql
security definer
as $$
begin
  if tg_op = 'INSERT' then
    update public.kudos
      set like_count = like_count + 1
      where id = new.kudo_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.kudos
      set like_count = greatest(like_count - 1, 0)
      where id = old.kudo_id;
    return old;
  end if;
  return null;
end;
$$;

create trigger kudo_likes_sync_count
  after insert or delete on public.kudo_likes
  for each row execute function public.sync_kudos_like_count();
```

With this trigger in place, the feed read query simplifies to:

```sql
select
  k.*,  -- includes k.like_count
  exists (
    select 1 from kudo_likes where kudo_id = k.id and user_id = auth.uid()
  ) as liked_by_me
from kudos k
order by k.created_at desc;
```

The `exists` subquery remains per-row but is indexed by the composite PK on
`kudo_likes(user_id, kudo_id)` — effectively O(1) per kudo.

---

## State Management

### Client State (per `KudoCardInteractions` instance)

| State | Type | Initial Value | Purpose |
|-------|------|--------------|---------|
| `likedByMe` | `boolean` | From `initialLikedByMe` prop | Controls heart visual state |
| `likeCount` | `number` | From `initialLikeCount` prop | Displayed count |
| `isPending` | `boolean` | `false` (via `useTransition`) | Guards against concurrent submissions |

### Global State & Error Surface

- **No global store needed** — like state is isolated per kudo card and does not
  need to propagate across the app. Other cards showing the same kudo (if any)
  are re-hydrated on the next navigation via server render.
- **Error surface**: Errors are surfaced via the existing `onToast(message: string)`
  callback prop on `KudoCardInteractions`. The parent (`AllKudosSection` /
  `HighlightKudos`) already renders a `<Toast>` component that consumes these
  messages. No new error UI is needed.

### Loading State

- **Initial feed load**: Like count and state come server-rendered from
  `getKudosPageData()` — no loading spinner is needed on the heart button.
- **In-flight toggle**: The heart remains visible with no spinner. Optimistic
  update makes the toggle feel instant. If the user clicks again while
  `isPending` is true, the new click is debounced (200ms window) and only the
  final state is sent.

### Optimistic Update Pattern

The current implementation in `KudoCardInteractions.tsx` already follows the
optimistic pattern:

1. User clicks → local state updates immediately (heart + count)
2. Server request is fired in a `useTransition`
3. On success: reconcile local state with server response
4. On failure: roll back to the previous state and show error toast

This pattern is correct and should be preserved when wiring up the new API.

### Debouncing

To prevent rapid-fire clicks from flooding the server:

- Client: Debounce toggle with **200ms** window. The final state is sent.
- Server: Idempotent design (PUT with `{ liked }`) handles any stale requests safely.

### Cache Invalidation

- After like/unlike success, **do not** call `revalidatePath('/kudos')` — that would
  re-fetch the entire feed and lose scroll position. The optimistic local update
  is sufficient.
- Server-rendered `likeCount` on the next navigation will be fresh.

---

## Requirements

### Functional Requirements

- **FR-LIKE-001**: System MUST allow authenticated users to like and unlike any kudo.
- **FR-LIKE-002**: System MUST enforce **one like per user per kudo** (unique constraint).
- **FR-LIKE-003**: System MUST display the aggregate like count on every kudo card.
- **FR-LIKE-004**: System MUST display a visual distinction between liked and unliked
  state for the current user (red filled vs. unfilled heart).
- **FR-LIKE-005**: System MUST update the UI optimistically before the server confirms
  the change.
- **FR-LIKE-006**: System MUST roll back the optimistic update and show an error
  toast if the server request fails.
- **FR-LIKE-007**: System MUST persist likes across page reloads and browser sessions.

### Technical Requirements

- **TR-LIKE-001**: Like persistence MUST use Supabase with RLS policies preventing
  users from liking on behalf of others (constitution III, VII).
- **TR-LIKE-002**: The like API endpoint MUST validate auth via `getUser()`
  (constitution VII A01).
- **TR-LIKE-003**: The like API endpoint MUST be idempotent — sending the same
  state twice is a no-op.
- **TR-LIKE-004**: Client MUST debounce rapid toggles with a 200ms window.
- **TR-LIKE-005**: Visual states MUST use CSS tokens from `globals.css`, no
  hard-coded colors (constitution V).
- **TR-LIKE-006**: The like button MUST have touch targets ≥44×44px (constitution VI).
- **TR-LIKE-007**: Implementation MUST follow TDD (Red → Green → Refactor) per
  constitution. Tests MUST be written BEFORE implementation code.
- **TR-LIKE-008**: API route handler and DB trigger MUST have integration tests
  against a local Supabase instance. Unit tests alone are insufficient for the
  trigger behavior.
- **TR-LIKE-009**: Rate limiting MUST be enforced at the edge via Cloudflare
  WAF/Rate Limiting rules (60 requests / minute / user IP + session). Application
  code MUST return 429 if the edge layer hasn't already done so.
- **TR-LIKE-010**: The current `KudoCardInteractions.tsx` has a known wiring bug:
  on like failure, it calls `onToast(copyFailedLabel)` — which is the COPY-LINK
  error message, not a like error. Implementation MUST add a new prop
  `likeFailedLabel` and use it in the catch block.

### Non-Functional Requirements

- **NFR-LIKE-001**: Like toggle latency on the client should be perceived as
  instant (<100ms). Achieved via optimistic update.
- **NFR-LIKE-002**: Server round-trip should complete within 300ms p95.
- **NFR-LIKE-003**: Feed read with like counts should not exceed 500ms p95 even
  for pages with 20 kudos (depends on aggregation strategy — see DB optimization).

---

## Dependencies

### Frontend
- Existing component: `src/components/kudos/KudoCardInteractions.tsx` (already implements optimistic pattern)
- Existing hook: `useTransition` (React 19)
- Existing service: `src/services/kudos-service.ts` (`toggleLike` — needs rewrite to call real API)

### Backend
- **New**: Route handler `src/app/api/kudos/[id]/like/route.ts` (PUT method, decided)
- **New**: Supabase migration for `kudo_likes` table with RLS policies
- **New**: Supabase migration for `kudos.like_count` column + `sync_kudos_like_count` trigger (decided — not optional)

### Data
- `auth.users` table (Supabase Auth) — already exists
- `kudos` table — created in the Write Kudo feature

### Migration Order

The migrations MUST run in this order:

1. `kudos` table migration (exists from Write Kudo feature — `20260416_create_kudos_table.sql`)
2. **New**: `kudo_likes` table migration (references `kudos.id` via FK)
3. **New**: `kudos.like_count` column + `sync_kudos_like_count` trigger (references both `kudos` and `kudo_likes`)

---

## Open Questions

### Business Logic

- **Q1**: Can a user like their **own** kudo? Default assumption: **yes** (matches
  platform norms). PM to confirm.
- **Q2**: Should a user be notified when their kudo receives a like? (Out of scope
  for MVP — tracked as a future notifications feature.)
- **Q3**: Is there a leaderboard/metric tied to likes (e.g., "most-liked kudos")?
  If yes, the aggregation approach in DB may need indexing adjustments.
- **Q4**: Should anonymous kudos display a "liked by N" list? Likely no for MVP.

### Technical

- **Q5** ✅ RESOLVED: Use **PUT `/api/kudos/[id]/like`** with body `{ liked }`.
  Idempotent by design. Rejected alternatives: POST/DELETE (non-idempotent), Server
  Actions (valid but Route Handler is easier to test and has clear HTTP semantics).
- **Q6** ✅ RESOLVED: **Denormalize** `kudos.like_count` via trigger. SQL provided
  in "Database Schema" section.

---

## Success Criteria

Measurable outcomes:

- **SC-LIKE-001**: Users can like/unlike any kudo and see the change within 100ms on
  the client.
- **SC-LIKE-002**: Likes persist across page reloads (verified by E2E test).
- **SC-LIKE-003**: Like counts on the feed match the actual row count in `kudo_likes`
  (verified by integration test).
- **SC-LIKE-004**: No user can like a kudo more than once (enforced by unique PK).
- **SC-LIKE-005**: No user can like on behalf of another user (enforced by RLS).
- **SC-LIKE-006**: All Like-related visual states documented in `./design-style.md`
  are implementable with only the CSS tokens listed there (and in the parent
  `../MaZUn5xHXZ-SunKudos/design-style.md`). No new tokens required.

---

## Analysis Metadata

| Property | Value |
|----------|-------|
| Feature Name | Like / Unlike Kudo |
| Parent Screen | Sun* Kudos Live Board (`MaZUn5xHXZ`) |
| File Key | `9ypp4enmFmdK3YAFJLIu6C` |
| Created | 2026-04-16 |
| Status | Draft — pending Open Questions Q1–Q4 (Q5, Q6 resolved) |
| Current Implementation | Partial (client-side optimistic UI exists; no persistence) |
| Referenced in Parent Spec | Yes — US7 in `../MaZUn5xHXZ-SunKudos/spec.md` |
