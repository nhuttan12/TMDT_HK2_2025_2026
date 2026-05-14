'use client';

import { useShopPromotionLogic } from '@/hooks/marketing/shop-promotions/use-shop-promotion-logic';
import { useShopPromotionQuery } from '@/queries/marketing/shop-promotions/use-shop-promotion-query';
import { ShopPromotion } from '@/types/marketing/shop-promotions/ShopPromotion';
import { JSX } from 'react';
import ShopPromotionUi from './shop-promotion-ui';
import { AppRole } from '@/types/uis/AppRole';

interface Props {
	initialPromotions: ShopPromotion[];
	role: AppRole;
}

export default function ShopPromotionContainer({ initialPromotions, role }: Props): JSX.Element {
	// 1. Lấy data từ TanStack Query (sẽ fallback về initialData ở lần đầu)
	const { data: promotions } = useShopPromotionQuery(initialPromotions);
	const currentData: ShopPromotion[] = promotions ?? initialPromotions;

	// 2. Khởi tạo Logic
	const logic = useShopPromotionLogic({ promotions: currentData, role });

	// 3. Render
	return (
		<ShopPromotionUi
			promotions={currentData}
			{...logic}
		/>
	);
}
