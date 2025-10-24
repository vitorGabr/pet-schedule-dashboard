import { UserButton, useUser } from "@clerk/tanstack-react-start";
import { MoreVertical } from "lucide-react";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavUser() {
	const { user } = useUser();
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<UserButton />
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">{user?.firstName}</span>
						<span className="text-muted-foreground truncate text-xs">
							{user?.primaryEmailAddress?.emailAddress}
						</span>
					</div>
					<MoreVertical className="ml-auto size-4" />
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
