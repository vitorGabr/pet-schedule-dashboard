import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import Logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import { useMakeSignIn } from "@/hooks/use-make-sign-in";
import { SignInBody, signInSchema } from "@/schemas/sign-in";
import { cn } from "@/utils/cn";

export const Route = createFileRoute("/(auth)/sign-in/$")({
	component: SignIn,
});

function SignIn() {
	const [showPassword, setShowPassword] = useState(false);
	const { make } = useMakeSignIn();

	const form = useForm({
		defaultValues: { email: "", password: "" } as SignInBody,
		onSubmit: async ({ value }) => make(value),
		validators: { onChange: signInSchema },
	});

	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<a href="/" className="flex items-center gap-2 self-center font-medium">
					<img src={Logo} alt="Logo" className="w-auto h-12 object-cover" />
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
								className="space-y-6"
							>
								<FieldGroup className="gap-1">
									<form.Field
										name="email"
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Email</FieldLabel>
													<Input
														id={field.name}
														name={field.name}
														value={field.state.value}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														aria-invalid={isInvalid}
														placeholder="Entre com seu email"
													/>
													{isInvalid && (
														<FieldError errors={field.state.meta.errors} />
													)}
												</Field>
											);
										}}
									/>
									<form.Field
										name="password"
										children={(field) => {
											const isInvalid =
												field.state.meta.isTouched && !field.state.meta.isValid;
											return (
												<Field data-invalid={isInvalid}>
													<FieldLabel htmlFor={field.name}>Senha</FieldLabel>
													<InputGroup>
														<InputGroupInput
															id={field.name}
															name={field.name}
															value={field.state.value}
															onBlur={field.handleBlur}
															onChange={(e) =>
																field.handleChange(e.target.value)
															}
															aria-invalid={isInvalid}
															placeholder="Entre com sua senha"
															type={showPassword ? "text" : "password"}
														/>
														<InputGroupAddon align="inline-end">
															<InputGroupButton
																variant="ghost"
																aria-label="Info"
																size="icon-xs"
																onClick={() => setShowPassword(!showPassword)}
															>
																{!showPassword ? <EyeIcon /> : <EyeOffIcon />}
															</InputGroupButton>
														</InputGroupAddon>
													</InputGroup>
													{isInvalid && (
														<FieldError errors={field.state.meta.errors} />
													)}
												</Field>
											);
										}}
									/>
								</FieldGroup>
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
