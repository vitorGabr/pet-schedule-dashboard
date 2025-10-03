import {
	useGetDashboardMetrics,
	useGetSession,
	useGetWeeklyPerformance,
} from "@/lib/http";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { AppointmentsToday } from "./-components/appointments-today";
import { HomeSkeleton } from "./-components/home-skeleton";
import { Metrics } from "./-components/metrics";
import { WeeklyPerformance } from "./-components/weekly-performance";

export const Route = createFileRoute("/(app)/(home)/")({ component: HomePage });

function HomePage() {
	const { data: session } = useGetSession();
	const metrics = useGetDashboardMetrics();
	const weeklyPerformance = useGetWeeklyPerformance();

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
					<AppointmentsToday companyId={session?.companyId} />
					<WeeklyPerformance performance={weeklyPerformance.data} />
				</div>
			</div>
		</>
	);
}
