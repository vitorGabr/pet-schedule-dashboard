import { Toaster } from "@/components/ui/sonner";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as z from "zod";
import TanStackQueryDevtools from "../lib/integrations/tanstack-query/devtools";

z.config(z.locales.pt());

setDefaultOptions({ locale: ptBR });

export const Route = createRootRouteWithContext()({
	notFoundComponent: () => <div>404 — Página não encontrada!</div>,
	component: RootDocument,
});

function RootDocument() {
	return (
		<>
			<Outlet />
			<TanStackDevtools
				plugins={[
					{ name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> },
					TanStackQueryDevtools,
				]}
			/>
			<Toaster />
		</>
	);
}
