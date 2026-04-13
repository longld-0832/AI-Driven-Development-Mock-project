"use client";

import Image from "next/image";

export default function KudosWidget(): React.JSX.Element {
	function handleClick(): void {
		// TODO: open quick-action menu (options TBD)
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-label="Mở Kudos nhanh"
			className="flex flex-row items-center justify-center"
			style={{
				position: "fixed",
				right: "19px",
				bottom: "30px",
				zIndex: 30,
				width: "106px",
				height: "64px",
				backgroundColor: "#FFEA9E",
				borderRadius: "100px",
				boxShadow: "0 4px 4px rgba(0,0,0,0.25), 0 0 6px #FAE287",
				padding: "16px",
				gap: "8px",
				border: "none",
				cursor: "pointer",
			}}
		>
			<Image
				src="/assets/homepage/icon-widget-pencil.svg"
				alt=""
				width={24}
				height={24}
				className="w-6 h-6"
			/>
			<span style={{ color: "#00101A", fontWeight: 700, fontSize: "16px" }}>/</span>
			<Image
				src="/assets/homepage/icon-widget-saa.svg"
				alt=""
				width={24}
				height={24}
				className="w-6 h-6"
			/>
		</button>
	);
}
