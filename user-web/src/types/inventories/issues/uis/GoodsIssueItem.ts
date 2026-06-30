export interface GoodsIssueItem {
	id: string;

	variantId: string;
	variantName: string;
	sku: string;

	quantity: number;
	unitPrice: number;

	totalPrice: number; // = quantity * unitPrice
}
