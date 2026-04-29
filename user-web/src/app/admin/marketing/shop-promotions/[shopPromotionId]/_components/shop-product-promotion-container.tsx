'use client';

import { JSX } from 'react';
import { useShopProductPromotionQuery } from '@/queries/marketing/shop-promotions/use-shop-product-promotion-query';
import { ShopProductPromotion } from '@/types/marketing/shop-promotions/ShopProductPromotion';
import {
	useShopProductPromotionLogic,
	UseShopProductPromotionLogicReturn,
} from '@/hooks/marketing/shop-promotions/use-shop-product-promotion-logic';
import ShopProductPromotionUi from '@/app/admin/marketing/shop-promotions/[shopPromotionId]/_components/shop-product-promotion-ui';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';

interface Props {
	promotionId: number;
	initialPromotions: ShopProductPromotion[];
	mode: AdminFormType;
}

export default function ShopProductPromotionContainer({
	promotionId,
	initialPromotions,
	mode,
}: Props): JSX.Element {
	// 1. Lấy dữ liệu sống từ Tanstack Query
	const { data: promotions = [] } = useShopProductPromotionQuery(promotionId, initialPromotions);

	// Xử lý an toàn kiểu dữ liệu, nếu query chưa kịp trả về thì dùng initialPromotions
	const currentPromotions: ShopProductPromotion[] = promotions ?? initialPromotions;

	// 2. Khởi tạo Logic Hook
	const logic: UseShopProductPromotionLogicReturn =
		useShopProductPromotionLogic(currentPromotions);

	// 3. Render giao diện
	return (
		<ShopProductPromotionUi
			promotions={promotions}
			mode={mode}
			{...logic}
		/>
	);
}
