import { JSX } from 'react';
import { Metadata } from 'next';
import GoodsIssueDetailContainer from '@/app/admin/inventories/issues/_components/goods-issue-detail-container';
import { GoodsIssueDetail } from '@/types/inventories/issues/uis/GoodsIssueDetail';
import { getGoodsIssueById } from '@/services/inventories/goods-issues/goods-issue-detail-service';

export const metadata: Metadata = {
	title: 'Thông tin chi tiết hoá đơn xuất kho',
};

// Định nghĩa Props để nhận params từ URL
interface Props {
	params: { id: string };
}

export default async function GoodsIssuePage({ params }: Props): Promise<JSX.Element> {
	// 1. Lấy ID từ URL
	const issueId: number = Number(params.id);

	// 2. Gọi Server-Side Fetching
	const goodsIssueDetail: GoodsIssueDetail = await getGoodsIssueById(issueId);

	// 3. Truyền dữ liệu xuống Container
	return (
		<GoodsIssueDetailContainer
			formType={'view'}
			goodsIssue={goodsIssueDetail}
		/>
	);
}
