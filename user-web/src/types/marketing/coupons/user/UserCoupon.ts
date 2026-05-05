import { CouponType } from './CouponType';

export interface UserCoupon {
	id: number;
	title: string;
	couponType: CouponType;
	description: string;
	expiredAt: string;
	code: string;
}
