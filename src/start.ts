import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
import { createStart } from "@tanstack/react-start";

export const startInstance = createStart(() => {
	return {
		requestMiddleware: [
			clerkMiddleware({ authorizedParties: [`${process.env.DOMAIN_ORIGIN}`] }),
		],
	};
});
