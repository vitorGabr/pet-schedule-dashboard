import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

type EmptyServicesProps = { onCreateService?: () => void };

export function EmptyServices({ onCreateService }: EmptyServicesProps) {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Plus />
				</EmptyMedia>
				<EmptyTitle>Nenhum serviço encontrado</EmptyTitle>
				<EmptyDescription>
					Comece criando seu primeiro serviço.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button onClick={onCreateService}>
					<Plus />
					Criar Serviço
				</Button>
			</EmptyContent>
		</Empty>
	);
}
