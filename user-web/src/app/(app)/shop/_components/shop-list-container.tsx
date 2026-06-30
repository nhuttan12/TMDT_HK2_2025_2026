'use client';

import { useShopPagingLogic } from '@/hooks/shops/user/use-shop-paging-logic';
import { useShopListQuery } from '@/queries/shops/user/use-shop-storefront-query';
import { JSX } from 'react';
import ShopListUi from './shop-list-ui';

export default function ShopsListContainer(): JSX.Element {
	const { pagination, searchKeyword, paginationParams } = useShopPagingLogic();

    const { data, isLoading } = useShopListQuery(searchKeyword, paginationParams);

    const currentShops = data?.items || [];
	const totalPages = data?.totalPages || 1;

	return (
		<ShopListUi
			{...pagination} // Truyền currentPage và changePage vào UI
			shops={currentShops} // Truyền data từ API (data?.items)
			totalPages={totalPages} // Truyền số trang từ API (data?.meta.totalPages)
			isLoading={isLoading}
		/>
	);
}