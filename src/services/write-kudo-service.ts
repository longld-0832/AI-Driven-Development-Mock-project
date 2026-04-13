import { addRuntimeKudo, getUserById } from '@/data/kudos-mock';
import { createClient } from '@/libs/supabase/server';
import type { Hashtag, KudoItem, WriteKudoPayload, WriteKudoResult } from '@/types/kudos';

/**
 * Read the current like state (count + likedByMe per the current user) for a
 * given set of kudo IDs from the DB. Returns a map keyed by kudo id.
 *
 * Used by the server-side page render to overlay persistent like state on
 * the otherwise-mock feed data — this is what makes likes survive reload.
 */
export async function getLikeStateForKudos(
	kudoIds: string[],
): Promise<Map<string, { likeCount: number; likedByMe: boolean }>> {
	const result = new Map<string, { likeCount: number; likedByMe: boolean }>();
	if (kudoIds.length === 0) return result;

	try {
		const supabase = await createClient();
		const { data: { user } } = await supabase.auth.getUser();

		// Fetch denormalized like_count for every kudo id
		const { data: kudos, error: kudosError } = await supabase
			.from('kudos')
			.select('id, like_count')
			.in('id', kudoIds);

		if (kudosError || !kudos) return result;

		// Fetch this user's likes for those same kudos (if authenticated)
		const likedIds = new Set<string>();
		if (user) {
			const { data: myLikes } = await supabase
				.from('kudo_likes')
				.select('kudo_id')
				.eq('user_id', user.id)
				.in('kudo_id', kudoIds);
			for (const row of myLikes ?? []) {
				likedIds.add(row.kudo_id as string);
			}
		}

		for (const row of kudos) {
			const id = row.id as string;
			result.set(id, {
				likeCount: (row.like_count as number) ?? 0,
				likedByMe: likedIds.has(id),
			});
		}
	} catch {
		// Supabase not available — return empty map; caller falls back to mock values
	}

	return result;
}

const MOCK_HASHTAGS: Hashtag[] = [
	{ id: 1, name: 'Dedicated', slug: 'dedicated' },
	{ id: 2, name: 'Inspiring', slug: 'inspiring' },
	{ id: 3, name: 'Creative', slug: 'creative' },
	{ id: 4, name: 'Teamwork', slug: 'teamwork' },
	{ id: 5, name: 'Leadership', slug: 'leadership' },
	{ id: 6, name: 'Problem Solver', slug: 'problem-solver' },
	{ id: 7, name: 'Mentorship', slug: 'mentorship' },
	{ id: 8, name: 'Innovation', slug: 'innovation' },
	{ id: 9, name: 'Going Extra Mile', slug: 'going-extra-mile' },
	{ id: 10, name: 'Positive Vibes', slug: 'positive-vibes' },
];

function clone<T>(value: T): T {
	return JSON.parse(JSON.stringify(value)) as T;
}

export async function getHashtags(): Promise<Hashtag[]> {
	try {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from('hashtags')
			.select('id, name, slug')
			.order('name');

		if (error || !data) {
			return clone(MOCK_HASHTAGS);
		}
		return data as Hashtag[];
	} catch {
		return clone(MOCK_HASHTAGS);
	}
}

export async function createKudo(
	senderId: string,
	payload: WriteKudoPayload,
): Promise<WriteKudoResult> {
	try {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from('kudos')
			.insert({
				sender_id: senderId,
				receiver_id: payload.recipientId,
				honor_title: payload.honorTitle,
				content: payload.content,
				hashtags: payload.hashtags,
				images: payload.imageUrls ?? [],
				is_anonymous: payload.isAnonymous,
				anonymous_name: payload.isAnonymous ? (payload.anonymousName || null) : null,
			})
			.select('id, created_at')
			.single();

		if (error) {
			throw new Error(error.message);
		}

		return {
			id: data.id as string,
			createdAt: data.created_at as string,
		};
	} catch {
		// Mock fallback for dev without Supabase — persist in runtime memory
		const id = crypto.randomUUID();
		const createdAt = new Date().toISOString();
		const receiver = getUserById(payload.recipientId);

		const mockKudo: KudoItem = {
			id,
			sender: {
				id: senderId,
				name: payload.isAnonymous ? 'An danh' : 'You',
				initials: payload.isAnonymous ? '?' : 'Y',
				department: '',
				role: '',
				relationshipBadge: 'team',
			},
			receiver: receiver ?? {
				id: payload.recipientId,
				name: 'Unknown',
				initials: '??',
				department: '',
				role: '',
				relationshipBadge: 'team',
			},
			createdAtLabel: new Date().toLocaleString(),
			category: payload.honorTitle,
			message: payload.content,
			images: payload.imageUrls ?? [],
			hasVideo: false,
			hashtags: payload.hashtags,
			likeCount: 0,
			likedByMe: false,
			isHighlighted: false,
			department: receiver?.department ?? '',
			permalink: '#',
		};

		addRuntimeKudo(mockKudo);

		return { id, createdAt };
	}
}
