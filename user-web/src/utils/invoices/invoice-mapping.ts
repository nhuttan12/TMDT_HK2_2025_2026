import { InvoiceStatus } from "@/types/invoices/user/InvoiceStatus";

export const mapBackendInvoiceStatus = (backendStatus?: string): InvoiceStatus => {
	// Kiểm tra nếu giá trị null hoặc undefined
	if (!backendStatus) return 'unknown';

	// Chuẩn hóa chuỗi về chữ thường và cắt khoảng trắng thừa
	const normalizedStatus = backendStatus.trim().toLowerCase();

	switch (normalizedStatus) {
		case 'pending':
			return 'pending';
		case 'processing':
			return 'processing';
		case 'completed':
			return 'completed';
		case 'cancelled':
			return 'cancelled';
		case 'returned':
			return 'returned';
		case 'unknown':
		default:
			return 'unknown'; // Fallback an toàn cho các chuỗi lạ không xác định
	}
};