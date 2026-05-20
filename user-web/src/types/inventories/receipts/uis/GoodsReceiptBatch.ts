export interface GoodsReceiptBatch {
	id: number; // Batch ID

	// Use for front end for distinguishing between new and existing batches
	isNew?: boolean;

	// Product info
	productId: number;
	productName: string;

	batchNumber: string;
	quantity: number;
	totalPrice: number;

	manufacturedAt?: string;
	expiredAt: string;
}