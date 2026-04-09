export const SUPPORTED_LOCALES = [
	{ code: "vi", label: "VN" },
	{ code: "en", label: "EN" },
] as const;

export type LocaleCode = (typeof SUPPORTED_LOCALES)[number]["code"];

export const LOCALE_STORAGE_KEY = "locale";

/** Name of the custom event dispatched on `window` when the locale changes. */
export const LOCALE_CHANGE_EVENT = "localechange";

/** Read the stored locale from localStorage; returns `fallback` on SSR or invalid value. */
export function readStoredLocale(fallback: LocaleCode): LocaleCode {
	if (typeof window === "undefined") return fallback;
	const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
	if (stored && SUPPORTED_LOCALES.some((l) => l.code === stored)) {
		return stored as LocaleCode;
	}
	return fallback;
}
