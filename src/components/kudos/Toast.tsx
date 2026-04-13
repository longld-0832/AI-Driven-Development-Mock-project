'use client';

import { useEffect } from 'react';

interface ToastProps {
	message: string;
	onClose: () => void;
}

export default function Toast({
	message,
	onClose,
}: ToastProps): React.JSX.Element {
	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			onClose();
		}, 2500);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [message, onClose]);

	return (
		<div
			className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-32px)] max-w-md -translate-x-1/2 rounded-xl px-4 py-3 shadow-lg"
			style={{
				backgroundColor: 'rgba(16,20,23,0.92)',
				color: 'var(--color-white)',
				border: '1px solid var(--color-border-btn)',
			}}
			role="status"
			aria-live="polite"
		>
			<p
				style={{
					fontFamily: 'var(--font-montserrat)',
					fontSize: '14px',
					fontWeight: 600,
					lineHeight: '20px',
				}}
			>
				{message}
			</p>
		</div>
	);
}