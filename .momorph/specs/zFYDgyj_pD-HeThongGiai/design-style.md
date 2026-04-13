# Design Style: Hệ thống giải (Award System)

**Frame ID**: `313:8436`
**Screen ID**: `zFYDgyj_pD`
**Frame Name**: `Hệ thống giải`
**Figma Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/zFYDgyj_pD
**Frame Image**: https://momorph.ai/api/images/9ypp4enmFmdK3YAFJLIu6C/313:8436/bd17cac24871c9513f259333a5431530.png
**Extracted At**: 2026-04-09

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| `--color-bg-dark` | `#00101A` | 100% | Page background `rgba(0, 16, 26, 1)` |
| `--color-header-bg` | `#101417` | 80% | Header background — mapped to `--color-homepage-header-bg: rgba(16, 20, 23, 0.8)` in globals.css |
| `--color-accent-yellow` | `#FFEA9E` | 100% | Main heading text, active nav text, award labels, borders |
| `--color-white` | `#FFFFFF` | 100% | Body text, descriptions, nav links (default state), award values |
| `--color-border-btn` | `#998C5F` | 100% | User profile button border — mapped to `--color-border-btn` in globals.css |
| `--color-divider` | `#2E3940` | 100% | Section dividers `rgba(46, 57, 64, 1)` |
| `--color-notification-dot` | `#D4271D` | 100% | Notification badge dot `rgba(212, 39, 29, 1)` — **not yet in globals.css, must be added during implementation** |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| `--text-display` | Montserrat | 57px | 700 | 64px | -0.25px | Main heading "Hệ thống giải thưởng SAA 2025" — color: `#FFEA9E` |
| `--text-sub-heading` | Montserrat | 24px | 700 | 32px | 0px | Sub-heading "Sun\* Annual Awards 2025" — color: `#FFFFFF` |
| `--text-award-title` | Montserrat | 24px | 700 | 32px | 0px | Award card titles (e.g., "Top Talent") — color: `#FFEA9E` |
| `--text-award-label` | Montserrat | 24px | 700 | 32px | 0px | "Số lượng giải thưởng:", "Giá trị giải thưởng:" — color: `#FFEA9E` |
| `--text-award-value` | Montserrat | 36px | 700 | 44px | 0px | Prize values "7.000.000 VNĐ", quantity "10" — color: `#FFFFFF` |
| `--text-award-desc` | Montserrat | 16px | 700 | 24px | 0.5px | Award description paragraphs — color: `#FFFFFF`, text-align: justified |
| `--text-award-unit` | Montserrat | 14px | 700 | 20px | 0.1px | Unit labels "Cá nhân", "cho mỗi giải thưởng" — color: `#FFFFFF` |
| `--text-nav-header` | Montserrat | 16px | 700 | 24px | 0.15px | Header nav links — color: `#FFFFFF` (default) / `#FFEA9E` (active) |
| `--text-nav-menu` | Montserrat | 14px | 700 | 20px | 0.25px | Left menu nav items — color: `#FFFFFF` (default) / `#FFEA9E` (active) |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| `--spacing-page-px` | 144px | Main content horizontal padding |
| `--spacing-page-py` | 96px | Main content vertical padding |
| `--spacing-section-gap` | 120px | Gap between major sections (title → awards, awards → kudos) |
| `--spacing-award-gap` | 80px | Gap between individual award cards |
| `--spacing-card-inner-gap` | 40px | Gap between image and content within award card |
| `--spacing-card-text-gap` | 24px | Gap between title block and description |
| `--spacing-card-section-gap` | 32px | Gap between content sections within card (description → divider → quantity → divider → value) |
| `--spacing-menu-gap` | 16px | Gap between left nav menu items |
| `--spacing-menu-content-gap` | 80px | Gap between left menu and right content area |
| `--spacing-nav-item-padding` | 16px | Padding inside each nav menu item |
| `--spacing-header-px` | 144px | Header horizontal padding |
| `--spacing-header-py` | 12px | Header vertical padding |
| `--spacing-title-gap` | 16px | Gap between sub-heading, divider, and main heading |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| `--radius-btn-nav` | 4px | Navigation button items |
| `--radius-award-image` | 24px | Award card image corners |
| `--radius-card-content` | 16px | Award card content area (backdrop-filter container) |
| `--border-award-image` | `0.955px solid #FFEA9E` | Award image border |
| `--border-nav-active` | `1px solid #FFEA9E` | Active nav item bottom border |
| `--border-user-btn` | `1px solid #998C5F` | User profile button border — uses `--color-border-btn` |
| `--border-divider` | `1px` | Section divider height (color: `#2E3940`) |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| `--shadow-award-image` | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Award card image glow — same value as `--shadow-widget` in globals.css |
| `--shadow-nav-active` | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | Active nav item text glow — reuse `--shadow-widget` |

