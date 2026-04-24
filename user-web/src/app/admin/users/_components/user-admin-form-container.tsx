'use client';

import { JSX } from 'react';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { UserDetailInfoAdmin } from '@/types/users/admin/UserDetailInfoAdmin';

import { useUserDetailAdminQuery } from '@/queries/users/admin/use-user-detail-admin-query';
import { useUserAdminFormLogic } from '@/hooks/users/admin/use-user-admin-form-logic';
import UserAdminFormUi from './user-admin-form-ui';

interface Props {
	userId?: number;
	formType: AdminFormType;
	initialData: UserDetailInfoAdmin;
}

export default function UserAdminFormContainer({
	userId,
	formType,
	initialData,
}: Props): JSX.Element {
	const queryId: number = userId || 0;

	// 1. Data Query (Sẽ skip API nếu queryId = 0)
	const { data: userData } = useUserDetailAdminQuery(queryId, initialData);

	// 2. Logic Hook
	const logic = useUserAdminFormLogic({
		initialData: userData ?? initialData,
		formType: formType,
	});

	// 3. Render
	return <UserAdminFormUi {...logic} />;
}
