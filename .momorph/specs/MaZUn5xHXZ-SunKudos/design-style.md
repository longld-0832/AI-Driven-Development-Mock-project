# Design Style: Sun* Kudos

**Frame ID**: `MaZUn5xHXZ`
**Frame Name**: `Sun* Kudos - Live board`
**MoMorph Link**: https://momorph.ai/files/9ypp4enmFmdK3YAFJLIu6C/screens/MaZUn5xHXZ
**Extracted At**: 2026-04-14

---

## Design Tokens

### Colors

| Token Name | Hex Value | Opacity | Usage |
|------------|-----------|---------|-------|
| `--color-bg-dark` | `#00101A` | 100% | Page background |
| `--color-header-bg` | `#101417` | 80% | Header background (`rgba(16,20,23,0.8)`) |
| `--color-accent-yellow` | `#FFEA9E` | 100% | Active nav link, section headings, hashtag pills, heart icon |
| `--color-white` | `#FFFFFF` | 100% | Body text, card text, nav links, footer text |
| `--color-border` | `#998C5F` | 100% | Card borders, input borders |
| `--color-divider` | `#2E3940` | 100% | Footer top border, section dividers |
| `--color-surface-dark` | `#0F0F0F` | 100% | Kudo card background |
| `--color-surface-card` | `#1A1A2E` | 100% | Spotlight board background, stat panel |
| `--color-hero-gradient-start` | `#00101A` | 100% | Hero section gradient start |
| `--color-hero-gradient-end` | `#1A0F2E` | 100% | Hero section gradient end (dark purple) |
| `--color-hashtag-bg` | `#FFEA9E` | 15% | Hashtag pill background (`rgba(255,234,158,0.15)`) |
| `--color-hashtag-text` | `#FFEA9E` | 100% | Hashtag pill text |
| `--color-heart` | `#FF4D4D` | 100% | Heart/like icon filled state |
| `--color-heart-unfilled` | `#FFFFFF` | 60% | Heart/like icon unfilled state (`rgba(255,255,255,0.6)`) |
| `--color-stat-value` | `#FFEA9E` | 100% | Stat values on right panel |
| `--color-avatar-border` | `#FFEA9E` | 100% | Avatar border in spotlight |
| `--color-rank-gold` | `#FFD700` | 100% | Top ranker indicators |
| `--color-btn-secret-box` | `#FFEA9E` | 100% | "Mở Secret Box" button background |
| `--color-btn-secret-box-text` | `#00101A` | 100% | "Mở Secret Box" button text |
| `--color-role-text` | `#FFFFFF` | 60% | Role/department text in cards (`rgba(255,255,255,0.6)`) |
| `--color-play-btn` | `#FFFFFF` | 80% | Video play button overlay |

### Typography

