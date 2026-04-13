"use client";

import Image from "next/image";
import { useLocale } from "@/hooks/useLocale";
import { HOMEPAGE_I18N } from "@/libs/i18n/homepage";

export default function ThemeNarrative(): React.JSX.Element {
	const locale = useLocale();
	const t = HOMEPAGE_I18N[locale].themeNarrative;

	return (
		<section
			className="w-full flex flex-col px-4 py-10 md:px-[104px] md:py-[120px]"
			style={{
				background: "#00101A",
				gap: "24px",
			}}
		>
			{/* ROOT FURTHER combined logo */}
			<div className="flex justify-center">
				<Image
					src="/assets/homepage/root-further-logo.png"
					alt="ROOT FURTHER"
					width={451}
					height={200}
					className="max-w-full h-auto"
					loading="lazy"
				/>
			</div>

			{/* Theme narrative text */}
			<div className="flex flex-col gap-4 md:gap-6">
				<p
					className="text-white text-sm md:text-2xl"
					style={{ fontWeight: 700, lineHeight: "1.5" }}
				>
					{t.para1}
				</p>
				<p
					className="text-white text-sm md:text-2xl"
					style={{ fontWeight: 700, lineHeight: "1.5" }}
				>
					{t.para2}
				</p>
				<p
					className="text-white text-sm md:text-2xl"
					style={{ fontWeight: 700, lineHeight: "1.5" }}
				>
					{t.para3}
				</p>

				{/* Quote block */}
				<div className="flex flex-col items-center text-center" style={{ gap: "8px", padding: "16px 0" }}>
					<p
						className="text-white text-sm md:text-2xl"
						style={{ fontWeight: 700, lineHeight: "1.5", fontStyle: "italic" }}
					>
						{t.quote}
					</p>
					<p
						className="text-white text-xs md:text-xl"
						style={{ fontWeight: 700, lineHeight: "1.5" }}
					>
						{t.quoteVi}
					</p>
				</div>

				<p
					className="text-white text-sm md:text-2xl"
					style={{ fontWeight: 700, lineHeight: "1.5" }}
				>
					{t.para4}
				</p>
				<p
					className="text-white text-sm md:text-2xl"
					style={{ fontWeight: 700, lineHeight: "1.5" }}
				>
					{t.para5}
				</p>
			</div>
		</section>
	);
}
