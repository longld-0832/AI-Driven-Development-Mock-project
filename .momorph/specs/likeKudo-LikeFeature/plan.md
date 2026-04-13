# Implementation Plan: Like / Unlike Kudo

**Frame**: `likeKudo-LikeFeature`
**Date**: 2026-04-16
**Spec**: `specs/likeKudo-LikeFeature/spec.md`
**Design**: `specs/likeKudo-LikeFeature/design-style.md`

---

## Summary

Implement persistent, idempotent like/unlike interactions on kudo cards via a new
Supabase `kudo_likes` table with a denormalized `kudos.like_count` column
maintained by a DB trigger. Client keeps its current optimistic-update pattern;
service layer and API route handler are rewritten to hit real Supabase. Feed
reads are updated to return fresh `like_count` and `liked_by_me` per session.

**Technical approach**: Single idempotent **PUT** `/api/kudos/[id]/like` endpoint
validated by Zod + `getUser()`. Server inserts or deletes a row in `kudo_likes`;
a trigger keeps `kudos.like_count` in sync. Client `toggleLike()` is rewritten
from mock computation to a `fetch` to the route handler. `KudoCardInteractions.tsx`
gets a new `likeFailedLabel` prop (bug fix). Feed reads join `kudos` with
`kudo_likes` to compute `liked_by_me` per request.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 15 App Router
**Primary Dependencies**: React 19, Supabase SSR, Zod (already installed)
**Database**: Supabase PostgreSQL with RLS
**Testing**: Vitest (unit) + Playwright (E2E) — TDD per constitution
**State Management**: Local React state + `useTransition` (already implemented)
**API Style**: Next.js Route Handler (PUT, idempotent)
**Deployment**: Cloudflare Workers via `@opennextjs/cloudflare`

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **I. TypeScript-First** — All code strict TS; `LikeKudoPayload` / `LikeKudoResult` types added to `src/types/kudos.ts` with Zod schema
- [x] **II. RSC by Default** — `KudoCardInteractions` is already `"use client"` (interactive); no new client components required
- [x] **III. Supabase as Single Backend** — All persistence through Supabase; RLS policies enforce per-user insert/delete; `getUser()` validates session in route handler
- [x] **IV. Edge-Compatible** — Route handler uses only Web Platform APIs + Supabase SDK; no Node.js-only dependencies
- [x] **V. Design-Token Driven UI** — No new tokens needed; reuses `--color-heart`, `--color-heart-unfilled`, `--color-white`, `--color-accent-yellow` from `globals.css`
- [x] **VI. Responsive Design** — Touch target ≥44×44px already enforced via `min-h-11 px-3 py-2` in existing component
- [x] **VII. Secure by Default** — A01 (auth via `getUser()`), A03 (parameterized Supabase queries), A07 (HTTP-only cookies via `@supabase/ssr`). Rate limiting at Cloudflare WAF (TR-LIKE-009)

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: No new components. Reuse existing
  [`KudoCardInteractions.tsx`](../../../src/components/kudos/KudoCardInteractions.tsx).
  Add one new prop (`likeFailedLabel`) and rewire the error toast call in the
  catch block (TR-LIKE-010).
- **Styling Strategy**: Inherited from parent kudo card. No new CSS tokens.
- **Data Fetching**:
  - Like toggle: client `fetch('/api/kudos/[id]/like', { method: 'PUT', ... })` via
    the rewritten `toggleLike()` service function
  - Feed reads with `likedByMe`: server-side via updated `getKudosPageData()`
    which joins `kudos` with `kudo_likes`
- **State Management**: Keep existing `useState` + `useTransition` pattern in
  `KudoCardInteractions`. No global store needed (per spec decision).
- **Debouncing**: Client-side debounce with 200ms window before `fetch` (TR-LIKE-004).
  Reuse the existing `src/hooks/useDebounce.ts` hook by debouncing the desired
  `liked` state rather than the callback. Pattern: maintain `pendingLiked` state,
  debounce it with `useDebounce(pendingLiked, 200)`, and fire the `fetch` in a
  `useEffect` when the debounced value differs from the last-persisted value. This
  keeps the pattern consistent with existing code (SearchInput debounces query,
  AllKudosSection debounces search) and avoids introducing a manual `useRef` timer.

### Backend Approach

