import { ShopStatus } from '@/types/shops/admin/ShopStatus';

const shopStatusText: Record<ShopStatus, string> = {
	active: 'Hoạt động',
	closed: 'Đóng cửa',
	banned: 'Bị cấm',
};

export const getShopStatusText = (status: ShopStatus): string => shopStatusText[status];