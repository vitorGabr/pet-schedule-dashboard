import { useGetCompanyById, useGetSession } from "@/lib/http";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Star } from "lucide-react";
import { useState } from "react";
import { ImageUpload } from "@/components/image-upload";
import { SiteHeader } from "@/components/site-header";
import { ContactInformation } from "./-components/contact-information";
import { Gallery } from "./-components/gallery";
import { HoursAndStats } from "./-components/hours-and-stats";
import { ProfileSkeleton } from "./-components/profile-skeleton";

export const Route = createFileRoute("/(app)/profile/")({ component: App });

function App() {
	const [imageDialogVariant, setImageDialogVariant] = useState<"logo" | "gallery" | null>(null);
	const { data: session } = useGetSession();
	const { data: company, isLoading } = useGetCompanyById(session?.companyId!, {
		query: { enabled: !!session?.companyId },
	});

	if (isLoading) {
		return <ProfileSkeleton />;
	}
	return (
		<>
			<SiteHeader title="Perfil da Empresa" />
			<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Profile Info */}
					<div className="lg:col-span-2 space-y-6">
						<div className="bg-white p-6 rounded-lg border border-gray-200">
							<div className="flex items-start space-x-4">
								<div className="relative group">
									<img
										src={company?.logo?.url}
										alt="Logo da empresa"
										className="w-20 h-20 bg-gray-200 border rounded-lg object-cover"
									/>
									<Button
										size="sm"
										variant="outline"
										className="absolute top-2 right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
										onClick={() => setImageDialogVariant("logo")}
									>
										<Pencil className="w-3 h-3" />
									</Button>
								</div>
								<div className="flex-1">
									<h2 className="text-2xl font-bold text-gray-900">{company?.name}</h2>
									<div className="flex items-center mt-2">
										<Star className="w-4 h-4 text-yellow-500 mr-1" />
										<span className="font-medium text-gray-900">{company?.ratingAverage}</span>
										<span className="text-gray-500 ml-1">
											({company?.ratingAverage} avaliações)
										</span>
									</div>
								</div>
							</div>

							<div className="mt-4">
								<p className="text-gray-700 leading-relaxed">Sem descrição disponível</p>
							</div>
						</div>

						<ContactInformation
							address={`${company?.address?.addressLine}, ${company?.address?.number}, ${company?.address?.neighborhood}, ${company?.address?.city}, ${company?.address?.state}, ${company?.address?.country}`}
							contact={company?.contact ?? ""}
						/>
						<Gallery
							images={company?.images ?? []}
							onAddImage={() => {}}
							onRemoveImage={() => {}}
						/>
					</div>
					<HoursAndStats
						availabilities={company?.availabilities ?? []}
						ratingAverage={company?.ratingAverage ?? 0}
					/>
					{imageDialogVariant && (
						<ImageUpload
							onClose={() => setImageDialogVariant(null)}
							variant={imageDialogVariant}
							companyId={session?.companyId!}
						/>
					)}
				</div>
			</div>
		</>
	)
}
