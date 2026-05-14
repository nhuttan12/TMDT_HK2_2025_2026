import { DiscountType } from "@/types/marketing/coupons/DiscountType";

export const DISCOUNT_TYPE_LABEL: Record<DiscountType, string> = {
	percentage: 'Phần trăm',
	fixed_amount: 'Số tiền cố định',
} as const;

/**
 * Lấy nhãn tiếng Việt cho loại hình giảm giá.
 * @param type - Loại hình giảm giá (DiscountType)
 * @returns string - Nhãn hiển thị tương ứng
 */
export const getDiscountTypeLabel = (type: DiscountType): string => {
	return DISCOUNT_TYPE_LABEL[type] ?? 'Không xác định';
};
