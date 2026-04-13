# Feature Specification: Viết Kudo (Write Kudo Modal)

**Frame ID**: `ihQ26W78P2`
**Frame Name**: `Viết Kudo`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**MoMorph Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/ihQ26W78P2
**Created**: 2026-04-16
**Status**: Draft

---

## Overview

The **Viết Kudo** screen is a modal dialog that allows authenticated Sun* employees to
compose and send a kudos message to a colleague. It is triggered from the hero search
bar on the Sun* Kudos Live Board page (`MaZUn5xHXZ`).

The modal contains a structured form: recipient selection, an honor title, a rich-text
message editor, hashtag tagging, optional image attachments, and an anonymous-send
option. All required fields must be filled before the "Gửi" button becomes active.

**Target users**: All authenticated Sun* employees.

**Business context**: This is the primary content-creation flow for the Sun* Kudos
recognition system. Every kudo submitted via this form is saved to the database and
subsequently displayed on the Live Board.

**Visual reference**: `./design-style.md` (inherits from `../MaZUn5xHXZ-SunKudos/design-style.md`) |
Frame image: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/ihQ26W78P2

---

## Navigation Analysis

### Incoming Navigations (From)

| Source Screen | Trigger | Condition |
|---------------|---------|-----------|
| Sun* Kudos Live Board (`MaZUn5xHXZ`) | Hero search bar (first input) — user selects a recipient | Authenticated |
| Sun* Kudos Live Board (`MaZUn5xHXZ`) | Button "Ghi nhận" / pencil icon in hero area | Authenticated |

### Outgoing Navigations (To)

| Target Screen | Trigger Element | Condition | Notes |
|---------------|-----------------|-----------|-------|
| Live Board (`MaZUn5xHXZ`) | Button "Hủy" (H.1) | Always | Discard all changes, close modal |
| Live Board (`MaZUn5xHXZ`) | Button "Gửi" (H.2) on success | All required fields valid | Modal closes, new kudo appears in feed |

### Navigation Rules
- **Back behavior**: Clicking "Hủy" or pressing `Escape` closes the modal and returns focus to the underlying Live Board page.
- **Backdrop click**: ⚠️ TBD — Does clicking the dimmed overlay close the modal? (See Open Questions)
- **Deep link support**: No — this is a modal overlay; no dedicated URL route.
- **Auth required**: Yes — unauthenticated users are redirected to login.

---

## Layout Structure

```
┌──────────────────────────────────────────────────────────────┐
│  (Live Board background — dimmed overlay)                    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  [A] Tiêu đề: "Gửi lời cảm ơn và ghi nhận đến đồng   │  │
│  │      đội" (centered, bold)                            │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  [B] Người nhận *                                     │  │
│  │      └── [B.2] Search autocomplete dropdown           │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  [Danh hiệu *]                                        │  │
│  │      └── Text input (honor/title for this kudo)       │  │
│  │      └── Hint: "Ví dụ: Người truyền động lực cho tôi.│  │
│  │            Danh hiệu sẽ hiển thị làm tiêu đề Kudos   │  │
│  │            của bạn."                                   │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  [C] Formatting toolbar: B | I | S | 1. | 🔗 | ""    │  │
│  │      + "Tiêu chuẩn cộng đồng" (link, right-aligned)  │  │
│  │  [D] Content textarea                                  │  │
│  │      └── [D.1] Hint: "@+tên để nhắc đồng nghiệp"     │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  [E] Hashtag *                                        │  │
│  │      └── [E.1] Label "Hashtag *"                      │  │
│  │      └── [E.2] "+ Hashtag" button + chip list        │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  [F] Image (optional)                                 │  │
│  │      └── [F.1] Label "Image"                          │  │
│  │      └── Thumbnail row + "× remove" + "+ Image"      │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  [G] ☐ Gửi lời cảm ơn và ghi nhận ẩn danh           │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │  [H] Action bar                                       │  │
│  │      [H.1] Hủy ×          [H.2] Gửi ▷ (yellow)      │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Schema

### Component Hierarchy

```
Modal (ihQ26W78P2)
├── A  — ModalTitle (Atom / TEXT)
├── B  — RecipientField (Organism / FRAME)
│   ├── B.1 — Label "Người nhận *" (Molecule / INSTANCE)
│   └── B.2 — SearchAutocomplete (Molecule / INSTANCE)
├── DanhHieu — HonorTitleField (Molecule / FRAME)
│   ├── Label "Danh hiệu *"
│   ├── TextInput
│   └── HintText
├── C  — FormattingToolbar (Organism / FRAME)
│   ├── C.1 — BoldToggle (Atom / INSTANCE)
│   ├── C.2 — ItalicToggle (Atom / INSTANCE)
│   ├── C.3 — StrikethroughToggle (Atom / INSTANCE)
│   ├── C.4 — NumberListToggle (Atom / INSTANCE)
│   ├── C.5 — LinkInsert (Atom / INSTANCE)
│   ├── C.6 — QuoteToggle (Atom / INSTANCE)
│   └── CommunityStandardLink (Atom)
├── D  — ContentTextarea (Molecule / INSTANCE)
│   └── D.1 — MentionHint (Atom / FRAME)
├── E  — HashtagField (Organism / FRAME)
│   ├── E.1 — Label "Hashtag *" (Atom / INSTANCE)
│   └── E.2 — TagGroup (Molecule / FRAME)
│       ├── HashtagChip[] (Atom)
│       └── AddHashtagButton (Atom)
├── F  — ImageUploadField (Organism / FRAME)
│   ├── F.1 — Label "Image" (Atom / INSTANCE)
│   ├── ImageThumbnail[0..5] (Molecule)
│   └── AddImageButton (Atom)
├── G  — AnonymousCheckbox (Molecule / INSTANCE)
└── H  — ActionBar (Organism / FRAME)
    ├── H.1 — CancelButton (Atom / INSTANCE)
    └── H.2 — SubmitButton (Atom / INSTANCE)
