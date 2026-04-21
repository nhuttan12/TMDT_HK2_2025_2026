import { Metadata } from 'next';
import { JSX } from 'react';
import { ShopProfile } from '@/types/shops/ShopProfile';
import { getShopProfile } from '@/services/shops/shop-service';
import StoreProfileFormContainer from '@/app/admin/shop-info/_components/shop-profile-form-container';

export const metadata: Metadata = {
	title: 'Điều chỉnh thông tin cửa hàng',
};

export default async function Page(): Promise<JSX.Element> {
	// Fetch dữ liệu ngay tại Server
	const initialData: ShopProfile = await getShopProfile();

	return (
		<StoreProfileFormContainer
			initialData={initialData}
			formType='update'
		/>
	);
}