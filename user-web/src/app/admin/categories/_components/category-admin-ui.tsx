import { JSX } from 'react';
import Image from 'next/image';
import { CategoryListItemAdmin } from '@/types/categories/admin/CategoryListItemAdmin';
import { FilterField } from '@/types/uis/FilterField';
import { CategoryAdminFilterValues } from '@/types/categories/admin/CategoryAdminFilterValues';
import { Column } from '@/types/uis/Column';

// UI Components
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import Pagination from '@/components/layout/share/pagination';
import { DataTable } from '@/components/layout/admin/data-table';
import { Badge } from '@/components/ui/badge';
import CategoryStatusBadge from '@/app/admin/categories/_components/category-status-badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { CategoryAdminLogicReturn } from '@/hooks/categories/admin/use-category-admin-logic';

interface CategoryAdminUiProps extends CategoryAdminLogicReturn {
	categories: CategoryListItemAdmin[];
	isLoading: boolean;
}

// Cấu hình Filter Tĩnh
const categoryFilterSchema: FilterField<CategoryAdminFilterValues>[] = [
	{
		key: 'name',
		label: 'Tên danh mục',
		type: 'text',
		gridSpan: 1,
		placeholder: 'Tìm theo tên danh mục',
	},
	{ key: 'slug', label: 'Slug', type: 'text', gridSpan: 2, placeholder: 'Tìm theo slug' },
	{ key: 'productCountMin', label: 'Số sản phẩm từ', type: 'number', gridSpan: 1 },
	{ key: 'productCountMax', label: 'Số sản phẩm đến', type: 'number', gridSpan: 1 },
	{
		key: 'status',
		label: 'Trạng thái',
		type: 'select',
		gridSpan: 2,
		options: [
			{ label: 'Tất cả', value: 'ALL' },
			{ label: 'Hoạt động', value: 'true' },
			{ label: 'Không hoạt động', value: 'false' },
		],
	},
	{ key: 'createdFrom', label: 'Từ ngày tạo', type: 'date', gridSpan: 1 },
	{ key: 'createdTo', label: 'Đến ngày tạo', type: 'date', gridSpan: 1 },
	{ key: 'updatedFrom', label: 'Từ ngày cập nhật', type: 'date', gridSpan: 1 },
	{ key: 'updatedTo', label: 'Đến ngày cập nhật', type: 'date', gridSpan: 1 },
];

function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('vi-VN');
}

export function CategoryAdminUi({
	categories,
	isLoading,
	handleRedirectToAddNew,
	handleRedirectToView,
	handleRedirectToEdit,
	handleSort,
	renderSortIcon,
	pagination,
	selection,
}: CategoryAdminUiProps): JSX.Element {
	// Cấu hình Cột động (nhận các hàm logic từ props)
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
			render: (row) => (
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
			render: (row) => <span className='text-muted-foreground'>/{row.slug}</span>,
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
			render: (row) =>
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
			render: (row) => <CategoryStatusBadge status={row.status} />,
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
			render: (row) => (
				<span className='text-muted-foreground'>{formatDate(row.createdAt)}</span>
			),
		},
		{
			key: 'actions',
			header: <span className='text-right block'>Hành động</span>,
			render: (row) => (
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
							<DropdownMenuItem onClick={() => handleRedirectToEdit(row.id)}>
								<Pencil
									size={14}
									className='mr-2'
								/>{' '}
								Chỉnh sửa
							</DropdownMenuItem>
							<DropdownMenuItem className='text-red-500'>
								<Trash
									size={14}
									className='mr-2'
								/>{' '}
								Xóa
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			),
		},
	];

	return (
		<div className='space-y-4'>
			<AdminTableHeader<CategoryAdminFilterValues>
				title='Quản lý danh mục'
				description='Quản lý toàn bộ danh mục sản phẩm trong hệ thống'
				searchPlaceholder='Tìm danh mục...'
				searchKey='name'
				addLabel='+ Thêm danh mục'
				onAdd={handleRedirectToAddNew}
				filter
				filterField={categoryFilterSchema}
			/>

			<div className='rounded-xl border bg-white relative'>
				{isLoading && (
					<div className='absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center'>
						<span className='text-slate-500 font-medium'>Đang tải dữ liệu...</span>
					</div>
				)}
				<DataTable
					data={categories}
					columns={columns}
					onRowClick={(row) => handleRedirectToView(row.id)}
					getRowKey={(row) => row.id}
					selectable={{
						selected: selection.selected,
						onToggle: selection.toggle,
						onToggleAll: selection.toggleAll,
						isAllSelected: selection.isAllSelected,
						isIndeterminate: selection.isIndeterminate,
					}}
				/>
			</div>

			{!isLoading && (
				<Pagination
					currentPage={pagination.currentPage}
					totalPages={10} // TODO: Lấy từ API Meta
					onPageChange={pagination.changePage}
				/>
			)}
		</div>
	);
}
