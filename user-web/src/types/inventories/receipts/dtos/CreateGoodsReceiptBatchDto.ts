export interface CreateGoodsReceiptBatchDto {
	productId: number;

	batchNumber: string;
	quantity: number;

	manufacturedAt?: string;
	expiredAt?: string;
	serialNumbers?: string[];
}