import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export interface UseProductFilterLogicReturn {
	localMinPrice: number | undefined;
	localMaxPrice: number | undefined;
	localRating: number | undefined;
	localBrand: string;
	setLocalMinPrice: (val: number | undefined) => void;
	setLocalMaxPrice: (val: number | undefined) => void;
	setLocalRating: (val: number | undefined) => void;
	setLocalBrand: (val: string) => void;
	applyFilterToUrl: () => void;
	handleReset: () => void;
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

	const [localRating, setLocalRating] = useState<number | undefined>(() => {
		const val = searchParams.get('rating');
		return val ? Number(val) : undefined;
	});

	const [localBrand, setLocalBrand] = useState<string>(() => {
		return searchParams.get('brand') || '';
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

		const rat = searchParams.get('rating');
		setLocalRating(rat ? Number(rat) : undefined);

		setLocalBrand(searchParams.get('brand') || '');
	}   

	// 3. Đẩy State hiện tại lên URL
	const applyFilterToUrl = (): void => {
		const params = new URLSearchParams(searchParams.toString());

		if (localMinPrice !== undefined) params.set('minPrice', String(localMinPrice));
		else params.delete('minPrice');

		if (localMaxPrice !== undefined) params.set('maxPrice', String(localMaxPrice));
		else params.delete('maxPrice');

		if (localRating !== undefined) params.set('rating', String(localRating));
		else params.delete('rating');

		if (localBrand.trim()) params.set('brand', localBrand.trim());
		else params.delete('brand');

		router.push(`?${params.toString()}`);
	};

	// 4. Xóa bộ lọc
	const handleReset = (): void => {
		router.push('?');
	};

	return {
		localMinPrice,
		localMaxPrice,
		localRating,
		localBrand,
		setLocalMinPrice,
		setLocalMaxPrice,
		setLocalRating,
		setLocalBrand,
		applyFilterToUrl,
		handleReset,
	};
};
