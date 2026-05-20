export interface UpdateGoodsReceiptBatchDto {
	id: number;

	productId: number;

	quantity: number;

	batchNumber?: string;
	serialNumber?: string;
	expiredAt?: string;
}