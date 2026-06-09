import { CouponType } from "@/types/marketing/coupons/user/CouponType";

const COUPON_TYPE_LABEL: Record<CouponType, string> = {
    percentage: 'Giảm theo phần trăm',
    fixed_amount: 'Giảm theo số tiền cố định',
    free_shipping: 'Freeship',
}

/**
 * Lấy nhãn tiếng Việt cho loại hình mã giảm giá.
 * @param type - Loại hình mã giảm giá (CouponType)
 * @returns string - Nhãn hiển thị tương ứng
 */
export const getCouponTypeLabel = (type: CouponType): string => {
	return COUPON_TYPE_LABEL[type] ?? 'Không xác định';
};
