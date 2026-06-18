import { JSX } from 'react';
import { Metadata } from 'next';
import {
	getGoodsStockSummary,
	getProductInStock,
} from '@/services/inventories/stocks/goods-stock-service';
import GoodsStockContainer from './_components/goods-stock-container';

export const metadata: Metadata = {
	title: 'Quản lý sản phẩm tồn kho',
};

export default async function InventoriesPage(): Promise<JSX.Element> {
	const [summaryData, productData] = await Promise.all([
		getGoodsStockSummary(),
		getProductInStock(),
	]);
	return (
		<GoodsStockContainer
			initialSummary={summaryData}
			initialProducts={productData}
		/>
	);
}
