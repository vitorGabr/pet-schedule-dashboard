import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const loginMiddleware = createServerFn().handler(async () => {
	const isAuthenticated = getCookie("__session");
	if (isAuthenticated) {
		throw redirect({ to: "/" });
	}
});
