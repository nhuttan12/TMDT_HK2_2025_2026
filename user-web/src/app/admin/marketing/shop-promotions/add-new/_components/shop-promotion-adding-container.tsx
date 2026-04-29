'use client';

import { JSX } from 'react';
import ShopPromotionAddingUi from './shop-promotion-adding-ui';
import { ProductPromotionForAdding } from '@/types/marketing/shop-promotions/ProductPromotionForAdding';
import { useAvailableProductsQuery } from '@/queries/marketing/shop-promotions/use-available-products-query';
import {
	useShopPromotionAddingLogic,
	UseShopPromotionAddingLogicReturn,
} from '@/hooks/marketing/shop-promotions/use-shop-promotion-adding-logic';

interface Props {
	initialAvailableProducts: ProductPromotionForAdding[];
}

export default function ShopPromotionAddingContainer({
	initialAvailableProducts,
}: Props): JSX.Element {
	// 1. Data Fetching
	const { data: availableProducts } = useAvailableProductsQuery(initialAvailableProducts);
	const currentProducts: ProductPromotionForAdding[] = availableProducts ?? initialAvailableProducts;

	// 2. Khởi tạo Logic
	const logic: UseShopPromotionAddingLogicReturn = useShopPromotionAddingLogic(currentProducts);

	// 3. Render
	return (
		<ShopPromotionAddingUi
			availableProducts={currentProducts}
			{...logic}
		/>
	);
}
