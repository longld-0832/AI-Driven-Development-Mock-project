import type { LocaleCode } from "@/libs/i18n/locale";

interface AwardsI18n {
	subHeading: string;
	mainHeading: string;
	quantityLabel: string;
	valueLabel: string;
	perAward: string;
	kudos: {
		caption: string;
		title: string;
		subLabel: string;
		description: string;
		detailButton: string;
	};
}

export const AWARDS_I18N: Record<LocaleCode, AwardsI18n> = {
	vi: {
		subHeading: "Sun* Annual Awards 2025",
		mainHeading: "Hệ thống giải thưởng SAA 2025",
		quantityLabel: "Số lượng giải thưởng:",
		valueLabel: "Giá trị giải thưởng:",
		perAward: "cho mỗi giải thưởng",
		kudos: {
			caption: "Phong trào ghi nhận",
			title: "Sun* Kudos",
			subLabel: "BIẾN MỚI CỦA SAA 2025",
			description:
				"Hoạt động ghi nhận và cảm ơn đồng nghiệp - lần đầu tiên được diễn ra dành cho tất cả Sunner. Hoạt động sẽ được triển khai vào tháng 11/2025, khuyến khích người Sun* chia sẻ những lời ghi nhận, cảm ơn đồng nghiệp trên hệ thống do BTC công bố.",
			detailButton: "Chi tiết",
		},
	},
	en: {
		subHeading: "Sun* Annual Awards 2025",
		mainHeading: "SAA 2025 Award System",
		quantityLabel: "Number of awards:",
		valueLabel: "Prize value:",
		perAward: "per award",
		kudos: {
			caption: "Recognition movement",
			title: "Sun* Kudos",
			subLabel: "NEW IN SAA 2025",
			description:
				"A recognition and appreciation initiative happening for the first time for all Sunners. Launching in November 2025, it encourages Sun* members to share appreciation messages on the platform announced by the organizing committee.",
			detailButton: "Details",
		},
	},
};
