import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AdminCoupon } from '@/types/marketing/coupons/admin/AdminCoupon';
import { getCouponDetailById } from '@/services/marketing/coupon/admin/admin-coupon-service';

export const useCouponDetailByCouponIdQuery = (
	couponId?: string,
	initialData?: AdminCoupon,
): UseQueryResult<AdminCoupon, Error> => {
	return useQuery<AdminCoupon, Error>({
		// queryKey phải chứa ID để cache tách biệt từng coupon
		queryKey: ['coupon-detail-admin', couponId],
		queryFn: async (): Promise<AdminCoupon> => getCouponDetailById(couponId!),
		initialData: initialData,
        enabled: !!couponId,
	});
};
