import { auth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getStaffByCurrentUserId } from "@/lib/http";

const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
	const { isAuthenticated, userId } = await auth();
	if (!isAuthenticated) {
		throw redirect({ to: "/sign-in" });
	}

	const staff = await getStaffByCurrentUserId();
	if (!staff) {
		throw redirect({ to: "/sign-in" });
	}

	return { userId, companyId: staff.companyId };
});

export const Route = createFileRoute("/(app)")({
	component: Layout,
	beforeLoad: async () => await authStateFn(),
});

function Layout() {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="sidebar" />
			<SidebarInset>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}
