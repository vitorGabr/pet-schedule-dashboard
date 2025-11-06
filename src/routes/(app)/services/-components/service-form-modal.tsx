import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, PlusIcon } from "lucide-react";
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
	open: boolean;
	onOpenChange: (open: boolean) => void;
	service?: ServiceResponseListOutputItemsItem;
}

export function ServiceFormModal({
	companyId,
	open,
	onOpenChange,
	service,
}: ServiceFormModalProps) {
	const queryClient = useQueryClient();
	const { data: categories } = useListAllCategories();
	const isEditing = !!service;

	const form = useForm({
		defaultValues: service
			? {
					name: service.name,
					description: service.description ?? "",
					categoryId: "",
					duration: service.duration,
					price: service.price / 100,
					rules: service.rulesPrompt ?? "",
				}
			: ({} as CreateServiceBody),
		validators: { onChange: createServiceBody },
		onSubmit: async ({ value }) => {
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
		},
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<div className="flex items-center gap-2">
						<div
							className={`p-2 ${isEditing ? "bg-blue-100" : "bg-green-100"} rounded-lg`}
						>
							{isEditing ? (
								<Pencil className="h-4 w-4 text-blue-600" />
							) : (
								<PlusIcon className="h-4 w-4 text-green-600" />
							)}
						</div>
						<DialogTitle className="text-xl font-semibold">
							{isEditing ? "Editar Serviço" : "Criar Novo Serviço"}
						</DialogTitle>
					</div>
				</DialogHeader>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-6"
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
								<TextField
									label="Descrição"
									placeholder="Descrição do Serviço"
									field={field}
								/>
							);
						}}
					/>
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

					<DialogFooter className="gap-2">
						<form.Subscribe
							selector={(state) => [state.isSubmitting]}
							children={([isPending]) => (
								<>
									<Button
										type="button"
										variant="outline"
										onClick={() => onOpenChange(false)}
										disabled={isPending}
									>
										Cancelar
									</Button>
									<Button
										type="submit"
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
				</form>
			</DialogContent>
		</Dialog>
	);
}
