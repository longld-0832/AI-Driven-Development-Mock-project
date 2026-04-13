# Implementation Plan: Viết Kudo (Write Kudo Modal)

**Frame**: `ihQ26W78P2-VietKudo`
**Date**: 2026-04-16
**Spec**: `specs/ihQ26W78P2-VietKudo/spec.md`
**Design**: `specs/ihQ26W78P2-VietKudo/design-style.md`

---

## Summary

Implement a modal dialog for composing and submitting kudos. The modal is triggered
from the hero search bar on the Sun* Kudos Live Board page when a user selects a
recipient. It includes: recipient autocomplete (pre-filled), honor title input, a
rich-text editor with formatting toolbar, hashtag tagging (1–5), optional image
attachments (max 5, background upload), anonymous send toggle, and submit/cancel
actions.

**Technical approach**: Client component modal built with vanilla React state + Zod
validation. Tiptap for rich-text editing. Supabase for persistence (kudos table +
Storage for images). Server Actions for submit. Integrates into the existing
`KudosHero` component where `onSelectUser` currently shows a placeholder.

---

## Technical Context

**Language/Framework**: TypeScript (strict) / Next.js 15 App Router
**Primary Dependencies**: React 19, TailwindCSS 4, Supabase SSR, Tiptap, Zod
**Database**: Supabase PostgreSQL (with RLS)
**Testing**: Vitest (unit) + Playwright (E2E) — TDD per constitution
**State Management**: Local React state (`useState`) — no global store needed
**API Style**: Next.js Server Actions + Route Handlers for file upload
**Deployment**: Cloudflare Workers via `@opennextjs/cloudflare`

---

## Constitution Compliance Check

*GATE: Must pass before implementation can begin*

- [x] **I. TypeScript-First** — All code in strict TS; explicit param/return types; no implicit `any`
- [x] **II. RSC by Default** — Modal is a client component (`"use client"`) because it requires events, local state, browser APIs (File input). Data fetching (hashtag list) done at server level and passed as props
- [x] **III. Supabase as Single Backend** — Kudos table + Storage bucket via Supabase SDK; RLS enabled; `getUser()` validates session server-side before mutations
- [x] **IV. Edge-Compatible** — No Node.js-only APIs; Tiptap runs client-side only; Server Actions use Web Platform APIs; Supabase SDK is edge-compatible
- [x] **V. Design-Token Driven UI** — All colors via CSS variables in `globals.css`; no hard-coded hex in component files
- [x] **VI. Responsive Design** — Mobile-first with `md:` (768px) and `xl:` (1280px) breakpoints; touch targets ≥44×44px
- [x] **VII. Secure by Default** — `getUser()` in server actions; parameterized queries via Supabase SDK; file type validation server-side; no `dangerouslySetInnerHTML` (Tiptap manages its own DOM)

**Violations**: None

---

## Architecture Decisions

### Frontend Approach

- **Component Structure**: Feature-scoped components under `src/components/kudos/write-kudo/`
  - `WriteKudoModal.tsx` — Root modal (overlay + container + form orchestration)
  - `RecipientField.tsx` — Reuses existing `SearchInput` pattern with adaptations for modal context (white bg, dark text)
  - `HonorTitleField.tsx` — Simple text input with label + hint
  - `KudoEditor.tsx` — Tiptap editor + formatting toolbar + community standards link
  - `HashtagField.tsx` — Tag picker with chip list + dropdown
  - `ImageUploadField.tsx` — File input + thumbnail grid + background upload
  - `AnonymousCheckbox.tsx` — Checkbox toggle
  - `ModalActionBar.tsx` — Cancel + Submit buttons

- **Styling Strategy**: Tailwind utilities + CSS variables from `globals.css`. New modal-specific tokens added to `:root` block. Follows existing pattern of inline `style={{ color: 'var(--token)' }}` for theme colors, Tailwind for layout/spacing.

- **Data Fetching**:
  - Hashtag list: Fetched server-side in the parent page (`kudos/page.tsx`) and passed to the modal as props
  - User search: Client-side via existing `searchUsers()` service (already debounced)
  - Image upload: Client-side `fetch` to `/api/uploads` route handler
  - Kudo submit: Server Action `submitKudo()` with Zod validation

