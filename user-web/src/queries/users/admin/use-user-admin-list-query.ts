import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CustomerListAdmin } from '@/types/users/admin/CustomerListAdmin';
import { getCustomerList } from '@/services/users/admin/user-service';

export function useUserAdminListQuery(
	initialData: CustomerListAdmin[],
): UseQueryResult<CustomerListAdmin[]> {
	return useQuery({
		queryKey: ['user-admin-list'],
		queryFn: (): Promise<CustomerListAdmin[]> => getCustomerList(),
		initialData: initialData,
	});
}
