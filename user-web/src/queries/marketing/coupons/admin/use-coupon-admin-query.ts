import { getPlatformCoupons, getShopCouponsByShopId } from '@/services/marketing/coupon/admin/coupon-admin-service';
import { AdminCoupon } from '@/types/marketing/coupons/admin/AdminCoupon';
import { CouponScope } from '@/types/marketing/coupons/CouponScope';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useCouponQuery = (
	scope: CouponScope,
	shopId?: number,
	initialData?: PaginationResponse<AdminCoupon>,
): UseQueryResult<PaginationResponse<AdminCoupon>, Error> => {
	return useQuery<PaginationResponse<AdminCoupon>, Error>({
		// Đưa cả scope và shopId vào queryKey để cache chuẩn xác
		queryKey: ['coupon-list-admin', scope, shopId],

		queryFn: async (): Promise<PaginationResponse<AdminCoupon>> => {
			// Điều phối logic gọi API
			if (scope === 'platform') {
				return getPlatformCoupons();
			}

			if (scope === 'shop') {
				if (!shopId) {
					throw new Error('shopId is required when scope is shop');
				}
				return getShopCouponsByShopId(shopId);
			}

			throw new Error('Invalid coupon scope');
		},
		initialData: initialData,
	});
};