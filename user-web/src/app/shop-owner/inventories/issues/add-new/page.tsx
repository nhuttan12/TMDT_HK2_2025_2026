import { Metadata } from 'next';
import { GoodsIssueDetail } from '@/types/inventories/issues/uis/GoodsIssueDetail';
import { JSX } from 'react';
import GoodsIssueDetailContainer from '../_components/goods-issue-detail/goods-issue-detail-container';

export const metadata: Metadata = {
	title: 'Tạo hoá đơn xuất kho',
};

const mockGoodsIssueItems: GoodsIssueDetail = {
	id: 0,
	code: '',
	type: 'retail',
	partner: {
		id: 0,
		name: '',
		type: 'customer',
		phoneNumber: '',
		address: '',
	},
	warehouseID: 0,
	createdBy: 0,
	createdByName: '',
	exportDate: '',
	status: 'draft',
	note: '',
	items: [],
	totalQuantity: 0,
	totalAmount: 0,
	createdAt: '',
	updatedAt: '',
};

export default function GoodsIssuePage(): JSX.Element {
	return (
		<GoodsIssueDetailContainer
			formType={'create'}
			goodsIssue={mockGoodsIssueItems}
		/>
	);
}