- **API Design**: Single idempotent PUT endpoint (decided in spec Q5).
  | Endpoint | Type | Purpose |
  |----------|------|---------|
  | `PUT /api/kudos/[id]/like` | Route Handler | Set like state for current user; returns `{ kudoId, likedByMe, likeCount }` |

- **Database Schema**:
  - New table `public.kudo_likes(user_id, kudo_id, created_at)` with composite PK
  - New column `public.kudos.like_count integer not null default 0`
  - New trigger `sync_kudos_like_count` on INSERT/DELETE of `kudo_likes`
  - RLS policies: public SELECT, authenticated INSERT/DELETE (self only)

- **Validation**: Zod schema for request body `{ liked: boolean }` — rejected
  requests return 400 with message.

- **Idempotency**: The route handler reads current state, compares to desired
  state, and short-circuits if already matching. On transitioning false→true,
  performs INSERT with `ON CONFLICT DO NOTHING`. On true→false, performs
  DELETE. Both are naturally idempotent.

- **Rate Limiting**: Configured at Cloudflare WAF (60 req/min/user — TR-LIKE-009).
  Application does not implement its own limiter.

### Feed Read Changes

**Important context**: The existing `getKudosPageData()` currently returns **only
mock data** — there is no Supabase read branch yet. This feature introduces the
first Supabase read path for kudos (alongside the existing mock fallback,
matching the pattern established by the Write Kudo feature).

When Supabase is connected, the feed query becomes:

```sql
select
  k.*,  -- includes k.like_count (denormalized)
  exists (
    select 1 from kudo_likes where kudo_id = k.id and user_id = auth.uid()
  ) as liked_by_me
from kudos k
order by k.created_at desc;
```

### Mode Detection (Mock vs Supabase)

To cleanly separate mock mode from genuine error handling, mode is detected
once per request based on **data availability**, not on error status:

```typescript
// In kudos-service.ts — deterministic mode detection
async function isSupabaseKudosAvailable(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('kudos').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
}
```

- **Mock mode** (no `kudos` table or Supabase not configured): All reads and writes
  operate on `KUDOS_MOCKS` / `runtimeKudos`. The `toggleLike()` mock path updates
  the runtime kudo's `likeCount` and `likedByMe` fields in-place.
- **Supabase mode**: All reads and writes go through Supabase. A fetch failure
  (e.g., 500) propagates as an error — **no silent fallback to mock**. The client
  sees the rollback + error toast per spec.

### Integration Points

- **Existing `KudoCardInteractions.tsx`**: Add `likeFailedLabel` prop; fix
  `onToast(copyFailedLabel)` → `onToast(likeFailedLabel)` in the catch block.
  Wire debounce via the existing `useDebounce` hook (see Debouncing above).
- **Existing `toggleLike()` in `kudos-service.ts`**: Rewrite signature from
  `{ likedByMe, likeCount }` → `{ kudoId, liked }`. Change return to `LikeKudoResult`.
  Call the new PUT endpoint via `fetch`.
- **Existing `getKudosPageData()` in `kudos-service.ts`**: When in Supabase mode,
  update the kudo query to join with `kudo_likes` for `liked_by_me`. Mock mode
  unchanged.
- **Existing i18n (`sun-kudos.ts`)**: Add `likeFailed` key for the new toast label.
- **Callers** (`AllKudosSection`, `HighlightKudos`): Pass the new `likeFailedLabel`
  prop to `<KudoCardInteractions>`. No other changes.

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/likeKudo-LikeFeature/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design specifications ✅
├── plan.md              # This file ✅
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

```text
# New Files
src/
├── app/api/kudos/[id]/like/
│   └── route.ts                         # PUT handler: validate auth, insert/delete kudo_likes, return LikeKudoResult

# Modified Files
src/
├── types/kudos.ts                       # Add LikeKudoPayload, LikeKudoResult, likeKudoSchema
├── services/kudos-service.ts            # Rewrite toggleLike() to call PUT endpoint; update getKudosPageData() Supabase branch
├── libs/i18n/sun-kudos.ts               # Add writeKudo.likeFailed (and en equivalent)
├── components/kudos/KudoCardInteractions.tsx  # Add likeFailedLabel prop, fix toast wiring bug, add 200ms debounce
├── components/kudos/AllKudosSection.tsx # Pass likeFailedLabel through to KudoCardInteractions
├── components/kudos/HighlightKudos.tsx  # Pass likeFailedLabel through to KudoCardInteractions
└── components/kudos/KudoCard.tsx        # (if the prop is threaded via KudoCard) Pass likeFailedLabel through

# Database (use later date prefix to ensure they run AFTER Write Kudo migrations)
supabase/migrations/
├── 20260417_create_kudo_likes_table.sql           # Table + RLS policies
└── 20260418_add_kudos_like_count_and_trigger.sql  # Column + trigger function + trigger
```

