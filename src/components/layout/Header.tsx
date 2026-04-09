import Image from "next/image";
import LanguageToggle from "@/components/auth/LanguageToggle";

export default function Header(): React.JSX.Element {
	return (
		<header
			className="absolute top-0 w-full z-20 h-20 flex items-center justify-between py-3 px-4 md:px-10 xl:px-36"
			style={{ backgroundColor: "rgba(11, 15, 18, 0.8)" }}
		>
			{/* A.1_Logo — SAA 2025 */}
			<Image
				src="/assets/common/logos/saa-logo.png"
				alt="SAA 2025"
				width={52}
				height={56}
				className="w-10 h-10 md:w-[52px] md:h-14 object-contain"
				priority
			/>

			{/* A.2_Language — Language toggle (client island) */}
			<LanguageToggle />
		</header>
	);
}
