'use client';

import Image from 'next/image';
import { useEffect } from 'react';

interface ImageLightboxProps {
	images: string[];
	activeIndex: number;
	onClose: () => void;
	onPrev: () => void;
	onNext: () => void;
}

export default function ImageLightbox({
	images,
	activeIndex,
	onClose,
	onPrev,
	onNext,
}: ImageLightboxProps): React.JSX.Element | null {
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent): void {
			if (event.key === 'Escape') {
				onClose();
			}
			if (event.key === 'ArrowLeft') {
				onPrev();
			}
			if (event.key === 'ArrowRight') {
				onNext();
			}
		}

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose, onNext, onPrev]);

	if (!images.length) {
		return null;
	}

	const imageSrc = images[activeIndex] ?? images[0];

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-6"
			role="dialog"
			aria-modal="true"
		>
			<button
				type="button"
				onClick={onClose}
				aria-label="Close image viewer"
				className="absolute right-4 top-4 h-11 w-11 rounded-full text-white focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
			>
				✕
			</button>
			<button
				type="button"
				onClick={onPrev}
				aria-label="Previous image"
				className="absolute left-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full text-white focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 md:left-6"
			>
				←
			</button>
			<div className="relative h-[60vh] w-full max-w-4xl overflow-hidden rounded-2xl">
				<Image src={imageSrc} alt="Kudos gallery image" fill className="object-contain" />
			</div>
			<button
				type="button"
				onClick={onNext}
				aria-label="Next image"
				className="absolute right-3 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full text-white focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 md:right-6"
			>
				→
			</button>
		</div>
	);
}