import type {
	KudoItem,
	KudoPageData,
	KudoUser,
	LeaderboardEntry,
	PersonalKudosStats,
	SpotlightData,
} from '@/types/kudos';

const USERS: KudoUser[] = [
	{
		id: 'sunner-01',
		name: 'Nguyen Minh Chau',
		initials: 'MC',
		department: 'Product Design',
		role: 'Lead Designer',
		relationshipBadge: 'leader',
	},
	{
		id: 'sunner-02',
		name: 'Tran Gia Han',
		initials: 'GH',
		department: 'Engineering',
		role: 'Frontend Engineer',
		relationshipBadge: 'team',
	},
	{
		id: 'sunner-03',
		name: 'Le Hoang Nam',
		initials: 'HN',
		department: 'Engineering',
		role: 'Project Manager',
		relationshipBadge: 'department',
	},
	{
		id: 'sunner-04',
		name: 'Pham Bao Uyen',
		initials: 'BU',
		department: 'Talent Success',
		role: 'People Partner',
		relationshipBadge: 'department',
	},
	{
		id: 'sunner-05',
		name: 'Do Tuan Kiet',
		initials: 'TK',
		department: 'Engineering',
		role: 'Backend Engineer',
		relationshipBadge: 'team',
	},
	{
		id: 'sunner-06',
		name: 'Bui Thu Trang',
		initials: 'TT',
		department: 'Marketing',
		role: 'Brand Executive',
		relationshipBadge: 'department',
	},
	{
		id: 'sunner-07',
		name: 'Vu Duc Thinh',
		initials: 'DT',
		department: 'Engineering',
		role: 'Tech Lead',
		relationshipBadge: 'leader',
	},
	{
		id: 'sunner-08',
		name: 'Hoang Anh Thu',
		initials: 'AT',
		department: 'Growth',
		role: 'Campaign Manager',
		relationshipBadge: 'department',
	},
	{
		id: 'sunner-09',
		name: 'Nguyen Quoc Bao',
		initials: 'QB',
		department: 'Engineering',
		role: 'QA Engineer',
		relationshipBadge: 'team',
	},
	{
		id: 'sunner-10',
		name: 'Tran Phuong Linh',
		initials: 'PL',
		department: 'Operations',
		role: 'Office Lead',
		relationshipBadge: 'department',
	},
];

const GALLERY = [
	'/assets/homepage/theme-narrative-img-1.png',
	'/assets/homepage/theme-narrative-img-2.png',
	'/assets/homepage/keyvisual-bg.png',
	'/assets/awards/keyvisual-bg.png',
];

