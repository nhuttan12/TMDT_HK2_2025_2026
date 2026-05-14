import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserInvoice } from '@/types/invoices/user/UserInvoice';
import { getUserInvoiceList } from '@/services/invoices/admin/invoice-admin-servie';

export function useUserInvoiceListQuery(initialData: UserInvoice[]): UseQueryResult<UserInvoice[]> {
	return useQuery({
		queryKey: ['user-invoice-list'],
		queryFn: getUserInvoiceList,
		initialData: initialData,
	});
}
