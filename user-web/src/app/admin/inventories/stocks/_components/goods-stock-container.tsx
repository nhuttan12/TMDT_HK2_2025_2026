'use client';

import { JSX } from 'react';
import GoodsStockOverviewUi from '@/app/admin/inventories/stocks/_components/goods-stock-overview-ui';
import { useGoodsStockSummaryQuery } from '@/queries/inventories/stocks/use-goods-stock-summary-query';
import { GoodsStockSummaryItem } from '@/types/inventories/stocks/GoodsStockSummaryItem';
import GoodsStockTableUi from '@/app/admin/inventories/stocks/_components/goods-stock-table-ui';
import { useProductInStockQuery } from '@/queries/inventories/stocks/use-product-in-stock-query';
import { ProductInStock } from '@/types/inventories/stocks/ProductInStock';
import {
	useGoodsStockLogic,
	UseGoodsStockLogicReturn,
} from '@/hooks/inventories/stocks/use-goods-stock-logic';

interface GoodsStockContainerProps {
	initialSummary: GoodsStockSummaryItem[];
	initialProducts: ProductInStock[];
}

export default function GoodsStockContainer({
	initialSummary,
	initialProducts,
}: GoodsStockContainerProps): JSX.Element {
	// 1. Fetching Data
	const { data: summary, isLoading: isSummaryLoading } =
		useGoodsStockSummaryQuery(initialSummary);
	const { data: products, isLoading: isProductsLoading } =
		useProductInStockQuery(initialProducts);

	// 2. Gọi Logic Hook
	const stockLogic: UseGoodsStockLogicReturn = useGoodsStockLogic();

	const isPageLoading: boolean = isSummaryLoading || isProductsLoading;

	if (isPageLoading && (!summary || !products)) {
		return <div className='p-4 text-gray-500'>Đang tải dữ liệu...</div>;
	}

	return (
		<>
			<GoodsStockOverviewUi goodsStockSummary={summary ?? []} />
			<GoodsStockTableUi
				products={products ?? []}
				{...stockLogic}
			/>
		</>
	);
}
