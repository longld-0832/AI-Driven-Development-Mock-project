'use client';

import SecretBoxButton from '@/components/kudos/SecretBoxButton';
import { useLocale } from '@/hooks/useLocale';
import { SUN_KUDOS_I18N } from '@/libs/i18n/sun-kudos';
import type { PersonalKudosStats } from '@/types/kudos';

interface PersonalStatsProps {
	stats: PersonalKudosStats;
}

export default function PersonalStats({
	stats,
}: PersonalStatsProps): React.JSX.Element {
	const locale = useLocale();
	const t = SUN_KUDOS_I18N[locale];

	const rows = [
		{ label: t.stats.received, value: stats.kudosReceived },
		{ label: t.stats.sent, value: stats.kudosSent },
		{ label: t.stats.totalFire, value: stats.totalReceivedFire },
		{ label: t.stats.opened, value: stats.secretBoxesOpened },
		{ label: t.stats.remaining, value: stats.secretBoxesRemaining },
	];

	return (
		<div
			className="flex flex-col gap-4 md:gap-5 rounded-2xl border p-4 md:p-6 xl:sticky xl:top-24"
			style={{
				backgroundColor: 'var(--color-surface-card)',
				borderColor: 'var(--color-border-btn)',
			}}
		>
			{rows.map((row) => (
				<div key={row.label} className="flex items-start justify-between gap-4">
					<p className="text-sm text-white">{row.label}</p>
					<p className="text-xl font-bold" style={{ color: 'var(--color-accent-yellow)' }}>
						{row.value}
					</p>
				</div>
			))}
			<SecretBoxButton href={stats.secretBoxHref} label={t.actions.secretBox} />
		</div>
	);
}