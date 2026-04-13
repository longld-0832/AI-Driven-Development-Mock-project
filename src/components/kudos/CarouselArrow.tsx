interface CarouselArrowProps {
	direction: 'left' | 'right';
	disabled?: boolean;
	onClick: () => void;
	label: string;
}

export default function CarouselArrow({
	direction,
	disabled = false,
	onClick,
	label,
}: CarouselArrowProps): React.JSX.Element {
	return (
		<button
			type="button"
			aria-label={label}
			onClick={onClick}
			disabled={disabled}
			className="flex h-11 w-11 items-center justify-center rounded-full transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 md:h-12 md:w-12"
			style={{
				backgroundColor: 'rgba(255,255,255,0.1)',
				opacity: disabled ? 0.3 : 1,
				cursor: disabled ? 'not-allowed' : 'pointer',
			}}
		>
			<span
				aria-hidden="true"
				className="text-lg"
				style={{ color: 'var(--color-white)' }}
			>
				{direction === 'left' ? '←' : '→'}
			</span>
		</button>
	);
}