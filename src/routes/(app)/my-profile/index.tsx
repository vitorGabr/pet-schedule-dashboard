import {
	type EditUserMutationBody,
	editUser,
	editUserBody,
	useGetCompanyById,
	useGetSession,
} from "@/lib/http";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Building, Mail, Pencil, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TextField } from "@/components/form/fields/text-field";
import { ImageUpload } from "@/components/image-upload";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/(app)/my-profile/")({ component: App });

function App() {
	const [isEditing, setIsEditing] = useState(false);
	const [imageDialogVariant, setImageDialogVariant] = useState<"avatar" | null>(null);

	const { data: session } = useGetSession();
	const { data: company } = useGetCompanyById(session?.companyId!, {
		query: { enabled: !!session?.companyId },
	});

	const form = useForm({
		defaultValues: {
			name: session?.name || "",
			email: session?.email || "",
		} as EditUserMutationBody,
		validators: { onChange: editUserBody },
		onSubmit: async ({ value }) => {
			await editUser(value);
			toast.success("Perfil atualizado com sucesso!");
		},
	});

	const handleEdit = () => {
		setIsEditing(true);
		form.setFieldValue("name", session?.name || "");
		form.setFieldValue("email", session?.email || "");
	}

	const handleCancel = () => {
		setIsEditing(false);
		form.reset();
	}

	return (
		<>
			<SiteHeader title="Meu Perfil" />
			<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Profile Info */}
					<div className="lg:col-span-2 space-y-6">
						<Card className="py-6">
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="flex items-center gap-2">
										<User className="w-5 h-5" />
										Informações Pessoais
									</CardTitle>
									{!isEditing && (
										<Button size="sm" onClick={handleEdit}>
											<Pencil className="w-4 h-4 mr-2" />
											Editar
										</Button>
									)}
								</div>
								<CardDescription>Gerencie suas informações pessoais e preferências</CardDescription>
							</CardHeader>
							<CardContent>
								{isEditing ? (
									<form
										onSubmit={(e) => {
											e.preventDefault()
											e.stopPropagation()
											form.handleSubmit()
										}}
										className="space-y-4"
									>
										<div className="flex items-center space-x-4 mb-6">
											<div className="relative group">
												<Avatar className="w-20 h-20">
													<AvatarImage src={session?.avatar} alt={session?.name} />
													<AvatarFallback className="text-lg">
														{session?.name?.charAt(0)}
													</AvatarFallback>
												</Avatar>
												<Button
													type="button"
													size="sm"
													variant="outline"
													className="absolute top-2 right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
													onClick={() => setImageDialogVariant("avatar")}
												>
													<Pencil className="w-3 h-3" />
												</Button>
											</div>
											<div>
												<p className="text-sm text-muted-foreground">Foto do perfil</p>
												<p className="text-xs text-muted-foreground">
													Clique no ícone para alterar
												</p>
											</div>
										</div>

										<form.Field
											name="name"
											children={(field) => (
												<>
													<TextField label="Nome" placeholder="Seu nome completo" field={field} />
												</>
											)}
										/>

										<form.Field
											name="email"
											children={(field) => (
												<>
													<TextField label="Email" placeholder="Seu email" field={field} />
												</>
											)}
										/>

										<form.Subscribe
											selector={(state) => [state.isSubmitting]}
											children={([isSubmitting]) => (
												<div className="flex gap-2 pt-4">
													<Button type="submit" disabled={isSubmitting}>
														{isSubmitting ? "Salvando..." : "Salvar"}
													</Button>
													<Button
														type="button"
														variant="outline"
														disabled={isSubmitting}
														onClick={handleCancel}
													>
														Cancelar
													</Button>
												</div>
											)}
										/>
									</form>
								) : (
									<div className="space-y-6">
										<div className="flex items-center space-x-4">
											<Avatar className="w-20 h-20">
												<AvatarImage src={session?.avatar} alt={session?.name} />
												<AvatarFallback className="text-lg">
													{session?.name?.charAt(0)}
												</AvatarFallback>
											</Avatar>
											<div>
												<h3 className="text-xl font-semibold">{session?.name}</h3>
												<p className="text-muted-foreground">{session?.email}</p>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<label className="text-sm font-medium text-muted-foreground">Nome</label>
												<p className="text-sm">{session?.name}</p>
											</div>
											<div className="space-y-2">
												<label className="text-sm font-medium text-muted-foreground">Email</label>
												<p className="text-sm">{session?.email}</p>
											</div>
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					</div>

					{/* Company Info Sidebar */}
					<div className="space-y-6">
						<Card className="py-6">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Building className="w-5 h-5" />
									Informações da Empresa
								</CardTitle>
								<CardDescription>Detalhes sobre sua empresa e cargo</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								{company ? (
									<>
										<div className="space-y-2">
											<label className="text-sm font-medium text-muted-foreground">Empresa</label>
											<p className="text-sm font-medium">{company.name}</p>
										</div>

										{session?.role && (
											<div className="space-y-2">
												<label className="text-sm font-medium text-muted-foreground">Cargo</label>
												<Badge variant="secondary" className="flex items-center gap-1 w-fit">
													<Briefcase className="w-3 h-3" />
													{session.role}
												</Badge>
											</div>
										)}

										{company.address && (
											<div className="space-y-2">
												<label className="text-sm font-medium text-muted-foreground">
													Endereço
												</label>
												<p className="text-sm">
													{company.address.addressLine}, {company.address.number}
													<br />
													{company.address.neighborhood}, {company.address.city}
													<br />
													{company.address.state}, {company.address.country}
												</p>
											</div>
										)}

										{company.contact && (
											<div className="space-y-2">
												<label className="text-sm font-medium text-muted-foreground">Contato</label>
												<p className="text-sm">{company.contact}</p>
											</div>
										)}
									</>
								) : (
									<p className="text-sm text-muted-foreground">Nenhuma empresa associada</p>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			{imageDialogVariant && (
				<ImageUpload
					onClose={() => setImageDialogVariant(null)}
					variant={imageDialogVariant as "logo" | "gallery"}
					companyId={session?.companyId!}
				/>
			)}
		</>
	)
}
