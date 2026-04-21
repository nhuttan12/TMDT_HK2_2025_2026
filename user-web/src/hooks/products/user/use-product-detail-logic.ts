'use client';

import { CartItem } from '@/types/carts/CartItem';
import { ProductDetail } from '@/types/products/user/ProductDetail';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useCartStore } from '@/stores/cart.store';
import { useCheckoutStore } from '@/stores/checkout.store';

export interface ProductDetailLogicReturn {
	quantity: number;
	handleIncreaseQuantity: () => void;
	handleDecreaseQuantity: () => void;
	handleAddToCart: () => void;
	handleBuyNow: () => void;
}

export function useProductDetailLogic(product: ProductDetail): ProductDetailLogicReturn {
	const [quantity, setQuantity] = useState<number>(1);
	const router: AppRouterInstance = useRouter();

	// Lưu ý: Các store của Zustand tự động suy luận kiểu (infer type), nên không cần gán type cho tham số state.
	const addItem = useCartStore((state) => state.addToCart);
	const setCheckoutItems = useCheckoutStore((state) => state.setItems);

	const handleIncreaseQuantity = (): void => {
		setQuantity((prev: number): number => prev + 1);
	};

	const handleDecreaseQuantity = (): void => {
		setQuantity((prev: number): number => (prev > 1 ? prev - 1 : 1));
	};

	const handleAddToCart = (): void => {
		addItem({
			productId: product.id,
			name: product.name,
			price: product.price,
			imageUrl: product.image,
			quantity: quantity,
		});
		// TODO: Có thể bổ sung Toast thông báo "Đã thêm vào giỏ hàng" tại đây.
	};

	const handleBuyNow = (): void => {
		const item: CartItem = {
			productId: product.id,
			name: product.name,
			price: product.price,
			imageUrl: product.image,
			quantity: quantity,
		};

		setCheckoutItems([item]);
		router.push('/checkout');
	};

	return {
		quantity: quantity,
		handleIncreaseQuantity: handleIncreaseQuantity,
		handleDecreaseQuantity: handleDecreaseQuantity,
		handleAddToCart: handleAddToCart,
		handleBuyNow: handleBuyNow,
	};
}
