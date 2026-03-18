import { CouponType } from './CouponType';

export interface Coupon {
	id: string;
	title: string;
	couponType: CouponType;
	description: string;
	expiredAt: string;
	code: string;
}
