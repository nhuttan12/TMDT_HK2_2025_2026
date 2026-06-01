'use client';

import { useCartStore } from '@/stores/cart.store';
import { useCheckoutStore } from '@/stores/checkout.store';
import { CartItem } from '@/types/carts/CartItem';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export interface CartLogicReturn {
	selectedIds: string[];
	total: number;
	handleToggleSelect: (id: string) => void;
	handleToggleSelectAll: () => void;
	handleUpdateQuantity: (id: string, newQuantity: number) => void;
	handleRemoveItem: (id: string) => void;
	handleCheckout: () => void;
	handleRedirectProductDetail: (id: string) => void;
}

export function useCartLogic(cartItems: CartItem[]): CartLogicReturn {
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const router = useRouter();

	const setCheckoutItems = useCheckoutStore((s) => s.setItems); // Thay any bằng kiểu thực tế của store
	const updateQuantity = useCartStore((s) => s.updateQuantity);
	const removeItem = useCartStore((s) => s.removeItem);

	const handleToggleSelect = (id: string): void => {
		setSelectedIds((prev: string[]) =>
			prev.includes(id) ? prev.filter((i: string) => i !== id) : [...prev, id],
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

	const handleUpdateQuantity = (id: string, newQuantity: number): void => {
		if (newQuantity < 1) return;
		// TODO: Nếu xài Tanstack Query làm source of truth, chỗ này nên mutate API rồi invalidate query.
		// Tạm thời giữ nguyên việc gọi action từ store theo flow hiện tại của bạn.
		updateQuantity(id, newQuantity);
	};

	const handleRemoveItem = (id: string): void => {
		removeItem(id);
	};

	const handleCheckout = (): void => {
		const selectedItems: CartItem[] = cartItems.filter((item: CartItem): boolean =>
			selectedIds.includes(item.productId),
		);

		setCheckoutItems(selectedItems);
		router.push('/checkout');
	};

	const handleRedirectProductDetail = (productId: string): void => {
		router.push(`/products/${productId}`);
	};

	return {
		selectedIds,
		total,
		handleToggleSelect,
		handleToggleSelectAll,
		handleUpdateQuantity,
		handleRemoveItem,
		handleCheckout,
		handleRedirectProductDetail,
	};
}
