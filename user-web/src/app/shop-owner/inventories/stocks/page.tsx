import apiServer from '@/lib/api-server';
import {
    GoodsStockService
} from '@/services/inventories/stocks/goods-stock-service';
import { Metadata } from 'next';
import { JSX } from 'react';
import GoodsStockContainer from './_components/goods-stock-container';

export const metadata: Metadata = {
	title: 'Quản lý sản phẩm tồn kho',
};

export default async function InventoriesPage(): Promise<JSX.Element> {
    const goodsStockService = new GoodsStockService(apiServer);

	const [summaryData, productData] = await Promise.all([
		goodsStockService.getGoodsStockSummary(),
		goodsStockService.getProductInStockPaging(),
	]);
	return (
		<GoodsStockContainer
			initialSummary={summaryData}
			initialProducts={productData}
		/>
	);
}
