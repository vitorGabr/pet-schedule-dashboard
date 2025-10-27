import { useSignIn } from "@clerk/tanstack-react-start";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/assets/logo.png";
import { TextField } from "@/components/form/fields/text-field";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SignInBody, signInSchema } from "@/schemas/sign-in";
import { cn } from "@/utils/cn";

export const Route = createFileRoute("/(auth)/sign-in/$")({
	component: SignIn,
});

export function SignIn() {
	const { signIn, setActive } = useSignIn();

	const form = useForm({
		defaultValues: { email: "", password: "" } as SignInBody,
		onSubmit: async ({ value }) => {
			await signIn
				?.create({ identifier: value.email, password: value.password })
				.then(async (result) => {
					if (result.status === "complete") {
						await setActive?.({ session: result.createdSessionId, redirectUrl: "/" });
					}
				})
				.catch((error) => {
					console.error("Sign-in error:", error);
					toast.error("Erro ao entrar. Verifique suas credenciais.");
				});
		},
		validators: { onChange: signInSchema },
	});

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a href="/" className="flex items-center gap-2 self-center font-medium">
					<img src={Logo} alt="Logo" className="w-auto h-16 object-cover" />
				</a>
				<div className={cn("flex flex-col gap-6")}>
					<Card className="py-6">
						<CardHeader className="text-center">
							<CardTitle className="text-xl">Bem-vindo de volta</CardTitle>
							<CardDescription>
								Faça login com seu email e senha para continuar
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									e.stopPropagation();
									form.handleSubmit();
								}}
							>
								<div className="grid gap-6">
									<div className="grid gap-2">
										<form.Field
											name="email"
											children={(field) => {
												return (
													<TextField
														field={field}
														label="Email"
														type="email"
														placeholder="Email"
													/>
												);
											}}
										/>

										<form.Field
											name="password"
											children={(field) => (
												<TextField
													label="Senha"
													type="password"
													placeholder="Senha"
													field={field}
												/>
											)}
										/>
									</div>
									<form.Subscribe
										selector={(state) => [state.canSubmit, state.isSubmitting]}
										children={([canSubmit, isSubmitting]) => (
											<Button
												type="submit"
												className="w-full"
												disabled={!canSubmit || isSubmitting}
											>
												{isSubmitting ? (
													<Loader2 className="size-4 animate-spin" />
												) : (
													"Entrar"
												)}
											</Button>
										)}
									/>
								</div>
							</form>
						</CardContent>
					</Card>
					<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
						Ao entrar, você concorda com nossos{" "}
						<a href="/">Termos de Serviço</a> e{" "}
						<a href="/">Política de Privacidade</a>.
					</div>
				</div>
			</div>
		</div>
	);
}
