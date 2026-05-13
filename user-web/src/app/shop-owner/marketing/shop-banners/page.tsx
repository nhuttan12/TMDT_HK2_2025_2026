import { JSX } from 'react';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { Metadata } from 'next';
import { getShopBanners } from '@/services/contents/shop-banners/shop-banner-service';
import { ShopBannersContainer } from './_components/shop-banners-container';

export const metadata: Metadata = {
	title: 'Quản lý ảnh quảng cáo cửa hàng',
};

export default async function ShopDecorationPage(): Promise<JSX.Element> {
	const initialShopBanner: SortableImageForm[] = await getShopBanners();

	return <ShopBannersContainer initialShopBanners={initialShopBanner} />;
}
