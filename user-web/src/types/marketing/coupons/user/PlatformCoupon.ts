import { BaseUserCoupon } from "./BaseUserCoupon";

export interface PlatformCoupon extends BaseUserCoupon {
    scope: 'platform';
    shopId: null; 
}