import { getCouponDetailById } from '@/services/marketing/coupon/admin/coupon-admin-service';
import { JSX } from 'react';
import { CouponFormContainer } from '../[couponId]/_components/coupon-form-container';
import { Metadata } from 'next';
import { AdminCoupon } from '@/types/marketing/coupons/admin/AdminCoupon';

export const metadata: Metadata = {
	title: 'Thêm sửa thông tin mã giảm giá',
};

export default async function ViewCouponPage(): Promise<JSX.Element> {
	// Fetch dữ liệu ngay trên Server
	const initialCoupon: AdminCoupon = {
		id: 0,
		code: '',
		name: '',
		scope: 'platform',
		shopId: null,
		discountType: 'fixed_amount',
		discountValue: 0,
		maxDiscountAmount: null,
		minOrderValue: 0,
		totalQuantity: 0,
		usedQuantity: 0,
		validTime: {
			fromDate: '',
			toDate: '',
		},
		status: 'active',
	};

	return (
		<CouponFormContainer
			initialCoupon={initialCoupon}
			mode='create'
		/>
	);
}
