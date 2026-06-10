import { BaseCoupon } from "../BaseCoupon";

export interface AdminCoupon extends BaseCoupon {
    createdByType: 'admin' | 'shop'; 
    
    // Quản lý số lượng (Chỉ Admin/Shop mới thấy)
    totalQuantity: number;
    usedQuantity: number;
}