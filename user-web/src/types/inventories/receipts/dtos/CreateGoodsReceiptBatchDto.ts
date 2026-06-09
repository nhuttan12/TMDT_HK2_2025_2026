export interface CreateGoodsReceiptBatchDto {
	productId: string;

	batchNumber: string;
	quantity: number;

	manufacturedAt?: string;
	expiredAt?: string;
	serialNumbers?: string[];
}