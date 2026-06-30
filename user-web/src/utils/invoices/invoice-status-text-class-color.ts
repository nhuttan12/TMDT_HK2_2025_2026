import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';

const INVOICE_STATUS_TEXT_CLASSES_COLOR: Record<InvoiceStatus, string> = {
	unknown: 'text-gray-500 font-medium',    // Trạng thái không xác định (màu xám)
	pending: 'text-yellow-600 font-medium',  // Chờ xử lý (giữ nguyên màu vàng)
	processing: 'text-blue-600 font-medium', // Đang xử lý (dùng màu xanh dương)
	completed: 'text-green-600 font-medium', // Hoàn tất (dùng màu xanh lá thay cho paid cũ)
	cancelled: 'text-red-600 font-medium',   // Đã hủy (giữ nguyên màu đỏ)
	returned: 'text-slate-600 font-medium',  // Đã hoàn trả (giữ nguyên màu xám đậm)
};

/**
 * Hàm hỗ trợ lấy màu sắc trạng thái, có fallback an toàn
 */
export function getInvoiceStatusTextClassColor(status: InvoiceStatus): string {
	return INVOICE_STATUS_TEXT_CLASSES_COLOR[status] ?? 'text-slate-600 font-medium';
}