```

### Main Components

| ID | Component | Type | Required | Description |
|----|-----------|------|----------|-------------|
| A | ModalTitle | Atom | — | Centered heading: "Gửi lời cảm ơn và ghi nhận đến đồng đội" |
| B | RecipientField | Organism | ✅ | Label + search/autocomplete to pick recipient |
| B.2 | SearchAutocomplete | Molecule | ✅ | 514×56px search input; dropdown suggestions from API |
| Danh hiệu | HonorTitleField | Molecule | ✅ | Short text title that becomes the kudo post heading |
| C | FormattingToolbar | Organism | — | B / I / S / Number / Link / Quote toggles |
| D | ContentTextarea | Molecule | ✅ | Rich-text body of the kudo; supports @mention |
| D.1 | MentionHint & CharCounter | Atom | — | Static hint: 'Bạn có thể "@ + tên" để nhắc tới đồng nghiệp khác'. ⚠️ Figma node also references a character counter ("bộ đếm ký tự") — see Open Questions. |
| E | HashtagField | Organism | ✅ | Hashtag chips; 1–5 tags required |
| E.2 | TagGroup | Molecule | ✅ | "+ Hashtag" button + rendered chip list with ×-remove |
| F | ImageUploadField | Organism | ❌ | Thumbnail row + "+ Image" button; max 5 images |
| G | AnonymousCheckbox | Molecule | ❌ | Toggle anonymous submission |
| H.1 | CancelButton | Atom | — | Closes modal, discards data |
| H.2 | SubmitButton | Atom | — | Validates + submits; disabled until required fields filled |

---

## Form Fields

| Field | Type | Required | Max | Validation | Placeholder / Hint |
|-------|------|----------|-----|------------|--------------------|
| Người nhận (B.2) | autocomplete | ✅ | 1 | Must select from search results | "Tìm kiếm" |
| Danh hiệu | text | ✅ | ⚠️ TBD | Non-empty, max length TBD | "Dành tặng một danh hiệu cho đồng đội" / Hint: "Ví dụ: Người truyền động lực cho tôi. Danh hiệu sẽ hiển thị làm tiêu đề Kudos của bạn." |
| Nội dung (D) | rich-text | ✅ | ⚠️ TBD | Non-empty, max length TBD | "Hãy gửi gắm lời cám ơn và ghi nhận đến đồng đội tại đây nhé!" |
| Hashtag (E) | tag-select | ✅ | 5 | 1 ≤ count ≤ 5 | "+ Hashtag / Tối đa 5" |
| Image (F) | file-upload | ❌ | 5 | Image MIME types; max 5 files; max file size ⚠️ TBD | "+ Image / Tối đa 5" |
| Gửi ẩn danh (G) | checkbox | ❌ | — | Boolean toggle | — |

### Validation Rules

```typescript
const schema = z.object({
  recipient: z.string().min(1, "Vui lòng chọn người nhận"),           // B.2
  honorTitle: z.string()
    .min(1, "Vui lòng nhập danh hiệu")
    .max(/* TBD */, "Danh hiệu quá dài"),                             // Danh hiệu — max length TBD
  content: z.string()
    .min(1, "Vui lòng nhập nội dung")
    .max(/* TBD */, "Nội dung quá dài"),                               // D — max length TBD
  hashtags: z
    .array(z.string())
    .min(1, "Vui lòng thêm ít nhất 1 hashtag")
    .max(5, "Tối đa 5 hashtag"),                                       // E
  images: z.array(z.instanceof(File)).max(5).optional(),              // F — max file size TBD
  isAnonymous: z.boolean().default(false),                             // G
});
```

---

## API Mapping

### On Modal Open

| API | Method | Purpose | Response Usage |
|-----|--------|---------|----------------|
| `/api/users/search?q=` | GET | Autocomplete recipient search | Populate B.2 dropdown suggestions |
| `/api/hashtags` | GET | Load predefined hashtag list | Populate E.2 dropdown options |

### On User Action

| Action | API | Method | Request Body | Response |
|--------|-----|--------|--------------|----------|
| Submit kudo (H.2) | `/api/kudos` | POST | `{recipientId, honorTitle, content, hashtags, images?, isAnonymous}` | `{kudo}` — new kudo object |
| Upload image (F) | `/api/uploads` | POST (multipart) | `FormData { file }` | `{url}` — CDN URL |

### Error Handling

| Error Code | Message | UI Action |
|------------|---------|-----------|
| 400 | Validation failed | Show inline field errors |
| 401 | Unauthenticated | Redirect to login |
| 413 | Image too large | Show per-image error toast |
| 422 | Business rule violation | Show toast with server message |
| 500 | Server error | Show retry toast |

---

## State Management

### Local State

| State | Type | Initial | Purpose |
|-------|------|---------|---------|
| `recipient` | `{id, name} \| null` | `null` | Selected recipient |
| `honorTitle` | `string` | `""` | Kudo title/honor text |
| `content` | `string` (HTML) | `""` | Rich-text body |
| `hashtags` | `string[]` | `[]` | Selected hashtag chips |
| `images` | `File[]` | `[]` | Attached image files |
| `isAnonymous` | `boolean` | `false` | Anonymous mode flag |
| `imageUrls` | `string[]` | `[]` | CDN URLs returned from background uploads |
| `uploadingCount` | `number` | `0` | Number of images currently uploading in background |
| `isSubmitting` | `boolean` | `false` | Loading state on submit |
| `errors` | `Record<string, string>` | `{}` | Field-level validation errors |

---

## UI States

### Default / Empty
- All fields empty; "Gửi" button **disabled** (grayed out).
- All labels and placeholders visible.

### Filling In Progress
- "Gửi" becomes **enabled** only when `recipient`, `honorTitle`, `content`, and at
  least 1 `hashtag` are filled.
- Each required field shows a red border + error message below when blurred while
  empty.

### Hashtag Management
- `"+ Hashtag"` button opens a dropdown/popover listing available hashtags.
- Selected hashtags render as pill chips with a `×` close button.
- When 5 hashtags are selected, the `"+ Hashtag"` button is **hidden**.

### Image Upload
- Each selected image renders as a 56×56 px square thumbnail with a red `×` overlay
  button to remove it.
- When 5 images are uploaded, the `"+ Image"` button is **hidden**.
- Images are uploaded immediately on selection (background upload); submission
  includes the returned CDN URLs.

### Anonymous Mode (G toggled ON)
- A text input appears asking for the anonymous display name (or a fixed label).
- The sender's name is replaced with the provided anonymous name or a default
  placeholder in the published kudo.

### Submitting
- "Gửi" button shows a loading spinner; both "Hủy" and "Gửi" are **disabled**.
- Inputs are non-interactive during submission.

### Success
- Modal closes.
- A success toast appears on the underlying Live Board page.
- The new kudo is prepended to the feed.

### Error
- Modal stays open.
- An error toast is shown at the top of the modal with the server error message.
- "Gửi" becomes clickable again.

---

## Formatting Toolbar (C)

| Button | ID | Keyboard | Action |
|--------|----|----------|--------|
| **B** (Bold) | C.1 | `Ctrl+B` | Toggle `<strong>` on selection |
| _I_ (Italic) | C.2 | `Ctrl+I` | Toggle `<em>` on selection |
| ~~S~~ (Strikethrough) | C.3 | — | Toggle `<s>` on selection |
| 1. (Number list) | C.4 | — | Toggle ordered list |
| 🔗 (Link) | C.5 | `Ctrl+K` | Open link-insert popover: URL input + "open in new tab" checkbox |
| `"` (Quote) | C.6 | — | Toggle `<blockquote>` on current paragraph |

