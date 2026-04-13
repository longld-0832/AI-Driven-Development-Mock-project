'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import SectionHeading from '@/components/kudos/SectionHeading';
import SectionLabel from '@/components/kudos/SectionLabel';
import SpotlightTicker from '@/components/kudos/SpotlightTicker';
import { useLocale } from '@/hooks/useLocale';
import { SUN_KUDOS_I18N } from '@/libs/i18n/sun-kudos';
import type { SpotlightData } from '@/types/kudos';

interface SpotlightBoardProps {
	spotlight: SpotlightData;
}

/**
 * Pure integer LCG — identical output in Node.js (SSR) and browser V8.
 * Math.sin() can produce subtly different float values across JS engines,
 * causing React hydration mismatches. Integer arithmetic avoids this.
 */
function seededRand(seed: number): number {
	// Knuth MMIX LCG constants
	const s = (Math.imul(seed, 6364136223846793005) + 1442695040888963407) >>> 0;
	return s / 4294967296;
}

export default function SpotlightBoard({
	spotlight,
}: SpotlightBoardProps): React.JSX.Element {
	const locale = useLocale();
	const t = SUN_KUDOS_I18N[locale];
	const [searchQuery, setSearchQuery] = useState('');

	/**
	 * Build a deterministic word-cloud node list by repeating the people array
	 * until we have enough nodes to visually fill the board canvas.
	 */
	const wordCloudNodes = useMemo(() => {
		const targetCount = Math.max(spotlight.people.length * 5, 30);
		return Array.from({ length: targetCount }, (_, i) => {
			const person = spotlight.people[i % spotlight.people.length];
			const r1 = seededRand(i * 7 + 1);  // x position
			const r2 = seededRand(i * 11 + 3); // y position
			const r3 = seededRand(i * 13 + 5); // font size
			const r4 = seededRand(i * 17 + 9); // color choice
			return {
				key: `${person.id}-${i}`,
				name: person.name,
				department: person.department,
				left: `${4 + r1 * 88}%`,
				top: `${6 + r2 * 78}%`,
				fontSize: 10 + Math.round(r3 * 10), // 10 – 20 px
				isYellow: r4 > 0.5,
				baseOpacity: 0.35 + r3 * 0.65, // 0.35 – 1.0
			};
		});
	}, [spotlight.people]);

	const trimmedSearch = searchQuery.trim().toLowerCase();
	const isSearching = trimmedSearch.length >= 2;

	return (
		<section className="mx-auto flex w-full max-w-[1224px] flex-col gap-6 px-4 md:px-10 xl:px-0">
			<SectionLabel>{t.sectionLabel}</SectionLabel>
			<SectionHeading>{t.sections.spotlight}</SectionHeading>

			{/* Spotlight card */}
			<div
				className="relative overflow-hidden rounded-2xl"
				style={{
					background: '#0B0B18',
					boxShadow: 'var(--shadow-spotlight)',
					minHeight: '440px',
				}}
			>
				{/* Background decorative art + dark overlay */}
				<div className="pointer-events-none absolute inset-0">
					<Image
						src={spotlight.videoPoster}
						alt=""
						fill
						className="object-cover"
						style={{ opacity: 0.25 }}
						priority={false}
						sizes="1224px"
					/>
					<div className="absolute inset-0" style={{ background: 'rgba(10,10,25,0.55)' }} />
				</div>

				{/* Card content */}
				<div className="relative z-10 flex flex-col" style={{ minHeight: '440px' }}>

					{/* ── Header: kudos count + search ── */}
					<div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
						<p
							style={{
								fontFamily: 'var(--font-montserrat)',
								fontSize: '32px',
								fontWeight: 700,
								lineHeight: '40px',
								color: '#FFFFFF',
							}}
						>
							{spotlight.totalKudos}{' '}
							<span style={{ color: 'var(--color-accent-yellow)' }}>
								{t.spotlight.totalSuffix}
							</span>
						</p>

						{/* Sunner search */}
						<div className="relative">
							<span
								className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
								style={{ color: 'rgba(255,255,255,0.5)' }}
							>
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
									<circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
									<path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
								</svg>
							</span>
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Tìm kiếm"
								className="h-8 rounded-full pl-8 pr-4 text-xs text-white outline-none focus:ring-1 focus:ring-[#FFEA9E]"
								style={{
									background: 'rgba(255,255,255,0.10)',
									border: '1px solid rgba(255,255,255,0.20)',
									minWidth: '140px',
									fontFamily: 'var(--font-montserrat)',
								}}
								aria-label="Tìm kiếm Sunner trên Spotlight Board"
							/>
						</div>
					</div>

					{/* ── Word cloud ── */}
					<div className="relative flex-1" style={{ height: '330px' }}>
						{wordCloudNodes.map((node) => {
							const isMatch = isSearching && node.name.toLowerCase().includes(trimmedSearch);
							const opacity = isSearching ? (isMatch ? 1 : 0.1) : node.baseOpacity;

							return (
								<span
									key={node.key}
									className="absolute whitespace-nowrap transition-opacity duration-300"
									style={{
										left: node.left,
										top: node.top,
										fontSize: `${node.fontSize}px`,
										fontWeight: 600,
										fontFamily: 'var(--font-montserrat)',
										color: node.isYellow ? 'var(--color-accent-yellow)' : '#FFFFFF',
										opacity,
										transform: 'translate(-50%, -50%)',
										userSelect: 'none',
										cursor: 'default',
									}}
									title={`${node.name} · ${node.department}`}
								>
									{node.name}
								</span>
							);
						})}
					</div>

					{/* ── Ticker ── */}
					<div className="border-t px-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
						<SpotlightTicker
							items={spotlight.tickerItems}
							ariaLabel={t.spotlight.tickerAria}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
