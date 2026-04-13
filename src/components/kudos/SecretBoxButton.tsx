import Link from 'next/link';

interface SecretBoxButtonProps {
	href: string;
	label: string;
}

export default function SecretBoxButton({
	href,
	label,
}: SecretBoxButtonProps): React.JSX.Element {
	return (
		<Link
			href={href}
			className="inline-flex min-h-12 w-full items-center justify-center rounded-lg px-4 py-3 text-center text-base font-bold transition-all duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
			style={{
				backgroundColor: 'var(--color-btn-secret-box)',
				color: 'var(--color-btn-secret-box-text)',
			}}
		>
			{label} 🎁
		</Link>
	);
}