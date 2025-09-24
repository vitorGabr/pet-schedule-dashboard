import {
	type CreateServiceMutationBody,
	createService,
	createServiceBody,
	getListServicesByCompanyQueryKey,
	useListAllCategories,
} from "@/lib/http";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { SelectField } from "@/components/form/fields/select-field";
import { TextAreaField } from "@/components/form/fields/text-area-field";
import { TextField } from "@/components/form/fields/text-field";

interface CreateServiceModalProps {
	companyId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CreateServiceModal({ companyId, open, onOpenChange }: CreateServiceModalProps) {
	const queryClient = useQueryClient();
	const { data: categories } = useListAllCategories();

	const form = useForm({
		defaultValues: {} as CreateServiceMutationBody,
		validators: { onChange: createServiceBody },
		onSubmit: async (values) => {
			await createService(values.value);
			queryClient.invalidateQueries({ queryKey: getListServicesByCompanyQueryKey(companyId) });
			onOpenChange(false);
		},
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<div className="flex items-center gap-2">
						<div className="p-2 bg-green-100 rounded-lg">
							<PlusIcon className="h-4 w-4 text-green-600" />
						</div>
						<DialogTitle className="text-xl font-semibold">Criar Novo Serviço</DialogTitle>
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
								<TextField label="Nome do Serviço" placeholder="Nome do Serviço" field={field} />
							);
						}}
					/>

					{/* Descrição */}
					<form.Field
						name="description"
						children={(field) => {
							return (
								<TextField label="Descrição" placeholder="Descrição do Serviço" field={field} />
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
										className="bg-green-600 hover:bg-green-700"
									>
										{isPending ? "Criando..." : "Criar Serviço"}
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
