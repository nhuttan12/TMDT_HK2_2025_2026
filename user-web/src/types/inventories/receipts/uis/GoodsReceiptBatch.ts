export interface GoodsReceiptBatch {
	id: string; // Batch ID

	// Product info
	productId: string;
	productName: string;

	batchNumber: string;
	quantity: number;
	totalPrice: number;
}