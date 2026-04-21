import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';

export const INVOICE_STATUS_COLORS: Record<InvoiceStatus, string> = {
	pending_approval: 'text-orange-600 font-medium',
	pending: 'text-yellow-600 font-medium',
	paid: 'text-green-600 font-medium',
	cancelled: 'text-red-600 font-medium',
	completed: 'text-blue-600 font-medium',
};

/**
 * Hàm hỗ trợ lấy màu sắc trạng thái, có fallback an toàn
 */
export function getInvoiceStatusColor(status: InvoiceStatus): string {
	return INVOICE_STATUS_COLORS[status] ?? 'text-slate-600 font-medium';
}
