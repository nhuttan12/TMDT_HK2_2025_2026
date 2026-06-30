'use client';

import { useCheckoutStore } from '@/stores/checkout.store';
import { CartItem } from '@/types/carts/CartItem';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export interface OrderLogicReturn {
	items: CartItem[];
	total: number;
	handleOrder: () => void;
	handleBack: () => void;
}

export function useOrderPreviewLogic(): OrderLogicReturn {
	const router = useRouter();

	const items = useCheckoutStore((s): CartItem[] => s.items);

	const total = useMemo((): number => {
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

	return { items, total, handleOrder, handleBack };
}
