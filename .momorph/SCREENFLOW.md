# Screen Flow Overview

## Project Info

- **Project Name**: SAA 2025 — Sun Annual Awards
- **Figma File Key**: `9ypp4enmFmdK3YAFJLIu6C`
- **Figma URL**: https://www.figma.com/design/9ypp4enmFmdK3YAFJLIu6C
- **Created**: 2026-04-08
- **Last Updated**: 2026-04-16

---

## Discovery Progress

| Metric | Count |
|--------|-------|
| Total Screens | 80+ (full list via MoMorph) |
| Specified | 3 |
| Remaining | 77+ |
| Completion | ~3.75% |

---

## Screens

| # | Screen Name | Screen ID | Status | Spec File | Predicted APIs | Navigates To |
|---|-------------|-----------|--------|-----------|----------------|--------------|
| 1 | Login | `GzbNeVGJHz` | ✅ Specified | `specs/GzbNeVGJHz-Login/spec.md` | Google OAuth, `/auth/callback` | Homepage (`/`) |
| 2 | Homepage SAA | `i87tDx10uM` | 🔜 Pending | — | GET /kudos, GET /stats | Various |
| 3 | Viết Kudo | `ihQ26W78P2` | ✅ Specified | `specs/ihQ26W78P2-VietKudo/spec.md` | POST /kudos, GET /users/search, GET /hashtags, POST /uploads | Live Board (`MaZUn5xHXZ`) ⚠️ |
| 4 | Sun* Kudos - Live board | `MaZUn5xHXZ` | ✅ Specified | `specs/MaZUn5xHXZ-SunKudos/spec.md` | GET /kudos, GET /kudos/highlights, GET /kudos/stats, GET /kudos/leaderboard, GET /kudos/spotlight, POST /kudos/:id/like | Secret Box (`J3-4YFIpMM`), Write Kudo (`ihQ26W78P2`), Profile (`3FoIx6ALVb`) |
| 5 | Open secret box | `J3-4YFIpMM` | 🔜 Pending | — | GET /giftbox, POST /giftbox/open | — |
| 6 | Hệ thống giải | `zFYDgyj_pD` | ✅ Specified | `specs/zFYDgyj_pD-HeThongGiai/spec.md` | GET /awards | Sun* Kudos (via "Chi tiết") |
| 7 | Countdown - Prelaunch page | `8PJQswPZmU` | 🔜 Pending | — | GET /event/status | Login |
| 8 | Dropdown-ngôn ngữ | `hUyaaugye2` | 🔜 Pending | — | — | (overlay, from Header) |

---

## Navigation Graph

```mermaid
flowchart TD
    subgraph Auth["Authentication"]
        Login[Login\nGzbNeVGJHz]
        AuthCallback[/auth/callback]
    end

    subgraph Main["Main Application"]
        Homepage[Homepage SAA\ni87tDx10uM]
        WriteKudo[Viết Kudo\nihQ26W78P2]
        LiveBoard[Sun* Kudos Live Board\nMaZUn5xHXZ]
        SecretBox[Open Secret Box\nJ3-4YFIpMM]
        Awards[Hệ thống giải\nzFYDgyj_pD]
        Profile[Profile bản thân\n3FoIx6ALVb]
    end

    subgraph Overlays["Overlays / Dropdowns"]
        LangDropdown[Dropdown-ngôn ngữ\nhUyaaugye2]
    end

    Login -->|Click LOGIN With Google| AuthCallback
    AuthCallback -->|Session created| Homepage
    Login -->|Click language button| LangDropdown
    LangDropdown -->|Select language| Login

    Homepage --> WriteKudo
    Homepage --> LiveBoard
    Homepage --> SecretBox
    Homepage --> Awards
    Homepage --> Profile
    WriteKudo -->|Submit| Homepage
```

---

## Screen Groups

### Group: Authentication

| Screen | Purpose | Entry Points |
|--------|---------|--------------|
| Login | Google SSO entry — unauthenticated gate | App launch, protected route redirect |
| /auth/callback | OAuth code exchange → session creation | Google OAuth redirect |

### Group: Main Application

| Screen | Purpose | Entry Points |
|--------|---------|--------------|
| Homepage SAA | Kudos feed, stats, navigation hub | After login |
| Viết Kudo | Write and send a Kudo to a colleague | Homepage CTA |
| Sun* Kudos Live Board | Real-time live Kudo display | Homepage |
| Open Secret Box | Open reward gift box | Homepage |
| Hệ thống giải | Award system overview | Homepage |
| Profile bản thân | Own profile with kudos history | Header avatar |

### Group: Overlays

| Screen | Purpose | Entry Points |
|--------|---------|--------------|
| Dropdown-ngôn ngữ | Language selection dropdown | Header language button |

---

## API Endpoints Summary

| Endpoint | Method | Screens Using | Purpose |
|----------|--------|---------------|---------|
| Supabase Auth `signInWithOAuth` | Browser SDK | Login | Initiate Google OAuth |
| `/auth/callback` | GET | Login (callback) | Exchange code for Supabase session |
| Supabase Auth `getUser` | Server SDK | Middleware (all) | Validate session |
