import Image from "next/image";

interface AwardSystemHeroProps {
	imageSrc?: string;
}

export default function AwardSystemHero({
	imageSrc = "/assets/awards/keyvisual-bg.png",
}: AwardSystemHeroProps): React.JSX.Element {
	return (
		<div className="relative w-full h-[300px] md:h-[547px] overflow-hidden">
			<Image
				src={imageSrc}
				alt="Keyvisual Sun* Annual Award 2025"
				fill
				className="object-cover object-center"
				priority
				style={{ zIndex: 0 }}
			/>
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0.00) 52.79%)",
					zIndex: 1,
				}}
			/>
		</div>
	);
}
