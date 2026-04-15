import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Coupon } from '@/types/coupons/Coupon';
import { getCouponsByUserId } from '@/services/coupons/user/coupons-service';

export function useCouponsQuery(
	userId: number,
	initialData?: Coupon[],
): UseQueryResult<Coupon[], Error> {
	return useQuery({
		queryKey: ['user-coupons', userId],
		queryFn: (): Promise<Coupon[]> => getCouponsByUserId(userId),
		initialData: initialData, // Đón dữ liệu mồi từ Server
		enabled: userId > 0,
		staleTime: 1000 * 60 * 5, // Cache trong 5 phút để tránh gọi API dư thừa
	});
}
