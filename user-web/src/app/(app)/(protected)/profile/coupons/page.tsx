import { JSX } from 'react';
import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';
import { getCouponsByUserId } from '@/services/marketing/coupon/user/coupons-user-service';
import CouponsContainer from './_components/coupons-container';

export default async function CouponsPage(): Promise<JSX.Element> {
	// TODO: Lấy userId từ session/token trên server. Tạm thời hardcode là 1 để chạy luồng.
	const userId: number = 1;

	// Gọi API ở phía Server (RSC)
	const initialCoupons: UserCoupon[] = await getCouponsByUserId(userId);

	// Truyền xuống Container để Hydrate
	return (
		<CouponsContainer
			userId={userId}
			initialCoupons={initialCoupons}
		/>
	);
}
