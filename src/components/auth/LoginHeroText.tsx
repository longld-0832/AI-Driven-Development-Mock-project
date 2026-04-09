"use client";

import { useLocale } from "@/hooks/useLocale";

const HERO_TRANSLATIONS = {
	vi: {
		line1: "Bắt đầu hành trình của bạn cùng SAA 2025.",
		line2: "Đăng nhập để khám phá!",
	},
	en: {
		line1: "Start your journey with SAA 2025.",
		line2: "Log in to explore!",
	},
} as const;

export default function LoginHeroText(): React.JSX.Element {
	const locale = useLocale("vi");
	const t = HERO_TRANSLATIONS[locale] ?? HERO_TRANSLATIONS.vi;

	return (
		<p
			className="text-base leading-7 md:text-[20px] md:leading-[40px] font-bold max-w-[480px]"
			style={{
				color: "var(--color-white)",
				fontFamily: "var(--font-montserrat)",
				letterSpacing: "0.5px",
			}}
		>
			{t.line1}
			<br />
			{t.line2}
		</p>
	);
}
