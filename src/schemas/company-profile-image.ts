import { z } from "zod";

export const companyProfileImageSchema = z.object({
	file: z
		.file()
		.min(1)
		.max(2 * 1024 * 1024)
		.refine(
			(file) =>
				file.type === "image/png" ||
				file.type === "image/jpeg" ||
				file.type === "image/webp",
			{ message: "Arquivo de imagem inválido" },
		),
	companyId: z.string().min(1),
});

export type CompanyProfileImage = z.infer<typeof companyProfileImageSchema>;
