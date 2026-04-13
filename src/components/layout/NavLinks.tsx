"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
	label: string;
	href: string;
}

const NAV_ITEMS: NavItem[] = [
	{ label: "About SAA 2025", href: "/" },
	{ label: "Awards Information", href: "/awards" },
	{ label: "Sun* Kudos", href: "/kudos" },
];

export default function NavLinks(): React.JSX.Element {
	const pathname = usePathname();

	return (
		<nav aria-label="Main navigation" className="flex flex-row items-center gap-1">
			{NAV_ITEMS.map(({ label, href }) => {
				const isActive = pathname === href;
				return (
					<Link
						key={href}
						href={href}
						aria-current={isActive ? "page" : undefined}
						className="px-3 py-2 rounded transition-colors duration-150 ease-in-out
							focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
						style={{
							fontSize: "14px",
							fontWeight: 700,
							lineHeight: "20px",
							letterSpacing: "0.1px",
							color: isActive ? "#FFEA9E" : "#FFFFFF",
							borderBottom: isActive ? "1px solid #FFEA9E" : "none",
							borderRadius: isActive ? "0" : "4px",
						}}
						onMouseEnter={(e) => {
							if (!isActive) {
								(e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
							}
						}}
						onMouseLeave={(e) => {
							(e.currentTarget as HTMLAnchorElement).style.background = "transparent";
						}}
					>
						{label}
					</Link>
				);
			})}
		</nav>
	);
}
