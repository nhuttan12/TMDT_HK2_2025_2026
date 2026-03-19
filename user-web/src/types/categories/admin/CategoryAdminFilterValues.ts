export interface CategoryAdminFilterValues {
	name?: string;
	slug?: string;

	productCountMin?: number;
	productCountMax?: number;

	status?: boolean | 'ALL';

	createdFrom?: string;
	createdTo?: string;

	updatedFrom?: string;
	updatedTo?: string;
}