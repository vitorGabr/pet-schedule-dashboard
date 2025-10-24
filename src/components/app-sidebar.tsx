import { useLocation } from "@tanstack/react-router";
import {
	AreaChart,
	BarChart3,
	Building2,
	ClipboardList,
	Folder,
	Home,
	Megaphone,
	Package,
	ShoppingCart,
	Star,
} from "lucide-react";
import type * as React from "react";
import Logo from "@/assets/logo.svg";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
} from "@/components/ui/sidebar";

const data = {
	navMain: [
		{ title: "Início", url: "/", icon: Home },
		{ title: "Agendamentos", url: "/appointments", icon: ClipboardList },
		{ title: "Serviços", url: "/services", icon: BarChart3 },
		{ title: "Funcionários", url: "/staffs", icon: Folder },
		{ title: "Avaliações", url: "/ratings", icon: Star },
		{ title: "Perfil da Empresa", url: "/profile", icon: Building2 },
	],
	navComingSoon: [
		{ title: "Estoque", url: "#", icon: Package, comingSoon: true },
		{ title: "Produtos", url: "#", icon: ShoppingCart, comingSoon: true },
		{ title: "Campanhas", url: "#", icon: Megaphone, comingSoon: true },
		{ title: "Estastísticas", url: "#", icon: AreaChart, comingSoon: true },
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const activePath = useLocation();
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<a href={"/"}>
						<img src={Logo} alt="Logo" className="w-auto h-8 object-cover" />
					</a>
				</SidebarMenu>
				<SidebarMenu></SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} activePath={activePath.pathname} />
				<div className="mt-2">
					<div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
						Em breve
					</div>
					<NavMain
						items={data.navComingSoon}
						activePath={activePath.pathname}
					/>
				</div>
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
