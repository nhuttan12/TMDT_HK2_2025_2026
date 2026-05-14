'use client';

import { JSX } from 'react';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { useProductsForGoodsReceiptQuery } from '@/queries/inventories/goods-receipts/products/use-products-for-receipt-query';
import {
	useGoodsReceiptDetailLogic,
	UseGoodsReceiptDetailLogicReturn,
} from '@/hooks/inventories/goods-receipts/use-goods-receipt-logic';
import { useGoodsReceiptDetailQuery } from '@/queries/inventories/goods-receipts/use-goods-receipt-detail-query';
import { GoodsReceiptDetailUi } from './goods-receipt-detail-ui';

interface GoodsReceiptDetailContainerProps {
	formType: AdminFormType;
	goodsReceipt: GoodsReceiptDetail;
}

export function GoodsReceiptDetailContainer({
	formType,
	goodsReceipt,
}: GoodsReceiptDetailContainerProps): JSX.Element {
	// 1. Fetch Master Data (Danh sách sản phẩm cho Modal)
	const { data: products = [] } = useProductsForGoodsReceiptQuery();

	// 2. Fetch/Cache Detail Data (Hydration từ SSR xuống CSR)
	// Nếu formType là 'create', thường id = 0, initialData vẫn sẽ được dùng làm form trống.
	const { data: currentReceiptDetail } = useGoodsReceiptDetailQuery({
		id: goodsReceipt.id,
		initialData: goodsReceipt,
	});

	// 3. Khởi tạo Business Logic với dữ liệu đã được Tanstack Query quản lý
	// Fallback về goodsReceipt gốc để đảm bảo an toàn nếu query chưa kịp trả data (dù initialData đã lo việc này)
	const detailLogic: UseGoodsReceiptDetailLogicReturn = useGoodsReceiptDetailLogic({
		formType,
		goodsReceipt: currentReceiptDetail ?? goodsReceipt,
	});

	// 4. Render UI bằng Spread props
	return (
		<GoodsReceiptDetailUi
			products={products}
			{...detailLogic}
		/>
	);
}
