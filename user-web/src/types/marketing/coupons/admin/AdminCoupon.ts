import { BaseCoupon } from "../BaseCoupon";

export interface AdminCoupon extends BaseCoupon {
    // Quản lý số lượng (Chỉ Admin/Shop mới thấy)
    totalQuantity: number;
    usedQuantity: number;
}