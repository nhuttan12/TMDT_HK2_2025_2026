import { Metadata } from 'next';
import { JSX } from 'react';
import { ShopProfile } from '@/types/shops/admin/ShopProfile';
import { getShopProfileByUserId } from '@/services/shops/admin/shop-admin-service';
import ShopProfileFormContainer from '../_components/shop-profile-form-container';

export const metadata: Metadata = {
	title: 'Điều chỉnh thông tin cửa hàng',
};

export default async function Page(): Promise<JSX.Element> {
    // Mock user ID từ token
    const userId = 'bc2477e8-4d3d-4c09-b9d2-7045ed120453';

	// Fetch dữ liệu ngay tại Server
	const initialData: ShopProfile = await getShopProfileByUserId(userId);

	return (
		<ShopProfileFormContainer
			initialData={initialData}
			formType='update'
            userId={userId}
		/>
	);
}
