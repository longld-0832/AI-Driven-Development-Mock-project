# Design Style: Homepage SAA

**Frame ID**: `i87tDx10uM`
**Internal Node ID**: `2167:9026`
**Frame Name**: `Homepage SAA`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=2167:9026
**Extracted At**: 2026-04-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| `--color-bg-dark` | `#00101A` | 100% | Page background (shared with Login) |
| `--color-header-bg` | `#101417` | 80% | Header background (`rgba(16,20,23,0.8)`) |
| `--color-accent-yellow` | `#FFEA9E` | 100% | Primary btn bg, text highlights, borders |
| `--color-accent-yellow-dim` | `#FFEA9E` | 10% | Secondary button background (`rgba(255,234,158,0.1)`) |
| `--color-white` | `#FFFFFF` | 100% | Body text, nav links, footer copyright |
| `--color-border` | `#998C5F` | 100% | Button & element borders |
| `--color-divider` | `#2E3940` | 100% | Footer top border (shared with Login) |
| `--color-surface-dark` | `#0F0F0F` | 100% | Sun* Kudos section background |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| `--text-display` | Montserrat | 57px | 700 | 64px | -0.25px | Section headings (Awards, Sun* Kudos) |
| `--text-body-bold-lg` | Montserrat | 24px | 700 | 32px | 0px | Hero body, event values, sub-heading |
| `--text-hero-sub` | Montserrat | 24px | 700 | 32px | 0px | "Comming soon" label |
| `--text-countdown-label` | Montserrat | 24px | 700 | 32px | 0px | DAYS / HOURS / MINUTES labels |
| `--text-countdown-digit` | Digital Numbers | 49.15px | 400 | — | 0% | Countdown digit characters |
| `--text-event-label` | Montserrat | 16px | 700 | 24px | 0.15px | "Thời gian:", "Địa điểm:" label text — color: `#FFFFFF` (white) |
| `--text-event-value` | Montserrat | 24px | 700 | 32px | 0px | Event values ("18h30", "Nhà hát nghệ thuật quân đội") — color: `#FFEA9E` (yellow) |
| `--text-nav` | Montserrat | 14px | 700 | 20px | 0.1px | Header nav links, footer nav links |
| `--text-cta` | Montserrat | 22px | 700 | 28px | 0px | CTA buttons (About Awards / Kudos) |
| `--text-award-name` | Montserrat | 24px | 400 | 32px | 0px | Award card name |
| `--text-award-desc` | Montserrat | 16px | 400 | 24px | 0.5px | Award card description |
| `--text-link` | Montserrat | 16px | 500 | 24px | 0.15px | "Chi tiết" links |
| `--text-body-sm-bold` | Montserrat | 16px | 700 | 24px | 0.15px | Footer nav, section labels |
| `--text-footer-copy` | Montserrat Alternates | 16px | 700 | 24px | 0% | Footer copyright |
| `--text-kudos-logo` | SVN-Gotham | 96px | 400 | 24px | -13% | KUDOS wordmark logo |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| `--spacing-page-px` | 144px | Main content horizontal padding (desktop) |
| `--spacing-page-py` | 96px | Main content vertical padding (desktop) |
| `--spacing-section-gap` | 120px | Gap between major page sections |
| `--spacing-header-px` | 144px | Header horizontal padding |
| `--spacing-header-py` | 12px | Header vertical padding |
| `--spacing-footer-px` | 90px | Footer horizontal padding |
| `--spacing-footer-py` | 40px | Footer vertical padding |
| `--spacing-hero-gap` | 40px | Gap inside hero (logo → content) |
| `--spacing-countdown-gap` | 40px | Gap between DAYS/HOURS/MINUTES units in B1.3 |
| `--spacing-countdown-inner` | 14px | Gap between the two digit boxes within one unit |
| `--spacing-digit-label-gap` | 14px | Gap between digit row and unit label (DAYS/HOURS/MINUTES) |
| `--spacing-cta-gap` | 40px | Gap between the two CTA buttons |
| `--spacing-card-gap` | 24px | Gap within award card (image → text) |
| `--spacing-awards-grid-row` | 80px | Gap between row 1 and row 2 of awards grid |
| `--spacing-awards-grid-col` | 3 cols per row | Award grid — 3 cards × 2 rows = 6 cards; ~108px column gap derived |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| `--radius-btn-primary` | 8px | Primary & secondary CTA buttons |
| `--radius-btn-nav` | 4px | Header nav link hover state |
| `--radius-card-surface` | 16px | Sun* Kudos background card |
| `--radius-award-image` | 0px | Award card image (square, no radius) |
| `--border-award-image` | `0.955px solid #FFEA9E` | Award thumbnail border |
| `--border-btn-secondary` | `1px solid #998C5F` | Secondary btn (About Kudos, user button) |
| `--border-footer` | `1px solid #2E3940` | Footer top border |
| `--border-nav-selected` | `1px solid #FFEA9E` | Active nav link underline |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| `--shadow-widget` | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Floating Kudos write button |
| `--shadow-award-glow` | `0 0 24px rgba(255,234,158,0.25)` | Award thumbnail image glow (estimated) |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| Gradient — hero overlay | `linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, rgba(0,19,32,0.00) 48.92%)` | Full-bleed overlay over keyvisual |

