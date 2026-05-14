import { AdminCoupon } from './AdminCoupon';

export type CouponSortField = keyof Pick<AdminCoupon, 'code' | 'name' | 'usedQuantity' | 'status'>;
