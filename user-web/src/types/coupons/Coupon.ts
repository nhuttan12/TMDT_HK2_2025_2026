import { CouponType } from './CouponType';

export interface Coupon {
	couponID: string;
	title: string;
	couponType: CouponType;
	description: string;
	expiredAt: string;
	code: string;
}
