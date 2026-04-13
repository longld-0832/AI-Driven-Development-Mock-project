import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LoginButton from "@/components/auth/LoginButton";
import LoginHeroText from "@/components/auth/LoginHeroText";

interface LoginPageProps {
	searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps): Promise<React.JSX.Element> {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// Already authenticated — fast redirect to home
	if (user) {
		redirect("/");
	}

	const params = await searchParams;
	const errorParam = params.error ?? null;

	// Map known error codes to display messages; never expose raw Supabase errors
	let initialError: string | null = null;
	if (errorParam === "auth_failed") {
		initialError = "Đăng nhập thất bại. Vui lòng thử lại.";
	} else if (errorParam === "invalid_callback") {
		initialError = "Phiên xác thực không hợp lệ. Vui lòng thử lại.";
	}

	return (
		<main
			className="relative min-h-screen overflow-hidden"
			style={{ backgroundColor: "var(--color-bg-dark)" }}
		>
			{/* C_Keyvisual — full-bleed background image (z-0) */}
			<Image
				src="/assets/login/images/keyvisual-bg.png"
				alt=""
				fill
				priority
				className="object-cover"
				style={{ zIndex: 0 }}
				aria-hidden
			/>

			{/* Left-side gradient veil — desktop only (z-1) */}
			<div
				className="hidden md:block absolute inset-y-0 left-0 w-full pointer-events-none"
				style={{
					zIndex: 1,
					background:
						"linear-gradient(90deg, #00101A 0%, #00101A 25.41%, rgba(0,16,26,0.00) 100%)",
				}}
				aria-hidden
			/>

			{/* Bottom gradient veil (z-1) */}
			<div
				className="absolute inset-x-0 bottom-0 h-full pointer-events-none"
				style={{
					zIndex: 1,
					background:
						"linear-gradient(0deg, #00101A 22.48%, rgba(0,19,32,0.00) 51.74%)",
				}}
				aria-hidden
			/>

			{/* A_Header (z-10 via component) */}
			<Header variant="overlay" />

			{/* B_Bìa — Hero content (z-10) */}
			<section
				className="relative flex flex-col min-h-screen px-5 pt-[252px] pb-[146px] md:min-h-0 md:px-10 md:pt-20 md:pb-20 xl:px-36 xl:py-24 gap-8 md:gap-[80px]"
				style={{ zIndex: 10 }}
			>
				{/* B.1_Key Visual — ROOT FURTHER logo */}
				<Image
					src="/assets/login/images/root-further-logo.png"
					alt="ROOT FURTHER"
					width={451}
					height={200}
					priority
					className="w-[247px] h-[109px] md:w-full md:h-auto md:max-w-[340px] xl:w-[451px] xl:h-[200px] object-contain"
				/>

				{/* Content block: hero copy + login button */}
				<div className="flex flex-col flex-1 md:flex-none gap-0 md:gap-6 pl-0 md:pl-4">
					{/* B.2_content — client component; re-renders on locale change */}
					<LoginHeroText />

					{/* B.3_Login — LoginButton client island */}
					<div className="mt-auto md:mt-0 flex justify-center md:justify-start">
						<LoginButton initialError={initialError} />
					</div>
				</div>
			</section>

			{/* D_Footer */}
			<Footer />
		</main>
	);
}
