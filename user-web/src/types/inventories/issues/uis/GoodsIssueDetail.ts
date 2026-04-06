import { GoodsIssueItem } from '@/types/inventories/issues/uis/GoodsIssueItem';
import { GoodsIssueStatus } from '@/types/inventories/issues/uis/GoodsIssueStatus';
import { GoodsIssuePartner } from '@/types/inventories/issues/uis/GoodsIssuePartner';
import { GoodsIssueType } from './GoodsIssueType';

export interface GoodsIssueDetail {
	id: number;

	code: string; // PXK-20260319-001

	partner: GoodsIssuePartner;

	type: GoodsIssueType;

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
}
