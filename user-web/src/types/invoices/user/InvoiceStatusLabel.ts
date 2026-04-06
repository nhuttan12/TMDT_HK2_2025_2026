import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';

const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
	PENDING_APPROVAL: 'Chờ phê duyệt',
	PENDING: 'Chờ thanh toán',
	PAID: 'Đã thanh toán',
	CANCELLED: 'Đã hủy',
	COMPLETED: 'Hoàn tất',
};

export function getInvoiceStatusLabel(status: InvoiceStatus): string {
	const label: string | undefined = INVOICE_STATUS_LABEL[status];
	return label ?? 'Không xác định';
}