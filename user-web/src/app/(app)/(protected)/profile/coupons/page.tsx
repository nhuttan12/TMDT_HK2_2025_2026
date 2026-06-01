import { JSX } from 'react';
import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';
import { getCouponsByUserId } from '@/services/marketing/coupon/user/user-coupon-service';
import CouponsContainer from './_components/coupons-container';

export default async function CouponsPage(): Promise<JSX.Element> {
	// TODO: Lấy userId từ session/token trên server. Tạm thời hardcode là 1 để chạy luồng.
	const userId = 'd290f1ee-6c54-4b01-90e6-d701748f0851';

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
