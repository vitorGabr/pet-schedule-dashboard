import type { WeeklyPerformanceResponseOutput } from "@/lib/http";

type Props = { performance: WeeklyPerformanceResponseOutput | undefined };

export function WeeklyPerformance({ performance }: Props) {
	if (!performance) return null;

	const appointmentsCompleted = performance.appointments.completed;
	const appointmentsTotal = performance.appointments.total;
	const appointmentsPercentage =
		(appointmentsCompleted / appointmentsTotal) * 100;

	return (
		<div className="bg-white rounded-xl border border-slate-200/60 p-6 hover:shadow-card transition-all duration-200">
			<h3 className="text-lg font-semibold text-slate-900 mb-6">
				Performance Semanal
			</h3>
			<div className="space-y-6">
				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium text-slate-600">
							Agendamentos
						</span>
						<span className="text-sm font-bold text-slate-900">
							{appointmentsCompleted}/{appointmentsTotal}
						</span>
					</div>
					<div className="w-full bg-slate-100 rounded-full h-2">
						<div
							className="bg-primary h-2 rounded-full transition-all duration-300"
							style={{ width: `${appointmentsPercentage}%` }}
						></div>
					</div>
					<span className="text-xs text-slate-500">
						{Number.isNaN(appointmentsPercentage)
							? 0
							: appointmentsPercentage.toFixed(1)}
						% da meta
					</span>
				</div>

				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium text-slate-600">
							Taxa de Conversão
						</span>
						<span className="text-sm font-bold text-slate-900">
							{performance.conversionRate.changePercentage.toFixed(1)}%
						</span>
					</div>
					<div className="w-full bg-slate-100 rounded-full h-2">
						<div
							className="bg-gradient-to-r from-success-500 to-success-600 h-2 rounded-full transition-all duration-300"
							style={{
								width: `${performance.conversionRate.changePercentage}%`,
							}}
						></div>
					</div>
					<span className="text-xs text-success-600">
						↑ {performance.conversionRate.changePercentage.toFixed(1)}% vs
						semana anterior
					</span>
				</div>

				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium text-slate-600">
							Satisfação
						</span>
						<span className="text-sm font-bold text-slate-900">
							{performance.satisfaction.rating.toFixed(1)}/5.0
						</span>
					</div>
					<div className="w-full bg-slate-100 rounded-full h-2">
						<div
							className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-300"
							style={{ width: `${performance.satisfaction.rating * 20}%` }}
						></div>
					</div>
					<span className="text-xs text-slate-500">
						Com base em {performance.satisfaction.baseCount} avaliações
					</span>
				</div>
			</div>
		</div>
	);
}
