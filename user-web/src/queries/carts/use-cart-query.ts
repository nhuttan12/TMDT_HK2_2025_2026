'use client';

import { CartItem } from '@/types/carts/CartItem';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchUserCart } from '@/services/carts/cart-service';

export function useCartQuery(): UseQueryResult<CartItem[], Error> {
	return useQuery({
		queryKey: ['cart-items'],
		queryFn: fetchUserCart,
	});
}
