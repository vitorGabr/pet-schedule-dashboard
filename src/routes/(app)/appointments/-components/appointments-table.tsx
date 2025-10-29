import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { appointmentStatusResource } from "@/constants/appointment-status";
import type {
	AppointmentsByCompanyResponseDtoOutputItemsItem,
	AppointmentsByCompanyResponseDtoOutputItemsItemStatus,
} from "@/lib/http";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/currency";
import { AppointmentFilters } from "./appointment-filters";

type AppointmentsTableProps = {
	appointments: AppointmentsByCompanyResponseDtoOutputItemsItem[];
	isLoading?: boolean;
	totalItems?: number;
	totalPages?: number;
	query?: string;
	status?: AppointmentsByCompanyResponseDtoOutputItemsItemStatus[];
	page?: number;
	onPageChange?: (page: number) => void;
};

export function AppointmentsTable({
	appointments,
	isLoading,
	totalItems = 0,
	totalPages = 1,
	query,
	status,
	page = 1,
	onPageChange,
}: AppointmentsTableProps) {
	const nav = useNavigate();

	return (
		<div className="space-y-4">
			<AppointmentFilters query={query} statusSelected={status} />

			{isLoading && (
				<div className="flex items-center justify-center h-64">
					<div className="text-muted-foreground">
						Carregando agendamentos...
					</div>
				</div>
			)}

			{appointments.length === 0 && !isLoading && (
				<div className="flex items-center justify-center h-64">
					<div className="text-muted-foreground">
						Nenhum agendamento encontrado.
					</div>
				</div>
			)}

			{appointments.length > 0 && (
				<>
					<div className="bg-background overflow-hidden rounded-md border">
						<Table>
							<TableHeader>
								<TableRow className="hover:bg-transparent">
									<TableHead>
										<span className="sr-only">Avatar</span>
									</TableHead>
									<TableHead>Cliente</TableHead>
									<TableHead>Animal</TableHead>
									<TableHead>Serviço</TableHead>
									<TableHead>Data/Hora</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Preço</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{appointments.length > 0 ? (
									appointments.map((appointment) => (
										<TableRow
											key={appointment.id}
											className="cursor-pointer"
											onClick={() => {
												nav({
													to: "/appointments",
													search: (prev) => ({ ...prev, id: appointment.id }),
												});
											}}
										>
											<TableCell>
												<Avatar className="size-10">
													<AvatarImage
														src={appointment.client.avatarUrl}
														alt={appointment.client.name}
													/>
													<AvatarFallback className="text-sm uppercase">
														{appointment.client.name.substring(0, 2)}
													</AvatarFallback>
												</Avatar>
											</TableCell>
											<TableCell>
												<div className="font-medium">
													{appointment.client.name}
												</div>
											</TableCell>
											<TableCell>
												<div>
													<div className="font-medium">
														{appointment.animal.name}
													</div>
													{appointment.animal.breed && (
														<div className="text-sm text-muted-foreground">
															{appointment.animal.breed.name}
														</div>
													)}
												</div>
											</TableCell>
											<TableCell>{appointment.service.name}</TableCell>
											<TableCell>
												<div>
													<div className="font-medium">
														{format(
															new Date(appointment.startDate),
															"dd/MM/yyyy",
														)}
													</div>
													<div className="text-sm text-muted-foreground">
														{format(new Date(appointment.startDate), "HH:mm")} -{" "}
														{format(new Date(appointment.endDate), "HH:mm")}
													</div>
												</div>
											</TableCell>
											<TableCell>
												<Badge variant={"secondary"}>
													<div
														className={cn(
															"size-1.5 rounded-full mr-1",
															appointment.status === "scheduled" &&
																"bg-yellow-500",
															appointment.status === "confirmed" &&
																"bg-green-500",
															appointment.status === "in_progress" &&
																"bg-yellow-500",
															appointment.status === "completed" &&
																"bg-green-500",
															appointment.status === "canceled" && "bg-red-500",
															appointment.status === "no_show" && "bg-red-500",
														)}
													/>
													{appointmentStatusResource[appointment.status]}
												</Badge>
											</TableCell>
											<TableCell>
												<div className="font-medium">
													{formatCurrency(appointment.price / 100)}
												</div>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={8} className="h-24 text-center">
											Nenhum agendamento encontrado.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>

					{/* Pagination */}
					<div className="flex items-center justify-between gap-8">
						{/* Results per page */}
						<div className="flex items-center gap-3">
							<Label htmlFor={`page-size`} className="max-sm:sr-only">
								Itens por página
							</Label>
							<Select value={"10"}>
								<SelectTrigger
									id={`page-size`}
									className="w-fit whitespace-nowrap"
								>
									<SelectValue placeholder="Selecione o número de resultados" />
								</SelectTrigger>
								<SelectContent>
									{[5, 10, 25, 50].map((size) => (
										<SelectItem key={size} value={size.toString()}>
											{size}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Page info */}
						<div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
							<p aria-live="polite">
								<span className="text-foreground">
									{(page - 1) * 10 + 1}-{Math.min(page * 10, totalItems)}
								</span>{" "}
								de <span className="text-foreground">{totalItems}</span>
							</p>
						</div>

						{/* Pagination buttons */}
						<div>
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<Button
											size="icon"
											variant="outline"
											onClick={() => onPageChange?.(1)}
											disabled={page <= 1}
											aria-label="Ir para primeira página"
										>
											<ChevronsLeft size={16} aria-hidden="true" />
										</Button>
									</PaginationItem>
									<PaginationItem>
										<Button
											size="icon"
											variant="outline"
											onClick={() => onPageChange?.(page - 1)}
											disabled={page <= 1}
											aria-label="Ir para página anterior"
										>
											<ChevronLeft size={16} aria-hidden="true" />
										</Button>
									</PaginationItem>
									<PaginationItem>
										<Button
											size="icon"
											variant="outline"
											onClick={() => onPageChange?.(page + 1)}
											disabled={page >= totalPages}
											aria-label="Ir para próxima página"
										>
											<ChevronRight size={16} aria-hidden="true" />
										</Button>
									</PaginationItem>
									<PaginationItem>
										<Button
											size="icon"
											variant="outline"
											onClick={() => onPageChange?.(totalPages)}
											disabled={1 >= totalPages}
											aria-label="Ir para última página"
										>
											<ChevronsRight size={16} aria-hidden="true" />
										</Button>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
