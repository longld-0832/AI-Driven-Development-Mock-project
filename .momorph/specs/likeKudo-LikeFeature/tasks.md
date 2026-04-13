# Tasks: Like / Unlike Kudo

**Frame**: `likeKudo-LikeFeature`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)
**Total Tasks**: 30
**TDD**: Yes — Constitution mandates Red → Green → Refactor (TR-LIKE-007/008)

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1–US5)
- **|**: File path affected by this task

---

## Phase 1: Setup (Dev Dependencies & Configuration)

**Purpose**: Install test-framework dev dependencies needed for TDD compliance.

- [ ] T001 Verify `vitest` is in devDependencies; if missing, run `yarn add -D vitest @vitest/ui`
- [ ] T002 Install testing libs: `yarn add -D @testing-library/react @testing-library/jest-dom`
- [ ] T003 Install E2E framework: `yarn add -D @playwright/test && npx playwright install chromium`
- [ ] T004 Add `test`, `test:ui`, `test:e2e` scripts to `package.json` | `package.json`
- [x] T005 [P] Add `LikeKudoPayload`, `LikeKudoResult` interfaces and `likeKudoSchema` (Zod) | `src/types/kudos.ts`
- [x] T006 [P] Add i18n keys `actions.likeFailed`, `actions.likeErrorSessionExpired`, `actions.likeErrorNotFound`, `actions.likeErrorRateLimited` for `vi` and `en` | `src/libs/i18n/sun-kudos.ts`

**Checkpoint**: Test frameworks installed, types + i18n ready.

---

## Phase 2: Foundation (Database + Service Mode Detection)

**Purpose**: DB schema live and service-layer mode detection ready. Blocks all user-story work.

**⚠️ CRITICAL**: No API or component work can begin until this phase is complete.

### Database Migrations

- [x] T007 Create migration: `kudo_likes` table (composite PK `(user_id, kudo_id)`, FKs to `auth.users` and `public.kudos` with `on delete cascade`, `created_at` default `now()`), indexes on `kudo_id` and `user_id`, RLS enabled with policies: SELECT (authenticated), INSERT (`auth.uid() = user_id`), DELETE (`auth.uid() = user_id`) | `supabase/migrations/20260417_create_kudo_likes_table.sql`
- [x] T008 Create migration: `ALTER TABLE kudos ADD COLUMN like_count integer not null default 0`, create `sync_kudos_like_count()` function (security definer) that increments on INSERT and decrements via `greatest(like_count - 1, 0)` on DELETE, attach `after insert or delete on kudo_likes for each row` trigger | `supabase/migrations/20260418_add_kudos_like_count_and_trigger.sql`
- [ ] T009 Run `supabase db push` locally and verify schema via `supabase studio` or `psql`

### Trigger Integration Test (TDD — write BEFORE verifying trigger)

- [ ] T010 Integration test: Insert a kudo + like → `kudos.like_count == 1`; delete the like → `kudos.like_count == 0`; insert duplicate like (same user_id, kudo_id) → PK violation caught as idempotent no-op | `tests/integration/kudo-likes-trigger.test.ts`

### Service Mode Detection

- [x] T011 Add `LikeApiError` class (extends `Error` with `status: number`) and `isSupabaseKudosAvailable()` helper (queries `kudos` table, returns boolean). Export both from `kudos-service.ts` | `src/services/kudos-service.ts`

**Checkpoint**: DB schema live, trigger verified, service layer can detect Supabase availability.

---

## Phase 3: US1 + US2 — Like & Unlike a Kudo (Priority: P1) 🎯 MVP

**Goal**: Authenticated user can like and unlike any kudo; change persists across page reloads with proper rollback on failure.

**Independent Test**: Open the Live Board → click heart icon → heart turns red + count +1 → reload → state persists → click again → heart unfilled + count -1 → reload → state persists.

### Tests (US1 + US2)

