"use client";

import Image from "next/image";
import type { AwardDetail } from "@/types/award";
import type { LocaleCode } from "@/libs/i18n/locale";
import { AWARDS_I18N } from "@/libs/i18n/awards";

interface AwardDetailContentProps {
	award: AwardDetail;
	locale: LocaleCode;
}

function Divider(): React.JSX.Element {
	return (
		<div
			className="w-full h-px"
			style={{ backgroundColor: "var(--color-divider)" }}
		/>
	);
}

export default function AwardDetailContent({
	award,
	locale,
}: AwardDetailContentProps): React.JSX.Element {
	const t = AWARDS_I18N[locale];
	const description = locale === "vi" ? award.descriptionVi : award.descriptionEn;
	const unitType = locale === "vi" ? award.unitTypeVi : award.unitTypeEn;

	return (
		<div
			className="flex-1 flex flex-col gap-[var(--spacing-card-section-gap)]"
			style={{
				borderRadius: "var(--radius-card-content)",
				WebkitBackdropFilter: "blur(32px)",
				backdropFilter: "blur(32px)",
			}}
		>
			{/* Title row */}
			<div className="flex items-center gap-4">
				<Image
					src="/assets/awards/icons/icon-target.svg"
					alt=""
					width={24}
					height={24}
					className="w-6 h-6 shrink-0"
				/>
				<h3
					style={{
						fontFamily: "var(--font-montserrat)",
						fontSize: "24px",
						fontWeight: 700,
						lineHeight: "32px",
						color: "var(--color-accent-yellow)",
					}}
				>
					{award.name}
				</h3>
			</div>

			{/* Description */}
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
				{description}
			</p>

			<Divider />

			{/* Quantity row */}
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-4">
					<Image
						src="/assets/awards/icons/icon-diamond.svg"
						alt=""
						width={24}
						height={24}
						className="w-6 h-6 shrink-0"
					/>
					<span
						style={{
							fontFamily: "var(--font-montserrat)",
							fontSize: "24px",
							fontWeight: 700,
							lineHeight: "32px",
							color: "var(--color-accent-yellow)",
						}}
					>
						{t.quantityLabel}
					</span>
				</div>
				<div className="flex items-baseline gap-3 pl-10">
					<span
						style={{
							fontFamily: "var(--font-montserrat)",
							fontSize: "36px",
							fontWeight: 700,
							lineHeight: "44px",
							color: "#FFFFFF",
						}}
					>
						{award.quantity}
					</span>
					{unitType && (
						<span
							style={{
								fontFamily: "var(--font-montserrat)",
								fontSize: "14px",
								fontWeight: 700,
								lineHeight: "20px",
								letterSpacing: "0.1px",
								color: "#FFFFFF",
							}}
						>
							{unitType}
						</span>
					)}
				</div>
			</div>

			<Divider />

			{/* Prize value row(s) */}
			{award.prizeValues.map((pv, index) => (
				<div key={`${pv.amount}-${pv.labelVi}-${pv.labelEn}`}> 
					<div className="flex flex-col gap-2">
						{index === 0 && (
							<div className="flex items-center gap-4">
								<Image
									src="/assets/awards/icons/icon-license.svg"
									alt=""
									width={24}
									height={24}
									className="w-6 h-6 shrink-0"
								/>
								<span
									style={{
										fontFamily: "var(--font-montserrat)",
										fontSize: "24px",
										fontWeight: 700,
										lineHeight: "32px",
										color: "var(--color-accent-yellow)",
									}}
								>
									{t.valueLabel}
								</span>
							</div>
						)}
						<div className="flex items-baseline gap-3 pl-10">
							<span
								style={{
									fontFamily: "var(--font-montserrat)",
									fontSize: "36px",
									fontWeight: 700,
									lineHeight: "44px",
									color: "#FFFFFF",
								}}
							>
								{pv.amount}
							</span>
							{(locale === "vi" ? pv.labelVi : pv.labelEn) && (
								<span
									style={{
										fontFamily: "var(--font-montserrat)",
										fontSize: "14px",
										fontWeight: 700,
										lineHeight: "20px",
										letterSpacing: "0.1px",
										color: "#FFFFFF",
									}}
								>
									{locale === "vi" ? pv.labelVi : pv.labelEn}
								</span>
							)}
						</div>
					</div>
					{index < award.prizeValues.length - 1 && (
						<div className="mt-[var(--spacing-card-section-gap)]">
							<Divider />
						</div>
					)}
				</div>
			))}
		</div>
	);
}
