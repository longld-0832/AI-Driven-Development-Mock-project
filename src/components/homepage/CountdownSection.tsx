import CountdownTimer from "./CountdownTimer";
import EventInfo from "./EventInfo";

export default function CountdownSection(): React.JSX.Element {
	return (
		<div className="flex flex-col" style={{ gap: "16px" }}>
			<CountdownTimer />
			{/* Separator */}
			<hr
				className="border-0"
				style={{ borderTop: "1px solid #998C5F", width: "100%" }}
			/>
			<EventInfo />
		</div>
	);
}
