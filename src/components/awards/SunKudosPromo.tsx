"use client";

import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { AWARDS_I18N } from "@/libs/i18n/awards";

export default function SunKudosPromo(): React.JSX.Element {
	const locale = useLocale();
	const t = AWARDS_I18N[locale].kudos;

	return (
		<section className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
			{/* Content left */}
			<div className="flex-1 flex flex-col gap-6">
				<p
					className="text-white"
					style={{
						fontFamily: "var(--font-montserrat)",
						fontSize: "16px",
						fontWeight: 700,
						lineHeight: "24px",
					}}
				>
					{t.caption}
				</p>
				<h2
					style={{
						fontFamily: "var(--font-montserrat)",
						fontSize: "57px",
						fontWeight: 700,
						lineHeight: "64px",
						color: "var(--color-accent-yellow)",
						letterSpacing: "-0.25px",
					}}
				>
					{t.title}
				</h2>
				<p
					style={{
						fontFamily: "var(--font-montserrat)",
						fontSize: "14px",
						fontWeight: 700,
						lineHeight: "20px",
						color: "var(--color-accent-yellow)",
						letterSpacing: "0.1px",
					}}
				>
					{t.subLabel}
				</p>
				<p
					style={{
						fontFamily: "var(--font-montserrat)",
						fontSize: "16px",
						fontWeight: 700,
						lineHeight: "24px",
						letterSpacing: "0.5px",
						color: "#FFFFFF",
						textAlign: "justify",
					}}
				>
					{t.description}
				</p>
				<Link
					href="/kudos"
					className="inline-flex items-center gap-2 transition-all duration-150 ease-in-out hover:opacity-80 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
					style={{
						fontFamily: "var(--font-montserrat)",
						fontSize: "16px",
						fontWeight: 500,
						lineHeight: "24px",
						letterSpacing: "0.15px",
						color: "var(--color-accent-yellow)",
						minHeight: "44px",
						display: "inline-flex",
						alignItems: "center",
					}}
				>
					{t.detailButton}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M5 12H19M19 12L12 5M19 12L12 19"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</Link>
			</div>

			{/* Illustration right — placeholder until asset is available */}
			<div className="w-full md:w-[400px] shrink-0 flex items-center justify-center">
				<div
					className="w-full h-[300px] rounded-2xl flex items-center justify-center"
					style={{
						background: "rgba(255, 234, 158, 0.05)",
						border: "1px solid var(--color-divider)",
					}}
				>
					<span
						className="text-2xl font-bold"
						style={{ color: "var(--color-accent-yellow)", opacity: 0.3 }}
					>
						KUDOS
					</span>
				</div>
			</div>
		</section>
	);
}
