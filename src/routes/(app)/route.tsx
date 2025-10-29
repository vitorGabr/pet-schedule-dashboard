import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authMiddleware } from "@/middlewares/auth.middleware";

export const Route = createFileRoute("/(app)")({
	component: Layout,
	beforeLoad: () => authMiddleware()
});

function Layout() {
	return (
		<SidebarProvider
			style={
				{
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
