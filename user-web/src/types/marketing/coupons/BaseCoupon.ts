import { TimeArrange } from "@/types/shared/TimeArrange";
import { CouponCategory } from "./CouponCategory";
import { CouponScope } from "./CouponScope";
import { DiscountType } from "./DiscountType";
import { CouponStatus } from "./CouponStatus";

// --- 2. BASE COUPON ---
export interface BaseCoupon {
    id: string;
    code: string;           // Ví dụ: FREESHIP50K, TET2026
    name: string;           // Tên hiển thị
    scope: CouponScope;     // 'platform' | 'shop'
    category: CouponCategory; // 'discount' | 'shipping' (Admin cũng phải có cái này)
    shopId: string | null;  // null nếu scope là 'platform'

    // Logic giảm giá
    discountType: DiscountType;
    discountValue: number; 
    maxDiscountAmount: number | null; 
    minOrderValue: number; 

    // Thời gian áp dụng
    validTime: TimeArrange; 
    
    // Trạng thái chung của mã (User cũng cần cái này để biết mã sắp diễn ra hay đã hết hạn)
    status: CouponStatus; 
}