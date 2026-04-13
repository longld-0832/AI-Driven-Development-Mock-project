import type { RelationshipBadge as RelationshipBadgeType } from '@/types/kudos';

interface RelationshipBadgeProps {
	type: RelationshipBadgeType;
	label: string;
}

const BADGE_STYLES: Record<
	RelationshipBadgeType,
	{ backgroundColor: string; color: string }
> = {
	leader: {
		backgroundColor: 'var(--color-badge-leader-bg)',
		color: 'var(--color-badge-leader-text)',
	},
	department: {
		backgroundColor: 'var(--color-badge-department-bg)',
		color: 'var(--color-badge-department-text)',
	},
	team: {
		backgroundColor: 'var(--color-badge-team-bg)',
		color: 'var(--color-badge-team-text)',
	},
};

export default function RelationshipBadge({
	type,
	label,
}: RelationshipBadgeProps): React.JSX.Element {
	return (
		<span
			className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] leading-[14px]"
			style={{
				fontFamily: 'var(--font-montserrat)',
				fontWeight: 600,
				...BADGE_STYLES[type],
			}}
		>
			{label}
		</span>
	);
}