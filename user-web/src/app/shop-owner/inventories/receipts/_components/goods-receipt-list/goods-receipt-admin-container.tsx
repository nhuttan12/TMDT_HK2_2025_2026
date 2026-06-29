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
import GlobalLoading from '@/app/loading';
import { BackendPagedResult } from '@/types/products/user/productBE';

interface GoodsReceiptAdminContainerProps {
	initialReceipts: BackendPagedResult<GoodsReceiptList>;
}

export default function GoodsReceiptAdminContainer({
	initialReceipts,
}: GoodsReceiptAdminContainerProps): JSX.Element {
	// 1. Data Fetching (Lấy dữ liệu thô)
	const { data: receipts} = useGoodsReceiptsQuery({ initialData: initialReceipts });
	const { data: products} = useProductsForGoodsReceiptQuery();
	const {
		data: variants,
		isLoading: isVariantLoading,
		isError: isVariantError,
	} = useProductVariantsQuery();

	// 2. Logic Hooks (Nhận nguyên object trả về thay vì destructure)
	const excelLogic = useGoodsReceiptExcelLogic();
	const navigationLogic = useGoodsReceiptNavigationLogic();
	const sortLogic = useTableSort<GoodsReceiptSortField>();
	const paginationLogic = usePagination();

    const currentReceipt = receipts?.items ?? [];
    const currentProduct = products ?? [];

	const resolveVariant = variants?.data ?? [];

	if (isVariantLoading) {
		<GlobalLoading />;
	}

	if (isVariantError) {
		return <div>Đã xảy ra lỗi khi tải danh sách sản phẩm.</div>;
	}

	// 3. Truyền dữ liệu xuống Dumb Component UI bằng Spread Operator
	return (
		<GoodsReceiptAdminUi
			// Dữ liệu độc lập
			receipts={currentReceipt}
			products={currentProduct}
			variants={resolveVariant}
            totalPages={receipts?.totalPages}
			// Trải toàn bộ các state và action từ Hooks xuống
			{...excelLogic}
			{...navigationLogic}
			{...sortLogic}
			{...paginationLogic}
		/>
	);
}
