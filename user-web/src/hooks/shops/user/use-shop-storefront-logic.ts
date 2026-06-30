'use client';

import { usePagination } from '@/hooks/share/use-pagination';
import { useFollowShopMutation } from '@/queries/shops/user/use-shop-storefront-query';
import { ShopPublicFilter } from '@/types/shops/user/ShopPublicFilter';
import { useState } from 'react';

export interface ShopStorefrontLogicReturn {
	filter: ShopPublicFilter;
	isFollowing: boolean;
	currentPage: number;
	changePage: (page: number) => void;
	setTotalPages: (total: number) => void; // Hàm để Container bơm tổng số trang vào
	handleSortChange: (sortBy: ShopPublicFilter['sortBy']) => void;
	handleFollowClick: () => void;
	handleClaimCoupon: (couponCode: string) => void;
}

export const useShopStorefrontLogic = (shopId: string): ShopStorefrontLogicReturn => {
	// 1. Khởi tạo Phân trang
	const [totalPages, setTotalPages] = useState<number>(0);
	const { currentPage, changePage } = usePagination();

	// 2. Quản lý Bộ lọc (Chỉ giữ limit và sortBy, page lấy từ hook phân trang)
	const [filterState, setFilterState] = useState<{
		limit: number;
		sortBy: ShopPublicFilter['sortBy'];
	}>({
		limit: 12,
		sortBy: 'latest',
	});

	// Gom filter state và page lại thành một object hoàn chỉnh để query API
	const filter: ShopPublicFilter = {
		...filterState,
		page: currentPage,
	};

	// 3. Trạng thái Follow
	const [isFollowing, setIsFollowing] = useState<boolean>(false);
	const followMutation = useFollowShopMutation();

	// 4. Các hàm xử lý sự kiện
	const handleSortChange = (sortBy: ShopPublicFilter['sortBy']): void => {
		setFilterState((prev) => ({ ...prev, sortBy }));
		// Rất quan trọng: Khi đổi tiêu chí lọc, phải trả user về trang 1
		changePage(1);
	};

	const handleFollowClick = (): void => {
		followMutation.mutate(shopId, {
			onSuccess: () => setIsFollowing(!isFollowing),
		});
	};

	const handleClaimCoupon = (couponCode: string): void => {
		alert(`Đã lưu mã ${couponCode} vào ví voucher của bạn!`);
	};

	return {
		filter,
		isFollowing,
		currentPage,
		changePage,
		setTotalPages,
		handleSortChange,
		handleFollowClick,
		handleClaimCoupon,
	};
};
