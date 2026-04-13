'use client';

import Image from 'next/image';
import { useState } from 'react';
import SearchInput from '@/components/kudos/SearchInput';
import WriteKudoModal from '@/components/kudos/write-kudo/WriteKudoModal';
import { useLocale } from '@/hooks/useLocale';
import { SUN_KUDOS_I18N } from '@/libs/i18n/sun-kudos';
import type { Hashtag, KudoItem, KudoUser } from '@/types/kudos';

interface KudosHeroProps {
	users: KudoUser[];
	hashtags: Hashtag[];
	onKudoCreated?: (kudo: KudoItem) => void;
}

export default function KudosHero({ users, hashtags, onKudoCreated }: KudosHeroProps): React.JSX.Element {
	const locale = useLocale();
	const t = SUN_KUDOS_I18N[locale];

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRecipient, setSelectedRecipient] = useState<KudoUser | null>(null);
	const [modalKey, setModalKey] = useState(0);
	const [helperMessage, setHelperMessage] = useState('');

	function handleSelectUserForKudo(user: KudoUser): void {
		setSelectedRecipient(user);
		setModalKey((prev) => prev + 1);
		setIsModalOpen(true);
	}

	function handleCloseModal(): void {
		setIsModalOpen(false);
		setSelectedRecipient(null);
	}

	function handleUnavailableRoute(): void {
		setHelperMessage(t.hero.routePending);
	}

	return (
		<section className="relative overflow-hidden px-4 py-12 md:px-10 md:py-16 xl:px-36 xl:py-20">
			<div
				className="absolute inset-0"
				style={{
					background:
						'linear-gradient(135deg, var(--color-bg-dark) 0%, var(--color-hero-gradient-end) 100%)',
				}}
			/>
			<div className="absolute inset-0 opacity-30">
				<Image src="/assets/homepage/kudos-bg.png" alt="" fill className="object-cover" priority />
			</div>
			<div className="relative z-10 mx-auto flex w-full max-w-[1224px] flex-col items-center gap-6 text-center">
				<p
					className="text-base md:text-xl"
					style={{
						fontFamily: 'var(--font-montserrat)',
						fontWeight: 700,
						lineHeight: '28px',
						color: 'var(--color-white)',
					}}
				>
					{t.hero.subtitle}
				</p>
				<Image
					src="/assets/homepage/kudos-logo.svg"
					alt="Sun Kudos"
					width={310}
					height={96}
					priority
					className="h-auto w-[180px] md:w-[260px] xl:w-[310px]"
				/>
				<div className="flex w-full flex-col gap-3 md:grid md:grid-cols-2 md:gap-4 xl:gap-6">
					<SearchInput
						placeholder={t.hero.sendPlaceholder}
						results={users}
						variant="send"
						emptyLabel={t.search.empty}
						startTypingLabel={t.search.startTyping}
						onSelectUser={handleSelectUserForKudo}
					/>
					<SearchInput
						placeholder={t.hero.profilePlaceholder}
						results={users}
						variant="profile"
						emptyLabel={t.search.empty}
						startTypingLabel={t.search.startTyping}
						onSelectUser={handleUnavailableRoute}
					/>
				</div>
				{helperMessage ? (
					<p
						className="max-w-3xl text-sm"
						style={{
							fontFamily: 'var(--font-montserrat)',
							fontWeight: 500,
							lineHeight: '20px',
							color: 'var(--color-accent-yellow)',
						}}
					>
						{helperMessage}
					</p>
				) : null}
			</div>

			<WriteKudoModal
				key={modalKey}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onSuccess={onKudoCreated}
				prefilledRecipient={selectedRecipient}
				hashtags={hashtags}
				users={users}
			/>
		</section>
	);
}
