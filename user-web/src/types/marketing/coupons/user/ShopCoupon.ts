import { BaseUserCoupon } from "./BaseUserCoupon";

export interface ShopCoupon extends BaseUserCoupon {
    scope: 'shop';
    shopId: string; 
}