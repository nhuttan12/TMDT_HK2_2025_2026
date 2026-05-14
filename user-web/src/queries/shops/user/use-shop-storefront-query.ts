import { getShopPublicCoupons, getShopPublicProducts } from "@/services/shops/user/shop-storefront-service";
import { UserCoupon } from "@/types/marketing/coupons/user/UserCoupon";
import { ProductUserCard } from "@/types/products/user/ProductUserCard";
import { PaginationResponse } from "@/types/shared/PaginationResponse";
import { ShopPublicFilter } from "@/types/shops/user/ShopPublicFilter";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

export const useShopProductsQuery = (
	shopId: number,
	filter: ShopPublicFilter,
): UseQueryResult<PaginationResponse<ProductUserCard>, Error> => {
	return useQuery<PaginationResponse<ProductUserCard>, Error>({
		// Gắn cả filter vào queryKey để tự động gọi lại API khi bộ lọc thay đổi
		queryKey: ['storefront-shop-products', shopId, filter],
		queryFn: () => getShopPublicProducts(shopId, filter),
		// Giữ lại data cũ khi đang fetch data mới (giúp UI không bị giật nháy)
		placeholderData: (previousData) => previousData,
	});
};

/**
 * Hook lấy danh sách voucher của shop
 */
export const useShopCouponsQuery = (shopId: number): UseQueryResult<UserCoupon[], Error> => {
	return useQuery<UserCoupon[], Error>({
		queryKey: ['storefront-shop-coupons', shopId],
		queryFn: () => getShopPublicCoupons(shopId),
	});
};

/**
 * Hook xử lý hành động "Theo dõi" shop
 */
export const useFollowShopMutation = () => {
	return useMutation({
		mutationFn: async (shopId: number) => {
			// Gọi API lưu trạng thái follow
			return new Promise((resolve) => setTimeout(() => resolve(true), 500));
		},
	});
};
