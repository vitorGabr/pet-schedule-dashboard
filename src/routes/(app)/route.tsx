import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthProvider } from "@/components/auth-provider";
import { getCookie } from "@/utils/cookie";

export const Route = createFileRoute("/(app)")({
	component: Layout,
	beforeLoad: async () => {
		const session = getCookie("token");
		if (!session) {
			throw redirect({ to: "/sign-in" });
		}
	},
});

function Layout() {
	return (
		<AuthProvider>
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
		</AuthProvider>
	);
}