- **Form State**: Vanilla `useState` hooks (consistent with existing codebase patterns — no `react-hook-form` installed, and the form is simple enough to manage with native hooks). Zod schema defined once in `src/types/kudos.ts` and shared between client-side validation and server action.

- **User Search**: The spec lists `/api/users/search?q=` as an API, but the existing codebase loads all searchable users server-side and filters client-side (via `SearchInput` + `useDebounce`). **Decision**: Keep client-side filtering for MVP — the user list is already loaded in the parent page and passed as props. This avoids a new route handler. For production scale (>1000 users), migrate to a server-side search endpoint later.

- **Feed Refresh After Submit**: The spec says "new kudo is prepended to the feed". Since the existing feed reads from mock data, the server action will call `revalidatePath('/kudos')` to trigger re-fetch. For immediate visual feedback before revalidation completes, the parent page can optimistically prepend the new kudo to the feed state.

- **Focus Trap**: Custom implementation (no external library). Use a `keydown` handler on the modal container that intercepts `Tab` and `Shift+Tab` to cycle between the first and last focusable elements. Pattern similar to existing `ImageLightbox` keyboard handling but extended for full trap.

### Backend Approach

- **Database Schema**: New `kudos` table in Supabase with columns matching the `KudoItem` type. Migration file version-controlled under `supabase/migrations/`.

- **API Design**:
  | Endpoint | Type | Purpose |
  |----------|------|---------|
  | `submitKudo` | Server Action | Validate + insert kudo row + link images |
  | `/api/uploads` | Route Handler (POST) | Accept `multipart/form-data`, upload to Supabase Storage, return public URL |
  | `/api/hashtags` | Route Handler (GET) | Return predefined hashtag list (cacheable) |

  > **Deviation from spec**: The spec defines `POST /api/kudos` as a REST endpoint, but
  > this plan uses a **Server Action** instead. Rationale: Server Actions provide built-in
  > CSRF protection (constitution VII), eliminate manual `fetch` boilerplate, integrate
  > with `revalidatePath` for feed refresh, and are the idiomatic Next.js App Router
  > pattern. The `/api/uploads` route handler remains REST because `multipart/form-data`
  > is not natively supported by Server Actions.

- **Validation**: Zod schema (defined in spec) validated in Server Action before DB insert. File type + size validation in upload route handler.

- **Storage**: Supabase Storage bucket `kudo-images` with public read policy. Upload path: `kudos/{user_id}/{timestamp}-{filename}` (images are uploaded before the kudo row exists, so `kudo_id` is not available at upload time).

### Integration Points

- **Existing `KudosHero`**: Replace `handleUnavailableRoute` with `onSelectUser` → opens `WriteKudoModal` with pre-filled recipient
- **Existing `SearchInput`**: Can be partially reused, but needs a light-theme variant for the modal (white bg). Decision: create `RecipientField` that wraps a similar search pattern adapted for the modal's light theme
- **Existing `HashtagPill`**: Reusable in the kudo feed display, but modal chips need a close button — create a new `HashtagChip` for the modal
- **Existing `Toast`**: Reuse directly for success/error feedback
- **Existing `useDebounce`**: Reuse for recipient search debouncing
- **Existing `useLocale` + `SUN_KUDOS_I18N`**: Add write-kudo translations

---

## Project Structure

### Documentation (this feature)

```text
.momorph/specs/ihQ26W78P2-VietKudo/
├── spec.md              # Feature specification ✅
├── design-style.md      # Design specifications ✅
├── plan.md              # This file ✅
└── tasks.md             # Task breakdown (next step)
```

### Source Code (affected areas)

