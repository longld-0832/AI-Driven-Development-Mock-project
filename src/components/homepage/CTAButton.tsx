import Link from "next/link";

interface CTAButtonProps {
	href: string;
	label: string;
	highlighted?: boolean;
	scrollTo?: string;
}

export default function CTAButton({ href, label, highlighted, scrollTo }: CTAButtonProps): React.JSX.Element {
	const baseClass = `inline-flex items-center justify-center gap-2 px-4 md:px-6 h-[48px] md:h-[60px] rounded-lg transition-all duration-150 ease-in-out
		focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2
		text-sm md:text-[22px]`;

	const variantClass = highlighted
		? `${baseClass} border border-transparent bg-[#FFEA9E] text-[#00101A] hover:opacity-90`
		: `${baseClass} border border-[#998C5F] bg-[rgba(255,234,158,0.1)] text-white hover:bg-[#FFEA9E] hover:border-transparent hover:text-[#00101A]`;

	const handleClick = scrollTo
		? (e: React.MouseEvent<HTMLAnchorElement>) => {
				e.preventDefault();
				document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
			}
		: undefined;

	return (
		<Link
			href={href}
			className={variantClass}
			style={{
				fontWeight: 700,
				lineHeight: "28px",
				fontFamily: "var(--font-montserrat-var, Montserrat, sans-serif)",
			}}
			onClick={handleClick}
		>
			{label}
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true">
				<path d="M5.833 14.167L14.167 5.833M14.167 5.833H7.5M14.167 5.833V12.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
		</Link>
	);
}
