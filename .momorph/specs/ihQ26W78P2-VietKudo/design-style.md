# Design Style: Viết Kudo (Write Kudo Modal)

**Frame ID**: `ihQ26W78P2`
**Frame Name**: `Viết Kudo`
**MoMorph Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/ihQ26W78P2
**Extracted At**: 2026-04-16
**Inherits From**: `../MaZUn5xHXZ-SunKudos/design-style.md`

---

## Design Tokens

### Colors (Modal-specific)

All base tokens are inherited from the parent Sun* Kudos design-style. The following
are tokens specific to or clarified for the Write Kudo modal:

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| `--color-bg-dark` | `#00101A` | 100% | Overlay dimming layer behind modal |
| `--color-white` | `#FFFFFF` | 100% | Modal dialog background |
| `--color-border` | `#998C5F` | 100% | Input field borders, modal border |
| `--color-accent-yellow` | `#FFEA9E` | 100% | "Gui" button background, required `*` asterisk color |
| `--color-btn-secret-box-text` | `#00101A` | 100% | "Gui" button text, modal title text, label text |
| `--color-text-dark` | `#00101A` | 100% | Modal title, form labels, input text |
| `--color-text-hint` | `#6B7280` | 100% | Placeholder text, hint text below fields |
| `--color-text-required` | `#EF4444` | 100% | Required asterisk `*` and error messages |
| `--color-error-border` | `#EF4444` | 100% | Input border on validation error |
| `--color-overlay` | `#00101A` | 60% | Backdrop overlay (`rgba(0,16,26,0.6)`) |
| `--color-toolbar-border` | `#E5E7EB` | 100% | Toolbar button separator lines |
| `--color-toolbar-active` | `#F3F4F6` | 100% | Toolbar button active/pressed state background |
| `--color-chip-bg` | `#F3F4F6` | 100% | Hashtag chip background (in modal context) |
| `--color-chip-text` | `#374151` | 100% | Hashtag chip text (in modal context) |
| `--color-remove-icon` | `#EF4444` | 100% | Red `x` overlay on image thumbnails |
| `--color-disabled-bg` | `#E5E7EB` | 100% | Disabled button background (Submit when incomplete) |
| `--color-disabled-text` | `#9CA3AF` | 100% | Disabled button text color |
| `--color-community-link` | `#D97706` | 100% | "Tieu chuan cong dong" link, "+ Hashtag/Image" button accent |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Color | Usage |
|------------|-------------|------|--------|-------------|-------|-------|
| `--text-modal-title` | Montserrat | 24px | 700 | 32px | `#00101A` | "Gui loi cam on va ghi nhan den dong doi" |
| `--text-form-label` | Montserrat | 14px | 700 | 20px | `#00101A` | "Nguoi nhan", "Danh hieu", "Hashtag", "Image" |
| `--text-required-star` | Montserrat | 14px | 700 | 20px | `#EF4444` | Required `*` after labels |
| `--text-input-value` | Montserrat | 14px | 400 | 20px | `#00101A` | Input field typed text |
| `--text-input-placeholder` | Montserrat | 14px | 400 | 20px | `#9CA3AF` | "Tim kiem", placeholder text |
| `--text-hint` | Montserrat | 12px | 400 | 16px | `#6B7280` | Hint below Danh hieu, @mention hint |
| `--text-toolbar-btn` | Montserrat | 14px | 600 | 20px | `#374151` | Toolbar button icons (B, I, S) |
| `--text-community-link` | Montserrat | 14px | 500 | 20px | `#D97706` | "Tieu chuan cong dong" link |
| `--text-chip` | Montserrat | 12px | 500 | 16px | `#374151` | Hashtag chip text |
| `--text-btn-cancel` | Montserrat | 14px | 600 | 20px | `#00101A` | "Huy" button text |
| `--text-btn-submit` | Montserrat | 14px | 700 | 20px | `#00101A` | "Gui" button text |
| `--text-checkbox-label` | Montserrat | 14px | 400 | 20px | `#374151` | "Gui loi cam on va ghi nhan an danh" |
| `--text-add-btn` | Montserrat | 12px | 500 | 16px | `#D97706` | "+ Hashtag", "+ Image" button text |
| `--text-max-note` | Montserrat | 11px | 400 | 14px | `#9CA3AF` | "Toi da 5" note text |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| `--spacing-modal-px` | 32px | Modal internal horizontal padding |
| `--spacing-modal-py` | 32px | Modal internal vertical padding |
| `--spacing-field-gap` | 20px | Vertical gap between form fields |
| `--spacing-label-input` | 8px | Gap between label and its input field |
| `--spacing-hint-gap` | 4px | Gap between input and hint text below |
| `--spacing-toolbar-gap` | 0px | Toolbar buttons are flush (divided by borders) |
| `--spacing-chip-gap` | 8px | Gap between hashtag chips |
| `--spacing-thumbnail-gap` | 8px | Gap between image thumbnails |
| `--spacing-action-gap` | 16px | Gap between "Huy" and "Gui" buttons |
| `--spacing-checkbox-gap` | 8px | Gap between checkbox and label text |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| `--radius-modal` | 16px | Modal container border radius |
| `--radius-input` | 8px | Input fields, textarea border radius |
| `--radius-btn` | 8px | "Huy" / "Gui" button corners |
| `--radius-pill` | 100px | Hashtag chip border radius |
| `--radius-toolbar-btn` | 4px | Individual toolbar toggle buttons |
| `--radius-thumbnail` | 8px | Image thumbnail border radius |
| `--radius-checkbox` | 4px | Checkbox border radius |
| `--border-modal` | `1px solid #998C5F` | Modal container border |
| `--border-input` | `1px solid #D1D5DB` | Default input field border |
| `--border-input-focus` | `1px solid #998C5F` | Input field border on focus |
| `--border-input-error` | `1px solid #EF4444` | Input field border on error |
| `--border-toolbar` | `1px solid #E5E7EB` | Toolbar section border (top + bottom) |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| `--shadow-modal` | `0 8px 32px rgba(0,0,0,0.3)` | Modal container shadow |
| `--shadow-dropdown` | `0 4px 16px rgba(0,0,0,0.15)` | Autocomplete/hashtag dropdown |

