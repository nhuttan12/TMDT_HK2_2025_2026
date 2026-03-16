'use client';

import { JSX } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ban, ChevronDown, ChevronUp, MoreHorizontal, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/date';
import { UserListAdmin } from '@/types/users/admin/UserListAdmin';
import { UserAdminSortField } from '@/types/users/admin/UserAdminSort';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useTableSort } from '@/hooks/use-table-sort';
import { getUserRoleLabel } from '@/types/users/UserRole';
import UserStatusBadge from '@/components/user/admin/user-status-badge';
import UserAdminTable from '@/app/admin/users/_components/user-admin-table';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';

interface Props {
	users: UserListAdmin[];
	mode: 'customer' | 'staff';
}

export default function UserAdminClient({ users, mode }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<UserAdminSortField>();

	const handleRedirectToStaffInfoViewMode = (userID: number) => {
		router.push(`/admin/users/staff/${userID}`);
	};

	const handleRedirectToEditStaffEditMode = (userID: number) => {
		router.push(`/admin/users/staff/update/${userID}`);
	};

	const title = mode === 'customer' ? 'Quản lý khách hàng' : 'Quản lý nhân viên';

	const handleRedirectToAddNewUser = () => {
		router.push(`/admin/${mode}/add-new`);
	};

	return (
		<div className='space-y-4'>
			{/* Header */}
			<AdminTableHeader
				title={title}
				description={`Quản lý toàn bộ ${mode === 'customer' ? 'khách hàng' : 'nhân viên'} trong hệ thống`}
				searchPlaceholder='Tìm người dùng...'
				onAdd={mode === 'staff' ? handleRedirectToAddNewUser : undefined}
				addLabel={mode === 'staff' ? '+ Thêm mới' : undefined}
			/>

			{/* Table */}
			<div className='rounded-xl border bg-white'>
				<UserAdminTable
					users={users}
					handleSort={handleSort}
					renderSortIcon={renderSortIcon}
					onView={handleRedirectToStaffInfoViewMode}
					onEdit={handleRedirectToEditStaffEditMode}
				/>
			</div>
		</div>
	);
}
