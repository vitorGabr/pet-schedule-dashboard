import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { appointmentStatusResource } from "@/constants/appointment-status";
import { useGetAllCompanyAppointments } from "@/lib/http/generated/endpoints/agendamentos/agendamentos";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/currency";

export function AppointmentsToday({ companyId }: { companyId: string }) {
	const { data: appointments, status } = useGetAllCompanyAppointments(
		companyId,
		{ status: ["scheduled", "confirmed", "in_progress"].join(",") },
	);

	return (
		<div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/60 p-6 hover:shadow-card transition-all duration-200">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-semibold text-slate-900">
					Últimos agendamentos
				</h3>
				<Link
					to="/appointments"
					className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
				>
					Ver todos
				</Link>
			</div>
			<div className="flex flex-col gap-4">
				{appointments?.items.map((appointment, index) => (
					<Link to={`/appointments`} key={appointment.id}>
						<div
							className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:border-slate-200 hover:shadow-soft transition-all duration-200"
							style={{ animationDelay: `${index * 50}ms` }}
						>
							<div className="flex items-center space-x-4">
								<Avatar className="w-10 h-10 border">
									<AvatarImage src={appointment.client.avatarUrl} />
									<AvatarFallback>
										{appointment.client.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="font-medium text-slate-900">
										{appointment.client.name}
									</p>
									<p className="text-sm text-slate-600">
										{appointment.animal.name}
									</p>
									<p className="text-xs text-slate-500">
										{appointment.service.name}
									</p>
								</div>
							</div>
							<div className="text-right">
								<p className="font-semibold text-slate-900">
									{format(appointment.startDate, "dd/MM/yyyy HH:mm")}
								</p>
								<p className="text-sm font-medium text-slate-600">
									{formatCurrency(appointment.price / 100)}
								</p>
								<Badge variant={"secondary"}>
									<div
										className={cn(
											"size-1.5 rounded-full mr-1",
											appointment.status === "scheduled" && "bg-yellow-500",
											appointment.status === "confirmed" && "bg-green-500",
											appointment.status === "in_progress" && "bg-yellow-500",
											appointment.status === "completed" && "bg-green-500",
											appointment.status === "canceled" && "bg-red-500",
											appointment.status === "no_show" && "bg-red-500",
										)}
									/>
									{appointmentStatusResource[appointment.status]}
								</Badge>
							</div>
						</div>
					</Link>
				))}
				{status === "success" && !appointments.items.length && (
					<div className="flex items-center justify-center h-full">
						<p className="text-sm text-slate-600">
							Nenhum agendamento encontrado
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
