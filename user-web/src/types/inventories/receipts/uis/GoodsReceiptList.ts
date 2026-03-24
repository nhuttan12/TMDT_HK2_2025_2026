import { GoodsReceiptStatus } from './GoodsReceiptStatus';

export interface GoodsReceiptList {
	id: number;
	code: string;
	supplierName: string;
	importDate: string;
	totalBatches: number;
	totalQuantity: number;
	totalAmount: number;
	status: GoodsReceiptStatus;
	createdByName: string;
}