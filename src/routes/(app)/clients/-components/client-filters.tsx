import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import type z from "zod";
import { pageSearchSchema } from "@/schemas/page-search";
import { cn } from "@/utils/cn";

type ClientFiltersProps = { search?: string };

export function ClientFilters({ search }: ClientFiltersProps) {
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: { query: search } as z.input<typeof pageSearchSchema>,
		validators: { onChange: pageSearchSchema },
	});

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
									to: "/clients",
									search: (prev) => ({
										...prev,
										query: fieldApi.state.value,
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
									placeholder="Filtrar por nome ou email..."
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
				</div>
			</div>
		</>
	);
}
