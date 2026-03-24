import { UpdateGoodsReceiptBatchDto } from '@/types/inventories/receipts/dtos/UpdateGoodsReceiptBatchDto';

export interface UpdateGoodsReceiptDto {
	id: number;
	code: string;

	supplierID?: number;

	importDate?: string;
	note?: string;

	batches?: UpdateGoodsReceiptBatchDto[];
}