A "Tiêu chuẩn cộng đồng" (Community Standards) link is placed to the right of the
toolbar and opens the community guidelines page in a new tab.

---

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Focus trap | Tab cycles only within the open modal |
| Close on Escape | `keydown` handler closes modal via "Hủy" action |
| Focus management | Auto-focus "Người nhận" input (B.2) on modal open |
| ARIA roles | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title A |
| Required fields | `aria-required="true"` on B.2, Danh hiệu, D, E |
| Error announcement | `role="alert"` or `aria-live="assertive"` on error messages |
| Screen reader labels | All icon-only toolbar buttons have `aria-label` |

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (<768px) | Full-screen modal; stacked fields; action bar fixed at bottom |
| Tablet (768–1279px) | Centered modal, max-width 600px; padded sides |
| Desktop (≥1280px) | Centered modal, max-width 640px; no overflow |

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Open and Fill the Write Kudo Form (Priority: P1)

**As an** authenticated Sun* employee,
**I want to** open the write-kudo modal and fill in all required fields,
**So that** I can send an appreciation message to a colleague.

**Acceptance Scenarios**:

1. **Given** the user is on the Live Board, **When** they click the first hero search
   input and select a colleague, **Then** the "Viết Kudo" modal opens with the
   recipient (B.2) pre-filled and focus placed on the "Danh hiệu" field.