### Effects

| Name | Value | Usage |
|------|-------|-------|
| `backdrop-blur` | `blur(32px)` | Award card content area backdrop filter |
| `mix-blend-mode` | `screen` | Award image blend mode |
| `gradient-cover` | `linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0.00) 52.79%)` | Gradient overlay over keyvisual |

---

## Layout Specifications

### Frame Canvas

| Property | Value |
|----------|-------|
| Width | 1440px |
| Height | 6410px |
| Background | `#00101A` |

### Container

| Property | Value | Notes |
|----------|-------|-------|
| Width | 1440px | Full canvas |
| Padding | 96px 144px | Vertical / horizontal |
| Content Width | 1152px | 1440 - 2×144 |

### Grid Layout (Awards Section)

| Property | Value | Notes |
|----------|-------|-------|
| Display | flex | row direction |
| Left Column (Menu) | 178px | Fixed width, sticky |
| Gap | 80px | Between menu and content |
| Right Column (Cards) | 853px (flex) | Award card content area |
| Card Gap | 80px | Vertical gap between award cards |

### Layout Structure (ASCII)

```
┌─────────────────────────────────────────────────────────┐
│  Page (1440px, bg: #00101A)                             │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  HEADER (1440×80px, bg: rgba(16,20,23,0.8))        ││
│  │  px: 144px                                          ││
│  │  [Logo 52×48] [About SAA | Award Info* | Kudos]     ││
│  │                          [Noti] [VN ▼] [User]      ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  KEYVISUAL (1440×547px)                             ││
│  │  Background image (cover, center crop)               ││
│  │  Gradient overlay bottom → transparent               ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │  CONTENT (px: 144px, py: 96px, gap: 120px)        │  │
│  │                                                   │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │  Root Further Logo (338×150px)               │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │                       ↕ 120px                     │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │  TITLE SECTION (1152px)                      │  │  │
│  │  │  "Sun* Annual Awards 2025" (24px, #FFF)      │  │  │
│  │  │  ───────────────── divider ───────────────── │  │  │
│  │  │  "Hệ thống giải thưởng SAA 2025"             │  │  │
│  │  │  (57px, #FFEA9E, centered with icon)          │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │                       ↕ 120px                     │  │
│  │  ┌────────┐ 80px ┌──────────────────────────┐    │  │
│  │  │ MENU   │ gap  │  AWARD CARDS (853px)     │    │  │
│  │  │ (178px)│      │                          │    │  │
│  │  │ sticky │      │  ┌──────────────────────┐│    │  │
│  │  │        │      │  │ D.1 Top Talent       ││    │  │
│  │  │ • Top  │      │  │ [Image] [Content]    ││    │  │
│  │  │   Talent*│    │  │ 336px   480px        ││    │  │
│  │  │ • Top  │      │  │ gap: 40px            ││    │  │
│  │  │   Project│    │  └──────────────────────┘│    │  │
│  │  │ • Top  │      │           ↕ 80px         │    │  │
│  │  │   PL   │      │  ┌──────────────────────┐│    │  │
│  │  │ • Best │      │  │ D.2 Top Project      ││    │  │
│  │  │   Mgr  │      │  └──────────────────────┘│    │  │
│  │  │ • Sig  │      │           ↕ 80px         │    │  │
│  │  │   2025 │      │  ... (D.3 – D.6)         │    │  │
│  │  │ • MVP  │      │                          │    │  │
│  │  └────────┘      │  ┌──────────────────────┐│    │  │
│  │                   │  │ SUN* KUDOS BLOCK     ││    │  │
│  │                   │  │ [Content] [Image]    ││    │  │
│  │                   │  │ [Chi tiết →]         ││    │  │
│  │                   │  └──────────────────────┘│    │  │
│  │                   └──────────────────────────┘    │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Header

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `313:8440` | — |
| Width | 1440px | `width: 100%` |
| Height | 80px | `height: 80px` |
| Padding | 12px 144px | `padding: 12px 144px` |
| Background | rgba(16,20,23,0.8) | `background-color: var(--color-homepage-header-bg)` — **not** `--color-header-bg` (which is the login header `#0b0f12`) |
| Display | flex | `display: flex; align-items: center; justify-content: space-between` |
| Position | fixed / sticky | `position: sticky; top: 0; z-index: 50` |

