import z from "zod";

export const pageSearchSchema = z.object({
	page: z.number().optional().catch(undefined),
	query: z.string().min(1).optional().catch(undefined),
	startDate: z.iso.datetime().optional().catch(undefined),
	endDate: z.iso.datetime().optional().catch(undefined),
	id: z.string().min(1).optional().catch(undefined),
});

export type PageSearchParams = z.infer<typeof pageSearchSchema>;
