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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
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
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { staffRolesResource } from "@/constants/staff-roles-resouce";
import { ListStaffByCompanyResponseDtoOutputItemsItem } from "@/lib/http/generated/models";

type StaffTableProps = {
	staff: ListStaffByCompanyResponseDtoOutputItemsItem[];
	isLoading?: boolean;
	totalItems?: number;
	totalPages?: number;
	page?: number;
	onPageChange?: (page: number) => void;
};

export function StaffTable({
	staff,
	isLoading,
	totalItems = 0,
	totalPages = 1,
	page = 1,
	onPageChange,
}: StaffTableProps) {
	if (isLoading) {
		return (
			<TableSkeleton
				rows={10}
				columns={[
					{ skeletonWidth: "w-48" },
					{ skeletonWidth: "w-64" },
					{ skeletonWidth: "w-32" },
					{ skeletonWidth: "w-40" },
					{ skeletonWidth: "w-24" },
				]}
			/>
		);
	}

	if (!staff || staff.length === 0) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-muted-foreground">
					Nenhum funcionário encontrado.
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="bg-background overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							<TableHead>Nome</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Cargo</TableHead>
							<TableHead>Data de criação</TableHead>
							<TableHead className="w-16">
								<span className="sr-only">Ações</span>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{staff.map((staff) => (
							<TableRow key={staff.id} data-state={false && "selected"}>
								<TableCell>
									<div className="font-medium">{staff.user.name}</div>
								</TableCell>
								<TableCell>
									<div>
										<div className="font-medium">{staff.user.email}</div>
									</div>
								</TableCell>
								<TableCell>
									<Badge variant={"secondary"}>
										{staffRolesResource[staff.role]}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="font-medium">
										{format(new Date(staff.createdAt), "dd/MM/yyyy")}
									</div>
								</TableCell>
								<TableCell>
									<RowActions staff={staff} />
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

function RowActions({
	staff: _staff,
}: {
	staff: ListStaffByCompanyResponseDtoOutputItemsItem;
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
				<DropdownMenuItem className="text-destructive focus:text-destructive">
					<span>Excluir</span>
					<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