---

## Layout Specifications

### Frame Canvas

| Property | Value |
|----------|-------|
| Width | 1512px |
| Height | 4480px (full scroll height) |
| Background | `#00101A` |
| Content max-width | 1224px (`1512 - 2×144`) |

### Section Layout

| Section | Position | Size | Padding / Gap |
|---------|----------|------|---------------|
| A1_Header | absolute, top-0, z=20 | 1512×80px | 12px 144px |
| 3.5_Keyvisual | absolute, top-0 | 1512×1392px | — |
| Cover gradient | absolute, top-0 | 1512×1480px | — |
| Main content (Bìa) | flow, pt=88 (below header) | 1512×4220px | px:144, py:96, gap:120 |
| → Hero zone (Frame 487) | inside Bìa | 1224×596px | gap:40 |
| → B4 Theme narrative | inside Bìa | 1152×1090px | 120px 104px |
| → Awards section | inside Bìa | 1224×1353px | gap:80 |
| → D1_Sunkudos | inside Bìa | 1224×500px | — |
| 6_Widget Button | fixed, right:19, top:830 | pill ~105×64px | — |
| 7_Footer | absolute, bottom-0 | 1512px auto | 40px 90px |

### Layout Structure (ASCII)

```
┌───────────────────────────────────────────────────────────────┐
│  A1_Header (1512×80px, bg: rgba(16,20,23,0.8), z=20)         │
│  px:144  py:12  flex-row justify-between                      │
│  ┌──────────────────────────┐   ┌──────────────────────────┐  │
│  │ LOGO (52×48)  Nav(490×56)│   │ Bell Language User(220×56)│  │
│  └──────────────────────────┘   └──────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────┐
│  3.5_Keyvisual (1512×1392) — bg illustration, abs z=0        │
│  Cover gradient overlay (12deg, 00101A → transparent) z=1    │
└───────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────┐
│  Main Content (px:144, py:96, section-gap:120)               │
│                                                               │
│  ┌──────────────────────── 1224px ─────────────────────────┐  │
│  │  Hero zone (flex-col, gap:40)                           │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │  ROOT FURTHER logo (451×200)                     │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
  │  │  Frame 523 (↓ flex-col, gap:16px)                         │  │
  │  │  ┌───────────────────────────────────────────────────┐   │  │
  │  │  │ B1_Countdown time (1224×176, flex-col gap:16)           │   │  │
  │  │  │  "Comming soon" (24px/700 white) ← visible pre-event │   │  │
  │  │  │  B1.3 [DD box][DD box] [HH box][HH box] [MM box][MM box]│   │  │
  │  │  │  Each digit: 51×82 gradient box, 0.5px #FFEA9E border   │   │  │
  │  │  │  Labels: DAYS / HOURS / MINUTES (24px/700 white)        │   │  │
  │  │  └───────────────────────────────────────────────────┘   │  │
  │  │  ┌───────────────────────────────────────────────────┐   │  │
  │  │  │ B2_Thông tin sự kiện (637×64, flex-col gap:8)          │   │  │
  │  │  │  Row 1 (flex-row gap:60):                              │   │  │
  │  │  │  [Thời gian:(white,16) 26/12/25(yellow,24)] [§ venue]  │   │  │
  │  │  │  Row 2: "Tường thuật trực tiếp..." (white, 16px/700)   │   │  │
  │  │  └───────────────────────────────────────────────────┘   │  │
│  │  ┌──── B3_CTA (570×60, gap:40) ─────────────────────┐   │  │
│  │  │  [ABOUT AWARDS 276×60 yellow]  [ABOUT KUDOS ...]  │   │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                          ↑ 120px gap ↑                        │
│  ┌──────────────── 1152px ────────────────────────────────┐   │
│  │  B4_Theme narrative (p:120px 104px, flex-col)          │   │
│  │  "ROOT FURTHER" — theme description paragraphs         │   │
│  └──────────────────────────────────────────────────────────┘  │
│                          ↑ 120px gap ↑                        │
  │  ┌──────────────────── Awards (1224×1353) ───────────┐   │
  │  │  C1_Header: caption + "Hệ thống giải thưởng" (57px)   │   │
  │  │  C2_Award list: 3-col × 2-row grid                   │   │
  │  │  ┌──────┐ ┌──────┐ ┌──────┐   (row gap: 80px)       │   │
  │  │  │ 336² │ │ 336² │ │ 336² │  row 1 (Top Talent,    │   │
  │  │  └──────┘ └──────┘ └──────┘  Top Project, Proj.Lead) │   │
  │  │  ┌──────┐ ┌──────┐ ┌──────┐                          │   │
  │  │  │ 336² │ │ 336² │ │ 336² │  row 2 (Best Manager,   │   │
  │  │  └──────┘ └──────┘ └──────┘  Signature, MVP)          │   │
  │  │  col gap ~108px (derived); frame gap: 80px            │   │
│  └──────────────────────────────────────────────────────────┘  │
│                          ↑ 120px gap ↑                        │
│  ┌──────────── D1_Sunkudos (1224×500, bg:#0F0F0F br:16) ─┐   │
│  │  KUDOS logo  |  Title "Sun* Kudos" 57px yellow         │   │
│  │  Description + "Chi tiết" button                       │   │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────┐
│  7_Footer (1512px, px:90, py:40, border-top #2E3940)         │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  [Logo 69×64]  [About SAA] [Awards Info] [Kudos] [Tiêu] │  │
│  └─────────────────────────────────────────────────────────┘  │
│  Bản quyền thuộc về Sun* © 2025                               │
└───────────────────────────────────────────────────────────────┘
      ┌──────────────────┐
      │ 6_Widget (fixed) │  right:19  top:830
      │ pill, yellow bg  │  shadow: widget glow
      └──────────────────┘
```

