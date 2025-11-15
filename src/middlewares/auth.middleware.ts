import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { deleteCookie } from "@tanstack/react-start/server";

export const authMiddleware = createServerFn().handler(async () => {
  const { isAuthenticated, orgId, sessionId, userId } = await auth();
  const client = clerkClient();
  if (!isAuthenticated || !orgId || !userId) {
    if (sessionId) {
      await client.sessions.revokeSession(sessionId);
    }
    deleteCookie("__session");
    throw redirect({ to: "/sign-in/$" });
  }

  const [userResult, orgResult] = await Promise.allSettled([
    client.users.getUser(userId),
    client.organizations.getOrganization({ organizationId: orgId }),
  ]);

  if (userResult.status === "fulfilled" && orgResult.status === "fulfilled") {
    return {
      userId: String(userResult.value.publicMetadata?.appUserId),
      companyId: String(orgResult.value.publicMetadata?.appCompanyId),
    };
  }

  throw redirect({ to: "/waiting" });
});
