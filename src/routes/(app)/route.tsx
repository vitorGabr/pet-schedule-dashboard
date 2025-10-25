import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const authStateFn = createServerFn({ method: "GET" }).handler(async () => {
	const { isAuthenticated, orgId, userId } = await auth();
	if (!isAuthenticated || !orgId || !userId)
		throw redirect({ to: "/sign-in/$" });

	const [userResult, orgResult] = await Promise.allSettled([
		clerkClient().users.getUser(userId),
		clerkClient().organizations.getOrganization({ organizationId: orgId }),
	]);

	if (userResult.status === "fulfilled" && orgResult.status === "fulfilled") {
		return {
			userId: String(userResult.value.publicMetadata?.appUserId),
			companyId: String(orgResult.value.publicMetadata?.appCompanyId),
		};
	}

	throw redirect({ to: "/waiting" });
});

export const Route = createFileRoute("/(app)")({
	component: Layout,
	beforeLoad: async () => authStateFn(),
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
