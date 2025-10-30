import z from "zod";
import { AppointmentsByCompanyResponseDtoOutputItemsItemStatus } from "@/lib/http/generated/models";
import { pageSearchSchema } from "@/schemas/page-search";

export const appointmentFilterPageSchema = pageSearchSchema.extend({
	status: z
		.array(z.enum(AppointmentsByCompanyResponseDtoOutputItemsItemStatus))
		.min(1)
		.optional()
		.catch(undefined),
});

export type AppointmentFilterPageValues = z.infer<
	typeof appointmentFilterPageSchema
>;
