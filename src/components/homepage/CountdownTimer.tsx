"use client";

import { useEffect, useState } from "react";
import type { TimeLeft } from "@/types/countdown";
import { useLocale } from "@/hooks/useLocale";
import { HOMEPAGE_I18N } from "@/libs/i18n/homepage";
import CountdownUnit from "./CountdownUnit";

function parseEventDate(): Date | null {
	try {
		const raw = process.env.NEXT_PUBLIC_EVENT_DATE ?? "";
		if (!raw) return null;
		const d = new Date(raw);
		return isNaN(d.getTime()) ? null : d;
	} catch {
		return null;
	}
}

function calcTimeLeft(target: Date): TimeLeft {
	const now = Date.now();
	const diffMs = target.getTime() - now;
	if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0 };
	const totalMinutes = Math.floor(diffMs / 60_000);
	const days = Math.floor(totalMinutes / (60 * 24));
	const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
	const minutes = totalMinutes % 60;
	return { days, hours, minutes };
}

export default function CountdownTimer(): React.JSX.Element {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
		const eventDate = parseEventDate();
		return eventDate ? calcTimeLeft(eventDate) : { days: -1, hours: -1, minutes: -1 };
	});

	useEffect(() => {
		const eventDate = parseEventDate();
		if (!eventDate) return;
		const update = (): void => setTimeLeft(calcTimeLeft(eventDate));
		update();
		const id = setInterval(update, 60_000);
		return () => clearInterval(id);
	}, []);

	const isEventPast = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0;
	const isFallback = timeLeft.days < 0;

	const displayValue = (v: number): number => (isFallback ? -1 : v);

	const locale = useLocale();
	const t = HOMEPAGE_I18N[locale].countdown;

	return (
		<div className="flex flex-col" style={{ gap: "16px" }}>
			{/* Coming soon label — hidden once event has passed */}
			{!isEventPast && (
				<p
					className="text-white text-base md:text-2xl font-bold"
				>
					{t.comingSoon}
				</p>
			)}

			{/* Countdown units */}
			<div
				aria-live="polite"
				aria-label="Đếm ngược đến sự kiện"
				className="flex flex-row flex-wrap gap-4 md:gap-[var(--spacing-countdown-gap,40px)]"
			>
				<CountdownUnit value={displayValue(timeLeft.days)} label="DAYS" />
				<CountdownUnit value={displayValue(timeLeft.hours)} label="HOURS" />
				<CountdownUnit value={displayValue(timeLeft.minutes)} label="MINUTES" />
			</div>
		</div>
	);
}
