import { JSX } from 'react';
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
import { getUserRoleLabel } from '@/types/users/UserRole';
import UserStatusBadge from '@/components/user/admin/user-status-badge';
import { formatDate } from '@/utils/date';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Ban, MoreHorizontal, Pencil } from 'lucide-react';
import { UserListAdmin } from '@/types/users/admin/UserListAdmin';
import { UserAdminSortField } from '@/types/users/admin/UserAdminSort';

interface Props {
	users: UserListAdmin[];
	handleSort: (field: UserAdminSortField) => void;
	renderSortIcon: (field: UserAdminSortField) => JSX.Element | null;

	onView: (id: number) => void;
	onEdit: (id: number) => void;
}

export default function UserAdminTable({
	users,
	handleSort,
	renderSortIcon,
	onView,
	onEdit,
}: Props): JSX.Element {
	return (
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
						onClick={(): void => onView(user.userID)}
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

						<TableCell className='text-muted-foreground'>{user.email}</TableCell>

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
											onEdit(user.userID);
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
	);
}
