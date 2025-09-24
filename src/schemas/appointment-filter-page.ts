import { getAllCompanyAppointmentsQueryParams } from "@/lib/http";
import type z from "zod";
import { pageSearchSchema } from "@/schemas/page-search";

export const appointmentFilterPageSchema = pageSearchSchema.extend({
	status: getAllCompanyAppointmentsQueryParams.shape.status.min(1).optional().catch(undefined),
});

export type AppointmentFilterPageValues = z.infer<typeof appointmentFilterPageSchema>;
