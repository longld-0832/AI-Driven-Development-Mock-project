"use client";

import Image from "next/image";
import { useLocale } from "@/hooks/useLocale";
import { AWARDS_I18N } from "@/libs/i18n/awards";

export default function AwardsTitleSection(): React.JSX.Element {
	const locale = useLocale();
	const t = AWARDS_I18N[locale];

	return (
		<section className="flex flex-col gap-[var(--spacing-title-gap)] items-center w-full max-w-[1152px] mx-auto px-4 xl:px-0">
			<Image
				src="/assets/homepage/root-further-logo.png"
				alt="ROOT FURTHER"
				width={338}
				height={150}
				className="w-[200px] md:w-[338px] h-auto object-contain"
			/>
			<div className="flex flex-col gap-[var(--spacing-title-gap)] items-center w-full mt-[var(--spacing-section-gap)]">
				<p
					className="text-center text-white"
					style={{
						fontFamily: "var(--font-montserrat)",
						fontSize: "24px",
						fontWeight: 700,
						lineHeight: "32px",
					}}
				>
					{t.subHeading}
				</p>
				<div
					className="w-full h-px"
					style={{ backgroundColor: "var(--color-divider)" }}
				/>
				<h2
					className="text-center md:text-left text-[32px] leading-[40px] xl:text-[57px] xl:leading-[64px]"
					style={{
						fontFamily: "var(--font-montserrat)",
						fontWeight: 700,
						color: "var(--color-accent-yellow)",
						letterSpacing: "-0.25px",
					}}
				>
					{t.mainHeading}
				</h2>
			</div>
		</section>
	);
}
