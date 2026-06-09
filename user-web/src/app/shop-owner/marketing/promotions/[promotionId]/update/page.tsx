import { JSX } from 'react';
import { Metadata } from 'next';
import { getStoreProductPromotions } from '@/services/marketing/shop-promotions/shop-product-promotion-service';
import { ShopProductPromotion } from '@/types/marketing/shop-promotions/ShopProductPromotion';
import ShopProductPromotionContainer from '../_components/shop-product-promotion-container';

// 1. Khai báo Metadata cho trang (SEO)
export const metadata: Metadata = {
	title: 'Chỉnh sửa thông tin chương trình khuyến mãi',
	description: 'Chỉnh sửa thông tin chương trình khuyến mãi của cửa hàng',
};

interface Props {
	params: Promise<{ shopPromotionId: string }>;
}

export default async function StoreProductPromotionPage({ params }: Props): Promise<JSX.Element> {
	const { shopPromotionId } = await params;

	const initialPromotions: ShopProductPromotion[] = await getStoreProductPromotions(shopPromotionId);

	return (
		<ShopProductPromotionContainer
			promotionId={shopPromotionId}
			initialPromotions={initialPromotions}
			mode={'update'}
		/>
	);
}
