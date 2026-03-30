export interface UpdateGoodsReceiptBatchDto {
	id: number;

	productId: number;

	quantity: number;
	unitPrice: number;

	batchNumber?: string;
	serialNumber?: string;
	expiredAt?: string;
}