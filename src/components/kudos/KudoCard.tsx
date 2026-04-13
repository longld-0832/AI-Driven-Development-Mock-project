import Image from 'next/image';
import HashtagPill from '@/components/kudos/HashtagPill';
import KudoCardInteractions from '@/components/kudos/KudoCardInteractions';
import RelationshipBadge from '@/components/kudos/RelationshipBadge';
import VideoPlayButton from '@/components/kudos/VideoPlayButton';
import type { KudoItem } from '@/types/kudos';

/** Strip HTML tags to get plain text for card preview. */
function stripHtml(html: string): string {
	return html.replace(/<[^>]*>/g, '').trim();
}

interface KudoCardProps {
	kudo: KudoItem;
	badgeLabels: Record<'leader' | 'department' | 'team', string>;
	actions: {
		copyLink: string;
		copySuccess: string;
		copyFailed: string;
		viewDetail?: string;
		like: string;
		unlike: string;
		likeFailed: string;
		likeErrorSessionExpired: string;
		likeErrorNotFound: string;
		likeErrorRateLimited: string;
		playVideo: string;
	};
	onToast: (message: string) => void;
	onImageClick: (images: string[], startIndex: number) => void;
	showDetailLink?: boolean;
	onDetailClick?: () => void;
	onVideoClick?: () => void;
	compact?: boolean;
}

function AvatarBadge({
	initials,
	name,
}: {
	initials: string;
	name: string;
}): React.JSX.Element {
	return (
		<div
			className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
			style={{
				background: 'linear-gradient(135deg, rgba(255,234,158,0.16) 0%, rgba(255,234,158,0.05) 100%)',
				color: 'var(--color-accent-yellow)',
			}}
			aria-label={name}
		>
			{initials}
		</div>
	);
}

function PersonSummary({
	initials,
	name,
	role,
	department,
	badgeType,
	badgeLabel,
}: {
	initials: string;
	name: string;
	role: string;
	department: string;
	badgeType: KudoItem['sender']['relationshipBadge'];
	badgeLabel: string;
}): React.JSX.Element {
	return (
		<div className="flex items-center gap-3">
			<AvatarBadge initials={initials} name={name} />
			<div className="min-w-0">
				<p className="truncate text-sm font-bold text-white">{name}</p>
				<p className="truncate text-xs" style={{ color: 'var(--color-role-text)' }}>
					{role} · {department}
				</p>
				<RelationshipBadge type={badgeType} label={badgeLabel} />
			</div>
		</div>
	);
}

export default function KudoCard({
	kudo,
	badgeLabels,
	actions,
	onToast,
	onImageClick,
	showDetailLink = false,
	onDetailClick,
	onVideoClick,
	compact = false,
}: KudoCardProps): React.JSX.Element {
	const headerClassName = compact
		? 'flex flex-col gap-3'
		: 'flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between';
	const summaryClassName = compact
		? 'flex flex-col gap-3'
		: 'flex flex-col gap-3 md:flex-row md:items-center md:gap-4';
	const connectorClassName = compact
		? 'ml-3 text-lg leading-none'
		: 'text-lg';

	return (
		<article
			className="relative flex h-full min-w-0 flex-col gap-4 overflow-hidden rounded-2xl border p-6"
			style={{
				backgroundColor: 'var(--color-surface-dark)',
				borderColor: 'var(--color-border-btn)',
				boxShadow: 'var(--shadow-card)',
			}}
		>
			{kudo.hasVideo ? (
				<VideoPlayButton
					label={actions.playVideo}
					onClick={onVideoClick ?? (() => undefined)}
				/>
			) : null}
			<div className={headerClassName}>
				<div className={summaryClassName}>
					<PersonSummary
						initials={kudo.sender.initials}
						name={kudo.sender.name}
						role={kudo.sender.role}
						department={kudo.sender.department}
						badgeType={kudo.sender.relationshipBadge}
						badgeLabel={badgeLabels[kudo.sender.relationshipBadge]}
					/>
					<span className={connectorClassName} style={{ color: 'var(--color-accent-yellow)' }}>
						{compact ? '↓' : '→'}
					</span>
					<PersonSummary
						initials={kudo.receiver.initials}
						name={kudo.receiver.name}
						role={kudo.receiver.role}
						department={kudo.receiver.department}
						badgeType={kudo.receiver.relationshipBadge}
						badgeLabel={badgeLabels[kudo.receiver.relationshipBadge]}
					/>
				</div>
				<p className="self-end text-xs" style={{ color: 'var(--color-role-text)' }}>
					{kudo.createdAtLabel}
				</p>
			</div>

			<p className="text-sm font-bold uppercase" style={{ color: 'var(--color-accent-yellow)' }}>
				{kudo.category}
			</p>

			<p
				className="text-sm text-white"
				style={{
					fontFamily: 'var(--font-montserrat)',
					fontWeight: 400,
					lineHeight: '20px',
					display: '-webkit-box',
					WebkitLineClamp: compact ? 3 : 4,
					WebkitBoxOrient: 'vertical',
					overflow: 'hidden',
				}}
			>
				{stripHtml(kudo.message)}
			</p>

			{kudo.images.length ? (
				<div className="flex flex-wrap gap-2">
					{kudo.images.slice(0, 5).map((image, index) => (
						<button
							key={`${kudo.id}-${image}`}
							type="button"
							onClick={() => onImageClick(kudo.images, index)}
							className="relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
						>
							<Image src={image} alt="Kudos image" fill className="object-cover" sizes="56px" />
						</button>
					))}
				</div>
			) : null}

			{kudo.hashtags.length ? (
				<div className="flex flex-wrap gap-2">
					{kudo.hashtags.map((tag) => (
						<HashtagPill key={`${kudo.id}-${tag}`} tag={tag} />
					))}
				</div>
			) : null}

			<KudoCardInteractions
				kudoId={kudo.id}
				initialLikeCount={kudo.likeCount}
				initialLikedByMe={kudo.likedByMe}
				permalink={kudo.permalink}
				copyLabel={actions.copyLink}
				copySuccessLabel={actions.copySuccess}
				copyFailedLabel={actions.copyFailed}
				viewDetailLabel={showDetailLink ? actions.viewDetail : undefined}
				likeLabel={actions.like}
				unlikeLabel={actions.unlike}
				likeErrorLabels={{
					sessionExpired: actions.likeErrorSessionExpired,
					notFound: actions.likeErrorNotFound,
					rateLimited: actions.likeErrorRateLimited,
					generic: actions.likeFailed,
				}}
				onToast={onToast}
				onDetailClick={onDetailClick}
			/>
		</article>
	);
}