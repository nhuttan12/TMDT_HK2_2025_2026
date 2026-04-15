import { JSX } from 'react';
import CouponsContainer from '@/app/(app)/profile/coupons/_components/coupons-container';
import { Coupon } from '@/types/coupons/Coupon';
import { getCouponsByUserId } from '@/services/coupons/user/coupons-service';

export default async function CouponsPage(): Promise<JSX.Element> {
	// TODO: Lấy userId từ session/token trên server. Tạm thời hardcode là 1 để chạy luồng.
	const userId: number = 1;

	// Gọi API ở phía Server (RSC)
	const initialCoupons: Coupon[] = await getCouponsByUserId(userId);

	// Truyền xuống Container để Hydrate
	return (
		<CouponsContainer
			userId={userId}
			initialCoupons={initialCoupons}
		/>
	);
}
