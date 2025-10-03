import {
	getListStaffByCompanyQueryKey,
	type InviteEmployeeMutationBody,
	inviteEmployee,
	inviteEmployeeBody,
	ListStaffByCompanyResponseDtoOutputItemsItemRole,
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
import { toast } from "sonner";
import { SelectField } from "@/components/form/fields/select-field";
import { TextField } from "@/components/form/fields/text-field";
import { staffRolesResource } from "@/constants/staff-roles-resouce";

interface CreateStaffModalProps {
	companyId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CreateStaffModal({
	companyId,
	open,
	onOpenChange,
}: CreateStaffModalProps) {
	const queryClient = useQueryClient();

	const form = useForm({
		defaultValues: {} as InviteEmployeeMutationBody,
		validators: { onChange: inviteEmployeeBody },
		onSubmit: async (values) => {
			const response = await inviteEmployee(values.value);
			toast.success(response.message);
			queryClient.invalidateQueries({
				queryKey: getListStaffByCompanyQueryKey(companyId),
			});
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
						<DialogTitle className="text-xl font-semibold">
							Criar Novo Funcionário
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
									label="Nome do Funcionário"
									placeholder="Ex: João da Silva"
									field={field}
								/>
							);
						}}
					/>

					{/* Descrição */}
					<form.Field
						name="email"
						children={(field) => {
							return (
								<TextField
									label="Email"
									placeholder="Ex: joao@example.com"
									type="email"
									field={field}
								/>
							);
						}}
					/>
					<form.Field
						name="role"
						children={(field) => {
							return (
								<SelectField
									field={field}
									label="Cargo"
									placeholder="Selecione o cargo"
									options={
										Object.values(
											ListStaffByCompanyResponseDtoOutputItemsItemRole,
										).map((role) => ({
											label: staffRolesResource[role],
											value: role,
										})) ?? []
									}
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
										{isPending ? "Criando..." : "Criar Funcionário"}
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
