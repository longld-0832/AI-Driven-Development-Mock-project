"use client";

import Link from "next/link";
import type { Award } from "@/data/awards";
import { useLocale } from "@/hooks/useLocale";
import { HOMEPAGE_I18N } from "@/libs/i18n/homepage";
import AwardCardImage from "./AwardCardImage";

interface AwardCardProps {
	award: Award;
}

export default function AwardCard({ award }: AwardCardProps): React.JSX.Element {
	const locale = useLocale();
	const t = HOMEPAGE_I18N[locale].awardCard;
	const description = locale === "en" ? award.descriptionEn : award.descriptionVi;
	const detailHref = `/awards#${award.slug}`;

	return (
		<div
			className="flex flex-col"
			style={{ gap: "16px", width: "100%" }}
		>
			{/* Thumbnail — clickable */}
			<Link href={detailHref} aria-label={`${t.viewDetailAriaPrefix} ${award.name}`}>
				<AwardCardImage src={award.thumbnailSrc} alt={award.thumbnailAlt} />
			</Link>

			{/* Text content */}
			<div className="flex flex-col gap-1 md:gap-2">
				{/* Award name */}
				<Link
					href={detailHref}
					className="hover:underline text-base md:text-2xl"
					style={{ fontWeight: 400, color: "#FFEA9E" }}
				>
					{award.name}
				</Link>

				{/* Description — max 2 lines */}
				<p
					className="text-white line-clamp-2 text-xs md:text-base"
					style={{ fontWeight: 400, lineHeight: "1.5", letterSpacing: "0.5px" }}
				>
					{description}
				</p>

				{/* Detail link */}
				<Link
					href={detailHref}
					className="text-white hover:text-[#FFEA9E] transition-colors duration-150 text-xs md:text-base"
					style={{
						fontWeight: 500,
						lineHeight: "24px",
						letterSpacing: "0.15px",
						paddingTop: "8px",
					}}
					aria-label={`${t.detailAriaPrefix} ${award.name}`}
				>
					{t.detail}
				</Link>
			</div>
		</div>
	);
}
