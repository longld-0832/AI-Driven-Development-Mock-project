# Tasks: Viết Kudo (Write Kudo Modal)

**Frame**: `ihQ26W78P2-VietKudo`
**Prerequisites**: plan.md (required), spec.md (required), design-style.md (required)
**Total Tasks**: 48
**TDD**: Yes — Constitution mandates Red → Green → Refactor

---

## Task Format

```
- [ ] T### [P?] [Story?] Description | file/path.ts
```

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this belongs to (US1–US6)
- **|**: File path affected by this task

---

## Phase 1: Setup (Dependencies & Configuration)

**Purpose**: Install packages and establish project scaffolding.

- [x] T001 Install Tiptap packages: `yarn add @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-mention @tiptap/extension-placeholder`
- [x] T002 Install Zod: `yarn add zod`
- [x] T003 Add Write Kudo modal CSS custom properties (~17 tokens from design-style.md) under `/* Write Kudo Modal */` comment block | `src/app/globals.css`
- [x] T004 [P] Add `WriteKudoPayload`, `WriteKudoResult`, `Hashtag`, `UploadResult` interfaces and `writeKudoSchema` Zod schema (shared client/server) | `src/types/kudos.ts`
- [x] T005 [P] Add `writeKudo` i18n namespace with all translation keys (title, labels, placeholders, hints, buttons, error messages) for `vi` and `en` | `src/libs/i18n/sun-kudos.ts`

**Checkpoint**: Dependencies installed, design tokens live, types + i18n ready.

---

## Phase 2: Foundation (Database & API Layer)

**Purpose**: Backend infrastructure that ALL user stories depend on.

**⚠️ CRITICAL**: No frontend component work can begin until this phase is complete.

### Database

