'use client';

import { JSX } from 'react';

import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';
import { GoodsReceiptSortField } from '@/types/inventories/receipts/uis/GoodsReceiptSortField';

import { useTableSort } from '@/hooks/share/use-table-sort';
import { usePagination } from '@/hooks/share/use-pagination';
import { useGoodsReceiptsQuery } from '@/queries/inventories/goods-receipts/use-goods-receipts-query';
import { useGoodsReceiptExcelLogic } from '@/hooks/inventories/goods-receipts/use-goods-receipt-excel-logic';
import { useGoodsReceiptNavigationLogic } from '@/hooks/inventories/goods-receipts/use-goods-receipt-navigation-logic';
import { useProductsForGoodsReceiptQuery } from '@/queries/inventories/goods-receipts/products/use-products-for-receipt-query';
import { useProductVariantsQuery } from '@/queries/inventories/goods-receipts/products/use-product-variants-query';
import GoodsReceiptAdminUi from './goods-receipt-admin-ui';

interface GoodsReceiptAdminContainerProps {
	initialReceipts: GoodsReceiptList[];
}

export default function GoodsReceiptAdminContainer({
	initialReceipts,
}: GoodsReceiptAdminContainerProps): JSX.Element {
	// 1. Data Fetching (Lấy dữ liệu thô)
	const { data: receipts = [] } = useGoodsReceiptsQuery({ initialData: initialReceipts });
	const { data: products = [] } = useProductsForGoodsReceiptQuery();
	const { data: variants = [] } = useProductVariantsQuery();

	// 2. Logic Hooks (Nhận nguyên object trả về thay vì destructure)
	const excelLogic = useGoodsReceiptExcelLogic();
	const navigationLogic = useGoodsReceiptNavigationLogic();
	const sortLogic = useTableSort<GoodsReceiptSortField>();
	const paginationLogic = usePagination();

	// 3. Truyền dữ liệu xuống Dumb Component UI bằng Spread Operator
	return (
		<GoodsReceiptAdminUi
			// Dữ liệu độc lập
			receipts={receipts}
			products={products}
			variants={variants}
			// Trải toàn bộ các state và action từ Hooks xuống
			{...excelLogic}
			{...navigationLogic}
			{...sortLogic}
			{...paginationLogic}
		/>
	);
}
