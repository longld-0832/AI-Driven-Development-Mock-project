"use client";

import type { AwardDetail } from "@/types/award";
import type { LocaleCode } from "@/libs/i18n/locale";
import AwardDetailImage from "@/components/awards/AwardDetailImage";
import AwardDetailContent from "@/components/awards/AwardDetailContent";

interface AwardDetailCardProps {
	award: AwardDetail;
	locale: LocaleCode;
	isFirst?: boolean;
	isLast?: boolean;
	reverse?: boolean;
}

export default function AwardDetailCard({
	award,
	locale,
	isFirst = false,
	isLast = false,
	reverse = false,
}: AwardDetailCardProps): React.JSX.Element {
	return (
		<section id={award.id}>
			<div className={`flex flex-col xl:flex-row gap-6 xl:gap-[var(--spacing-card-inner-gap)]${reverse ? " xl:flex-row-reverse" : ""}`}>
				<AwardDetailImage
					src={award.imageSrc}
					alt={award.imageAlt}
					priority={isFirst}
				/>
				<AwardDetailContent award={award} locale={locale} />
			</div>
			{!isLast && (
				<div
					className="w-full h-px mt-[var(--spacing-awards-row-gap)]"
					style={{ backgroundColor: "var(--color-divider)" }}
				/>
			)}
		</section>
	);
}
