export interface GoodsReceiptBatch {
	id: string; // Batch ID

	// Product info
	productId: string;
	productName: string;

	batchCode: string;
	quantity: number;
	totalPrice: number;
}