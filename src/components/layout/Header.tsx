import Image from "next/image";
import Link from "next/link";
import LanguageToggle from "@/components/auth/LanguageToggle";
import NavLinks from "@/components/layout/NavLinks";

interface HeaderProps {
	/** "overlay" — absolute top-0, transparent bg (used on login).
	 *  "sticky" (default) — sticky top-0, semi-transparent bg (used on homepage). */
	variant?: "sticky" | "overlay";
}

export default function Header({ variant = "sticky" }: HeaderProps): React.JSX.Element {
	const isOverlay = variant === "overlay";

	return (
		<header
			className={`${isOverlay ? "absolute" : "sticky"} top-0 w-full z-20 h-20 flex items-center justify-between py-3 px-4 md:px-10 xl:px-36`}
			style={isOverlay ? {} : { backgroundColor: "rgba(16, 20, 23, 0.8)", backdropFilter: "blur(4px)" }}
		>
			{/* Left: Logo + Nav */}
			<div className="flex flex-row items-center gap-6">
				{/* A.1_Logo — SAA 2025 */}
				<Link href="/" aria-label="SAA 2025 — home">
					<Image
						src="/assets/homepage/saa-logo.png"
						alt="SAA 2025"
						width={52}
						height={48}
						className="w-10 h-10 md:w-[52px] md:h-12 object-contain"
						priority
					/>
				</Link>

				{/* Nav links (hidden on mobile) */}
				{!isOverlay && (
					<div className="hidden md:flex">
						<NavLinks />
					</div>
				)}
			</div>

			{/* Right: Notification + Language + User button */}
			<div className="flex flex-row items-center gap-3">
				{/* Notification bell (homepage only) */}
				{!isOverlay && (
					<button
						aria-label="Thông báo"
						className="w-10 h-10 flex items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
						type="button"
					>
						<Image
							src="/assets/homepage/icon-notification.svg"
							alt=""
							width={24}
							height={24}
							className="w-6 h-6"
						/>
					</button>
				)}

				{/* Language toggle */}
				<LanguageToggle />

				{/* User button (homepage only) */}
				{!isOverlay && (
					<button
						aria-label="Tài khoản người dùng"
						className="w-10 h-10 flex items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
						style={{ border: "1px solid #998C5F", borderRadius: "4px" }}
						type="button"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<circle cx="12" cy="8" r="4" stroke="#FFEA9E" strokeWidth="1.5" />
							<path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#FFEA9E" strokeWidth="1.5" strokeLinecap="round" />
						</svg>
					</button>
				)}
			</div>
		</header>
	);
}


