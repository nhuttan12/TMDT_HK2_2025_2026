import { JSX } from 'react';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { Metadata } from 'next';
import { ShopSlidersContainer } from '@/app/admin/content/sliders/_components/shop-sliders-container';
import { fetchShopSliders } from '@/services/contents/sliders/slider-service';

export const metadata: Metadata = {
	title: 'Quản lý ảnh quảng cáo cửa hàng',
};

export default async function ShopDecorationPage(): Promise<JSX.Element> {
	const initialSliders: SortableImageForm[] = await fetchShopSliders();

	return (
		<main className='min-h-screen p-4 md:p-8'>
			<div className='max-w-6xl mx-auto'>
				<ShopSlidersContainer initialSliders={initialSliders} />
			</div>
		</main>
	);
}
