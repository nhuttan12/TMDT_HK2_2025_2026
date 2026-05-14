'use client';

import { useShopAdminDetailLogic } from '@/hooks/shops/admin/use-shop-admin-detail-logic';
import { ShopAdminDetail } from '@/types/shops/admin/ShopAdminDetail';
import { JSX } from 'react';
import { ShopDetailUi } from './shop-detail-ui';

interface ShopDetailContainerProps {
	id: number;
	initialData?: ShopAdminDetail;
}

export function ShopDetailContainer({ id, initialData }: ShopDetailContainerProps): JSX.Element {
	const logic = useShopAdminDetailLogic(id, initialData);

	return (
		<ShopDetailUi
			shop={logic.shop}
			isLoading={logic.isLoading}
			onBack={logic.handleBack}
			onBan={logic.handleBanShop}
			onUnban={logic.handleUnbanShop}
		/>
	);
}
