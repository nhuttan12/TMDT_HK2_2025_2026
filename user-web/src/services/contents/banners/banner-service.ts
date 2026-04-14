import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { ShopBanner } from '@/types/shops/ShopBanner';
import { mapRawBannerToSortableForm } from '@/utils/content/banners/mappers/admin-banner';

export interface UpdateBannerPayload {
	id?: string;
	imageUrl?: string;
	order: number;
	isPrimary: boolean;
}


export async function fetchShopBanners(): Promise<SortableImageForm[]> {
	await new Promise((resolve) => setTimeout(resolve, 800)); // Fake delay

	const dbData: ShopBanner[] = [
		{ id: 1, url: 'https://picsum.photos/800/300?1', order: 1, isPrimary: true },
		{ id: 2, url: 'https://picsum.photos/800/300?2', order: 2, isPrimary: false },
		{ id: 3, url: 'https://picsum.photos/800/300?3', order: 3, isPrimary: false },
		{ id: 4, url: 'https://picsum.photos/800/300?4', order: 4, isPrimary: false },
		{ id: 5, url: 'https://picsum.photos/800/300?5', order: 5, isPrimary: false },
	];

	return dbData.map(mapRawBannerToSortableForm);
}

export async function updateShopBanners(payload: UpdateBannerPayload[]): Promise<void> {
	// API Cập nhật banner lên Server
	console.log('API Updating banners...', payload);
	await new Promise((resolve) => setTimeout(resolve, 1500));
}
