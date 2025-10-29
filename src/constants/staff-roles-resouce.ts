import { ListStaffByCompanyResponseDtoOutputItemsItemRole } from "@/lib/http/generated/models";

export const staffRolesResource: Record<
	ListStaffByCompanyResponseDtoOutputItemsItemRole,
	string
> = { admin: "Administrador", member: "Membro" };
