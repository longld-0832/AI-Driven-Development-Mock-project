export default function LoginLoading(): React.JSX.Element {
	return (
		<div
			className="min-h-screen w-full"
			style={{ backgroundColor: "var(--color-bg-dark)" }}
			aria-busy="true"
			aria-label="Loading…"
		/>
	);
}
