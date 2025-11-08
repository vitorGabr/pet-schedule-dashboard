import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { useListServicesByCompany } from "@/lib/http/generated/endpoints/serviços/serviços";
import { ServiceResponseListOutputItemsItem } from "@/lib/http/generated/models";
import { pageSearchSchema } from "@/schemas/page-search";
import { ActivateServiceModal } from "./-components/activate-service-modal";
import { DeactivateServiceModal } from "./-components/deactivate-service-modal";
import { EmptyServices } from "./-components/empty-services";
import { ServiceCard } from "./-components/service-card";
import { ServiceFormModal } from "./-components/service-form-modal";
import { ServicesSkeleton } from "./-components/services-skeleton";

type Service = ServiceResponseListOutputItemsItem;
type Action =
	| { type: "edit" | "deactivate" | "activate"; service: Service }
	| { type: "create" };

export const Route = createFileRoute("/(app)/services/")({
	component: ServicePage,
	validateSearch: pageSearchSchema,
});

function ServicePage() {
	const { companyId } = Route.useRouteContext();
	const [action, setAction] = useState<Action | null>(null);
	const { data: services, isLoading } = useListServicesByCompany(companyId);

	if (isLoading) return <ServicesSkeleton />;

	return (
		<>
			<SiteHeader title="Serviços" />
			{!services?.items.length ? (
				<EmptyServices onCreateService={() => setAction({ type: "create" })} />
			) : (
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
					<div className="flex justify-end">
						<Button onClick={() => setAction({ type: "create" })}>
							<PlusIcon className="h-4 w-4" />
							Criar Serviço
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
						{services?.items.map((service) => (
							<ServiceCard
								key={service.id}
								service={service}
								onAction={(type) => setAction({ type, service })}
							/>
						))}
					</div>
				</div>
			)}
			<ServiceFormModal
				onOpenChange={() => setAction(null)}
				companyId={companyId!}
				open={["create", "edit"].includes(action?.type || "")}
				service={action?.type === "edit" ? action.service : undefined}
			/>
			<DeactivateServiceModal
				service={action?.type === "deactivate" ? action.service : undefined}
				onClose={() => setAction(null)}
			/>
			<ActivateServiceModal
				service={action?.type === "activate" ? action.service : undefined}
				onClose={() => setAction(null)}
			/>
		</>
	);
}
