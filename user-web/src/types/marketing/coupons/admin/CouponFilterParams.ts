import { CouponScope } from '../CouponScope';
import { CouponStatus } from '../CouponStatus';
import { DiscountType } from '../DiscountType';

export interface CouponFilterParams {
	search?: string;

	// Exact Match (Lọc chính xác theo Enum/Type)
	status?: CouponStatus;
	scope?: CouponScope;
	discountType?: DiscountType; // Lọc theo hình thức: Phần trăm hay Tiền mặt

	// Date Range (Trích xuất từ validTime để lọc theo khoảng thời gian)
	fromDate?: string; // Tìm các coupon có thời gian bắt đầu từ ngày này (ISO string)
	toDate?: string;
}
