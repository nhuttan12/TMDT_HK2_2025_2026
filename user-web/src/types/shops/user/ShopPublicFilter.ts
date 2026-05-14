export interface ShopPublicFilter {
	categoryId?: number;
	sortBy?: 'popular' | 'latest' | 'price_asc' | 'price_desc';
	page: number;
	limit: number;
}
