import { JSX } from 'react';
import { Metadata } from 'next';
import ShopPromotionAddingContainer from './_components/shop-promotion-adding-container';
import { ProductPromotionForAdding } from '@/types/marketing/shop-promotions/ProductPromotionForAdding';
import { getAvailableProductsForPromotion } from '@/services/marketing/shop-promotions/shop-promotion-adding-service';

export const metadata: Metadata = {
	title: 'Thêm mới mã giảm giá | Kênh Người Bán',
	description: 'Tạo mã giảm giá mới và thiết lập sản phẩm được áp dụng.',
};

export default async function ShopPromotionAddingPage(): Promise<JSX.Element> {
	// Gọi API/Service tại Server để mồi danh sách sản phẩm
	const initialAvailableProducts: ProductPromotionForAdding[] =
		await getAvailableProductsForPromotion();

	return <ShopPromotionAddingContainer initialAvailableProducts={initialAvailableProducts} />;
}