---

## Layout Specifications

### Modal Container

| Property | Value | CSS |
|----------|-------|-----|
| position | fixed, centered | `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)` |
| max-width | 640px | `max-width: 640px` |
| width | 90vw (mobile) / 640px (desktop) | `width: min(90vw, 640px)` |
| max-height | 90vh | `max-height: 90vh` |
| overflow-y | auto | `overflow-y: auto` |
| background | `#FFFFFF` | `background: var(--color-white)` |
| border | `1px solid #998C5F` | `border: var(--border-modal)` |
| border-radius | 16px | `border-radius: var(--radius-modal)` |
| padding | 32px | `padding: var(--spacing-modal-px)` |
| box-shadow | `0 8px 32px rgba(0,0,0,0.3)` | `box-shadow: var(--shadow-modal)` |
| z-index | 50 | `z-index: 50` |

### Overlay Backdrop

| Property | Value | CSS |
|----------|-------|-----|
| position | fixed | `position: fixed; inset: 0` |
| background | `rgba(0,16,26,0.6)` | `background: var(--color-overlay)` |
| z-index | 40 | `z-index: 40` |

---

## Component Style Details

### A — Modal Title

| Property | Value | CSS |
|----------|-------|-----|
| text-align | center | `text-align: center` |
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 24px | `font-size: 24px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 32px | `line-height: 32px` |
| color | `#00101A` | `color: var(--color-text-dark)` |
| margin-bottom | 24px | `margin-bottom: 24px` |

### B — Recipient Field (Nguoi nhan)

#### B.1 — Label

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| color | `#00101A` | `color: var(--color-text-dark)` |
| required-star | `#EF4444` | `color: var(--color-text-required)` |

