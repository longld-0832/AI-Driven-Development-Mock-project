"use client";

import { useEffect, useState } from "react";
import {
	LOCALE_CHANGE_EVENT,
	type LocaleCode,
	readStoredLocale,
} from "@/libs/i18n/locale";

/**
 * Returns the active locale and re-renders whenever `LanguageToggle` fires a
 * `localechange` custom event on `window`.
 */
export function useLocale(defaultLocale: LocaleCode = "vi"): LocaleCode {
	const [locale, setLocale] = useState<LocaleCode>(defaultLocale);

	// Hydrate from localStorage after mount (avoids SSR mismatch)
	useEffect(() => {
		setLocale(readStoredLocale(defaultLocale));
	}, [defaultLocale]);

	// Subscribe to locale changes dispatched by LanguageToggle
	useEffect(() => {
		function handleLocaleChange(event: Event): void {
			const code = (event as CustomEvent<LocaleCode>).detail;
			setLocale(code);
		}
		window.addEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange);
		return () => {
			window.removeEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange);
		};
	}, []);

	return locale;
}
