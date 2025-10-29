import { AppointmentsByCompanyResponseDtoOutputItemsItemStatus } from "@/lib/http/generated/models";

export const appointmentStatusResource = {
	confirmed: "Confirmado",
	scheduled: "Pendente",
	canceled: "Cancelado",
	completed: "Concluído",
	in_progress: "Em andamento",
	no_show: "Não compareceu",
} satisfies Record<
	AppointmentsByCompanyResponseDtoOutputItemsItemStatus,
	string
>;
