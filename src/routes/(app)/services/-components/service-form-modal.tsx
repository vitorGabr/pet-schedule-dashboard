import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { SelectField } from "@/components/form/fields/select-field";
import { TextAreaField } from "@/components/form/fields/text-area-field";
import { TextField } from "@/components/form/fields/text-field";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { useListAllCategories } from "@/lib/http/generated/endpoints/categorias/categorias";
import {
	createService,
	getListServicesByCompanyQueryKey,
	updateService,
} from "@/lib/http/generated/endpoints/serviços/serviços";
import { ServiceResponseListOutputItemsItem } from "@/lib/http/generated/models";
import { CreateServiceBody, createServiceBody } from "@/schemas/create-service";

interface ServiceFormModalProps {
	companyId: string;
	onOpenChange: (open: boolean) => void;
	service?: ServiceResponseListOutputItemsItem;
	open?: boolean;
}

export function ServiceFormModal({
	companyId,
	onOpenChange,
	service,
	open,
}: ServiceFormModalProps) {
	const queryClient = useQueryClient();
	const { data: categories } = useListAllCategories();
	const isEditing = !!service;

	const form = useForm({
		defaultValues: service
			? {
					name: service.name,
					description: service.description ?? "",
					categoryId: service.categoryIds?.[0],
					duration: service.duration,
					price: service.price / 100,
					rules: service.rulesPrompt ?? "",
				}
			: ({} as CreateServiceBody),
		validators: { onChange: createServiceBody },
		onSubmit: async ({ value }) => {
			try {
				const payload = { ...value, price: value.price * 100 };
				if (isEditing) {
					await updateService(service.id, companyId, payload);
				} else {
					await createService(companyId, payload);
				}
				queryClient.invalidateQueries({
					queryKey: getListServicesByCompanyQueryKey(companyId),
				});
				onOpenChange(false);
				toast.success(
					`Serviço ${isEditing ? "atualizado" : "criado"} com sucesso!`,
				);
			} catch (error) {
				if (error instanceof AxiosError) {
					toast.error(
						error.response?.data.message ||
							"Ocorreu um erro ao salvar o serviço.",
					);
				}
			}
		},
	});

	const onClose = () => {
		form.reset();
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl px-0 py-0 gap-0">
				<DialogHeader className="px-4 border-b py-4 flex flex-row items-center gap-2">
					<div
						className={`p-2 bg-green-100 rounded-lg`}
					>
						<Pencil className="h-4 w-4 text-green-600" />
					</div>
					<DialogTitle className="text-xl font-semibold">
						{isEditing ? "Editar Serviço" : "Criar Novo Serviço"}
					</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-6 max-h-[70vh] overflow-y-auto px-4 py-4"
				>
					{/* Nome do Serviço */}
					<form.Field
						name="name"
						children={(field) => {
							return (
								<TextField
									label="Nome do Serviço"
									placeholder="Nome do Serviço"
									field={field}
								/>
							);
						}}
					/>

					{/* Descrição */}
					<form.Field
						name="description"
						children={(field) => {
							return (
								<TextAreaField
									label="Descrição"
									placeholder="Descrição do Serviço"
									field={field}
								/>
							);
						}}
					/>
					<div className="w-full">
						<form.Field
							name="categoryId"
							children={(field) => {
								return (
									<SelectField
										field={field}
										label="Categoria"
										placeholder="Selecione a categoria"
										options={
											categories?.items?.map((category) => ({
												label: category.name,
												value: category.id,
											})) ?? []
										}
									/>
								);
							}}
						/>
					</div>

					{/* Preço e Duração */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<form.Field
							name="duration"
							children={(field) => {
								return (
									<TextField
										label="Duração (minutos)"
										placeholder="Duração do Serviço"
										type="number"
										field={field}
									/>
								);
							}}
						/>

						<form.Field
							name="price"
							children={(field) => {
								return (
									<TextField
										label="Preço"
										placeholder="Preço do Serviço"
										type="number"
										field={field}
									/>
								);
							}}
						/>
					</div>

					

					{/* Regras */}
					<form.Field
						name="rules"
						children={(field) => {
							return (
								<TextAreaField
									label="Regras"
									placeholder="Descreva as regras, condições e requisitos para este serviço..."
									field={field}
								/>
							);
						}}
					/>

					<form.Field
						name="requiresPayment"
						children={(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field orientation="horizontal" data-invalid={isInvalid}>
									<FieldContent>
										<FieldLabel htmlFor="form-tanstack-switch-twoFactor">
											Requer Pagamento
										</FieldLabel>
										<FieldDescription>
											Ative o pagamento para este serviço. Ao ativar, os
											clientes serão obrigados a pagar antes de agendar.
										</FieldDescription>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</FieldContent>
									<Switch
										id="form-tanstack-switch-twoFactor"
										name={field.name}
										checked={field.state.value}
										onCheckedChange={field.handleChange}
										aria-invalid={isInvalid}
									/>
								</Field>
							);
						}}
					/>
					
				</form>
				<DialogFooter className="gap-2 border-t py-3 px-4">
					<form.Subscribe
						selector={(state) => [state.isSubmitting]}
						children={([isPending]) => (
							<>
								<Button
									type="button"
									variant="outline"
									onClick={onClose}
									disabled={isPending}
								>
									Cancelar
								</Button>
								<Button
									onClick={() => form.handleSubmit()}
									disabled={isPending}
									className={
										isEditing
											? "bg-blue-600 hover:bg-blue-700"
											: "bg-green-600 hover:bg-green-700"
									}
								>
									{isPending
										? isEditing
											? "Atualizando..."
											: "Criando..."
										: isEditing
											? "Atualizar Serviço"
											: "Criar Serviço"}
								</Button>
							</>
						)}
					/>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
