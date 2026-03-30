export interface CreateGoodsReceiptBatchDto {
	productId: number;

	batchNumber: string;
	quantity: number;
	unitPrice: number;

	manufacturedAt?: string;
	expiredAt?: string;
	serialNumbers?: string[];
}