### Modified Files — Detailed Changes

| File | Specific Changes |
|------|------------------|
| [types/kudos.ts](../../../src/types/kudos.ts) | Add `LikeKudoPayload`, `LikeKudoResult` interfaces; add `likeKudoSchema = z.object({ liked: z.boolean() })` |
| [services/kudos-service.ts](../../../src/services/kudos-service.ts) | Rewrite `toggleLike()` signature to `(params: { kudoId, liked }) => Promise<LikeKudoResult>`; call `fetch('/api/kudos/{id}/like', PUT)` with mock fallback for dev |
| [libs/i18n/sun-kudos.ts](../../../src/libs/i18n/sun-kudos.ts) | Add `actions.likeFailed: "Không thể cập nhật trạng thái thích, vui lòng thử lại"` (vi) + English equivalent |
| [components/kudos/KudoCardInteractions.tsx](../../../src/components/kudos/KudoCardInteractions.tsx) | Add `likeFailedLabel` + `likeErrorLabels` props; replace `onToast(copyFailedLabel)` with status-code-specific messages in like-failure catch; add 200ms debounce via `useDebounce(pendingLiked, 200)` |
| [components/kudos/KudoCard.tsx](../../../src/components/kudos/KudoCard.tsx) | Thread `likeFailedLabel` from `actions` prop to `<KudoCardInteractions>` |
| [components/kudos/AllKudosSection.tsx](../../../src/components/kudos/AllKudosSection.tsx) | Add `likeFailed` key to the i18n actions object passed into KudoCard |
| [components/kudos/HighlightKudos.tsx](../../../src/components/kudos/HighlightKudos.tsx) | Same as AllKudosSection |

### Dependencies

**Runtime**: No new npm packages required. All libraries (`zod`, `@supabase/ssr`,
React 19) are already installed.

**Dev (testing infrastructure — needed for TR-LIKE-007/008 TDD compliance)**:

| Package | Version | Purpose |
|---------|---------|---------|
| `@testing-library/react` | ^16 | Component rendering in unit tests |
| `@testing-library/jest-dom` | ^6 | DOM matchers for Vitest |
| `@playwright/test` | ^1.50 | E2E test runner |
| `vitest` | (already installed? verify) | Unit + integration test runner |

> **Action**: Confirm whether `vitest` is already in `devDependencies`. If not,
> add it alongside the above. The project config currently doesn't show a test
> command in `package.json` scripts — that also needs to be added.

---

## Implementation Strategy

> **TDD Mandate** (Constitution + TR-LIKE-007): Every phase follows Red → Green →
> Refactor. Tests are written BEFORE implementation code. Integration tests against
> a local Supabase instance are required for the DB trigger behavior (TR-LIKE-008).

### Phase 0: Preparation

**Goal**: Types, i18n, and schema ready before any component or API work.

1. Add TypeScript types and Zod schema to `src/types/kudos.ts`:
   - `LikeKudoPayload`, `LikeKudoResult`, `likeKudoSchema`
2. Add i18n key `actions.likeFailed` to `src/libs/i18n/sun-kudos.ts` (vi + en)

### Phase 1: Database Foundation (Backend)

**Goal**: DB schema live and tested, ready for API to consume.

1. **Migration 1 — `kudo_likes` table**:
   - Columns: `user_id uuid FK → auth.users`, `kudo_id uuid FK → kudos`,
     `created_at timestamptz default now()`
   - Composite PK `(user_id, kudo_id)` — enforces idempotency
   - Indexes on `kudo_id` and `user_id` for feed joins
   - RLS enabled; policies: SELECT (any authenticated), INSERT (self only),
     DELETE (self only)

2. **Migration 2 — `kudos.like_count` column + trigger**:
   - Add `like_count integer not null default 0` to `kudos`
   - Create `sync_kudos_like_count()` function (security definer) that
     increments/decrements `like_count` on INSERT/DELETE of `kudo_likes`
   - Create `after insert or delete on kudo_likes for each row` trigger

3. **Run migrations**: `supabase db push` (local dev) — verify schema via
   Supabase Studio or SQL introspection.

