import { UserCoupon } from "./UserCoupon";

export interface ShopCoupon extends UserCoupon {
    scope: 'shop';
    shopId: string; 
}