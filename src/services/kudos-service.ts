import { KUDOS_PAGE_MOCK, KUDOS_MOCKS } from '@/data/kudos-mock';
import type {
	KudoItem,
	KudoPageData,
	KudoUser,
	LikeKudoResult,
} from '@/types/kudos';

function clone<T>(value: T): T {
	return JSON.parse(JSON.stringify(value)) as T;
}

/** Typed error thrown by toggleLike() on non-OK API responses. */
export class LikeApiError extends Error {
	constructor(public status: number, message: string) {
		super(message);
		this.name = 'LikeApiError';
	}
}

export async function getKudosPageData(): Promise<KudoPageData> {
	return clone(KUDOS_PAGE_MOCK);
}

export async function searchUsers(query: string): Promise<KudoUser[]> {
	const normalizedQuery = query.trim().toLowerCase();
	if (normalizedQuery.length < 2) {
		return [];
	}

	return clone(KUDOS_PAGE_MOCK.searchableUsers).filter((user) => {
		return [user.name, user.department, user.role]
			.join(' ')
			.toLowerCase()
			.includes(normalizedQuery);
	});
}

export async function getAllKudosPage(page: number, pageSize: number): Promise<KudoItem[]> {
	const startIndex = Math.max(0, (page - 1) * pageSize);
	const endIndex = startIndex + pageSize;
	return clone(KUDOS_MOCKS.slice(startIndex, endIndex));
}

export async function toggleLike(params: {
	kudoId: string;
	liked: boolean;
}): Promise<LikeKudoResult> {
	const response = await fetch(`/api/kudos/${params.kudoId}/like`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ liked: params.liked }),
	});

	if (!response.ok) {
		let message = `Request failed with status ${response.status}`;
		try {
			const data = (await response.json()) as { error?: string };
			if (data.error) message = data.error;
		} catch {
			// body wasn't JSON — keep default message
		}
		throw new LikeApiError(response.status, message);
	}

	return (await response.json()) as LikeKudoResult;
}

