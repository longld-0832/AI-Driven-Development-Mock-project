'use client';

import { useEffect, useMemo, useState } from 'react';
import CarouselArrow from '@/components/kudos/CarouselArrow';
import FilterDropdown from '@/components/kudos/FilterDropdown';
import ImageLightbox from '@/components/kudos/ImageLightbox';
import KudoCard from '@/components/kudos/KudoCard';
import Pagination from '@/components/kudos/Pagination';
import SectionHeading from '@/components/kudos/SectionHeading';
import SectionLabel from '@/components/kudos/SectionLabel';
import Toast from '@/components/kudos/Toast';
import { useLocale } from '@/hooks/useLocale';
import { SUN_KUDOS_I18N } from '@/libs/i18n/sun-kudos';
import type { KudoItem } from '@/types/kudos';

interface HighlightKudosProps {
	items: KudoItem[];
}

export default function HighlightKudos({ items }: HighlightKudosProps): React.JSX.Element {
	const locale = useLocale();
	const t = SUN_KUDOS_I18N[locale];
	// Empty string is the stable "All" sentinel. The UI resolves it to the
	// current locale's `t.filters.all` at render time, so changing language
	// does not orphan the selected value.
	const [selectedHashtag, setSelectedHashtag] = useState<string>('');
	const [selectedDepartment, setSelectedDepartment] = useState<string>('');
	const [currentPage, setCurrentPage] = useState(1);
	const [cardsPerPage, setCardsPerPage] = useState(4);
	const [lightboxImages, setLightboxImages] = useState<string[]>([]);
	const [lightboxIndex, setLightboxIndex] = useState(0);
	const [toastMessage, setToastMessage] = useState('');

	useEffect(() => {
		function handleResize(): void {
			if (window.innerWidth >= 1280) {
				setCardsPerPage(4);
				return;
			}
			if (window.innerWidth >= 768) {
				setCardsPerPage(2);
				return;
			}
			setCardsPerPage(1);
		}

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const hashtagOptions = useMemo(() => {
		return [
			t.filters.all,
			...new Set(items.flatMap((item) => item.hashtags)),
		];
	}, [items, t.filters.all]);

	const departmentOptions = useMemo(() => {
		return [
			t.filters.all,
			...new Set(items.map((item) => item.department)),
		];
	}, [items, t.filters.all]);

	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			const matchesHashtag = !selectedHashtag || item.hashtags.includes(selectedHashtag);
			const matchesDepartment = !selectedDepartment || item.department === selectedDepartment;
			return matchesHashtag && matchesDepartment;
		});
	}, [items, selectedDepartment, selectedHashtag]);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedDepartment, selectedHashtag, cardsPerPage]);

	const totalPages = Math.max(1, Math.ceil(filteredItems.length / cardsPerPage));
	const safeCurrentPage = Math.min(currentPage, totalPages);
	const startIndex = (safeCurrentPage - 1) * cardsPerPage;
	const visibleItems = filteredItems.slice(startIndex, startIndex + cardsPerPage);
	const showPaginationControls = totalPages > 1;

	function getCardBasis(): string {
		if (cardsPerPage === 4) {
			return 'calc((100% - 72px) / 4)';
		}

		if (cardsPerPage === 2) {
			return 'calc((100% - 24px) / 2)';
		}

		return '100%';
	}

	return (
		<section className="mx-auto flex w-full max-w-[1224px] flex-col gap-6 px-4 md:px-10 xl:px-0">
			<SectionLabel>{t.sectionLabel}</SectionLabel>
			<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
				<SectionHeading>{t.sections.highlight}</SectionHeading>
				<div className="flex flex-wrap gap-2 md:gap-3 md:shrink-0">
					<FilterDropdown
						label={t.filters.hashtag}
						options={hashtagOptions}
						selectedValue={selectedHashtag || t.filters.all}
						onChange={(value) =>
							setSelectedHashtag(value === t.filters.all ? '' : value)
						}
					/>
					<FilterDropdown
						label={t.filters.department}
						options={departmentOptions}
						selectedValue={selectedDepartment || t.filters.all}
						onChange={(value) =>
							setSelectedDepartment(value === t.filters.all ? '' : value)
						}
					/>
				</div>
			</div>

			<div className="flex items-center justify-between gap-4">
				{showPaginationControls ? (
					<CarouselArrow
						direction="left"
						disabled={safeCurrentPage <= 1}
						onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
						label="Previous highlight page"
					/>
				) : (
					<div className="hidden h-12 w-12 xl:block" aria-hidden="true" />
				)}
				<div className="flex flex-1 flex-wrap justify-start gap-6">
					{visibleItems.map((item) => (
						<div
							key={item.id}
							className="min-w-0"
							style={{
								flex: `0 0 ${getCardBasis()}`,
								maxWidth: getCardBasis(),
							}}
						>
							<KudoCard
								kudo={item}
								badgeLabels={t.badges}
								actions={{
									copyLink: t.actions.copyLink,
									copySuccess: t.actions.copied,
									copyFailed: t.actions.copyFailed,
									viewDetail: t.actions.viewDetail,
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
								showDetailLink
								onDetailClick={() => setToastMessage(t.actions.detailPending)}
								onVideoClick={() => setToastMessage(t.actions.videoUnavailable)}
								compact
							/>
						</div>
					))}
				</div>
				{showPaginationControls ? (
					<CarouselArrow
						direction="right"
						disabled={safeCurrentPage >= totalPages}
						onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
						label="Next highlight page"
					/>
				) : (
					<div className="hidden h-12 w-12 xl:block" aria-hidden="true" />
				)}
			</div>

			{showPaginationControls ? (
				<Pagination
					currentPage={safeCurrentPage}
					totalPages={totalPages}
					onPrev={() => setCurrentPage((page) => Math.max(1, page - 1))}
					onNext={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
				/>
			) : null}

			{lightboxImages.length > 0 && (
				<ImageLightbox
					images={lightboxImages}
					activeIndex={lightboxIndex}
					onClose={() => setLightboxImages([])}
					onPrev={() => setLightboxIndex((index) => (index - 1 + lightboxImages.length) % lightboxImages.length)}
					onNext={() => setLightboxIndex((index) => (index + 1) % lightboxImages.length)}
				/>
			)}

			{toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
		</section>
	);
}