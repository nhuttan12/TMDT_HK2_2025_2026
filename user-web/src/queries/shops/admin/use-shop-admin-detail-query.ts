import { useQuery } from '@tanstack/react-query';
import { getShopAdminDetail } from '@/services/shops/admin/shop-admin-detail-service';
import { ShopAdminDetail } from '@/types/shops/admin/ShopAdminDetail';

export const useShopAdminDetailQuery = (id: number, initialData?: ShopAdminDetail) => {
	return useQuery({
		queryKey: ['admin-shop-detail', id],
		queryFn: () => getShopAdminDetail(id),
		initialData: initialData,
		staleTime: 5 * 60 * 1000,
	});
};
