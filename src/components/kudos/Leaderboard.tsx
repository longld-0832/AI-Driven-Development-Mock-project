'use client';

import LeaderboardEntry from '@/components/kudos/LeaderboardEntry';
import { useLocale } from '@/hooks/useLocale';
import { SUN_KUDOS_I18N } from '@/libs/i18n/sun-kudos';
import type { LeaderboardEntry as LeaderboardEntryType } from '@/types/kudos';

interface LeaderboardProps {
	entries: LeaderboardEntryType[];
	onUnavailableProfile: () => void;
}

export default function Leaderboard({
	entries,
	onUnavailableProfile,
}: LeaderboardProps): React.JSX.Element {
	const locale = useLocale();
	const t = SUN_KUDOS_I18N[locale];

	return (
		<div className="flex flex-col gap-2 md:gap-3 rounded-2xl border p-4 md:p-6" style={{ borderColor: 'var(--color-border-btn)' }}>
			<p className="text-xs font-semibold uppercase" style={{ color: 'var(--color-accent-yellow)' }}>
				{t.leaderboard.title}
			</p>
			<div className="flex flex-col gap-2">
				{entries.map((entry, index) => (
					<LeaderboardEntry
						key={entry.id}
						entry={entry}
						index={index}
						receivedSuffix={t.leaderboard.receivedSuffix}
						onSelect={onUnavailableProfile}
					/>
				))}
			</div>
		</div>
	);
}