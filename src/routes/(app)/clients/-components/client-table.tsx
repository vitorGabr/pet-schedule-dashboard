import type { ListCompanyClientsResponseDtoOutputItemsItem } from "@/lib/http";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
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
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type ClientTableProps = {
	clients?: ListCompanyClientsResponseDtoOutputItemsItem[];
	isLoading?: boolean;
	totalItems?: number;
	totalPages?: number;
	page?: number;
	onPageChange?: (page: number) => void;
};

export function ClientTable({
	clients,
	isLoading,
	totalItems = 0,
	totalPages = 1,
	page = 1,
	onPageChange,
}: ClientTableProps) {
	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-muted-foreground">Carregando clientes...</div>
			</div>
		);
	}

	if (!clients || clients.length === 0) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-muted-foreground">Nenhum cliente encontrado.</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
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
							<TableHead>Nome</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Total de Agendamentos</TableHead>
							<TableHead>Data do Último Agendamento</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{clients?.map((client) => (
							<TableRow key={client.id} data-state={false && "selected"}>
								<TableCell>
									<Checkbox
										checked={false}
										onCheckedChange={(_) => () => {}}
										aria-label="Selecionar linha"
									/>
								</TableCell>
								<TableCell>
									<div className="font-medium">{client.name}</div>
								</TableCell>
								<TableCell>
									<div>
										<div className="font-medium">{client.email}</div>
									</div>
								</TableCell>
								<TableCell>{client.appointmentsCount}</TableCell>
								<TableCell>
									<div className="font-medium">
										{format(new Date(client.lastAppointmentDate || ""), "dd/MM/yyyy")}
									</div>
								</TableCell>
							</TableRow>
						))}
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
						<SelectTrigger id={`page-size`} className="w-fit whitespace-nowrap">
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
		</div>
	);
}
