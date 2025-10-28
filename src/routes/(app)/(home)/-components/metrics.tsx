import {
	Calendar,
	Coins,
	Star,
	TrendingDown,
	TrendingUp,
	Users,
} from "lucide-react";
import type { DashboardMetricsResponseOutput } from "@/lib/http";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/currency";

type Props = { metrics: DashboardMetricsResponseOutput | undefined };

export function Metrics({ metrics }: Props) {
	if (!metrics) return null;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<ItemMetrics
				title="Agendamentos Hoje"
				value={metrics.appointmentsToday.count}
				change={metrics.appointmentsToday.changePercentage}
				trend={metrics.appointmentsToday.changePercentage > 0 ? "up" : "down"}
				icon={<Calendar />}
				color="primary"
				subtitle="vs. ontem"
			/>
			<ItemMetrics
				title="Faturamento Mensal"
				value={formatCurrency(metrics.monthlyRevenue.amount / 100)}
				change={metrics.monthlyRevenue.changePercentage}
				trend={metrics.monthlyRevenue.changePercentage > 0 ? "up" : "down"}
				icon={<Coins />}
				color="success"
				subtitle="vs. mês anterior"
			/>
			<ItemMetrics
				title="Clientes Ativos"
				value={metrics.activeClients.count}
				change={metrics.activeClients.changePercentage}
				trend={metrics.activeClients.changePercentage > 0 ? "up" : "down"}
				icon={<Users />}
				color="orange"
				subtitle="este mês"
			/>
			<ItemMetrics
				title="Avaliação Média"
				value={metrics.averageRating.rating}
				change={metrics.averageRating.changePercentage}
				trend={metrics.averageRating.changePercentage > 0 ? "up" : "down"}
				icon={<Star />}
				color="yellow"
				subtitle="últimas 30 avaliações"
			/>
		</div>
	);
}

function ItemMetrics(data: {
	title: string;
	value: string | number;
	change: number;
	trend: "up" | "down";
	icon: React.ReactNode;
	color: "primary" | "success" | "orange" | "yellow";
	subtitle: string;
}) {
	return (
		<div className="bg-white p-6 rounded-xl border border-slate-200/60 hover:shadow-card transition-all duration-200 animate-scale-in">
			<div className="flex items-center justify-between mb-4">
				<div
					className={cn(
						"p-3 rounded-xl",
						data.color === "primary" && "bg-primary text-white",
						data.color === "success" && "bg-green-500 text-white",
						data.color === "orange" && "bg-orange-500 text-white",
						data.color === "yellow" && "bg-yellow-500 text-white",
					)}
				>
					{data.icon}
				</div>
			</div>
			<div>
				<p className="text-2xl font-bold text-slate-900 mb-1">{data.value}</p>
				<p className="text-sm font-medium text-slate-600 mb-2">{data.title}</p>
				<div className="flex items-center justify-between">
					<span
						className={`inline-flex items-center text-sm font-medium ${
							data.trend === "up" ? "text-success-600" : "text-red-600"
						}`}
					>
						{data.trend === "up" ? (
							<TrendingUp className="w-4 h-4 mr-1" />
						) : (
							<TrendingDown className="w-4 h-4 mr-1" />
						)}
						{data.change.toFixed(2)}%
					</span>
					<span className="text-xs text-slate-500">{data.subtitle}</span>
				</div>
			</div>
		</div>
	);
}
