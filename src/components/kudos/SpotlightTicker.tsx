'use client';

import type { SpotlightTickerItem } from '@/types/kudos';

interface SpotlightTickerProps {
	items: SpotlightTickerItem[];
	ariaLabel: string;
}

export default function SpotlightTicker({
	items,
	ariaLabel,
}: SpotlightTickerProps): React.JSX.Element {
	const repeatedItems = [...items, ...items];

	return (
		<div className="overflow-hidden" aria-label={ariaLabel}>
			<div className="kudos-ticker-track flex min-w-max items-center gap-8 py-3">
				{repeatedItems.map((item, index) => (
					<span
						key={`${item.id}-${index}`}
						className="flex items-center gap-8 whitespace-nowrap text-sm"
						style={{ color: 'var(--color-white)' }}
					>
						<span
							className="mr-8 text-xs"
							style={{ color: 'var(--color-accent-yellow)', opacity: 0.6 }}
							aria-hidden="true"
						>
							♥
						</span>
						{item.message}
					</span>
				))}
			</div>
		</div>
	);
}