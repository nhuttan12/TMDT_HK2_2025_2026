import { CreateGoodsReceiptItemDto } from '@/types/inventories/receipts/CreateGoodsReceiptItemDto';

export interface CreateGoodsReceiptDto {
	code?: string;

	supplierID: number;
	warehouseID: number;

	importDate: string;
	note?: string;

	items: CreateGoodsReceiptItemDto[];
}