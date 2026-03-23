export interface UpdateGoodsReceiptItemDto {
	id: number;

	productID: number;

	quantity: number;
	unitPrice: number;

	batchNumber?: string;
	serialNumber?: string;
	expiredAt?: string;

	note?: string;
}