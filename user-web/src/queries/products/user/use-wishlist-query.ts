import {
	getProductsFromWishlist,
	removeProductFromWishlist,
} from '@/services/products/user/wishlist-service';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useWishlistQuery(page: number, initialData?: PaginationResponse<ProductUserCard>) {
	return useQuery({
		queryKey: ['wishlist', page],
		queryFn: () => getProductsFromWishlist(page),
		initialData: initialData,
	});
}

export function useRemoveFavoriteMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (productId: number) => removeProductFromWishlist(productId),
		onSuccess: () => {
			// Xoá thành công thì báo TanStack Query đi gọi lại API wishlist để làm mới UI
			queryClient.invalidateQueries({ queryKey: ['wishlist'] });
		},
	});
}
