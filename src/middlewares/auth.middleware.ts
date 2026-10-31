import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const authMiddleware = createServerFn().handler(async () => {
	const { isAuthenticated, sessionId, userId } = await auth();
	const client = clerkClient();
	if (!isAuthenticated || !userId) {
		throw redirect({ to: "/sign-in/$" });
	}

	// These Clerk lookups are independent. Run them together to reduce
	// the time spent waiting for the access check on navigation.
	const [organizations, userResult] = await Promise.all([
		client.users.getOrganizationMembershipList({ userId }),
		client.users.getUser(userId),
	]);

	const companyId =
		organizations.data[0]?.organization?.publicMetadata?.appCompanyId;
	if (!companyId) {
		if (sessionId) {
			await client.sessions.revokeSession(sessionId);
		}
		throw redirect({ to: "/sign-in/$" });
	}

	if (userResult) {
		return {
			userId: String(userResult.publicMetadata?.appUserId),
			companyId: String(companyId),
		};
	}

	throw redirect({ to: "/waiting" });
});
