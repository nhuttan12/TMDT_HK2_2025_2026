import { GoodsReceiptStatus } from './GoodsReceiptStatus';

export interface ReceiptAdminFilterValues {
	code?: string;

	supplierID?: number;

	status?: GoodsReceiptStatus | 'ALL';

	importDateFrom?: string;
	importDateTo?: string;

	minTotalAmount?: number;
	maxTotalAmount?: number;
}
