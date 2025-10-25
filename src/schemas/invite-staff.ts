import z from "zod";

export const inviteStaffSchema = z.object({
	email: z.email("Endereço de e-mail inválido"),
	role: z.enum(["member", "admin"]),
});

export type InviteStaffSchema = z.infer<typeof inviteStaffSchema>;
