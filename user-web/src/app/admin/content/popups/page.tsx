import { JSX } from 'react';
import { ShopPopupContainer } from '@/app/admin/content/popups/_components/shop-popup-container';
import { Popup } from '@/types/shops/admin/Popup';
import { fetchShopPopup } from '@/services/contents/popups/popup-service';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Quản lý hình ảnh khuyến mãi',
};

export default async function Page(): Promise<JSX.Element> {
	const initialPopup: Popup | undefined = await fetchShopPopup();

	return <ShopPopupContainer initialPopup={initialPopup} />;
}