```text
# New Files
src/
├── components/kudos/write-kudo/
│   ├── WriteKudoModal.tsx         # Root modal component (overlay + container + form state)
│   ├── RecipientField.tsx         # Autocomplete recipient search (light-theme variant)
│   ├── HonorTitleField.tsx        # Honor title text input + label + hint
│   ├── KudoEditor.tsx             # Tiptap rich-text editor + formatting toolbar (dynamic import)
│   ├── HashtagField.tsx           # Hashtag picker: dropdown + chip list + add/remove
│   ├── ImageUploadField.tsx       # Image upload: file input + thumbnail grid + bg upload
│   ├── AnonymousCheckbox.tsx      # Anonymous toggle checkbox
│   └── ModalActionBar.tsx         # Cancel + Submit buttons with loading state
├── app/(home)/kudos/actions.ts    # Server Action: submitKudo (Zod + getUser + DB insert)
├── app/api/uploads/route.ts       # Route Handler: POST image upload → Supabase Storage
├── app/api/hashtags/route.ts      # Route Handler: GET hashtag list (cached)

# Database
supabase/
├── migrations/
│   ├── YYYYMMDD_create_kudos_table.sql    # kudos table + RLS policies
│   ├── YYYYMMDD_create_hashtags_table.sql # hashtags lookup table
│   └── YYYYMMDD_create_storage_bucket.sql # kudo-images bucket + policies
├── seeds/
│   └── hashtags.sql                        # Seed data: predefined hashtags
```

### Modified Files

| File | Specific Changes |
|------|------------------|
| `src/app/globals.css` | Add ~17 new CSS custom properties under a `/* Write Kudo Modal */` comment block (see Phase 0 token list) |
| `src/app/(home)/kudos/page.tsx` | Add `getHashtags()` server-side fetch; pass `hashtags` prop to `KudosHero`; render `<WriteKudoModal>` (conditionally via client state lifted here or in Hero) |
| `src/components/kudos/KudosHero.tsx` | Replace `handleUnavailableRoute` with `onSelectUser` that opens the modal; add `isModalOpen` + `selectedRecipient` state; render `<WriteKudoModal>` portal |
| `src/types/kudos.ts` | Add interfaces: `WriteKudoPayload`, `WriteKudoResult`, `Hashtag`, `UploadResult`; add Zod schema `writeKudoSchema` (shared between client validation and server action) |
| `src/services/kudos-service.ts` | Add `createKudo(payload: WriteKudoPayload)` and `getHashtags(): Promise<Hashtag[]>` functions (initially with mock fallback, then Supabase) |
| `src/libs/i18n/sun-kudos.ts` | Add `writeKudo` namespace with keys: `title`, `recipientLabel`, `recipientPlaceholder`, `honorLabel`, `honorPlaceholder`, `honorHint`, `contentPlaceholder`, `mentionHint`, `hashtagLabel`, `imageLabel`, `anonymousLabel`, `cancel`, `submit`, `submitting`, `maxNote`, `communityStandards`, error messages |

### Dependencies

| Package | Version | Purpose | Edge-compatible |
|---------|---------|---------|-----------------|
| `@tiptap/react` | ^2 | Rich-text editor React bindings | ✅ Client-only |
| `@tiptap/pm` | ^2 | ProseMirror peer dependency (required by Tiptap) | ✅ Client-only |
| `@tiptap/starter-kit` | ^2 | Bold, Italic, Strike, OrderedList, Blockquote | ✅ Client-only |
| `@tiptap/extension-link` | ^2 | Link insertion | ✅ Client-only |
| `@tiptap/extension-mention` | ^2 | @mention support | ✅ Client-only |
| `@tiptap/extension-placeholder` | ^2 | Placeholder text | ✅ Client-only |
| `zod` | ^3 | Schema validation (Server Action + client) | ✅ |

> **Note**: `react-hook-form` is NOT added. The existing codebase manages forms with
> vanilla React hooks, and the Write Kudo form has only 6 fields. Keeping it simple
> avoids an unnecessary dependency. Zod handles validation standalone.

---

## Implementation Strategy

> **TDD Mandate** (Constitution): Every phase follows Red → Green → Refactor.
> Tests are written BEFORE implementation code. Each phase below implicitly starts
> with writing failing tests for the deliverables, then implementing to make them pass.

### Phase 0: Asset & Token Preparation

**Goal**: Establish design foundation before any component code.

1. Add Write Kudo modal CSS tokens to `src/app/globals.css`:
   - `--color-modal-overlay`, `--color-text-dark`, `--color-text-hint`,
     `--color-text-required`, `--color-error-border`, `--color-toolbar-border`,
     `--color-toolbar-active`, `--color-chip-bg`, `--color-chip-text`,
     `--color-remove-icon`, `--color-disabled-bg`, `--color-disabled-text`,
     `--color-community-link`, `--shadow-modal`, `--shadow-dropdown`,
     `--border-input`, `--radius-modal`