- [ ] T012 [US1] Unit test for `toggleLike()` service: Supabase mode happy path (200 OK → parsed result), 401/404/500 → throws `LikeApiError`, network failure → throws. Mock-mode toggles runtime kudo and clamps count at 0 | `tests/unit/toggle-like.test.ts`
- [ ] T013 [US1] Integration test for `PUT /api/kudos/[id]/like` route handler: happy path (`{liked:true}` → 200 + `{likedByMe:true, likeCount:1}`), idempotent repeat → same response + no duplicate row, unlike (`{liked:false}` → 200 + `{likedByMe:false, likeCount:0}`), unauth → 401, non-existent kudo → 404, invalid body (`{liked:"yes"}`) → 400 | `tests/integration/like-route.test.ts`

### API Route Handler (US1 + US2)

- [x] T014 [US1] Create `PUT /api/kudos/[id]/like` route handler: validate kudo `id` is UUID, validate body via `likeKudoSchema.safeParse`, call `supabase.auth.getUser()` (401 on failure), upsert into `kudo_likes` with `onConflict: 'user_id,kudo_id'` when `liked:true`, delete from `kudo_likes` when `liked:false`, re-read `kudos.like_count` + `exists` subquery, return `{kudoId, likedByMe, likeCount}`. Error codes: 400/401/404/429/500 | `src/app/api/kudos/[id]/like/route.ts`

### Service Layer (US1 + US2)

- [x] T015 [US1] Rewrite `toggleLike()` signature to `(params: {kudoId: string; liked: boolean}) => Promise<LikeKudoResult>`. Branch on `isSupabaseKudosAvailable()`: Supabase mode → `fetch('/api/kudos/${kudoId}/like', {method:'PUT', body: JSON.stringify({liked})})`, throw `LikeApiError(status, message)` on non-OK. Mock mode → find kudo in `runtimeKudos` or `KUDOS_MOCKS`, mutate `likedByMe` to `liked` + clamp `likeCount` at ≥0, return updated values | `src/services/kudos-service.ts`

### Component Wiring (US1 + US2)

- [ ] T016 [US1] Component test with React Testing Library: render `KudoCardInteractions` with initial state, click heart → optimistic toggle, mock `toggleLike` rejection → heart reverts + toast with `likeFailedLabel` | `tests/unit/kudo-card-interactions.test.tsx`
- [x] T017 [US1] Update `KudoCardInteractions.tsx`: add `likeFailedLabel: string` prop; replace `onToast(copyFailedLabel)` with `onToast(likeFailedLabel)` in like-failure catch (TR-LIKE-010 fix); change `toggleLike()` call to `{kudoId, liked: optimisticLiked}`; reconcile state from `LikeKudoResult` response | `src/components/kudos/KudoCardInteractions.tsx`
- [x] T018 [US1] Add 200ms debounce to `KudoCardInteractions.tsx`: introduce `pendingLiked` state + `const debouncedLiked = useDebounce(pendingLiked, 200)`; `useEffect` fires `toggleLike()` when `debouncedLiked !== lastPersistedLiked` (TR-LIKE-004) | `src/components/kudos/KudoCardInteractions.tsx`
- [x] T019 [P] [US1] Update `KudoCard.tsx` to thread `likeFailedLabel` from its `actions` prop into `<KudoCardInteractions>` | `src/components/kudos/KudoCard.tsx`
- [x] T020 [P] [US1] Update `AllKudosSection.tsx` (KudoFeed.tsx) to pass `likeFailed: t.actions.likeFailed` in the `actions` object given to `<KudoCard>` | `src/components/kudos/AllKudosSection.tsx`
- [x] T021 [P] [US1] Update `HighlightKudos.tsx` to pass `likeFailed: t.actions.likeFailed` in the `actions` object given to `<KudoCard>` | `src/components/kudos/HighlightKudos.tsx`

**Checkpoint**: User can like/unlike any kudo; state persists through page reload; errors show generic fallback toast. US1 + US2 complete.

---

## Phase 4: US3 — View Persistent Like Count Across Sessions (Priority: P1)

**Goal**: Any user sees aggregate like counts and correct `likedByMe` state for the current session.

**Independent Test**: User A likes a kudo → count becomes N+1. User B (different session) reloads the feed → sees the same count N+1, heart is unfilled for them. User A reloads → count N+1, heart filled.

### Tests (US3)