2. **Given** the modal is open, **When** the user clears the recipient field and clicks
   "Gửi", **Then** a red border and error "Vui lòng chọn người nhận" appears below B.2
   and the modal does not close.

3. **Given** the recipient is filled, **When** the user types a title in "Danh hiệu"
   and at least one character in the content area, **Then** the "Gửi" button remaining
   disabled until at least 1 hashtag is also selected.

4. **Given** all required fields (recipient, danh hiệu, content, ≥1 hashtag) are
   filled, **When** the user clicks "Gửi", **Then** the button shows a loading spinner,
   inputs are disabled, and a POST to `/api/kudos` is made.

5. **Given** the API returns 200 OK, **When** the response is received, **Then** the
   modal closes, a success toast appears, and the new kudo is visible at the top of
   the feed on the Live Board.

---

### User Story 2 — Hashtag Selection (Priority: P1)

**As an** authenticated Sun* employee composing a kudo,
**I want to** select 1–5 hashtags,
**So that** the kudo is tagged and discoverable by category.

**Acceptance Scenarios**:

1. **Given** the hashtag field (E) is empty, **When** the user clicks "+ Hashtag",
   **Then** a dropdown opens listing available hashtags.

2. **Given** a hashtag is selected, **When** chosen from the dropdown, **Then** it
   appears as a pill chip with a `×` icon inside the E.2 tag group.

3. **Given** 5 hashtags are selected, **When** the 5th is added, **Then** the
   "+ Hashtag" button is hidden and no further addition is possible.

4. **Given** a chip is rendered, **When** the user clicks its `×` button, **Then** the
   chip is removed and the tag count decreases; "+ Hashtag" reappears if it was hidden.

5. **Given** the user submits without any hashtag, **When** "Gửi" is clicked (if
   somehow enabled), **Then** an error "Vui lòng thêm ít nhất 1 hashtag" is shown
   below E.

