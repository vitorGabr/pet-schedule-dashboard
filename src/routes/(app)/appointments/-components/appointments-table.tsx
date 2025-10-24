import { format } from "date-fns";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	MoreHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

			{appointments.length === 0 && (
				<div className="flex items-center justify-center h-64">
					<div className="text-muted-foreground">
						Nenhum agendamento encontrado.
					</div>
				</div>
			)}

			{appointments.length > 0 && (
				<>
					{/* Table */}
					<div className="bg-background overflow-hidden rounded-md border">
						<Table>
							<TableHeader>
								<TableRow className="hover:bg-transparent">
									<TableHead className="w-12">
										<Checkbox
											checked={false}
											ref={(_) => {}}
											onCheckedChange={() => {}}
											aria-label="Selecionar todos"
										/>
									</TableHead>
									<TableHead>Cliente</TableHead>
									<TableHead>Animal</TableHead>
									<TableHead>Serviço</TableHead>
									<TableHead>Data/Hora</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Preço</TableHead>
									<TableHead className="w-16">
										<span className="sr-only">Ações</span>
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{appointments.length > 0 ? (
									appointments.map((appointment) => (
										<TableRow
											key={appointment.id}
											data-state={false && "selected"}
										>
											<TableCell>
												<Checkbox
													checked={false}
													onCheckedChange={(_) => () => {}}
													aria-label="Selecionar linha"
												/>
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
													{new Intl.NumberFormat("pt-BR", {
														style: "currency",
														currency: "BRL",
													}).format(appointment.price)}
												</div>
											</TableCell>
											<TableCell>
												<RowActions appointment={appointment} />
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

function RowActions({
	appointment: _appointment,
}: {
	appointment: AppointmentsByCompanyResponseDtoOutputItemsItem;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="shadow-none"
					aria-label="Editar agendamento"
				>
					<MoreHorizontal size={16} aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<span>Editar</span>
						<DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<span>Duplicar</span>
						<DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<span>Confirmar</span>
						<DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<span>Cancelar</span>
						<DropdownMenuShortcut>⌘X</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="text-destructive focus:text-destructive">
					<span>Excluir</span>
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
