import { useGetAllCompanyAppointments, useGetSession } from "@/lib/http";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { SiteHeader } from "@/components/site-header";
import { appointmentFilterPageSchema } from "@/schemas/appointment-filter-page";
import { AppointmentModal } from "./-components/appointment-modal";
import { AppointmentsTable } from "./-components/appointments-table";

export const Route = createFileRoute("/(app)/appointments/")({
	component: App,
	validateSearch: zodValidator(appointmentFilterPageSchema),
});

function App() {
	const { page, id, query, status } = Route.useSearch();
	const navigate = Route.useNavigate();
	const { data: session } = useGetSession();
	const { data: appointments, isLoading } = useGetAllCompanyAppointments(
		session?.companyId!,
		{ page, query, status: status || [] },
	);

	return (
		<>
			<SiteHeader title="Agendamentos" />
			<div className="flex flex-1 flex-col space-y-6 p-6">
				<AppointmentsTable
					appointments={appointments?.items || []}
					isLoading={isLoading}
					totalItems={appointments?.meta.total || 0}
					totalPages={appointments?.meta.totalPages || 1}
					query={query}
					status={status}
					page={page}
					onPageChange={(page) =>
						navigate({ to: "/appointments", search: (prev) => ({ ...prev, page }) })
					}
				/>

				{id && (
					<AppointmentModal
						open={!!id}
						appointmentId={id}
						onClose={() =>
							navigate({ to: "/appointments", search: (prev) => ({ ...prev, id: undefined }) })
						}
					/>
				)}
			</div>
		</>
	);
}
