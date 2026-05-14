import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';

const INVOICE_STATUS_TEXT_CLASSES_COLOR: Record<InvoiceStatus, string> = {
	pending_approval: 'text-orange-600 font-medium',
	pending: 'text-yellow-600 font-medium',
	paid: 'text-green-600 font-medium',
	shipping: 'text-purple-600 font-medium',
	delivered: 'text-teal-600 font-medium',
	cancelled: 'text-red-600 font-medium',
	completed: 'text-blue-600 font-medium',
	returned: 'text-slate-600 font-medium',
};

/**
 * Hàm hỗ trợ lấy màu sắc trạng thái, có fallback an toàn
 */
export function getInvoiceStatusTextClassColor(status: InvoiceStatus): string {
	return INVOICE_STATUS_TEXT_CLASSES_COLOR[status] ?? 'text-slate-600 font-medium';
}
