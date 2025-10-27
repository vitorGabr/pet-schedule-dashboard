import { useOrganization } from "@clerk/tanstack-react-start";
import { useForm } from "@tanstack/react-form";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { SelectField } from "@/components/form/fields/select-field";
import { TextField } from "@/components/form/fields/text-field";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { staffRolesResource } from "@/constants/staff-roles-resouce";
import { ListStaffByCompanyResponseDtoOutputItemsItemRole } from "@/lib/http";
import { InviteStaffSchema, inviteStaffSchema } from "@/schemas/invite-staff";

interface CreateStaffModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function CreateStaffModal({
	open,
	onOpenChange,
}: CreateStaffModalProps) {
	const { organization } = useOrganization();

	const form = useForm({
		defaultValues: {} as InviteStaffSchema,
		validators: { onChange: inviteStaffSchema },
		onSubmit: async ({ value }) => {
			try {
				await organization?.inviteMember({
					emailAddress: value.email,
					role: `org:${value.role}`,
				});
				toast.success("Convite enviado com sucesso!");
				onOpenChange(false);
			} catch (_) {
				toast.error("Erro ao enviar convite.");
			}
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
							Convidar Novo Funcionário
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
