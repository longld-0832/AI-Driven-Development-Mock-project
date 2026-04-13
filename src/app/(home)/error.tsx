"use client";

export default function HomeError({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}): React.JSX.Element {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-[#00101A] text-white gap-6">
			<p className="text-lg font-bold">Đã xảy ra lỗi. Vui lòng thử lại.</p>
			<button
				onClick={reset}
				className="px-6 py-3 rounded-lg bg-[#FFEA9E] text-[#00101A] font-bold text-base cursor-pointer"
			>
				Thử lại
			</button>
		</div>
	);
}
