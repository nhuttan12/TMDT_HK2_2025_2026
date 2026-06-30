import { GoodsIssueType } from '@/types/inventories/issues/uis/GoodsIssueType';

export interface GoodsIssueList {
	id: string;
	code: string;

	type: GoodsIssueType;

	totalQuantity: number;
	totalAmount: number;

	createdAt: string;
}
