import { GoodsReceiptStatus } from '@/types/inventories/receipts/uis/GoodsReceiptStatus';
import { GoodsReceiptBatch } from '@/types/inventories/receipts/uis/GoodsReceiptBatch';

export interface GoodsReceiptDetail {
	id: number;
	code: string;
	supplierID: number
	supplierName: string;
	importDate: string;
	importStatus: GoodsReceiptStatus;
	note?: string;

	batches: GoodsReceiptBatch[];
}