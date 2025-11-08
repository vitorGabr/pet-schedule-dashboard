import { EyeIcon, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceResponseListOutputItemsItem } from "@/lib/http/generated/models";
import { formatCurrency } from "@/utils/currency";

interface ServiceCardProps {
	service: ServiceResponseListOutputItemsItem;
	onAction: (action: "edit" | "deactivate" | "activate") => void;
}

export function ServiceCard({ service, onAction }: ServiceCardProps) {
	return (
		<div
			onClick={() => onAction("edit")}
			className="bg-white cursor-pointer h-full border border-gray-200 rounded-lg py-5 px-6 [&_svg]:size-4"
		>
			<div className="flex flex-col">
				<div className="flex justify-between items-center">
					<h3 className="font-semibold text-gray-900">{service.name}</h3>
					<div className="flex">
						<Button
							size={"icon"}
							variant={"ghost"}
							className="text-gray-400"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onAction("edit");
							}}
						>
							<Pencil />
						</Button>
						<Button
							size={"icon"}
							variant={"ghost"}
							className="text-gray-400"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onAction(service.isActive ? "deactivate" : "activate");
							}}
						>
							{!service.isActive ? <EyeIcon /> : <Trash />}
						</Button>
					</div>
				</div>

				<p className="text-gray-600 text-sm mb-4">{service.description}</p>
			</div>

			<div className="flex justify-between items-center flex-1">
				<div>
					<p className="text-lg font-bold text-gray-900">
						{formatCurrency(service.price / 100)}
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
	);
}
