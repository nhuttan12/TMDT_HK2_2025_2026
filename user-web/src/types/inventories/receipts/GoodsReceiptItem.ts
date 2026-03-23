export interface GoodsReceiptItem {
	id: number;

	productID: number;
	productName: string;
	sku: string;

	quantity: number;
	unitPrice: number;

	totalPrice: number; // = quantity * unitPrice

	batchNumber?: string;
	serialNumber?: string;
	expiredAt?: string;

	note?: string;
}