---

## Component Style Details

### A1_Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9091` | — |
| width | 1512px | `width: 100%` |
| height | 80px | `height: 80px` |
| position | sticky / fixed | `position: sticky; top: 0` |
| z-index | 20 | `z-index: 20` |
| background | rgba(16,20,23,0.8) | `background-color: rgba(16,20,23,0.8)` |
| display | flex row | `display: flex; flex-direction: row` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |
| padding | 12px 144px | `padding: 12px 144px` |

**Nav link states:**

| State | Property | Value |
|-------|----------|-------|
| Normal | color | `#FFFFFF` |
| Normal | background | transparent |
| Selected | color | `#FFEA9E` |
| Selected | border-bottom | `1px solid #FFEA9E` |
| Hover | background | `rgba(255,255,255,0.08)` |
| Hover | border-radius | `4px` |
| Focus | outline | `2px solid #FFEA9E` |

### A1.8_Button-IC (User button)

| Property | Value |
|----------|-------|
| **Node ID** | `I2167:9091;...` |
| width/height | 40×40px |
| background | transparent |
| border | `1px solid #998C5F` |
| border-radius | `4px` |
| padding | `10px` |

### B1.3_Countdown Unit (DAYS / HOURS / MINUTES)

Each unit is a `flex-col` frame (116×128px, gap: 14px) containing:
1. A digit row (Frame 485 — `flex-row` 116×82px, gap: 14px)
2. A label text (e.g. DAYS — 24px/700 white)

**Individual Digit Box** (one per digit, 2 per unit — tens + ones):

| Property | Value |
|----------|-------|
| width | 51px (51.2px from Figma) |
| height | 82px (81.92px from Figma) |
| background | `linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.10) 100%)` |
| border | `0.5px solid #FFEA9E` |
| border-radius | 0px |
| display | flex align-center justify-center |

