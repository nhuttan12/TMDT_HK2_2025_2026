import { GoodsIssueItem } from '@/types/inventories/issues/uis/GoodsIssueItem';
import { GoodsIssueType } from './GoodsIssueType';

export interface GoodsIssueDetail {
	id: string;

	code: string; // PXK-20260319-001

	type: GoodsIssueType;

	note?: string;

	items: GoodsIssueItem[];

	totalQuantity: number;
	totalAmount: number;

	createdAt: string;
}
