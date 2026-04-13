'use client';

import { useMemo, useState } from 'react';
import KudoFeed from '@/components/kudos/KudoFeed';
import Leaderboard from '@/components/kudos/Leaderboard';
import PersonalStats from '@/components/kudos/PersonalStats';
import SectionHeading from '@/components/kudos/SectionHeading';
import SectionLabel from '@/components/kudos/SectionLabel';
import Toast from '@/components/kudos/Toast';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocale } from '@/hooks/useLocale';
import { SUN_KUDOS_I18N } from '@/libs/i18n/sun-kudos';
import type { KudoItem, LeaderboardEntry, PersonalKudosStats } from '@/types/kudos';

interface AllKudosSectionProps {
	items: KudoItem[];
	stats: PersonalKudosStats;
	leaderboard: LeaderboardEntry[];
}

export default function AllKudosSection({
	items,
	stats,
	leaderboard,
}: AllKudosSectionProps): React.JSX.Element {
	const locale = useLocale();
	const t = SUN_KUDOS_I18N[locale];
	const [toastMessage, setToastMessage] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const debouncedSearch = useDebounce(searchQuery, 300);

	const filteredItems = useMemo(() => {
		const q = debouncedSearch.trim().toLowerCase();
		if (!q) return items;
		return items.filter((item) =>
			[item.message, item.sender.name, item.receiver.name, ...item.hashtags]
				.join(' ')
				.toLowerCase()
				.includes(q),
		);
	}, [items, debouncedSearch]);

	return (
		<section className="mx-auto flex w-full max-w-[1224px] flex-col gap-6 px-4 md:px-10 xl:px-0">
			<SectionLabel>{t.sectionLabel}</SectionLabel>
			<SectionHeading>{t.sections.allKudos}</SectionHeading>
			<div className="relative">
				<span
					className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
					style={{ color: 'var(--color-role-text)' }}
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
						<path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
					</svg>
				</span>
				<input
					type="text"
					value={searchQuery}
					onChange={(event) => setSearchQuery(event.target.value)}
					placeholder={t.feed.searchPlaceholder}
					className="h-12 w-full rounded-full border bg-transparent pl-12 pr-4 text-sm text-white outline-none transition-shadow duration-150"
					style={{
						borderColor: 'var(--color-border-btn)',
						fontFamily: 'var(--font-montserrat)',
					}}
					aria-label={t.feed.searchPlaceholder}
				/>
			</div>
			<div className="flex flex-col gap-6 md:gap-8 xl:flex-row xl:items-start">
				<div className="min-w-0 flex-1">
					<KudoFeed key={debouncedSearch} items={filteredItems} />
				</div>
				<aside className="flex w-full flex-col gap-4 md:gap-6 xl:w-[320px] xl:shrink-0">
					<PersonalStats stats={stats} />
					<Leaderboard
						entries={leaderboard}
						onUnavailableProfile={() => setToastMessage(t.actions.profilePending)}
					/>
				</aside>
			</div>
			{toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
		</section>
	);
}