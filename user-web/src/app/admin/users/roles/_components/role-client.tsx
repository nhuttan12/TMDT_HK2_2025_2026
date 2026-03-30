'use client';

import { Role } from '@/types/users/admin/Role';
import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import RoleTable from '@/app/admin/users/roles/_components/role-table';

interface Props {
	roles: Role[];
}

export default function RoleClient({ roles }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const handleRedirectToRolePermissionViewMode = (roleName: string) => {
		router.push(`/admin/users/roles/${roleName.toLowerCase()}/permission`);
	};

	const handleRedirectToRolePermissionEditMode = (roleNName: string) => {
		router.push(`/admin/users/roles/${roleNName.toLowerCase()}/permission/edit`);
	};

	return (
		<div className='space-y-4'>
			<AdminTableHeader
				title='Danh sách chức vụ'
				description='Thông tin của toàn bộ chức vụ hiện tại trong công ty'
			/>

			<div className='border rounded-lg'>
				<RoleTable
					roles={roles}
					onView={handleRedirectToRolePermissionViewMode}
					onEdit={handleRedirectToRolePermissionEditMode}
				/>
			</div>
		</div>
	);
}
