import { AppointmentsByCompanyResponseDtoOutputItemsItemStatus } from "@/lib/http";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Filter, Search, X } from "lucide-react";
import type z from "zod";
import { appointmentStatusResource } from "@/constants/appointment-status";
import { appointmentFilterPageSchema } from "@/schemas/appointment-filter-page";
import { cn } from "@/utils/cn";

type AppointmentFiltersProps = {
	query?: string;
	statusSelected?: AppointmentsByCompanyResponseDtoOutputItemsItemStatus[];
};

export function AppointmentFilters({
	query,
	statusSelected,
}: AppointmentFiltersProps) {
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: { query, status: statusSelected } as z.input<
			typeof appointmentFilterPageSchema
		>,
		validators: { onChange: appointmentFilterPageSchema },
	});

	const handleStatusToggle = (
		status: AppointmentsByCompanyResponseDtoOutputItemsItemStatus,
		currentStatus: AppointmentsByCompanyResponseDtoOutputItemsItemStatus[],
	) => {
		const newStatus = currentStatus.includes(status)
			? currentStatus.filter((s) => s !== status)
			: [...currentStatus, status];
		return newStatus;
	};

	return (
		<>
			{/* Filters */}
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					<form.Field
						name="query"
						listeners={{
							onChangeDebounceMs: 500,
							onChange: ({ fieldApi }) => {
								navigate({
									to: "/appointments",
									search: (prev) => ({
										...prev,
										query:
											(fieldApi.state.value ?? "")?.length > 0
												? fieldApi.state.value
												: undefined,
										page: 1,
									}),
								});
							},
						}}
						children={(field) => (
							<div className="relative">
								<Input
									className={cn(
										"peer min-w-60 ps-9",
										Boolean(field.state.value) && "pe-9",
									)}
									value={field.state.value}
									onBlur={field.handleBlur}
									name={field.name}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="Filtrar por cliente, animal ou serviço..."
									type="text"
									aria-label="Filtrar por nome ou email"
								/>
								<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
									<Search size={16} aria-hidden="true" />
								</div>
								{Boolean(field.state.value) && (
									<button
										type="button"
										className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
										aria-label="Limpar filtro"
										onClick={() => field.handleChange("")}
									>
										<X size={16} aria-hidden="true" />
									</button>
								)}
							</div>
						)}
					/>

					{/* Status filter */}
					<form.Field
						name="status"
						listeners={{
							onChangeDebounceMs: 500,
							onChange: ({ fieldApi }) => {
								navigate({
									to: "/appointments",
									search: (prev) => ({
										...prev,
										status:
											(fieldApi.state.value ?? [])?.length > 0
												? fieldApi.state.value
												: undefined,
										page: 1,
									}),
								});
							},
						}}
						children={(field) => (
							<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline">
										<Filter
											className="-ms-1 opacity-60"
											size={16}
											aria-hidden="true"
										/>
										Status
										{(field.state.value || [])?.length > 0 && (
											<span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
												{field.state.value?.length}
											</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-3" align="start">
									<div className="space-y-3">
										<div className="text-muted-foreground text-xs font-medium">
											Filtrar por Status
										</div>
										<div className="space-y-2">
											{Object.values(
												AppointmentsByCompanyResponseDtoOutputItemsItemStatus,
											).map((status) => (
												<div
													key={status}
													className="flex items-center space-x-2"
												>
													<Checkbox
														id={`status-${status}`}
														checked={field.state.value?.includes(status)}
														onCheckedChange={() => {
															field.handleChange(
																handleStatusToggle(
																	status,
																	field.state.value ?? [],
																),
															);
														}}
													/>
													<Label
														htmlFor={`status-${status}`}
														className="text-sm font-normal cursor-pointer"
													>
														{appointmentStatusResource[status]}
													</Label>
												</div>
											))}
										</div>
									</div>
								</PopoverContent>
							</Popover>
						)}
					/>
				</div>
			</div>
		</>
	);
}
