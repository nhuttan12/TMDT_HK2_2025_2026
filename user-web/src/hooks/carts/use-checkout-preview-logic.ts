'use client';

import { CartItem } from '@/types/carts/CartItem';
import { useCheckoutStore } from '@/stores/checkout.store';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface CheckoutLogicReturn {
	items: CartItem[];
	total: number;
	handleOrder: () => void;
	handleBack: () => void;
}

export function useCheckoutPreviewLogic(): CheckoutLogicReturn {
	const router: AppRouterInstance = useRouter();

	const items: CartItem[] = useCheckoutStore((s): CartItem[] => s.items);

	const total: number = useMemo((): number => {
		return items.reduce(
			(sum: number, item: CartItem): number => sum + item.price * item.quantity,
			0,
		);
	}, [items]);

	const handleOrder = (): void => {
		router.push('/orders/success');
	};

	const handleBack = (): void => {
		router.back();
	};

	return { items: items, total: total, handleOrder: handleOrder, handleBack: handleBack };
}
