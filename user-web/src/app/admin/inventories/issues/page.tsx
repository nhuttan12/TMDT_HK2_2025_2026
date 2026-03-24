import { JSX } from 'react';
import GoodsIssueAdminPageClient from '@/app/admin/inventories/issues/_components/goods-issue-admin-page-client';
import { GoodsIssueList } from '@/types/inventories/issues/GoodsIssueList';
import {Metadata} from "next";

// Mock data
const mockIssues: GoodsIssueList[] = [
	{
		id: 1,
		code: 'PXK-20260319-001',
		customerName: 'Công ty ABC',
		exportDate: '2024-03-19',
		totalQuantity: 10,
		totalAmount: 5000000,
		status: 'draft',
		createdAt: '2024-03-19T10:00:00Z',
		updatedAt: '2024-03-19T10:00:00Z',
	},
	{
		id: 2,
		code: 'PXK-20260319-002',
		customerName: 'Công ty XYZ',
		exportDate: '2024-03-20',
		totalQuantity: 5,
		totalAmount: 2500000,
		status: 'confirmed',
		createdAt: '2024-03-20T14:30:00Z',
		updatedAt: '2024-03-20T14:30:00Z',
	},
	{
		id: 3,
		code: 'PXK-20260319-003',
		customerName: 'Cửa hàng DEF',
		exportDate: '2024-03-21',
		totalQuantity: 15,
		totalAmount: 7500000,
		status: 'cancelled',
		createdAt: '2024-03-21T09:15:00Z',
		updatedAt: '2024-03-21T09:15:00Z',
	},
];

export const metadata: Metadata = {
	title: 'Quản lý hoá đơn xuất kho',
};


export default function Page(): JSX.Element {
	return <GoodsIssueAdminPageClient goodsIssues={mockIssues}/>;
}