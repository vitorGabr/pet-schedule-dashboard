import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Clock, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { ServiceResponseListOutputItemsItem } from "@/lib/http";
import {
	getListServicesByCompanyQueryKey,
	useDeactivateService,
} from "@/lib/http";

interface DeactivateServiceModalProps {
	service: ServiceResponseListOutputItemsItem;
	onClose: () => void;
}

export function DeactivateServiceModal({
	service,
	onClose,
}: DeactivateServiceModalProps) {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useDeactivateService({
		mutation: {
			onSuccess: () => {
				onClose();
				queryClient.invalidateQueries({
					queryKey: getListServicesByCompanyQueryKey(service?.companyId!),
				});
			},
		},
	});

	if (!service) return null;

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
							<AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
						</div>
						<div>
							<DialogTitle className="text-left text-lg font-semibold">
								Inativar Serviço
							</DialogTitle>
							<DialogDescription className="text-left text-sm text-muted-foreground">
								Esta ação pode ser revertida posteriormente
							</DialogDescription>
						</div>
					</div>
				</DialogHeader>

				<div className="space-y-4">
					<div className="rounded-lg border bg-muted/50 p-4">
						<h4 className="font-medium text-foreground mb-2">{service.name}</h4>
						<p className="text-sm text-muted-foreground mb-3">
							{service.description}
						</p>

						<div className="flex items-center gap-4 text-sm">
							<div className="flex items-center gap-1">
								<Coins className="h-4 w-4 text-green-600" />
								<span className="font-medium">{service.price}</span>
							</div>
							<div className="flex items-center gap-1">
								<Clock className="h-4 w-4 text-blue-600" />
								<span>{service.duration}</span>
							</div>
						</div>
					</div>

					<div className="rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 p-3">
						<p className="text-sm text-orange-800 dark:text-orange-200">
							<strong>Atenção:</strong> Ao inativar este serviço, ele não estará
							mais disponível para novos agendamentos. Agendamentos existentes
							não serão afetados.
						</p>
					</div>
				</div>

				<DialogFooter className="gap-2">
					<Button
						variant="outline"
						onClick={onClose}
						disabled={isPending}
						className="w-full sm:w-auto bg-transparent"
					>
						Cancelar
					</Button>
					<Button
						variant="destructive"
						onClick={() =>
							mutate({ id: service.id, companyId: service.companyId })
						}
						disabled={isPending}
						className="w-full sm:w-auto"
					>
						{isPending ? "Inativando..." : "Inativar Serviço"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
