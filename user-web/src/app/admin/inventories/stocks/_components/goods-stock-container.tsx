'use client';

import { JSX } from 'react';
import GoodsStockOverview from '@/app/admin/inventories/stocks/_components/goods-stock-overview';
import { useGoodsStockData } from '@/hooks/inventories/stocks/use-goods-stock-data';
import { GoodsStockSummaryItem } from '@/types/inventories/stocks/GoodsStockSummaryItem';

interface GoodsStockContainerProps {
	initialData: GoodsStockSummaryItem[];
}

export default function GoodsStockContainer({
	initialData,
}: GoodsStockContainerProps): JSX.Element {
	const { data: stocks, isLoading, isFetching } = useGoodsStockData(initialData);

	if (!stocks && (isLoading || isFetching)) {
		return <div className='p-4 text-gray-500'>Đang tải dữ liệu...</div>;
	}

	return <GoodsStockOverview goodsStockSummary={stocks ?? []} />;
}
