import z from "zod";

export const createServiceBody = z.object({
	name: z
		.string("Esse campo é obrigatório")
		.min(1, "O nome do serviço é obrigatório"),
	description: z.string("Esse campo é obrigatório"),
	price: z
		.number("Esse campo é obrigatório")
		.min(0, "O preço deve ser um número positivo"),
	duration: z
		.number("Esse campo é obrigatório")
		.min(0, "A duração deve ser um número positivo"),
	rules: z.string().optional(),
	categoryId: z
		.string("Esse campo é obrigatório")
		.min(1, "A categoria é obrigatória"),
	requiresPayment: z.boolean().optional(),
});

export type CreateServiceBody = z.infer<typeof createServiceBody>;
