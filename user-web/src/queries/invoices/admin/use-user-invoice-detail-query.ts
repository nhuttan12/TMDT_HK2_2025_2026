import { apiClient } from '@/lib/api-client';
import {
    InvoiceAdminService
} from '@/services/invoices/admin/invoice-admin-service';
import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

/**
 * Hook quản lý server state cho chi tiết hóa đơn
 * Tên file: use-user-invoice-detail-query.ts (kebab-case + kết thúc bằng query)
 */
export function useUserInvoiceDetailQuery(
	invoiceId: string,
	initialData?: InvoiceDetail,
): UseQueryResult<InvoiceDetail> {
	const invoiceAdminService = new InvoiceAdminService(apiClient);

	return useQuery({
		queryKey: ['admin-invoice-detail', invoiceId],
		queryFn: (): Promise<InvoiceDetail> =>
			invoiceAdminService.getUserInvoiceDetailByInvoiceId(invoiceId),
		initialData: initialData,
		enabled: !!invoiceId, // Chỉ chạy khi có ID hợp lệ
	});
}