#### B.2 — Search Autocomplete Input

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% (fills container) | `width: 100%` |
| height | 56px | `height: 56px` |
| border | `1px solid #D1D5DB` | `border: var(--border-input)` |
| border-radius | 8px | `border-radius: var(--radius-input)` |
| padding | 16px | `padding: 16px` |
| font-size | 14px | `font-size: 14px` |
| color | `#00101A` | `color: var(--color-text-dark)` |
| placeholder-color | `#9CA3AF` | `color: var(--color-text-hint)` |
| dropdown-icon | right-aligned chevron (20px) | `position: absolute; right: 16px` |

**States:**

| State | Changes |
|-------|---------|
| Default | border: 1px solid #D1D5DB, bg: white |
| Focus | border-color: #998C5F, box-shadow: 0 0 0 2px rgba(153,140,95,0.15) |
| Filled | text color: #00101A, dropdown icon remains |
| Error | border-color: #EF4444, error text below in red |
| Disabled | opacity: 0.5, cursor: not-allowed |

### Danh hieu — Honor Title Field

#### Input

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| height | 56px | `height: 56px` |
| border | `1px solid #D1D5DB` | `border: var(--border-input)` |
| border-radius | 8px | `border-radius: var(--radius-input)` |
| padding | 16px | `padding: 16px` |
| placeholder | "Danh tang mot danh hieu cho dong doi" | |

#### Hint Text

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 12px | `font-size: 12px` |
| font-weight | 400 | `font-weight: 400` |
| color | `#6B7280` | `color: var(--color-text-hint)` |
| margin-top | 4px | `margin-top: var(--spacing-hint-gap)` |
| content | "Vi du: Nguoi truyen dong luc cho toi. Danh hieu se hien thi lam tieu de Kudos cua ban." | |

**States:** Same as B.2 (Default, Focus, Filled, Error, Disabled).

### C — Formatting Toolbar

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| border | `1px solid #E5E7EB` (top and bottom) | `border-top: var(--border-toolbar); border-bottom: var(--border-toolbar)` |
| height | 40px | `height: 40px` |
| background | `#FFFFFF` | `background: white` |

#### Toolbar Toggle Buttons (C.1–C.6)

| Property | Value | CSS |
|----------|-------|-----|
| width | 40px | `width: 40px` |
| height | 40px | `height: 40px` |
| display | flex, center | `display: flex; align-items: center; justify-content: center` |
| border-right | `1px solid #E5E7EB` | `border-right: 1px solid var(--color-toolbar-border)` |
| cursor | pointer | `cursor: pointer` |
| icon-size | 16px | `font-size: 16px` |

**States:**

| State | Changes |
|-------|---------|
| Default | bg: transparent, color: #374151 |
| Hover | bg: #F9FAFB |
| Active (toggled ON) | bg: #F3F4F6, color: #00101A, font-weight: 700 |
| Disabled | opacity: 0.4, cursor: not-allowed |

#### "Tieu chuan cong dong" Link

| Property | Value | CSS |
|----------|-------|-----|
| position | right-aligned in toolbar | `margin-left: auto` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 500 | `font-weight: 500` |
| color | `#D97706` | `color: var(--color-community-link)` |
| text-decoration | none (underline on hover) | `text-decoration: none` |
| target | `_blank` | `target="_blank" rel="noopener noreferrer"` |

### D — Content Textarea

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| min-height | 120px | `min-height: 120px` |
| border | none (contained within toolbar-bordered section) | `border: none` |
| border-bottom | `1px solid #E5E7EB` | `border-bottom: 1px solid var(--color-toolbar-border)` |
| padding | 12px 16px | `padding: 12px 16px` |
| font-size | 14px | `font-size: 14px` |
| line-height | 20px | `line-height: 20px` |
| color | `#00101A` | `color: var(--color-text-dark)` |
| placeholder | "Hay gui gam loi cam on va ghi nhan den dong doi tai day nhe!" | |
| resize | vertical | `resize: vertical` |

#### D.1 — Mention Hint

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 12px | `font-size: 12px` |
| color | `#6B7280` | `color: var(--color-text-hint)` |
| text-align | center | `text-align: center` |
| margin-top | 8px | `margin-top: 8px` |
| content | 'Ban co the "@ + ten" de nhac toi dong nghiep khac' | |

