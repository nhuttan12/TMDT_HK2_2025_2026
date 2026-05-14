import { useQuery } from '@tanstack/react-query';
import { getAdminShops } from '@/services/shops/admin/shop-admin-service';
import { ShopAdmin } from '@/types/shops/admin/ShopAdmin';
import { PaginationResponse } from '@/types/shared/PaginationResponse';

export const useShopAdminQuery = (
	page: number = 1,
	name?: string,
	status?: string,
	initialData?: PaginationResponse<ShopAdmin>,
) => {
	return useQuery({
		queryKey: ['admin-shops', page, name, status],
		queryFn: () => getAdminShops(page, name, status),
		initialData: initialData,
		staleTime: 5 * 60 * 1000,
	});
};
