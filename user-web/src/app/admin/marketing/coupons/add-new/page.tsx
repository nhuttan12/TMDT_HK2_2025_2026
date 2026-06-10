import { CouponFormContainer } from '@/components/marketing/coupons/admin/coupon-form-container';
import { AdminCoupon } from '@/types/marketing/coupons/admin/AdminCoupon';
import { Metadata } from 'next';
import { JSX } from 'react';

export const metadata: Metadata = {
	title: 'Thêm sửa thông tin mã giảm giá',
};

export default async function ViewCouponPage() {
	// Fetch dữ liệu ngay trên Server
	const initialCoupon: AdminCoupon = {
		id: '',
		code: '',
		name: '',
		scope: 'platform',
		createdByType: 'admin', // Đã bổ sung
		shopId: null,
		discountType: 'fixed_amount',
        category: 'discount', // Mặc định
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
