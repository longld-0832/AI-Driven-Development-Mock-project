'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { LikeApiError, toggleLike } from '@/services/kudos-service';

interface LikeErrorLabels {
	sessionExpired: string;
	notFound: string;
	rateLimited: string;
	generic: string;
}

interface KudoCardInteractionsProps {
	kudoId: string;
	initialLikeCount: number;
	initialLikedByMe: boolean;
	permalink: string;
	copyLabel: string;
	copySuccessLabel: string;
	copyFailedLabel: string;
	viewDetailLabel?: string;
	likeLabel: string;
	unlikeLabel: string;
	likeErrorLabels: LikeErrorLabels;
	onToast: (message: string) => void;
	onDetailClick?: () => void;
}

export default function KudoCardInteractions({
	kudoId,
	initialLikeCount,
	initialLikedByMe,
	permalink,
	copyLabel,
	copySuccessLabel,
	copyFailedLabel,
	viewDetailLabel,
	likeLabel,
	unlikeLabel,
	likeErrorLabels,
	onToast,
	onDetailClick,
}: KudoCardInteractionsProps): React.JSX.Element {
	const router = useRouter();
	const [likedByMe, setLikedByMe] = useState(initialLikedByMe);
	const [likeCount, setLikeCount] = useState(initialLikeCount);
	const [pendingLiked, setPendingLiked] = useState(initialLikedByMe);
	const [, startTransition] = useTransition();

	// Last state that was successfully persisted to the server.
	const lastPersistedRef = useRef<boolean>(initialLikedByMe);

	// Debounce the pending state so rapid toggles collapse into a single request.
	const debouncedLiked = useDebounce(pendingLiked, 200);

	function handleLikeClick(): void {
		const optimisticLiked = !likedByMe;
		const optimisticCount = optimisticLiked
			? likeCount + 1
			: Math.max(0, likeCount - 1);

		// Optimistic display update
		setLikedByMe(optimisticLiked);
		setLikeCount(optimisticCount);
		// Schedule the server call via debounce
		setPendingLiked(optimisticLiked);
	}

	// Effect: fire the server request when the debounced state differs from last-persisted.
	useEffect(() => {
		if (debouncedLiked === lastPersistedRef.current) return;

		const previousPersisted = lastPersistedRef.current;
		const previousCount = likeCount;

		startTransition(async () => {
			try {
				const result = await toggleLike({
					kudoId,
					liked: debouncedLiked,
				});
				lastPersistedRef.current = result.likedByMe;
				setLikedByMe(result.likedByMe);
				setLikeCount(result.likeCount);
			} catch (err) {
				// Roll back to previous persisted state
				setLikedByMe(previousPersisted);
				setLikeCount(previousCount);
				setPendingLiked(previousPersisted);

				// Map status code to specific toast + side effect
				if (err instanceof LikeApiError) {
					if (err.status === 401) {
						onToast(likeErrorLabels.sessionExpired);
						setTimeout(() => router.push('/login'), 1000);
						return;
					}
					if (err.status === 404) {
						onToast(likeErrorLabels.notFound);
						router.refresh();
						return;
					}
					if (err.status === 429) {
						onToast(likeErrorLabels.rateLimited);
						return;
					}
				}
				onToast(likeErrorLabels.generic);
			}
		});
		// We intentionally depend only on debouncedLiked + kudoId so this effect
		// fires once per debounced state change.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedLiked, kudoId]);

	async function handleCopyLink(): Promise<void> {
		const absoluteUrl = typeof window === 'undefined'
			? permalink
			: `${window.location.origin}${permalink}`;

		try {
			await navigator.clipboard.writeText(absoluteUrl);
			onToast(copySuccessLabel);
		} catch {
			onToast(copyFailedLabel);
		}
	}

	return (
		<div
			className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-4"
			style={{ borderColor: 'rgba(255,255,255,0.1)' }}
		>
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={handleLikeClick}
					aria-label={likedByMe ? unlikeLabel : likeLabel}
					aria-pressed={likedByMe}
					className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-3 py-2 transition-transform duration-150 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
				>
					<span
						aria-hidden="true"
						style={{
							color: likedByMe ? 'var(--color-heart)' : 'var(--color-heart-unfilled)',
							transition: 'color 150ms ease-in-out',
						}}
					>
						♥
					</span>
					<span className="text-sm font-bold text-white">{likeCount}</span>
				</button>
			</div>
			<div className="flex flex-wrap items-center gap-3">
				<button
					type="button"
					onClick={handleCopyLink}
					className="flex items-center gap-1 min-h-11 rounded-full px-3 py-2 text-sm text-white focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
				>
					{copyLabel}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
				{viewDetailLabel ? (
					<button
						type="button"
						onClick={onDetailClick}
						className="min-h-11 cursor-pointer rounded-full px-3 py-2 text-sm text-white focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
					>
						{viewDetailLabel} ↗
					</button>
				) : null}
			</div>
		</div>
	);
}
