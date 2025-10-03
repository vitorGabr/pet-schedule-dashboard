import type { ListStaffByCompanyResponseDtoOutputItemsItemRole } from "@/lib/http";

export const staffRolesResource: Record<
	ListStaffByCompanyResponseDtoOutputItemsItemRole,
	string
> = { admin: "Administrador", manager: "Gerente", employee: "Funcionário" };
