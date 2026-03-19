'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { UserListAdmin } from '@/types/users/admin/UserListAdmin';
import { UserAdminSortField } from '@/types/users/admin/UserAdminSort';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useTableSort } from '@/hooks/use-table-sort';
import UserAdminTable from '@/app/admin/users/_components/user-admin-table';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import Pagination from '@/components/layout/share/pagination';
import { usePagination } from '@/hooks/use-pagination';

interface Props {
	users: UserListAdmin[];
	mode: 'customers' | 'staffs';
}

export default function UserAdminClient({ users, mode }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<UserAdminSortField>();
	const { currentPage, changePage } = usePagination();

	const handleRedirectToStaffsInfoViewMode = (userID: number) => {
		router.push(`/admin/users/${mode}/${userID}`);
	};

	const handleRedirectToEditStaffsEditMode = (userID: number) => {
		router.push(`/admin/users/${mode}/update/${userID}`);
	};

	const title = mode === 'customers' ? 'Quản lý khách hàng' : 'Quản lý nhân viên';

	const handleRedirectToAddNewUser = () => {
		router.push(`/admin/${mode}/add-new`);
	};

	return (
		<div className='space-y-4'>
			{/* Header */}
			<AdminTableHeader
				title={title}
				description={`Quản lý toàn bộ ${mode === 'customers' ? 'khách hàng' : 'nhân viên'} trong hệ thống`}
				searchPlaceholder='Tìm người dùng...'
				onAdd={mode === 'staffs' ? handleRedirectToAddNewUser : undefined}
				addLabel={mode === 'staffs' ? '+ Thêm mới' : undefined}
			/>

			{/* Table */}
			<div className='rounded-xl border bg-white'>
				<UserAdminTable
					users={users}
					handleSort={handleSort}
					renderSortIcon={renderSortIcon}
					onView={handleRedirectToStaffsInfoViewMode}
					onEdit={handleRedirectToEditStaffsEditMode}
				/>
			</div>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalPages={10}
				onPageChange={changePage}
			/>
		</div>
	);
}
