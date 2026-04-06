import { ShippingStatus } from '@/types/invoices/user/ShippingStatus';

const SHIPPING_STATUS_LABEL: Record<ShippingStatus, string> = {
	PREPARING: 'Đang chuẩn bị',
	SHIPPING: 'Đang giao hàng',
	DELIVERED: 'Đã giao hàng',
};

export function getShippingStatusLabel(status: ShippingStatus): string {
	const label: string | undefined = SHIPPING_STATUS_LABEL[status];
	return label ?? 'Không xác định';
}