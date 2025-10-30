import { createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	useGetCompanyRatingStats,
	useListCompanyRatings,
} from "@/lib/http/generated/endpoints/avaliações/avaliações";
import { RatingsSkeleton } from "./-components/ratings-skeleton";

export const Route = createFileRoute("/(app)/ratings/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { companyId } = Route.useRouteContext();
	const ratingStats = useGetCompanyRatingStats(companyId);
	const ratings = useListCompanyRatings(companyId);

	const isLoading = ratingStats.isLoading || ratings.isLoading;

	if (isLoading) {
		return <RatingsSkeleton />;
	}

	return (
		<div>
			<SiteHeader title="Avaliações" />
			<div className="px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<Card>
							<CardContent className="p-6">
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-lg font-semibold text-gray-900">
										Avaliações dos Clientes
									</h3>
									<Button variant="outline" size="sm">
										Ver todas
									</Button>
								</div>
								<div className="space-y-6">
									{ratings.data?.items.map((avaliacao) => (
										<div
											key={avaliacao.id}
											className="border-b border-gray-200 pb-6 last:border-b-0"
										>
											<div className="flex items-start space-x-3">
												<Avatar className="w-10 h-10">
													<AvatarImage src={"#"} alt={avaliacao.user?.name} />
													<AvatarFallback>
														{avaliacao.user?.name
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<div className="flex items-center justify-between mb-1">
														<h4 className="font-medium text-gray-900">
															{avaliacao.user?.name}
														</h4>
														<span className="text-xs text-gray-500">
															{format(avaliacao.createdAt, "dd/MM/yyyy")}
														</span>
													</div>
													<div className="flex items-center space-x-2 mb-2">
														<div className="flex">
															{renderStars(avaliacao.rating)}
														</div>
														<Badge variant="secondary" className="text-xs">
															Banho e Tosa
														</Badge>
													</div>
													<p className="text-sm text-gray-600">
														{avaliacao.comment}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					<div>
						<Card>
							<CardContent className="p-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-6">
									Distribuição das Avaliações
								</h3>
								<div className="space-y-4">
									{ratingStats.data?.distribution.map((item) => (
										<div
											key={item.rating}
											className="flex items-center space-x-3"
										>
											<div className="flex items-center space-x-1 w-12">
												<span className="text-sm font-medium">
													{item.rating}
												</span>
												<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
											</div>
											<div className="flex-1">
												<div className="w-full bg-gray-200 rounded-full h-2">
													<div
														className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
														style={{ width: `${item.count}%` }}
													></div>
												</div>
											</div>
											<span className="text-sm text-gray-600 w-8">
												{item.count}
											</span>
										</div>
									))}
								</div>
								<div className="mt-6 pt-4 border-t border-gray-200">
									<div className="text-center">
										<div className="text-2xl font-bold text-gray-900">4.3</div>
										<div className="flex justify-center mb-1">
											{renderStars(4)}
										</div>
										<div className="text-sm text-gray-600">
											Baseado em {ratings.data?.items.length} avaliações
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}

function renderStars(rating: number) {
	return [1, 2, 3, 4, 5].map((star) => {
		if (star < rating) {
			return <Star key={star} className="w-4 h-4 text-yellow-500" />;
		}
		return <Star key={star} className="w-4 h-4 text-muted-foreground/70" />;
	});
}