export const KUDOS_MOCKS: KudoItem[] = [
	{
		id: 'kudo-01',
		sender: USERS[0],
		receiver: USERS[1],
		createdAtLabel: '10:05 - 10/30/2025',
		category: 'IDOL GIOI TRE',
		message:
			'Cam on Han da chot lai toan bo luong giao dien cho live board trong mot sprint rat cang. Ban khong chi giu chat luong pixel-perfect ma con rat chu dong dong bo voi team frontend de ship nhanh.',
		images: [GALLERY[0], GALLERY[1], GALLERY[2]],
		hasVideo: true,
		hashtags: ['#Dedicated', '#Inspiring', '#Teamwork'],
		likeCount: 126,
		likedByMe: false,
		isHighlighted: true,
		department: 'Engineering',
		permalink: '/kudos#kudo-01',
	},
	{
		id: 'kudo-02',
		sender: USERS[2],
		receiver: USERS[3],
		createdAtLabel: '16:40 - 10/28/2025',
		category: 'CULTURE BUILDER',
		message:
			'Uyen da giup team on-board 3 thanh vien moi rat mem mai va chu dao. Cach ban dung tai lieu va workshop nho de giup moi nguoi nam bat flow lam viec da tao cam giac rat de hoa nhap.',
		images: [GALLERY[3], GALLERY[1]],
		hasVideo: false,
		hashtags: ['#Grateful', '#Care'],
		likeCount: 88,
		likedByMe: true,
		isHighlighted: true,
		department: 'Talent Success',
		permalink: '/kudos#kudo-02',
	},
	{
		id: 'kudo-03',
		sender: USERS[6],
		receiver: USERS[4],
		createdAtLabel: '08:15 - 10/25/2025',
		category: 'ROOT FURTHER',
		message:
			'Kiet da tim ra cach toi uu query va cache de giam thoi gian tai bang xep hang tu hon 2 giay xuong con duoi 500ms. Day la mot dong gop rat lon cho trai nghiem live board.',
		images: [GALLERY[2], GALLERY[0], GALLERY[1], GALLERY[3]],
		hasVideo: true,
		hashtags: ['#ProblemSolver', '#AIReady'],
		likeCount: 142,
		likedByMe: false,
		isHighlighted: true,
		department: 'Engineering',
		permalink: '/kudos#kudo-03',
	},
	{
		id: 'kudo-04',
		sender: USERS[5],
		receiver: USERS[7],
		createdAtLabel: '13:55 - 10/22/2025',
		category: 'BRAND MOMENT',
		message:
			'Thu da xoay xong campaign timeline trong 24h de team kip cong bo teaser cho SAA 2025. Toc do va tinh than hop tac cua ban da giup ca team bat nhip rat nhanh.',
		images: [GALLERY[0]],
		hasVideo: false,
		hashtags: ['#FastMove', '#OneTeam'],
		likeCount: 64,
		likedByMe: false,
		isHighlighted: true,
		department: 'Growth',
		permalink: '/kudos#kudo-04',
	},
	{
		id: 'kudo-05',
		sender: USERS[8],
		receiver: USERS[0],
		createdAtLabel: '11:22 - 10/20/2025',
		category: 'QUALITY GUARD',
		message:
			'Cam on Chau da support rat ky phan test case va accessibility checklist. Vi su ky tinh cua ban, team da phat hien som nhieu van de nho ma tac dong lon den trai nghiem nguoi dung.',
		images: [GALLERY[3], GALLERY[0]],
		hasVideo: false,
		hashtags: ['#Reliable', '#Accessible'],
		likeCount: 53,
		likedByMe: true,
		isHighlighted: false,
		department: 'Product Design',
		permalink: '/kudos#kudo-05',
	},
	{
		id: 'kudo-06',
		sender: USERS[9],
		receiver: USERS[2],
		createdAtLabel: '09:05 - 10/18/2025',
		category: 'CROSS-FUNCTION IMPACT',
		message:
			'Anh Nam da giup team Operations hieu ro luong dang ky tham du va cach dong bo thong tin giua cac ben. Cach ban chia nho bai toan va giai thich don gian rat de theo.',
		images: [GALLERY[1], GALLERY[2], GALLERY[3]],
		hasVideo: false,
		hashtags: ['#Clarity', '#Support'],
		likeCount: 37,
		likedByMe: false,
		isHighlighted: false,
		department: 'Operations',
		permalink: '/kudos#kudo-06',
	},
	{
		id: 'kudo-07',
		sender: USERS[1],
		receiver: USERS[6],
		createdAtLabel: '15:32 - 10/15/2025',
		category: 'TEAM SPIRIT',
		message:
			'Thinh luon san sang review code gap va huong dan nhung goc can chu y cho team junior. Suc anh huong cua ban den toc do hoc hoi cua ca team la rat ro rang.',
		images: [GALLERY[0], GALLERY[2]],
		hasVideo: false,
		hashtags: ['#Mentoring', '#Growth'],
		likeCount: 101,
		likedByMe: false,
		isHighlighted: false,
		department: 'Engineering',
		permalink: '/kudos#kudo-07',
	},
	{
		id: 'kudo-08',
		sender: USERS[3],
		receiver: USERS[9],
		createdAtLabel: '17:10 - 10/12/2025',
		category: 'SUNNER CARE',
		message:
			'Trang da ho tro khong gian va hau can rat tot cho chuoi workshop noi bo. Nhung chi tiet nho ma ban chuan bi da giup chuong trinh dien ra rat muot va am ap.',
		images: [GALLERY[1]],
		hasVideo: false,
		hashtags: ['#Thoughtful', '#Reliable'],
		likeCount: 46,
		likedByMe: false,
		isHighlighted: false,
		department: 'Operations',
		permalink: '/kudos#kudo-08',
	},
];