**Digit Text inside box:**

| Property | Value |
|----------|-------|
| font-family | Digital Numbers |
| font-size | ~49.15px |
| font-weight | 400 |
| color | `#FFFFFF` |

### B1.3_Countdown Label (DAYS/HOURS/MINUTES)

| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 24px |
| font-weight | 700 |
| line-height | 32px |
| color | `#FFFFFF` |

### B3.1_About Awards Button (default: outline; hover: primary fill)

> Both B3.1 and B3.2 share identical default and hover styles. In the Figma canvas B3.1 is shown
> in **hover state** (yellow fill) and B3.2 in **normal state** (outline) to illustrate both
> interaction states simultaneously.

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9063` | — |
| width | 276px | `width: 276px` |
| height | 60px | `height: 60px` |
| background | `#FFEA9E` | `background-color: var(--color-accent-yellow)` |
| border-radius | 8px | `border-radius: 8px` |
| padding | 16px 24px | `padding: 16px 24px` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | `font-weight: bold` |
| line-height | 28px | `line-height: 28px` |
| color | `#00101A` | `color: var(--color-bg-dark)` |

**States:**

| State | Changes |
|-------|---------|
| **Normal** | bg `rgba(255,234,158,0.1)`, border `1px solid #998C5F`, text `#FFFFFF` (same as B3.2 normal appearance) |
| **Hover** | bg `#FFEA9E`, border removed, text `#00101A` (Figma renders B3.1 in this hover state) |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 2px` |

> **Design note**: In the Figma canvas B3.1 is rendered in hover state and B3.2 in normal state,
> illustrating both states simultaneously. Both buttons share identical default (secondary/outline)
> and hover (primary) styles. The only difference is the navigation destination.

### B3.2_About Kudos Button (default: outline; hover: primary fill)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `2167:9064` | — |
| width | 254px (derived: 570 − 276 − 40px gap) | `width: 254px` |
| height | 60px | `height: 60px` |
| background | `rgba(255,234,158,0.1)` | `background-color: var(--color-accent-yellow-dim)` |
| border | `1px solid #998C5F` | `border: 1px solid var(--color-border)` |
| border-radius | 8px | `border-radius: 8px` |
| padding | 16px 24px | `padding: 16px 24px` |
| font-size | 22px | `font-size: 22px` |
| font-weight | 700 | |
| color | `#FFFFFF` | `color: white` |

**States:** (Same as B3.1 — both buttons share identical interaction styles)

| State | Changes |
|-------|---------|
| **Normal** | bg `rgba(255,234,158,0.1)`, border `1px solid #998C5F`, text `#FFFFFF` |
| **Hover** | bg `#FFEA9E`, border removed, text `#00101A` |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 2px` |

### B4_content (Theme Narrative)

| Property | Value |
|----------|-------|
| **Node ID** | `5001:14827` |
| width | 1152px |
| height | 1090px |
| flex-direction | column |
| padding | 120px 104px |
| background | `#00101A` (same as page bg — no visible card) |

**Inner elements** (from Figma `3204:10156`, `3204:10161`, `3204:10162`):

| Element | Font | Size | Weight | Color | Notes |
|---------|------|------|--------|-------|-------|
| "ROOT FURTHER" title | Montserrat | 24px | 700 | `#FFFFFF` | Large theme heading |
| Body paragraph block 1 | Montserrat | 24px | 700 | `#FFFFFF` | Theme narrative text |
| Body paragraph block 2 | Montserrat | 24px | 700 | `#FFFFFF` | Continuation paragraph |

> **Implementation note**: B4 contains two large text paragraphs describing the "ROOT FURTHER"
> theme. The exact paragraph content must be sourced from the Figma file or provided by content
> owners. Font size 24px/700 applies to all text within this block (no hero-level display font here).

### C2_Award Card

| Property | Value |
|----------|-------|
| **Node ID** | `2167:9075` (Top Talent, example) |
| width | 336px |
| height | 504px |
| flex-direction | column |
| gap | 24px |

**Award Thumbnail Image:**

| Property | Value |
|----------|-------|
| width | 336px |
| height | 336px |
| border | `0.955px solid #FFEA9E` |
| border-radius | 0px (square) |
| object-fit | cover |

