<!--
SYNC IMPACT REPORT
==================
Version change: 1.0.0 → 1.1.0 (MINOR — 2 new principles + Security Standards section + expanded Coding Standards)

Modified principles: none renamed or redefined

Added principles:
  - VI. Responsive Design (mobile-first breakpoints, fluid layouts)
  - VII. Secure by Default (OWASP Top 10, input validation, secrets, CSP)

Expanded sections:
  - Coding Standards: added Clean Code rules (SRP, DRY, function size, naming clarity)
  - New: Security Standards (OWASP Top 10 mapped to project-specific rules)

Removed sections: none

Templates reviewed:
  ✅ .momorph/templates/plan-template.md — Constitution Compliance Check covers new principles
  ✅ .momorph/templates/spec-template.md — Visual Requirements section already has responsive breakpoints field
  ✅ .momorph/templates/tasks-template.md — Security/responsive tasks can be added under existing phases
  ✅ .momorph/guidelines/frontend.md — Responsive breakpoint guidance aligns with Principle VI
  ✅ .momorph/guidelines/backend.md — Input validation + thin controllers align with Principle VII

Follow-up TODOs:
  - Spec template TR (Technical Requirements) section should explicitly reference OWASP compliance
    when security-sensitive screens are specified (auth, form submissions, admin). Update at next
    spec-template revision.
-->

# Agentic Coding Hands-on Constitution

## Core Principles

### I. TypeScript-First

All source code MUST be written in TypeScript with `strict: true` enabled (as configured in
`tsconfig.json`). Implicit `any` is forbidden. Explicit `any` MUST be justified in a comment.
Type assertions (`as`) MUST only be used at system boundaries where external types cannot
be inferred. Every public function signature MUST have explicit parameter and return types.

**Rationale**: Strict typing eliminates an entire class of runtime errors and serves as
living documentation, which is critical in an AI-assisted development workflow.

### II. React Server Components by Default

Next.js App Router server components are the default. Client components (`"use client"`)
MUST only be introduced when interactive browser APIs (events, local state, browser
storage) are strictly required. Data fetching MUST be performed at the server-component
level using the Supabase server client (`src/libs/supabase/server.ts`). Client
components MUST receive data as props rather than fetching independently wherever possible.

**Rationale**: RSC-first minimises client bundle size, improves Core Web Vitals, and
aligns with Cloudflare Workers edge-rendering constraints.

### III. Supabase as Single Backend

All data persistence, authentication, and realtime subscriptions MUST go through
Supabase. Direct SQL queries outside of Supabase RLS policies are forbidden in
application code. Auth state MUST be read from `@supabase/ssr` middleware and server
clients only — never reconstructed manually. The correct client MUST be chosen:
browser client for client components (`src/libs/supabase/client.ts`), server client
for server components and route handlers (`src/libs/supabase/server.ts`).

**Rationale**: Centralising through Supabase ensures RLS policies are always enforced
and keeps the data layer replaceable without touching application code.

### IV. Edge-Compatible Architecture

All server-side code (route handlers, middleware, server actions) MUST run on the
Cloudflare Workers edge runtime. Node.js-only APIs (`fs`, `path`, `crypto` Node built-ins,
etc.) are forbidden in server code; use the Web Platform equivalents (`Blob`, `File`,
`crypto.subtle`). Dependencies that bundle native binaries or require Node.js internals
MUST NOT be added unless a CF Workers-compatible alternative is unavailable and the
exception is documented in this file.

**Rationale**: The production deployment target is Cloudflare Workers via
`@opennextjs/cloudflare`. Code that works locally but fails at edge causes silent
production regressions.

### V. Design-Token Driven UI

UI MUST be built exclusively with TailwindCSS utility classes derived from CSS variables
defined in `src/app/globals.css`. Hard-coded color values, spacing values, or
typography values in component files are forbidden. All design tokens (colors, spacing,
radii, font sizes) MUST be declared as CSS custom properties in the `:root` block and
consumed through Tailwind's configuration. When a Tailwind utility for a token does not
exist, the CSS variable (`var(--token-name)`) MUST be used inline as a fallback and
the gap documented in `globals.css` with a `/* TODO: add utility */` comment.

**Rationale**: Token-driven styling enables Figma-to-code workflows (via MoMorph) to
remain consistent and guarantees theme changes propagate from a single file.

### VI. Responsive Design

All UI MUST be built mobile-first. Layouts MUST function correctly at the three
standard breakpoints:

| Breakpoint | Min-width | Tailwind prefix |
|------------|-----------|----------------|
| Mobile | 0px | (default) |
| Tablet | 768px | `md:` |
| Desktop | 1280px | `xl:` |

Fixed pixel widths in layout containers are forbidden; use `max-w-*` with `w-full`.
Touch targets MUST be at least 44×44px. Horizontal scrolling at any breakpoint is
forbidden. Images and media MUST use responsive sizing (`w-full`, `max-w-*`, or
`srcset`). Viewport-relative units (`vw`, `vh`, `svh`) are preferred over fixed
heights for full-screen sections. Testing MUST cover mobile (375px), tablet (768px),
and desktop (1440px) viewport widths before a feature is considered complete.