export const PERSONAL_STATS_MOCK: PersonalKudosStats = {
	kudosReceived: 25,
	kudosSent: 18,
	totalReceivedFire: 86,
	secretBoxesOpened: 4,
	secretBoxesRemaining: 2,
	secretBoxHref: '/giftbox',
};

export const LEADERBOARD_MOCK: LeaderboardEntry[] = [
	{ id: 'rank-01', user: USERS[0], kudosReceived: 132 },
	{ id: 'rank-02', user: USERS[6], kudosReceived: 118 },
	{ id: 'rank-03', user: USERS[2], kudosReceived: 112 },
	{ id: 'rank-04', user: USERS[3], kudosReceived: 107 },
	{ id: 'rank-05', user: USERS[1], kudosReceived: 101 },
	{ id: 'rank-06', user: USERS[5], kudosReceived: 95 },
	{ id: 'rank-07', user: USERS[4], kudosReceived: 88 },
	{ id: 'rank-08', user: USERS[9], kudosReceived: 81 },
	{ id: 'rank-09', user: USERS[7], kudosReceived: 79 },
	{ id: 'rank-10', user: USERS[8], kudosReceived: 74 },
];

export const SPOTLIGHT_MOCK: SpotlightData = {
	totalKudos: 388,
	videoPoster: '/assets/homepage/kudos-bg.png',
	people: USERS.slice(0, 6),
	tickerItems: [
		{ id: 'ticker-01', message: 'Cam on team frontend da hoan thanh live board voi toc do an tuong.' },
		{ id: 'ticker-02', message: 'Kudos cho Product Design vi da dong bo rat ky cac state responsive.' },
		{ id: 'ticker-03', message: 'Thank you Talent Success for keeping the onboarding energy warm and clear.' },
		{ id: 'ticker-04', message: 'Growth team da phoi hop rat nhanh de dua teaser cua SAA 2025 len dung ke hoach.' },
	],
};

/**
 * Runtime store for kudos created during this dev server session.
 * Persists in memory across requests in `next dev` but resets on server restart.
 * In production, all reads come from Supabase — this is only for mock mode.
 */
const runtimeKudos: KudoItem[] = [];

export function addRuntimeKudo(kudo: KudoItem): void {
	runtimeKudos.unshift(kudo);
}

export function getUserById(userId: string): KudoUser | undefined {
	return USERS.find((u) => u.id === userId);
}

/**
 * Mock fallback for the like toggle: mutates the in-memory kudo's likedByMe
 * and likeCount fields. Used when Supabase isn't connected in dev.
 */
export function toggleMockLike(
	kudoId: string,
	liked: boolean,
): { kudoId: string; likedByMe: boolean; likeCount: number } {
	const kudo =
		runtimeKudos.find((k) => k.id === kudoId) ??
		KUDOS_MOCKS.find((k) => k.id === kudoId);

	if (!kudo) {
		return { kudoId, likedByMe: liked, likeCount: liked ? 1 : 0 };
	}

	if (kudo.likedByMe === liked) {
		// Idempotent: no change
		return { kudoId, likedByMe: kudo.likedByMe, likeCount: kudo.likeCount };
	}

	kudo.likedByMe = liked;
	kudo.likeCount = liked
		? kudo.likeCount + 1
		: Math.max(0, kudo.likeCount - 1);

	return { kudoId, likedByMe: kudo.likedByMe, likeCount: kudo.likeCount };
}

export const KUDOS_PAGE_MOCK: KudoPageData = {
	get highlightedKudos() {
		return KUDOS_MOCKS.filter((item) => item.isHighlighted);
	},
	get allKudos() {
		return [...runtimeKudos, ...KUDOS_MOCKS];
	},
	personalStats: PERSONAL_STATS_MOCK,
	leaderboard: LEADERBOARD_MOCK,
	spotlight: SPOTLIGHT_MOCK,
	searchableUsers: USERS,
};