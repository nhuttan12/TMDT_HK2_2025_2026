import { JSX } from 'react';
import { Metadata } from 'next';
import { fetchGoodsStockData } from '@/services/inventories/goods-stock-service';
import { GoodsStockSummaryItem } from '@/types/inventories/stocks/GoodsStockSummaryItem';
import GoodsStockContainer from '@/app/admin/inventories/stocks/_components/goods-stock-container';

export const metadata: Metadata = {
	title: 'Quản lý sản phẩm tồn kho',
};

export default async function InventoriesPage(): Promise<JSX.Element> {
	const serverStockData: GoodsStockSummaryItem[] = await fetchGoodsStockData();

	return <GoodsStockContainer />;
}