- [ ] T022 [US3] Integration test for feed read: insert kudo, user A likes it, query as user A → `likedByMe:true, likeCount:1`; query as user B → `likedByMe:false, likeCount:1` | `tests/integration/feed-like-state.test.ts`

### Service Layer (US3)

- [ ] T023 [US3] Update `getKudosPageData()` in `kudos-service.ts`: add Supabase branch (gated on `isSupabaseKudosAvailable()`) that selects kudos with `exists (select 1 from kudo_likes where kudo_id = k.id and user_id = auth.uid()) as liked_by_me` joined subquery, map snake_case → camelCase (`like_count` → `likeCount`, `liked_by_me` → `likedByMe`). Mock branch unchanged | `src/services/kudos-service.ts`

**Checkpoint**: Like count and `likedByMe` are per-session-correct on feed reads. US3 complete.

---

## Phase 5: US4 — Idempotent Like (Priority: P2)

**Goal**: Duplicate like/unlike requests are no-ops and do not inflate the count.

**Independent Test**: Send `PUT /api/kudos/[id]/like` with `{liked:true}` twice for the same user + kudo → second call returns 200 with unchanged state, no duplicate row.

**Note**: Core idempotency is already enforced in Phase 2 (composite PK) and Phase 3 (`onConflict: 'user_id,kudo_id'` in upsert). This phase adds explicit test coverage.

### Tests (US4)

- [ ] T024 [US4] Extend integration test (`like-route.test.ts`): send duplicate `{liked:true}` request → assert same response, `select count(*) from kudo_likes where user_id=X and kudo_id=Y` returns 1 | `tests/integration/like-route.test.ts`
- [ ] T025 [US4] Extend integration test: send `{liked:false}` when no like exists → assert 200 + `{likedByMe:false, likeCount:0}`, no error | `tests/integration/like-route.test.ts`

**Checkpoint**: Duplicate requests are proven idempotent. US4 complete.

---

## Phase 6: US5 — Rate Limiting (Priority: P3)

**Goal**: Rapid repeated toggles are handled gracefully via client debounce + edge WAF.

**Independent Test**: Rapidly click heart 10 times within 500ms → only 1 fetch is sent (debounced); 429 response from WAF → UI shows rate-limit toast and rolls back optimistic update.

### Tests (US5)

- [ ] T026 [US5] Unit test in `kudo-card-interactions.test.tsx`: 10 rapid clicks within 200ms → `toggleLike` mock is called only once with the final state (debounce verification) | `tests/unit/kudo-card-interactions.test.tsx`
- [ ] T027 [US5] Unit test: `toggleLike` returns status 429 → component catches `LikeApiError`, calls `onToast(likeErrorRateLimited)`, rolls back optimistic state | `tests/unit/kudo-card-interactions.test.tsx`

**Checkpoint**: Client debounce verified. Edge WAF config is an infra task tracked separately (out of code scope per TR-LIKE-009).

---

## Phase 7: Error Handling Polish & E2E

**Purpose**: Status-code-specific toasts and side effects; end-to-end flow verified.

### Status-Code-Specific Error Handling (applies to US1/US2/US5 error paths)

- [x] T028 Update `KudoCardInteractions.tsx`: accept new prop `likeErrorLabels: { sessionExpired, notFound, rateLimited, generic }`. In the catch block, inspect `LikeApiError.status`: 401 → `onToast(labels.sessionExpired)` + `setTimeout(() => router.push('/login'), 1000)`; 404 → `onToast(labels.notFound)` + `router.refresh()`; 429 → `onToast(labels.rateLimited)`; else → `onToast(labels.generic ?? likeFailedLabel)` | `src/components/kudos/KudoCardInteractions.tsx`
- [x] T029 Update `KudoCard.tsx`, `AllKudosSection.tsx`, `HighlightKudos.tsx` to pass the full `likeErrorLabels` object from i18n (`actions.likeErrorSessionExpired`, `.likeErrorNotFound`, `.likeErrorRateLimited`, `.likeFailed`) | `src/components/kudos/KudoCard.tsx`, `src/components/kudos/AllKudosSection.tsx`, `src/components/kudos/HighlightKudos.tsx`

