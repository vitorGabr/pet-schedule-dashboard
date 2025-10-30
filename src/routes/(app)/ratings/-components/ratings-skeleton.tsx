import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RatingsSkeleton() {
	const ratingItems = [
		{ id: "rating-1" },
		{ id: "rating-2" },
		{ id: "rating-3" },
		{ id: "rating-4" },
	];

	const distributionItems = [
		{ id: "dist-5" },
		{ id: "dist-4" },
		{ id: "dist-3" },
		{ id: "dist-2" },
		{ id: "dist-1" },
	];

	return (
		<div className="px-4 sm:px-6 lg:px-8 py-8">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Ratings List */}
				<div className="lg:col-span-2">
					<Card>
						<CardContent className="p-6">
							<div className="flex items-center justify-between mb-6">
								<Skeleton className="h-6 w-48" />
								<Skeleton className="h-9 w-20" />
							</div>
							<div className="space-y-6">
								{ratingItems.map((item) => (
									<div
										key={item.id}
										className="border-b border-gray-200 pb-6 last:border-b-0"
									>
										<div className="flex items-start space-x-3">
											<Skeleton className="w-10 h-10 rounded-full" />
											<div className="flex-1">
												<div className="flex items-center justify-between mb-1">
													<Skeleton className="h-4 w-32" />
													<Skeleton className="h-3 w-16" />
												</div>
												<div className="flex items-center space-x-2 mb-2">
													<div className="flex space-x-1">
														{Array.from({ length: 5 }).map((_, index) => (
															<Skeleton
																key={`${item.id}-star-${index}`}
																className="w-4 h-4 rounded"
															/>
														))}
													</div>
													<Skeleton className="h-5 w-20 rounded-full" />
												</div>
												<div className="space-y-2">
													<Skeleton className="h-3 w-full" />
													<Skeleton className="h-3 w-3/4" />
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Rating Distribution Sidebar */}
				<div>
					<Card>
						<CardContent className="p-6">
							<Skeleton className="h-6 w-48 mb-6" />
							<div className="space-y-4">
								{distributionItems.map((item) => (
									<div key={item.id} className="flex items-center space-x-3">
										<div className="flex items-center space-x-1 w-12">
											<Skeleton className="h-4 w-3" />
											<Skeleton className="w-4 h-4 rounded" />
										</div>
										<div className="flex-1">
											<Skeleton className="w-full h-2 rounded-full" />
										</div>
										<Skeleton className="h-4 w-6" />
									</div>
								))}
							</div>
							<div className="mt-6 pt-4 border-t border-gray-200">
								<div className="text-center">
									<Skeleton className="h-8 w-12 mx-auto mb-2" />
									<div className="flex justify-center mb-1 space-x-1">
										{Array.from({ length: 5 }).map((_, index) => (
											<Skeleton
												key={`avg-star-${index + 1}`}
												className="w-4 h-4 rounded"
											/>
										))}
									</div>
									<Skeleton className="h-4 w-32 mx-auto" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