### E — Hashtag Field

#### E.2 — Tag Group / Hashtag Chips

| Property | Value | CSS |
|----------|-------|-----|
| display | flex, wrap | `display: flex; flex-wrap: wrap` |
| gap | 8px | `gap: var(--spacing-chip-gap)` |
| align-items | center | `align-items: center` |

#### Hashtag Chip (individual)

| Property | Value | CSS |
|----------|-------|-----|
| padding | 4px 12px | `padding: 4px 12px` |
| border-radius | 100px | `border-radius: var(--radius-pill)` |
| background | `#F3F4F6` | `background: var(--color-chip-bg)` |
| font-size | 12px | `font-size: 12px` |
| font-weight | 500 | `font-weight: 500` |
| color | `#374151` | `color: var(--color-chip-text)` |
| close-icon | `x` (12px, right of text) | `margin-left: 4px; cursor: pointer` |

#### "+ Hashtag" Button

| Property | Value | CSS |
|----------|-------|-----|
| display | inline-flex | `display: inline-flex; align-items: center; gap: 4px` |
| padding | 4px 12px | `padding: 4px 12px` |
| border | `1px dashed #D97706` | `border: 1px dashed var(--color-community-link)` |
| border-radius | 100px | `border-radius: 100px` |
| background | transparent | `background: transparent` |
| color | `#D97706` | `color: var(--color-community-link)` |
| font-size | 12px | `font-size: 12px` |
| font-weight | 500 | `font-weight: 500` |
| icon | `+` (12px, before text) | |
| visibility | hidden when 5 hashtags selected | |

### F — Image Upload Field

#### Image Thumbnail

| Property | Value | CSS |
|----------|-------|-----|
| width | 56px | `width: 56px` |
| height | 56px | `height: 56px` |
| border-radius | 8px | `border-radius: var(--radius-thumbnail)` |
| object-fit | cover | `object-fit: cover` |
| position | relative | `position: relative` |

#### Thumbnail Remove Button (red x)

| Property | Value | CSS |
|----------|-------|-----|
| position | absolute, top-right | `position: absolute; top: -4px; right: -4px` |
| width | 16px | `width: 16px` |
| height | 16px | `height: 16px` |
| border-radius | 50% | `border-radius: 50%` |
| background | `#EF4444` | `background: var(--color-remove-icon)` |
| color | `#FFFFFF` | `color: white` |
| icon | `x` (10px) | |

#### "+ Image" Button

| Property | Value | CSS |
|----------|-------|-----|
| width | 56px | `width: 56px` |
| height | 56px | `height: 56px` |
| border | `1px dashed #D97706` | `border: 1px dashed var(--color-community-link)` |
| border-radius | 8px | `border-radius: 8px` |
| background | transparent | `background: transparent` |
| color | `#D97706` | `color: var(--color-community-link)` |
| icon | `+` (20px, centered) | |
| visibility | hidden when 5 images uploaded | |

#### "Toi da 5" Note

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 11px | `font-size: 11px` |
| color | `#9CA3AF` | `color: var(--color-text-hint)` |
| display | below the + button | |

### G — Anonymous Checkbox

| Property | Value | CSS |
|----------|-------|-----|
| display | flex, center | `display: flex; align-items: center; gap: 8px` |
| checkbox-size | 18px | `width: 18px; height: 18px` |
| checkbox-border | `1px solid #D1D5DB` | `border: 1px solid #D1D5DB` |
| checkbox-radius | 4px | `border-radius: 4px` |
| label-font | 14px/400 | `font-size: 14px; font-weight: 400` |
| label-color | `#374151` | `color: var(--color-text-checkbox)` |

**States:**

| State | Changes |
|-------|---------|
| Unchecked | border: 1px solid #D1D5DB, bg: white |
| Checked | bg: #FFEA9E, border-color: #FFEA9E, checkmark: #00101A |
| Hover | border-color: #998C5F |