### End-to-End Test

- [ ] T030 [P] Playwright E2E test: login → load Live Board → click heart on a kudo → assert heart red + count +1 → reload page → assert state persists → click heart again → assert heart unfilled + count -1 → reload → assert state persists | `tests/e2e/like-kudo.spec.ts`

**Checkpoint**: All status codes produce correct UX; E2E critical flow passes.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
  ↓
Phase 2 (Foundation — DB + Service mode detection)    ← BLOCKS everything
  ↓
Phase 3 (US1+US2 — Like/Unlike core)                   ← 🎯 MVP
  ↓ ──────────────────────────────────┐
Phase 4 (US3 — Feed read)  [P]        │ These 3 phases are largely independent
Phase 5 (US4 — Idempotency) [P]       │ — can run in parallel
Phase 6 (US5 — Rate limiting) [P]     │
  ↓ ──────────────────────────────────┘
Phase 7 (Error polish + E2E)          ← Final pass
```

### Within Each Phase

1. **Tests first (TDD — Red)**: For every non-trivial task, write a failing test before implementation.
2. **Implement (Green)**: Write minimum code to make the test pass.
3. **Refactor**: Clean up without changing behavior; re-run tests.
4. **Ordering within a phase**: Types → Services → API → Components (bottom-up).

### Parallel Opportunities

| Phase | Parallel Tasks | Why |
|-------|----------------|-----|
| Phase 1 | T005 ‖ T006 | Different files (`types/kudos.ts` vs `libs/i18n/sun-kudos.ts`) |
| Phase 2 | T007 ‖ T008 (but both before T009) | Independent migration files |
| Phase 3 | T019 ‖ T020 ‖ T021 | Independent component files (KudoCard, AllKudosSection, HighlightKudos) |
| Phase 3 | T012 ‖ T013 (tests before impl) | Different test files |
| Phases 4–6 | Entire phases independent once Phase 3 is done | Feed read, idempotency tests, debounce tests touch separate concerns |
| Phase 7 | T030 (E2E) runs alongside T028/T029 in feature branch | Different test tier |

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete **Phase 1 + 2** (Setup + Foundation).
2. Complete **Phase 3** (US1 + US2 — like + unlike with persistence).
3. Complete **Phase 4** (US3 — feed read showing persistent state).
4. **STOP AND VALIDATE**: E2E manual test — like a kudo, reload, verify persistence.
5. **Ship MVP**.

### Incremental Delivery

| Increment | Phases | User Stories | What Users Get |
|-----------|--------|--------------|----------------|
| MVP | 1–4 | US1, US2, US3 | Persistent, reliable like/unlike |
| +Hardening | +5 | +US4 | Proven idempotency (no user-visible change, just correctness) |
| +Abuse defense | +6 | +US5 | Debounce + rate-limit UX |
| +Error polish | +7 | — | Status-code-specific toasts + E2E |

---

## Summary

| Metric | Value |
|--------|-------|
| Total tasks | 30 |
| Phase 1 (Setup) | 6 tasks |
| Phase 2 (Foundation) | 5 tasks |
| Phase 3 (US1+US2 MVP) | 10 tasks |
| Phase 4 (US3) | 2 tasks |
| Phase 5 (US4) | 2 tasks |
| Phase 6 (US5) | 2 tasks |
| Phase 7 (Polish + E2E) | 3 tasks |
| Parallel opportunities | 7 tasks marked [P] |
| MVP scope | Phases 1–4 (23 tasks) |
| TDD test tasks | 9 (T010, T012, T013, T016, T022, T024, T025, T026, T027, T030) |

---

## Notes

- Commit after each task or logical group (≤3 related tasks).
- After Phase 2 DB work: run `supabase db push` and verify with `psql` or Supabase Studio.
- Mark tasks complete as you go: `[x]`.
- Rate limiting at Cloudflare WAF (TR-LIKE-009) is **infrastructure**, tracked separately — not in this task list. Code only returns 429 if the edge has already marked the request.
- The `router.refresh()` on 404 (T028) is an App Router feature — ensure the component imports `useRouter` from `next/navigation`.
