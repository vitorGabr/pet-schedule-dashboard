import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const authStateFn = createServerFn({ method: "GET" })
	.inputValidator(
		(data: { userId?: string | null; orgId?: string | null }) => data,
	)
	.handler(async ({ data }) => {
		if (data.userId || data.orgId) {
			throw redirect({ to: "/" });
		}
	});

export const Route = createFileRoute("/(app)/waiting/")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => await authStateFn({ data: context }),
});

function RouteComponent() {
	return <div>Hello "/(app)/waiting/"!</div>;
}
