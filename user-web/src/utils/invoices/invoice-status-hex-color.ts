import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';

const INVOICE_STATUS_HEX_COLORS: Record<InvoiceStatus, string> = {
	unknown: '#9ca3af',      // gray-400 (Không xác định)
	pending: '#ca8a04',      // yellow-600
	processing: '#3b82f6',   // blue-500 (Thay thế cho luồng paid/shipping cũ)
	completed: '#16a34a',    // green-600 (Hoàn tất nên dùng xanh lá thay vì xanh dương cũ)
	cancelled: '#dc2626',    // red-600
	returned: '#475569',     // slate-600
};

/**
 * Hàm hỗ trợ lấy mã Hex để đổ màu cho biểu đồ
 */
export const getInvoiceStatusHexColor = (status: InvoiceStatus): string => {
	return INVOICE_STATUS_HEX_COLORS[status] ?? '#475569'; // Tương ứng slate-600
};
    