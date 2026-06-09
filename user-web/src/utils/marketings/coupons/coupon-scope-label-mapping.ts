import { CouponScope } from '@/types/marketing/coupons/CouponScope';

export const COUPON_SCOPE_LABEL: Record<CouponScope, string> = {
	platform: 'Toàn sàn',
	shop: 'Của Shop',
};

/**
 * Lấy nhãn tiếng Việt cho phạm vi áp dụng Coupon.
 * @param scope - Phạm vi của Coupon (CouponScope)
 * @returns string - Nhãn hiển thị tương ứng
 */
export const getCouponScopeLabel = (scope: CouponScope): string => {
	return COUPON_SCOPE_LABEL[scope] ?? 'Không xác định';
};
