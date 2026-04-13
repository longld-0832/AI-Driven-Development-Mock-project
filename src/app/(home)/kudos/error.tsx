'use client';

export default function KudosError({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}): React.JSX.Element {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center" style={{ backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-white)' }}>
			<p className="text-lg font-bold">Da xay ra loi khi tai man Sun Kudos.</p>
			<button
				type="button"
				onClick={reset}
				className="rounded-lg px-6 py-3 font-bold focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
				style={{
					backgroundColor: 'var(--color-accent-yellow)',
					color: 'var(--color-bg-dark)',
				}}
			>
				Thu lai
			</button>
		</div>
	);
}