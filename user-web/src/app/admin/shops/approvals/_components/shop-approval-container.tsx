'use client';

import { useShopApprovalLogic } from '@/hooks/shops/admin/use-shop-approval-logic';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { ShopApproval } from '@/types/shops/admin/ShopApproval';
import { JSX } from 'react';
import { ShopApprovalUi } from './shop-approval-ui';
import { useShopApprovalQuery } from '@/queries/shops/admin/use-shop-approval-query';
import { useSearchParams } from 'next/navigation';

interface ShopApprovalContainerProps {
	initialData?: PaginationResponse<ShopApproval>;
}

export function ShopApprovalContainer({ initialData }: ShopApprovalContainerProps): JSX.Element {
	const searchParams = useSearchParams();

	// 1. Parse params từ URL
	const pageParam = Number(searchParams.get('page')) || 1;
	const searchParam = searchParams.get('name') || '';
	const statusParam = searchParams.get('status') || '';

	// 2. Fetch Data thông qua React Query ngay tại Container
	const { data, isLoading, isFetching } = useShopApprovalQuery(
		{ page: pageParam, name: searchParam, status: statusParam },
		initialData,
	);

	const totalPages = data?.meta.totalPages || 1;

	// 3. Khởi tạo Logic Hook chỉ với dữ liệu cần thiết
	const logic = useShopApprovalLogic({ totalPages });

	return (
		<ShopApprovalUi
			{...logic}
			shops={data?.data || []}
			totalPages={totalPages}
			isLoading={isLoading || isFetching}
		/>
	);
}
