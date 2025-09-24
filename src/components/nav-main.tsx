import { Badge } from "@/components/ui/badge";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export function NavMain({
	items,
	activePath,
}: {
	items: { title: string; url: string; icon?: LucideIcon; comingSoon?: boolean }[];
	activePath: string;
}) {
	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								tooltip={item.title}
								asChild={!item.comingSoon}
								disabled={item.comingSoon}
								className={cn(
									activePath === item.url &&
										"bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear",
									item.comingSoon && "opacity-60 cursor-not-allowed",
								)}
							>
								{item.comingSoon ? (
									<div className="flex items-center justify-between w-full">
										<div className="flex items-center gap-2">
											{item.icon && <item.icon className="size-5" />}
											<span>{item.title}</span>
										</div>
										<Badge variant="outline" className="text-[10px]">
											Em breve
										</Badge>
									</div>
								) : (
									<Link to={item.url}>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
									</Link>
								)}
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
