import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { useGetSession, useListCompanyClients } from "@/lib/http";
import { pageSearchSchema } from "@/schemas/page-search";
import { ClientFilters } from "./-components/client-filters";
import { ClientTable } from "./-components/client-table";

export const Route = createFileRoute("/(app)/clients/")({
	component: App,
	validateSearch: pageSearchSchema,
});

function App() {
	const { page, query } = Route.useSearch();
	const navigate = Route.useNavigate();
	const { data: session } = useGetSession();
	const { data: clients, isLoading } = useListCompanyClients(
		session?.companyId!,
		{ page, search: query },
		{ query: { enabled: !!session?.companyId } },
	);

	return (
		<>
			<SiteHeader title="Clientes" />
			<div className="flex flex-1 flex-col space-y-6 p-6">
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<ClientFilters search={query} />
					</div>
					<ClientTable
						clients={clients?.items}
						isLoading={isLoading}
						totalItems={clients?.meta.total || 0}
						totalPages={clients?.meta.totalPages || 1}
						page={page}
						onPageChange={(page) =>
							navigate({
								to: "/clients",
								search: (prev) => ({ ...prev, page }),
							})
						}
					/>
				</div>
			</div>
		</>
	);
}