**Active Nav Item ("Award Information"):**

| Property | Value |
|----------|-------|
| Color | `#FFEA9E` |
| Font | Montserrat 16px/24px 700 |
| Border-bottom | `1px solid #FFEA9E` |
| Text-shadow | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |

---

### Keyvisual (Hero Banner)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `313:8437` | — |
| Width | 1440px | `width: 100%` |
| Height | 547px | `height: 547px` |
| Background | Image (cover, 101.245% / 367.889%, center) | `background: url(...) center / cover no-repeat` |
| Overlay | `linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)` | Applied via `::after` or separate element |

---

### Title Section

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `313:8453` | — |
| Width | 1152px | `width: 100%; max-width: 1152px` |
| Gap | 16px | `gap: 16px` |
| Direction | column | `flex-direction: column` |

**Sub-heading "Sun\* Annual Awards 2025":**

| Property | Value |
|----------|-------|
| Font | Montserrat 24px/32px 700 |
| Color | `#FFFFFF` |
| Text-align | center |

**Divider:**

| Property | Value |
|----------|-------|
| Width | 1152px (full) |
| Height | 1px |
| Color | `#2E3940` |

**Main Heading "Hệ thống giải thưởng SAA 2025":**

| Property | Value |
|----------|-------|
| Font | Montserrat 57px/64px 700 |
| Color | `#FFEA9E` |
| Letter-spacing | -0.25px |
| Text-align | left (within centered container) |

---

### Left Navigation Menu (Menu List)

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `313:8459` | — |
| Width | 178px | `width: 178px` |
| Gap | 16px | `gap: 16px` |
| Direction | column | `flex-direction: column` |
| Position | sticky | `position: sticky; top: 96px` |

**Menu Item (Default State):**

| Property | Value |
|----------|-------|
| Padding | 16px |
| Border-radius | 4px |
| Icon size | 24×24px |
| Gap (icon → text) | 4px |
| Font | Montserrat 14px/20px 700 |
| Color | `#FFFFFF` |
| Letter-spacing | 0.25px |

**Menu Item (Active State — e.g., "Top Talent"):**

| Property | Value |
|----------|-------|
| Color | `#FFEA9E` |
| Border-bottom | `1px solid #FFEA9E` |
| Text-shadow | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` |

**States:**

| State | Changes |
|-------|---------|
| Default | White text, no border |
| Hover | Highlight (subtle background change) |
| Active | Yellow text `#FFEA9E`, bottom border, text glow |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 2px` (keyboard focus ring) |

**Menu Items:**

| # | Label | Node ID |
|---|-------|---------|
| C.1 | Top Talent | `313:8460` |
| C.2 | Top Project | `313:8461` |
| C.3 | Top Project Leader | `313:8462` |
| C.4 | Best Manager | `313:8463` |
| C.5 | Signature 2025 Creator | `313:8464` |
| C.6 | MVP | `313:8465` |

