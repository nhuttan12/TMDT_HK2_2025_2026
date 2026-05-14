import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';

const INVOICE_STATUS_HEX_COLORS: Record<InvoiceStatus, string> = {
	pending_approval: '#ea580c', // orange-600
	pending: '#ca8a04', // yellow-600
	paid: '#16a34a', // green-600
	shipping: '#9333ea', // purple-600
	delivered: '#0d9488', // teal-600
	cancelled: '#dc2626', // red-600
	completed: '#2563eb', // blue-600
	returned: '#475569', // slate-600
};

/**
 * Hàm hỗ trợ lấy mã Hex để đổ màu cho biểu đồ
 */
export const getInvoiceStatusHexColor = (status: InvoiceStatus): string => {
	return INVOICE_STATUS_HEX_COLORS[status] ?? '#475569'; // Tương ứng slate-600
};
    