| Token Name | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
|------------|-------------|------|--------|-------------|----------------|-------|
| `--text-hero-title` | SVN-Gotham | 80px | 400 | 88px | -13% | "KUDOS" wordmark in hero |
| `--text-hero-subtitle` | Montserrat | 20px | 700 | 28px | 0px | "Hệ thống ghi nhận và cảm ơn" |
| `--text-section-heading` | Montserrat | 57px | 700 | 64px | -0.25px | "HIGHLIGHT KUDOS", "SPOTLIGHT BOARD", "ALL KUDOS" |
| `--text-section-label` | Montserrat | 16px | 700 | 24px | 0.15px | "Sun* Annual Awards 2025" section labels |
| `--text-filter-btn` | Montserrat | 14px | 600 | 20px | 0.1px | "Hashtag" / "Phòng ban" filter buttons |
| `--text-card-sender` | Montserrat | 14px | 700 | 20px | 0px | Sender/receiver name in kudo cards |
| `--text-card-role` | Montserrat | 12px | 400 | 16px | 0px | Role/department text in kudo cards |
| `--text-card-date` | Montserrat | 12px | 400 | 16px | 0px | Date range text |
| `--text-card-idol` | Montserrat | 14px | 700 | 20px | 0px | "IDOL GIỚI TRẺ" category label |
| `--text-card-body` | Montserrat | 14px | 400 | 20px | 0.25px | Kudo message body text |
| `--text-hashtag` | Montserrat | 12px | 600 | 16px | 0px | Hashtag pill text (#Dedicated, #Inspiring) |
| `--text-like-count` | Montserrat | 14px | 700 | 20px | 0px | "1,000" like count |
| `--text-copy-link` | Montserrat | 14px | 500 | 20px | 0px | "Copy Link" action text |
| `--text-stat-label` | Montserrat | 14px | 400 | 20px | 0px | Stat labels (Số Kudos bạn nhận được, etc.) |
| `--text-stat-value` | Montserrat | 20px | 700 | 28px | 0px | Stat values (25, etc.) |
| `--text-spotlight-count` | Montserrat | 32px | 700 | 40px | 0px | "388 KUDOS" spotlight count |
| `--text-spotlight-name` | Montserrat | 14px | 600 | 20px | 0px | Spotlight user name |
| `--text-nav` | Montserrat | 14px | 700 | 20px | 0.1px | Header nav links |
| `--text-footer-nav` | Montserrat | 16px | 700 | 24px | 0.15px | Footer nav links |
| `--text-footer-copy` | Montserrat Alternates | 16px | 700 | 24px | 0% | Footer copyright |
| `--text-search-input` | Montserrat | 14px | 400 | 20px | 0px | Search input placeholder |
| `--text-pagination` | Montserrat | 16px | 500 | 24px | 0px | Pagination "2/5" text |
| `--text-ranker-label` | Montserrat | 12px | 600 | 16px | 0px | "10 SUNNER NHẬN QUÀ NỐI NHẤT" text |
| `--text-ranker-name` | Montserrat | 13px | 600 | 18px | 0px | Ranker name in leaderboard |
| `--text-ranker-dept` | Montserrat | 11px | 400 | 14px | 0px | Ranker department text |

### Spacing

| Token Name | Value | Usage |
|------------|-------|-------|
| `--spacing-page-px` | 144px | Main content horizontal padding (desktop) |
| `--spacing-page-py` | 96px | Main content vertical padding (desktop) |
| `--spacing-section-gap` | 80px | Gap between major sections |
| `--spacing-hero-inner` | 24px | Internal gap within hero section |
| `--spacing-card-padding` | 24px | Kudo card internal padding |
| `--spacing-card-gap` | 16px | Gap between kudo card elements |
| `--spacing-cards-gap` | 32px | Gap between kudo cards in the feed |
| `--spacing-highlight-gap` | 24px | Gap between highlight carousel cards |
| `--spacing-filter-gap` | 12px | Gap between filter buttons |
| `--spacing-stat-gap` | 16px | Gap between stat rows |
| `--spacing-avatar-gap` | 12px | Gap between sender/receiver in card header |
| `--spacing-hashtag-gap` | 8px | Gap between hashtag pills |
| `--spacing-leaderboard-gap` | 12px | Gap between leaderboard entries |
| `--spacing-header-px` | 144px | Header horizontal padding |
| `--spacing-footer-px` | 90px | Footer horizontal padding |
| `--spacing-footer-py` | 40px | Footer vertical padding |

### Border & Radius

| Token Name | Value | Usage |
|------------|-------|-------|
| `--radius-card` | 16px | Kudo card border radius |
| `--radius-btn` | 8px | Filter buttons, secondary buttons |
| `--radius-pill` | 100px | Hashtag pills, avatar |
| `--radius-search-input` | 100px | Search input field (hero) |
| `--radius-spotlight` | 16px | Spotlight board card |
| `--radius-stat-panel` | 16px | Personal stat panel |
| `--radius-avatar` | 50% | User avatars (circle) |
| `--radius-secret-box-btn` | 8px | "Mở Secret Box" button |
| `--border-card` | `1px solid #998C5F` | Kudo card border |
| `--border-filter-btn` | `1px solid #998C5F` | Filter button border |
| `--border-search` | `1px solid #998C5F` | Search input border |
| `--border-footer` | `1px solid #2E3940` | Footer top border |
| `--border-nav-active` | `1px solid #FFEA9E` | Active nav link underline |

### Shadows

| Token Name | Value | Usage |
|------------|-------|-------|
| `--shadow-card` | `0 2px 8px rgba(0,0,0,0.3)` | Kudo card shadow |
| `--shadow-spotlight` | `0 4px 24px rgba(255,234,158,0.15)` | Spotlight board glow |
| `--shadow-hero` | `0 0 60px rgba(255,234,158,0.1)` | Hero section subtle glow |
| `--shadow-btn-hover` | `0 4px 16px rgba(255,234,158,0.35)` | Button hover glow |

---

## Layout Specifications

### Container

| Property | Value | Notes |
|----------|-------|-------|
| max-width | 1512px | Full design canvas width |
| content-width | ~1224px | Content within page padding |
| padding-x | 144px | Desktop horizontal padding |
| background | `#00101A` | Dark background |

### Layout Structure (ASCII)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  HEADER (height: 56px, bg: rgba(16,20,23,0.8), sticky, z-50)           │
│  ┌──────┐  ┌──────────────────────────────────┐  ┌──────┐ ┌──────┐    │
│  │ Logo │  │ About SAA | Award Info | Sun*Kudos│  │ Bell │ │ Lang │    │
│  └──────┘  └──────────────────────────────────┘  └──────┘ └──────┘    │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  HERO SECTION (full-width, gradient bg with abstract art)                │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  "Hệ thống ghi nhận và cảm ơn"  (20px/700, white)              │    │
│  │  ★ KUDOS  (SVN-Gotham, 80px, yellow accent)                     │    │
│  │                                                                  │    │
│  │  ┌─────────────────────────────┐ ┌──────────────────────────┐   │    │
│  │  │ 🔍 Hôm nay bạn muốn gửi.. │ │ 🔍 Tìm kiếm profile     │   │    │
│  │  │ (search input, pill-shaped) │ │ (search input)           │   │    │
│  │  └─────────────────────────────┘ └──────────────────────────┘   │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  HIGHLIGHT KUDOS SECTION                                                 │
│  "Sun* Annual Awards 2025" (16px/700, white)                            │
│  "HIGHLIGHT KUDOS" (57px/700, yellow)                                   │
│                                                                          │
│  ┌──────────┐  ┌──────────┐                                            │
│  │ Hashtag ▼│  │Phòng ban▼│   (filter dropdowns, right-aligned)        │
│  └──────────┘  └──────────┘                                            │
│                                                                          │
│  ◄  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐  ►                    │
│     │ Kudo 1 │ │ Kudo 2 │ │ Kudo 3 │ │ Kudo 4 │   (horizontal         │
│     │ Card   │ │ Card   │ │ Card   │ │ Card   │    carousel)           │
│     └────────┘ └────────┘ └────────┘ └────────┘                        │
│                                                                          │
│              ◄   2/5   ►   (pagination)                                 │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  SPOTLIGHT BOARD SECTION                                                 │
│  "Sun* Annual Awards 2025"                                              │
│  "SPOTLIGHT BOARD" (57px/700, yellow)                                   │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  Spotlight Board Card (dark bg, rounded-16px)                    │   │
│  │  ┌──────────┐                                                    │   │
│  │  │ ▶ play   │  "388 KUDOS" (32px/700, white)                    │   │
│  │  │ video    │                                                    │   │
│  │  │ preview  │  Avatar grid with names, departments              │   │
│  │  │          │  Scrolling ticker of recent kudos                  │   │
│  │  └──────────┘                                                    │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ALL KUDOS SECTION (two-column layout)                                   │
│  "Sun* Annual Awards 2025"                                              │
│  "ALL KUDOS" (57px/700, yellow)                                         │
│                                                                          │
│  ┌──────────────────────────────────┐ ┌─────────────────────────────┐   │
│  │  Kudo Feed (scrollable)          │ │  Personal Stats Panel       │   │
│  │                                  │ │  ┌───────────────────────┐  │   │
│  │  ┌──────────────────────────┐   │ │  │ Số Kudos bạn nhận:  25│  │   │
│  │  │  Kudo Card               │   │ │  │ Số Kudos bạn đã gửi:25│  │   │
│  │  │  ┌─────┐ → ┌─────┐     │   │ │  │ Tổng số nhận được: 🔥25│  │   │
│  │  │  │Sender│   │Recvr│     │   │ │  │ Số Secret Box đã mở: 25│  │   │
│  │  │  └─────┘   └─────┘     │   │ │  │ Số Secret Box chưa mở:25│  │   │
│  │  │  Date range              │   │ │  └───────────────────────┘  │   │
│  │  │  "IDOL GIỚI TRẺ"        │   │ │                             │   │
│  │  │  Message body...         │   │ │  ┌ Mở Secret Box 🎁 ┐     │   │
│  │  │  📷📷📷📷 (images)      │   │ │  └───────────────────┘     │   │
│  │  │  #Dedicated #Inspiring.. │   │ │                             │   │
│  │  │  ❤️ 1,000   Copy Link 🔗│   │ │  10 SUNNER NHẬN QUÀ        │   │
│  │  └──────────────────────────┘   │ │  NỐI NHẤT                  │   │
│  │                                  │ │  ┌──────────────────────┐  │   │
│  │  ┌──────────────────────────┐   │ │  │ 1. Huỳnh Đường Xuân  │  │   │
│  │  │  Kudo Card 2             │   │ │  │ 2. Huỳnh Đường Xuân  │  │   │
│  │  │  ...                     │   │ │  │ 3. Huỳnh Đường Xuân  │  │   │
│  │  └──────────────────────────┘   │ │  │ ...                   │  │   │
│  │                                  │ │  └──────────────────────┘  │   │
│  └──────────────────────────────────┘ └─────────────────────────────┘   │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│  FOOTER (border-top: 1px solid #2E3940, padding: 40px 90px)             │
│  Logo  |  About SAA  |  Award Info  |  Sun* Kudos  |  Terms  |  ©2025  │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Component Style Details

### Hero Section

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| min-height | ~320px | `min-height: 320px` |
| background | gradient with abstract art overlay | `background: linear-gradient(135deg, #00101A 0%, #1A0F2E 100%)` |
| padding | 64px 144px | `padding: 64px var(--spacing-page-px)` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| align-items | center | `align-items: center` |
| gap | 24px | `gap: 24px` |

### Hero Title ("KUDOS" Wordmark)

| Property | Value | CSS |
|----------|-------|-----|
| font-family | SVN-Gotham | `font-family: 'SVN-Gotham'` |
| font-size | 80px | `font-size: 80px` |
| font-weight | 400 | `font-weight: 400` |
| color | `#FFEA9E` | `color: var(--color-accent-yellow)` |
| letter-spacing | -13% | `letter-spacing: -0.13em` |
| text-transform | uppercase | `text-transform: uppercase` |

### Hero Subtitle

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 20px | `font-size: 20px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 28px | `line-height: 28px` |
| color | `#FFFFFF` | `color: var(--color-white)` |

### Search Input (Hero)

| Property | Value | CSS |
|----------|-------|-----|
| height | 48px | `height: 48px` |
| border-radius | 100px | `border-radius: 100px` |
| border | `1px solid #998C5F` | `border: 1px solid var(--color-border)` |
| background | transparent | `background: transparent` |
| padding | 12px 24px 12px 48px | `padding: 12px 24px 12px 48px` |
| font-size | 14px | `font-size: 14px` |
| color | `#FFFFFF` | `color: var(--color-white)` |
| placeholder-color | `rgba(255,255,255,0.5)` | `color: rgba(255,255,255,0.5)` |
| prefix-icon-size | 20px | `width: 20px; height: 20px` |
| prefix-icon-left | 16px | `left: 16px` |
| prefix-icon-color | `rgba(255,255,255,0.5)` | `color: rgba(255,255,255,0.5)` |

**Input Variants:**
| Input | Prefix Icon | Placeholder |
|-------|-------------|-------------|
| Send Kudo | Pencil/Edit icon | "Hôm nay, bạn muốn gửi lời cảm ơn và ghi nhận đến ai?" |
| Profile Search | Magnifying glass icon (🔍) | "Tìm kiếm profile Sunner" |

**States:**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #998C5F, bg: transparent |
| Focus | border-color: #FFEA9E, box-shadow: 0 0 0 2px rgba(255,234,158,0.2) |
| Filled | text color: #FFFFFF |

### Section Heading

| Property | Value | CSS |
|----------|-------|-----|
| font-family | Montserrat | `font-family: var(--font-montserrat)` |
| font-size | 57px | `font-size: 57px` |
| font-weight | 700 | `font-weight: 700` |
| line-height | 64px | `line-height: 64px` |
| letter-spacing | -0.25px | `letter-spacing: -0.25px` |
| color | `#FFEA9E` | `color: var(--color-accent-yellow)` |

### Filter Dropdown Buttons

| Property | Value | CSS |
|----------|-------|-----|
| height | 36px | `height: 36px` |
| padding | 8px 16px | `padding: 8px 16px` |
| border-radius | 8px | `border-radius: var(--radius-btn)` |
| border | `1px solid #998C5F` | `border: 1px solid var(--color-border)` |
| background | transparent | `background: transparent` |
| font-size | 14px | `font-size: 14px` |
| font-weight | 600 | `font-weight: 600` |
| color | `#FFFFFF` | `color: var(--color-white)` |
| chevron-icon | ▼ (8px, right of text) | `margin-left: 8px` |
| gap | 8px | `gap: 8px` (between text and chevron) |

**States:**
| State | Changes |
|-------|---------|
| Default | border: 1px solid #998C5F |
| Hover | border-color: #FFEA9E |
| Active/Open | background: rgba(255,234,158,0.1), border-color: #FFEA9E |

### Kudo Card (Highlight Carousel & Feed)

| Property | Value | CSS |
|----------|-------|-----|
| width | ~320px (carousel) / 100% (feed) | varies |
| background | `#0F0F0F` | `background: var(--color-surface-dark)` |
| border | `1px solid #998C5F` | `border: 1px solid var(--color-border)` |
| border-radius | 16px | `border-radius: var(--radius-card)` |
| padding | 24px | `padding: var(--spacing-card-padding)` |
| display | flex | `display: flex` |
| flex-direction | column | `flex-direction: column` |
| gap | 16px | `gap: var(--spacing-card-gap)` |

### Kudo Card — Sender/Receiver Row

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 12px | `gap: 12px` |
| avatar-size | 40px | `width: 40px; height: 40px` |
| avatar-radius | 50% | `border-radius: 50%` |
| name-font | 14px/700 Montserrat | `font-size: 14px; font-weight: 700` |
| role-font | 12px/400 Montserrat | `font-size: 12px; font-weight: 400` |
| name-color | `#FFFFFF` | `color: var(--color-white)` |
| role-color | `rgba(255,255,255,0.6)` | `color: rgba(255,255,255,0.6)` |
| arrow-icon | → (between sender and receiver) | `color: var(--color-accent-yellow)` |

### Kudo Card — Category Badge

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 14px | `font-size: 14px` |
| font-weight | 700 | `font-weight: 700` |
| color | `#FFEA9E` | `color: var(--color-accent-yellow)` |
| text-transform | uppercase | `text-transform: uppercase` |

### Kudo Card — Relationship Badge Pill

| Property | Value | CSS |
|----------|-------|-----|
| padding | 2px 8px | `padding: 2px 8px` |
| border-radius | 100px | `border-radius: 100px` |
| font-size | 10px | `font-size: 10px` |
| font-weight | 600 | `font-weight: 600` |
| line-height | 14px | `line-height: 14px` |
| display | inline-flex | `display: inline-flex` |

**Badge Variants:**
| Badge Text | Background | Text Color |
|-----------|------------|------------|
| Lãnh đạo | `rgba(255,234,158,0.2)` | `#FFEA9E` |
| Phòng ban | `rgba(76,175,80,0.2)` | `#81C784` |
| Cùng phòng | `rgba(33,150,243,0.2)` | `#64B5F6` |

### Kudo Card — Message Body

| Property | Value | CSS |
|----------|-------|-----|
| font-size | 14px | `font-size: 14px` |
| font-weight | 400 | `font-weight: 400` |
| line-height | 20px | `line-height: 20px` |
| color | `#FFFFFF` | `color: var(--color-white)` |
| max-lines | 4 | `display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden` |

### Kudo Card — Video Play Button

| Property | Value | CSS |
|----------|-------|-----|
| position | absolute (top-left of card) | `position: absolute; top: 16px; left: 16px` |
| width | 40px | `width: 40px` |
| height | 40px | `height: 40px` |
| border-radius | 50% | `border-radius: 50%` |
| background | `rgba(0,0,0,0.5)` | `background: rgba(0,0,0,0.5)` |
| icon-color | `#FFFFFF` | `color: white` |
| icon-size | 16px (triangle) | `font-size: 16px` |
| display | flex, center | `display: flex; align-items: center; justify-content: center` |
| cursor | pointer | `cursor: pointer` |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(0,0,0,0.7) |
| Hidden | display: none (when kudo has no video) |

### Kudo Card — Image Gallery

| Property | Value | CSS |
|----------|-------|-----|
| display | grid | `display: grid` |
| grid-template-columns | repeat(auto-fill, minmax(60px, 1fr)) | `grid-template-columns: repeat(auto-fill, minmax(60px, 1fr))` |
| gap | 8px | `gap: 8px` |
| image-radius | 8px | `border-radius: 8px` |
| image-aspect | 1/1 (square) | `aspect-ratio: 1` |
| object-fit | cover | `object-fit: cover` |

### Kudo Card — Hashtag Pills

| Property | Value | CSS |
|----------|-------|-----|
| padding | 4px 12px | `padding: 4px 12px` |
| border-radius | 100px | `border-radius: 100px` |
| background | `rgba(255,234,158,0.15)` | `background: var(--color-hashtag-bg)` |
| font-size | 12px | `font-size: 12px` |
| font-weight | 600 | `font-weight: 600` |
| color | `#FFEA9E` | `color: var(--color-accent-yellow)` |

### Kudo Card — Footer (Like & Copy Link)

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| justify-content | space-between | `justify-content: space-between` |
| align-items | center | `align-items: center` |
| border-top | `1px solid rgba(255,255,255,0.1)` | `border-top: 1px solid rgba(255,255,255,0.1)` |
| padding-top | 16px | `padding-top: 16px` |
| heart-icon-color | `#FF4D4D` (liked) / `rgba(255,255,255,0.6)` (unliked) | `color: var(--color-heart)` |
| like-count-font | 14px/700 | `font-size: 14px; font-weight: 700` |
| like-count-color | `#FFFFFF` | `color: white` |
| copy-link-font | 14px/500 | `font-size: 14px; font-weight: 500` |
| copy-link-color | `#FFFFFF` | `color: white` |
| copy-link-icon | external link (↗) 14px | `margin-left: 4px` |
| detail-link-font | 14px/500 Montserrat | `font-size: 14px; font-weight: 500` |
| detail-link-color | `#FFFFFF` | `color: var(--color-white)` |
| detail-link-icon | arrow-up-right (↗) 14px | `margin-left: 4px` |
| detail-link-visibility | carousel variant only | hidden in All Kudos feed variant |

### Personal Stats Panel (Right Sidebar)

| Property | Value | CSS |
|----------|-------|-----|
| width | ~320px | `width: 320px` |
| background | `#1A1A2E` | `background: var(--color-surface-card)` |
| border | `1px solid #998C5F` | `border: 1px solid var(--color-border)` |
| border-radius | 16px | `border-radius: var(--radius-stat-panel)` |
| padding | 24px | `padding: 24px` |
| position | sticky | `position: sticky` |
| top | 80px | `top: 80px` |

### Stats Row

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| justify-content | space-between | `justify-content: space-between` |
| label-font | 14px/400 Montserrat | `font-size: 14px; font-weight: 400` |
| label-color | `#FFFFFF` | `color: white` |
| value-font | 20px/700 Montserrat | `font-size: 20px; font-weight: 700` |
| value-color | `#FFEA9E` | `color: var(--color-accent-yellow)` |
| gap | 16px | `gap: 16px` (vertical between rows) |

### "Mở Secret Box" Button

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| height | 48px | `height: 48px` |
| background | `#FFEA9E` | `background: var(--color-accent-yellow)` |
| color | `#00101A` | `color: var(--color-bg-dark)` |
| border-radius | 8px | `border-radius: var(--radius-secret-box-btn)` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 700 | `font-weight: 700` |
| border | none | `border: none` |

**States:**
| State | Changes |
|-------|---------|
| Default | background: #FFEA9E |
| Hover | background: #FFE082, box-shadow: 0 4px 16px rgba(255,234,158,0.35) |
| Active | background: #FFD54F |

### Leaderboard Section (Right Sidebar)

| Property | Value | CSS |
|----------|-------|-----|
| title-font | 12px/600 Montserrat | `font-size: 12px; font-weight: 600` |
| title-color | `#FFEA9E` | `color: var(--color-accent-yellow)` |
| entry-height | 48px | `height: 48px` |
| entry-gap | 12px | `gap: 12px` |
| avatar-size | 32px | `width: 32px; height: 32px` |
| name-font | 13px/600 | `font-size: 13px; font-weight: 600` |
| dept-font | 11px/400 | `font-size: 11px; font-weight: 400` |
| rank-color | `#FFEA9E` | `color: var(--color-accent-yellow)` |

### Carousel Navigation Arrows

| Property | Value | CSS |
|----------|-------|-----|
| width | 48px | `width: 48px` |
| height | 48px | `height: 48px` |
| border-radius | 50% | `border-radius: 50%` |
| background | `rgba(255,255,255,0.1)` | `background: rgba(255,255,255,0.1)` |
| color | `#FFFFFF` | `color: white` |
| position | absolute | `position: absolute` |
| top | 50% | `top: 50%; transform: translateY(-50%)` |

**States:**
| State | Changes |
|-------|---------|
| Hover | background: rgba(255,255,255,0.2) |
| Disabled | opacity: 0.3, cursor: not-allowed |

### Pagination

| Property | Value | CSS |
|----------|-------|-----|
| display | flex | `display: flex` |
| align-items | center | `align-items: center` |
| gap | 16px | `gap: 16px` |
| font-size | 16px | `font-size: 16px` |
| font-weight | 500 | `font-weight: 500` |
| color | `#FFFFFF` | `color: white` |
| current-page-color | `#FFEA9E` | `color: var(--color-accent-yellow)` |

### Spotlight Board Card

| Property | Value | CSS |
|----------|-------|-----|
| width | 100% | `width: 100%` |
| min-height | 400px | `min-height: 400px` |
| background | `#1A1A2E` | `background: var(--color-surface-card)` |
| border-radius | 16px | `border-radius: var(--radius-spotlight)` |
| overflow | hidden | `overflow: hidden` |
| position | relative | `position: relative` |

---

## Component Hierarchy with Styles

```
Page (bg: --color-bg-dark)
├── Header (h: 56px, bg: rgba(16,20,23,0.8), sticky, z-50, px: 144px)
│   ├── Logo (w: 60px, h: 32px)
│   ├── NavLinks (flex, gap: 32px, text: 14px/700)
│   │   ├── "About SAA 2025" (color: white)
│   │   ├── "Award Information" (color: white)
│   │   └── "Sun* Kudos" (color: --color-accent-yellow, border-bottom: 1px solid --color-accent-yellow)
│   └── Actions (flex, gap: 16px)
│       ├── NotificationBell (w: 24px)
│       └── LanguageToggle (border: 1px solid #998C5F, radius: 4px)
│
├── HeroSection (full-width, gradient bg, py: 64px, px: 144px, flex-col, center)
│   ├── Subtitle ("Hệ thống ghi nhận và cảm ơn", 20px/700, white)
│   ├── KudosLogo (SVN-Gotham, 80px, yellow with Sun* icon prefix)
│   └── SearchRow (flex, gap: 16px)
│       ├── SendKudoSearch (pill-shaped, border: #998C5F, flex: 1)
│       └── ProfileSearch (pill-shaped, border: #998C5F, flex: 1)
│
├── HighlightKudosSection (px: 144px, py: 96px)
│   ├── SectionLabel ("Sun* Annual Awards 2025", 16px/700, white)
│   ├── TitleRow (flex, justify-between)
│   │   ├── SectionTitle ("HIGHLIGHT KUDOS", 57px/700, yellow)
│   │   └── FilterButtons (flex, gap: 12px)
│   │       ├── HashtagFilter (dropdown btn)
│   │       └── DeptFilter (dropdown btn)
│   ├── Carousel (relative, overflow: hidden)
│   │   ├── LeftArrow (absolute, left: 0)
│   │   ├── CardTrack (flex, gap: 24px, overflow-x: scroll)
│   │   │   └── KudoCard[] (w: ~320px each)
│   │   └── RightArrow (absolute, right: 0)
│   └── Pagination (flex, center, gap: 16px)
│       ├── PrevBtn ("◄")
│       ├── PageInfo ("2/5")
│       └── NextBtn ("►")
│
├── SpotlightBoardSection (px: 144px, py: 96px)
│   ├── SectionLabel ("Sun* Annual Awards 2025")
│   ├── SectionTitle ("SPOTLIGHT BOARD")
│   └── SpotlightCard (w: 100%, min-h: 400px, bg: #0F0F0F, radius: 16px)
│       ├── VideoPreview (left side, with play button overlay)
│       ├── KudosCount ("388 KUDOS", 32px/700)
│       ├── AvatarGrid (user photos with names)
│       └── RecentTicker (scrolling recent kudos)
│
├── AllKudosSection (px: 144px, py: 96px, flex, gap: 40px)
│   ├── SectionHeader
│   │   ├── SectionLabel ("Sun* Annual Awards 2025")
│   │   └── SectionTitle ("ALL KUDOS")
│   ├── KudoFeed (flex: 1, flex-col, gap: 32px)
│   │   └── KudoCard[] (full-width cards)
│   │       ├── SenderReceiverRow (flex, gap: 12px, avatars + names)
│   │       ├── DateRange ("10:05 - 10/30/2025")
│   │       ├── CategoryBadge ("IDOL GIỚI TRẺ")
│   │       ├── MessageBody (14px/400, white, max 4 lines)
│   │       ├── ImageGallery (grid, square thumbs)
│   │       ├── HashtagPills (flex-wrap, gap: 8px)
│   │       └── CardFooter (like count + copy link)
│   └── RightSidebar (w: 320px, sticky top: 80px)
│       ├── PersonalStats (bg: #1A1A2E, radius: 16px, p: 24px)
│       │   ├── StatRow ("Số Kudos bạn nhận được:", "25")
│       │   ├── StatRow ("Số Kudos bạn đã gửi:", "25")
│       │   ├── StatRow ("Tổng số nhận được: 🔥", "25")
│       │   ├── StatRow ("Số Secret Box bạn đã mở:", "25")
│       │   ├── StatRow ("Số Secret Box chưa mở:", "25")
│       │   └── SecretBoxBtn ("Mở Secret Box 🎁")
│       └── Leaderboard ("10 SUNNER NHẬN QUÀ NỐI NHẤT")
│           └── LeaderboardEntry[] (avatar + name + dept)
│
└── Footer (border-top: 1px solid #2E3940, py: 40px, px: 90px)
    ├── Logo
    ├── NavLinks ("About SAA", "Award Info", "Sun* Kudos", "Tiêu chuẩn chung")
    └── Copyright ("Bản quyền thuộc về Sun* © 2025")
```

---

## Responsive Specifications

### Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| Mobile | 0 | 767px |
| Tablet | 768px | 1279px |
| Desktop | 1280px | ∞ |

### Responsive Changes

#### Mobile (< 768px)

| Component | Changes |
|-----------|---------|
| Container | padding: 16px |
| Hero | padding: 32px 16px, KUDOS font-size: 48px |
| Search inputs | stack vertically, full-width |
| Section headings | font-size: 32px |
| Highlight carousel | show 1 card at a time, swipeable |
| Spotlight board | reduced height, video only |
| All Kudos | single column, sidebar hidden |
| Right sidebar | moves below feed or becomes expandable drawer |
| Filter buttons | horizontal scroll |
| Footer nav | stack vertically |

#### Tablet (768px → 1279px)

| Component | Changes |
|-----------|---------|
| Container | padding: 32px |
| Hero | padding: 48px 32px |
| Highlight carousel | show 2 cards at a time |
| All Kudos | single column, sidebar collapses to top summary |
| Right sidebar | horizontal layout above feed, sticky off |

#### Desktop (≥ 1280px)

| Component | Changes |
|-----------|---------|
| Container | max-width: 1512px, padding: 0 144px |
| All sections | full two-column layout as designed |
| Highlight carousel | show 4 cards at a time |
| Right sidebar | sticky, 320px width |

---

## Animation & Transitions

| Element | Property | Duration | Easing | Trigger |
|---------|----------|----------|--------|---------|
| Carousel slide | transform (translateX) | 300ms | ease-in-out | Arrow click / swipe |
| Filter dropdown | opacity, max-height | 200ms | ease-out | Toggle open/close |
| Kudo card hover | box-shadow, transform | 150ms | ease-in-out | Hover |
| Heart icon | scale | 200ms | ease-out | Click (like) |
| Copy link feedback | opacity | 150ms | ease-in | Click |
| Spotlight board ticker | transform (translateX) | continuous | linear | Auto-scroll |
| Page transition | opacity | 200ms | ease-in-out | Navigation |

---

## Implementation Mapping

| Design Element | Tailwind / CSS Class | React Component |
|----------------|---------------------|-----------------|
| Hero Section | `bg-gradient-to-br from-[var(--color-bg-dark)] to-[var(--color-hero-gradient-end)] py-16 px-[var(--spacing-page-px)]` | `<KudosHero />` |
| Search Input | `rounded-full border border-[var(--color-border)] bg-transparent` | `<SearchInput />` |
| Section Label | `text-[var(--color-white)] text-base font-bold` | `<SectionLabel />` |
| Section Heading | `text-[57px] font-bold leading-[64px] text-[var(--color-accent-yellow)]` | `<SectionHeading />` |
| Filter Btn | `border border-[var(--color-border)] rounded-lg px-4 py-2` | `<FilterDropdown />` |
| Kudo Card | `bg-[var(--color-surface-dark)] border border-[var(--color-border)] rounded-2xl p-6` | `<KudoCard />` |
| Carousel | `relative overflow-hidden` | `<KudoCarousel />` |
| Carousel Arrow | `absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full` | `<CarouselArrow />` |
| Pagination | `flex items-center gap-4 text-[var(--color-white)]` | `<Pagination />` |
| Spotlight Board | `bg-[var(--color-surface-card)] rounded-2xl overflow-hidden` | `<SpotlightBoard />` |
| Stats Panel | `w-80 sticky top-20 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-2xl p-6` | `<PersonalStats />` |
| Secret Box Btn | `w-full h-12 bg-[var(--color-accent-yellow)] text-[var(--color-bg-dark)] rounded-lg font-bold` | `<SecretBoxButton />` |
| Leaderboard | `flex flex-col gap-3` | `<Leaderboard />` |
| Hashtag Pill | `bg-[var(--color-hashtag-bg)] text-[var(--color-accent-yellow)] rounded-full px-3 py-1 text-xs font-semibold` | `<HashtagPill />` |
| Video Play Btn | `absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center` | `<VideoPlayButton />` |
| Xem chi tiết Link | `text-sm font-medium text-[var(--color-white)]` | (part of `<KudoCard />`) |

---

## Notes

- All colors MUST use CSS variables per constitution Principle V — no hard-coded hex in Tailwind classes
- Font stack: Montserrat (primary), SVN-Gotham (KUDOS wordmark)
- All icons MUST be in Icon Components — no raw SVG or img tags
- Ensure WCAG AA color contrast (4.5:1 for normal text) on dark backgrounds — verified: `#FFFFFF` on `#00101A` = 18.4:1 ✅, `#FFEA9E` on `#00101A` = 13.7:1 ✅
- The hero abstract art background is a raster image overlay — use `next/image` with `object-cover` and `priority` for LCP
- Carousel must be keyboard-navigable (arrow keys) per accessibility requirements
- Heart/like interactions require optimistic UI updates
- Touch targets for carousel arrows, filter buttons, heart, and copy link MUST be ≥ 44×44px
