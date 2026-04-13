import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AwardSystemHero from "@/components/awards/AwardSystemHero";
import AwardsPageContent from "@/components/awards/AwardsPageContent";
import { getAwardDetails } from "@/services/award-service";

export const metadata: Metadata = {
	title: "Hệ thống giải thưởng | SAA 2025",
	description:
		"Tổng quan hệ thống giải thưởng Sun* Annual Awards 2025 — 6 hạng mục giải thưởng vinh danh cá nhân và tập thể xuất sắc.",
	openGraph: {
		title: "Hệ thống giải thưởng | SAA 2025",
		description:
			"Tổng quan hệ thống giải thưởng Sun* Annual Awards 2025",
		images: ["/assets/awards/keyvisual-bg.png"],
	},
};

export default function AwardsPage(): React.JSX.Element {
	const awards = getAwardDetails();

	return (
		<div
			className="min-h-screen flex flex-col"
			style={{ backgroundColor: "#00101A" }}
		>
			<Header />

			<AwardSystemHero />

			<AwardsPageContent awards={awards} />

			<Footer />
		</div>
	);
}
