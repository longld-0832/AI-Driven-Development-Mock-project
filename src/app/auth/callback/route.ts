import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

// Allowlist of safe redirect destinations (must be relative paths)
const ALLOWED_NEXT_PATHS = ["/", "/home"];

function isSafeNextPath(next: string | null): boolean {
	if (!next) return false;
	// Must be a relative path starting with / and not containing protocol or host
	if (!next.startsWith("/") || next.startsWith("//")) return false;
	try {
		// Check it's on allowlist
		const decoded = decodeURIComponent(next);
		return ALLOWED_NEXT_PATHS.some((allowed) => decoded === allowed || decoded.startsWith(allowed + "/"));
	} catch {
		return false;
	}
}

export async function GET(request: NextRequest): Promise<NextResponse> {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next");

	// Validate code param — must be a non-empty string (PKCE code)
	if (!code || typeof code !== "string" || code.trim() === "") {
		return NextResponse.redirect(new URL("/login?error=invalid_callback", origin));
	}

	try {
		const supabase = await createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (error) {
			// Log server-side only — never expose Supabase internals in the response (OWASP A09)
			console.error("[auth/callback] exchangeCodeForSession error:", error.message);
			return NextResponse.redirect(new URL("/login?error=auth_failed", origin));
		}

		// Redirect to `next` if it's in the allowlist, otherwise go to homepage
		const redirectTo = isSafeNextPath(next) ? next! : "/";
		return NextResponse.redirect(new URL(redirectTo, origin));
	} catch (err) {
		console.error("[auth/callback] Unexpected error:", err);
		return NextResponse.redirect(new URL("/login?error=auth_failed", origin));
	}
}
