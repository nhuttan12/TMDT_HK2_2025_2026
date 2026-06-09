import { JSX } from 'react';
import { Metadata } from 'next';
import { getStoreProductPromotions } from '@/services/marketing/shop-promotions/shop-product-promotion-service';
import { ShopProductPromotion } from '@/types/marketing/shop-promotions/ShopProductPromotion';
import ShopProductPromotionContainer from './_components/shop-product-promotion-container';

// 1. Khai báo Metadata cho trang (SEO)
export const metadata: Metadata = {
	title: 'Quản lý khuyến mãi sản phẩm',
	description: 'Danh sách các sản phẩm giảm giá của đợt khuyến mãi của cửa hàng.',
};

interface Props {
	params: Promise<{ promotionId: string }>;
}

export default async function StoreProductPromotionPage({ params }: Props): Promise<JSX.Element> {
	const { promotionId } = await params;

	const initialPromotions = await getStoreProductPromotions(promotionId);

	return (
		<ShopProductPromotionContainer
			promotionId={promotionId}
			initialPromotions={initialPromotions}
			mode={'view'}
		/>
	);
}
