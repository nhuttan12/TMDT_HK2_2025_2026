import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';
import { getCouponsByUserId } from '@/services/marketing/coupon/user/coupons-user-service';

export function useCouponUserQuery(
	userId: number,
	initialData?: UserCoupon[],
): UseQueryResult<UserCoupon[], Error> {
	return useQuery({
		queryKey: ['user-coupons', userId],
		queryFn: (): Promise<UserCoupon[]> => getCouponsByUserId(userId),
		initialData: initialData, // Đón dữ liệu mồi từ Server
		enabled: userId > 0,
		staleTime: 1000 * 60 * 5, // Cache trong 5 phút để tránh gọi API dư thừa
	});
}
