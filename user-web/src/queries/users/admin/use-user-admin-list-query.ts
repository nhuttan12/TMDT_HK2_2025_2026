import { apiClient } from '@/lib/api-client';
import { UserAdminService } from '@/services/users/admin/user-service';
import { PaginationParams } from '@/types/common/Pagination';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { CustomerListAdmin } from '@/types/users/admin/CustomerListAdmin';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export function useUserAdminListQuery(
	initialData: BackendPagedResult<CustomerListAdmin>,
	request?: PaginationParams,
): UseQueryResult<BackendPagedResult<CustomerListAdmin>> {
	const userAdminService = new UserAdminService(apiClient);

	return useQuery({
		queryKey: ['user-admin-list', request?.pageNumber, request?.pageSize],
		queryFn: () =>
			userAdminService.getCustomerList({
				pageNumber: request?.pageNumber,
				pageSize: request?.pageSize,
			}),
		initialData: initialData,
	});
}
