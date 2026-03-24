export interface UpdateGoodsReceiptBatchDto {
	id: number;

	productID: number;

	quantity: number;
	unitPrice: number;

	batchNumber?: string;
	serialNumber?: string;
	expiredAt?: string;
}