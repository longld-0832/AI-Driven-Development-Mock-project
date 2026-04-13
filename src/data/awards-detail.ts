import type { AwardDetail } from "@/types/award";

export const AWARDS_DETAIL: AwardDetail[] = [
	{
		id: "top-talent",
		slug: "top-talent",
		name: "Top Talent",
		descriptionVi:
			"Vinh danh top cá nhân xuất sắc trên mọi phương diện: năng lực chuyên môn, tinh thần đóng góp, khả năng thích ứng và phát triển liên tục trong kỷ nguyên AI. Đây là những người Sun* đã tạo ra giá trị vượt trội, truyền cảm hứng cho đồng nghiệp và đóng góp tích cực vào sự phát triển chung của tổ chức.",
		descriptionEn:
			"Honoring the most outstanding individuals across all dimensions: professional competence, contribution spirit, adaptability and continuous development in the AI era.",
		quantity: "10",
		unitTypeVi: "Cá nhân",
		unitTypeEn: "Individual",
		prizeValues: [{ labelVi: "cho mỗi giải thưởng", labelEn: "for each award", amount: "7.000.000 VNĐ" }],
		imageSrc: "/assets/homepage/awards/top-talent.png",
		imageAlt: "Top Talent award illustration",
		displayOrder: 1,
	},
	{
		id: "top-project",
		slug: "top-project",
		name: "Top Project",
		descriptionVi:
			"Vinh danh các dự án tiêu biểu đạt chất lượng cao, mang lại giá trị lớn cho khách hàng. Các dự án được đánh giá dựa trên hiệu quả vận hành, mức độ hài lòng của khách hàng, sự đổi mới trong giải pháp và tác động tích cực đến doanh thu của tổ chức.",
		descriptionEn:
			"Honors exemplary projects of high quality that deliver exceptional value to clients, evaluated on operational efficiency, customer satisfaction, and innovation.",
		quantity: "02",
		unitTypeVi: "Tập thể",
		unitTypeEn: "Team",
		prizeValues: [{ labelVi: "cho mỗi giải thưởng", labelEn: "for each award", amount: "15.000.000 VNĐ" }],
		imageSrc: "/assets/homepage/awards/top-project.png",
		imageAlt: "Top Project award illustration",
		displayOrder: 2,
	},
	{
		id: "top-project-leader",
		slug: "top-project-leader",
		name: "Top Project Leader",
		descriptionVi:
			"Tôn vinh những trưởng dự án có năng lực lãnh đạo xuất sắc, dẫn dắt đội nhóm hiệu quả, đảm bảo tiến độ và chất lượng dự án, đồng thời tạo môi trường phát triển cho từng thành viên trong team.",
		descriptionEn:
			"Celebrates project leads with outstanding leadership abilities who guide their teams effectively while ensuring project quality and timelines.",
		quantity: "03",
		unitTypeVi: "Cá nhân",
		unitTypeEn: "Individual",
		prizeValues: [{ labelVi: "cho mỗi giải thưởng", labelEn: "for each award", amount: "7.000.000 VNĐ" }],
		imageSrc: "/assets/homepage/awards/project-leader.png",
		imageAlt: "Top Project Leader award illustration",
		displayOrder: 3,
	},
	{
		id: "best-manager",
		slug: "best-manager",
		name: "Best Manager",
		descriptionVi:
			"Ghi nhận các quản lý tận tâm, xây dựng môi trường làm việc tích cực và thúc đẩy đội ngũ phát triển. Họ không chỉ quản lý hiệu quả mà còn là người truyền cảm hứng, tạo động lực và đồng hành cùng đội ngũ vượt qua thử thách.",
		descriptionEn:
			"Recognizes dedicated managers who build positive work environments and drive team growth, inspiring and mentoring their teams through challenges.",
		quantity: "01",
		unitTypeVi: "Cá nhân",
		unitTypeEn: "Individual",
		prizeValues: [{ labelVi: "", labelEn: "", amount: "10.000.000 VNĐ" }],
		imageSrc: "/assets/homepage/awards/best-manager.png",
		imageAlt: "Best Manager award illustration",
		displayOrder: 4,
	},
	{
		id: "signature-creator",
		slug: "signature-creator",
		name: "Signature 2025 - Creator",
		descriptionVi:
			"Vinh danh những cá nhân và tập thể sáng tạo, tạo ra dấu ấn đặc biệt trong hành trình phát triển Sun*. Giải thưởng dành cho những ai dám nghĩ khác, dám làm khác và mang lại giá trị đột phá cho tổ chức.",
		descriptionEn:
			"Honors creative individuals and teams who leave a distinctive mark on the Sun* growth journey through breakthrough thinking and innovative contributions.",
		quantity: "01",
		unitTypeVi: "Cá nhân + Tập thể",
		unitTypeEn: "Individual + Team",
		prizeValues: [
			{ labelVi: "cho giải cá nhân", labelEn: "for the individual award", amount: "5.000.000 VNĐ" },
			{ labelVi: "cho giải tập thể", labelEn: "for the team award", amount: "8.000.000 VNĐ" },
		],
		imageSrc: "/assets/homepage/awards/signature.png",
		imageAlt: "Signature 2025 - Creator award illustration",
		displayOrder: 5,
	},
	{
		id: "mvp",
		slug: "mvp",
		name: "MVP (Most Valuable Person)",
		descriptionVi:
			"Vinh danh cá nhân xuất sắc nhất, người có đóng góp vượt trội và toàn diện nhất cho Sun* trong năm. MVP là biểu tượng của sự cống hiến, năng lực đa dạng và tầm ảnh hưởng tích cực đến toàn bộ tổ chức.",
		descriptionEn:
			"Honoring the most outstanding individual with the most comprehensive and outstanding contributions to Sun* during the year.",
		quantity: "01",
		unitTypeVi: "",
		unitTypeEn: "",
		prizeValues: [{ labelVi: "", labelEn: "", amount: "15.000.000 VNĐ" }],
		imageSrc: "/assets/homepage/awards/mvp.png",
		imageAlt: "MVP award illustration",
		displayOrder: 6,
	},
];
