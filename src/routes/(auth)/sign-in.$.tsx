import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import Logo from "@/assets/logo.svg";

export const Route = createFileRoute("/(auth)/sign-in/$")({ component: Page });

function Page() {
	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a href="/" className="flex items-center gap-2 self-center font-medium">
					<img src={Logo} alt="Logo" className="w-auto h-8 object-cover" />
				</a>
				<SignIn />
			</div>
		</div>
	);
}
