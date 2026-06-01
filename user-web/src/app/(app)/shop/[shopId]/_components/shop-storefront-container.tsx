'use client';

import React, { JSX, useEffect } from 'react';
import { ShopStorefrontUi } from './shop-storefront-ui';
import { ShopStorefront } from '@/types/shops/user/ShopStorefront';
import { useShopStorefrontLogic } from '@/hooks/shops/user/use-shop-storefront-logic';
import { useShopCouponsQuery, useShopProductsQuery } from '@/queries/shops/user/use-shop-storefront-query';

interface ShopStorefrontContainerProps {
	shopId: string;
	initialShopInfo: ShopStorefront;
}

export const ShopStorefrontContainer = ({
	shopId,
	initialShopInfo,
}: ShopStorefrontContainerProps): JSX.Element => {
	// 1. Khởi tạo toàn bộ Logic (Bao gồm cả phân trang)
	const logic = useShopStorefrontLogic(shopId);

	// 2. Fetch data bằng TanStack Query
	const { data: products, isFetching: isProductsLoading } = useShopProductsQuery(
		shopId,
		logic.filter,
	);

	const { data: coupons } = useShopCouponsQuery(shopId);

	// 3. Đồng bộ totalPages từ API vào Logic Hook
	useEffect(() => {
		if (products?.meta.totalPages) {
			logic.setTotalPages(products.meta.totalPages);
		}
	}, [products, logic]);
	// Ghi chú: Chuyền 'logic' vào dependency array là an toàn vì các hàm như setTotalPages lấy từ useState có reference ổn định.

	// 4. Render Presenter (Giao diện)
	return (
		<ShopStorefrontUi
			{...logic} // Tự động rải currentPage, changePage, filter, handleSortChange,... xuống UI
			shopInfo={initialShopInfo}
			products={products}
			coupons={coupons}
			isProductsLoading={isProductsLoading}
		/>
	);
};
