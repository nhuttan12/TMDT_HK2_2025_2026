'use client';

import { CartItem } from '@/types/carts/CartItem';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
	CartService,
} from '@/services/carts/cart-service';
import apiClient from '@/lib/api-client';

export function useCartQuery(userId: string, initialData?: CartItem[]): UseQueryResult<CartItem[], Error> {
	const cartService =  new CartService(apiClient);
	return useQuery({
		queryKey: ['cart-items', userId],
		queryFn: () => cartService.getMyUserCart(),
		enabled: !!userId,
		initialData: initialData,
		staleTime: 1000 * 60 * 1,

		// Cơ chế Fetch định kỳ (Polling)
		refetchInterval: 1000 * 60 * 5,
	});
}
