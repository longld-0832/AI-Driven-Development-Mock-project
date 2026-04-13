import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import KudosPageContent from '@/components/kudos/KudosPageContent';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { createClient } from '@/libs/supabase/server';
import { getKudosPageData } from '@/services/kudos-service';
import {
	getHashtags,
	getLikeStateForKudos,
} from '@/services/write-kudo-service';
import type { KudoItem } from '@/types/kudos';

export const metadata: Metadata = {
	title: 'Sun* Kudos | SAA 2025',
	description:
		'Sun* Kudos live board for recognition, highlights, personal stats, and company-wide appreciation moments.',
};

export default async function KudosPage(): Promise<React.JSX.Element> {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	const [pageData, hashtags] = await Promise.all([
		getKudosPageData(),
		getHashtags(),
	]);

	// Overlay persisted like state from the DB onto the mock feed so that
	// clicking the heart survives a page reload.
	const allKudoIds = [
		...pageData.allKudos.map((k) => k.id),
		...pageData.highlightedKudos.map((k) => k.id),
	];
	const likeState = await getLikeStateForKudos(allKudoIds);

	function applyLikeState(kudo: KudoItem): KudoItem {
		const state = likeState.get(kudo.id);
		if (!state) return kudo;
		return {
			...kudo,
			likeCount: state.likeCount,
			likedByMe: state.likedByMe,
		};
	}

	const hydratedAllKudos = pageData.allKudos.map(applyLikeState);
	const hydratedHighlighted = pageData.highlightedKudos.map(applyLikeState);

	return (
		<div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-dark)' }}>
			<Header />
			<KudosPageContent
				users={pageData.searchableUsers}
				hashtags={hashtags}
				highlightedKudos={hydratedHighlighted}
				allKudos={hydratedAllKudos}
				personalStats={pageData.personalStats}
				leaderboard={pageData.leaderboard}
				spotlight={pageData.spotlight}
			/>
			<Footer />
		</div>
	);
}
