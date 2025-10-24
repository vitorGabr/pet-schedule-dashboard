import { Link } from "@tanstack/react-router";
import { Eye, Trash } from "lucide-react";
import type { ServiceResponseListOutputItemsItem } from "@/lib/http";
import { formatCurrency } from "@/utils/currency";

interface ServiceCardProps {
	service: ServiceResponseListOutputItemsItem;
	onDeactivateService: () => void;
}

export function ServiceCard({
	service,
	onDeactivateService,
}: ServiceCardProps) {
	return (
		<Link to={`/services`} search={{ id: service.id }}>
			<div className="bg-white h-full border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
				<div className="flex flex-col">
					<div className="flex justify-between items-start mb-4">
						<div>
							<h3 className="font-semibold text-gray-900">{service.name}</h3>
						</div>
						<div className="flex space-x-2">
							<Eye className="w-4 h-4 text-gray-400 hover:text-blue-600 transition-colors" />
							<button
								type="button"
								className="text-gray-400 disabled:text-gray-400 hover:disabled:text-gray-400 hover:text-red-600"
								onClick={(e) => {
									e.preventDefault(); // 🔑 evita que o Link seja acionado
									e.stopPropagation();
									onDeactivateService();
								}}
								disabled={!service.isActive}
							>
								<Trash className="w-4 h-4" />
							</button>
						</div>
					</div>

					<p className="text-gray-600 text-sm mb-4">{service.description}</p>
				</div>

				<div className="flex justify-between items-center flex-1">
					<div>
						<p className="text-lg font-bold text-gray-900">
							{formatCurrency(service.price)}
						</p>
						<p className="text-sm text-gray-500">{service.duration} minutos</p>
					</div>
					<div className="flex items-center">
						<div
							className={`w-2 h-2 rounded-full mr-2 ${service.isActive ? "bg-green-500" : "bg-red-500"}`}
						></div>
						<span
							className={`text-sm ${service.isActive ? "text-green-600" : "text-red-600"}`}
						>
							{service.isActive ? "Ativo" : "Inativo"}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
