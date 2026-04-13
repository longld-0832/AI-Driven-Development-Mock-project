import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CountdownSection from "@/components/homepage/CountdownSection";
import HeroCTA from "@/components/homepage/HeroCTA";
import ThemeNarrative from "@/components/homepage/ThemeNarrative";
import AwardsSection from "@/components/homepage/AwardsSection";
import SunKudosBlock from "@/components/homepage/SunKudosBlock";
import KudosWidget from "@/components/homepage/KudosWidget";

export default async function HomePage(): Promise<React.JSX.Element> {
	return (
		<div
			className="min-h-screen flex flex-col"
			style={{ backgroundColor: "#00101A" }}
		>
			{/* Sticky header */}
			<Header />

			{/* Hero zone — full-bleed keyvisual with gradient overlay */}
			<div className="relative w-full overflow-hidden min-h-[500px] md:min-h-[700px]">
				{/* Keyvisual background */}
				<Image
					src="/assets/homepage/keyvisual-bg.png"
					alt=""
					fill
					className="object-cover object-center"
					priority
					style={{ zIndex: 0 }}
				/>

				{/* Gradient overlay */}
				<div
					className="absolute inset-0"
					style={{
						background:
							"linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, rgba(0,19,32,0.00) 48.92%)",
						zIndex: 1,
					}}
				/>

				{/* Hero content */}
				<div
					className="relative w-full max-w-[1224px] mx-auto px-4 md:px-10 xl:px-0 flex flex-col justify-end pb-8 md:pb-16 xl:pb-24 min-h-[500px] md:min-h-[700px]"
					style={{ zIndex: 2, paddingTop: "80px", gap: "24px" }}
				>
					{/* ROOT FURTHER hero logo */}
					<Image
						src="/assets/homepage/root-further-logo.png"
						alt="ROOT FURTHER"
						width={451}
						height={200}
						className="w-[200px] md:w-[451px] h-auto object-contain"
						priority
					/>

					{/* Countdown + Event Info */}
					<CountdownSection />

					{/* CTA buttons */}
					<HeroCTA />
				</div>
			</div>

			{/* Theme narrative — full bleed */}
			<ThemeNarrative />

			{/* Awards + Kudos sections */}
			<div
				className="w-full max-w-[1224px] mx-auto px-4 md:px-10 xl:px-0 flex flex-col gap-16 md:gap-[120px] pt-10 pb-10 md:pt-[120px] md:pb-[120px]"
			>
				<AwardsSection />
				<SunKudosBlock />
			</div>

			{/* Footer */}
			<Footer />

			{/* Floating Kudos write widget */}
			<KudosWidget />
		</div>
	);
}

