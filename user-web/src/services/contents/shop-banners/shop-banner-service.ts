import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { ShopBanner } from '@/types/contents/banners/ShopBanner';
import { UpdateShopBannerPayload } from '@/types/shops/admin/UpdateShopBannerPayload';
import { mapShopBannersToSortableForm } from '@/utils/content/shop-banners/mappers/admin-shop-banners';

export async function getShopBanners(): Promise<SortableImageForm[]> {
	await new Promise((resolve) => setTimeout(resolve, 800)); // Fake network delay

	// Mock data đặc thù cho Slider (thường có kích thước khác banner, VD: 1200x400)
	const dbData: ShopBanner[] = [
		{
			id: 101,
			url: 'https://cdn.hstatic.net/200000968796/file/banner_copy_d44c5befb50744ec92b85e23a8c3392a.png',
			order: 1,
			isPrimary: true,
		},
		{
			id: 102,
			url: 'https://file.hstatic.net/200000968796/file/demo2_90cd97089ecc451ca20779c42bdaa1c3.png',
			order: 2,
			isPrimary: false,
		},
		{
			id: 103,
			url: 'https://file.hstatic.net/200000968796/file/demo3_6ba90a06a7a6492a9407221c9ade0290.png',
			order: 3,
			isPrimary: false,
		},
	];

	return dbData.map(mapShopBannersToSortableForm);
}

export async function updateShopBanners(payload: UpdateShopBannerPayload[]): Promise<void> {
	console.log('Sending shop banners to API:', payload);
	await new Promise((resolve) => setTimeout(resolve, 1500));
}