**Award Name Text:**

| Property | Value |
|----------|-------|
| font-size | 24px |
| font-weight | 400 |
| line-height | 32px |
| color | `#FFEA9E` |

**Award Description Text:**

| Property | Value |
|----------|-------|
| font-size | 16px |
| font-weight | 400 |
| line-height | 24px |
| letter-spacing | 0.5px |
| color | `#FFFFFF` |
| max-lines | 2 (`overflow: hidden; -webkit-line-clamp: 2`) |

**"Chi tiết" Link:**

| Property | Value |
|----------|-------|
| font-size | 16px |
| font-weight | 500 |
| line-height | 24px |
| letter-spacing | 0.15px |
| color | `#FFFFFF` |
| padding | 16px 0px |

### 6_Widget Button (Floating)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `5022:15169` | — |
| position in implementation | fixed | `position: fixed` |
| right | 19px | `right: 19px` |
| bottom | ~30px (implementation value) | `bottom: 30px` |
| width | 106px | `width: 106px` |
| height | 64px | `height: 64px` |
| background | `#FFEA9E` | `background-color: var(--color-accent-yellow)` |
| border-radius | 100px (full pill) | `border-radius: 100px` |
| padding | 16px | `padding: 16px` |
| gap | 8px | `gap: 8px` |
| box-shadow | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | `box-shadow: var(--shadow-widget)` |

**Contents** (from Figma `icon viết kudos`):: pencil/write icon (left) + `/` separator text + SAA icon (right).

**Interaction**: Click opens a quick action menu of Kudos actions (exact options TBD).

> Note: In Figma the widget is `position: absolute top:830px` within the page scroll canvas.
> For implementation it MUST be `position: fixed` so it persists across scroll.

### C1_Header Giải thưởng

| Property | Value |
|----------|-------|
| **Node ID** | `2167:9069` |
| width | 1224px |
| height | 129px |
| flex-direction | column |
| gap | 16px |

**Row 1 — Caption text** (`2167:9070`):

| Property | Value |
|----------|-------|
| content | "Sun* annual awards 2025" |
| font-family | Montserrat |
| font-size | 24px |
| font-weight | 700 |
| line-height | 32px |
| color | `#FFFFFF` |

**Divider** (`2167:9071`): `1px` horizontal rule, `background: #2E3940`, full width 1224px.

**Row 3 — Frame 488** (`2167:9072`): `flex-row, gap: 32px, 1224×64px`

| Sub-item | Value |
|----------|-------|
| Title | "Hệ thống giải thưởng" — `57px/700/Montserrat/#FFEA9E`, 637×64px |
| Description | "Các hạng mục sẽ được trao giải theo TOP những người xuất sắc nhất." — white text to the right |

### D1_Sunkudos Block

| Property | Value |
|----------|-------|
| **Node ID** | `3390:10349` (outer frame) |
| width | 1224px |
| height | 500px |
| border-radius | **0px** on outer frame — 16px is on the inner `MM_MEDIA_Kudos Background` (`I3390:10349;313:8416`) |
| background | Applied on inner `MM_MEDIA_Kudos Background`: `url(...) ..., #0F0F0F; border-radius: 16px` |

> **Implementation note**: Apply `rounded-2xl` and `overflow-hidden` on the inner container (1120×500), not on the outer 1224px wrapper. The outer frame has no visual rounding.

**D2_Content** (`I3390:10349;313:8419`): `flex-col, gap: 32px, 457×408px` (text content area)

**"Phong trào ghi nhận" Caption** (`I3390:10349;313:8421`):

| Property | Value |
|----------|-------|
| content | "Phong trào ghi nhận" |
| font-family | Montserrat |
| font-size | 24px |
| font-weight | 700 |
| line-height | 32px |
| color | `#FFFFFF` |
| width | 260px |

**"Sun* Kudos" Heading** (`I3390:10349;313:8422`):

| Property | Value |
|----------|-------|
| font-family | Montserrat |
| font-size | 57px |
| font-weight | 700 |
| line-height | 64px |
| letter-spacing | -0.25px |
| color | `#FFEA9E` |
| width | 340px |

**Description Body Text** (`I3390:10349;313:8423`):

