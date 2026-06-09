import { TimeArrange } from "@/types/shared/TimeArrange";
import { CouponCategory } from "../CouponCategory";
import { DiscountType } from "../DiscountType";
import { UserSavedStatus } from "../UserSavedStatus";

export interface BaseUserCoupon {
    id: string;
    code: string;
    name: string;
    category: CouponCategory; 
    discountType: DiscountType;
    discountValue: number; 
    maxDiscountAmount: number | null; 
    minOrderValue: number; 
    validTime: TimeArrange; 
    userSavedStatus: UserSavedStatus;
}