'use client';

import { useUserAdminLogic } from '@/hooks/users/admin/use-user-admin-logic';
import { useUserAdminListQuery } from '@/queries/users/admin/use-user-admin-list-query';
import { BackendPagedResult } from '@/types/products/user/productBE';
import { CustomerListAdmin } from '@/types/users/admin/CustomerListAdmin';
import UserAdminUi from './user-admin-ui';

interface Props {
	initialUsers: BackendPagedResult<CustomerListAdmin>;
}

export default function UserAdminContainer({ initialUsers }: Props) {
	// 1. Data Fetching
	const { data } = useUserAdminListQuery(initialUsers);

    const currentUsers = data?.items ?? initialUsers.items;

	// 2. Logic Hook
	const logic = useUserAdminLogic(data?.totalPages ?? initialUsers.totalPages);

	// 3. Render
	return (
		<UserAdminUi
			users={currentUsers}
			{...logic}
		/>
	);
}
