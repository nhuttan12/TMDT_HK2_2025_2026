import { GoodsIssueItem } from '@/types/inventories/issues/GoodsIssueItem';
import { GoodsIssueStatus } from '@/types/inventories/issues/GoodsIssueStatus';
import { GoodsIssueCustomer } from '@/types/inventories/issues/GoodsIssueCustomer';

export interface GoodsIssue {
	id: number;

	code: string; // PXK-20260319-001

	customer?: GoodsIssueCustomer; // optional populate

	warehouseID: number;

	createdBy: number; // userId
	createdByName?: string;

	exportDate: string;

	status: GoodsIssueStatus;

	note?: string;

	items: GoodsIssueItem[];

	totalQuantity: number;
	totalAmount: number;

	createdAt: string;
	updatedAt: string;

	confirmedAt?: string;
	cancelledAt?: string;
}
