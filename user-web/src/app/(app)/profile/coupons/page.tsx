import { JSX } from 'react';
import CouponsContainer from '@/app/(app)/profile/coupons/_components/coupons-container';
import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';
import { getCouponsByUserId } from '@/services/marketing/coupon/user/coupons-user-service';

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
