'use client';

import {
    useGoodsStockLogic
} from '@/hooks/inventories/stocks/use-goods-stock-logic';
import { useGoodsStockSummaryQuery } from '@/queries/inventories/stocks/use-goods-stock-summary-query';
import { useProductInStockQuery } from '@/queries/inventories/stocks/use-product-in-stock-query';
import { GoodsStockApiData } from '@/types/inventories/stocks/GoodsStockApiData';
import { ProductInStock } from '@/types/inventories/stocks/ProductInStock';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { JSX } from 'react';
import GoodsStockOverviewUi from './goods-stock-overview-ui';
import GoodsStockTableUi from './goods-stock-table-ui';

interface GoodsStockContainerProps {
	initialSummary: GoodsStockApiData;
	initialProducts: BackendPagedResult<ProductInStock>;
}

export default function GoodsStockContainer({
	initialSummary,
	initialProducts,
}: GoodsStockContainerProps): JSX.Element {
	// 1. Fetching Data
	const { data: summary, isLoading: isSummaryLoading } =
		useGoodsStockSummaryQuery(initialSummary);

	// 2. Gọi Logic Hook
	const stockLogic = useGoodsStockLogic();

	const { data: products, isLoading: isProductsLoading } =
		useProductInStockQuery(initialProducts, stockLogic.currentPage);

    const currentProduct = products?.items ?? [];

    console.log('🔗 Page hiện tại đang là:', stockLogic.currentPage);

	const isPageLoading = isSummaryLoading || isProductsLoading;

	if (isPageLoading && (!summary || !products)) {
		return <div className='p-4 text-gray-500'>Đang tải dữ liệu...</div>;
	}

	return (
		<>
			<GoodsStockOverviewUi goodsStockApiData={summary!} />
			<GoodsStockTableUi
				products={currentProduct}
                totalPages={products?.totalPages}
				{...stockLogic}
			/>
		</>
	);
}
