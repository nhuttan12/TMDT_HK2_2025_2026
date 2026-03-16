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

interface Props {
	users: UserListAdmin[];
	mode: 'customer' | 'staff';
}

export default function UserAdminTable({ users, mode }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const { sortField, sortOrder, handleSort } = useTableSort<UserAdminSortField>();

	const renderSortIcon = (field: UserAdminSortField) => {
		if (sortField !== field) return null;

		if (sortOrder === 'asc')
			return (
				<ChevronUp
					size={14}
					className='ml-1'
				/>
			);

		if (sortOrder === 'desc')
			return (
				<ChevronDown
					size={14}
					className='ml-1'
				/>
			);

		return null;
	};

	const handleRedirectToStaffInfoViewMode = (userID: number) => {
		router.push(`/admin/users/staff/${userID}`);
	};

	const handleRedirectToEditStaffEditMode = (userID: number) => {
		router.push(`/admin/users/staff/update/${userID}`);
	};

	const title = mode === 'customer' ? 'Quản lý khách hàng' : 'Quản lý nhân viên';

	return (
		<div className='space-y-4'>
			{/* Header */}
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold'>{title}</h1>
					<p className='text-sm text-muted-foreground'>
						Quản lý toàn bộ người dùng trong hệ thống
					</p>
				</div>

				{mode === 'staff' && (
					<Button onClick={() => router.push(`/admin/${mode}/add-new`)}>
						+ Thêm mới
					</Button>
				)}
			</div>

			{/* Search */}
			<Input
				placeholder='Tìm người dùng...'
				className='max-w-sm'
			/>

			{/* Table */}
			<div className='rounded-xl border bg-white'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								onClick={() => handleSort('fullName')}
								className='cursor-pointer'
							>
								<div className='flex items-center gap-1'>
									<span>Họ tên</span>
									{renderSortIcon('fullName')}
								</div>
							</TableHead>

							<TableHead
								onClick={() => handleSort('email')}
								className='cursor-pointer'
							>
								<div className='flex items-center gap-1'>
									<span>Email</span>
									{renderSortIcon('email')}
								</div>
							</TableHead>

							<TableHead>SĐT</TableHead>

							<TableHead
								onClick={() => handleSort('role')}
								className='cursor-pointer'
							>
								<div className='flex items-center gap-1'>
									<span>Vai trò</span>
									{renderSortIcon('role')}
								</div>
							</TableHead>

							<TableHead
								onClick={() => handleSort('isActive')}
								className='cursor-pointer'
							>
								<div className='flex items-center gap-1'>
									<span>Trạng thái</span>
									{renderSortIcon('isActive')}
								</div>
							</TableHead>

							<TableHead
								onClick={() => handleSort('createdAt')}
								className='cursor-pointer'
							>
								<div className='flex items-center gap-1'>
									<span>Ngày tạo</span>
									{renderSortIcon('createdAt')}
								</div>
							</TableHead>

							<TableHead className='text-right'>Hành động</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{users.map((user) => (
							<TableRow
								key={user.userID}
								className='cursor-pointer'
								onClick={(): void => handleRedirectToStaffInfoViewMode(user.userID)}
							>
								<TableCell>
									<div className='flex items-center gap-3'>
										<div className='relative w-10 h-10 rounded-full overflow-hidden border'>
											<Image
												src={user.avatar}
												alt={user.fullName}
												fill
												className='object-cover'
											/>
										</div>
										<span className='font-medium'>{user.fullName}</span>
									</div>
								</TableCell>

								<TableCell className='text-muted-foreground'>
									{user.email}
								</TableCell>

								<TableCell>{user.phone}</TableCell>

								<TableCell>
									<Badge variant='secondary'>{getUserRoleLabel(user.role)}</Badge>
								</TableCell>

								<TableCell>
									<UserStatusBadge status={user.status} />
								</TableCell>

								<TableCell className='text-muted-foreground'>
									{formatDate(user.createdAt)}
								</TableCell>

								<TableCell className='text-right'>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant='ghost'
												size='icon'
												className='cursor-pointer'
											>
												<MoreHorizontal size={16} />
											</Button>
										</DropdownMenuTrigger>

										<DropdownMenuContent align='end'>
											<DropdownMenuItem
												onClick={(e): void => {
													e.stopPropagation();
													handleRedirectToEditStaffEditMode(user.userID);
												}}
											>
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
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
