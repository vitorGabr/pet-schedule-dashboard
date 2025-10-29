import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";

export const signOut = createServerFn().handler(async () => {
	const { sessionId } = await auth();
	const client = clerkClient();
	if (sessionId) {
		await client.sessions.revokeSession(sessionId);
	}
});
