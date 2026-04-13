'use client';

import AwardDetailCard from '@/components/awards/AwardDetailCard';
import AwardsCategoryNav from '@/components/awards/AwardsCategoryNav';
import AwardsTitleSection from '@/components/awards/AwardsTitleSection';
import SunKudosPromo from '@/components/awards/SunKudosPromo';
import { useLocale } from '@/hooks/useLocale';
import type { AwardDetail } from '@/types/award';

interface AwardsPageContentProps {
	awards: AwardDetail[];
}

export default function AwardsPageContent({ awards }: AwardsPageContentProps): React.JSX.Element {
	const locale = useLocale();
	const categories = awards.map((award) => ({ slug: award.slug, name: award.name }));

	return (
		<main
			className="w-full flex flex-col"
			style={{ gap: 'var(--spacing-section-gap)' }}
		>
			<div
				className="w-full"
				style={{
					paddingTop: 'var(--spacing-page-py)',
					paddingLeft: '16px',
					paddingRight: '16px',
				}}
			>
				<AwardsTitleSection />
			</div>

			<div className="w-full max-w-[1152px] mx-auto px-4 md:px-10 xl:px-0">
				<div className="flex flex-row gap-[var(--spacing-menu-content-gap)]">
					<AwardsCategoryNav categories={categories} />

					<div
						className="flex-1 flex flex-col"
						style={{ gap: 'var(--spacing-awards-row-gap)' }}
					>
						{awards.map((award, index) => (
							<AwardDetailCard
								key={award.id}
								award={award}
								locale={locale}
								isFirst={award.displayOrder === 1}
								isLast={index === awards.length - 1}
								reverse={index % 2 !== 0}
							/>
						))}
					</div>
				</div>
			</div>

			<div
				className="w-full max-w-[1152px] mx-auto px-4 md:px-10 xl:px-0"
				style={{ paddingBottom: 'var(--spacing-page-py)' }}
			>
				<SunKudosPromo />
			</div>
		</main>
	);
}