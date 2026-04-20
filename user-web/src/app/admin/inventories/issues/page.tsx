import { JSX } from 'react';
import { GoodsIssueList } from '@/types/inventories/issues/uis/GoodsIssueList';
import { Metadata } from 'next';
import { getGoodsIssuesAdmin } from '@/services/inventories/goods-issues/goods-issue-admin-service';
import GoodsIssueAdminContainer from '@/app/admin/inventories/issues/_components/goods-issue-admin-container';

export const metadata: Metadata = {
	title: 'Quản lý hoá đơn xuất kho',
};

export default async function GoodsIssueAdminPage(): Promise<JSX.Element> {
	const initialIssues: GoodsIssueList[] = await getGoodsIssuesAdmin();

	return <GoodsIssueAdminContainer initialIssues={initialIssues} />;
}