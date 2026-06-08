import { UserCoupon } from "./UserCoupon";

export interface PlatformCoupon extends UserCoupon {
    scope: 'platform';
    shopId: null; 
}