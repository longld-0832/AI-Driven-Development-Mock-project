"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/hooks/useLocale";
import { HOMEPAGE_I18N } from "@/libs/i18n/homepage";

export default function SunKudosBlock(): React.JSX.Element {
	const locale = useLocale();
	const t = HOMEPAGE_I18N[locale].sunKudos;

	return (
		<section id="sun-kudos" className="w-full" aria-label="Sun* Kudos">
			<div className="flex flex-col gap-6 md:gap-8">
				{/* Header */}
				<div className="flex flex-col" style={{ gap: "16px" }}>
					<p
						className="text-white text-sm md:text-2xl"
						style={{ fontWeight: 700 }}
					>
						{t.caption}
					</p>

					<h2
						className="text-2xl md:text-[57px] md:leading-[64px]"
						style={{
							fontWeight: 700,
							letterSpacing: "-0.25px",
							color: "#FFEA9E",
						}}
					>
						Sun* Kudos
					</h2>
				</div>

				{/* Banner with background image */}
				<div
					className="relative overflow-hidden rounded-2xl"
					style={{
						background: "#0F0F0F",
						height: "200px",
					}}
				>
					<Image
						src="/assets/homepage/kudos-bg.png"
						alt=""
						fill
						className="object-cover"
						loading="lazy"
					/>
					{/* Kudos wordmark logo */}
					<div className="relative z-10 flex items-center justify-end h-full p-6 md:p-16">
						<Image
							src="/assets/homepage/kudos-logo.svg"
							alt="KUDOS"
							width={310}
							height={96}
							className="w-auto h-auto max-w-[160px] md:max-w-[310px]"
							loading="lazy"
						/>
					</div>
				</div>

				{/* Description */}
				<p
					className="text-white text-sm md:text-base"
					style={{
						fontWeight: 700,
						lineHeight: "1.5",
						letterSpacing: "0.5px",
					}}
				>
					{t.description}
				</p>

				{/* Detail button */}
				<Link
					href="/kudos"
					className="inline-flex items-center justify-center transition-opacity duration-150 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 self-start"
					style={{
						width: "127px",
						height: "48px",
						background: "transparent",
						border: "1px solid #998C5F",
						borderRadius: "4px",
						fontSize: "16px",
						fontWeight: 700,
						lineHeight: "28px",
						color: "#FFFFFF",
					}}
				>
					{t.detailButton} &nbsp;↗
				</Link>
			</div>
		</section>
	);
}
