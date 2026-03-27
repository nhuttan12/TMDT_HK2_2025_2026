import { JSX, useMemo, useState } from 'react';
import { CategoryListItemAdmin } from '@/types/categories/admin/CategoryListItemAdmin';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CategoryAdminSortField } from '@/types/categories/admin/CategoryAdminSort';
import CategoryStatusBadge from '@/app/admin/categories/_components/category-status-badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';
import { useTableSelection } from '@/hooks/use-table-selection';

interface Props {
	categories: CategoryListItemAdmin[];
	handleSort: (field: CategoryAdminSortField) => void;
	renderSortIcon: (field: CategoryAdminSortField) => JSX.Element | null;

	onView: (id: number) => void;
	onEdit: (id: number) => void;
}

export default function CategoryAdminTable({
	categories,
	handleSort,
	renderSortIcon,
	onView,
	onEdit,
}: Props): JSX.Element {
	const allKeys: number[] = categories.map((c: CategoryListItemAdmin): number => c.id);

	const {
		selected,
		toggle,
		toggleAll,
		isAllSelected,
		isIndeterminate,
	} = useTableSelection<number>(allKeys);

	const columns: Column<CategoryListItemAdmin>[] = [
		{
			key: 'name',
			header: (
				<div className='flex items-center gap-1'>
					<span>Tên danh mục</span>
					{renderSortIcon('name')}
				</div>
			),
			onHeaderClick: () => handleSort('name'),
			render: (row: CategoryListItemAdmin): JSX.Element => (
				<div className='flex items-center gap-3'>
					<div className='relative w-12 h-12 rounded-md overflow-hidden border'>
						<Image
							src={row.image}
							alt={row.name}
							fill
							className='object-cover'
						/>
					</div>
					<span className='font-medium'>{row.name}</span>
				</div>
			),
		},
		{
			key: 'slug',
			header: (
				<div className='flex items-center gap-1'>
					<span>Slug</span>
					{renderSortIcon('slug')}
				</div>
			),
			onHeaderClick: () => handleSort('slug'),
			render: (row: CategoryListItemAdmin): JSX.Element => (
				<span className='text-muted-foreground'>/{row.slug}</span>
			),
		},
		{
			key: 'productCount',
			header: (
				<div className='flex items-center gap-1'>
					<span>Số sản phẩm</span>
					{renderSortIcon('productCount')}
				</div>
			),
			onHeaderClick: () => handleSort('productCount'),
			render: (row: CategoryListItemAdmin): JSX.Element =>
				row.productCount > 0 ? (
					<span>{row.productCount}</span>
				) : (
					<Badge variant='secondary'>0 sản phẩm</Badge>
				),
		},
		{
			key: 'status',
			header: (
				<div className='flex items-center gap-1'>
					<span>Trạng thái</span>
					{renderSortIcon('status')}
				</div>
			),
			onHeaderClick: () => handleSort('status'),
			render: (row: CategoryListItemAdmin): JSX.Element => (
				<CategoryStatusBadge status={row.status} />
			),
		},
		{
			key: 'createdAt',
			header: (
				<div className='flex items-center gap-1'>
					<span>Ngày tạo</span>
					{renderSortIcon('createdAt')}
				</div>
			),
			onHeaderClick: () => handleSort('createdAt'),
			render: (row: CategoryListItemAdmin): JSX.Element => (
				<span className='text-muted-foreground'>{row.createdAt}</span>
			),
		},
		{
			key: 'updatedAt',
			header: (
				<div className='flex items-center gap-1'>
					<span>Ngày cập nhật</span>
					{renderSortIcon('updatedAt')}
				</div>
			),
			onHeaderClick: () => handleSort('updatedAt'),
			render: (row: CategoryListItemAdmin): JSX.Element => (
				<span className='text-muted-foreground'>{row.updatedAt}</span>
			),
		},
		{
			key: 'actions',
			header: <span className='text-right block'>Hành động</span>,
			render: (row: CategoryListItemAdmin): JSX.Element => (
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
								<Trash
									size={14}
									className='mr-2'
								/>
								Xóa
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			),
		},
	];

	return (
		<DataTable
			data={categories}
			columns={columns}
			onRowClick={(row: CategoryListItemAdmin): void => onView(row.id)}
			getRowKey={(row: CategoryListItemAdmin): number => row.id}
			selectable={{
				selected: selected,
				onToggle: toggle,
				onToggleAll: toggleAll,
				isAllSelected,
				isIndeterminate,
			}}
		/>
	);
}
