'use client';

import { JSX } from 'react';
import ShopPromotionUi from './shop-promotion-ui';
import { ShopPromotion } from '@/types/marketing/shop-promotions/ShopPromotion';
import { useShopPromotionQuery } from '@/queries/marketing/shop-promotions/use-shop-promotion-query';
import { useShopPromotionLogic, UseShopPromotionLogicReturn } from '@/hooks/marketing/shop-promotions/use-shop-promotion-logic';

interface Props {
	initialPromotions: ShopPromotion[];
}

export default function ShopPromotionContainer({ initialPromotions }: Props): JSX.Element {
	// 1. Lấy data từ TanStack Query (sẽ fallback về initialData ở lần đầu)
	const { data: promotions } = useShopPromotionQuery(initialPromotions);
	const currentData: ShopPromotion[] = promotions ?? initialPromotions;

	// 2. Khởi tạo Logic
	const logic: UseShopPromotionLogicReturn = useShopPromotionLogic(currentData);

	// 3. Render
	return (
		<ShopPromotionUi
			promotions={currentData}
			{...logic}
		/>
	);
}
