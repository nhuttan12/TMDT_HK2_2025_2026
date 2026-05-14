'use client';

import React, { JSX } from 'react';
import { useShopAdminLogic } from '@/hooks/shops/admin/use-shop-admin-logic';
import { ShopManagementUi } from './shop-management-ui';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { ShopAdmin } from '@/types/shops/admin/ShopAdmin';

interface ShopManagementContainerProps {
	initialData: PaginationResponse<ShopAdmin>;
}

export default function ShopManagementContainer({
	initialData,
}: ShopManagementContainerProps): JSX.Element {
	const logic = useShopAdminLogic({ initialData });

	return (
		<ShopManagementUi
			{...logic}
			shops={logic.data?.data || []}
			totalPages={logic.data?.meta.totalPages || 1}
		/>
	);
}
