import { differenceInMinutes, format } from "date-fns";
import { Calendar, MessageCircle, User } from "lucide-react";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { appointmentStatusModalOptions } from "@/constants/appointment-status-modal-option";
import { useGetAppointmentById } from "@/lib/http/generated/endpoints/agendamentos/agendamentos";
import { AppointmentsByCompanyResponseDtoOutputItemsItemStatus } from "@/lib/http/generated/models";
import { formatCurrency } from "@/utils/currency";
import { AppointmentConfirmationModal } from "./appointment-confirmation-modal";
import { InfoCard } from "./info-card";
import { InfoSection } from "./info-section";
import { QuickActions } from "./quick-actions";

type NextStatus = AppointmentsByCompanyResponseDtoOutputItemsItemStatus;

interface AppointmentModalProps {
	appointmentId: string;
	onClose: () => void;
	open: boolean;
}

export const AppointmentModal = ({
	appointmentId,
	onClose,
	open,
}: AppointmentModalProps) => {
	const [nextStatus, setNextStatus] = useState<NextStatus | null>(null);
	const { data: appointment } = useGetAppointmentById(appointmentId);

	if (!appointment) return null;

	const currentStatus = appointmentStatusModalOptions[appointment?.status];
	const handleStatusChange = (status: NextStatus) => setNextStatus(status);

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="w-3xl max-h-[90vh] overflow-y-auto box-border">
				<DialogHeader>
					<div className="flex items-center justify-between">
						<div>
							<DialogTitle className="text-xl font-semibold text-slate-900">
								Gerenciar Agendamento
							</DialogTitle>
							<p className="text-sm text-slate-600 mt-1">
								#{appointment?.id.toString().padStart(4, "0")}
							</p>
						</div>
					</div>
				</DialogHeader>

				{/* Appointment Details */}
				<div className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<InfoSection
								icon={Calendar}
								title="Data e Horário"
								value={`${format(appointment.startDate, "dd/MM/yyyy")} às ${format(appointment.startDate, "HH:mm")}`}
								bgColor="bg-blue-50"
								iconColor="text-blue-600"
							/>

							<InfoSection
								icon={User}
								title="Cliente"
								value={appointment.client.name}
								subtitle={appointment.client.email}
								bgColor="bg-green-50"
								iconColor="text-green-600"
							/>

							<InfoSection
								icon={MessageCircle}
								title="Pet"
								value={appointment.animal.name}
								subtitle={`${appointment.animal.breed?.name} • ${appointment.animal.age} anos`}
								bgColor="bg-purple-50"
								iconColor="text-purple-600"
							/>
						</div>

						<div className="space-y-4">
							<InfoCard title="Serviço">
								<p className="text-slate-900 font-medium">
									{appointment.service.name}
								</p>
								<div className="flex justify-between items-center mt-2">
									<span className="text-sm text-slate-600">
										{differenceInMinutes(
											appointment.endDate,
											appointment.startDate,
										)}{" "}
										minutos
									</span>
									<span className="text-lg font-bold text-slate-900">
										{formatCurrency(appointment.price / 100)}
									</span>
								</div>
							</InfoCard>

							<InfoCard title="Status Atual">
								<div className="flex items-center space-x-2">
									{currentStatus && (
										<>
											<currentStatus.icon className="w-4 h-4" />
											<span
												className={`px-3 py-1 rounded-full text-sm font-medium border ${currentStatus.color}`}
											>
												{currentStatus.label}
											</span>
										</>
									)}
								</div>
							</InfoCard>
						</div>
					</div>

					{/* Quick Actions */}
					<QuickActions
						currentStatus={appointment.status}
						onStatusChange={handleStatusChange}
					/>

					<div className="border-t border-slate-200 pt-6">
						<h3 className="text-lg font-semibold text-slate-900 mb-2">
							Observações
						</h3>
						<p className="text-sm text-slate-500 text-center">
							Nenhuma observação encontrada
						</p>
					</div>
				</div>

				{/* Confirmation Modal */}
				{nextStatus && (
					<AppointmentConfirmationModal
						nextStatus={nextStatus}
						appointmentId={appointmentId}
						onClose={() => setNextStatus(null)}
						open={!!nextStatus}
						companyId={appointment.company.id}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
