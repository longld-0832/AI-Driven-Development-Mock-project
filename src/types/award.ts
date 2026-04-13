export interface AwardPrizeValue {
	labelVi: string;
	labelEn: string;
	amount: string;
}

export interface AwardDetail {
	id: string;
	slug: string;
	name: string;
	descriptionVi: string;
	descriptionEn: string;
	quantity: string;
	unitTypeVi: string;
	unitTypeEn: string;
	prizeValues: AwardPrizeValue[];
	imageSrc: string;
	imageAlt: string;
	displayOrder: number;
}