2. Add i18n keys to `src/libs/i18n/sun-kudos.ts` under a new `writeKudo` namespace
3. Add TypeScript types to `src/types/kudos.ts`:
   - `WriteKudoPayload`, `WriteKudoResult`, `Hashtag`, `UploadResult`

### Phase 1: Database & API Foundation

**Goal**: Backend layer ready for frontend to consume.

1. **Database migrations**:
   - `kudos` table: `id`, `sender_id`, `receiver_id`, `honor_title`, `content` (HTML),
     `hashtags` (text[]), `images` (text[]), `is_anonymous`, `created_at`
   - `hashtags` table: `id`, `name`, `slug` (predefined list)
   - Storage bucket: `kudo-images` (public read, authenticated write)
   - RLS policies: authenticated users can INSERT kudos; users can read all kudos

2. **Route Handlers**:
   - `GET /api/hashtags` — query `hashtags` table, cache with `Cache-Control`
   - `POST /api/uploads` — validate auth (`getUser()`), validate file type + size,
     upload to Supabase Storage, return public URL

3. **Server Action**:
   - `submitKudo()` in `app/(home)/kudos/actions.ts`
   - Validates with Zod schema, calls `getUser()`, inserts into `kudos` table
   - Returns `{ success: true, kudo }` or `{ success: false, error }`

4. **Service layer**:
   - `createKudo(payload)` and `getHashtags()` in `kudos-service.ts`

### Phase 2: Core Modal Shell (US1, US5 — P1)

**Goal**: Modal opens/closes, form validates, submit works end-to-end.

1. `WriteKudoModal.tsx` — overlay + container + focus trap + Escape handler
   - Props: `isOpen`, `onClose`, `prefilledRecipient`, `hashtags[]`, `users[]`
   - Follows `ImageLightbox` pattern: `role="dialog"`, `aria-modal="true"`, keyboard handling

2. `RecipientField.tsx` — light-theme autocomplete
   - Adapts existing `SearchInput` pattern for white background
   - Pre-fills when `prefilledRecipient` is provided

3. `HonorTitleField.tsx` — simple text input with label + hint text

4. `ModalActionBar.tsx` — Cancel (`Hủy`) + Submit (`Gửi`) buttons
   - Submit disabled until all required fields filled
   - Loading spinner state during submission

5. Wire into `KudosHero.tsx`:
   - `onSelectUser` → `setIsModalOpen(true)` + `setSelectedRecipient(user)`
   - Render `<WriteKudoModal>` conditionally

6. Basic form validation flow (Zod) + submit to Server Action

### Phase 3: Rich Text Editor (US1 — P1)

**Goal**: Tiptap editor with formatting toolbar + @mention.

1. Install Tiptap packages
2. `KudoEditor.tsx`:
   - Tiptap editor with extensions: StarterKit, Link, Mention, Placeholder
   - Formatting toolbar (C.1–C.6): Bold, Italic, Strikethrough, OrderedList, Link, Blockquote
   - "Tiêu chuẩn cộng đồng" link (right-aligned)
   - @mention triggers user search API → suggestion popup
   - Hint text below: `Bạn có thể "@ + tên" để nhắc tới đồng nghiệp khác`

### Phase 4: Hashtag Selection (US2 — P1)

**Goal**: Tag picker with chip rendering.

1. `HashtagField.tsx`:
   - Label "Hashtag *" + chip list + "+ Hashtag" button
   - Dropdown/popover showing available hashtags (from props)
   - Pill chips with `×` close button
   - Max 5 enforcement (hide button at 5)
   - "Tối đa 5" note text

### Phase 5: Image Upload (US3 — P2)

**Goal**: Background upload with thumbnail preview.

1. `ImageUploadField.tsx`:
   - Hidden `<input type="file" accept="image/*" multiple>`
   - 56×56 thumbnails with red `×` remove overlay
   - Background upload via `fetch('/api/uploads', { method: 'POST', body: formData })`
   - Track `uploadingCount` for in-flight indicator
   - Max 5 enforcement (hide button at 5)
   - Error overlay on failed uploads

