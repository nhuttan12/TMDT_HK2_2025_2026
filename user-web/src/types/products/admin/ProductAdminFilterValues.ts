export interface ProductAdminFilterValues {
	name?: string;
	slug?: string;
	priceMin?: number;
	priceMax?: number;
	status?: boolean | 'ALL';
	createdFrom?: string;
	createdTo?: string;
	updatedFrom?: string;
	updatedTo?: string;
}