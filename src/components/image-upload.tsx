import { addLogoToCompany, getGetCompanyByIdQueryKey } from "@/lib/http";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import {
	type CompanyProfileImage,
	companyProfileImageSchema,
} from "@/schemas/company-profile-image";
import { cn } from "@/utils/cn";

interface ImageUploadProps {
	onClose: () => void;
	variant?: "logo" | "gallery";
	companyId: string;
}

export function ImageUpload({
	onClose,
	variant = "gallery",
	companyId,
}: ImageUploadProps) {
	const queryClient = useQueryClient();
	const form = useForm({
		defaultValues: { companyId } as CompanyProfileImage,
		validators: { onSubmit: companyProfileImageSchema },
		onSubmit: async ({ value }) => {
			if (variant === "logo") {
				await addLogoToCompany(value.companyId, { file: value.file });
			}
			queryClient.invalidateQueries({
				queryKey: getGetCompanyByIdQueryKey(value.companyId),
			});
			onClose();
			toast.success("Foto adicionada à galeria");
		},
	});

	return (
		<Dialog open={true} onOpenChange={onClose}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"w-full h-36 border-2 border-dashed border-gray-300 hover:border-gray-400 flex flex-col items-center justify-center space-y-2",
					)}
				>
					<Upload className="w-8 h-8 text-gray-400" />
					<span className="text-sm text-gray-500">Adicionar Foto</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Adicionar Foto</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<div className="space-y-4">
						<form.Field
							name="file"
							children={(field) => {
								return (
									<div className="flex items-center justify-center w-full">
										<label
											htmlFor={field.name}
											className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
										>
											<div className="flex flex-col items-center justify-center pt-5 pb-6">
												<Upload className="w-8 h-8 mb-2 text-gray-400" />
												<p className="mb-2 text-sm text-gray-500">
													<span className="font-semibold">
														Clique para selecionar
													</span>{" "}
													ou arraste e solte
												</p>
												<p className="text-xs text-gray-500">
													PNG, JPG ou WEBP (MAX. 2MB)
												</p>
											</div>
											<Input
												id={field.name}
												type="file"
												className="hidden"
												accept="image/*"
												name={field.name}
												onBlur={field.handleBlur}
												onChange={(e) => {
													if (e.target.files?.[0]) {
														field.handleChange(e.target.files[0]);
													}
												}}
											/>
										</label>
									</div>
								);
							}}
						/>
						<form.Subscribe
							selector={(state) => [state.values.file]}
							children={([file]) =>
								file && (
									<div className="flex justify-center">
										{/** biome-ignore lint/performance/noImgElement: <> */}
										<img
											src={URL.createObjectURL(file)}
											alt="Preview"
											className="w-32 h-32 object-cover rounded-lg border"
										/>
									</div>
								)
							}
						/>

						<form.Subscribe
							selector={(state) => [state.isSubmitting]}
							children={([isSubmitting]) => (
								<div className="flex justify-end space-x-2">
									<Button
										variant="outline"
										onClick={onClose}
										disabled={isSubmitting}
									>
										Cancelar
									</Button>
									<Button type="submit" disabled={isSubmitting}>
										{isSubmitting ? "Adicionando..." : "Adicionar"}
									</Button>
								</div>
							)}
						/>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