**Rationale**: The SAA 2025 platform is accessed from diverse devices. A broken mobile
layout is a product defect regardless of the primary design canvas being 1440px.

### VII. Secure by Default

Security MUST be built in at every layer, not added as an afterthought. The following
rules are non-negotiable and map directly to the OWASP Top 10 (2021):

- **A01 Broken Access Control**: Every route handler and server action MUST verify
  the user session via `getUser()` from the Supabase server client before accessing
  any protected resource. Client-side auth checks are supplementary only.
- **A02 Cryptographic Failures**: Secrets (API keys, OAuth client secrets, service
  role keys) MUST reside in server-only environment variables and MUST NOT appear in
  `NEXT_PUBLIC_*` variables, source code, logs, or error responses.
- **A03 Injection**: All database interactions MUST use parameterised queries via
  the Supabase SDK. String interpolation into SQL is forbidden. User-supplied values
  MUST NEVER be concatenated into queries.
- **A05 Security Misconfiguration**: HTTP security headers (`X-Frame-Options`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Content-Security-Policy`) MUST be
  set in `public/_headers` (Cloudflare Pages/Workers static headers). CSP MUST
  disallow `unsafe-inline` scripts.
- **A06 Vulnerable Components**: Dependencies MUST be kept up-to-date. `yarn audit`
  MUST pass with zero high/critical vulnerabilities before merging to main.
- **A07 Authentication Failures**: Session cookies managed by `@supabase/ssr` are
  HTTP-only by default — this MUST NOT be overridden. OAuth state parameters MUST
  be verified. The `/auth/callback` route MUST validate the `code` parameter and
  reject unexpected origins.
- **A08 Software and Data Integrity**: All third-party scripts loaded from CDNs MUST
  use Subresource Integrity (SRI) hashes. Avoid `dangerouslySetInnerHTML`; if
  unavoidable, sanitize with `DOMPurify` first.
- **A09 Logging failures**: Server-side errors MUST be logged (structured, no PII).
  Stack traces and internal error details MUST NOT be returned to clients — return
  generic messages only.
- **A10 SSRF**: Server actions and route handlers MUST NOT make HTTP requests to
  URLs derived from user input without explicit allowlisting.

**Rationale**: SAA 2025 handles employee identity data (Google accounts, kudos,
awards). A security breach would damage employee trust and violate data privacy
obligations.

## Coding Standards

### Clean Code

- **Single Responsibility**: Each file, function, and component MUST do exactly one
  thing. If a description requires "and", it is a sign that it should be split.
- **Function size**: Functions MUST NOT exceed 40 lines. Extract named helpers for
  any logic block longer than 10 lines that can be named clearly.
- **Naming**: Names MUST be intention-revealing. Boolean variables/props use `is*`,
  `has*`, `can*` prefixes. Avoid abbreviations except universally accepted ones
  (`id`, `url`, `api`, `db`).
- **DRY**: Repeated logic patterns appearing 3+ times MUST be extracted into a shared
  utility, hook, or service. Inline duplication is acceptable only for readability
  (e.g., short Tailwind class lists that differ meaningfully).
- **Dead code**: Unused imports, variables, types, and commented-out code MUST NOT
  be committed. Remove before opening a PR.
- **Magic values**: Unexplained literals (numbers, strings) MUST be extracted into
  named constants with a clear purpose comment if the meaning is not obvious.

- **Indentation**: 2 spaces; line width target ≤ 100 characters.
- **Quotes**: Single quotes for strings; template literals for interpolation.
- **Immutability**: Prefer `const`; avoid `let` unless mutation is required. Prefer
  immutable array methods (`map`, `filter`, `reduce`) over imperative loops where legible.
- **File naming**: kebab-case for all non-component modules (e.g., `user-service.ts`).
  PascalCase for React components and TypeScript classes (e.g., `UserCard.tsx`).
- **Asset naming**: kebab-case for all asset filenames (e.g., `google-icon.svg`).
  Place assets under `public/assets/{group_name}/{icons|images|logos}/`.
- **Layer separation**: Business logic MUST reside in service-layer modules. Route
  handlers and server actions MUST be thin: validate input → call service → return
  response. No business logic inside `page.tsx`, `layout.tsx`, or `route.ts` files.
- **URL / navigation**: Navigation targets MUST be derived from `SCREENFLOW.md` or
  associated spec files. Hard-coding route strings in component logic is forbidden.
- **Circular imports**: Prefer a clear dependency direction — page → component → hook →
  service → lib. Avoid barrel `index.ts` files that create circular dependencies.
- **Environment variables**: Public env vars use `NEXT_PUBLIC_` prefix; server-only
  secrets MUST NOT be exposed to the client bundle.

### Next.js Best Practices

- Use the **App Router** exclusively — the Pages Router is not used in this project.
- Prefer **`generateMetadata`** for per-route metadata over manual `<head>` tags.
- Use **`loading.tsx`** and **`error.tsx`** co-located with route segments for
  suspense boundaries and error handling.
- **`use cache`** / `unstable_cache` MUST be applied to expensive server-side reads
  with appropriate cache tags and revalidation strategies.
- Route handlers (`route.ts`) MUST be thin — delegate to service functions.
- Import from `next/navigation` (App Router) not `next/router` (Pages Router).

### Supabase Best Practices

- Always call `supabase.auth.getUser()` (not `getSession()`) on the server to
  validate the session — `getSession()` does not revalidate the JWT.
- RLS policies MUST be enabled on every table containing user data. Never disable
  RLS as a workaround.
- Use the **service role key** only in server-side-only code with no path to the
  client; for all other server code use the anon key with RLS.
- Supabase migrations MUST be version-controlled under `supabase/migrations/`.
  Manually editing the remote DB schema without a migration file is forbidden.

### Cloudflare Workers Best Practices

- Do not use `setTimeout` / `setInterval` in Workers — use scheduled Cron Triggers
  instead.
- KV, D1, and R2 bindings MUST be typed via `cloudflare-env.d.ts`; never access
  them with untyped casts.
- Keep cold-start weight low: avoid large dependencies in edge-deployed modules.
  Prefer dynamic imports for non-critical paths.

## Project Structure

```text
src/
├── app/                     # Next.js App Router — pages, layouts, route handlers
│   ├── (routes)/            # Route groups (no URL segment impact)
│   ├── globals.css          # Design tokens (CSS variables) + Tailwind base
│   └── layout.tsx           # Root layout
├── components/              # Shared UI components (PascalCase, co-located tests)
│   └── {feature}/           # Feature-scoped components
├── hooks/                   # Custom React hooks (useXxx.ts)
├── libs/
│   └── supabase/            # Supabase client factory (client.ts, server.ts, middleware.ts)
├── services/                # Business logic layer (kebab-case)
└── types/                   # Shared TypeScript types and interfaces

public/
└── assets/
    └── {group}/
        ├── icons/
        ├── images/
        └── logos/

.momorph/
├── constitution.md          # This file — project source of truth
├── contexts/                # Generated specs and test cases
├── guidelines/              # Frontend and backend coding guidelines
└── templates/               # Document templates (plan, spec, tasks, etc.)

supabase/
├── config.toml              # Local Supabase configuration
├── migrations/              # SQL migrations (version-controlled)
└── seeds/                   # Seed data (dev, common)
```

## Security Standards

All implementation work MUST comply with the OWASP Top 10 (2021) rules defined in
Principle VII. The following are the minimum mandatory security controls by layer:

### Server / API Layer

| Control | Rule |
|---------|------|
| Auth check | `getUser()` called at the top of every protected route handler / server action |
| Input validation | Validate and sanitize all incoming data with Zod or equivalent before use |
| Error responses | Return generic messages to clients; log detailed errors server-side only |
| Rate limiting | Rely on Cloudflare WAF / Rate Limiting rules; implement application-level debounce for critical endpoints |
| Secrets | Zero server-side secrets in source code; all via environment variables |

### Client / Browser Layer

| Control | Rule |
|---------|------|
| XSS | Never use `dangerouslySetInnerHTML` with unsanitized input; sanitize with DOMPurify if required |
| CSRF | Next.js App Router server actions have built-in CSRF protection — do not bypass |
| Sensitive data | Never store tokens, secrets, or PII in `localStorage` or `sessionStorage` |
| Third-party scripts | SRI hashes required for any CDN-loaded script |

### HTTP Headers (set in `public/_headers`)

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co
```

### Dependency Hygiene

- Run `yarn audit` in CI; block merges if high/critical vulnerabilities are found.
- Pin major versions of security-sensitive deps (`@supabase/ssr`, `next`).
- Review changelog before upgrading auth-related packages.

## Governance

- This constitution supersedes all other inline conventions, README sections, and
  guideline fragments. In case of conflict, this document is authoritative.
- Amendments require: (1) updating this file with a new version, (2) running the
  consistency propagation checklist against all templates, (3) committing with message
  `docs: amend constitution to vX.Y.Z (<summary>)`.
- **Version policy**:
  - MAJOR — backward-incompatible principle removals or redefinitions that invalidate
    existing code patterns.
  - MINOR — new principle added, new mandatory section, or materially expanded guidance.
  - PATCH — clarifications, wording fixes, typo corrections, non-semantic refinements.
- All implementation plans MUST include a "Constitution Compliance Check" gate
  (as defined in `.momorph/templates/plan-template.md`) before coding begins.
- Compliance is reviewed at PR merge time; violations require explicit justification
  in the PR description referencing the specific principle.
- **TDD is non-negotiable**: tests MUST be written before implementation code. The
  Red → Green → Refactor cycle strictly applies to all feature work.
- Runtime development guidance: `.momorph/guidelines/frontend.md` and
  `.momorph/guidelines/backend.md` are authoritative for their respective domains and
  MUST be read by agents before generating or modifying code in those areas.

**Version**: 1.1.0 | **Ratified**: 2026-04-08 | **Last Amended**: 2026-04-08
