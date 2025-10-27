import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CompanyByIdResponseDtoOutputImagesItem } from "@/lib/http";
import { cn } from "@/utils/cn";

type GalleryProps = {
	images: CompanyByIdResponseDtoOutputImagesItem[];
	onAddImage?: () => void;
	onRemoveImage?: (imageId: string) => void;
};

export function Gallery({ images, onAddImage, onRemoveImage }: GalleryProps) {
	return (
		<div className="bg-white p-6 rounded-lg border border-gray-200">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-semibold text-gray-900">
					Galeria de Fotos
				</h3>
			</div>
			<div className="grid grid-cols-3 gap-4">
				{images?.map((image, index) => (
					<div key={image.url || index} className="relative group">
						<img
							src={image.url}
							alt={`Foto ${index + 1}`}
							className="w-full h-36 object-cover rounded-lg"
						/>
						<Button
							size="sm"
							variant="destructive"
							className="absolute top-2 right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
							onClick={() => onRemoveImage?.(image.id)}
						>
							<X className="w-3 h-3" />
						</Button>
					</div>
				))}
				<Button
					variant="outline"
					className={cn(
						"w-full h-36 border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center space-y-2",
					)}
					onClick={onAddImage}
				>
					<Upload className="w-8 h-8 text-gray-400" />
					<span className="text-sm text-gray-500">Adicionar Foto</span>
				</Button>
			</div>
			{images?.length === 0 && (
				<div className="flex justify-center items-center py-4">
					<p className="text-gray-500">Nenhuma foto encontrada</p>
				</div>
			)}
		</div>
	);
}
