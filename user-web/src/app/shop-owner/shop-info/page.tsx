import { Metadata } from 'next';
import { getShopProfile } from '@/services/shops/admin/shop-admin-service';
import { JSX } from 'react';
import { ShopProfile } from '@/types/shops/admin/ShopProfile';
import ShopProfileFormContainer from './_components/shop-profile-form-container';

export const metadata: Metadata = {
	title: 'Thông tin cửa hàng',
};

export default async function Page(): Promise<JSX.Element> {
	// Fetch dữ liệu ngay tại Server
	const initialData: ShopProfile = await getShopProfile();

	return (
		<ShopProfileFormContainer
			initialData={initialData}
			formType='view'
		/>
	);
}
