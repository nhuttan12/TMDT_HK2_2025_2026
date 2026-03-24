import { CreateGoodsReceiptBatchDto } from '@/types/inventories/receipts/dtos/CreateGoodsReceiptBatchDto';

export interface CreateGoodsReceiptDto {
	code?: string;

	supplierID: number;

	importDate: string;
	note?: string;

	batches: CreateGoodsReceiptBatchDto[];
}