import { JSX } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import UserStatusBadge from '@/app/admin/users/_components/user-status-badge';
import { formatDate } from '@/utils/shared/date';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Ban, MoreHorizontal, Pencil } from 'lucide-react';
import { CustomerListAdmin } from '@/types/users/admin/CustomerListAdmin';
import { UserAdminSortField } from '@/types/users/admin/UserAdminSort';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';
import { useTableSelection } from '@/hooks/share/use-table-selection';
import { getUserRoleLabel } from '@/utils/users/user-role-label';

interface Props {
	users: CustomerListAdmin[];
	handleSort: (field: UserAdminSortField) => void;
	renderSortIcon: (field: UserAdminSortField) => JSX.Element | null;

	onView: (id: string) => void;
	onEdit: (id: string) => void;
}

export default function UserAdminTable({
	users,
	handleSort,
	renderSortIcon,
	onView,
	onEdit,
}: Props): JSX.Element {
	const allKeys: string[] = users.map((p: CustomerListAdmin): string => p.id);

	const { selected, onToggle, onToggleAll, isAllSelected, isIndeterminate } =
		useTableSelection<string>(allKeys);

	const columns: Column<CustomerListAdmin>[] = [
		{
			key: 'fullName',
			header: (
				<div
					className='flex items-center gap-1 cursor-pointer'
					onClick={() => handleSort('fullName')}
				>
					<span>Họ tên</span>
					{renderSortIcon('fullName')}
				</div>
			),
			render: (row: CustomerListAdmin): JSX.Element => (
				<div className='flex items-center gap-3'>
					<div className='relative w-10 h-10 rounded-full overflow-hidden border'>
						<Image
							src={row.avatar}
							alt={row.fullName}
							fill
							className='object-cover'
						/>
					</div>
					<span className='font-medium'>{row.fullName}</span>
				</div>
			),
		},
		{
			key: 'email',
			header: (
				<div
					className='flex items-center gap-1 cursor-pointer'
					onClick={() => handleSort('email')}
				>
					<span>Email</span>
					{renderSortIcon('email')}
				</div>
			),
			render: (row: CustomerListAdmin): JSX.Element => (
				<span className='text-muted-foreground'>{row.email}</span>
			),
		},
		{
			key: 'phone',
			header: <span>SĐT</span>,
		},
		{
			key: 'role',
			header: (
				<div
					className='flex items-center gap-1 cursor-pointer'
					onClick={() => handleSort('role')}
				>
					<span>Vai trò</span>
					{renderSortIcon('role')}
				</div>
			),
			render: (row: CustomerListAdmin): JSX.Element => (
				<Badge variant='secondary'>{getUserRoleLabel(row.role)}</Badge>
			),
		},
		{
			key: 'status',
			header: (
				<div
					className='flex items-center gap-1 cursor-pointer'
					onClick={() => handleSort('isActive')}
				>
					<span>Trạng thái</span>
					{renderSortIcon('isActive')}
				</div>
			),
			render: (row: CustomerListAdmin): JSX.Element => (
				<UserStatusBadge status={row.status} />
			),
		},
		{
			key: 'createdAt',
			header: (
				<div
					className='flex items-center gap-1 cursor-pointer'
					onClick={() => handleSort('createdAt')}
				>
					<span>Ngày tạo</span>
					{renderSortIcon('createdAt')}
				</div>
			),
			render: (row: CustomerListAdmin): JSX.Element => (
				<span className='text-muted-foreground'>{formatDate(row.createdAt)}</span>
			),
		},
		{
			key: 'actions',
			header: <span className='text-right block'>Hành động</span>,
			render: (row: CustomerListAdmin): JSX.Element => (
				<div
					className='text-right'
					onClick={(e) => e.stopPropagation()}
				>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
							>
								<MoreHorizontal size={16} />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align='end'>
							<DropdownMenuItem onClick={() => onEdit(row.id)}>
								<Pencil
									size={14}
									className='mr-2'
								/>
								Chỉnh sửa
							</DropdownMenuItem>

							<DropdownMenuItem className='text-red-500'>
								<Ban
									size={14}
									className='mr-2'
								/>
								Cấm tài khoản
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			),
		},
	];

	return (
		<DataTable
			data={users}
			columns={columns}
			onRowClick={(row: CustomerListAdmin): void => onView(row.id)}
			getRowKey={(row: CustomerListAdmin): string => row.id}
			selectable={{
				selected: selected,
				onToggle: onToggle,
				onToggleAll: onToggleAll,
				isAllSelected,
				isIndeterminate,
			}}
		/>
	);
}
