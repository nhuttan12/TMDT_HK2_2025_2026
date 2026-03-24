export interface GoodsReceiptBatch {
	id: number; // Batch ID

	// Product info
	productID: number;
	productName: string;

	batchNumber: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;

	manufacturedAt?: string;
	expiredAt?: string;

	isSerialInputted: boolean;
}