import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils/cn";

type ColumnConfig = {
	/** Largura da coluna (ex: "w-12", "w-48") */
	width?: string;
	/** Se deve mostrar um avatar/checkbox no início */
	hasAvatar?: boolean;
	/** Se a coluna tem duas linhas (título + subtítulo) */
	hasSubtitle?: boolean;
	/** Largura do skeleton (ex: "w-24", "w-32") */
	skeletonWidth?: string;
};

type TableSkeletonProps = {
	/** Número de linhas a exibir */
	rows?: number;
	/** Configuração das colunas ou número simples de colunas */
	columns?: number | ColumnConfig[];
	/** Se deve mostrar o checkbox de seleção */
	showCheckbox?: boolean;
	/** Se deve mostrar a coluna de ações */
	showActions?: boolean;
	/** Classes CSS adicionais para o container */
	className?: string;
};

const defaultColumnWidths = [
	"w-32",
	"w-40",
	"w-24",
	"w-28",
	"w-20",
	"w-36",
	"w-24",
	"w-28",
];

export function TableSkeleton({
	rows = 10,
	columns = 5,
	showCheckbox = false,
	showActions = false,
	className,
}: TableSkeletonProps) {
	const columnConfigs: ColumnConfig[] =
		typeof columns === "number"
			? Array.from({ length: columns }, (_, i) => ({
					skeletonWidth: defaultColumnWidths[i % defaultColumnWidths.length],
				}))
			: columns;

	return (
		<div className={cn("bg-background overflow-hidden rounded-md border", className)}>
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						{showCheckbox && (
							<TableHead className="w-12">
								<Skeleton className="h-4 w-4 rounded" />
							</TableHead>
						)}
						{columnConfigs.map((col, index) => (
							<TableHead key={`header-${index}`} className={col.width}>
								<Skeleton
									className={cn("h-4", col.skeletonWidth ?? "w-20")}
								/>
							</TableHead>
						))}
						{showActions && (
							<TableHead className="w-16">
								<span className="sr-only">Ações</span>
							</TableHead>
						)}
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: rows }).map((_, rowIndex) => (
						<TableRow key={`row-${rowIndex}`}>
							{showCheckbox && (
								<TableCell>
									<Skeleton className="h-4 w-4 rounded" />
								</TableCell>
							)}
							{columnConfigs.map((col, colIndex) => (
								<TableCell key={`cell-${rowIndex}-${colIndex}`}>
									{col.hasAvatar ? (
										<div className="flex items-center gap-3">
											<Skeleton className="h-10 w-10 rounded-full" />
											<div className="space-y-1.5">
												<Skeleton className={cn("h-4", col.skeletonWidth ?? "w-24")} />
												{col.hasSubtitle && (
													<Skeleton className="h-3 w-20" />
												)}
											</div>
										</div>
									) : col.hasSubtitle ? (
										<div className="space-y-1.5">
											<Skeleton className={cn("h-4", col.skeletonWidth ?? "w-24")} />
											<Skeleton className="h-3 w-16" />
										</div>
									) : (
										<Skeleton
											className={cn("h-4", col.skeletonWidth ?? "w-24")}
										/>
									)}
								</TableCell>
							))}
							{showActions && (
								<TableCell>
									<Skeleton className="h-8 w-8 rounded" />
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
