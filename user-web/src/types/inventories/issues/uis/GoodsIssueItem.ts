export interface GoodsIssueItem {
	id: string;

	productId: string;
	productName: string;
	sku: string;

	quantity: number;
	unitPrice: number;

	totalPrice: number; // = quantity * unitPrice

	batchNumber?: string;
	serialNumber?: string;

	note?: string;
}
