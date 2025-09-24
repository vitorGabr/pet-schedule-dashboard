export type PaginateQuery<T> = {
	items: T[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
};
