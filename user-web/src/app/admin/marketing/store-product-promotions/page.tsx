import { JSX } from 'react';
import { Metadata } from 'next';
import StoreProductPromotionContainer from './_components/store-product-promotion-container';
import { StoreProductPromotion } from '@/types/marketing/store-product-promotions/StoreProductPromotion';
import {
	getStoreProductPromotions
} from '@/services/marketing/store-product-promotions/store-product-promotion-service';

// 1. Khai báo Metadata cho trang (SEO)
export const metadata: Metadata = {
	title: 'Quản lý khuyến mãi sản phẩm | Kênh Người Bán',
	description: 'Danh sách và cấu hình các chương trình giảm giá sản phẩm của cửa hàng.',
};

export default async function StoreProductPromotionPage(): Promise<JSX.Element> {
	/**
	 * 2. Gọi hàm Service tại Server Component.
	 * Dữ liệu này sẽ được fetch trước khi trang được gửi xuống trình duyệt.
	 */
	const initialPromotions: StoreProductPromotion[] = await getStoreProductPromotions();

	return (
		<main className='p-4 md:p-6'>
			{/**
			 * 3. Truyền dữ liệu ban đầu vào Container.
			 * Container sẽ chịu trách nhiệm "Hydrate" (mồi) dữ liệu này vào React Query.
			 */}
			<StoreProductPromotionContainer initialPromotions={initialPromotions} />
		</main>
	);
}
