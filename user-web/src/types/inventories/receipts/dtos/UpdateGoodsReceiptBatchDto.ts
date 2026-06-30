export interface UpdateGoodsReceiptBatchDto {
	id: string;

	productId: string;

	quantity: number;

	batchCode?: string;
}