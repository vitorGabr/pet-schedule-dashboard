import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
	const availabilityDays = [
		{ id: "monday" },
		{ id: "tuesday" },
		{ id: "wednesday" },
		{ id: "thursday" },
		{ id: "friday" },
		{ id: "saturday" },
		{ id: "sunday" },
	];

	const galleryImages = [
		{ id: "image-1" },
		{ id: "image-2" },
		{ id: "image-3" },
		{ id: "image-4" },
		{ id: "image-5" },
		{ id: "image-6" },
	];

	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<Skeleton className="h-8 w-48 mb-2" />
					<Skeleton className="h-4 w-64" />
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Profile Info */}
				<div className="lg:col-span-2 space-y-6">
					{/* Company Info Card */}
					<div className="bg-white p-6 rounded-lg border border-gray-200">
						<div className="flex items-start space-x-4">
							<Skeleton className="w-20 h-20 rounded-lg" />
							<div className="flex-1">
								<Skeleton className="h-8 w-48 mb-2" />
								<div className="flex items-center mt-2">
									<Skeleton className="w-4 h-4 rounded mr-1" />
									<Skeleton className="h-4 w-8 mr-1" />
									<Skeleton className="h-4 w-24" />
								</div>
							</div>
						</div>

						<div className="mt-4">
							<Skeleton className="h-4 w-full mb-2" />
							<Skeleton className="h-4 w-3/4" />
						</div>
					</div>

					{/* Contact Information */}
					<div className="bg-white p-6 rounded-lg border border-gray-200">
						<Skeleton className="h-6 w-48 mb-4" />
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<Skeleton className="w-5 h-5 rounded" />
								<Skeleton className="h-4 w-64" />
							</div>
							<div className="flex items-center space-x-3">
								<Skeleton className="w-5 h-5 rounded" />
								<Skeleton className="h-4 w-40" />
							</div>
						</div>
					</div>

					{/* Gallery */}
					<div className="bg-white p-6 rounded-lg border border-gray-200">
						<div className="flex justify-between items-center mb-4">
							<Skeleton className="h-6 w-32" />
						</div>
						<div className="grid grid-cols-3 gap-4">
							{galleryImages.map((image) => (
								<Skeleton key={image.id} className="w-full h-24 rounded-lg" />
							))}
						</div>
					</div>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Hours */}
					<div className="bg-white p-6 rounded-lg border border-gray-200">
						<div className="flex items-center mb-4">
							<Skeleton className="w-5 h-5 rounded mr-2" />
							<Skeleton className="h-6 w-48" />
						</div>
						<div className="space-y-3">
							{availabilityDays.map((day) => (
								<div key={day.id} className="flex justify-between">
									<Skeleton className="h-4 w-20" />
									<Skeleton className="h-4 w-24" />
								</div>
							))}
						</div>
					</div>

					{/* Stats */}
					<div className="bg-white p-6 rounded-lg border border-gray-200">
						<Skeleton className="h-6 w-24 mb-4" />
						<div className="space-y-4">
							<div className="flex justify-between items-center">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-8 w-16" />
							</div>
							<div className="flex justify-between items-center">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-8 w-12" />
							</div>
							<div className="flex justify-between items-center">
								<Skeleton className="h-4 w-28" />
								<div className="flex items-center">
									<Skeleton className="h-8 w-8 mr-1" />
									<Skeleton className="w-5 h-5 rounded" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
