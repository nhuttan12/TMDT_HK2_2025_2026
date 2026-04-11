'use client';

import { JSX } from 'react';
import GoodsStockOverview from '@/app/admin/inventories/stocks/_components/goods-stock-overview';
import { useGoodsStockSummaryData } from '@/hooks/inventories/stocks/use-goods-stock-summary-data';
import { GoodsStockSummaryItem } from '@/types/inventories/stocks/GoodsStockSummaryItem';
import GoodsStockTable from '@/app/admin/inventories/stocks/_components/goods-stock-table';
import { useProductInStockData } from '@/hooks/inventories/stocks/use-product-in-stock-data';
import { ProductInStock } from '@/types/inventories/stocks/ProductInStock';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface GoodsStockContainerProps {
	initialSummary: GoodsStockSummaryItem[];
	initialProducts: ProductInStock[];
}

export default function GoodsStockContainer({
	initialSummary,
	initialProducts,
}: GoodsStockContainerProps): JSX.Element {
	const router: AppRouterInstance = useRouter();
	const { data: summary, isLoading: isSummaryLoading } = useGoodsStockSummaryData(initialSummary);

	const { data: products, isLoading: isProductsLoading } = useProductInStockData(initialProducts);

	const isPageLoading: boolean = isSummaryLoading || isProductsLoading;

	if (isPageLoading && (!summary || !products)) {
		return <div className='p-4 text-gray-500'>Đang tải dữ liệu...</div>;
	}

	const handleEditVariant = (row: ProductInStock): void => {
		router.push(`/admin/products/${row.productId}/variant/edit/${row.productVariantId}`);
	};

	const handleViewVariant = (row: ProductInStock): void => {
		router.push(`/admin/products/${row.productId}/variant/${row.productVariantId}`);
	};

	return (
		<>
			<GoodsStockOverview goodsStockSummary={summary ?? []} />
			<GoodsStockTable
				products={products ?? []}
				onEditVariant={handleEditVariant}
				onViewVariant={handleViewVariant}
			/>
		</>
	);
}