---

### Award Card (Template — repeated 6 times)

| Property | Value | CSS |
|----------|-------|-----|
| **Container Node** | e.g., `313:8467` (Top Talent) | — |
| Width | 856px | `width: 100%` |
| Gap (card sections) | 80px | `gap: 80px` |
| Direction | column | `flex-direction: column` |

**Card Content Row:**

| Property | Value | CSS |
|----------|-------|-----|
| Display | flex-row | `display: flex; flex-direction: row` |
| Gap | 40px | `gap: 40px` |

**Award Image:**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | e.g., `I313:8467;214:2525` | — |
| Width × Height | 336×336px | `width: 336px; height: 336px` |
| Border | `0.955px solid #FFEA9E` | `border: 1px solid var(--color-accent-yellow)` |
| Border-radius | 24px | `border-radius: 24px` |
| Box-shadow | `0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287` | `box-shadow: var(--shadow-award-image)` |
| Mix-blend-mode | screen | `mix-blend-mode: screen` |
| Background | Image cover, no-repeat | `background: url(...) center / cover no-repeat` |
| Aspect-ratio | 1/1 | `aspect-ratio: 1/1` |

**Award Content Block:**

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | e.g., `I313:8467;214:2526` | — |
| Width | 480px | `width: 480px` |
| Gap | 32px | `gap: 32px` |
| Direction | column | `flex-direction: column` |
| Backdrop-filter | blur(32px) | `backdrop-filter: blur(32px)` |
| Border-radius | 16px | `border-radius: 16px` |

**Award Title Row (inside content):**

| Property | Value |
|----------|-------|
| Icon | 24×24px target icon |
| Gap (icon → title) | 16px |
| Title font | Montserrat 24px/32px 700, color: `#FFEA9E` |

**Award Description:**

| Property | Value |
|----------|-------|
| Font | Montserrat 16px/24px 700, letter-spacing: 0.5px |
| Color | `#FFFFFF` |
| Text-align | justified |
| Width | 480px |

**"Số lượng giải thưởng:" Row:**

| Property | Value |
|----------|-------|
| Label icon | 24×24px diamond icon |
| Label text | Montserrat 24px/32px 700, color: `#FFEA9E` |
| Quantity number | Montserrat 36px/44px 700, color: `#FFFFFF` |
| Unit label | Montserrat 14px/20px 700, color: `#FFFFFF` |

**"Giá trị giải thưởng:" Row:**

| Property | Value |
|----------|-------|
| Label icon | 24×24px license icon |
| Label text | Montserrat 24px/32px 700, color: `#FFEA9E` |
| Value | Montserrat 36px/44px 700, color: `#FFFFFF` |
| Sub-label | Montserrat 14px/20px 700, color: `#FFFFFF` (e.g., "cho mỗi giải thưởng") |

**Dividers (within card):**

| Property | Value |
|----------|-------|
| Width | 480px or 853px (bottom) |
| Height | 1px |
| Color | `#2E3940` |

---

### Sun\* Kudos Promotional Block

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | `335:12023` | — |
| Layout | Horizontal (text left, image right) | `display: flex; flex-direction: row` |
| Background | Dark surface | Visually distinct from award cards |

**Content Structure:**

| Element | Style |
|---------|-------|
| Label "Phong trào ghi nhận" | Small text, above title |
| Title "Sun\* Kudos" | Large heading, prominent |
| Sub-label "BIẾN MỚI CỦA SAA 2025" | Secondary text |
| Description text | Body paragraph about the Kudos program |
| Illustration | "KUDOS" wordmark logo/graphic (right side) |

**"Chi tiết" Button:**

