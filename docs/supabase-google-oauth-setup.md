# Supabase + Google OAuth Integration Guide

This guide covers the complete setup for Google OAuth authentication with Supabase, deployed on Cloudflare Workers.

---

## Prerequisites

- A [Supabase](https://supabase.com) cloud project (not local)
- A [Google Cloud Console](https://console.cloud.google.com) account
- A deployed Cloudflare Workers URL (e.g. `https://your-app.workers.dev`)

---

## Step 1: Create a Google OAuth Client

1. Go to [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
2. Click **+ Create Credentials → OAuth client ID**
3. Select **Web application**
4. Fill in:
   - **Name**: anything (e.g. `My App Web Client`)
   - **Authorized JavaScript origins**: add your production URL
     ```
     https://your-app.workers.dev
     ```
   - **Authorized redirect URIs**: add your Supabase callback URL
     ```
     https://<your-supabase-project-ref>.supabase.co/auth/v1/callback
     ```
5. Click **Save**
6. Copy the **Client ID** and **Client Secret** — you will need these in Step 2

> **Important**: Make sure the redirect URI and JavaScript origin are added to the **same** OAuth client that you configure in Supabase. Using mismatched clients causes `redirect_uri_mismatch` errors.

---

## Step 2: Configure Google Provider in Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) → your project
2. Navigate to **Authentication → Sign In / Providers**
3. Find **Google** and click to expand
4. Toggle **Enable Sign in with Google** → ON
5. Fill in:
   - **Client ID**: paste the Client ID from Step 1
   - **Client Secret**: paste the Client Secret from Step 1
6. Note the **Callback URL** shown — it must match what you added in Step 1
   ```
   https://<your-supabase-project-ref>.supabase.co/auth/v1/callback
   ```
7. Click **Save**

---

## Step 3: Configure Redirect URLs in Supabase

1. In Supabase Dashboard → **Authentication → URL Configuration**
2. Set **Site URL** to your production URL:
   ```
   https://your-app.workers.dev
   ```
3. Under **Redirect URLs**, click **Add URL** and add:
   ```
   https://your-app.workers.dev/auth/callback
   ```
4. Click **Save changes**

---

## Step 4: Configure Environment Variables

### For local development (`.env.development` or `.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<local-anon-key>
SUPABASE_SECRET_KEY=<local-service-role-key>
```

Get local keys by running:
```bash
npx supabase status
```

### For production (`.env.production`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<cloud-anon-key>
SUPABASE_SECRET_KEY=<cloud-service-role-key>
NEXT_PUBLIC_SITE_URL=https://your-app.workers.dev
```

Get cloud keys from: Supabase Dashboard → **Project Settings → Data API**

> **Important**: `.env.local` always overrides `.env.production` in Next.js builds.
> Comment out or remove Supabase vars from `.env.local` before deploying to production.

---

## Step 5: Implement the OAuth Callback Route

Create `src/app/auth/callback/route.ts`:

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  return NextResponse.redirect(new URL("/login?error=auth_failed", request.url));
}
```

---

## Step 6: Implement the Login Button

Create `src/components/auth/LoginButton.tsx`:

```tsx
"use client";

import { useState } from "react";
import { createClient } from "@/libs/supabase/client";

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);
    const supabase = createClient();

    // Use window.location.origin so the redirect URL always matches
    // the current domain — works for both local and production
    const redirectTo = window.location.origin + "/auth/callback";

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) {
      console.error(error.message);
      setIsLoading(false);
    }
  }

  return (
    <button onClick={handleLogin} disabled={isLoading}>
      {isLoading ? "Loading..." : "Login with Google"}
    </button>
  );
}
```

> **Why `window.location.origin`?** Using `NEXT_PUBLIC_SITE_URL` bakes the value at build time. If the value in `.env.local` overrides `.env.production`, the wrong URL gets embedded. Using `window.location.origin` at runtime always resolves to the correct domain.

---

## Step 7: Deploy to Cloudflare Workers

```bash
# Remove Next.js build cache to ensure fresh environment variables are picked up
rm -rf .next

# Build and deploy
yarn deploy
```

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `redirect_uri_mismatch` | Redirect URI in Google Console doesn't match Supabase callback URL | Add exact Supabase callback URL to the correct Google OAuth client |
| Redirects to `localhost:3000` after login | `NEXT_PUBLIC_SITE_URL=http://localhost:3000` baked into build from `.env.local` | Comment out `NEXT_PUBLIC_SITE_URL` in `.env.local`, or use `window.location.origin` in code |
| `127.0.0.1:54321` in Network tab | Local Supabase URL being used in production build | Comment out Supabase vars in `.env.local` so `.env.production` takes effect |
| `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` | Corporate proxy blocking `*.workers.dev` | Disable VPN/proxy, or test on mobile data |
| `Access blocked: This app's request is invalid` | Supabase Google Provider has wrong/placeholder Client ID | Update Client ID in Supabase to match the Google OAuth client with the correct redirect URI |
| Google Sign-in toggle is OFF in Supabase | Provider not enabled | Toggle ON in Authentication → Providers → Google |

---

## Quick Reference

| Item | Value |
|------|-------|
| Supabase Callback URL | `https://<project-ref>.supabase.co/auth/v1/callback` |
| App Callback Route | `https://your-app.workers.dev/auth/callback` |
| Google Console Redirect URI | Same as Supabase Callback URL |
| Google Console JS Origin | `https://your-app.workers.dev` |
| Supabase Site URL | `https://your-app.workers.dev` |
