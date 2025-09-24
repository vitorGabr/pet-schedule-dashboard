import { useGetSession } from "@/lib/http";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	useGetSession();
	return <>{children}</>;
}
