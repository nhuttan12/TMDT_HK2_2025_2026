'use client';

import { JSX } from 'react';
import StoreProductPromotionUi from './store-product-promotion-ui';
import { StoreProductPromotion } from '@/types/marketing/store-product-promotions/StoreProductPromotion';
import {
	useStoreProductPromotionLogic, UseStoreProductPromotionLogicReturn
} from '@/hooks/marketing/store-product-promotions/use-store-product-promotion-logic';
import {
	useStoreProductPromotionQuery
} from '@/queries/marketing/store-product-promotions/use-store-product-promotion-query';

interface Props {
	initialPromotions: StoreProductPromotion[];
}

export default function StoreProductPromotionContainer({ initialPromotions }: Props): JSX.Element {
	// 1. Lấy dữ liệu sống từ Tanstack Query
	const { data: promotions = [] } = useStoreProductPromotionQuery(initialPromotions);

	// Xử lý an toàn kiểu dữ liệu, nếu query chưa kịp trả về thì dùng initialPromotions
	const currentPromotions: StoreProductPromotion[] = promotions ?? initialPromotions;

	// 2. Khởi tạo Logic Hook
	const logic: UseStoreProductPromotionLogicReturn =
		useStoreProductPromotionLogic(currentPromotions);

	// 3. Render giao diện
	return (
		<StoreProductPromotionUi
			promotions={promotions}
			{...logic}
		/>
	);
}
