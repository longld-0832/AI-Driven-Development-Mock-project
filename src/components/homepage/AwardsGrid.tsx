import type { Award } from "@/data/awards";
import AwardCard from "./AwardCard";

interface AwardsGridProps {
	awards: Award[];
}

export default function AwardsGrid({ awards }: AwardsGridProps): React.JSX.Element {
	return (
		<>
			{/* Mobile: horizontal scroll */}
			<div className="md:hidden overflow-x-auto -mx-4 px-4 scrollbar-hide">
				<div className="flex flex-row gap-4" style={{ width: "max-content" }}>
					{awards.map((award) => (
						<div key={award.slug} className="w-[160px] shrink-0">
							<AwardCard award={award} />
						</div>
					))}
				</div>
			</div>

			{/* Desktop: grid layout */}
			<div className="hidden md:flex flex-col" style={{ gap: "80px" }}>
				{/* Row 1 */}
				<div className="grid grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-[108px]">
					{awards.slice(0, 3).map((award) => (
						<AwardCard key={award.slug} award={award} />
					))}
				</div>
				{/* Row 2 */}
				<div className="grid grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-[108px]">
					{awards.slice(3, 6).map((award) => (
						<AwardCard key={award.slug} award={award} />
					))}
				</div>
			</div>
		</>
	);
}
