import { TimeArrange } from '@/types/shared/TimeArrange';
import { DiscountType } from '../DiscountType';
import { CouponScope } from '../CouponScope';
import { CouponStatus } from '../CouponStatus';

export interface AdminCoupon {
	id: number;
	code: string; // Ví dụ: FREESHIP50K, TET2026
	name: string; // Tên hiển thị cho user
	scope: CouponScope; // Phân biệt loại voucher
	shopId: string | null; // Nếu scope là platform, trường này là null

	// Logic giảm giá
	discountType: DiscountType;
	discountValue: number; // Ví dụ: 10 (nếu là %), hoặc 50000 (nếu là tiền mặt)
	maxDiscountAmount: number | null; // Mức giảm tối đa (Ví dụ: Giảm 10% nhưng tối đa 30k)
	minOrderValue: number; // Đơn tối thiểu để áp dụng (Ví dụ: Đơn từ 100k)

	// Quản lý số lượng và thời gian
	totalQuantity: number;
	usedQuantity: number;

	validTime: TimeArrange; // ISO 8601 DateTime

	// Trạng thái (để UI dễ dàng render badge mà không cần tự tính toán lại ngày tháng)
	status: CouponStatus;
}