- [x] T006 Create Supabase migration: `kudos` table (id uuid PK, sender_id uuid FK, receiver_id uuid FK, honor_title text, content text, hashtags text[], images text[], is_anonymous boolean, created_at timestamptz) with RLS policies (authenticated INSERT, public SELECT) | `supabase/migrations/YYYYMMDD_create_kudos_table.sql`
- [x] T007 [P] Create Supabase migration: `hashtags` lookup table (id serial PK, name text UNIQUE, slug text UNIQUE) | `supabase/migrations/YYYYMMDD_create_hashtags_table.sql`
- [x] T008 [P] Create Supabase migration: `kudo-images` Storage bucket (public read, authenticated write) | `supabase/migrations/YYYYMMDD_create_storage_bucket.sql`
- [x] T009 Create hashtag seed data (at minimum: #Dedicated, #Inspiring, #Creative, #Teamwork, #Leadership) | `supabase/seeds/hashtags.sql`

### Service Layer

- [x] T010 Add `getHashtags(): Promise<Hashtag[]>` — query `hashtags` table (mock fallback for dev) | `src/services/kudos-service.ts`
- [x] T011 [P] Add `createKudo(payload: WriteKudoPayload): Promise<WriteKudoResult>` — insert into `kudos` table via Supabase server client (mock fallback for dev) | `src/services/kudos-service.ts`

### API Routes

- [x] T012 Create GET route handler: query `hashtags` table, return JSON, set `Cache-Control: public, max-age=3600`; validate auth via `getUser()` | `src/app/api/hashtags/route.ts`
- [x] T013 [P] Create POST route handler: validate auth via `getUser()`, validate file type (image/*) + size (≤5 MB), upload to Supabase Storage bucket `kudo-images` at path `kudos/{user_id}/{timestamp}-{filename}`, return `{ url }` JSON. Error responses: 401 (unauth), 413 (too large), 415 (invalid type), 500 (upload fail) | `src/app/api/uploads/route.ts`

### Server Action

- [x] T014 Create `submitKudo` Server Action: validate with `writeKudoSchema`, call `getUser()`, call `createKudo()`, call `revalidatePath('/kudos')`, return `{ success, kudo? , error? }` | `src/app/(home)/kudos/actions.ts`

**Checkpoint**: DB schema live, hashtags seeded, upload endpoint works, submit action ready. Run `supabase db push` + manual API test.

---

## Phase 3: US1 + US5 — Core Modal Shell (Priority: P1) 🎯 MVP

**Goal**: Modal opens from hero, closes on cancel/Escape, form validates, submit works end-to-end with pre-filled recipient.

**Independent Test**: Click hero search → select user → modal opens with recipient → fill all fields → submit → success toast → modal closes.

### Frontend (US1 + US5)

- [x] T015 [US1] Create modal root component: overlay backdrop + centered container + focus trap (custom Tab/Shift+Tab handler) + Escape keydown handler + `aria-modal="true"` + `role="dialog"` + `aria-labelledby`. Props: `isOpen, onClose, prefilledRecipient, hashtags[], users[]`. Responsive: fullscreen on mobile, centered 600px tablet, 640px desktop | `src/components/kudos/write-kudo/WriteKudoModal.tsx`
- [x] T016 [P] [US1] Create recipient field: light-theme autocomplete input (white bg, dark text). Label "Người nhận *" with red asterisk. Dropdown with user search (reuse `useDebounce` pattern from existing `SearchInput`). Pre-fill when `prefilledRecipient` is provided. Error state: red border + "Vui lòng chọn người nhận". `aria-required="true"` | `src/components/kudos/write-kudo/RecipientField.tsx`
- [x] T017 [P] [US1] Create honor title field: text input (h-14, rounded-lg) with label "Danh hiệu *" and hint text "Ví dụ: Người truyền động lực cho tôi. Danh hiệu sẽ hiển thị làm tiêu đề Kudos của bạn." Placeholder: "Dành tặng một danh hiệu cho đồng đội". Max 100 chars. Error state. `aria-required="true"` | `src/components/kudos/write-kudo/HonorTitleField.tsx`
- [x] T018 [P] [US5] Create action bar: "Hủy ✕" (outlined button) + "Gửi ▷" (yellow button, min-w-200). Gửi disabled when required fields incomplete. Loading spinner state with "Đang gửi..." text. Both buttons disabled during submit. Touch targets ≥44×44px | `src/components/kudos/write-kudo/ModalActionBar.tsx`
- [x] T019 [US1] Wire form state in WriteKudoModal: `useState` for all 10 state fields from spec. Compute `isFormValid` = recipient + honorTitle + content + ≥1 hashtag. On submit: validate with Zod, call `submitKudo` Server Action, show Toast on success/error, close modal on success | `src/components/kudos/write-kudo/WriteKudoModal.tsx`
- [x] T020 [US1] Modify KudosHero: replace `handleUnavailableRoute` with `onSelectUser` that sets `isModalOpen=true` + `selectedRecipient=user`. Render `<WriteKudoModal>` conditionally. Pass `users` and `hashtags` props through | `src/components/kudos/KudosHero.tsx`
- [x] T021 [US1] Modify kudos page: add server-side `getHashtags()` call, pass `hashtags` prop to `<KudosHero>` | `src/app/(home)/kudos/page.tsx`

**Checkpoint**: Full modal open → fill → submit → close flow works. US5 cancel/Escape/disabled-during-submit all functional.

---

## Phase 4: US1 (continued) — Rich Text Editor (Priority: P1)

**Goal**: Tiptap editor with formatting toolbar (B/I/S/List/Link/Quote), @mention support, and community standards link.

**Independent Test**: Type in editor → apply bold/italic/link → @mention triggers dropdown → select user → mention chip inserted → content saved as HTML.

### Frontend (US1)

- [x] T022 [US1] Create Tiptap editor component (dynamic import via `next/dynamic({ ssr: false })`): configure extensions — StarterKit (Bold, Italic, Strike, OrderedList, Blockquote), Link (openOnClick: false), Mention (user search suggestion), Placeholder. Emit HTML content to parent via `onUpdate`. Formatting toolbar row: 6 toggle buttons (40×40px each, border-separated) + "Tiêu chuẩn cộng đồng" link (right-aligned, amber color, `target="_blank" rel="noopener noreferrer"`, href placeholder `/community-standards`). Toolbar buttons: active state highlight. Keyboard shortcuts: Ctrl+B, Ctrl+I, Ctrl+K. Hint text below: 'Bạn có thể "@ + tên" để nhắc tới đồng nghiệp khác' (centered, 12px, gray) | `src/components/kudos/write-kudo/KudoEditor.tsx`
- [x] T023 [US1] Integrate KudoEditor into WriteKudoModal: replace placeholder content textarea, wire `onUpdate` → `setContent(html)`, pass `users` for @mention suggestions | `src/components/kudos/write-kudo/WriteKudoModal.tsx`

**Checkpoint**: Rich text editing works. Toolbar toggles correct. @mention popup shows users.

---

## Phase 5: US2 — Hashtag Selection (Priority: P1)

**Goal**: Pick 1–5 hashtags from a dropdown, render as removable chips.

**Independent Test**: Click "+ Hashtag" → dropdown shows options → select tag → chip appears → select 5 → button hides → remove chip → button reappears.

### Frontend (US2)

- [x] T024 [US2] Create hashtag field component: label "Hashtag *" (red asterisk) + tag group container (flex-wrap, gap-8). "+ Hashtag" button (dashed border, amber, pill-shaped) with "Tối đa 5" note. Click opens dropdown/popover listing available hashtags (passed as props). Selected hashtags render as pill chips (bg-gray-100, 12px, rounded-full) with `×` close button. On select: add to `hashtags[]` state + remove from dropdown. On close click: remove from state + add back to dropdown. When `hashtags.length === 5`: hide "+ Hashtag" button. Error state: "Vui lòng thêm ít nhất 1 hashtag". `aria-required="true"` on the field | `src/components/kudos/write-kudo/HashtagField.tsx`
- [x] T025 [US2] Integrate HashtagField into WriteKudoModal: wire `hashtags` state, pass available hashtags list from props | `src/components/kudos/write-kudo/WriteKudoModal.tsx`

**Checkpoint**: Hashtag add/remove works. Max 5 enforced. Validation error shows on submit with 0 tags.

---

## Phase 6: US3 — Image Attachment (Priority: P2)

**Goal**: Upload up to 5 images with background upload, thumbnail preview, and remove.

**Independent Test**: Click "+ Image" → file picker → select image → thumbnail appears immediately → red ✕ overlay → upload completes in background → remove image → thumbnail gone.

### Frontend (US3)

- [x] T026 [US3] Create image upload field component: label "Image" (no asterisk). Hidden `<input type="file" accept="image/*" multiple>`. Thumbnail row (flex, gap-8): each image = 56×56px rounded-lg with `object-fit: cover` + absolute-positioned red circle `×` button (16×16, top-right). "+ Image" button (56×56, dashed border, amber, `+` icon) with "Tối đa 5" note. On file select: validate MIME type client-side, show thumbnail immediately via `URL.createObjectURL()`, increment `uploadingCount`, `fetch POST /api/uploads` with `FormData`, on success store CDN URL in `imageUrls[]`, on failure show error overlay on thumbnail + Toast "Tải ảnh thất bại". On remove: revoke object URL, remove from `images[]` + `imageUrls[]`. When 5 images: hide button. | `src/components/kudos/write-kudo/ImageUploadField.tsx`
- [x] T027 [US3] Integrate ImageUploadField into WriteKudoModal: wire `images`, `imageUrls`, `uploadingCount` state. On submit: wait for `uploadingCount === 0`, include `imageUrls` in payload | `src/components/kudos/write-kudo/WriteKudoModal.tsx`

**Checkpoint**: Image select → preview → upload → remove all work. Max 5 enforced. Failed uploads show error overlay.

---

## Phase 7: US4 — Anonymous Submission (Priority: P2)

**Goal**: Toggle anonymous mode; sender identity hidden on published kudo.

**Independent Test**: Check "Gửi ẩn danh" → submit → kudo in feed shows "Ẩn danh" instead of sender name.

### Frontend (US4)

- [x] T028 [US4] Create anonymous checkbox component: checkbox (18×18, rounded-4, checked=yellow bg) + label "Gửi lời cám ơn và ghi nhận ẩn danh" (14px/400). On check: set `isAnonymous=true`, conditionally show anonymous name text input (placeholder "Ẩn danh", max 50 chars, optional — defaults to "Ẩn danh" if empty). Wire to form state | `src/components/kudos/write-kudo/AnonymousCheckbox.tsx`
- [x] T029 [US4] Integrate AnonymousCheckbox into WriteKudoModal: wire `isAnonymous` state, include in submit payload | `src/components/kudos/write-kudo/WriteKudoModal.tsx`

**Checkpoint**: Anonymous toggle works. Submit with anonymous = true sends correct payload.

---

## Phase 8: US6 — Error & Edge Case Handling (Priority: P2)

**Goal**: Graceful error handling for all failure modes.

**Independent Test**: Simulate network error on submit → modal stays open, data preserved, toast shown. Simulate upload failure → error overlay on thumbnail.

### Frontend (US6)

- [ ] T030 [US6] Add zero search results state to RecipientField: when filtered results = 0, show "Không tìm thấy kết quả" in dropdown | `src/components/kudos/write-kudo/RecipientField.tsx`
- [ ] T031 [P] [US6] Add upload error overlay to ImageUploadField: when `fetch` fails or returns 413/415, show error icon on thumbnail, Toast with error message, do not include in final payload. Add retry button on failed thumbnail | `src/components/kudos/write-kudo/ImageUploadField.tsx`
- [ ] T032 [P] [US6] Add in-flight upload guard to WriteKudoModal submit handler: if `uploadingCount > 0` when user clicks Gửi, show spinner and wait for all uploads. If any failed, prompt to remove/retry before sending | `src/components/kudos/write-kudo/WriteKudoModal.tsx`
- [ ] T033 [US6] Add server error handling to WriteKudoModal: on 500 response — modal stays open, data preserved, error Toast "Đã xảy ra lỗi, vui lòng thử lại", re-enable Gửi button. On timeout (>30s) — clear loading, preserve data, timeout Toast | `src/components/kudos/write-kudo/WriteKudoModal.tsx`

**Checkpoint**: All 5 edge cases from US6 acceptance scenarios pass.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Responsive behavior, accessibility refinement, animations, and final cleanup.

### Responsive

- [ ] T034 [P] Implement mobile responsive: modal fullscreen (`w-full h-full rounded-none`), padding 16px, title 20px, action bar sticky bottom, image thumbnails 48×48 | `src/components/kudos/write-kudo/WriteKudoModal.tsx`
- [ ] T035 [P] Implement tablet responsive: modal centered max-w-[600px], padding 24px | `src/components/kudos/write-kudo/WriteKudoModal.tsx`

### Accessibility

- [ ] T036 Verify focus trap: Tab cycles only within modal, Shift+Tab wraps. Auto-focus RecipientField (B.2) on modal open. Return focus to trigger element on close | `src/components/kudos/write-kudo/WriteKudoModal.tsx`
- [ ] T037 [P] Add `aria-label` to all icon-only buttons: toolbar toggles (C.1–C.6), image remove ×, hashtag chip ×, cancel ✕ icon, submit ▷ icon | All write-kudo components
- [ ] T038 [P] Add `role="alert"` or `aria-live="assertive"` to all inline error messages below form fields | All field components

### Animations

- [ ] T039 [P] Add modal appear/disappear animation: opacity + scale (200ms ease-out in, 150ms ease-in out). Overlay opacity transition (200ms/150ms) | `src/components/kudos/write-kudo/WriteKudoModal.tsx`
- [ ] T040 [P] Add chip add/remove animation: opacity + scale (150ms/100ms). Input focus border transition (150ms). Submit button state transition (150ms) | HashtagField, ImageUploadField, ModalActionBar

### Cleanup

- [ ] T041 Remove `handleUnavailableRoute` dead code and `routePending` i18n key from KudosHero | `src/components/kudos/KudosHero.tsx`
- [ ] T042 Add `// TODO(Q#)` markers on all open question defaults: Q1 (honor max=100), Q2 (content max=5000), Q3 (image size=5MB), Q4 (anon name), Q5 (no discard dialog), Q6 (backdrop closes), Q7 (community URL) | All affected files
- [ ] T043 Verify all CSS custom properties use `var(--token)` — no hard-coded hex in any component file (Constitution V) | All write-kudo components

### Testing

- [ ] T044 [P] Unit tests: Zod `writeKudoSchema` validation (valid payload, missing fields, max lengths, edge values) | `src/types/__tests__/kudos.test.ts`
- [ ] T045 [P] Unit tests: `submitKudo` Server Action (mock Supabase, verify getUser called, verify insert params, verify revalidatePath) | `src/app/(home)/kudos/__tests__/actions.test.ts`
- [ ] T046 [P] Unit tests: Upload route handler (mock Storage, verify auth, verify file type/size validation, verify error responses) | `src/app/api/uploads/__tests__/route.test.ts`
- [ ] T047 Integration test: Full modal flow — open → fill all fields → submit → verify toast + modal closes | `tests/integration/write-kudo.test.ts`
- [ ] T048 E2E test (Playwright): Hero search → select user → modal opens → fill form → submit → kudo appears in feed | `tests/e2e/write-kudo.spec.ts`

**Checkpoint**: All responsive breakpoints verified (375px, 768px, 1440px). Accessibility audit passes. Animations smooth. No Constitution violations.

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
  ↓
Phase 2 (Foundation — DB + API)     ← BLOCKS all frontend work
  ↓
Phase 3 (US1+US5 — Core Modal)     ← 🎯 MVP
  ↓
Phase 4 (US1 — Rich Text Editor)   ← Completes US1
  ↓ ─────────────────────────────────┐
Phase 5 (US2 — Hashtags)    [P]     │ These 3 phases can run
Phase 6 (US3 — Images)      [P]     │ in parallel after Phase 4
Phase 7 (US4 — Anonymous)   [P]     │
  ↓ ─────────────────────────────────┘
Phase 8 (US6 — Error Handling)      ← Depends on Phases 5+6 (upload/search errors)
  ↓
Phase 9 (Polish)                    ← Final pass
```

### Within Each Phase

1. Tests written first (TDD — Red)
2. Implementation code (Green)
3. Refactor if needed
4. Models/Types → Services → API → Components (bottom-up)

### Parallel Opportunities

| Phase | Parallel Tasks | Why |
|-------|----------------|-----|
| Phase 1 | T003 ‖ T004 ‖ T005 | Different files (globals.css, kudos.ts, sun-kudos.ts) |
| Phase 2 | T007 ‖ T008, T010 ‖ T011, T012 ‖ T013 | Independent DB tables, independent service functions, independent route files |
| Phase 3 | T016 ‖ T017 ‖ T018 | Independent component files |
| Phase 5–7 | Entire phases | Independent features after core modal exists |
| Phase 9 | T034 ‖ T035, T037 ‖ T038 ‖ T039 ‖ T040, T044 ‖ T045 ‖ T046 | Independent concerns |

---

## Implementation Strategy

### MVP First (Recommended)

1. Complete **Phase 1 + 2** (Setup + Foundation)
2. Complete **Phase 3** (Core Modal — US1 + US5)
3. **STOP AND VALIDATE**: Modal opens → fill all fields → submit → success toast → close
4. Complete **Phase 4** (Rich Text Editor — completes US1)
5. **Deploy MVP**: Full US1 + US5 working

### Incremental Delivery

| Increment | Phases | User Stories Complete | What Users Can Do |
|-----------|--------|---------------------|-------------------|
| MVP | 1–4 | US1, US5 | Open modal, write + submit kudo, cancel |
| +Hashtags | +5 | +US2 | Tag kudos with hashtags |
| +Images | +6 | +US3 | Attach images to kudos |
| +Anonymous | +7 | +US4 | Send anonymous kudos |
| +Polish | +8–9 | +US6 | Error handling, responsive, a11y, animations |

---

## Summary

| Metric | Value |
|--------|-------|
| Total tasks | 48 |
| Phase 1 (Setup) | 5 tasks |
| Phase 2 (Foundation) | 9 tasks |
| Phase 3 (US1+US5 Core) | 7 tasks |
| Phase 4 (US1 Editor) | 2 tasks |
| Phase 5 (US2 Hashtags) | 2 tasks |
| Phase 6 (US3 Images) | 2 tasks |
| Phase 7 (US4 Anonymous) | 2 tasks |
| Phase 8 (US6 Errors) | 4 tasks |
| Phase 9 (Polish) | 15 tasks |
| Parallel opportunities | 18 tasks marked [P] |
| MVP scope | Phases 1–4 (23 tasks) |

---

## Notes

- Commit after each task or logical group
- Run `supabase db push` after Phase 2 DB migrations
- Run tests before moving to next phase (TDD mandate)
- Update spec.md if requirements change during implementation
- Mark tasks complete as you go: `[x]`
- All `// TODO(Q#)` markers should be resolved with PM before production deploy
