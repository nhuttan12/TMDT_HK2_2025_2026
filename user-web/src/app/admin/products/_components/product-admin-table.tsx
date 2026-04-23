import { JSX } from 'react';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import Image from 'next/image';
import ProductStatusBadge from '@/app/admin/products/[productId]/_components/product-status-badge';
import { formatDate } from '@/utils/shared/date';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { ProductAdminSortField } from '@/types/products/admin/ProductAdminSort';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';
import {
	useProductAdminTableLogic,
	UseProductAdminTableLogicReturn,
} from '@/hooks/products/admin/use-product-admin-table-logic';
import { StatusModal } from '@/components/layout/share/status-modal';
import { MODAL_TITLE_MAP } from '@/utils/shared/mappers/modalTitleMap';

interface Props {
	products: ProductListInfoAdmin[];
	handleSort: (field: ProductAdminSortField) => void;
	renderSortIcon: (field: ProductAdminSortField) => JSX.Element | null;
	onView: (id: number) => void;
	onEdit: (id: number) => void;
}

export default function ProductAdminTable({
	products,
	handleSort,
	renderSortIcon,
	onView,
	onEdit,
}: Props): JSX.Element {
	const logic: UseProductAdminTableLogicReturn = useProductAdminTableLogic({
		products: products,
	});

	const columns: Column<ProductListInfoAdmin>[] = [
		{
			key: 'name',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Sản phẩm</span>
					{renderSortIcon('name')}
				</div>
			),
			onHeaderClick: (): void => handleSort('name'),
			render: (row: ProductListInfoAdmin): JSX.Element => (
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
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Slug</span>
					{renderSortIcon('slug')}
				</div>
			),
			onHeaderClick: (): void => handleSort('slug'),
			render: (row: ProductListInfoAdmin): JSX.Element => (
				<span className='text-muted-foreground'>{row.slug}</span>
			),
		},
		{
			key: 'status',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Trạng thái</span>
					{renderSortIcon('status')}
				</div>
			),
			onHeaderClick: (): void => handleSort('status'),
			render: (row: ProductListInfoAdmin): JSX.Element => (
				<ProductStatusBadge status={row.status} />
			),
		},
		{
			key: 'createdAt',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Ngày thêm</span>
					{renderSortIcon('createdAt')}
				</div>
			),
			onHeaderClick: (): void => handleSort('createdAt'),
			render: (row: ProductListInfoAdmin): JSX.Element => (
				<span className='text-muted-foreground'>{formatDate(row.createdAt)}</span>
			),
		},
		{
			key: 'updatedAt',
			header: (
				<div
					className='flex items-center gap-1 cursor-pointer select-none'
					onClick={() => handleSort('updatedAt')}
				>
					<span>Ngày điều chỉnh</span>
					{renderSortIcon('updatedAt')}
				</div>
			),
			render: (row: ProductListInfoAdmin): JSX.Element => (
				<span className='text-muted-foreground'>{formatDate(row.updatedAt)}</span>
			),
		},
		{
			key: 'actions',
			header: <span className='text-right block'>Hành động</span>,
			render: (row: ProductListInfoAdmin): JSX.Element => (
				<div
					className='text-right'
					onClick={(e) => e.stopPropagation()}
				>
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
								className='cursor-pointer'
								onClick={() => onEdit(row.id)}
							>
								<Pencil
									size={14}
									className='mr-2'
								/>
								Chỉnh sửa
							</DropdownMenuItem>

							<DropdownMenuItem className='text-red-500 cursor-pointer'>
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
		<>
			<DataTable
				data={products}
				columns={columns}
				onRowClick={(row: ProductListInfoAdmin): void => onView(row.id)}
				getRowKey={(row: ProductListInfoAdmin): number => row.id}
				selectable={{
					selected: logic.selected,
					onToggle: logic.toggle,
					onToggleAll: logic.toggleAll,
					isAllSelected: logic.isAllSelected,
					isIndeterminate: logic.isIndeterminate,
				}}
			/>

			<StatusModal
				isOpen={logic.modal.isOpen}
				onClose={logic.handleCancelDelete}
				status={logic.modal.status}
				title={MODAL_TITLE_MAP[logic.modal.status] || 'Thông báo'}
				description={logic.modal.message}
				confirmText={logic.modal.status === 'warning' ? 'Hủy' : 'Đóng'}
			>
				{logic.modal.status === 'warning' && (
					<div className='flex w-full justify-center mt-4'>
						<Button
							onClick={logic.handleConfirmDelete}
							className='bg-red-600 hover:bg-red-700 text-white min-w-[120px] cursor-pointer'
						>
							Xác nhận xoá
						</Button>
					</div>
				)}
			</StatusModal>
		</>
	);
}
