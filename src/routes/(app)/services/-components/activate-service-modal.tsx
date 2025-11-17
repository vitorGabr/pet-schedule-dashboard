import { useQueryClient } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { CheckCircle, Clock, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	getListServicesByCompanyQueryKey,
	useUpdateService,
} from "@/lib/http/generated/endpoints/serviços/serviços";
import { ServiceResponseListOutputItemsItem } from "@/lib/http/generated/models";
import { formatCurrency } from "@/utils/currency";

interface ActivateServiceModalProps {
	service?: ServiceResponseListOutputItemsItem;
	onClose: () => void;
}

export function ActivateServiceModal({
	service,
	onClose,
}: ActivateServiceModalProps) {
	const { companyId } = useRouteContext({ from: "/(app)" }) as any;
	const queryClient = useQueryClient();
	const { mutate, isPending } = useUpdateService({
		mutation: {
			onSuccess: () => {
				onClose();
				queryClient.invalidateQueries({
					queryKey: getListServicesByCompanyQueryKey(companyId),
				});
			},
		},
	});

	if (!service) return null;

	return (
		<Dialog open={!!service} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
							<CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
						</div>
						<div>
							<DialogTitle className="text-left text-lg font-semibold">
								Ativar Serviço
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
								<span className="font-medium">
									{formatCurrency(service.price / 100)}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<Clock className="h-4 w-4 text-blue-600" />
								<span>{service.duration}</span>
							</div>
						</div>
					</div>

					<div className="rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 p-3">
						<p className="text-sm text-green-800 dark:text-green-200">
							<strong>Observação:</strong> Ao ativar este serviço, ele ficará
							disponível para novos agendamentos imediatamente.
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
						variant="default"
						onClick={() =>
							mutate({
								id: service.id,
								companyId: service.companyId,
								data: { isActive: true },
							})
						}
						disabled={isPending}
						className="w-full sm:w-auto"
					>
						{isPending ? "Ativando..." : "Ativar Serviço"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
