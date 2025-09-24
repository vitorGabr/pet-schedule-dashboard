import { z } from "zod";
import { pageSearchSchema } from "@/schemas/page-search";

export const staffFilterPageSchema = pageSearchSchema.extend({
	roles: z
		.array(z.enum(["admin", "manager", "employee"]))
		.min(1)
		.optional()
		.catch(undefined),
});

export type StaffFilterPageValues = z.infer<typeof staffFilterPageSchema>;