---

### User Story 3 — Image Attachment (Priority: P2)

**As an** authenticated Sun* employee composing a kudo,
**I want to** optionally attach up to 5 images,
**So that** I can add visual context to my kudos message.

**Acceptance Scenarios**:

1. **Given** the image field (F) has no images, **When** the user clicks "+ Image",
   **Then** the OS file picker opens filtered to image MIME types.

2. **Given** the user selects a valid image file, **When** the file is chosen,
   **Then** a 56×56 px thumbnail with a red `×` overlay renders immediately and an
   upload request is sent in the background.

3. **Given** the user selects an invalid file type (e.g., `.pdf`), **When** confirmed,
   **Then** an error toast "Chỉ chấp nhận file ảnh" is shown and the file is rejected.

4. **Given** 5 images are uploaded, **When** the 5th thumbnail is rendered,
   **Then** the "+ Image" button disappears.

5. **Given** a thumbnail is displayed, **When** the user clicks its `×` button,
   **Then** the thumbnail is removed from the list and the file is no longer included
   in the submission.

---

### User Story 4 — Anonymous Submission (Priority: P2)

**As an** authenticated Sun* employee,
**I want to** optionally send my kudo anonymously,
**So that** the recipient does not know who sent it.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user checks "Gửi lời cảm ơn và ghi nhận
   ẩn danh" (G), **Then** the checkbox is checked and `isAnonymous = true` will be
   included in the payload.

2. **Given** G is checked, **When** the kudo is submitted and displayed on the feed,
   **Then** the sender's name is replaced with an anonymous placeholder.

3. **Given** G is unchecked (default), **When** the kudo is submitted,
   **Then** the sender's real name and avatar are shown in the feed.

---

### User Story 5 — Cancel and Discard (Priority: P1)

**As an** authenticated Sun* employee,
**I want to** cancel without saving,
**So that** partial data is not accidentally published.

**Acceptance Scenarios**:

1. **Given** the modal has partial data, **When** the user clicks "Hủy" (H.1),
   **Then** the modal closes and all entered data is discarded (no API call).

2. **Given** the modal is open, **When** the user presses the `Escape` key,
   **Then** the behavior is identical to clicking "Hủy".

3. **Given** the modal is in "Submitting" state, **When** the request is in-flight,
   **Then** both H.1 and H.2 are disabled — the user cannot cancel mid-submission.

---

### User Story 6 — Error & Edge Case Handling (Priority: P2)

**As an** authenticated Sun* employee composing a kudo,
**I want** errors to be handled gracefully,
**So that** I don't lose my work or get confused.

**Acceptance Scenarios**:

1. **Given** the user types in the recipient search (B.2), **When** the API returns
   zero results, **Then** the dropdown shows "Không tìm thấy kết quả" and the user
   cannot proceed without a valid selection.

2. **Given** the user selects an image and the background upload fails (network error
   or 413), **When** the upload error is received, **Then** the thumbnail shows an
   error overlay icon, a toast "Tải ảnh thất bại" is shown, and the failed image is
   not included in the final payload.

3. **Given** images are still uploading in the background (`uploadingCount > 0`),
   **When** the user clicks "Gửi", **Then** the submit button shows a spinner and
   waits for all uploads to complete before sending the POST request. If any upload
   failed, the user is prompted to remove or retry the failed image(s).

4. **Given** the user submits the form, **When** the API returns a 500 error,
   **Then** the modal stays open, all entered data is preserved, an error toast
   "Đã xảy ra lỗi, vui lòng thử lại" is shown, and "Gửi" becomes clickable again.

5. **Given** the user has a slow network, **When** the submit request times out
   (>30s), **Then** the loading state is cleared, the modal stays open with data
   preserved, and a timeout error toast is shown.

---

## Design Tokens (Screen-specific)

Inherits all tokens from `../MaZUn5xHXZ-SunKudos/design-style.md`. Additional or
clarified usages for this screen:

| Token | Value | Usage in this screen |
|-------|-------|----------------------|
| `--color-bg-dark` | `#00101A` | Modal overlay background dimming layer |
| `--color-white` | `#FFFFFF` | Modal dialog background |
| `--color-border` | `#998C5F` | Input field borders |
| `--color-accent-yellow` | `#FFEA9E` | "Gửi" button background |
| `--color-text-required` | `#EF4444` | Required `*` asterisk color, error messages |
| `--color-btn-secret-box-text` | `#00101A` | "Gửi" button text color |
| `--radius-card` | `16px` | Modal container border radius |
| `--radius-btn` | `8px` | "Hủy" / "Gửi" button corners |
| `--radius-pill` | `100px` | Hashtag chip border radius |
| `--border-card` | `1px solid #998C5F` | Input and modal border |

---

## Implementation Notes

### Dependencies
- Rich-text editor: `tiptap` (extensions: Bold, Italic, Strike, OrderedList, Link, Blockquote, Mention)
- Form state: `react-hook-form` + `zod`
- File upload: browser `<input type="file" accept="image/*" multiple>`
- Autocomplete: custom dropdown or `react-select` / `cmdk`

### Special Considerations
- **Pre-filled recipient**: When the modal is opened from the hero search bar with a
  selected user, the recipient field (B.2) is pre-populated and the search input is
  pre-filled with the selected name.
- **@mention**: The content editor should call the user-search API when `@` is typed
  and show a mention-suggestion popup; selecting a suggestion inserts a `@mention` node.
- **Background image upload**: Images must be uploaded as soon as they are selected
  (not on form submit) to keep the final submit latency low. Store CDN URLs in local
  state; include them in the final POST payload.
- **Toolbar "Tiêu chuẩn cộng đồng" link**: Opens community guidelines in a new tab
  (`target="_blank" rel="noopener noreferrer"`).
- **Disable submit on in-flight**: Once "Gửi" is clicked, debounce and disable the
  button until the API response is received to prevent duplicate submissions.

---

## Open Questions (Review: 2026-04-16)

> These items **block implementation** until resolved. Each is marked with ⚠️ TBD
> inline in the relevant section above.

### Business Logic

- **Q1 — Danh hiệu max length**: What is the maximum character count for the honor
  title field? (Impacts DB column size and UI truncation.)
- **Q2 — Content max length**: What is the maximum character count for the kudo body?
  The Figma node D.1 is named "Gợi ý **và bộ đếm ký tự**" (hint and character counter),
  suggesting a visible character counter was planned. Should it be implemented? If yes,
  what is the limit?
- **Q3 — Image file size limit**: The error table lists a 413 response, but no max file
  size per image is specified. What is the limit (e.g., 5 MB, 10 MB)?
- **Q4 — Anonymous name input**: When "Gửi ẩn danh" is checked, a text field for an
  anonymous display name appears (confirmed in Figma node specs). Is this name **required**
  when anonymous mode is on? What is its max length? What is the default placeholder if
  the user leaves it blank?
- **Q5 — Confirmation dialog on discard**: When the user clicks "Hủy" or presses Escape
  with partially filled data, should a "Bạn có chắc muốn hủy?" confirmation dialog appear,
  or is immediate discard the intended behavior?

### Design / Visual

- **Q6 — Backdrop click**: Does clicking the dimmed overlay (outside the modal) close
  the modal? Standard UX says yes, but since this is a form with user data, it could be
  intentionally disabled to prevent accidental closure.
- **Q7 — "Tiêu chuẩn cộng đồng" URL**: The community standards link in the toolbar
  opens a new tab — what is the target URL?

### Technical / Cross-document

- **Q8 — Navigation target after submit**: The spec says the modal returns to the
  **Live Board** (`MaZUn5xHXZ`), but `SCREENFLOW.md` shows
  `WriteKudo -->|Submit| Homepage`. Which is correct? (Since the modal opens *from* the
  Live Board, returning to Live Board seems more logical — the SCREENFLOW graph likely
  needs updating.)

---

## Analysis Metadata

| Property | Value |
|----------|-------|
| Frame ID | `ihQ26W78P2` |
| Frame Name | Viết Kudo |
| File Key | `9ypp4enmFmdK3YAFJLIu6C` |
| Analysis Date | 2026-04-16 |
| Status | Draft — pending resolution of Open Questions |
| Related Screen | Sun* Kudos Live Board (`MaZUn5xHXZ`) |
| Review Date | 2026-04-16 |
| Reviewer | QA Spec Review |