| Property | Value |
|----------|-------|
| content | "ĐIỂM MỚI CỦA SAA 2025 Hoạt động ghi nhận và cảm ơn đồng nghiệp..." (16px/700/white) |
| font-family | Montserrat |
| font-size | 16px |
| font-weight | 700 |
| line-height | 24px |
| letter-spacing | 0.5px |
| color | `#FFFFFF` |
| width | 457px |

**"Chi tiết" Button** (`I3390:10349;313:8426` — D2.1_Button-IC):

| Property | Value |
|----------|-------|
| width | 127px |
| height | 56px |
| background | `#FFEA9E` |
| border-radius | 4px |
| padding | 16px |
| gap | 8px |
| display | flex row |

**KUDOS wordmark logo** (`I3390:10349;329:2949`):

| Property | Value |
|----------|-------|
| font-family | SVN-Gotham |
| font-size | 96.16px |
| font-weight | 400 |
| letter-spacing | -13% |
| color | `#DBD1C1` |
| width | 310px |

### 7_Footer

| Property | Value |
|----------|-------|
| **Node ID** | `5001:14800` |
| width | 1512px |
| padding | 40px 90px |
| border-top | `1px solid #2E3940` |
| display | flex |
| justify-content | space-between |
| align-items | center |

**Footer nav links:** Montserrat 16px/700/24px, `#FFFFFF`

**Footer copyright:** Montserrat Alternates 16px/700/24px, `#FFFFFF`

---

## Responsive Behavior

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile | < 768px | Content `px: 20px`; hero stacks vertically; countdown units shrink; award grid → 1 column; header → mobile variant (no nav links visible); footer wraps |
| Tablet | 768–1279px | Content `px: 40px`; award grid → 2 columns; header shows abbreviated nav |
| Desktop | ≥ 1280px | Full 1512px canvas; content `px: 144px`; award grid 3-col; all header links visible |

> Design canvas is 1512px. Content max-width is 1224px centred within desktop viewports.

---

## Implementation Mapping

| Node ID | CSS Class / Tailwind | React Component |
|---------|----------------------|-----------------|
| `2167:9091` | `sticky top-0 z-20 header-bg` | `<Header />` (RSC) |
| `2167:9027` | `absolute inset-0 object-cover` | `<Image fill>` (keyvisual) |
| `2167:9035` | `flex flex-col gap-4` | `<CountdownSection />` ("use client") |
| `2167:9037` | `flex flex-row gap-10` | `<CountdownTimer />` ("use client") |
| `2167:9053` | `flex flex-col gap-2` | `<EventInfo />` (RSC) |
| `2167:9062` | `flex flex-row gap-10` | `<HeroCTA />` (RSC, links) |
| `2167:9063` | **default**: `w-[276px] h-[60px] rounded-lg border border-[#998C5F] bg-[rgba(255,234,158,0.1)] text-white`; **hover**: `bg-[#FFEA9E] border-0 text-[#00101A]` | `<CTAButton href="/awards">` |
| `2167:9064` | **default**: `w-[254px] h-[60px] rounded-lg border border-[#998C5F] bg-[rgba(255,234,158,0.1)] text-white`; **hover**: `bg-[#FFEA9E] border-0 text-[#00101A]` | `<CTAButton href="/kudos">` |
| `5001:14827` | `flex flex-col gap-6 p-[120px_104px] bg-[#00101A]` | `<ThemeNarrative />` (RSC) |
| `5022:15169` | `fixed right-5 z-30 w-[106px] h-[64px] rounded-[100px] shadow-widget` | `<KudosWidget />` ("use client") |
| `5005:14974` | `flex flex-col gap-20` (two rows, each `flex flex-row gap-[108px]`) | `<AwardsGrid />` (RSC) |
| `2167:9075-9081` | `flex flex-col gap-6 w-[336px]` | `<AwardCard />` (RSC) |
| `3390:10349` | outer: `w-[1224px] h-[500px]` (no radius); inner `MM_MEDIA_Kudos Background`: `rounded-2xl overflow-hidden bg-[#0F0F0F] w-[1120px] h-[500px]` | `<SunKudosBlock />` (RSC) |
| `5001:14800` | `w-full px-[90px] py-10 border-t border-[#2E3940]` | `<Footer />` (RSC, shared) |
