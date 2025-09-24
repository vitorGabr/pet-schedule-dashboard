import type { CompanyAvailabilityListResponseDtoOutputItemsItem } from "@/lib/http";
import { Clock, Star } from "lucide-react";
import { availabilityDayResource } from "@/constants/availability-day-resource";

type HoursAndStatsProps = {
	availabilities: CompanyAvailabilityListResponseDtoOutputItemsItem[];
	ratingAverage: number;
};

export function HoursAndStats({
	availabilities,
	ratingAverage,
}: HoursAndStatsProps) {
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

			{/* Stats */}
			<div className="bg-white p-6 rounded-lg border border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Estatísticas
				</h3>
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<span className="text-gray-600">Total de Agendamentos</span>
						<span className="text-2xl font-bold text-blue-600">1,247</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-gray-600">Clientes Únicos</span>
						<span className="text-2xl font-bold text-green-600">523</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-gray-600">Avaliação Média</span>
						<div className="flex items-center">
							<span className="text-2xl font-bold text-yellow-500 mr-1">
								{ratingAverage}
							</span>
							<Star className="w-5 h-5 text-yellow-500" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
