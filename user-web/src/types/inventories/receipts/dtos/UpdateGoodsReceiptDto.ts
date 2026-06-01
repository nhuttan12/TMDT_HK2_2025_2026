import { UpdateGoodsReceiptBatchDto } from '@/types/inventories/receipts/dtos/UpdateGoodsReceiptBatchDto';

export interface UpdateGoodsReceiptDto {
	id: string;
	code: string;

	supplierID?: string;

	importDate?: string;
	note?: string;

	batches?: UpdateGoodsReceiptBatchDto[];
}