4. **Integration test for trigger** (Red first, per TDD):
   - Insert a kudo
   - Insert a like into `kudo_likes`
   - Assert `kudos.like_count` == 1
   - Delete the like
   - Assert `kudos.like_count` == 0
   - Insert duplicate like (same user + kudo) — assert error or no-op via PK

### Phase 2: API Route Handler (Backend)

**Goal**: PUT endpoint validates auth, toggles like state idempotently, returns
the new state.

1. Create `src/app/api/kudos/[id]/like/route.ts` with the `PUT` export:
   - Parse `id` from route params (validate UUID format)
   - Parse body with `likeKudoSchema.safeParse()` — return 400 on invalid
   - Call `supabase.auth.getUser()` — return 401 if no user
   - If `liked === true`: `supabase.from('kudo_likes').upsert({ user_id, kudo_id }, { onConflict: 'user_id,kudo_id' })`
   - If `liked === false`: `supabase.from('kudo_likes').delete().eq('user_id', user.id).eq('kudo_id', id)`
   - Re-read `kudos.like_count` for the given id (now updated by trigger)
   - Re-check `liked_by_me = exists (...)` for the response
   - Return `{ kudoId, likedByMe, likeCount }`
   - Error codes: 400 (validation), 401 (auth), 404 (kudo not found), 429
     (forwarded from Cloudflare WAF or manually if detected), 500 (any DB error)

2. **Integration test** (Red first):
   - Test happy path: auth user + valid kudo id + `liked:true` → 200 + `{ likedByMe:true, likeCount:1 }`
   - Test idempotency: repeat the same request → same response, no duplicate row
   - Test unlike: `liked:false` → 200 + `{ likedByMe:false, likeCount:0 }`
   - Test unauth: no session → 401
   - Test bad kudo id: non-existent → 404
   - Test validation: `{ liked: "yes" }` → 400

### Phase 3: Service Layer Rewrite (Frontend-adjacent)

**Goal**: Client-side `toggleLike()` calls the new PUT endpoint with mock fallback.

1. Rewrite `toggleLike()` signature in `src/services/kudos-service.ts`:
   ```typescript
   export async function toggleLike(params: {
     kudoId: string;
     liked: boolean;
   }): Promise<LikeKudoResult>;
   ```

2. Implementation branches on detected mode (`isSupabaseKudosAvailable()`):
   - **Supabase mode**: `fetch('/api/kudos/${kudoId}/like', { method: 'PUT', body: JSON.stringify({ liked }) })`
     - On non-OK response (401/404/429/500): throw an error (caller handles via try/catch)
     - No fallback to mock — errors propagate so the client can roll back the optimistic update
   - **Mock mode**: Find the kudo in `KUDOS_MOCKS` or `runtimeKudos`; update its
     `likedByMe` to `liked` and adjust `likeCount` by ±1 (clamped ≥ 0); return
     `{ kudoId, likedByMe, likeCount }` with the updated values. Persist in-place
     so subsequent reads reflect the change (same pattern as Write Kudo runtime store).

3. **Unit test** (Red first):
   - Mode: Supabase → Mock `fetch` returning 200 + JSON → service returns parsed `LikeKudoResult`
   - Mode: Supabase → Mock `fetch` returning 401 → service throws
   - Mode: Supabase → Mock `fetch` throwing network error → service throws (no silent fallback)
   - Mode: Mock → toggles `likedByMe` and adjusts `likeCount` on the runtime kudo
   - Mode: Mock → unlike already-unliked kudo → `likeCount` stays at 0 (clamp)

### Phase 4: Feed Read Updates

**Goal**: Feed reads return fresh `likeCount` and `likedByMe` per session.

1. Update `getKudosPageData()` in `src/services/kudos-service.ts` — Supabase branch:
   - Select kudos joined with `exists (...) as liked_by_me` subquery on
     `kudo_likes`
   - Map snake_case → camelCase (`like_count` → `likeCount`, `liked_by_me` → `likedByMe`)

2. Mock mode unchanged — existing `KUDOS_MOCKS` already has the fields.

3. **Integration test** (Red first):
   - Insert a kudo
   - User A likes it
   - Query feed as User A → `likedByMe:true, likeCount:1`
   - Query feed as User B → `likedByMe:false, likeCount:1`

### Phase 5: Client Component Wiring (US1, US2, US3)

