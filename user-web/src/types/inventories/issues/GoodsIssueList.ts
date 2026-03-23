export interface GoodsIssueList {
	id: number;
	code: string;
	customerName?: string;
	exportDate: string;
	totalQuantity: number;
	totalAmount: number;
	status: 'draft' | 'confirmed' | 'cancelled';
	createdAt: string;
	updatedAt: string;
}
