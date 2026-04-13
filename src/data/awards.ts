export interface Award {
	slug: string;
	name: string;
	descriptionVi: string;
	descriptionEn: string;
	thumbnailSrc: string;
	thumbnailAlt: string;
}

export const AWARDS: Award[] = [
	{
		slug: "top-talent",
		name: "Top Talent",
		descriptionVi: "Vinh danh top cá nhân xuất sắc trên mọi phương diện",
		descriptionEn: "Honoring the most outstanding individuals across all dimensions",
		thumbnailSrc: "/assets/homepage/awards/top-talent.png",
		thumbnailAlt: "Top Talent award thumbnail",
	},
	{
		slug: "top-project",
		name: "Top Project",
		descriptionVi:
			"Vinh danh các dự án tiêu biểu đạt chất lượng cao, mang lại giá trị lớn cho khách hàng.",
		descriptionEn:
			"Honors exemplary projects of high quality that deliver exceptional value to clients.",
		thumbnailSrc: "/assets/homepage/awards/top-project.png",
		thumbnailAlt: "Top Project award thumbnail",
	},
	{
		slug: "top-project-leader",
		name: "Top Project Leader",
		descriptionVi:
			"Tôn vinh những trưởng dự án có năng lực lãnh đạo xuất sắc, dẫn dắt đội nhóm hiệu quả.",
		descriptionEn:
			"Celebrates project leads with outstanding leadership abilities who guide their teams effectively.",
		thumbnailSrc: "/assets/homepage/awards/project-leader.png",
		thumbnailAlt: "Top Project Leader award thumbnail",
	},
	{
		slug: "best-manager",
		name: "Best Manager",
		descriptionVi:
			"Ghi nhận các quản lý tận tâm, xây dựng môi trường làm việc tích cực và thúc đẩy đội ngũ phát triển.",
		descriptionEn:
			"Recognizes dedicated managers who build positive work environments and drive team growth.",
		thumbnailSrc: "/assets/homepage/awards/best-manager.png",
		thumbnailAlt: "Best Manager award thumbnail",
	},
	{
		slug: "signature-creator",
		name: "Signature 2025 - Creator",
		descriptionVi:
			"Vinh danh những cá nhân sáng tạo, tạo ra dấu ấn đặc biệt trong hành trình phát triển Sun*.",
		descriptionEn:
			"Honors creative individuals who leave a distinctive mark on the Sun* growth journey.",
		thumbnailSrc: "/assets/homepage/awards/signature.png",
		thumbnailAlt: "Signature 2025 - Creator award thumbnail",
	},
	{
		slug: "mvp",
		name: "MVP (Most Valuable Person)",
		descriptionVi: "Vinh danh top cá nhân xuất sắc trên mọi phương diện",
		descriptionEn: "Honoring the most outstanding individuals across all dimensions",
		thumbnailSrc: "/assets/homepage/awards/mvp.png",
		thumbnailAlt: "MVP award thumbnail",
	},
];
