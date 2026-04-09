import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/middleware";

export async function middleware(request: NextRequest): Promise<NextResponse> {
	const { supabase, supabaseResponse } = createClient(request);

	// Refresh session cookie — MUST await before reading user
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		const loginUrl = new URL("/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	return supabaseResponse;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths EXCEPT:
		 * - /login (auth page itself)
		 * - /auth/callback (OAuth callback)
		 * - /_next/static (Next.js static files)
		 * - /_next/image (Next.js image optimisation)
		 * - /favicon.* (favicon)
		 * - /assets (public static assets)
		 */
		"/((?!login|auth/callback|_next/static|_next/image|favicon|assets).*)",
	],
};