### H — Action Bar

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| justify-content | center | `justify-content: center` |
| gap | 16px | `gap: var(--spacing-action-gap)` |
| padding-top | 24px | `padding-top: 24px` |
| border-top | none | |

#### H.1 — Cancel Button ("Huy")

| Property | Value | CSS |
|----------|-------|-----|
| height | 48px | `height: 48px` |
| padding | 12px 24px | `padding: 12px 24px` |
| border | `1px solid #D1D5DB` | `border: 1px solid #D1D5DB` |
| border-radius | 8px | `border-radius: var(--radius-btn)` |
| background | `#FFFFFF` | `background: white` |
| color | `#00101A` | `color: var(--color-text-dark)` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 600 | `font-weight: 600` |
| icon | `x` (16px, after text) | `margin-left: 8px` |

**States:**

| State | Changes |
|-------|---------|
| Default | border: 1px solid #D1D5DB, bg: white |
| Hover | bg: #F9FAFB, border-color: #9CA3AF |
| Active | bg: #F3F4F6 |
| Disabled (during submit) | opacity: 0.5, cursor: not-allowed |

#### H.2 — Submit Button ("Gui")

| Property | Value | CSS |
|----------|-------|-----|
| height | 48px | `height: 48px` |
| min-width | 200px | `min-width: 200px` |
| padding | 12px 32px | `padding: 12px 32px` |
| border | none | `border: none` |
| border-radius | 8px | `border-radius: var(--radius-btn)` |
| background | `#FFEA9E` | `background: var(--color-accent-yellow)` |
| color | `#00101A` | `color: var(--color-btn-secret-box-text)` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| icon | send/arrow (16px, after text) | `margin-left: 8px` |

**States:**

| State | Changes |
|-------|---------|
| Default (enabled) | bg: #FFEA9E, cursor: pointer |
| Hover | bg: #FFE082, box-shadow: 0 4px 16px rgba(255,234,158,0.35) |
| Active | bg: #FFD54F |
| Disabled (fields incomplete) | bg: #E5E7EB, color: #9CA3AF, cursor: not-allowed |
| Loading (submitting) | bg: #FFEA9E, show spinner icon, text: "Dang gui...", disabled |

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1279px |
| Desktop | 1280px | -- |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Modal | Full-screen: `width: 100%; height: 100%; border-radius: 0; max-height: 100vh` |
| Modal padding | 16px |
| Title | font-size: 20px |
| Action bar | Fixed at bottom: `position: sticky; bottom: 0; background: white; padding: 16px` |
| Content area | Reduced min-height: 80px |
| Image thumbnails | 48px x 48px |

#### Tablet (768px - 1279px)

| Component | Changes |
|-----------|---------|
| Modal | Centered, max-width: 600px, padded sides |
| Modal padding | 24px |

#### Desktop (>= 1280px)

| Component | Changes |
|-----------|---------|
| Modal | Centered, max-width: 640px |
| Modal padding | 32px |
| All components | Full design as specified above |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Modal appear | opacity, transform (scale) | 200ms | ease-out | Modal open |
| Modal disappear | opacity, transform (scale) | 150ms | ease-in | Modal close |
| Overlay appear | opacity | 200ms | ease-out | Modal open |
| Overlay disappear | opacity | 150ms | ease-in | Modal close |
| Input focus | border-color, box-shadow | 150ms | ease-in-out | Focus event |
| Toolbar toggle | background-color | 100ms | ease-in-out | Click |
| Hashtag chip add | opacity, transform (scale) | 150ms | ease-out | Tag added |
| Hashtag chip remove | opacity, transform (scale) | 100ms | ease-in | Tag removed |
| Image thumbnail add | opacity | 200ms | ease-out | File selected |
| Submit button state | background-color, opacity | 150ms | ease-in-out | Enable/disable |
| Error message | opacity, max-height | 150ms | ease-out | Validation trigger |

---

## Implementation Mapping

