import { Skeleton } from "@/components/ui/skeleton";

export function AppointmentModalSkeleton() {
	return (
		<div className="space-y-6 p-4">
			{/* Header */}
			<div>
				<Skeleton className="h-6 w-48 mb-2" />
				<Skeleton className="h-4 w-20" />
			</div>

			{/* Grid de informações */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Coluna esquerda - InfoSections */}
				<div className="space-y-4">
					{/* Data e Horário */}
					<div className="flex items-start gap-3">
						<Skeleton className="h-10 w-10 rounded-lg" />
						<div className="space-y-1.5">
							<Skeleton className="h-3 w-24" />
							<Skeleton className="h-5 w-40" />
						</div>
					</div>

					{/* Cliente */}
					<div className="flex items-start gap-3">
						<Skeleton className="h-10 w-10 rounded-lg" />
						<div className="space-y-1.5">
							<Skeleton className="h-3 w-16" />
							<Skeleton className="h-5 w-32" />
							<Skeleton className="h-3 w-44" />
						</div>
					</div>

					{/* Pet */}
					<div className="flex items-start gap-3">
						<Skeleton className="h-10 w-10 rounded-lg" />
						<div className="space-y-1.5">
							<Skeleton className="h-3 w-12" />
							<Skeleton className="h-5 w-28" />
							<Skeleton className="h-3 w-36" />
						</div>
					</div>
				</div>

				{/* Coluna direita - InfoCards */}
				<div className="space-y-4">
					{/* Serviço Card */}
					<div className="border border-slate-200 rounded-lg p-4 space-y-3">
						<Skeleton className="h-4 w-16" />
						<Skeleton className="h-5 w-32" />
						<div className="flex justify-between items-center mt-2">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-6 w-20" />
						</div>
					</div>

					{/* Status Card */}
					<div className="border border-slate-200 rounded-lg p-4 space-y-3">
						<Skeleton className="h-4 w-24" />
						<div className="flex items-center gap-2">
							<Skeleton className="h-4 w-4 rounded" />
							<Skeleton className="h-6 w-28 rounded-full" />
						</div>
					</div>
				</div>
			</div>

			{/* Quick Actions */}
			<div className="space-y-3">
				<Skeleton className="h-4 w-28" />
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-9 w-24 rounded-md" />
					<Skeleton className="h-9 w-28 rounded-md" />
					<Skeleton className="h-9 w-24 rounded-md" />
				</div>
			</div>

			{/* Observações */}
			<div className="border-t border-slate-200 pt-6 space-y-3">
				<Skeleton className="h-5 w-28" />
				<Skeleton className="h-4 w-56 mx-auto" />
			</div>
		</div>
	);
}
