'use client';

import { JSX } from 'react';
import { CustomerListAdmin } from '@/types/users/admin/CustomerListAdmin';
import { useUserAdminLogic } from '@/hooks/users/admin/use-user-admin-logic';
import UserAdminUi from './user-admin-ui';
import { useUserAdminListQuery } from '@/queries/users/admin/use-user-admin-list-query';
import { PaginationResponse } from '@/types/shared/PaginationResponse';

interface Props {
	initialUsers: PaginationResponse<CustomerListAdmin>;
}

export default function UserAdminContainer({ initialUsers }: Props) {
	// 1. Data Fetching
	const { data } = useUserAdminListQuery(initialUsers);

    const currentUsers = data?.data ?? initialUsers.data;
    const currentMeta = data?.meta ?? initialUsers.meta;

	// 2. Logic Hook
	const logic = useUserAdminLogic(currentMeta.totalPages);

	// 3. Render
	return (
		<UserAdminUi
			users={currentUsers}
			{...logic}
		/>
	);
}
