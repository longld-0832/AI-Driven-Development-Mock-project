'use client';

import { useState } from 'react';
import ImageLightbox from '@/components/kudos/ImageLightbox';
import KudoCard from '@/components/kudos/KudoCard';
import Toast from '@/components/kudos/Toast';
import { useLocale } from '@/hooks/useLocale';
import { SUN_KUDOS_I18N } from '@/libs/i18n/sun-kudos';
import type { KudoItem } from '@/types/kudos';

interface KudoFeedProps {
	items: KudoItem[];
}

export default function KudoFeed({ items }: KudoFeedProps): React.JSX.Element {
	const locale = useLocale();
	const t = SUN_KUDOS_I18N[locale];
	const [visibleCount, setVisibleCount] = useState(4);
	const [lightboxImages, setLightboxImages] = useState<string[]>([]);
	const [lightboxIndex, setLightboxIndex] = useState(0);
	const [toastMessage, setToastMessage] = useState('');

	const visibleItems = items.slice(0, visibleCount);
	const hasMoreItems = visibleCount < items.length;

	return (
		<div className="flex flex-col gap-8">
			{visibleItems.length ? (
				visibleItems.map((item) => (
					<KudoCard
						key={item.id}
						kudo={item}
						badgeLabels={t.badges}
						actions={{
							copyLink: t.actions.copyLink,
							copySuccess: t.actions.copied,
							copyFailed: t.actions.copyFailed,
							like: t.actions.like,
							unlike: t.actions.unlike,
							likeFailed: t.actions.likeFailed,
							likeErrorSessionExpired: t.actions.likeErrorSessionExpired,
							likeErrorNotFound: t.actions.likeErrorNotFound,
							likeErrorRateLimited: t.actions.likeErrorRateLimited,
							playVideo: t.actions.playVideo,
						}}
						onToast={setToastMessage}
						onImageClick={(images, index) => {
							setLightboxImages(images);
							setLightboxIndex(index);
						}}
						onVideoClick={() => setToastMessage(t.actions.videoUnavailable)}
					/>
				))
			) : (
				<div className="rounded-2xl border p-6 text-sm text-white" style={{ borderColor: 'var(--color-border-btn)' }}>
					{t.feed.empty}
				</div>
			)}

			{hasMoreItems ? (
				<button
					type="button"
					onClick={() => setVisibleCount((count) => count + 2)}
					className="self-start rounded-full border px-5 py-3 text-sm text-white focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
					style={{ borderColor: 'var(--color-border-btn)' }}
				>
					{t.actions.loadMore}
				</button>
			) : (
				<p className="text-sm" style={{ color: 'var(--color-role-text)' }}>
					{t.feed.end}
				</p>
			)}

			{lightboxImages.length ? (
				<ImageLightbox
					images={lightboxImages}
					activeIndex={lightboxIndex}
					onClose={() => setLightboxImages([])}
					onPrev={() => setLightboxIndex((index) => (index - 1 + lightboxImages.length) % lightboxImages.length)}
					onNext={() => setLightboxIndex((index) => (index + 1) % lightboxImages.length)}
				/>
			) : null}

			{toastMessage ? <Toast message={toastMessage} onClose={() => setToastMessage('')} /> : null}
		</div>
	);
}