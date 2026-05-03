import { CouponType } from './CouponType';

export interface UserCoupon {
	id: string;
	title: string;
	couponType: CouponType;
	description: string;
	expiredAt: string;
	code: string;
}
