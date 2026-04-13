"use client";

import CTAButton from "./CTAButton";

export default function HeroCTA(): React.JSX.Element {
	return (
		<div
			className="flex flex-row flex-wrap gap-3 md:gap-[40px]"
		>
			<CTAButton href="/awards" label="ABOUT AWARDS" highlighted />
			<CTAButton href="#sun-kudos" label="ABOUT KUDOS" scrollTo="sun-kudos" />
		</div>
	);
}
