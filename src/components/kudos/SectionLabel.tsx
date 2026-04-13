interface SectionLabelProps {
	children: string;
}

export default function SectionLabel({
	children,
}: SectionLabelProps): React.JSX.Element {
	return (
		<p
			className="text-sm md:text-base"
			style={{
				fontFamily: 'var(--font-montserrat)',
				fontWeight: 700,
				lineHeight: '24px',
				letterSpacing: '0.15px',
				color: 'var(--color-white)',
			}}
		>
			{children}
		</p>
	);
}