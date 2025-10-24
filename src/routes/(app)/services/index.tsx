import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import type { ServiceResponseListOutputItemsItem } from "@/lib/http";
import { useListServicesByCompany } from "@/lib/http";
import { pageSearchSchema } from "@/schemas/page-search";
import { CreateServiceModal } from "./-components/create-service-modal";
import { DeactivateServiceModal } from "./-components/deactivate-service-modal";
import { ServiceCard } from "./-components/service-card";
import { ServiceViewModal } from "./-components/service-view-modal";
import { ServicesSkeleton } from "./-components/services-skeleton";

export const Route = createFileRoute("/(app)/services/")({
	component: ServicePage,
	validateSearch: pageSearchSchema,
});

function ServicePage() {
	const { companyId } = useRouteContext({ from: "/(app)" });
	const { id } = Route.useSearch();
	const navigate = Route.useNavigate();

	const [createServiceModalOpen, setCreateServiceModalOpen] = useState(false);
	const [deactivateServiceSelected, setDeactivateServiceSelected] =
		useState<ServiceResponseListOutputItemsItem | null>(null);
	const { data: services, isLoading } = useListServicesByCompany(companyId);

	if (isLoading) {
		return <ServicesSkeleton />;
	}

	return (
		<>
			<SiteHeader title="Serviços" />
			<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
				<div className="flex justify-end">
					<Button onClick={() => setCreateServiceModalOpen(true)}>
						<PlusIcon className="h-4 w-4" />
						Criar Serviço
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
					{services?.items.map((service) => (
						<ServiceCard
							key={service.id}
							service={service}
							onDeactivateService={() => setDeactivateServiceSelected(service)}
						/>
					))}
				</div>

				{id && (
					<ServiceViewModal
						serviceId={id}
						onOpenChange={() => {
							navigate({
								to: "/services",
								search: (search) => ({ ...search, id: undefined }),
							});
						}}
					/>
				)}
				<CreateServiceModal
					open={createServiceModalOpen}
					onOpenChange={setCreateServiceModalOpen}
					companyId={companyId!}
				/>
				<DeactivateServiceModal
					service={deactivateServiceSelected!}
					onClose={() => setDeactivateServiceSelected(null)}
				/>
			</div>
		</>
	);
}
