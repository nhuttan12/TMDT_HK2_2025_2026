import { JSX } from 'react';
import { CustomerListAdmin } from '@/types/users/admin/CustomerListAdmin';
import { UseUserAdminLogicReturn } from '@/hooks/users/admin/use-user-admin-logic';

import UserAdminTable from '@/app/admin/users/_components/user-admin-table';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import Pagination from '@/components/layout/share/pagination';

interface Props extends UseUserAdminLogicReturn {
	users: CustomerListAdmin[];
}

export default function UserAdminUi({
	users,
	currentPage,
    totalPages,
	changePage,
	handleSort,
	renderSortIcon,
	handleRedirectToCustomerInfoViewMode,
	handleRedirectToEditCustomerEditMode,
}: Props): JSX.Element {
	return (
		<div className='space-y-4'>
			{/* Header */}
			<AdminTableHeader
				title='Quản lý khách hàng'
				description='Quản lý toàn bộ khách hàng trong hệ thống'
				searchPlaceholder='Tìm khách hàng...'
			/>

			{/* Table */}
			<div className='rounded-xl border bg-white'>
				<UserAdminTable
					users={users}
					handleSort={handleSort}
					renderSortIcon={renderSortIcon}
					onView={handleRedirectToCustomerInfoViewMode}
					onEdit={handleRedirectToEditCustomerEditMode}
				/>
			</div>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={changePage}
			/>
		</div>
	);
}
