'use client';

import { JSX } from 'react';
import { CustomerListAdmin } from '@/types/users/admin/CustomerListAdmin';
import { useUserAdminLogic } from '@/hooks/users/admin/use-user-admin-logic';
import UserAdminUi from './user-admin-ui';
import { useUserAdminListQuery } from '@/queries/users/admin/use-user-admin-list-query';

interface Props {
	initialUsers: CustomerListAdmin[];
}

export default function UserAdminContainer({ initialUsers }: Props): JSX.Element {
	// 1. Data Fetching
	const { data: users } = useUserAdminListQuery(initialUsers);

	// 2. Logic Hook
	const logic = useUserAdminLogic();

	// 3. Render
	return (
		<UserAdminUi
			users={users ?? initialUsers}
			{...logic}
		/>
	);
}
