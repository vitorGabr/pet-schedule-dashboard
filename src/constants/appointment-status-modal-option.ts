import { Check, type LucideIcon, Play, User, X } from "lucide-react";
import type { AppointmentsByCompanyResponseDtoOutputItemsItemStatus } from "@/lib/http";

export const appointmentStatusModalOptions: Partial<
	Record<
		AppointmentsByCompanyResponseDtoOutputItemsItemStatus,
		{ label: string; color: string; icon: LucideIcon; description: string }
	>
> = {
	scheduled: {
		label: "Confirmado",
		color: "bg-blue-100 text-blue-800 border-blue-200",
		icon: Check,
		description: "Agendamento confirmado pelo cliente",
	},
	in_progress: {
		label: "Em Andamento",
		color: "bg-yellow-100 text-yellow-800 border-yellow-200",
		icon: Play,
		description: "Serviço sendo executado no momento",
	},
	completed: {
		label: "Concluído",
		color: "bg-green-100 text-green-800 border-green-200",
		icon: Check,
		description: "Serviço finalizado com sucesso",
	},
	canceled: {
		label: "Cancelado",
		color: "bg-red-100 text-red-800 border-red-200",
		icon: X,
		description: "Agendamento cancelado",
	},
	no_show: {
		label: "Não Compareceu",
		color: "bg-gray-100 text-gray-800 border-gray-200",
		icon: User,
		description: "Cliente não compareceu no horário",
	},
};
