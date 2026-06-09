import { ShopStatus } from "@/types/shops/admin/ShopStatus";

const shopStatusColors: Record<ShopStatus, string> = {
		active: 'bg-green-100 text-green-700',
		closed: 'bg-gray-100 text-gray-700',
		banned: 'bg-red-100 text-red-700',
	};

export const getShopStatusColor = (status: ShopStatus): string => shopStatusColors[status];