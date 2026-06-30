import { getShopListPagingMocking, getShopPublicCoupons, getShopPublicProducts } from "@/services/shops/user/shop-service";
import { PaginationParams } from "@/types/common/Pagination";
import { UserCoupon } from "@/types/marketing/coupons/user/UserCoupon";
import { BackendPagedResult } from "@/types/products/user/productBE";
import { ProductUserCard } from "@/types/products/user/ProductUserCard";
import { PaginationResponse } from "@/types/shared/PaginationResponse";
import { ShopPublicFilter } from "@/types/shops/user/ShopPublicFilter";
import { ShopUserCard } from "@/types/shops/user/ShopUserCard";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

export const useShopProductsQuery = (
	shopId: string,
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
export const useShopCouponsQuery = (shopId: string): UseQueryResult<UserCoupon[], Error> => {
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
		mutationFn: async (shopId: string) => {
			// Gọi API lưu trạng thái follow
			return new Promise((resolve) => setTimeout(() => resolve(true), 500));
		},
	});
};

export function useShopListQuery(
    search: string,
	pagination: PaginationParams
): UseQueryResult<BackendPagedResult<ShopUserCard>, Error> {
	return useQuery({
		// QueryKey thay đổi khi params thay đổi để tự động re-fetch dữ liệu mới
		queryKey: ['shop-list', search, pagination],
		queryFn: () => getShopListPagingMocking(search, pagination),
		staleTime: 1000 * 60 * 5, // Tối ưu hiệu năng: Cache dữ liệu trong vòng 5 phút
	});
}