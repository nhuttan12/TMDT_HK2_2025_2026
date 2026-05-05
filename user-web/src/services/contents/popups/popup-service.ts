import { Popup } from '@/types/shops/admin/Popup';
import { UpdatePopupPayload } from '@/types/shops/admin/UpdatePopupPayload';

export async function fetchShopPopup(): Promise<Popup | undefined> {
	await new Promise((resolve) => setTimeout(resolve, 800));

	return {
		id: 'popup_1',
		imageUrl: 'https://picsum.photos/800/800?popup',
		isActive: true,
	};
}

export async function updateShopPopup(payload: UpdatePopupPayload): Promise<void> {
	console.log('Sending Popup to API:', payload);
	await new Promise((resolve) => setTimeout(resolve, 1500));
}
