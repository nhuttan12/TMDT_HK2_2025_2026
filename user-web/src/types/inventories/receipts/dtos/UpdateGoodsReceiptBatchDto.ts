export interface UpdateGoodsReceiptBatchDto {
	id: string;

	productId: string;

	quantity: number;

	batchNumber?: string;
	serialNumber?: string;
	expiredAt?: string;
}