### Phase 6: Anonymous Mode + Polish (US4, US6 — P2)

**Goal**: Complete feature with edge case handling.

1. `AnonymousCheckbox.tsx`:
   - Toggle `isAnonymous` state
   - Conditionally show anonymous name input (if confirmed in Open Questions)

2. Edge case handling:
   - Upload failure: error overlay on thumbnail + toast
   - Zero search results: "Không tìm thấy kết quả"
   - Network timeout: clear loading, preserve data, show toast
   - Server 500: modal stays open, data preserved, toast
   - In-flight uploads on submit: wait for completion

3. Responsive behavior:
   - Mobile: full-screen modal, sticky action bar
   - Tablet: centered, max-width 600px
   - Desktop: centered, max-width 640px

4. Accessibility:
   - Focus trap within modal
   - Auto-focus recipient field on open
   - ARIA: `role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-required`
   - `aria-label` on all icon-only buttons
   - Error announcements: `role="alert"`

5. Animations (per design-style.md):
   - Modal appear/disappear: opacity + scale (200ms/150ms)
   - Chip add/remove: opacity + scale
   - Input focus: border transition

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Tiptap bundle size impacts cold start | Medium | Medium | Dynamic import (`next/dynamic`) with `ssr: false`; Tiptap is client-only |
| Tiptap not fully edge-compatible | Low | High | Tiptap is client-side only — never runs in Server Actions or Workers |
| No Supabase migrations exist yet (greenfield DB) | High | Medium | Start with migration files; use `supabase db push` for dev; seed hashtags |
| Image upload to Supabase Storage from Cloudflare Workers | Medium | High | Upload route handler: receive file on edge, stream to Supabase Storage API (HTTPS, no Node.js deps) |
| Open Questions (Q1–Q8) not resolved | High | Medium | Use reasonable defaults: `honorTitle.max=100`, `content.max=5000`, `imageSize.max=5MB`, no confirmation dialog, backdrop click closes. Flag in code with `// TODO: confirm with PM` |
| Form data loss on accidental close | Medium | Medium | Implement backdrop-click guard (or confirmation prompt — pending Q5/Q6) |

### Estimated Complexity

- **Frontend**: High (rich-text editor, file upload, multiple interactive states)
- **Backend**: Medium (CRUD + file upload, straightforward with Supabase)
- **Testing**: Medium (form validation, upload mocking, modal interactions)

---

## Integration Testing Strategy

### Test Scope

- [x] **Component interactions**: Modal ↔ Hero, Editor ↔ Toolbar, Form ↔ Validation
- [x] **External dependencies**: Supabase Auth, Supabase Storage, Supabase DB
- [x] **Data layer**: Kudos table insert, Storage upload
- [x] **User workflows**: Full write-kudo flow from hero click → submit → feed update

### Test Categories

| Category | Applicable | Key Scenarios |
|----------|------------|---------------|
| UI ↔ Logic | Yes | Form validation gating submit, field enable/disable, chip add/remove |
| App ↔ External API | Yes | Supabase insert, Storage upload, auth validation |
| App ↔ Data Layer | Yes | Kudo creation, hashtag lookup, image URL storage |
| Cross-platform | Yes | Modal responsive layout (mobile fullscreen vs desktop centered) |

### Test Environment

- **Environment type**: Local Supabase (via `supabase start`) + Vitest for unit, Playwright for E2E
- **Test data strategy**: Seeded hashtags; factory functions for KudoUser/KudoItem; mock Supabase client for unit tests
- **Isolation approach**: Transaction rollback for DB tests; fresh state per Playwright test

### Mocking Strategy

| Dependency | Strategy | Rationale |
|------------|----------|-----------|
| Supabase Auth | Mock (`getUser()`) | Unit tests don't need real auth |
| Supabase DB | Real (local) | Integration tests verify actual queries + RLS |
| Supabase Storage | Mock for unit, real for E2E | Upload logic needs real bucket in E2E |
| Tiptap Editor | Real (DOM) | Testing formatting requires real editor instance |

### Test Scenarios Outline

