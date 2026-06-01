import { ShopStatus } from '@/types/shops/admin/ShopStatus';
import { getShopStatusColor } from '@/utils/shop/shop-status-color';
import { getShopStatusText } from '@/utils/shop/shop-status-text';
import { JSX } from 'react';

interface ShopStatusBadgeProps {
	status: ShopStatus;
}

export function ShopStatusBadge({ status }: ShopStatusBadgeProps): JSX.Element {
	return (
		<span
			className={`px-2 py-1 rounded-full text-xs font-semibold ${getShopStatusColor(status)}`}
		>
			{getShopStatusText(status)}
		</span>
	);
}
