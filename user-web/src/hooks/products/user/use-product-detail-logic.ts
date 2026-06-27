'use client';

import { useCartStore } from '@/stores/cart.store';
import { useCheckoutStore } from '@/stores/checkout.store';
import { CartItem } from '@/types/carts/CartItem';
import { ProductDetail } from '@/types/products/user/ProductDetail';
import { ProductVariantUser } from '@/types/products/user/ProductVariantUser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface ProductDetailLogicReturn {
	quantity: number;
	selectedVariant: ProductVariantUser | null;
	displayPrice: string;
	displayImage: string;
	currentStock: number;
	handleVariantSelect: (variant: ProductVariantUser) => void;
	handleIncreaseQuantity: () => void;
	handleDecreaseQuantity: () => void;
	handleAddToCart: () => void;
	handleBuyNow: () => void;
}

export function useProductDetailLogic(product: ProductDetail): ProductDetailLogicReturn {
	// 1. Kiểm tra xem sản phẩm có duy nhất 1 variant hay không
	const defaultVariant = product.variants?.length === 1 ? product.variants[0] : null;

	// 2. Gán giá trị mặc định cho state dựa trên defaultVariant
	const [selectedVariant, setSelectedVariant] = useState<ProductVariantUser | null>(
		defaultVariant,
	);

	// Nếu variant duy nhất đã hết hàng thì số lượng mặc định là 0, ngược lại là 1
	const [quantity, setQuantity] = useState<number>(
		defaultVariant && defaultVariant.stock === 0 ? 0 : 1,
	);

	const router = useRouter();
	const addItem = useCartStore((state) => state.addToCart);
	const setCheckoutItems = useCheckoutStore((state) => state.setItems);

	const minP = product.minPrice ?? 0;
	const maxP = product.maxPrice ?? 0;

	const displayPrice = selectedVariant
		? `${selectedVariant.price.toLocaleString('vi-VN')}đ`
		: minP === maxP
			? `${minP.toLocaleString('vi-VN')}đ`
			: `${minP.toLocaleString('vi-VN')}đ - ${maxP.toLocaleString('vi-VN')}đ`;

	const displayImage = selectedVariant?.image || product.images?.[0] || '';

	const currentStock = selectedVariant ? selectedVariant.stock : 0;

	const handleVariantSelect = (variant: ProductVariantUser): void => {
		// 3. Prevent Toggle: Nếu sản phẩm chỉ có 1 biến thể, không cho phép bỏ chọn
		if (product.variants?.length === 1) {
			return;
		}

		if (selectedVariant?.id === variant.id) {
			setSelectedVariant(null);
			setQuantity(1);
		} else {
			setSelectedVariant(variant);

			if (variant.stock === 0) {
				setQuantity(0);
			} else if (quantity > variant.stock || quantity === 0) {
				setQuantity(1);
			}
		}
	};

	const handleIncreaseQuantity = (): void => {
		setQuantity((prev: number): number => (prev < currentStock ? prev + 1 : prev));
	};

	const handleDecreaseQuantity = (): void => {
		setQuantity((prev: number): number => (prev > 1 ? prev - 1 : 1));
	};

	const createCartItem = (): CartItem | null => {
		if (!selectedVariant) return null;

		return {
			productId: selectedVariant.id,
			name: `${product.name} - ${selectedVariant.sku}`,
			price: selectedVariant.price,
			imageUrl: displayImage,
			quantity: quantity,
		};
	};

	const handleAddToCart = (): void => {
		const item: CartItem | null = createCartItem();
		if (!item) {
			alert('Vui lòng chọn phân loại hàng');
			return;
		}
		if (!selectedVariant?.isActive || selectedVariant.stock === 0) {
			alert('Sản phẩm đã hết hàng');
			return;
		}
		addItem(item);
	};

	const handleBuyNow = (): void => {
		const item: CartItem | null = createCartItem();
		if (!item) {
			alert('Vui lòng chọn phân loại hàng');
			return;
		}
		if (!selectedVariant?.isActive || selectedVariant.stock === 0) {
			alert('Sản phẩm đã hết hàng');
			return;
		}
		setCheckoutItems([item]);
		router.push('/checkout');
	};

	return {
		quantity,
		selectedVariant,
		displayPrice,
		displayImage,
		currentStock,
		handleVariantSelect,
		handleIncreaseQuantity,
		handleDecreaseQuantity,
		handleAddToCart,
		handleBuyNow,
	};
}
