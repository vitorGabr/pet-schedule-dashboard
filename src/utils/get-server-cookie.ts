import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const getServerCookie = createServerFn({ method: "GET" }).handler(
	async () => {
		const session = getCookie("__session");
		return session;
	},
);
