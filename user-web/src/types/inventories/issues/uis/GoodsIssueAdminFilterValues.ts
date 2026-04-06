import { GoodsIssueType } from '@/types/inventories/issues/uis/GoodsIssueType';
import { GoodsIssueStatus } from '@/types/inventories/issues/uis/GoodsIssueStatus';

export interface GoodsIssueAdminFilterValues {
	code?: string;
	exportDate?: string;
	type: GoodsIssueType;
	status: GoodsIssueStatus;
	minQuantity?: number;
	maxQuantity?: number;
	minAmount?: number;
	maxAmount?: number;
}
