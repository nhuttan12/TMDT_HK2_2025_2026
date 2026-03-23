import { GoodsReceiptStatus } from './GoodsReceiptStatus';

export interface GoodsReceiptList {
	id: number;

	code: string;

	supplierName: string;

	importDate: string;

	totalQuantity: number;
	totalAmount: number;

	status: GoodsReceiptStatus;
}