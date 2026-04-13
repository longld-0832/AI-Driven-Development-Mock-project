interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPrev: () => void;
	onNext: () => void;
}

export default function Pagination({
	currentPage,
	totalPages,
	onPrev,
	onNext,
}: PaginationProps): React.JSX.Element {
	return (
		<div className="flex items-center justify-center gap-4" aria-live="polite">
			<button
				type="button"
				onClick={onPrev}
				disabled={currentPage <= 1}
				className="min-h-11 min-w-11 rounded-full text-white transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
				style={{ opacity: currentPage <= 1 ? 0.3 : 1 }}
			>
				←
			</button>
			<span
				className="text-sm md:text-base"
				style={{
					fontFamily: 'var(--font-montserrat)',
					fontWeight: 500,
					lineHeight: '24px',
					color: 'var(--color-white)',
				}}
			>
				<span style={{ color: 'var(--color-accent-yellow)' }}>{currentPage}</span>
				/{totalPages}
			</span>
			<button
				type="button"
				onClick={onNext}
				disabled={currentPage >= totalPages}
				className="min-h-11 min-w-11 rounded-full text-white transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
				style={{ opacity: currentPage >= totalPages ? 0.3 : 1 }}
			>
				→
			</button>
		</div>
	);
}