import { GoodsReceiptItem } from '@/types/inventories/receipts/GoodsReceiptItem';
import { GoodsReceiptStatus } from '@/types/inventories/receipts/GoodsReceiptStatus';
import { GoodsReceiptSupplier } from '@/types/inventories/receipts/GoodsReceiptSupplier';

export interface GoodsReceipt {
	id: number;

	code: string; // PNK-20260319-001

	supplier?: GoodsReceiptSupplier; // optional populate

	warehouseID: number;

	createdBy: number; // userId
	createdByName?: string;

	importDate: string;

	status: GoodsReceiptStatus;

	note?: string;

	items: GoodsReceiptItem[];

	totalQuantity: number;
	totalAmount: number;

	createdAt: string;
	updatedAt: string;

	confirmedAt?: string;
	cancelledAt?: string;
}