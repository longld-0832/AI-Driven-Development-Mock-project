import type { LeaderboardEntry as LeaderboardEntryType } from '@/types/kudos';

interface LeaderboardEntryProps {
	entry: LeaderboardEntryType;
	index: number;
	receivedSuffix: string;
	onSelect: () => void;
}

export default function LeaderboardEntry({
	entry,
	index,
	receivedSuffix,
	onSelect,
}: LeaderboardEntryProps): React.JSX.Element {
	return (
		<button
			type="button"
			onClick={onSelect}
			className="flex min-h-12 w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
		>
			<span className="w-6 text-sm font-bold" style={{ color: 'var(--color-rank-gold)' }}>
				{index + 1}
			</span>
			<div
				className="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold"
				style={{
					borderColor: 'var(--color-accent-yellow)',
					color: 'var(--color-accent-yellow)',
				}}
			>
				{entry.user.initials}
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate text-[13px] font-semibold text-white">{entry.user.name}</p>
				<p className="truncate text-[11px]" style={{ color: 'var(--color-role-text)' }}>
					{entry.kudosReceived} {receivedSuffix}
				</p>
			</div>
		</button>
	);
}