export interface GoodsReceiptBatch {
	id: string; // Batch ID

	// Use for front end for distinguishing between new and existing batches
	isNew?: boolean;

	// Product info
	productId: string;
	productName: string;

	batchNumber: string;
	quantity: number;
	totalPrice: number;

	manufacturedAt?: string;
	expiredAt: string;
}