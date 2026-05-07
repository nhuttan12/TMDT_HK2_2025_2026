import { Popup } from '@/types/shops/admin/Popup';
import { UpdatePopupPayload } from '@/types/shops/admin/UpdatePopupPayload';

export async function fetchShopPopup(): Promise<Popup | undefined> {
	await new Promise((resolve) => setTimeout(resolve, 800));

	return {
		id: 'popup_1',
		imageUrl: 'https://mdcop.vn/wp-content/uploads/2020/02/Popup-1-1254x640.png',
		isActive: true,
	};
}

export async function updateShopPopup(payload: UpdatePopupPayload): Promise<void> {
	console.log('Sending Popup to API:', payload);
	await new Promise((resolve) => setTimeout(resolve, 1500));
}
