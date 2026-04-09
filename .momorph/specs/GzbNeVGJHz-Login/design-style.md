# Design Style: Login

**Frame ID**: `GzbNeVGJHz`
**Internal Node ID**: `662:14387`
**Frame Name**: `Login`
**Figma Link**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C?node-id=662:14387
**Extracted At**: 2026-04-08

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| `--color-bg-dark` | `#00101A` | 100% | Page background, button text, gradient base |
| `--color-bg-dark-alt` | `#000D14` | 100% | Gradient target (rgba(0,19,32)) |
| `--color-header-bg` | `#0B0F12` | 80% | Header background (rgba(11,15,18,0.8)) |
| `--color-accent-yellow` | `#FFEA9E` | 100% | Login button background |
| `--color-white` | `#FFFFFF` | 100% | Text on dark backgrounds |
| `--color-divider` | `#2E3940` | 100% | Footer top border |
| `--color-error` | `#FF4D4F` | 100% | Inline error message text below login button |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| `--text-language` | Montserrat | 16px | 700 | 24px | 0.15px | Language switcher label |
| `--text-hero-body` | Montserrat | 20px | 700 | 40px | 0.5px | Hero description text |
| `--text-button-lg` | Montserrat | 22px | 700 | 28px | 0px | Login button label |
| `--text-footer` | Montserrat Alternates | 16px | 700 | 24px | 0% | Footer copyright text |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| `--spacing-header-px` | 144px | Header horizontal padding |
| `--spacing-header-py` | 12px | Header vertical padding |
| `--spacing-content-px` | 144px | Main content horizontal padding |
| `--spacing-content-py` | 96px | Main content vertical padding |
| `--spacing-footer-px` | 90px | Footer horizontal padding |
| `--spacing-footer-py` | 40px | Footer vertical padding |
| `--spacing-content-gap` | 80px | Gap between key visual & text block |
| `--spacing-text-gap` | 24px | Gap inside text block |
| `--spacing-button-gap` | 8px | Gap inside button (icon + text) |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| `--radius-button` | 8px | Login button border-radius |
| `--radius-lang-btn` | 4px | Language toggle button border-radius |
| `--border-divider` | 1px solid #2E3940 | Footer top border |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| `--shadow-button-hover` | `0 4px 16px rgba(255, 234, 158, 0.35)` | Login button hover — subtle yellow glow lift |

Page-level elevation is handled via background gradients (see Gradients section).

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| Gradient — side veil | `linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0,16,26,0.00) 100%)` | Left-side overlay to darken key visual |
| Gradient — bottom veil | `linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0.00) 51.74%)` | Bottom overlay for depth/footer blend |

---

## Layout Specifications

### Frame Canvas

| Property | Value |
|----------|-------|
| Width | 1440px |
| Height | 1024px |
| Background | `#00101A` |

### Layout Structure (ASCII)

```
┌────────────────────────────────────────────────────────┐
│  A_Header  (1440 × 80px, bg: #0B0F12 at 80%)          │
│  px: 144px  py: 12px  justify: space-between           │
│  ┌─────────────────┐            ┌──────────────────┐   │
│  │ A.1_Logo 52×56  │            │ A.2_Language 108×56│ │
│  └─────────────────┘            └──────────────────┘   │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│  C_Keyvisual (1441 × 1022px) — full-bleed bg artwork  │
│  [Background image covering entire canvas]             │
│                                                        │
│  Overlays (absolute, z-layered):                       │
│   • Rectangle 57: gradient left-to-right veil          │
│   • Cover: gradient bottom veil                        │
│                                                        │
│  B_Bìa (1440 × 845px)  px: 144px  py: 96px           │
│  gap: 120px, column flex                               │
│  ┌───────────────────────────────────────────────────┐ │
│  │ B.1_Key Visual  (451 × 200px, at y=288 from top)  │ │
│  │ "ROOT FURTHER" logo image                          │ │
│  └───────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────┐ │
│  │ Frame 550 (496 × 164px) – content block           │ │
│  │  pl: 16px  gap: 24px column                       │ │
│  │  ┌─────────────────────────────────────────────┐  │ │
│  │  │ B.2_content  (480 × 80px)                   │  │ │
│  │  │ "Bắt đầu hành trình của bạn cùng SAA 2025." │  │ │
│  │  │ "Đăng nhập để khám phá!"                    │  │ │
│  │  │ Montserrat 20px/700  lh:40px  ls:0.5px      │  │ │
│  │  └─────────────────────────────────────────────┘  │ │
│  │  ┌─────────────────────────────────────────────┐  │ │
││  │  │ B.3_Login  (305 × 60px)                     │  │ │
│  │  │ bg: #FFEA9E  radius: 8px  px:24px  py:16px  │  │ │
│  │  │ LOGIN With Google  [Google icon 24×24]       │  │ │
│  │  └─────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────┐
│  D_Footer  (1440px × 91px)                             │
│  px: 90px  py: 40px  border-top: 1px solid #2E3940    │
│  justify: space-between  align-center                  │
│        "Bản quyền thuộc về Sun* © 2025"               │
│        Montserrat Alternates 16px/700  #FFFFFF         │
└────────────────────────────────────────────────────────┘
```

