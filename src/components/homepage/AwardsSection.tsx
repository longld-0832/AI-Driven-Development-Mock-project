"use client";

import { useLocale } from "@/hooks/useLocale";
import { HOMEPAGE_I18N } from "@/libs/i18n/homepage";
import { AWARDS } from "@/data/awards";
import AwardsGrid from "./AwardsGrid";

export default function AwardsSection(): React.JSX.Element {
	const locale = useLocale();
	const t = HOMEPAGE_I18N[locale].awardsSection;

	return (
		<section
			className="w-full flex flex-col gap-6 md:gap-[40px]"
		>
			{/* C1_Header */}
			<div className="flex flex-col" style={{ gap: "16px" }}>
				{/* Caption */}
				<p
					className="text-white text-sm md:text-2xl"
					style={{ fontWeight: 700 }}
				>
					{t.caption}
				</p>

				{/* Divider */}
				<hr className="border-0" style={{ borderTop: "1px solid #2E3940", margin: 0 }} />

				{/* Title row */}
				<div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-2 md:gap-[32px]">
					<h2
						className="text-2xl md:text-[57px] md:leading-[64px]"
						style={{
							fontWeight: 700,
							letterSpacing: "-0.25px",
							color: "#FFEA9E",
						}}
					>
						{t.title}
					</h2>
					<p
						className="text-white text-sm md:text-base"
						style={{ fontWeight: 400, lineHeight: "24px", maxWidth: "500px" }}
					>
						{t.subtitle}
					</p>
				</div>
			</div>

			{/* Award grid */}
			<AwardsGrid awards={AWARDS} />
		</section>
	);
}
