export type RelationshipBadge = 'leader' | 'department' | 'team';

export interface KudoUser {
	id: string;
	name: string;
	initials: string;
	department: string;
	role: string;
	relationshipBadge: RelationshipBadge;
	profileHref?: string;
}

export interface KudoItem {
	id: string;
	sender: KudoUser;
	receiver: KudoUser;
	createdAtLabel: string;
	category: string;
	message: string;
	images: string[];
	hasVideo: boolean;
	hashtags: string[];
	likeCount: number;
	likedByMe: boolean;
	isHighlighted: boolean;
	department: string;
	permalink: string;
	videoUrl?: string;
	detailHref?: string;
}

export interface SpotlightTickerItem {
	id: string;
	message: string;
}

export interface SpotlightData {
	totalKudos: number;
	videoPoster: string;
	videoUrl?: string;
	people: KudoUser[];
	tickerItems: SpotlightTickerItem[];
}

export interface PersonalKudosStats {
	kudosReceived: number;
	kudosSent: number;
	totalReceivedFire: number;
	secretBoxesOpened: number;
	secretBoxesRemaining: number;
	secretBoxHref: string;
}

export interface LeaderboardEntry {
	id: string;
	user: KudoUser;
	kudosReceived: number;
}

export interface KudoPageData {
	highlightedKudos: KudoItem[];
	allKudos: KudoItem[];
	personalStats: PersonalKudosStats;
	leaderboard: LeaderboardEntry[];
	spotlight: SpotlightData;
	searchableUsers: KudoUser[];
}

/* ─── Write Kudo Modal ─── */

import { z } from 'zod/v4';

export interface Hashtag {
	id: number;
	name: string;
	slug: string;
}

export interface UploadResult {
	url: string;
}

// TODO(Q1): confirm max 100 chars with PM
// TODO(Q2): confirm max 5000 chars with PM
export const writeKudoSchema = z.object({
	recipientId: z.string().min(1, 'Vui lòng chọn người nhận'),
	honorTitle: z
		.string()
		.min(1, 'Vui lòng nhập danh hiệu')
		.max(100, 'Danh hiệu quá dài'),
	content: z
		.string()
		.min(1, 'Vui lòng nhập nội dung')
		.max(5000, 'Nội dung quá dài'),
	hashtags: z
		.array(z.string())
		.min(1, 'Vui lòng thêm ít nhất 1 hashtag')
		.max(5, 'Tối đa 5 hashtag'),
	imageUrls: z.array(z.string()).max(5).optional(),
	isAnonymous: z.boolean().default(false),
	anonymousName: z.string().max(50).optional(),
});

export type WriteKudoPayload = z.infer<typeof writeKudoSchema>;

export interface WriteKudoResult {
	id: string;
	createdAt: string;
}

/* ─── Like / Unlike Kudo ─── */

/** Request body for PUT /api/kudos/[id]/like */
export const likeKudoSchema = z.object({
	liked: z.boolean(),
});

export type LikeKudoPayload = z.infer<typeof likeKudoSchema>;

/** Response from PUT /api/kudos/[id]/like */
export interface LikeKudoResult {
	kudoId: string;
	likedByMe: boolean;
	likeCount: number;
}