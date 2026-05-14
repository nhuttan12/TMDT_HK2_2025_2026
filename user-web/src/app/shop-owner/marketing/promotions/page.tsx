import { JSX } from 'react';
import { Metadata } from 'next';
import ShopPromotionContainer from './_components/shop-promotion-container';
import { ShopPromotion } from '@/types/marketing/shop-promotions/ShopPromotion';
import { getShopPromotions } from '@/services/marketing/shop-promotions/shop-promotion-service';

export const metadata: Metadata = {
	title: 'Chương trình khuyến mãi của cửa hàng',
	description: 'Quản lý toàn bộ đợt khuyến mãi của cửa hàng trên hệ thống.',
};

export default async function ShopPromotionPage(): Promise<JSX.Element> {
	// Gọi API/Service tại Server
	const initialPromotions: ShopPromotion[] = await getShopPromotions();

	return (
		<ShopPromotionContainer
			initialPromotions={initialPromotions}
			role={'shop-owner'}
		/>
	);
}