---

## Responsive Behavior

Design is desktop-first (1440px Figma canvas). Below are the required adaptations per
constitution v1.1.0 Principle VI. All dimensions are **maximum** at desktop; scale down
fluidly to the breakpoints listed.

| Breakpoint | Viewport | Key Layout Changes |
|------------|----------|--------------------|
| Mobile | 0–767px | Header: `px-4`; Logo shrinks to `w-10 h-10`; Language button text hidden (flag + chevron only); Hero: `px-4 py-16`; `ROOT FURTHER` image `w-full max-w-[320px]`; Description text `text-base leading-7`; Login button `w-full`; Footer: `px-4 py-6` center-aligned |
| Tablet | 768–1279px | Header: `px-10`; Hero: `px-10 py-20`; `ROOT FURTHER` image `max-w-[340px]`; Login button fixed `w-[305px]`; Footer: `px-10` |
| Desktop | ≥ 1280px | Full Figma design: `px-36` header/hero; `ROOT FURTHER` image `w-[451px] h-[200px]`; Login button `w-[305px]` |

**Touch targets**: Language button and Login button MUST be ≥ 44×44px at every
breakpoint (already satisfied at desktop; verify at mobile — add `min-h-[44px]` if
calculated height falls below 44px after padding reduction).

**Horizontal scroll**: Forbidden. The background image MUST use `object-cover` and
not overflow the viewport at any breakpoint.

---

## Component Style Details

### A_Header — Top Navigation Bar

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `662:14391` | — |
| width | 1440px | `w-full` |
| height | 80px | `h-20` |
| padding | 12px 144px | `py-3 px-36` |
| background | rgba(11,15,18,0.8) | `bg-[#0B0F12]/80` |
| display | flex row | `flex flex-row` |
| justify-content | space-between | `justify-between` |
| align-items | center | `items-center` |
| position | absolute, top: 0 | `absolute top-0` |
| z-index | above keyvisual | `z-10` |

---

### A.1_Logo — SAA 2025 Logo

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I662:14391;186:2166` | — |
| width | 52px | `w-[52px]` |
| height | 56px | `h-14` |
| type | Image (MM_MEDIA) | `<img>` |
| interaction | None (non-interactive) | — |

---

### A.2_Language — Language Selector Button

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `I662:14391;186:1601` | — |
| width | 108px | `w-[108px]` |
| height | 56px | `h-14` |
| padding | 16px | `p-4` |
| border-radius | 4px | `rounded` |
| display | flex row | `flex flex-row` |
| gap | 2px | `gap-0.5` |
| justify-content | space-between | `justify-between` |
| align-items | center | `items-center` |
| cursor | pointer | `cursor-pointer` |

**Internal elements:**
- Flag icon (MM_MEDIA_VN): 24×24px, Vietnamese flag image
- Label "VN": Montserrat, 16px, 700, #FFFFFF, 24px line-height
- Chevron down icon (MM_MEDIA_Down): 24×24px

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | transparent |
| Hover | background | rgba(255,255,255,0.08) |
| Focus | outline | 2px solid rgba(255,255,255,0.5); outline-offset: 2px |
| Active | background | rgba(255,255,255,0.12) |

**Navigation:** on_click → `Dropdown-ngôn ngữ` (screen: `721:4942`)

---

### B.1_Key Visual — ROOT FURTHER Logo Image

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `662:14395` | — |
| width | 451px | `w-[451px]` |
| height | 200px | `h-[200px]` |
| type | Image (MM_MEDIA_Root Further Logo) | `<img>` |
| object-fit | cover | `object-cover` |
| interaction | None | — |

---

### B.2_content — Hero Description Text

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `662:14753` | — |
| width | 480px | `w-[480px]` |
| height | 80px | `h-20` |
| font-family | Montserrat | `font-montserrat` |
| font-size | 20px | `text-[20px]` |
| font-weight | 700 | `font-bold` |
| line-height | 40px | `leading-10` |
| letter-spacing | 0.5px | `tracking-[0.5px]` |
| color | #FFFFFF | `text-white` |
| text-align | left | `text-left` |

**Content:**
- Line 1: `Bắt đầu hành trình của bạn cùng SAA 2025.`
- Line 2: `Đăng nhập để khám phá!`

---

### B.3_Login — Google Login Button

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `662:14425` (container), `662:14426` (button) | — |
| width | 305px | `w-[305px]` |
| height | 60px | `h-[60px]` |
| padding | 16px 24px | `py-4 px-6` |
| background | `#FFEA9E` | `bg-[#FFEA9E]` |
| border-radius | 8px | `rounded-lg` |
| display | flex row | `flex flex-row` |
| align-items | center | `items-center` |
| gap | 8px | `gap-2` |
| cursor | pointer | `cursor-pointer` |

