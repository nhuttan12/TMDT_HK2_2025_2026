import React, { JSX } from 'react';
import { Role } from '@/types/users/admin/Role';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';

interface Props {
	roles: Role[];
	onView: (roleNName: string) => void;
	onEdit: (roleNName: string) => void;
}

export default function RoleTable({ roles, onView, onEdit }: Props): JSX.Element {
	const columns: Column<Role>[] = [
		{
			key: 'name',
			header: 'Tên quyền',
			render: (row: Role): JSX.Element => <span className='font-medium'>{row.name}</span>,
		},
		{
			key: 'description',
			header: 'Mô tả',
			render: (row: Role): JSX.Element => (
				<span className='text-muted-foreground'>{row.description}</span>
			),
		},
		{
			key: 'isActive',
			header: 'Trạng thái',
			render: (row: Role): JSX.Element =>
				row.isActive ? (
					<Badge>Hoạt động</Badge>
				) : (
					<Badge variant='secondary'>Tạm khóa</Badge>
				),
		},
		{
			key: 'actions',
			header: <span className='text-right block'>Hành động</span>,
			render: (row: Role): JSX.Element => (
				<div
					className='text-right'
					onClick={(e: React.MouseEvent<HTMLDivElement>): void => e.stopPropagation()}
				>
					<Button
						className='cursor-pointer'
						onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
							e.stopPropagation();
							onEdit(row.name);
						}}
					>
						<Pencil
							size={14}
							className='mr-2'
						/>
						Chỉnh sửa
					</Button>
				</div>
			),
		},
	];

	return (
		<DataTable
			data={roles}
			columns={columns}
			onRowClick={(row: Role): void => onView(row.name)}
			getRowKey={(row: Role): number => row.id}
		/>
	);
}
