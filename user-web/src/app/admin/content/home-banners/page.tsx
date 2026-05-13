import { JSX } from 'react';
import { getHomeBannersAdmin } from '@/services/contents/home-banners/admin/home-banner-service-admin';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { Metadata } from 'next';
import { ShopBannersContainer } from '@/app/admin/content/home-banners/_components/shop-banners-container';

export const metadata: Metadata = {
	title: 'Quản lý ảnh bìa',
};

export default async function ShopDecorationPage(): Promise<JSX.Element> {
	const initialBanners: SortableImageForm[] = await getHomeBannersAdmin();

	return <ShopBannersContainer initialBanners={initialBanners} />;
}
