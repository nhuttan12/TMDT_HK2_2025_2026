'use client';

import {
    useGoodsReceiptDetailLogic
} from '@/hooks/inventories/goods-receipts/use-goods-receipt-logic';
import { useProductsForGoodsReceiptQuery } from '@/queries/inventories/goods-receipts/products/use-products-for-receipt-query';
import { useGoodsReceiptDetailQuery } from '@/queries/inventories/goods-receipts/use-goods-receipt-detail-query';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { SupplierOption } from '@/types/inventories/suppliers/SupplierOption';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { JSX } from 'react';
import { GoodsReceiptDetailUi } from './goods-receipt-detail-ui';

interface GoodsReceiptDetailContainerProps {
	formType: AdminFormType;
	goodsReceipt: GoodsReceiptDetail;
    supplierOptions?: SupplierOption[];
}

export function GoodsReceiptDetailContainer({
	formType,
	goodsReceipt,
    supplierOptions
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
	const detailLogic = useGoodsReceiptDetailLogic({
		formType,
		goodsReceipt: currentReceiptDetail ?? goodsReceipt,
	});

	// 4. Render UI bằng Spread props
	return (
		<GoodsReceiptDetailUi
			products={products}
            supplierOptions={supplierOptions}
			{...detailLogic}
		/>
	);
}
