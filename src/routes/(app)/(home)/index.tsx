import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { useGetDashboardMetrics, useGetWeeklyPerformance } from "@/lib/http";
import { AppointmentsToday } from "./-components/appointments-today";
import { HomeSkeleton } from "./-components/home-skeleton";
import { Metrics } from "./-components/metrics";
import { WeeklyPerformance } from "./-components/weekly-performance";

export const Route = createFileRoute("/(app)/(home)/")({ component: HomePage });

function HomePage() {
	const { companyId } = useRouteContext({from: "/(app)/(home)/" });
	const metrics = useGetDashboardMetrics(companyId);
	const weeklyPerformance = useGetWeeklyPerformance(companyId);

	const isLoading = metrics.isLoading || weeklyPerformance.isLoading;

	if (isLoading) {
		return <HomeSkeleton />;
	}

	return (
		<>
			<SiteHeader title="Início" />
			<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
				<Metrics metrics={metrics.data} />
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<AppointmentsToday companyId={companyId} />
					<WeeklyPerformance performance={weeklyPerformance.data} />
				</div>
			</div>
		</>
	);
}
