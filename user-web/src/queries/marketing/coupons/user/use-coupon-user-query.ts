'use client';

import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserCoupon } from '@/types/marketing/coupons/user/UserCoupon';
import {
	claimCoupon,
	getCouponsByUserId,
	getPlatformCoupons,
} from '@/services/marketing/coupon/user/user-coupon-service';

export function useCouponUserQuery(
	userId: string,
	initialData?: UserCoupon[],
): UseQueryResult<UserCoupon[], Error> {
	return useQuery({
		queryKey: ['user-coupons', userId],
		queryFn: (): Promise<UserCoupon[]> => getCouponsByUserId(userId),
		initialData: initialData, // Đón dữ liệu mồi từ Server
		enabled: userId !== '',
		staleTime: 1000 * 60 * 5, // Cache trong 5 phút để tránh gọi API dư thừa
	});
}

export function usePlatformCouponsQuery(
	initialData?: UserCoupon[],
): UseQueryResult<UserCoupon[], Error> {
	return useQuery<UserCoupon[], Error>({
		queryKey: ['site-wide-coupons'],
		queryFn: getPlatformCoupons,
		initialData: initialData,
		staleTime: 1000 * 60 * 15, // Cache 15 phút
	});
}

export const useClaimCouponMutation = () => {
	return useMutation({
		mutationFn: (couponCode: string) => claimCoupon(couponCode),
		onSuccess: (data, variables) => {
			// Bắn thông báo thành công. Mọi component xài hook này đều có thông báo giống nhau.
			// toast.success(`Lưu mã ${variables} thành công!`);
			alert(`Lưu mã ${variables} thành công!`);

			// TODO: Nếu cần, bạn có thể gọi queryClient.invalidateQueries() ở đây
			// để reload lại danh sách ví voucher của user.
		},
		onError: (error) => {
			// Xử lý lỗi (ví dụ: mã đã hết hạn, user chưa login)
			// toast.error('Lưu mã thất bại. Vui lòng thử lại.');
			alert('Lưu mã thất bại.');
		},
	});
};
