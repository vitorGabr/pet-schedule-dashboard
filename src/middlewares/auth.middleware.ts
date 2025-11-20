import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const authMiddleware = createServerFn().handler(async () => {
	const { isAuthenticated, sessionId, userId } = await auth();
	const client = clerkClient();
	if (!isAuthenticated || !userId) {
		throw redirect({ to: "/sign-in/$" });
	}

	const organizations = await client.users.getOrganizationMembershipList({
		userId,
	});
	const companyId =
		organizations.data[0].organization.publicMetadata?.appCompanyId;
	if (organizations.totalCount === 0 || !companyId) {
		if (sessionId) {
			await client.sessions.revokeSession(sessionId);
		}
		throw redirect({ to: "/sign-in/$" });
	}

	const userResult = await client.users.getUser(userId);
	if (userResult) {
		return {
			userId: String(userResult.publicMetadata?.appUserId),
			companyId: String(companyId),
		};
	}

	throw redirect({ to: "/waiting" });
});
