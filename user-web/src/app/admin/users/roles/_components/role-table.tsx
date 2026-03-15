'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Pencil } from 'lucide-react';
import { Role } from '@/types/users/admin/Role';
import { JSX, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Input } from '@/components/ui/input';

interface Props {
	roles: Role[];
}

export default function RoleTable({ roles }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const handleRedirectToRolePermissionViewMode = (
		e: MouseEvent<HTMLTableRowElement>,
		roleNName: string,
	) => {
		e.stopPropagation();
		router.push(`/admin/users/roles/${roleNName.toLowerCase()}/permission`);
	};

	const handleRedirectToRolePermissionEditMode = (
		e: MouseEvent<HTMLButtonElement>,
		roleNName: string,
	) => {
		e.stopPropagation();
		router.push(`/admin/users/roles/${roleNName.toLowerCase()}/permission/edit`);
	};

	return (
		<div className='space-y-4'>
			<div className='space-y-4 flex w-full space-between'>
				<div>
					<h1 className='text-2xl font-bold'>Danh sách chức vụ</h1>
					<p className='text-sm text-muted-foreground'>
						Thông tin của toàn bộ chức vụ hiện tại trong công ty.
					</p>
				</div>
			</div>

			<div className='border rounded-lg'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tên quyền</TableHead>
							<TableHead>Mô tả</TableHead>
							<TableHead>Trạng thái</TableHead>
							<TableHead className='text-right'>Hành động</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{roles.map(
							(role: Role): JSX.Element => (
								<TableRow
									className='cursor-pointer'
									key={role.roleID}
									onClick={(e) =>
										handleRedirectToRolePermissionViewMode(e, role.name)
									}
								>
									<TableCell className='font-medium'>{role.name}</TableCell>

									<TableCell className='text-muted-foreground'>
										{role.description}
									</TableCell>

									<TableCell>
										{role.isActive ? (
											<Badge>Hoạt động</Badge>
										) : (
											<Badge variant='secondary'>Tạm khóa</Badge>
										)}
									</TableCell>

									<TableCell className='text-right'>
										<Button
											className='cursor-pointer'
											onClick={(e) =>
												handleRedirectToRolePermissionEditMode(e, role.name)
											}
										>
											<Pencil
												size={14}
												className='mr-2'
											/>
											Chỉnh sửa
										</Button>
									</TableCell>
								</TableRow>
							),
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
