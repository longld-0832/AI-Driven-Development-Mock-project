export default function KudosLoading(): React.JSX.Element {
	return (
		<div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-dark)' }}>
			<div className="mx-auto flex w-full max-w-[1224px] flex-col gap-8 px-4 py-8 md:px-10 xl:px-0">
				<div className="h-[280px] animate-pulse rounded-3xl bg-white/5 md:h-[360px]" />
				<div className="h-8 w-44 animate-pulse rounded bg-white/5" />
				<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
					{Array.from({ length: 4 }).map((_, index) => (
						<div key={index} className="h-[420px] animate-pulse rounded-2xl border border-white/10 bg-white/5" />
					))}
				</div>
				<div className="h-[320px] animate-pulse rounded-2xl border border-white/10 bg-white/5" />
				<div className="grid gap-8 xl:grid-cols-[1fr_320px]">
					<div className="space-y-6">
						{Array.from({ length: 3 }).map((_, index) => (
							<div key={index} className="h-[360px] animate-pulse rounded-2xl border border-white/10 bg-white/5" />
						))}
					</div>
					<div className="h-[420px] animate-pulse rounded-2xl border border-white/10 bg-white/5" />
				</div>
			</div>
		</div>
	);
}