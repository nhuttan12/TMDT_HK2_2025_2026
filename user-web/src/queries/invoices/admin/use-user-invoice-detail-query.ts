import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import { getUserInvoiceDetailByInvoiceId } from '@/services/invoices/admin/invoice-admin-servie';

/**
 * Hook quản lý server state cho chi tiết hóa đơn
 * Tên file: use-user-invoice-detail-query.ts (kebab-case + kết thúc bằng query)
 */
export function useUserInvoiceDetailQuery(
	invoiceId: number,
	initialData?: InvoiceDetail,
): UseQueryResult<InvoiceDetail> {
	return useQuery({
		queryKey: ['user-invoice-detail', invoiceId],
		queryFn: (): Promise<InvoiceDetail> => getUserInvoiceDetailByInvoiceId(invoiceId),
		initialData: initialData,
		enabled: !!invoiceId, // Chỉ chạy khi có ID hợp lệ
	});
}
