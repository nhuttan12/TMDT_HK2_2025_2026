'use client';

import { useCartStore } from '@/stores/cart.store';
import { useCheckoutStore } from '@/stores/checkout.store';
import { CartItem } from '@/types/carts/CartItem';
import { ProductDetail } from '@/types/products/user/ProductDetail';
import { ProductVariantUser } from '@/types/products/user/ProductVariantUser';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export interface ProductDetailLogicReturn {
	quantity: number;
	selectedOptions: number[];
	selectedVariant: ProductVariantUser | undefined;
	displayPrice: string;
	displayImage: string;
	currentStock: number;
	handleOptionSelect: (tierIndex: number, optionIndex: number) => void;
	handleIncreaseQuantity: () => void;
	handleDecreaseQuantity: () => void;
	handleAddToCart: () => void;
	handleBuyNow: () => void;

    checkIsOptionDisabled: (tierIndex: number, optionIndex: number) => boolean;
}

export function useProductDetailLogic(product: ProductDetail): ProductDetailLogicReturn {
	// Khởi tạo mảng lựa chọn với giá trị -1 an toàn, kết hợp sử dụng Optional Chaining an toàn khi khởi tạo state
	const initialSelected: number[] = new Array(product.tierVariations?.length || 0).fill(-1);
	const [selectedOptions, setSelectedOptions] = useState<number[]>(initialSelected);
	const [quantity, setQuantity] = useState<number>(1);

	const router = useRouter();
	const addItem = useCartStore((state) => state.addToCart);
	const setCheckoutItems = useCheckoutStore((state) => state.setItems);

	// Tìm Variant dựa trên các options đã chọn
	const selectedVariant: ProductVariantUser | undefined = useMemo((): ProductVariantUser | undefined => {
		const variants = product.variants || [];

		if (selectedOptions.includes(-1)) return undefined;

		return variants.find((v: ProductVariantUser) =>
			v.tierIndex.every((val: number, index: number) => val === selectedOptions[index]),
		);
	}, [selectedOptions, product.variants]); // Chỉ phụ thuộc vào data gốc của product

	// Xác định giá hiển thị (Cần fallback cho minPrice/maxPrice nếu legacy data chỉ có price)
	const minP = product.minPrice ?? 0;
	const maxP = product.maxPrice ?? 0;

	// Xác định giá hiển thị
	const displayPrice = selectedVariant
		? `${selectedVariant.price.toLocaleString()}đ`
		: minP === maxP
			? `${minP.toLocaleString()}đ`
			: `${minP.toLocaleString()}đ - ${maxP.toLocaleString()}đ`;

	// Xác định ảnh hiển thị: Ảnh của variant -> Ảnh của option Tier 1 -> Ảnh mặc định của sản phẩm
	const displayImage = useMemo((): string => {
		const tierVariations = product.tierVariations || []; // Khai báo an toàn bên trong

		if (selectedVariant?.image) return selectedVariant.image;
		if (selectedOptions[0] !== -1 && tierVariations[0]?.images?.[selectedOptions[0]]) {
			return tierVariations[0].images[selectedOptions[0]];
		}

		const safeImages = product.images || [];
		return safeImages[0] || product.images?.[0] || '';
	}, [selectedVariant, selectedOptions, product.tierVariations, product.images]);

	const currentStock = selectedVariant ? selectedVariant.stock : 0;

	// Xử lý khi nhấn vào 1 nút phân loại
	const handleOptionSelect = (tierIndex: number, optionIndex: number): void => {
		setSelectedOptions((prev: number[]): number[] => {
			const newOptions = [...prev];
			// Toggle: Nếu click lại option đang chọn thì bỏ chọn
			newOptions[tierIndex] = newOptions[tierIndex] === optionIndex ? -1 : optionIndex;
			return newOptions;
		});
		// Reset lại số lượng về 1 mỗi khi đổi phân loại
		setQuantity(1);
	};

    const checkIsOptionDisabled = (tierIndex: number, optionIndex: number): boolean => {
        const testOptions: number[] = [...selectedOptions];
        testOptions[tierIndex] = optionIndex; // Giả lập chọn thử option này

        const matchingVariants = (product.variants || []).filter((variant: ProductVariantUser): boolean => {
            return testOptions.every((selectedOpt: number, idx: number): boolean => {
                if (selectedOpt === -1) return true; // Bỏ qua các tier chưa chọn
                return variant.tierIndex[idx] === selectedOpt;
            });
        });

        // Nếu tất cả các biến thể thoả mãn đều có stock = 0, thì option này sẽ bị disable
        const totalStock = matchingVariants.reduce((sum: number, v: ProductVariantUser): number => sum + v.stock, 0);
        return totalStock === 0;
    };

	const handleIncreaseQuantity = (): void => {
		setQuantity((prev: number): number => (prev < currentStock ? prev + 1 : prev));
	};

	const handleDecreaseQuantity = (): void => {
		setQuantity((prev: number): number => (prev > 1 ? prev - 1 : 1));
	};

	// Helper tạo CartItem chuẩn xác từ phân loại đã chọn
	const createCartItem = (): CartItem | null => {
		if (!selectedVariant) return null;

        const tierVariations = product.tierVariations || [];

		// Tạo chuỗi tên hiển thị: "Áo Thun - Đen, Size M"
		const variantName: string = tierVariations
			.map((tier, index) => tier.options[selectedOptions[index]])
			.join(', ');

		return {
			productId: selectedVariant.id, // Lưu ý: Ở đây ta lưu ID của variant vào giỏ hàng
			name: `${product.name} - ${variantName}`,
			price: selectedVariant.price,
			imageUrl: displayImage,
			quantity: quantity,
		};
	};

	const handleAddToCart = (): void => {
		const item: CartItem | null = createCartItem();
		if (!item) {
			// TODO: Thêm Toast báo lỗi "Vui lòng chọn phân loại hàng"
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
		selectedOptions,
		selectedVariant,
		displayPrice,
		displayImage,
		currentStock,
		handleOptionSelect,
		handleIncreaseQuantity,
		handleDecreaseQuantity,
		handleAddToCart,
		handleBuyNow,
        checkIsOptionDisabled
	};
}
