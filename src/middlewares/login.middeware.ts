import { auth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";

export const loginMiddleware = createServerFn().handler(async () => {
	const { isAuthenticated } = await auth();
	if (isAuthenticated) {
		//throw redirect({ to: "/" });
	}
});
