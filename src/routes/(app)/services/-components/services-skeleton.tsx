import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function ServicesSkeleton() {
	const serviceCards = [
		{ id: "service-1" },
		{ id: "service-2" },
		{ id: "service-3" },
		{ id: "service-4" },
		{ id: "service-5" },
		{ id: "service-6" },
	];

	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<Skeleton className="h-8 w-32 mb-2" />
					<Skeleton className="h-4 w-48" />
				</div>
				<Button disabled>
					<PlusIcon className="h-4 w-4" />
					Criar Serviço
				</Button>
			</div>

			{/* Service Cards Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{serviceCards.map((card) => (
					<div
						key={card.id}
						className="bg-white border border-gray-200 rounded-lg p-6"
					>
						<div className="flex justify-between items-start mb-4">
							<div>
								<Skeleton className="h-5 w-32 mb-1" />
							</div>
							<div className="flex space-x-2">
								<Skeleton className="w-4 h-4 rounded" />
								<Skeleton className="w-4 h-4 rounded" />
							</div>
						</div>

						<div className="space-y-2 mb-4">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-3/4" />
						</div>

						<div className="flex justify-between items-center">
							<div>
								<Skeleton className="h-6 w-20 mb-1" />
								<Skeleton className="h-4 w-24" />
							</div>
							<div className="flex items-center">
								<Skeleton className="w-2 h-2 rounded-full mr-2" />
								<Skeleton className="h-4 w-12" />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