| Property | Value |
|----------|-------|
| **Node ID** | `I335:12023;313:8426` |
| Type | Text link with arrow icon |
| Font | Montserrat 16px/24px 500, letter-spacing: 0.15px |
| Color | `#FFEA9E` |
| Padding | 8px 0 |
| Min-height | 44px (constitution Principle VI — touch target) |
| Icon | Arrow right, 24×24px, same color |
| Hover | Opacity 0.8, slight translate-x |
| Focus | `outline: 2px solid #FFEA9E; outline-offset: 2px` |
| Action | Navigate to Sun\* Kudos page |

---

### Footer

| Property | Value | CSS |
|----------|-------|-----|
| **Node ID** | (shared layout component) | — |
| Width | 1440px | `width: 100%` |
| Padding | 40px 90px | `padding: 40px 90px` |
| Background | `#00101A` (same as page) | `background: var(--color-bg-dark)` |
| Border-top | `1px solid #2E3940` | `border-top: 1px solid var(--color-divider)` |
| Display | flex | `display: flex; justify-content: space-between; align-items: center` |

**Footer Nav Links:**

| Property | Value |
|----------|-------|
| Font | Montserrat 16px/24px 700, letter-spacing: 0.15px |
| Color | `#FFFFFF` |
| Active link | color: `#FFEA9E`, border-bottom: `1px solid #FFEA9E` ("Award Information") |

**Footer Copyright:**

| Property | Value |
|----------|-------|
| Font | Montserrat Alternates 16px/24px 700 |
| Color | `#FFFFFF` |
| Text | "Bản quyền thuộc về Sun\* © 2025" |

---

## Component Hierarchy with Styles

