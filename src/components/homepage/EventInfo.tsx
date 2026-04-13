"use client";

import { useLocale } from "@/hooks/useLocale";
import { HOMEPAGE_I18N } from "@/libs/i18n/homepage";

export default function EventInfo(): React.JSX.Element {
	const locale = useLocale();
	const t = HOMEPAGE_I18N[locale].eventInfo;

	return (
		<div className="flex flex-col" style={{ gap: "8px" }}>
			{/* Row 1 — Time & Venue */}
			<div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-[60px]">
				{/* Time */}
				<div className="flex flex-row items-baseline gap-2">
					<span
						className="text-white text-sm md:text-base"
						style={{ fontWeight: 700, lineHeight: "24px", letterSpacing: "0.15px" }}
					>
						{t.timeLabel}
					</span>
					<span
						className="text-lg md:text-2xl"
						style={{ fontWeight: 700, color: "#FFEA9E" }}
					>
						{t.timeValue}
					</span>
				</div>
				{/* Venue */}
				<div className="flex flex-row items-baseline gap-2">
					<span
						className="text-white text-sm md:text-base"
						style={{ fontWeight: 700, lineHeight: "24px", letterSpacing: "0.15px" }}
					>
						{t.venueLabel}
					</span>
					<span
						className="text-lg md:text-2xl"
						style={{ fontWeight: 700, color: "#FFEA9E" }}
					>
						{t.venueValue}
					</span>
				</div>
			</div>
			{/* Row 2 — Livestream note */}
			<p
				className="text-white text-sm md:text-base"
				style={{ fontWeight: 700, lineHeight: "24px", letterSpacing: "0.15px" }}
			>
				{t.livestream}
			</p>
		</div>
	);
}
