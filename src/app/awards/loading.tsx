export default function AwardsLoading(): React.JSX.Element {
	return (
		<div
			className="min-h-screen flex flex-col"
			style={{ backgroundColor: "#00101A" }}
		>
			{/* Hero skeleton */}
			<div className="w-full h-[300px] md:h-[547px] animate-pulse bg-[rgba(255,234,158,0.03)]" />

			{/* Content skeleton */}
			<div className="w-full max-w-[1152px] mx-auto px-4 md:px-10 xl:px-0 py-[96px] flex flex-col gap-[120px]">
				{/* Title skeleton */}
				<div className="flex flex-col items-center gap-4">
					<div className="w-[338px] h-[150px] animate-pulse rounded bg-[rgba(255,234,158,0.05)]" />
					<div className="w-[300px] h-8 animate-pulse rounded bg-[rgba(255,234,158,0.05)]" />
					<div className="w-full h-px bg-[rgba(255,234,158,0.05)]" />
					<div className="w-[500px] h-12 animate-pulse rounded bg-[rgba(255,234,158,0.05)]" />
				</div>

				{/* Card skeletons */}
				<div className="flex flex-col gap-[80px]">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="flex flex-col xl:flex-row gap-10">
							<div className="w-[336px] h-[336px] shrink-0 animate-pulse rounded-3xl bg-[rgba(255,234,158,0.05)]" />
							<div className="flex-1 flex flex-col gap-8">
								<div className="w-48 h-8 animate-pulse rounded bg-[rgba(255,234,158,0.05)]" />
								<div className="w-full h-24 animate-pulse rounded bg-[rgba(255,234,158,0.05)]" />
								<div className="w-full h-px bg-[rgba(255,234,158,0.05)]" />
								<div className="w-32 h-10 animate-pulse rounded bg-[rgba(255,234,158,0.05)]" />
								<div className="w-full h-px bg-[rgba(255,234,158,0.05)]" />
								<div className="w-40 h-10 animate-pulse rounded bg-[rgba(255,234,158,0.05)]" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
