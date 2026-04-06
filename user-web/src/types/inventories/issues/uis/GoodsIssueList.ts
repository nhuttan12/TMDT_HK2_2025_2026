import { GoodsIssueType } from '@/types/inventories/issues/uis/GoodsIssueType';
import { GoodsIssueStatus } from '@/types/inventories/issues/uis/GoodsIssueStatus';
import { GoodsIssuePartner } from '@/types/inventories/issues/uis/GoodsIssuePartner';

export interface GoodsIssueList {
	id: number;
	code: string;

	partner?: GoodsIssuePartner;
	type: GoodsIssueType;

	exportDate: string;

	totalQuantity: number;
	totalAmount: number;

	status: GoodsIssueStatus;

	createdAt: string;
	updatedAt: string;
}
