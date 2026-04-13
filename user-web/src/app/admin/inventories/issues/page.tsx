import { JSX } from 'react';
import GoodsIssueAdminPageClient from '@/app/admin/inventories/issues/_components/goods-issue-admin-page-client';
import { GoodsIssueList } from '@/types/inventories/issues/uis/GoodsIssueList';
import {Metadata} from "next";

// Mock data
const mockIssues: GoodsIssueList[] = [
	{
		id: 1,
		code: 'PXK-20260319-001',
		type: 'retail',
		exportDate: new Date('2026-03-19T10:30:00Z').toISOString(),
		totalQuantity: 10,
		totalAmount: 5000000,
		status: 'draft',
		createdAt: new Date('2026-03-19T10:00:00Z').toISOString(),
		updatedAt: new Date('2026-03-19T10:00:00Z').toISOString(),
	},
	{
		id: 2,
		code: 'PXK-20260319-002',
		type: 'wholesale',
		exportDate: new Date('2026-03-20T15:00:00Z').toISOString(),
		totalQuantity: 5,
		totalAmount: 2500000,
		status: 'confirmed',
		createdAt: new Date('2026-03-20T14:30:00Z').toISOString(),
		updatedAt: new Date('2026-03-20T14:30:00Z').toISOString(),
	},
	{
		id: 3,
		code: 'PXK-20260319-003',
		type: 'return_defective',
		exportDate: new Date('2026-03-21T09:45:00Z').toISOString(),
		totalQuantity: 15,
		totalAmount: 7500000,
		status: 'cancelled',
		createdAt: new Date('2026-03-21T09:15:00Z').toISOString(),
		updatedAt: new Date('2026-03-21T09:15:00Z').toISOString(),
	},
];

export const metadata: Metadata = {
	title: 'Quản lý hoá đơn xuất kho',
};


export default function Page(): JSX.Element {
	return <GoodsIssueAdminPageClient goodsIssues={mockIssues}/>;
}