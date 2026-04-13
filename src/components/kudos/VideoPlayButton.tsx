interface VideoPlayButtonProps {
	label: string;
	onClick: () => void;
}

export default function VideoPlayButton({
	label,
	onClick,
}: VideoPlayButtonProps): React.JSX.Element {
	return (
		<button
			type="button"
			aria-label={label}
			onClick={onClick}
			className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
			style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: 'var(--color-white)' }}
		>
			<span aria-hidden="true" className="ml-0.5 text-sm">▶</span>
		</button>
	);
}