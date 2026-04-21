import { Metadata } from 'next';
import { getShopProfile } from '@/services/shops/shop-service';
import { JSX } from 'react';
import StoreProfileFormContainer from '@/app/admin/shop-info/_components/shop-profile-form-container';
import { ShopProfile } from '@/types/shops/ShopProfile';

export const metadata: Metadata = {
	title: 'Thông tin cửa hàng',
};

export default async function Page(): Promise<JSX.Element> {
	// Fetch dữ liệu ngay tại Server
	const initialData: ShopProfile = await getShopProfile();

	return (
		<StoreProfileFormContainer
			initialData={initialData}
			formType='view'
		/>
	);
}
