'use client';

import { useCallback, useState } from 'react';
import KudosHero from '@/components/kudos/KudosHero';
import HighlightKudos from '@/components/kudos/HighlightKudos';
import SpotlightBoard from '@/components/kudos/SpotlightBoard';
import AllKudosSection from '@/components/kudos/AllKudosSection';
import type {
	Hashtag,
	KudoItem,
	KudoUser,
	LeaderboardEntry,
	PersonalKudosStats,
	SpotlightData,
} from '@/types/kudos';

interface KudosPageContentProps {
	users: KudoUser[];
	hashtags: Hashtag[];
	highlightedKudos: KudoItem[];
	allKudos: KudoItem[];
	personalStats: PersonalKudosStats;
	leaderboard: LeaderboardEntry[];
	spotlight: SpotlightData;
}

export default function KudosPageContent({
	users,
	hashtags,
	highlightedKudos,
	allKudos,
	personalStats,
	leaderboard,
	spotlight,
}: KudosPageContentProps): React.JSX.Element {
	const [feedItems, setFeedItems] = useState<KudoItem[]>(allKudos);

	const handleKudoCreated = useCallback((newKudo: KudoItem) => {
		setFeedItems((prev) => [newKudo, ...prev]);
	}, []);

	return (
		<main className="flex flex-col gap-16 pb-16 md:gap-24 md:pb-24 xl:gap-[96px] xl:pb-[96px]">
			<KudosHero
				users={users}
				hashtags={hashtags}
				onKudoCreated={handleKudoCreated}
			/>
			<HighlightKudos items={highlightedKudos} />
			<SpotlightBoard spotlight={spotlight} />
			<AllKudosSection
				items={feedItems}
				stats={personalStats}
				leaderboard={leaderboard}
			/>
		</main>
	);
}
