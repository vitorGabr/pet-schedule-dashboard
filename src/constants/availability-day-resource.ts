import { CompanyAvailabilityListResponseDtoOutputItemsItemDay } from "@/lib/http/generated/models";

export const availabilityDayResource = {
	sunday: "Domingo",
	monday: "Segunda-feira",
	tuesday: "Terça-feira",
	wednesday: "Quarta-feira",
	thursday: "Quinta-feira",
	friday: "Sexta-feira",
	saturday: "Sábado",
} satisfies Record<
	CompanyAvailabilityListResponseDtoOutputItemsItemDay,
	string
>;
