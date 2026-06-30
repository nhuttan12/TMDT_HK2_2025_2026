'use client';

import { useCartStore } from '@/stores/cart.store';
import { useCheckoutStore } from '@/stores/checkout.store';
import { CartItem } from '@/types/carts/CartItem';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { CartService } from '@/services/carts/cart-service';
import apiClient from '@/lib/api-client';
import { useQueryClient } from '@tanstack/react-query';
import { createInvoiceRequestBody } from '@/types/invoices/user/InvoiceCreateDto';

export interface CartLogicReturn {
	selectedIds: string[];
	total: number;
	handleToggleSelect: (id: string) => void;
	handleToggleSelectAll: () => void;
	handleUpdateQuantity: (id: string, newQuantity: number) => void;
	handleRemoveItem: (id: string) => void;
	handlePreviewOrder: () => void;
	handleRedirectProductDetail: (id: string) => void;
}

export function useCartLogic(cartItems: CartItem[]): CartLogicReturn {
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const router = useRouter();
	const queryClient = useQueryClient();
	const setCheckoutItems = useCheckoutStore((s) => s.setItems); // Thay any bằng kiểu thực tế của store
	const updateQuantity = useCartStore((s) => s.updateQuantity);
	const removeItem = useCartStore((s) => s.removeItem);
	const cartService = new CartService(apiClient);

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

	const handleUpdateQuantity =async (id: string, newQuantity: number): Promise<void> => {
		if (newQuantity < 1) return;
		try{
			await cartService.addToCart(id, newQuantity);
			updateQuantity(id, newQuantity);
			await queryClient.invalidateQueries({
				queryKey: ['cart-items'],
			});
		}catch(e){
			throw e;
		}
	};

	const handleRemoveItem= async (id: string): Promise<void> => {
		try{
			await cartService.removeCartItem(id);

			removeItem(id);
			await queryClient.invalidateQueries({
				queryKey: ['cart-items'], // Phải trùng khớp với key trong useCartQuery của bạn
			});
		}catch {
			alert("xoa tb")
		}
	};

	const handlePreviewOrder = async (): Promise<void>=> {
		const selectedItems: CartItem[] = cartItems.filter((item: CartItem): boolean =>
			selectedIds.includes(item.productId),
		);
		const delivery = {
			address: '123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
			receiverName: 'Nguyễn Văn A',
			shippingFee: 50000,
		};
		const pram = createInvoiceRequestBody(selectedItems,delivery);
		const invoiceId =  await cartService.CreateInvoice(pram);
		setCheckoutItems(selectedItems);
		router.push(`/order-preview/${invoiceId}`);
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
		handlePreviewOrder,
		handleRedirectProductDetail,
	};
}


