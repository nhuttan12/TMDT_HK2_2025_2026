'use client';

import { JSX } from 'react';

import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';
import { GoodsReceiptSortField } from '@/types/inventories/receipts/uis/GoodsReceiptSortField';

import { useGoodsReceiptExcelLogic } from '@/hooks/inventories/goods-receipts/use-goods-receipt-excel-logic';
import { useGoodsReceiptNavigationLogic } from '@/hooks/inventories/goods-receipts/use-goods-receipt-navigation-logic';
import { usePagination } from '@/hooks/share/use-pagination';
import { useTableSort } from '@/hooks/share/use-table-sort';
import { useProductsForGoodsReceiptQuery } from '@/queries/inventories/goods-receipts/products/use-products-for-receipt-query';
import { useGoodsReceiptsQuery } from '@/queries/inventories/goods-receipts/use-goods-receipts-query';
import { BackendPagedResult } from '@/types/products/user/productBE';
import GoodsReceiptAdminUi from './goods-receipt-admin-ui';

interface GoodsReceiptAdminContainerProps {
	initialReceipts: BackendPagedResult<GoodsReceiptList>;
}

export default function GoodsReceiptAdminContainer({
	initialReceipts,
}: GoodsReceiptAdminContainerProps): JSX.Element {
	// 1. Data Fetching (Lấy dữ liệu thô)
	const { data: receipts} = useGoodsReceiptsQuery({ initialData: initialReceipts });
	const { data: products} = useProductsForGoodsReceiptQuery();

	// 2. Logic Hooks (Nhận nguyên object trả về thay vì destructure)
	const excelLogic = useGoodsReceiptExcelLogic();
	const navigationLogic = useGoodsReceiptNavigationLogic();
	const sortLogic = useTableSort<GoodsReceiptSortField>();
	const paginationLogic = usePagination();

    const currentReceipt = receipts?.items ?? [];
    const currentProduct = products ?? [];

	// 3. Truyền dữ liệu xuống Dumb Component UI bằng Spread Operator
	return (
		<GoodsReceiptAdminUi
			// Dữ liệu độc lập
			receipts={currentReceipt}
			products={currentProduct}
            totalPages={receipts?.totalPages}
			// Trải toàn bộ các state và action từ Hooks xuống
			{...excelLogic}
			{...navigationLogic}
			{...sortLogic}
			{...paginationLogic}
		/>
	);
}
