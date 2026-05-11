import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';

const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
	pending_approval: 'Chờ phê duyệt',
	pending: 'Chờ thanh toán',
	paid: 'Đã thanh toán',
	cancelled: 'Đã hủy',
    delivered: 'Đã giao',
    returned: 'Đã hoàn trả',
    shipping: 'Đang giao',
	completed: 'Hoàn tất',
};

export function getInvoiceStatusLabel(status: InvoiceStatus): string {
	const label: string | undefined = INVOICE_STATUS_LABEL[status];
	return label ?? 'Không xác định';
}