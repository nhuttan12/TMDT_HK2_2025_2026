import { getCouponDetailById } from '@/services/marketing/coupon/admin/coupon-admin-service';
import { JSX } from 'react';
import { CouponFormContainer } from './_components/coupon-form-container';
import { Metadata } from 'next';

interface Props {
	// NextJS 16 yêu cầu params phải là Promise
	params: Promise<{ couponId: string }>;
}

export const metadata: Metadata = {
	title: 'Xem thông tin chi tiết mã giảm giá',
};

export default async function ViewCouponPage({ params }: Props): Promise<JSX.Element> {
	const resolvedParams = await params;
	const couponId: number = parseInt(resolvedParams.couponId, 10);

	// Fetch dữ liệu ngay trên Server
	const initialCoupon = await getCouponDetailById(couponId);

	return (
		<CouponFormContainer
			couponId={couponId}
			initialCoupon={initialCoupon}
			mode='view'
		/>
	);
}
