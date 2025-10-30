import z from "zod";

export const createServiceBody = z.object({
	name: z.string().min(1, "O nome do serviço é obrigatório"),
	description: z.string(),
	price: z.number().min(0, "O preço deve ser um número positivo"),
	duration: z.number().min(0, "A duração deve ser um número positivo"),
	rules: z.string().optional(),
	categoryId: z.string(),
	requiresPayment: z.boolean().optional(),
});

export type CreateServiceBody = z.infer<typeof createServiceBody>;
