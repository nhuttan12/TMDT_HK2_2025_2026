'use client';

import { CartItem } from '@/types/carts/CartItem';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useCheckoutStore } from '@/stores/checkout.store';
import { useCartStore } from '@/stores/cart.store';

export interface CartLogicReturn {
	selectedIds: number[];
	total: number;
	handleToggleSelect: (id: number) => void;
	handleToggleSelectAll: () => void;
	handleUpdateQuantity: (id: number, newQuantity: number) => void;
	handleRemoveItem: (id: number) => void;
	handleCheckout: () => void;
	handleRedirectProductDetail: (id: number) => void;
}

export function useCartLogic(cartItems: CartItem[]): CartLogicReturn {
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const router: AppRouterInstance = useRouter();

	const setCheckoutItems = useCheckoutStore((s) => s.setItems); // Thay any bằng kiểu thực tế của store
	const updateQuantity = useCartStore((s) => s.updateQuantity);
	const removeItem = useCartStore((s) => s.removeItem);

	const handleToggleSelect = (id: number): void => {
		setSelectedIds((prev: number[]) =>
			prev.includes(id) ? prev.filter((i: number) => i !== id) : [...prev, id],
		);
	};

	const handleToggleSelectAll = (): void => {
		if (selectedIds.length === cartItems.length && cartItems.length > 0) {
			setSelectedIds([]);
		} else {
			setSelectedIds(cartItems.map((i: CartItem) => i.productId));
		}
	};

	const total: number = useMemo(() => {
		return cartItems
			.filter((item: CartItem) => selectedIds.includes(item.productId))
			.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
	}, [cartItems, selectedIds]);

	const handleUpdateQuantity = (id: number, newQuantity: number): void => {
		if (newQuantity < 1) return;
		// TODO: Nếu xài Tanstack Query làm source of truth, chỗ này nên mutate API rồi invalidate query.
		// Tạm thời giữ nguyên việc gọi action từ store theo flow hiện tại của bạn.
		updateQuantity(id, newQuantity);
	};

	const handleRemoveItem = (id: number): void => {
		removeItem(id);
	};

	const handleCheckout = (): void => {
		const selectedItems: CartItem[] = cartItems.filter((item: CartItem): boolean =>
			selectedIds.includes(item.productId),
		);

		setCheckoutItems(selectedItems);
		router.push('/checkout');
	};

	const handleRedirectProductDetail = (productId: number): void => {
		router.push(`/products/${productId}`);
	};

	return {
		selectedIds: selectedIds,
		total: total,
		handleToggleSelect: handleToggleSelect,
		handleToggleSelectAll: handleToggleSelectAll,
		handleUpdateQuantity: handleUpdateQuantity,
		handleRemoveItem: handleRemoveItem,
		handleCheckout: handleCheckout,
		handleRedirectProductDetail: handleRedirectProductDetail,
	};
}
