import { JSX } from 'react';
import { fetchShopBanners } from '@/services/contents/banners/banner-service';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { ShopBannersContainer } from '@/app/admin/content/banners/_components/shop-banners-container';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Quản lý ảnh bìa',
};

export default async function ShopDecorationPage(): Promise<JSX.Element> {
	const initialBanners: SortableImageForm[] = await fetchShopBanners();

	return (
		<main className='min-h-screen p-4 md:p-8'>
			<div className='max-w-6xl mx-auto'>
				<ShopBannersContainer initialBanners={initialBanners} />
			</div>
		</main>
	);
}
