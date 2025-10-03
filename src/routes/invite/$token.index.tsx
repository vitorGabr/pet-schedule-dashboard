import {
	acceptInvite,
	getGetSessionQueryKey,
	useValidateInvite,
} from "@/lib/http";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { TextField } from "@/components/form/fields/text-field";
import {
	type AcceptInviteSchema,
	acceptInviteSchema,
} from "@/schemas/accept-invite";
import { setCookie } from "@/utils/cookie";

export const Route = createFileRoute("/invite/$token/")({
	component: InvitePage,
});

function InvitePage() {
	const queryClient = useQueryClient();
	const { token } = Route.useParams();
	const { data, isLoading, isError } = useValidateInvite(token, {
		query: { refetchOnWindowFocus: false },
	});
	const navigate = Route.useNavigate();

	const form = useForm({
		defaultValues: {
			token,
			password: "",
			confirmPassword: "",
		} as AcceptInviteSchema,
		validators: { onChange: acceptInviteSchema },
		onSubmit: async ({ value }) => {
			const data = await acceptInvite(value);
			setCookie("token", data.accessToken);
			queryClient.setQueryData(getGetSessionQueryKey(), data);
			navigate({ to: "/" });
		},
	});

	if (isLoading) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center p-4">
				<Loader2 className="h-12 w-12 animate-spin" />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center p-4">
				<Card className="w-full max-w-md py-8">
					<CardContent className="pt-6">
						<div className="text-center space-y-4">
							<AlertCircle className="h-12 w-12 text-destructive mx-auto" />
							<h1 className="text-xl font-semibold">Convite Inválido</h1>
							<p className="text-muted-foreground">
								Verifique se o convite é válido e tente novamente.
							</p>
							<Button
								onClick={() => {
									window.location.href = "/";
								}}
							>
								Voltar ao Início
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	if ([!data?.isValid, data?.isExpired, data?.isUsed].some(Boolean)) {
		return (
			<div className="min-h-screen bg-background flex items-center justify-center p-4">
				<Card className="w-full max-w-md py-8">
					<CardContent className="pt-6">
						<div className="text-center space-y-4">
							<AlertCircle className="h-12 w-12 text-destructive mx-auto" />
							<h1 className="text-xl font-semibold">Convite Inválido</h1>
							<p className="text-muted-foreground">{data?.message}</p>
							<Button
								onClick={() => {
									window.location.href = "/";
								}}
							>
								Voltar ao Início
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="border-b bg-card">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center gap-3">
						<div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
							<span className="text-primary-foreground font-bold text-sm">
								P
							</span>
						</div>
						<div>
							<h1 className="font-bold text-lg">PETCARE</h1>
							<p className="text-xs text-muted-foreground">INNOVATION EUROPE</p>
						</div>
					</div>
				</div>
			</header>
			{/* Main Content */}
			<main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
				<Card className="w-full max-w-md py-8">
					<CardHeader className="text-center space-y-4">
						<div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
							<Check className="h-8 w-8 text-green-600" />
						</div>
						<div>
							<CardTitle className="text-2xl">Bem-vindo(a)!</CardTitle>
							<p className="text-muted-foreground mt-2">
								Complete seu cadastro para acessar o sistema
							</p>
						</div>
					</CardHeader>

					<CardContent className="space-y-6">
						{/* Informações do Convite */}
						<div className="space-y-4 p-4 bg-muted/50 rounded-lg">
							<div>
								<Label className="text-sm font-medium text-muted-foreground">
									Nome
								</Label>
								<p className="font-medium">{data?.invite?.user.name}</p>
							</div>
							<div>
								<Label className="text-sm font-medium text-muted-foreground">
									Email
								</Label>
								<p className="font-medium">{data?.invite?.user.email}</p>
							</div>
						</div>

						{/* Formulário de Senha */}
						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
							className="space-y-4"
						>
							<form.Field
								name="password"
								children={(field) => (
									<TextField
										field={field}
										label="Senha"
										type="password"
										placeholder="Digite sua senha"
									/>
								)}
							/>

							<form.Field
								name="confirmPassword"
								children={(field) => (
									<TextField
										field={field}
										label="Confirmar Senha"
										type="password"
										placeholder="Confirme sua senha"
									/>
								)}
							/>

							{/* Requisitos da Senha */}
							<form.Subscribe
								selector={(state) => [state.values.password]}
								children={([password]) => (
									<div className="text-sm text-muted-foreground space-y-1">
										<p className="font-medium">A senha deve conter:</p>
										<ul className="space-y-1 ml-4">
											<li
												className={`flex items-center gap-2 ${password.length >= 8 ? `text-green-600` : ``}`}
											>
												<div
													className={`h-1.5 w-1.5 rounded-full ${password.length >= 8 ? `bg-green-600` : `bg-muted-foreground`}`}
												/>
												Pelo menos 8 caracteres
											</li>
											<li
												className={`flex items-center gap-2 ${/(?=.*[a-z])/.test(password) ? `text-green-600` : ``}`}
											>
												<div
													className={`h-1.5 w-1.5 rounded-full ${/(?=.*[a-z])/.test(password) ? `bg-green-600` : `bg-muted-foreground`}`}
												/>
												Uma letra minúscula
											</li>
											<li
												className={`flex items-center gap-2 ${/(?=.*[A-Z])/.test(password) ? `text-green-600` : ``}`}
											>
												<div
													className={`h-1.5 w-1.5 rounded-full ${/(?=.*[A-Z])/.test(password) ? `bg-green-600` : `bg-muted-foreground`}`}
												/>
												Uma letra maiúscula
											</li>
											<li
												className={`flex items-center gap-2 ${/(?=.*\d)/.test(password) ? `text-green-600` : ``}`}
											>
												<div
													className={`h-1.5 w-1.5 rounded-full ${/(?=.*\d)/.test(password) ? `bg-green-600` : `bg-muted-foreground`}`}
												/>
												Um número
											</li>
										</ul>
									</div>
								)}
							/>

							{false && (
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertDescription>{"error"}</AlertDescription>
								</Alert>
							)}

							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
								children={([canSubmit, isSubmitting]) => (
									<Button
										type="submit"
										className="w-full"
										disabled={!canSubmit || isSubmitting}
									>
										{isSubmitting ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Criando conta...
											</>
										) : (
											"Criar Conta"
										)}
									</Button>
								)}
							/>
						</form>

						<div className="text-center text-sm text-muted-foreground">
							<p>
								Ao criar sua conta, você concorda com nossos{" "}
								<Link to="/" className="text-primary hover:underline">
									Termos de Uso
								</Link>{" "}
								e{" "}
								<Link to="/" className="text-primary hover:underline">
									Política de Privacidade
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
