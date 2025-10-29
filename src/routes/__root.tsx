import { ClerkProvider } from "@clerk/tanstack-react-start";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../style.css?url";
import { ptBR } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';

setDefaultOptions({ locale: ptBR });

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Petesy" },
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

const queryClient = new QueryClient();
function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<QueryClientProvider client={queryClient}>
				<html lang="pt-BR">
					<head>
						<HeadContent />
					</head>
					<body>
						{children}
						<TanStackRouterDevtools position="bottom-right" />
						<Scripts />
						<Toaster />
					</body>
				</html>
			</QueryClientProvider>
		</ClerkProvider>
	);
}