1. **Happy Path**
   - [ ] Open modal from hero search → recipient pre-filled
   - [ ] Fill all required fields → submit button enables
   - [ ] Submit → loading state → success toast → modal closes → kudo in feed

2. **Validation**
   - [ ] Submit with empty fields → inline errors shown
   - [ ] Exceed 5 hashtags → button hidden
   - [ ] Exceed 5 images → button hidden
   - [ ] Invalid file type → rejected with toast

3. **Error Handling**
   - [ ] Server 500 → modal stays open, data preserved, error toast
   - [ ] Upload failure → thumbnail error overlay
   - [ ] Network timeout → loading cleared, data preserved

4. **Accessibility**
   - [ ] Tab cycles within modal (focus trap)
   - [ ] Escape closes modal
   - [ ] Screen reader announces errors

### Coverage Goals

| Area | Target | Priority |
|------|--------|----------|
| Form validation logic | 90%+ | High |
| Server Action (submitKudo) | 90%+ | High |
| Upload route handler | 85%+ | High |
| Modal component interactions | 80%+ | Medium |
| Tiptap toolbar toggles | 70%+ | Low |

---

## Dependencies & Prerequisites

### Required Before Start

- [x] `constitution.md` reviewed and understood
- [x] `spec.md` approved (with 8 Open Questions flagged — use defaults)
- [x] `design-style.md` created and reviewed
- [ ] Supabase project configured locally (`supabase init` + `supabase start`)
- [ ] Tiptap + Zod packages installed

### External Dependencies

- **Supabase Storage**: Must be accessible from Cloudflare Workers for upload route handler
- **Hashtag seed data**: Need predefined list of hashtags (at minimum: #Dedicated, #Inspiring, #Creative, #Teamwork, #Leadership — visible in existing kudo mock data)

### Open Questions Defaults (for implementation — revisit with PM)

| Question | Default Used | Code Marker |
|----------|-------------|-------------|
| Q1: Danh hiệu max | 100 chars | `// TODO(Q1): confirm max` |
| Q2: Content max | 5000 chars, no counter | `// TODO(Q2): confirm max, counter` |
| Q3: Image size limit | 5 MB | `// TODO(Q3): confirm size` |
| Q4: Anonymous name | Optional, max 50, default "Ẩn danh" | `// TODO(Q4): confirm rules` |
| Q5: Discard confirmation | No dialog (immediate discard) | `// TODO(Q5): confirm UX` |
| Q6: Backdrop click | Closes modal | `// TODO(Q6): confirm UX` |
| Q7: Community URL | `/community-standards` (placeholder) | `// TODO(Q7): confirm URL` |
| Q8: Nav after submit | Returns to Live Board (same page) | N/A — modal overlay |

---

## Next Steps

After plan approval:

1. **Run** `/momorph.tasks` to generate task breakdown from this plan
2. **Review** tasks.md for parallelization opportunities
3. **Install** dependencies: `yarn add @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-mention @tiptap/extension-placeholder zod`
4. **Begin** Phase 0 (tokens + types + i18n) → Phase 1 (DB + API) → Phase 2+ (components)

---

## Notes

- The existing codebase uses **mock data** throughout (`kudos-service.ts`, `kudos-mock.ts`).
  This plan creates real Supabase integration for the Write Kudo flow. Existing read paths
  (feed, highlights, stats) remain on mock data until separately migrated.
- **No `react-hook-form`** — the spec's Implementation Notes mention `react-hook-form + zod`,
  but the existing codebase uses vanilla React hooks exclusively (see `SearchInput`,
  `KudoCardInteractions`, `FilterDropdown`). Adding a form library for 6 fields introduces
  unnecessary bundle size and learning overhead. Zod handles validation standalone. If form
  complexity grows (e.g., multi-step wizard), reconsider this decision.
- **Tiptap must be dynamically imported** via `next/dynamic({ ssr: false })` to avoid
  SSR issues and keep the server bundle edge-compatible.
- The `KudosHero` component currently uses `handleUnavailableRoute` as a placeholder
  for the `onSelectUser` callback. This is the exact integration point for the modal.
- All modal CSS tokens reference values from `design-style.md`. These must be added
  to `globals.css` before component work begins (Phase 0).
