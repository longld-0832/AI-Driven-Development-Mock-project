"use client";

import Image from "next/image";

interface CategoryNavItemProps {
	isActive: boolean;
	slug: string;
	label: string;
	onClick: (slug: string) => void;
}

export default function CategoryNavItem({
	isActive,
	slug,
	label,
	onClick,
}: CategoryNavItemProps): React.JSX.Element {
	return (
		<button
			type="button"
			aria-current={isActive ? "true" : undefined}
			onClick={() => onClick(slug)}
			className="flex items-center gap-1 px-[var(--spacing-nav-item-padding)] py-[var(--spacing-nav-item-padding)] rounded transition-all duration-200 ease-in-out cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
			style={{
				fontFamily: "var(--font-montserrat)",
				fontSize: "14px",
				fontWeight: 700,
				lineHeight: "20px",
				letterSpacing: "0.25px",
				color: isActive ? "var(--color-accent-yellow)" : "#FFFFFF",
				borderBottom: isActive ? "1px solid var(--color-accent-yellow)" : "1px solid transparent",
				textShadow: isActive
					? "0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287"
					: "none",
				borderRadius: isActive ? "0" : "4px",
				backgroundColor: "transparent",
			}}
			onMouseEnter={(e) => {
				if (!isActive) {
					(e.currentTarget as HTMLButtonElement).style.backgroundColor =
						"rgba(255,255,255,0.08)";
				}
			}}
			onMouseLeave={(e) => {
				(e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
			}}
		>
			<Image
				src="/assets/awards/icons/icon-target.svg"
				alt=""
				width={24}
				height={24}
				className="w-6 h-6 shrink-0"
			/>
			<span>{label}</span>
		</button>
	);
}
