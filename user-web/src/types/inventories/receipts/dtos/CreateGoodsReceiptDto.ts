import { CreateGoodsReceiptBatchDto } from '@/types/inventories/receipts/dtos/CreateGoodsReceiptBatchDto';

export interface CreateGoodsReceiptDto {
	code?: string;

	supplierID: string;

	importDate: string;
	note?: string;

	batches: CreateGoodsReceiptBatchDto[];
}