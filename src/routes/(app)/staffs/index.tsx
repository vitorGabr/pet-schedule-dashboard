import { useGetSession, useListStaffByCompany } from "@/lib/http";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { staffFilterPageSchema } from "@/schemas/staff-filter-page";
import { CreateStaffModal } from "./-components/create-staff-modal";
import { StaffFilters } from "./-components/staff-filters";
import { StaffTable } from "./-components/staff-table";

export const Route = createFileRoute("/(app)/staffs/")({
	component: App,
	validateSearch: zodValidator(staffFilterPageSchema),
});

function App() {
	const [openCreateStaffModal, setOpenCreateStaffModal] = useState(false);

	const { page, query, roles } = Route.useSearch();
	const navigate = Route.useNavigate();
	const { data: session } = useGetSession();
	const { data: staff, isLoading } = useListStaffByCompany(
		session?.companyId!,
		{ page, query, roles: roles?.join(",") },
		{ query: { enabled: !!session?.companyId } },
	);

	return (
		<>
			<SiteHeader title="Funcionários" />
			<div className="flex flex-1 flex-col space-y-6 p-6">
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<StaffFilters query={query} roles={roles} />
						<Button onClick={() => setOpenCreateStaffModal(true)}>
							<PlusIcon className="h-4 w-4" />
							Criar Funcionário
						</Button>
					</div>
					<StaffTable
						staff={staff?.items || []}
						isLoading={isLoading}
						totalItems={staff?.meta.total || 0}
						totalPages={staff?.meta.totalPages || 1}
						page={page}
						onPageChange={(page) =>
							navigate({ to: "/staffs", search: (prev) => ({ ...prev, page }) })
						}
					/>
				</div>

				{openCreateStaffModal && (
					<CreateStaffModal
						open={openCreateStaffModal}
						companyId={session?.companyId!}
						onOpenChange={setOpenCreateStaffModal}
					/>
				)}
			</div>
		</>
	);
}
