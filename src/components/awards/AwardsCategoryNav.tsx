"use client";

import { useState, useEffect, useCallback } from "react";
import CategoryNavItem from "@/components/awards/CategoryNavItem";

interface CategoryInfo {
	slug: string;
	name: string;
}

interface AwardsCategoryNavProps {
	categories: CategoryInfo[];
}

export default function AwardsCategoryNav({
	categories,
}: AwardsCategoryNavProps): React.JSX.Element {
	const [activeCategory, setActiveCategory] = useState(
		categories[0]?.slug ?? "",
	);

	const handleClick = useCallback((slug: string) => {
		const element = document.getElementById(slug);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
		setActiveCategory(slug);
	}, []);

	useEffect(() => {
		const slugs = categories.map((c) => c.slug);
		const elements = slugs
			.map((slug) => document.getElementById(slug))
			.filter(Boolean) as HTMLElement[];

		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible.length > 0) {
					setActiveCategory(visible[0].target.id);
				}
			},
			{
				threshold: [0, 0.25, 0.5],
				rootMargin: "-96px 0px 0px 0px",
			},
		);

		for (const el of elements) {
			observer.observe(el);
		}

		return () => observer.disconnect();
	}, [categories]);

	return (
		<nav
			role="navigation"
			aria-label="Award categories"
			className="hidden xl:flex flex-col gap-[var(--spacing-menu-gap)] w-[178px] sticky top-[96px] self-start"
		>
			{categories.map((cat) => (
				<CategoryNavItem
					key={cat.slug}
					isActive={cat.slug === activeCategory}
					slug={cat.slug}
					label={cat.name}
					onClick={handleClick}
				/>
			))}
		</nav>
	);
}
