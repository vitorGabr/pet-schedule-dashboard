import { Clock } from "lucide-react";
import { availabilityDayResource } from "@/constants/availability-day-resource";
import type { CompanyAvailabilityListResponseDtoOutputItemsItem } from "@/lib/http";

type HoursAndStatsProps = {
	availabilities: CompanyAvailabilityListResponseDtoOutputItemsItem[];
};

export function HoursAndStats({ availabilities }: HoursAndStatsProps) {
	return (
		<div className="space-y-6">
			{/* Hours */}
			<div className="bg-white p-6 rounded-lg border border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
					<Clock className="w-5 h-5 mr-2" />
					Horário de Funcionamento
				</h3>
				<div className="space-y-3">
					{availabilities.map((availability) => (
						<div key={availability.day} className="flex justify-between">
							<span className="text-gray-600">
								{availabilityDayResource[availability.day]}
							</span>
							<span className="text-gray-900 font-medium">
								{availability.timeRange.startTime} -{" "}
								{availability.timeRange.endTime}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