**Goal**: User can like/unlike with optimistic UI, error toast shows correct message.

1. Update `KudoCardInteractions.tsx`:
   - Add prop `likeFailedLabel: string` (used as the generic fallback toast)
   - In the `catch` block of `handleLikeToggle`, call `onToast(likeFailedLabel)`
     instead of `onToast(copyFailedLabel)` (TR-LIKE-010 fix). Status-code-specific
     mapping is added in Phase 6; Phase 5 uses the generic message only.
   - Update the call to `toggleLike()` to pass `{ kudoId, liked: optimisticLiked }`
   - Reconcile local state from the `LikeKudoResult` response
   - Add 200ms debounce via existing `useDebounce` hook: keep `pendingLiked`
     state alongside the optimistic display state; use
     `const debouncedLiked = useDebounce(pendingLiked, 200)`; in a `useEffect`,
     when `debouncedLiked !== lastPersistedLiked`, call `toggleLike()` and
     update `lastPersistedLiked` (TR-LIKE-004). Matches the debounce pattern
     already used in `SearchInput` and `AllKudosSection`.

2. Update `KudoCard.tsx` to thread `likeFailedLabel` from its `actions` prop.

3. Update `AllKudosSection.tsx` and `HighlightKudos.tsx`:
   - Add `likeFailed: t.actions.likeFailed` to the `actions` object passed
     to each KudoCard

4. **Component test** (Red first):
   - Render a liked kudo → heart is red, count shown
   - Click heart → optimistic unfilled + count - 1
   - Mock `toggleLike` to reject → heart reverts, toast shows `likeFailedLabel`

### Phase 6: Error Handling Polish (US6-equivalent scenarios)

**Goal**: All error codes from the spec map to correct UI feedback.

**Division of responsibility**:
- `toggleLike()` **service** throws a typed error `LikeApiError` with
  `{ status: number, message: string }`. It does NOT access i18n or navigation.
- `KudoCardInteractions` **component** catches the error, reads the status code,
  looks up the correct i18n message, and calls `onToast(...)` + triggers any
  side effects (router push, feed refresh). This keeps the service layer pure
  and i18n-free.

1. Add a `LikeApiError` class to `src/services/kudos-service.ts`:
   ```typescript
   export class LikeApiError extends Error {
     constructor(public status: number, message: string) { super(message); }
   }
   ```
   `toggleLike()` throws this on non-OK responses with the HTTP status attached.

2. Update `KudoCardInteractions` catch block to map status → action via props:
   - Accept a new prop `likeErrorLabels: { sessionExpired, notFound, rateLimited, generic }`
   - On `status === 401`: `onToast(labels.sessionExpired)` + `router.push('/login')`
     (wrapped in `setTimeout(_, 1000)` per spec)
   - On `status === 404`: `onToast(labels.notFound)` + `router.refresh()` to trigger
     Next.js App Router re-fetch of the current page (removes the stale kudo from the feed)
   - On `status === 429`: `onToast(labels.rateLimited)`
   - On `status === 500` or any other: `onToast(labels.generic)` (same as
     existing `likeFailedLabel`)
   - Caller (`AllKudosSection` / `HighlightKudos`) must pass all 4 labels from
     i18n: `actions.likeErrorSessionExpired`, `.likeErrorNotFound`, `.likeErrorRateLimited`,
     `.likeFailed` (generic, reused as the `generic` key).

3. Add the new i18n keys to `src/libs/i18n/sun-kudos.ts` (vi + en):
   - `actions.likeErrorSessionExpired`
   - `actions.likeErrorNotFound`
   - `actions.likeErrorRateLimited`
   - `actions.likeFailed` (already added in Phase 0 — reused as `generic`)

4. Client debounce already handled in Phase 5.

5. **E2E test**: Full flow — login, like a kudo, reload, verify persistence,
   click again to unlike, verify persistence.

---

## Testing Strategy

### Test Framework Stack

- **Vitest** for unit + integration tests (already configured — no setup needed)
- **@testing-library/react** for component tests — **not yet installed**; add
  `@testing-library/react` and `@testing-library/jest-dom` as dev dependencies
- **Playwright** for E2E — **not yet installed**; add `@playwright/test` as a
  dev dependency and run `npx playwright install chromium` once
- **Local Supabase** via `supabase start` for integration tests that need real
  DB behavior (trigger semantics, RLS enforcement)

### Test Environment Setup

