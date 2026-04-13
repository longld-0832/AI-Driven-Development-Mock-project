# Design Style: Like / Unlike Kudo

**Feature Type**: Cross-cutting interaction (not a dedicated screen)
**Parent Screen**: Sun* Kudos Live Board (`MaZUn5xHXZ`)
**Inherits From**: `../MaZUn5xHXZ-SunKudos/design-style.md`
**Created**: 2026-04-16

---

## Inheritance Notice

This feature has **no dedicated Figma frame** — the like button appears inside
`KudoCard` instances across multiple contexts (Highlight carousel, All Kudos feed,
and any future kudo detail view). All base design tokens (colors, typography,
spacing, card layout, footer dimensions) are inherited from the parent design-style.

This document only documents **like-specific visual states and interactions** that
are not captured at the card level in the parent.

---

## Design Tokens (Referenced)

All tokens are defined in the parent `../MaZUn5xHXZ-SunKudos/design-style.md`
and live in `src/app/globals.css`. No new tokens are added for this feature.

| Token | Hex Value | Usage in this feature |
|-------|-----------|-----------------------|
| `--color-heart` | `#FF4D4D` | Filled heart (current user has liked) |
| `--color-heart-unfilled` | `rgba(255,255,255,0.6)` | Unfilled heart (not liked) |
| `--color-white` | `#FFFFFF` | Like count text |
| `--color-accent-yellow` | `#FFEA9E` | Focus ring color |
| `--text-like-count` | Montserrat 14px/700 | Like count number style |

---

## Component Anatomy

The like button is rendered inside `KudoCardInteractions.tsx` as part of the
kudo card footer:

```
┌─ Kudo Card ────────────────────────────────────────────────┐
│   … card content …                                          │
│ ┌─ Footer (border-top) ─────────────────────────────────┐  │
│ │ [♥ {count}]              [Copy Link 🔗] [Detail ↗]    │  │
│ │  ↑                                                      │  │
│ │  Like button (this feature)                            │  │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Like Button Structure

```
<button aria-label="..." aria-pressed={likedByMe}>
  <span aria-hidden>♥</span>     ← Heart icon (color = liked ? --color-heart : --color-heart-unfilled)
  <span>{likeCount}</span>       ← Count text (--text-like-count, --color-white)
</button>
```

---

## Component States

| State | Heart Color | Scale | Cursor | Notes |
|-------|-------------|-------|--------|-------|
| Default (not liked) | `--color-heart-unfilled` | 1.0 | pointer | Resting state |
| Hover (not liked) | `--color-heart-unfilled` (full opacity) | 1.05 | pointer | Subtle invite |
| Liked | `--color-heart` | 1.0 | pointer | Persistent after like |
| Hover (liked) | `--color-heart` (slight lift) | 1.05 | pointer | — |
| Clicking (transient) | current color | 1.0 → 1.2 → 1.0 | pointer | Pop animation on click |
| Focus (keyboard) | current color | 1.0 | pointer | + 2px outline `--color-accent-yellow` offset 2px |
| Disabled (no auth / unavailable) | `--color-heart-unfilled` at 40% opacity | 1.0 | not-allowed | Only shown if session invalid |

## Animation

| Trigger | Property | Duration | Easing |
|---------|----------|----------|--------|
| Click (like or unlike) | `transform: scale` | 200ms | ease-out |
| Color change on toggle | `color` | 150ms | ease-in-out |
| Hover | `transform: scale` | 100ms | ease-out |

## Accessibility

| Property | Value |
|----------|-------|
| Role | native `<button>` |
| `aria-label` | Dynamic: `"Thích kudos"` (unliked) or `"Bỏ thích kudos"` (liked) |
| `aria-pressed` | `{likedByMe}` |
| Touch target | ≥44×44px (padding around the 14–16px heart icon) |
| Keyboard | `Enter` / `Space` toggles |
| Focus visible | 2px outline in `--color-accent-yellow`, offset 2px |

---

## Dimensions & Spacing

The like button sits inside the card footer with inherited spacing:

| Property | Value | Source |
|----------|-------|--------|
| Footer border-top | `1px solid rgba(255,255,255,0.1)` | Parent design-style |
| Footer padding-top | 16px | Parent design-style |
| Heart icon size | 14px (carousel) / 16px (feed) | Parent design-style |
| Heart → Count gap | 8px | Parent design-style (card gap) |
| Button padding | 8px (to achieve 44×44 touch target) | This feature |
| Button border-radius | 100px (pill, matches parent) | Parent design-style |

---

## Responsive Behavior

The like button is a small, centered element in the card footer. It does not
have its own responsive breakpoints — it inherits from the parent card layout:

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Footer may wrap; heart + count stay left-aligned on row 1 |
| Tablet (768–1279px) | Inline with Copy Link and Detail buttons |
| Desktop (≥1280px) | Inline with Copy Link and Detail buttons |

---

## Implementation Mapping

| Design Element | Tailwind / CSS Class | React Component |
|----------------|---------------------|-----------------|
| Like button container | `flex items-center gap-2 min-h-11 rounded-full px-3 py-2` | `<KudoCardInteractions>` |
| Heart icon (liked) | inline `style={{ color: 'var(--color-heart)' }}` | `<span>♥</span>` |
| Heart icon (unliked) | inline `style={{ color: 'var(--color-heart-unfilled)' }}` | `<span>♥</span>` |
| Like count text | `text-sm font-bold text-[var(--color-white)]` | `<span>{likeCount}</span>` |
| Focus ring | `focus-visible:outline-2 focus-visible:outline-[var(--color-accent-yellow)] focus-visible:outline-offset-2` | (applied on button) |
| Disabled state | `disabled:opacity-40 disabled:cursor-not-allowed` | (when session invalid) |

---

## Notes

- All colors MUST use CSS variables from the parent design-style — no new tokens.
- No dedicated icon asset — uses the unicode heart character `♥` consistent with
  the existing `KudoCardInteractions` implementation.
- The button is ALWAYS rendered (even when the user is not logged in, the card
  is only shown on an authenticated page, so this case is unreachable in practice).
- Touch target size of 44×44px is achieved via `min-h-11 px-3 py-2` around the
  14–16px icon.
