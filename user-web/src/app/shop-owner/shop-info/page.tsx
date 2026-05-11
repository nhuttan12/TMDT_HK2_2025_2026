import { Metadata } from 'next';
import { getShopProfileByUserId } from '@/services/shops/admin/shop-admin-service';
import { JSX } from 'react';
import { ShopProfile } from '@/types/shops/admin/ShopProfile';
import ShopProfileFormContainer from './_components/shop-profile-form-container';

export const metadata: Metadata = {
	title: 'Thông tin cửa hàng',
};

export default async function Page(): Promise<JSX.Element> {
    // Mock user ID từ token
    const userId = 1;

	// Fetch dữ liệu ngay tại Server
	const initialData: ShopProfile = await getShopProfileByUserId(userId);

	return (
		<ShopProfileFormContainer
			initialData={initialData}
			formType='view'
            userId={userId}
		/>
	);
}
