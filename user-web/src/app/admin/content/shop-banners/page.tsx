import { JSX } from 'react';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { Metadata } from 'next';
import { getShopBanners } from '@/services/contents/shop-banners/shop-banner-service';
import { ShopBannersContainer } from '@/app/admin/content/shop-banners/_components/shop-banners-container';

export const metadata: Metadata = {
	title: 'Quản lý ảnh quảng cáo cửa hàng',
};

export default async function ShopDecorationPage(): Promise<JSX.Element> {
	const initialShopBanner: SortableImageForm[] = await getShopBanners();

	return (
		<main className='min-h-screen p-4 md:p-8'>
			<div className='max-w-6xl mx-auto'>
				<ShopBannersContainer initialShopBanners={initialShopBanner} />
			</div>
		</main>
	);
}
