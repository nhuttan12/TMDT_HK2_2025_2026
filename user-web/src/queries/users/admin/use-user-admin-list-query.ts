import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CustomerListAdmin } from '@/types/users/admin/CustomerListAdmin';
import { getCustomerList } from '@/services/users/admin/user-service';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { PaginationRequest } from '@/types/shared/PaginationRequest';

export function useUserAdminListQuery(
	initialData: PaginationResponse<CustomerListAdmin>,
	request?: PaginationRequest,
): UseQueryResult<PaginationResponse<CustomerListAdmin>> {
	return useQuery({
		queryKey: ['user-admin-list'],
		queryFn: () => getCustomerList({ page: request?.page, limit: request?.limit }),
		initialData: initialData,
	});
}