- **Unit tests**: Mock `fetch`, mock `@/libs/supabase/server`. No external
  dependencies.
- **Integration tests** (trigger + route handler):
  1. Run `supabase start` before suite (CI + local dev)
  2. Apply all migrations (`supabase db push`) as part of `globalSetup`
  3. Each test seeds a deterministic user + kudos; reset via `TRUNCATE
     kudo_likes, kudos RESTART IDENTITY CASCADE` between tests (faster than
     transaction rollback for this volume)
  4. Mock `auth.getUser()` to return a seeded test user id
- **E2E tests**: Start `supabase start` + `yarn dev`. Use Playwright's
  storage state to load an authenticated session.

### Test Categories

| Type | Focus | Target Coverage |
|------|-------|-----------------|
| Unit (Vitest) | `toggleLike()` service (mocked fetch), Zod schema validation | 90%+ |
| Unit (Vitest + RTL) | `KudoCardInteractions` behavior (mocked service) | 80%+ |
| Integration (Vitest + local Supabase) | Route handler: auth, idempotency, error codes | 90%+ |
| Integration (Vitest + local Supabase) | DB trigger: increments/decrements `like_count` on insert/delete | 100% (every branch) |
| E2E (Playwright) | Happy path: login → like → reload → verify → unlike → verify | 1 critical flow |

### Success Criteria Verification

Each success criterion from `spec.md` maps to explicit test coverage:

| Criterion | How Verified |
|-----------|--------------|
| SC-LIKE-001 (toggle <100ms) | Not automated; manual perf audit in dev with React Profiler. Covered by optimistic update pattern |
| SC-LIKE-002 (persist across reloads) | E2E Playwright test in Phase 6 |
| SC-LIKE-003 (count matches row count) | Integration test in Phase 1 (trigger verification) |
| SC-LIKE-004 (unique per user+kudo) | Integration test: duplicate INSERT → PK violation → caught as idempotent no-op |
| SC-LIKE-005 (no like on behalf of another) | Integration test: attempt INSERT with mismatched `user_id` → RLS denial |
| SC-LIKE-006 (only existing CSS tokens) | Static check during PR review; no new tokens added to `globals.css` |

### Test Order (TDD)

For each phase:
1. Write failing test(s) for the target behavior (Red)
2. Implement minimum code to make them pass (Green)
3. Refactor if needed, re-run tests (Refactor)
4. Move to next task in the phase

### Coverage Goals

| Area | Target |
|------|--------|
| Zod schema | 100% |
| Route handler request/response flow | 90% |
| DB trigger (insert, delete, edge case: count goes to 0) | 100% |
| Service `toggleLike()` happy path + error paths | 90% |
| Component `KudoCardInteractions` optimistic + rollback | 80% |

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: KudoCardInteractions ↔ toggleLike service ↔ Toast
- [x] **External dependencies**: Supabase Auth (`getUser()`), Supabase DB (kudo_likes table + trigger)
- [x] **Data layer**: `kudo_likes` table insert/delete, `kudos.like_count` denormalization consistency
- [x] **User workflows**: Login → Like → reload → Unlike → reload

### Test Environment

- **Environment type**: Local Supabase via `supabase start`
- **Test data strategy**: Seed a test user + 1–3 kudos in `beforeEach`
- **Isolation approach**: `TRUNCATE kudo_likes, kudos RESTART IDENTITY CASCADE`
  in `afterEach` (consistent with the Test Environment Setup above).
  Transaction rollback was considered but rejected — Supabase SDK doesn't expose
  a clean transaction API from Node.js integration tests, and TRUNCATE is fast
  enough for this table volume.

### Mocking Strategy

| Dependency | Strategy | Rationale |
|------------|----------|-----------|
| Supabase Auth (in unit tests) | Mock `getUser()` | Unit tests don't need real sessions |
| Supabase DB (in unit tests) | Mock the client's `.from()` chain | Isolates service logic from DB |
| Supabase (in integration tests) | Real local instance | Verifies RLS policies + trigger behavior |
| `fetch` (in unit tests of `toggleLike`) | Mock with `vi.fn()` | Isolates service from network |
| `fetch` (in E2E) | Real | End-to-end validation |

### Key Test Scenarios

1. **Happy path**:
   - Authenticated user likes a kudo → heart red, count +1, row in kudo_likes
   - Reload → state persists
   - Unlike → heart unfilled, count -1, row removed

