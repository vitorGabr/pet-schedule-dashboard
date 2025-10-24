import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { appointmentStatusResource } from "@/constants/appointment-status";
import type { AppointmentsByCompanyResponseDtoOutputItemsItemStatus } from "@/lib/http";
import {
	getGetAllCompanyAppointmentsQueryKey,
	getGetAppointmentByIdQueryKey,
	useUpdateAppointmentStatus,
} from "@/lib/http";

interface AppointmentConfirmationModalProps {
	nextStatus: AppointmentsByCompanyResponseDtoOutputItemsItemStatus;
	appointmentId: string;
	companyId: string;
	onClose: () => void;
	open: boolean;
}

export function AppointmentConfirmationModal({
	nextStatus,
	appointmentId,
	companyId,
	onClose,
	open,
}: AppointmentConfirmationModalProps) {
	const queryClient = useQueryClient();
	const { mutate: changeStatus, isPending } = useUpdateAppointmentStatus({
		mutation: {
			onSuccess: () => {
				queryClient.setQueryData(
					getGetAppointmentByIdQueryKey(appointmentId),
					(oldData: any) => {
						if (oldData) {
							return { ...oldData, status: nextStatus };
						}
						return oldData;
					},
				);

				queryClient.invalidateQueries({
					queryKey: getGetAllCompanyAppointmentsQueryKey(companyId),
				});

				onClose();
			},
		},
	});

	return (
		<AlertDialog open={open} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex items-center space-x-3">
						<div className="p-2 bg-orange-100 rounded-lg">
							<AlertTriangle className="w-6 h-6 text-orange-600" />
						</div>
						<AlertDialogTitle>Confirmar Ação</AlertDialogTitle>
					</div>
				</AlertDialogHeader>

				<AlertDialogDescription className="text-slate-600">
					Tem certeza que deseja alterar o status para "
					{appointmentStatusResource[nextStatus]}"?
				</AlertDialogDescription>

				<div className="mb-4">
					<label
						htmlFor="observations"
						className="block text-sm font-medium text-slate-700 mb-2"
					>
						Observações (opcional)
					</label>
					<textarea
						className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
						rows={3}
						placeholder="Adicione uma observação sobre esta alteração..."
					/>
				</div>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						disabled={isPending}
						onClick={() => {
							changeStatus({ id: appointmentId, data: { status: nextStatus } });
						}}
						className="bg-primary hover:bg-primary/80"
					>
						Confirmar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
