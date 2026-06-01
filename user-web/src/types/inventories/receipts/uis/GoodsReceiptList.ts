import { GoodsReceiptStatus } from './GoodsReceiptStatus';

export interface GoodsReceiptList {
	id: string;
	code: string;
	supplierName: string;
	importDate: string;
	totalBatches: number;
	totalQuantity: number;
	totalAmount: number;
	status: GoodsReceiptStatus;
	createdAt: string;
}