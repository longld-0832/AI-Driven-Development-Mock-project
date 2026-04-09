"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/libs/supabase/client";

export interface LoginButtonProps {
	initialError?: string | null;
}

export default function LoginButton({ initialError = null }: LoginButtonProps): React.JSX.Element {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(initialError ?? null);

	async function handleLogin(): Promise<void> {
		setIsLoading(true);
		setError(null);

		const supabase = createClient();
		const redirectTo =
			(process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin) + "/auth/callback";

		const { error: oauthError } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo },
		});

		if (oauthError) {
			console.error("[LoginButton] signInWithOAuth error:", oauthError.message);
			setError("Đăng nhập thất bại. Vui lòng thử lại.");
			setIsLoading(false);
		}
		// On success, the browser is redirected — no need to setIsLoading(false)
	}

	return (
		<div className="flex flex-col items-start">
			<button
				type="button"
				onClick={handleLogin}
				aria-label="Login with Google"
				aria-disabled={isLoading}
				disabled={isLoading}
				className={[
					"w-full md:w-[305px] h-[60px] min-h-[44px]",
					"rounded-lg flex items-center justify-center gap-2 px-6 py-4",
					"cursor-pointer font-bold text-[22px] leading-7",
					"transition-all duration-150",
					"focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
					isLoading ? "opacity-60 pointer-events-none" : "",
				]
					.filter(Boolean)
					.join(" ")}
				style={{
					backgroundColor: "var(--color-accent-yellow)",
					color: "var(--color-bg-dark)",
					fontFamily: "var(--font-montserrat)",
					// @ts-expect-error -- CSS variable for outline colour
					"--tw-ring-color": "var(--color-accent-yellow)",
					outlineColor: "var(--color-accent-yellow)",
				}}
				onMouseEnter={(e) => {
					if (!isLoading) {
						(e.currentTarget as HTMLButtonElement).style.backgroundColor =
							"var(--color-accent-yellow-hover)";
						(e.currentTarget as HTMLButtonElement).style.boxShadow =
							"var(--shadow-button-hover)";
					}
				}}
				onMouseLeave={(e) => {
					(e.currentTarget as HTMLButtonElement).style.backgroundColor =
						"var(--color-accent-yellow)";
					(e.currentTarget as HTMLButtonElement).style.boxShadow = "";
				}}
			>
				{isLoading ? (
					<span
						className="w-6 h-6 rounded-full border-2 border-current border-t-transparent animate-spin"
						aria-hidden="true"
					/>
				) : (
					<Image
						src="/assets/login/icons/google-icon.svg"
						alt=""
						width={24}
						height={24}
						aria-hidden
					/>
				)}
				<span>LOGIN With Google</span>
			</button>

			{error && (
				<p
					role="alert"
					className="mt-2 text-sm"
					style={{ color: "var(--color-error)", fontFamily: "var(--font-montserrat)" }}
				>
					{error}
				</p>
			)}
		</div>
	);
}
