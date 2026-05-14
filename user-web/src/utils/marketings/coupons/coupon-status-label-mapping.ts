import { CouponStatus } from "@/types/marketing/coupons/CouponStatus";

export const COUPON_STATUS_LABEL: Record<CouponStatus, string> = {
	upcoming: 'Sắp diễn ra',
	active: 'Đang hoạt động',
	expired: 'Đã hết hạn',
	disabled: 'Đã vô hiệu hóa',
} as const;

/**
 * Lấy nhãn tiếng Việt cho trạng thái Coupon.
 * @param status - Trạng thái Coupon (CouponStatus)
 * @returns string - Nhãn hiển thị tương ứng
 */
export const getCouponStatusLabel = (status: CouponStatus): string => {
	return COUPON_STATUS_LABEL[status] ?? 'Không xác định';
};
