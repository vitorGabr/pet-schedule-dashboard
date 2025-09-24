import { z } from "zod";

export const acceptInviteSchema = z
	.object({
		token: z.string().min(1, "Token é obrigatório"),
		password: z.string().min(8, "Senha é obrigatória"),
		confirmPassword: z.string().min(8, "Confirmar senha é obrigatório"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem",
		path: ["confirmPassword"],
	});

export type AcceptInviteSchema = z.infer<typeof acceptInviteSchema>;
