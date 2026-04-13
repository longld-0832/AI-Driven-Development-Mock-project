'use client';

import { useEffect, useRef, useState } from 'react';

interface FilterDropdownProps {
	label: string;
	options: string[];
	selectedValue: string;
	onChange: (value: string) => void;
}

export default function FilterDropdown({
	label,
	options,
	selectedValue,
	onChange,
}: FilterDropdownProps): React.JSX.Element {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handlePointerDown(event: MouseEvent): void {
			if (!containerRef.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handlePointerDown);
		return () => {
			document.removeEventListener('mousedown', handlePointerDown);
		};
	}, []);

	return (
		<div ref={containerRef} className="relative min-w-[140px]">
			<button
				type="button"
				onClick={() => setIsOpen((value) => !value)}
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				className="flex min-h-11 w-full items-center justify-between rounded-lg px-4 py-2 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
				style={{
					border: '1px solid var(--color-border-btn)',
					backgroundColor: isOpen
						? 'rgba(255,234,158,0.1)'
						: 'transparent',
					color: 'var(--color-white)',
					fontFamily: 'var(--font-montserrat)',
					fontSize: '14px',
					fontWeight: 600,
					lineHeight: '20px',
				}}
			>
				<span className="truncate">{selectedValue || label}</span>
				<span aria-hidden="true">▾</span>
			</button>
			{isOpen && (
				<ul
					role="listbox"
					aria-label={label}
					className="absolute right-0 z-20 mt-2 max-h-64 w-full overflow-auto rounded-xl p-2"
					style={{
						backgroundColor: 'rgba(16,20,23,0.98)',
						border: '1px solid var(--color-border-btn)',
					}}
				>
					{options.map((option) => {
						const isSelected = option === selectedValue;
						return (
							<li key={option}>
								<button
									type="button"
									onClick={() => {
										onChange(option);
										setIsOpen(false);
									}}
									className="flex min-h-11 w-full items-center rounded-lg px-3 py-2 text-left focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
									style={{
										backgroundColor: isSelected
											? 'rgba(255,234,158,0.1)'
											: 'transparent',
										color: isSelected
											? 'var(--color-accent-yellow)'
											: 'var(--color-white)',
										fontFamily: 'var(--font-montserrat)',
										fontSize: '14px',
										fontWeight: 500,
									}}
								>
									{option}
								</button>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}