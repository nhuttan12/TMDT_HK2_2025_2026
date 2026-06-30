'use client';

import { usePagination } from '@/hooks/share/use-pagination';
import { useCallback } from 'react';

export interface WishlistLogicReturn {
	currentPage: number;
	changePage: (page: number) => void;
	handleRemoveFavorite: (productId: number) => void;
}

interface WishlistLogicProps {
	totalPages: number;
	onRemoveFavorite: (productId: number) => void;
}

export const useWishlistLogic = ({
	totalPages,
	onRemoveFavorite,
}: WishlistLogicProps): WishlistLogicReturn => {
	// 1. Tích hợp hook phân trang của bạn
	const { currentPage, changePage } = usePagination();

	// 2. Logic xử lý xoá khỏi danh sách yêu thích
	const handleRemoveFavorite = useCallback(
		(productId: number) => {
			// Ví dụ: Thêm logic confirm hỏi người dùng trước khi xoá thực sự
			// if (window.confirm('Bạn có chắc muốn bỏ thích sản phẩm này?')) {
			//     onRemoveFavorite(productId);
			// }
			onRemoveFavorite(productId);
		},
		[onRemoveFavorite],
	);

	return {
		currentPage,
		changePage,
		handleRemoveFavorite,
	};
};