```
Page (bg: #00101A, min-h: 100vh)
├── Header (w: 100%, h: 80px, bg: rgba(16,20,23,0.8), sticky top-0, z-50)
│   ├── LeftGroup (flex, gap: 64px, items-center)
│   │   ├── Logo (52×48px, background-image)
│   │   └── NavLinks (flex, gap: 24px)
│   │       ├── "About SAA 2025" (16px/700, #FFF)
│   │       ├── "Award Information" (16px/700, #FFEA9E, border-b, glow) ← ACTIVE
│   │       └── "Sun* Kudos" (16px/700, #FFF)
│   └── RightGroup (flex, gap: 16px, items-center)
│       ├── Notification (40×40px, icon + red dot)
│       ├── LanguageSelector (VN ▼)
│       └── UserButton (40×40px, border: 1px #998C5F)
│
├── Keyvisual (w: 100%, h: 547px)
│   ├── BackgroundImage (cover, center)
│   └── GradientOverlay (linear-gradient bottom)
│
└── MainContent (px: 144px, py: 96px, gap: 120px, flex-col)
    ├── RootFurtherLogo (338×150px, background-image)
    │
    ├── TitleSection (w: 1152px, gap: 16px, flex-col)
    │   ├── SubHeading "Sun* Annual Awards 2025" (24px/700, #FFF, center)
    │   ├── Divider (w: 100%, h: 1px, bg: #2E3940)
    │   └── MainHeading "Hệ thống giải thưởng SAA 2025" (57px/700, #FFEA9E)
    │
    ├── AwardsSection (w: 1152px, flex-row, gap: 80px)
    │   ├── MenuList (w: 178px, sticky, flex-col, gap: 16px)
    │   │   ├── MenuItem "Top Talent" (active: #FFEA9E + border-b + glow)
    │   │   ├── MenuItem "Top Project" (default: #FFF)
    │   │   ├── MenuItem "Top Project Leader"
    │   │   ├── MenuItem "Best Manager"
    │   │   ├── MenuItem "Signature 2025 Creator"
    │   │   └── MenuItem "MVP"
    │   │
    │   └── AwardCards (w: 853px, flex-col, gap: 80px)
    │       ├── AwardCard "Top Talent" (flex-col, gap: 80px)
    │       │   ├── CardRow (flex-row, gap: 40px)
    │       │   │   ├── AwardImage (336×336, border: #FFEA9E, r: 24px, glow)
    │       │   │   └── CardContent (480px, flex-col, gap: 32px, backdrop-blur)
    │       │   │       ├── TitleRow (icon + "Top Talent" 24px #FFEA9E)
    │       │   │       ├── Description (16px #FFF, justified)
    │       │   │       ├── Divider (480px × 1px, #2E3940)
    │       │   │       ├── QuantityRow (icon + label #FFEA9E + "10" 36px #FFF + "Cá nhân")
    │       │   │       ├── Divider
    │       │   │       └── ValueRow (icon + label #FFEA9E + "7.000.000 VNĐ" 36px #FFF)
    │       │   └── BottomDivider (853px × 1px, #2E3940)
    │       │
    │       ├── AwardCard "Top Project" (same structure)
    │       ├── AwardCard "Top Project Leader"
    │       ├── AwardCard "Best Manager"
    │       ├── AwardCard "Signature 2025 - Creator" (SPECIAL: two "Giá trị" rows)
    │       │   ├── CardRow (flex-row, gap: 40px) — same as above
    │       │   └── CardContent (480px, flex-col, gap: 32px, backdrop-blur)
    │       │       ├── TitleRow (icon + "Signature 2025 - Creator" 24px #FFEA9E)
    │       │       ├── Description (16px #FFF, justified)
    │       │       ├── Divider
    │       │       ├── QuantityRow (icon + label + "01" + "Cá nhân" + "Tập thể")
    │       │       ├── Divider
    │       │       ├── ValueRow "cho giải cá nhân" (5.000.000 VNĐ)
    │       │       ├── Divider
    │       │       └── ValueRow "cho giải tập thể" (8.000.000 VNĐ)
    │       │
    │       ├── AwardCard "MVP"
    │       │
    │       └── SunKudosBlock (flex-row)
    │           ├── ContentLeft (title, description, CTA button)
    │           └── ImageRight (illustration)
    │
    └── Footer (w: 100%, py: 40px, px: 90px, border-t: 1px #2E3940)
        ├── FooterNavLinks (flex, gap: 40px)
        │   ├── "About SAA 2025" (16px/700, #FFF)
        │   ├── "Award Information" (16px/700, #FFEA9E, border-b) ← ACTIVE
        │   ├── "Sun* Kudos" (16px/700, #FFF)
        │   └── "Tiêu chuẩn chung" (16px/700, #FFF)
        └── Copyright "Bản quyền thuộc về Sun* © 2025" (Montserrat Alt, 16px/700, #FFF)
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Tailwind Prefix |
|------|-----------|-----------------|
| Mobile | 0px | (default) |
| Tablet | 768px | `md:` |
| Desktop | 1280px | `xl:` |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Page padding | 16px horizontal |
| Header | Compact: hamburger menu or simplified nav |
| Keyvisual | Height reduced (~300px), still cover |
| Title | Font-size reduced to 32px |
| Left Menu | Converts to horizontal scrollable tabs at top or hidden |
| Award Card | Single column, image stacks above content, full width |
| Award Image | 100% width, max 336px, centered |
| Card Content | Full width |
| Sun\* Kudos Block | Stacks vertically |

#### Tablet (768px – 1279px)

| Component | Changes |
|-----------|---------|
| Page padding | 48px horizontal |
| Title | Font-size ~40px |
| Left Menu | May collapse or remain as narrow sidebar ~120px |
| Award Card | Image + content may still row layout with reduced sizes |
| Award Image | 250px |
| Card Content | flex-1 |

#### Desktop (≥ 1280px)

| Component | Changes |
|-----------|---------|
| Full layout | As designed — 1440px canvas, 144px padding |
| Two-column | Left menu 178px + 80px gap + Cards 853px |
| Keyvisual | 547px height, full cover |

---

## Icon Specifications

| Icon Name | Size | Node ID Reference | Usage |
|-----------|------|-------------------|-------|
| MM_MEDIA_Target | 24×24px | `214:1808` | Menu item prefix icon, award title icon |
| MM_MEDIA_Diamond | 24×24px | `214:1817` | "Số lượng giải thưởng" prefix icon |
| MM_MEDIA_License | 24×24px | `214:1830` | "Giá trị giải thưởng" prefix icon |
| MM_MEDIA_Noti | 24×24px | `178:815` | Header notification bell |
| MM_MEDIA_User Profile | 24×24px | `186:1611` | Header user avatar |
| MM_MEDIA_Down | 24×24px | `186:1862` | Language dropdown arrow |
| MM_MEDIA_VN | 24×24px | `178:1019` | Vietnam flag for language selector |
| MM_MEDIA_Logo | 52×48px | `178:1030` | Site logo |
| MM_MEDIA_Root Further Logo | 338×150px | — | Campaign logo in hero area |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Menu Item | color, border-bottom, text-shadow | 200ms | ease-in-out | Scroll / Click (active state change) |
| Menu Item | background-color | 150ms | ease-in-out | Hover |
| Award Section | scroll-behavior | 500ms | ease-out | Menu item click (smooth scroll) |
| "Chi tiết" Button | opacity, transform | 150ms | ease-in-out | Hover |

---

## Implementation Mapping

| Design Element | Figma Node ID | Tailwind / CSS | React Component |
|----------------|---------------|----------------|-----------------|
| Page Container | `313:8436` | `bg-[var(--color-bg-dark)] min-h-screen` | `<AwardSystemPage />` |
| Header | `313:8440` | Shared `<Header />` component | `<Header activeNav="awards" />` |
| Keyvisual | `313:8437` | `w-full h-[547px] bg-cover bg-center relative` | `<HeroBanner />` |
| Title Section | `313:8453` | `flex flex-col gap-4 items-center` | `<AwardsTitleSection />` |
| Menu List | `313:8459` | `w-[178px] sticky top-24 flex flex-col gap-4` | `<AwardsCategoryNav />` |
| Menu Item | `313:8460` etc. | `px-4 py-4 flex items-center gap-1 text-sm font-bold` | `<CategoryNavItem />` |
| Award Card | `313:8467` etc. | `flex flex-col gap-20` | `<AwardCard />` |
| Award Image | `I313:8467;214:2525` | `w-[336px] h-[336px] rounded-3xl border border-[var(--color-accent-yellow)]` | `<AwardImage />` |
| Award Content | `I313:8467;214:2526` | `w-[480px] flex flex-col gap-8 backdrop-blur-[32px] rounded-2xl` | `<AwardContent />` |
| Sun\* Kudos Block | `335:12023` | `flex flex-row` | `<SunKudosPromo />` |
| "Chi tiết" Button | `I335:12023;313:8426` | `text-link font-medium` | `<CTALink />` |
| Footer | (shared) | `w-full border-t border-[var(--color-divider)] py-10 px-[90px]` | `<Footer activeNav="awards" />` |

---

## Notes

- All colors reuse design tokens already defined in the Homepage SAA design-style (shared dark theme).
- Font family is exclusively **Montserrat** across all text elements on this screen.
- Award images use `mix-blend-mode: screen` which creates a luminous effect on the dark background — this requires careful implementation with `next/image` (may need a wrapper div).
- The `backdrop-filter: blur(32px)` on card content creates a frosted glass effect and must be tested across browsers (Firefox may need `-webkit-backdrop-filter`).
- The left navigation is designed at 178px width with sticky positioning — sticky container must account for header height offset.
- **Signature 2025 - Creator** card is the only card with two "Giá trị giải thưởng" rows (cá nhân + tập thể). The `<AwardCard />` component must handle this variant.
- Design tokens in this file align with existing CSS custom properties in `src/app/globals.css`. The `--color-homepage-header-bg` variable already matches the header background used here.
- **Existing homepage components** (`src/components/homepage/`): `AwardCard.tsx`, `AwardCardImage.tsx`, `AwardsGrid.tsx`, `AwardsSection.tsx`, `SunKudosBlock.tsx` are **homepage preview** versions. The Award System page will need its own dedicated components (proposed names in Implementation Mapping table) that may share styling patterns but serve a different layout (full-page two-column vs. homepage grid preview).
