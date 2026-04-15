import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { ShopSlider } from '@/types/shops/ShopSlider';
import { UpdateSliderPayload } from '@/types/shops/UpdateSliderPayload';
import { mapSliderToSortableForm } from '@/utils/content/sliders/mappers/admin-sliders';

export async function fetchShopSliders(): Promise<SortableImageForm[]> {
	await new Promise((resolve) => setTimeout(resolve, 800)); // Fake network delay

	// Mock data đặc thù cho Slider (thường có kích thước khác banner, VD: 1200x400)
	const dbData: ShopSlider[] = [
		{ id: 101, url: 'https://picsum.photos/1200/400?1', order: 1, isPrimary: true },
		{ id: 102, url: 'https://picsum.photos/1200/400?2', order: 2, isPrimary: false },
		{ id: 103, url: 'https://picsum.photos/1200/400?3', order: 3, isPrimary: false },
	];

	return dbData.map(mapSliderToSortableForm);
}

export async function updateShopSliders(payload: UpdateSliderPayload[]): Promise<void> {
	console.log('Sending Sliders to API:', payload);
	await new Promise((resolve) => setTimeout(resolve, 1500));
}
