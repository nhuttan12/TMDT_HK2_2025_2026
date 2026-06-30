'use client';

import { JSX } from 'react';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { GoodsIssueDetail } from '@/types/inventories/issues/uis/GoodsIssueDetail';
import {
	useGoodsIssueFormLogic,
	GoodsIssueLogicReturn,
} from '@/hooks/inventories/goods-issues/use-goods-issue-form-logic';
import { GoodsIssueFormUi } from './goods-issue-form-ui';
import { ProductForGoodsIssue } from '@/types/inventories/issues/uis/ProductForGoodsIssue';

interface GoodsIssueDetailContainerProps {
	formType: AdminFormType;
	goodsIssue: GoodsIssueDetail;
}

export default function GoodsIssueDetailContainer({
	goodsIssue,
	formType,
}: GoodsIssueDetailContainerProps): JSX.Element {
	// 1. Khởi tạo toàn bộ Logic (Modal, Fetch Data, Submit, State Form)
	const logic: GoodsIssueLogicReturn = useGoodsIssueFormLogic({
		formType: formType,
		goodsIssue: goodsIssue,
	});

	const productSelection: ProductForGoodsIssue[] = [];

	// 2. Truyền tất cả dữ liệu và hàm xử lý xuống Component giao diện
	return (
		<GoodsIssueFormUi
			productSelection={productSelection}
			{...logic}
		/>
	);
}
