export type InvoiceStatus = 'PENDING' | 'PAID' | 'CANCELLED' | 'COMPLETED';

export function getInvoiceStatusLabel(status: InvoiceStatus): string {
	switch (status) {
		case 'PENDING':
			return 'Chờ thanh toán';
		case 'PAID':
			return 'Đã thanh toán';
		case 'CANCELLED':
			return 'Đã hủy';
		case 'COMPLETED':
			return 'Hoàn tất';
		default:
			return 'Không xác định';
	}
}
