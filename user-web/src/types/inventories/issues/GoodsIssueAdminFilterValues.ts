export interface GoodsIssueAdminFilterValues {
	code?: string;
	exportDate?: string;
	status?: 'ALL' | 'draft' | 'confirmed' | 'cancelled';
	minQuantity?: number;
	maxQuantity?: number;
	minAmount?: number;
	maxAmount?: number;
}