| Design Element | Tailwind / CSS Class | React Component |
|----------------|---------------------|-----------------|
| Overlay Backdrop | `fixed inset-0 bg-[var(--color-overlay)] z-40` | `<ModalOverlay />` |
| Modal Container | `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,640px)] max-h-[90vh] overflow-y-auto bg-[var(--color-white)] rounded-2xl p-8 border border-[var(--color-border)] shadow-[var(--shadow-modal)] z-50` | `<WriteKudoModal />` |
| Modal Title | `text-2xl font-bold text-center text-[var(--color-text-dark)]` | (part of `<WriteKudoModal />`) |
| Form Label | `text-sm font-bold text-[var(--color-text-dark)]` | `<FormLabel />` |
| Required Star | `text-sm font-bold text-[var(--color-text-required)] ml-0.5` | (part of `<FormLabel />`) |
| Search Input | `w-full h-14 rounded-lg border border-[var(--border-input)] px-4 text-sm focus:border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-border)]/15` | `<RecipientSearch />` |
| Text Input | `w-full h-14 rounded-lg border border-[var(--border-input)] px-4 text-sm` | `<HonorTitleInput />` |
| Hint Text | `text-xs text-[var(--color-text-hint)] mt-1` | (below input) |
| Formatting Toolbar | `flex items-center border-y border-[var(--color-toolbar-border)] h-10` | `<FormattingToolbar />` |
| Toolbar Button | `w-10 h-10 flex items-center justify-center border-r border-[var(--color-toolbar-border)] hover:bg-[var(--color-toolbar-active)]` | `<ToolbarButton />` |
| Community Link | `ml-auto text-sm font-medium text-[var(--color-community-link)] hover:underline` | (part of toolbar) |
| Content Textarea | `w-full min-h-[120px] p-3 text-sm border-b border-[var(--color-toolbar-border)] resize-y` | `<RichTextEditor />` (tiptap) |
| Hashtag Chip | `inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--color-chip-bg)] text-xs font-medium text-[var(--color-chip-text)]` | `<HashtagChip />` |
| "+ Hashtag" Btn | `inline-flex items-center gap-1 px-3 py-1 rounded-full border border-dashed border-[var(--color-community-link)] text-xs font-medium text-[var(--color-community-link)]` | `<AddHashtagButton />` |
| Image Thumbnail | `relative w-14 h-14 rounded-lg overflow-hidden` | `<ImageThumbnail />` |
| Remove Btn (x) | `absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--color-remove-icon)] text-[var(--color-white)] flex items-center justify-center text-[10px]` | (part of `<ImageThumbnail />`) |
| "+ Image" Btn | `w-14 h-14 rounded-lg border border-dashed border-[var(--color-community-link)] flex items-center justify-center text-[var(--color-community-link)]` | `<AddImageButton />` |
| Checkbox | `w-[18px] h-[18px] rounded border border-[var(--border-input)] checked:bg-[var(--color-accent-yellow)] checked:border-[var(--color-accent-yellow)]` | `<AnonymousCheckbox />` |
| Cancel Button | `h-12 px-6 rounded-lg border border-[var(--border-input)] bg-[var(--color-white)] text-sm font-semibold text-[var(--color-text-dark)] hover:bg-[var(--color-toolbar-active)]` | `<CancelButton />` |
| Submit Button | `h-12 min-w-[200px] px-8 rounded-lg bg-[var(--color-accent-yellow)] text-sm font-bold text-[var(--color-btn-secret-box-text)] disabled:bg-[var(--color-disabled-bg)] disabled:text-[var(--color-disabled-text)] disabled:cursor-not-allowed` | `<SubmitButton />` |

---

## Notes

- All colors MUST use CSS variables per constitution Principle V — no hard-coded hex in Tailwind classes (the hex values in this document are reference values for the CSS variable definitions in `globals.css`)
- The modal is an overlay on the Live Board page — it does not have its own URL route
- Rich-text editor (tiptap) must render its own toolbar; the toolbar styles above apply to the custom wrapper
- Focus trap is required within the modal (see Accessibility in spec.md)
- Touch targets for all buttons and interactive elements MUST be >= 44x44px per constitution Principle VI
- Image thumbnails in the Figma design show 5 sample images with red close icons — these represent the max state
