interface SectionHeadingProps {
	children: string;
}

export default function SectionHeading({
	children,
}: SectionHeadingProps): React.JSX.Element {
	return (
		<h2
			className="text-[32px] leading-[38px] md:text-[48px] md:leading-[54px] xl:text-[57px] xl:leading-[64px]"
			style={{
				fontFamily: 'var(--font-montserrat)',
				fontWeight: 700,
				letterSpacing: '-0.25px',
				color: 'var(--color-accent-yellow)',
			}}
		>
			{children}
		</h2>
	);
}