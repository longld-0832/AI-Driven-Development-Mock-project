interface DigitBoxProps {
	digit: string;
}

export default function DigitBox({ digit }: DigitBoxProps): React.JSX.Element {
	return (
		<div
			className="flex items-center justify-center w-[36px] h-[58px] md:w-[51px] md:h-[82px]"
			style={{
				background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.10) 100%)",
				border: "0.5px solid #FFEA9E",
				borderRadius: "0px",
			}}
		>
			<span
				className="text-[34px] md:text-[49.15px]"
				style={{
					fontFamily: '"Digital Numbers", monospace',
					fontWeight: 400,
					color: "#FFFFFF",
					lineHeight: 1,
				}}
			>
				{digit}
			</span>
		</div>
	);
}
