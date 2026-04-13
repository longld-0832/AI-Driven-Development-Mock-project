interface HashtagPillProps {
	tag: string;
}

export default function HashtagPill({ tag }: HashtagPillProps): React.JSX.Element {
	return (
		<span
			className="rounded-full px-3 py-1 text-xs"
			style={{
				backgroundColor: 'var(--color-hashtag-bg)',
				color: 'var(--color-accent-yellow)',
				fontFamily: 'var(--font-montserrat)',
				fontWeight: 600,
				lineHeight: '16px',
			}}
		>
			{tag}
		</span>
	);
}