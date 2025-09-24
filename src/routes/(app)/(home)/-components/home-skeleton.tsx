import { Skeleton } from "@/components/ui/skeleton";

export function HomeSkeleton() {
	const metricSkeletons = [
		{ id: "appointments-today" },
		{ id: "monthly-revenue" },
		{ id: "active-clients" },
		{ id: "average-rating" },
	];

	const appointmentSkeletons = [
		{ id: "appointment-1" },
		{ id: "appointment-2" },
		{ id: "appointment-3" },
	];

	const performanceSkeletons = [
		{ id: "appointments-performance" },
		{ id: "conversion-rate" },
		{ id: "satisfaction" },
	];

	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
			{/* Metrics Skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{metricSkeletons.map((skeleton) => (
					<div
						key={skeleton.id}
						className="bg-white p-6 rounded-xl border border-slate-200/60"
					>
						<div className="flex items-center justify-between mb-4">
							<Skeleton className="w-12 h-12 rounded-xl" />
						</div>
						<div>
							<Skeleton className="h-8 w-16 mb-1" />
							<Skeleton className="h-4 w-24 mb-2" />
							<div className="flex items-center justify-between">
								<Skeleton className="h-4 w-16" />
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Appointments Today Skeleton */}
				<div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/60 p-6">
					<div className="flex items-center justify-between mb-6">
						<Skeleton className="h-6 w-48" />
						<Skeleton className="h-4 w-16" />
					</div>
					<div className="space-y-4">
						{appointmentSkeletons.map((skeleton) => (
							<div
								key={skeleton.id}
								className="flex items-center justify-between p-4 rounded-lg border border-slate-100"
							>
								<div className="flex items-center space-x-4">
									<Skeleton className="w-10 h-10 rounded-full" />
									<div>
										<Skeleton className="h-4 w-24 mb-1" />
										<Skeleton className="h-3 w-16 mb-1" />
										<Skeleton className="h-3 w-20" />
									</div>
								</div>
								<div className="text-right">
									<Skeleton className="h-4 w-20 mb-1" />
									<Skeleton className="h-3 w-16 mb-1" />
									<Skeleton className="h-5 w-16 rounded-full" />
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Weekly Performance Skeleton */}
				<div className="bg-white rounded-xl border border-slate-200/60 p-6">
					<Skeleton className="h-6 w-40 mb-6" />
					<div className="space-y-6">
						{performanceSkeletons.map((skeleton) => (
							<div key={skeleton.id} className="space-y-3">
								<div className="flex justify-between items-center">
									<Skeleton className="h-4 w-20" />
									<Skeleton className="h-4 w-12" />
								</div>
								<Skeleton className="w-full h-2 rounded-full" />
								<Skeleton className="h-3 w-24" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
