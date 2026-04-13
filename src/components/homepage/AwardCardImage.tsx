"use client";

import Image from "next/image";
import { useState } from "react";

interface AwardCardImageProps {
	src: string;
	alt: string;
}

export default function AwardCardImage({ src, alt }: AwardCardImageProps): React.JSX.Element {
	const [hasError, setHasError] = useState(false);

	if (hasError) {
		return (
			<div
				className="w-full aspect-square flex items-center justify-center"
				style={{ border: "0.955px solid #FFEA9E" }}
				aria-label={alt}
			/>
		);
	}

	return (
		<Image
			src={src}
			alt={alt}
			width={336}
			height={336}
			loading="lazy"
			className="w-full aspect-square object-cover"
			style={{ border: "0.955px solid #FFEA9E" }}
			onError={() => setHasError(true)}
		/>
	);
}