2. **Validation**:
   - Unauthenticated request → 401
   - Invalid body → 400
   - Non-existent kudo id → 404

3. **Idempotency**:
   - Double like → no duplicate row, count stays at 1
   - Unlike already-unliked kudo → no error, no row, count stays at 0

4. **Trigger correctness**:
   - Multiple users like same kudo → `kudos.like_count` equals unique row count
   - Cascade delete of kudo → `kudo_likes` rows cascade, no trigger errors

5. **Concurrency** (stretch):
   - Two concurrent likes from different users on same kudo → both succeed,
     count is 2

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| DB trigger has race condition on rapid like/unlike | Low | Medium | Trigger is atomic per row; PK prevents double inserts; `greatest(x-1, 0)` prevents negative count |
| Feed query performance degrades with many kudos | Medium | Medium | Denormalized `like_count` avoids N+1; composite index on `(user_id, kudo_id)` makes `exists` subquery O(log n) |
| Client sends stale `liked` value → user toggles wrong way | Low | Low | Server always returns canonical state in response; client reconciles to server state after request |
| `router.push('/login')` on 401 loses unsaved work on Write Kudo modal (if open) | Low | Low | Like action is a single click — nothing unsaved; delayed redirect (1s) gives user time to see toast |
| Cloudflare WAF rate limit too aggressive for power users | Medium | Low | Start at 60/min; monitor; can loosen in WAF config without code change |
| Existing mock mode users lose feature parity when Supabase goes live | Low | Low | Mock fallback in `toggleLike()` + feed reads preserves dev experience |

### Estimated Complexity

- **Frontend**: Low (existing component reused with 2 small changes)
- **Backend**: Medium (new table, trigger, route handler — standard Supabase patterns)
- **Testing**: Medium (trigger behavior requires integration tests against real DB)

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed
- [x] `spec.md` approved (Q5 & Q6 resolved; Q1–Q4 are business questions flagged with `// TODO` in code)
- [x] `design-style.md` reviewed
- [ ] `kudos` table migration from Write Kudo feature applied (`20260416_create_kudos_table.sql`) — the new `kudo_likes` table FK depends on it
- [ ] Local Supabase running via `supabase start`

### External Dependencies

- **Supabase Auth**: For `getUser()` in the route handler
- **Supabase Storage**: Not required for this feature
- **Cloudflare WAF**: Rate limiting configured separately (infra task, not code)

### Not Required

- **SCREENFLOW.md update**: This feature is an in-page interaction, not a new
  screen or navigation target. No SCREENFLOW edits needed.
- **New npm runtime dependencies**: All libraries already available.
- **New design tokens**: All styling inherited from `../MaZUn5xHXZ-SunKudos/design-style.md`.

### Defaults for Open Questions (implementation-time)

| Question | Default Used | Code Marker |
|----------|-------------|-------------|
| Q1: Can user like own kudo? | Yes (allowed) | No check needed; mark with `// Q1: allowed — PM confirmed` |
| Q2: Notification on like? | Out of MVP scope | N/A |
| Q3: Leaderboard by likes? | Not in this feature | N/A |
| Q4: "Liked by N" list for anonymous? | Not shown | N/A |

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate the task breakdown from this plan
2. **Review** `tasks.md` for parallelization opportunities
3. **Apply** existing Write Kudo migrations first (`supabase db push`) to ensure
   `kudos` table exists before the `kudo_likes` FK can be created
4. **Begin** Phase 0 (types + i18n) → Phase 1 (DB migrations) → Phase 2+

---

## Notes

- The existing `KudoCardInteractions.tsx` already follows the optimistic update
  pattern correctly. The bulk of this feature is backend (DB + API) + a small
  props/wiring change on the frontend.
- The mock fallback in `toggleLike()` keeps local dev smooth when Supabase
  isn't running — matching the pattern established by the Write Kudo feature.
- `revalidatePath('/kudos')` is **deliberately not used** after like toggle
  (would disrupt scroll position). Optimistic update is sufficient; fresh data
  arrives on next navigation.
- Rate limiting is an infra concern (Cloudflare WAF), tracked separately from
  code. TR-LIKE-009 acknowledges it but the implementation only returns 429
  if the edge layer has already marked the request as throttled.
- The plan assumes the Write Kudo `kudos` table migration has been applied.
  Without it, the `kudo_likes` FK migration will fail — see Migration Order in
  the spec.
