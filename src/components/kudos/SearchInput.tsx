'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import type { KudoUser } from '@/types/kudos';

interface SearchInputProps {
	placeholder: string;
	results: KudoUser[];
	variant: 'send' | 'profile';
	emptyLabel: string;
	startTypingLabel: string;
	onSelectUser: (user: KudoUser) => void;
}

function SearchIcon({ variant }: { variant: 'send' | 'profile' }): React.JSX.Element {
	if (variant === 'send') {
		return (
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path d="M4 17.25V20h2.75L17.81 8.94l-2.75-2.75L4 17.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M14.87 4.94 17.62 7.69" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		);
	}

	return (
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
			<circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
			<path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	);
}

export default function SearchInput({
	placeholder,
	results,
	variant,
	emptyLabel,
	startTypingLabel,
	onSelectUser,
}: SearchInputProps): React.JSX.Element {
	const [query, setQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const debouncedQuery = useDebounce(query, 300);

	useEffect(() => {
		function handlePointerDown(event: MouseEvent): void {
			if (!containerRef.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handlePointerDown);
		return () => {
			document.removeEventListener('mousedown', handlePointerDown);
		};
	}, []);

	const filteredResults = useMemo(() => {
		const normalizedQuery = debouncedQuery.trim().toLowerCase();
		if (normalizedQuery.length < 2) {
			return [];
		}

		return results.filter((user) => {
			return [user.name, user.department, user.role]
				.join(' ')
				.toLowerCase()
				.includes(normalizedQuery);
		});
	}, [debouncedQuery, results]);

	const helperLabel = query.trim().length < 2 ? startTypingLabel : emptyLabel;

	return (
		<div ref={containerRef} className="relative w-full">
			<div className="relative">
				<span
					className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
					style={{ color: 'var(--color-role-text)' }}
				>
					<SearchIcon variant={variant} />
				</span>
				<input
					type="text"
					value={query}
					onChange={(event) => {
						setQuery(event.target.value);
						setIsOpen(true);
					}}
					onFocus={() => setIsOpen(true)}
					placeholder={placeholder}
					className="h-12 w-full rounded-full border bg-transparent pl-12 pr-4 text-sm text-white outline-none transition-shadow duration-150"
					style={{
						borderColor: 'var(--color-border-btn)',
						fontFamily: 'var(--font-montserrat)',
						boxShadow: '0 0 0 0 rgba(255,234,158,0)',
					}}
					aria-label={placeholder}
				/>
			</div>

			{isOpen && (
				<div
					className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-2xl"
					style={{
						backgroundColor: 'rgba(16,20,23,0.98)',
						border: '1px solid var(--color-border-btn)',
						boxShadow: 'var(--shadow-card)',
					}}
				>
					{filteredResults.length > 0 ? (
						<ul role="listbox" aria-label={placeholder}>
							{filteredResults.map((user) => (
								<li key={user.id}>
									<button
										type="button"
										onClick={() => {
											onSelectUser(user);
											setQuery(user.name);
											setIsOpen(false);
										}}
										className="flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-[-2px]"
									>
										<div
											className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
											style={{
												background: 'linear-gradient(135deg, rgba(255,234,158,0.16) 0%, rgba(255,234,158,0.05) 100%)',
												color: 'var(--color-accent-yellow)',
											}}
										>
											{user.initials}
										</div>
										<div className="min-w-0">
											<p className="truncate text-sm font-bold text-white">{user.name}</p>
											<p className="truncate text-xs" style={{ color: 'var(--color-role-text)' }}>
												{user.role} · {user.department}
											</p>
										</div>
									</button>
								</li>
							))}
						</ul>
					) : (
						<p className="px-4 py-3 text-sm" style={{ color: 'var(--color-role-text)' }}>
							{helperLabel}
						</p>
					)}
				</div>
			)}
		</div>
	);
}