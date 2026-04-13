import Image from "next/image";

interface AwardDetailImageProps {
	src: string;
	alt: string;
	priority?: boolean;
}

export default function AwardDetailImage({
	src,
	alt,
	priority = false,
}: AwardDetailImageProps): React.JSX.Element {
	return (
		<div
			className="shrink-0 w-full max-w-[336px] mx-auto xl:mx-0 xl:w-[336px] aspect-square overflow-hidden"
			style={{
				borderRadius: "var(--radius-award-image)",
				border: "1px solid var(--color-accent-yellow)",
				boxShadow: "var(--shadow-widget)",
				mixBlendMode: "screen",
			}}
		>
			<Image
				src={src}
				alt={alt}
				width={336}
				height={336}
				sizes="336px"
				priority={priority}
				className="w-full h-full object-contain"
			/>
		</div>
	);
}
