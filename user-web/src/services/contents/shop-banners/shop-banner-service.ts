import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { ShopBanner } from '@/types/shops/admin/ShopBanner';
import { UpdateShopBannerPayload } from '@/types/shops/admin/UpdateShopBannerPayload';
import { mapShopBannersToSortableForm } from '@/utils/content/shop-banners/mappers/admin-shop-banners';

export async function getShopBanners(): Promise<SortableImageForm[]> {
	await new Promise((resolve) => setTimeout(resolve, 800)); // Fake network delay

	// Mock data đặc thù cho Slider (thường có kích thước khác banner, VD: 1200x400)
	const dbData: ShopBanner[] = [
		{ id: 101, url: 'https://picsum.photos/1200/400?1', order: 1, isPrimary: true },
		{ id: 102, url: 'https://picsum.photos/1200/400?2', order: 2, isPrimary: false },
		{ id: 103, url: 'https://picsum.photos/1200/400?3', order: 3, isPrimary: false },
	];

	return dbData.map(mapShopBannersToSortableForm);
}

export async function updateShopBanners(payload: UpdateShopBannerPayload[]): Promise<void> {
	console.log('Sending shop banners to API:', payload);
	await new Promise((resolve) => setTimeout(resolve, 1500));
}
