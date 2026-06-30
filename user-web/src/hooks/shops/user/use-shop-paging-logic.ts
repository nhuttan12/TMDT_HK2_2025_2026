'use client';

import { usePagination, UsePaginationReturn } from '@/hooks/share/use-pagination';
import { PaginationParams } from '@/types/common/Pagination';
import { useSearchParams } from 'next/navigation';

interface ShopPagingLogicReturn {
    pagination: UsePaginationReturn;
    searchKeyword: string;
    paginationParams: PaginationParams;
}

export function useShopPagingLogic(): ShopPagingLogicReturn {
	const pagination = usePagination();
	const searchParams = useSearchParams();
	
	const searchKeyword = searchParams.get('search') || '';

    const paginationParams: PaginationParams = {
        pageNumber: pagination.currentPage,
        pageSize: 12
    }

	return {
		pagination,
		searchKeyword,
        paginationParams
	};
}