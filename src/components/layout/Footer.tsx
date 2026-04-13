"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/hooks/useLocale";
import { HOMEPAGE_I18N } from "@/libs/i18n/homepage";

export default function Footer(): React.JSX.Element {
	const locale = useLocale();
	const t = HOMEPAGE_I18N[locale].footer;
	const pathname = usePathname();

	const FOOTER_NAV: { label: string; href: string }[] = [
		{ label: "About SAA 2025", href: "/" },
		{ label: "Awards Information", href: "/awards" },
		{ label: "Sun* Kudos", href: "/kudos" },
		{ label: t.criteria, href: "/criteria" },
	];

	return (
		<footer
			className="w-full flex flex-col gap-4 md:gap-6 px-4 py-6 md:px-[90px] md:py-10"
			style={{ borderTop: "1px solid #2E3940" }}
		>
			{/* Top row: Logo + Nav links */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
				{/* Logo */}
				<Link href="/" aria-label="SAA 2025 — home">
					<Image
						src="/assets/homepage/footer-logo.png"
						alt="SAA 2025"
						width={69}
						height={64}
						className="w-[56px] h-[52px] md:w-[69px] md:h-16 object-contain"
					/>
				</Link>

				{/* Nav links */}
				<nav aria-label="Footer navigation" className="flex flex-row flex-wrap gap-3 md:gap-6">
					{FOOTER_NAV.map(({ label, href }) => {
						const isActive = pathname === href;
						return (
							<Link
								key={href}
								href={href}
								aria-current={isActive ? "page" : undefined}
								className="hover:text-[#FFEA9E] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 text-xs md:text-base"
								style={{ fontWeight: 700, lineHeight: "24px", color: isActive ? "#FFEA9E" : "#FFFFFF" }}
							>
								{label}
							</Link>
						);
					})}
				</nav>
			</div>

			{/* Copyright */}
			<p
				className="text-white text-xs md:text-base"
				style={{
					fontFamily: "var(--font-montserrat-alt-var, 'Montserrat Alternates', sans-serif)",
					fontWeight: 700,
					lineHeight: "24px",
				}}
			>
				{t.copyright}
			</p>
		</footer>
	);
}

