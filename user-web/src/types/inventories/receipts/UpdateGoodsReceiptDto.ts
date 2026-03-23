import { UpdateGoodsReceiptItemDto } from '@/types/inventories/receipts/UpdateGoodsReceiptItemDto';

export interface UpdateGoodsReceiptDto {
	id: number;

	supplierID?: number;
	warehouseID?: number;

	importDate?: string;
	note?: string;

	items?: UpdateGoodsReceiptItemDto[];
}