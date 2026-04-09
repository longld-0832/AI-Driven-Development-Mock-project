"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
	LOCALE_CHANGE_EVENT,
	LOCALE_STORAGE_KEY,
	SUPPORTED_LOCALES,
	type LocaleCode,
	readStoredLocale,
} from "@/libs/i18n/locale";

export interface LanguageToggleProps {
	currentLocale?: LocaleCode;
}

export default function LanguageToggle({
	currentLocale = "vi",
}: LanguageToggleProps): React.JSX.Element {
	const [selectedLocale, setSelectedLocale] = useState<LocaleCode>(currentLocale);
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Hydrate from localStorage after mount
	useEffect(() => {
		setSelectedLocale(readStoredLocale(currentLocale));
	}, [currentLocale]);

	// Close on click outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent): void {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	// Close on Escape
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent): void {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		}
		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
		}
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	function selectLocale(code: LocaleCode): void {
		setSelectedLocale(code);
		localStorage.setItem(LOCALE_STORAGE_KEY, code);
		window.dispatchEvent(new CustomEvent(LOCALE_CHANGE_EVENT, { detail: code }));
		setIsOpen(false);
	}

	const activeLocale = SUPPORTED_LOCALES.find((l) => l.code === selectedLocale) ?? SUPPORTED_LOCALES[0];


	return (
		<div ref={containerRef} className="relative">
			<button
				type="button"
				aria-label="Select language"
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				onClick={() => setIsOpen((prev) => !prev)}
				className="w-[108px] h-14 min-h-[44px] p-4 rounded flex items-center gap-0.5 justify-between cursor-pointer bg-transparent transition-colors duration-150 hover:bg-white/[0.08] active:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2"
			>
				{activeLocale.code === "vi" && (
					<Image
						src="/assets/login/icons/vn-flag.svg"
						alt="VN flag"
						width={24}
						height={24}
					/>
				)}
				<span
					className="hidden md:inline font-bold text-base leading-6"
					style={{
						color: "var(--color-white)",
						fontFamily: "var(--font-montserrat)",
						letterSpacing: "0.15px",
					}}
				>
					{activeLocale.label}
				</span>
				<Image
					src="/assets/login/icons/chevron-down.svg"
					alt=""
					width={24}
					height={24}
					aria-hidden
				/>
			</button>

			{isOpen && (
				<ul
					role="listbox"
					aria-label="Language options"
					className="absolute right-0 mt-1 w-[108px] rounded overflow-hidden shadow-lg z-50"
					style={{ backgroundColor: "var(--color-header-bg)" }}
				>
					{SUPPORTED_LOCALES.map((locale) => (
						<li
							key={locale.code}
							role="option"
							aria-selected={locale.code === selectedLocale}
							className="px-4 py-3 cursor-pointer font-bold text-base hover:bg-white/[0.08] transition-colors duration-100"
							style={{
								color: "var(--color-white)",
								fontFamily: "var(--font-montserrat)",
							}}
							onClick={() => selectLocale(locale.code)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") selectLocale(locale.code);
							}}
							tabIndex={0}
						>
							{locale.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
