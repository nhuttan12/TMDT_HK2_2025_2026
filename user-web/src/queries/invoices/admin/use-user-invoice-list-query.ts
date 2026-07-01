import { apiClient } from '@/lib/api-client';
import {
    InvoiceAdminService
} from '@/services/invoices/admin/invoice-admin-service';
import { PaginationParams } from '@/types/common/Pagination';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useUserInvoiceListQuery(
	initialData: BackendPagedResult<UserInvoice>,
	pagination?: PaginationParams,
): UseQueryResult<BackendPagedResult<UserInvoice>> {
	const invoiceAdminService = new InvoiceAdminService(apiClient);

	return useQuery({
		queryKey: ['admin-invoice-list'],
		queryFn: () =>
			invoiceAdminService.getUserInvoiceList({
				pageNumber: pagination?.pageNumber,
				pageSize: pagination?.pageSize,
			}),
		initialData: initialData,
	});
}
