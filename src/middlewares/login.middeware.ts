import { auth } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";

export const loggingMiddleware = createMiddleware().server(async ({ next }) => {
    const { isAuthenticated } = await auth();
    if(isAuthenticated) {
        throw redirect({ to: "/" });
    }
	return next();
});
