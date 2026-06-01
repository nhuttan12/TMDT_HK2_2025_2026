'use client';

import { CartItem } from '@/types/carts/CartItem';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUserCartByUserId } from '@/services/carts/cart-service';

export function useCartQuery(userId: string, initialData?: CartItem[]): UseQueryResult<CartItem[], Error> {
	return useQuery({
		queryKey: ['cart-items', userId],
		queryFn: () => getUserCartByUserId(userId),
		enabled: !!userId,
		initialData: initialData,
		staleTime: 1000 * 60 * 1,

		// Cơ chế Fetch định kỳ (Polling)
		refetchInterval: 1000 * 60 * 5,
	});
}
