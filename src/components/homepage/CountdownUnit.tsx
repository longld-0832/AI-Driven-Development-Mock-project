import DigitBox from "./DigitBox";

interface CountdownUnitProps {
	value: number;
	label: string;
}

export default function CountdownUnit({ value, label }: CountdownUnitProps): React.JSX.Element {
	const padded = value >= 0 ? String(value).padStart(2, "0") : "--";
	const tens = padded[0] ?? "-";
	const ones = padded[1] ?? "-";

	return (
		<div
			className="flex flex-col items-center"
			style={{ gap: "8px", minWidth: "84px" }}
		>
			{/* Digit row */}
			<div className="flex flex-row" style={{ gap: "8px" }}>
				<DigitBox digit={tens} />
				<DigitBox digit={ones} />
			</div>
			{/* Label */}
			<span
				className="text-white text-center uppercase text-sm md:text-2xl"
				style={{ fontWeight: 700 }}
			>
				{label}
			</span>
		</div>
	);
}
