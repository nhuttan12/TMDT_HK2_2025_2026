import { ProductFilterPayload } from '@/types/products/user/ProductFilterPayload';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export interface UseProductFilterLogicReturn {
	localMinPrice: number | undefined;
	localMaxPrice: number | undefined;
	localCategory: string;
	localShopName: string;
	setLocalMinPrice: (val: number | undefined) => void;
	setLocalMaxPrice: (val: number | undefined) => void;
	setLocalCategory: (val: string) => void;
	setLocalShopName: (val: string) => void;
	applyFilterToUrl: () => void;
	handleReset: () => void;

    buildFilterRequest: () => ProductFilterPayload;
}

export const useProductFilterLogic = (): UseProductFilterLogicReturn => {
	const router = useRouter();
	const searchParams = useSearchParams();

	// 1. Quản lý State cục bộ
	const [localMinPrice, setLocalMinPrice] = useState<number | undefined>(() => {
		const val = searchParams.get('minPrice');
		return val ? Number(val) : undefined;
	});

	const [localMaxPrice, setLocalMaxPrice] = useState<number | undefined>(() => {
		const val = searchParams.get('maxPrice');
		return val ? Number(val) : undefined;
	});

	const [localCategory, setLocalCategory] = useState<string>(() => {
		return searchParams.get('category') || '';
	});

	const [localShopName, setLocalShopName] = useState<string>(() => {
		return searchParams.get('shopName') || '';
	});

	const [prevSearchStr, setPrevSearchStr] = useState<string>(searchParams.toString());

	if (searchParams.toString() !== prevSearchStr) {
		// Cập nhật lại chuỗi cũ
		setPrevSearchStr(searchParams.toString());

		// Đồng bộ lại toàn bộ State NGAY TRONG QUÁ TRÌNH RENDER
		const minP = searchParams.get('minPrice');
		setLocalMinPrice(minP ? Number(minP) : undefined);

		const maxP = searchParams.get('maxPrice');
		setLocalMaxPrice(maxP ? Number(maxP) : undefined);

		setLocalCategory(searchParams.get('category') || '');
		setLocalShopName(searchParams.get('shopName') || '');
	}

	// 3. Đẩy State hiện tại lên URL
	const applyFilterToUrl = (): void => {
		const params = new URLSearchParams(searchParams.toString());

		if (localMinPrice !== undefined) params.set('minPrice', String(localMinPrice));
		else params.delete('minPrice');

		if (localMaxPrice !== undefined) params.set('maxPrice', String(localMaxPrice));
		else params.delete('maxPrice');

		if (localCategory.trim()) params.set('category', localCategory.trim());
		else params.delete('category');

		if (localShopName.trim()) params.set('shopName', localShopName.trim());
		else params.delete('shopName');

		router.push(`?${params.toString()}`);
	};

	const buildFilterRequest = (): ProductFilterPayload => {
		const minP = searchParams.get('minPrice');
		const maxP = searchParams.get('maxPrice');
		const category = searchParams.get('category');
		const shopName = searchParams.get('shopName');

		// Tạo request object, loại bỏ các giá trị rỗng/null để payload gửi đi sạch sẽ
		const payload: ProductFilterPayload = {};

		if (minP) payload.MinPrice = Number(minP);
		if (maxP) payload.MaxPrice = Number(maxP);
		if (category) payload.Category = category;
		if (shopName) payload.ShopName = shopName;

		return payload;
	};

	// 4. Xóa bộ lọc
	const handleReset = (): void => {
		router.push('?');
	};

	return {
		localMinPrice,
		localMaxPrice,
		localCategory,
		localShopName,
		setLocalMinPrice,
		setLocalMaxPrice,
		setLocalCategory,
		setLocalShopName,
		applyFilterToUrl,
		handleReset,
        buildFilterRequest
	};
};
