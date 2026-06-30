import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';

const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
	unknown: 'Không xác định',
	pending: 'Chờ xử lý',     
	processing: 'Đang xử lý', 
	completed: 'Hoàn tất',
	cancelled: 'Đã hủy',
	returned: 'Đã hoàn trả',
};

export function getInvoiceStatusLabel(status: InvoiceStatus): string {
	const label: string | undefined = INVOICE_STATUS_LABEL[status];
	return label ?? 'Không xác định';
}