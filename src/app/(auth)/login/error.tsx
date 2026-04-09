"use client";

export default function LoginError({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}): React.JSX.Element {
	return (
		<div
			className="min-h-screen w-full flex flex-col items-center justify-center gap-4"
			style={{ backgroundColor: "var(--color-bg-dark)", color: "var(--color-white)" }}
		>
			<p className="text-lg font-semibold">Something went wrong. Please try again.</p>
			<button
				onClick={reset}
				className="px-6 py-3 rounded-lg font-bold cursor-pointer"
				style={{ backgroundColor: "var(--color-accent-yellow)", color: "var(--color-bg-dark)" }}
			>
				Retry
			</button>
		</div>
	);
}
