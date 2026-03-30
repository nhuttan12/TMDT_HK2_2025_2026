export interface GoodsIssueItem {
	id: number;

	productId: number;
	productName: string;
	sku: string;

	quantity: number;
	unitPrice: number;

	totalPrice: number; // = quantity * unitPrice

	batchNumber?: string;
	serialNumber?: string;

	note?: string;
}
