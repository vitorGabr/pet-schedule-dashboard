import { Check, Play, User, X } from "lucide-react";
import type React from "react";
import type { AppointmentByIdResponseDtoOutputStatus } from "@/lib/http";
import { ActionButton } from "./action-button";

interface QuickActionsProps {
	currentStatus: AppointmentByIdResponseDtoOutputStatus;
	onStatusChange: (status: AppointmentByIdResponseDtoOutputStatus) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
	currentStatus,
	onStatusChange,
}) => {
	const renderActions = () => {
		switch (currentStatus) {
			case "scheduled":
				return (
					<>
						<ActionButton
							icon={Check}
							label="Confirmar"
							onClick={() => onStatusChange("confirmed")}
							variant="success"
						/>
						<ActionButton
							icon={X}
							label="Cancelar"
							onClick={() => onStatusChange("canceled")}
							variant="danger"
						/>
						<ActionButton
							icon={User}
							label="Não Compareceu"
							onClick={() => onStatusChange("no_show")}
							variant="neutral"
						/>
					</>
				);

			case "confirmed":
				return (
					<>
						<ActionButton
							icon={Play}
							label="Iniciar"
							onClick={() => onStatusChange("in_progress")}
							variant="warning"
						/>
						<ActionButton
							icon={X}
							label="Cancelar"
							onClick={() => onStatusChange("canceled")}
							variant="danger"
						/>
						<ActionButton
							icon={User}
							label="Não Foi"
							onClick={() => onStatusChange("no_show")}
							variant="neutral"
						/>
					</>
				);

			case "in_progress":
				return (
					<>
						<ActionButton
							icon={Check}
							label="Concluir"
							onClick={() => onStatusChange("completed")}
							variant="success"
						/>
						<ActionButton
							icon={X}
							label="Cancelar"
							onClick={() => onStatusChange("canceled")}
							variant="danger"
						/>
					</>
				);

			case "completed":
			case "no_show":
			case "canceled":
				return (
					<div className="col-span-full text-center py-4">
						<p className="text-sm text-slate-500">
							Nenhuma ação disponível para este status
						</p>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="border-t border-slate-200 pt-6">
			<h3 className="text-lg font-semibold text-slate-900 mb-4">
				Ações Rápidas
			</h3>
			<div className="grid grid-cols-2 md:grid-cols-5 gap-3">
				{renderActions()}
			</div>
		</div>
	);
};
