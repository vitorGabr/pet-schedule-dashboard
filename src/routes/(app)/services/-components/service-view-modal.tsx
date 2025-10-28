import { Building, Clock, Coins, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useGetServiceById } from "@/lib/http";
import { formatCurrency } from "@/utils/currency";

type ServiceViewModalProps = {
	serviceId: string;
	onOpenChange: (open: boolean) => void;
};

export function ServiceViewModal({
	serviceId,
	onOpenChange,
}: ServiceViewModalProps) {
	const { data: service } = useGetServiceById(serviceId);
	if (!service) return null;

	const formatDuration = (minutes: number) => {
		if (minutes < 60) {
			return `${minutes} minutos`;
		}
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		if (remainingMinutes === 0) {
			return `${hours} ${hours === 1 ? "hora" : "horas"}`;
		}
		return `${hours}h ${remainingMinutes}min`;
	};

	return (
		<Dialog open={true} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<div className="flex items-center justify-between">
						<DialogTitle className="text-xl font-semibold">
							{service.name}
						</DialogTitle>
						<Badge
							variant={service.isActive ? "default" : "secondary"}
							className={
								service.isActive ? "bg-green-500 hover:bg-green-600" : ""
							}
						>
							{service.isActive ? "Ativo" : "Inativo"}
						</Badge>
					</div>
				</DialogHeader>

				<div className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
					{/* Descrição */}
					{service.description && (
						<div>
							<h3 className="font-medium text-sm text-muted-foreground mb-2">
								Descrição
							</h3>
							<p className="text-sm">{service.description}</p>
						</div>
					)}

					{/* Informações principais */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
							<div className="p-2 bg-green-100 rounded-lg">
								<Coins className="h-4 w-4 text-green-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Preço</p>
								<p className="font-semibold">
									{formatCurrency(service.price / 100)}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
							<div className="p-2 bg-blue-100 rounded-lg">
								<Clock className="h-4 w-4 text-blue-600" />
							</div>
							<div>
								<p className="text-sm text-muted-foreground">Duração</p>
								<p className="font-semibold">
									{formatDuration(service.duration ?? 0)}
								</p>
							</div>
						</div>
					</div>

					{/* Empresa */}
					<div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
						<div className="p-2 bg-orange-100 rounded-lg">
							<Building className="h-4 w-4 text-orange-600" />
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Empresa</p>
							<p className="font-semibold">{service.company.name}</p>
						</div>
					</div>

					{/* Categorias */}
					{service.categories.length > 0 && (
						<div>
							<div className="flex items-center gap-2 mb-3">
								<Tag className="h-4 w-4 text-muted-foreground" />
								<h3 className="font-medium text-sm text-muted-foreground">
									Categorias
								</h3>
							</div>
							<div className="flex flex-wrap gap-2">
								{service.categories.map((category) => (
									<Badge
										key={category.id}
										variant="outline"
										className="text-xs"
									>
										{category.name}
									</Badge>
								))}
							</div>
						</div>
					)}

					{/* Detalhes adicionais */}
					{service.details && (
						<div>
							<h3 className="font-medium text-sm text-muted-foreground mb-2">
								Detalhes Adicionais
							</h3>
							<div className="p-3 bg-muted/50 rounded-lg">
								<pre className="text-xs text-muted-foreground whitespace-pre-wrap">
									{typeof service.details === "string"
										? service.details
										: JSON.stringify(service.details, null, 2)}
								</pre>
							</div>
						</div>
					)}

					{/* ID do serviço (para referência) */}
					<div className="pt-4 border-t">
						<p className="text-xs text-muted-foreground">
							ID: <span className="font-mono">{service.id}</span>
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
