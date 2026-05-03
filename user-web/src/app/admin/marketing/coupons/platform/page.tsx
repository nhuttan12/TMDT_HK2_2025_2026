import {
    getPlatformCoupons
} from '@/services/marketing/coupon/admin/coupon-admin-service';
import { Metadata } from 'next';
import { JSX } from 'react';
import { CouponManagementContainer } from '../_components/coupon-management-container';

export const metadata: Metadata = {
	title: 'Danh sách mã giảm giá của toàn nghành hàng',
};

export default async function ShopCouponPage(): Promise<JSX.Element> {
	// Gọi API/Service tại Server
	const initialCoupons = await getPlatformCoupons();

	return (
		<CouponManagementContainer
			scope='platform'
			initialCoupons={initialCoupons}
		/>
	);
}
