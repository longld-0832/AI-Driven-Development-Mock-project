export default function Footer(): React.JSX.Element {
	return (
		<footer
			className="absolute bottom-0 w-full flex justify-between items-center px-4 py-6 md:px-10 xl:px-[90px] xl:py-10"
			style={{ borderTop: "1px solid var(--color-divider)" }}
		>
			<p
				className="text-base font-bold leading-6"
				style={{
					color: "var(--color-white)",
					fontFamily: "var(--font-montserrat-alt)",
				}}
			>
				Bản quyền thuộc về Sun* © 2025
			</p>
		</footer>
	);
}