**Button label:**
- Text: `LOGIN With Google`
- Font: Montserrat, 22px, 700, 28px line-height
- Color: `#00101A` (`text-[#00101A]`)

**Trailing icon:**
- MM_MEDIA_Google: 24×24px, Google logo image

**States:**

| State | Property | Value |
|-------|----------|-------|
| Default | background | `#FFEA9E`; box-shadow: none |
| Hover | background | `#FFE082`; box-shadow: `0 4px 16px rgba(255,234,158,0.35)` (lift effect) |
| Focus | outline | `2px solid #FFEA9E`; outline-offset: 2px |
| Loading | opacity | 0.6; spinner replaces Google icon; pointer-events: none |
| Disabled | opacity | 0.4; pointer-events: none; cursor: not-allowed |

**Action:** on_click → Google OAuth flow

---

### D_Footer — Copyright Footer

| Property | Value | CSS / Tailwind |
|----------|-------|----------------|
| **Node ID** | `662:14447` | — |
| width | 1440px | `w-full` |
| padding | 40px 90px | `py-10 px-[90px]` |
| border-top | 1px solid `#2E3940` | `border-t border-[#2E3940]` |
| display | flex | `flex` |
| justify-content | space-between | `justify-between` |
| align-items | center | `items-center` |
| position | absolute, bottom: 0 | `absolute bottom-0` |

**Copyright text:**
- `Bản quyền thuộc về Sun* © 2025`
- Font: Montserrat Alternates, 16px, 700, 24px line-height, #FFFFFF

---

## Implementation Mapping

| Node ID | Component Name | React Component | Tailwind Key Classes |
|---------|----------------|-----------------|----------------------|
| `662:14387` | Login (root) | `LoginPage` | `relative min-h-screen bg-[#00101A]` |
| `662:14388` | C_Keyvisual | `<img>` / CSS background | `absolute inset-0 w-full h-full object-cover` |
| `662:14391` | A_Header | `Header` | `absolute top-0 w-full h-20 flex justify-between items-center px-36 py-3 bg-[#0B0F12]/80` |
| `I662:14391;186:2166` | A.1_Logo | `<img>` | `w-[52px] h-14 object-contain` |
| `I662:14391;186:1601` | A.2_Language | `LanguageToggle` | `flex items-center gap-0.5 cursor-pointer rounded p-4` |
| `662:14393` | B_Bìa | `HeroSection` | `absolute flex flex-col px-36 py-24 gap-[120px]` |
| `662:14395` | B.1_Key Visual | `<img>` | `w-[451px] h-[200px] object-cover` |
| `662:14753` | B.2_content | `<p>` | `text-white font-bold text-[20px] leading-10 tracking-[0.5px]` |
| `662:14425` | B.3_Login | `LoginButton` | `w-[305px] h-[60px] bg-[#FFEA9E] rounded-lg flex items-center gap-2 px-6 py-4 cursor-pointer` |
| `662:14447` | D_Footer | `Footer` | `absolute bottom-0 w-full flex justify-between items-center px-[90px] py-10 border-t border-[#2E3940]` |
