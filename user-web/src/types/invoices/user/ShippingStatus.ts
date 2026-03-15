export type ShippingStatus = 'PREPARING' | 'SHIPPING' | 'DELIVERED';

export function getShippingStatusLabel(status: ShippingStatus): string {
	switch (status) {
		case 'PREPARING':
			return 'Đang chuẩn bị';
		case 'SHIPPING':
			return 'Đang giao hàng';
		case 'DELIVERED':
			return 'Đã giao hàng';
		default:
			return 'Không xác định';
	}
}
