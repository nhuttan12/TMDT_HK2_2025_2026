import AdminTableAction from '@/components/layout/admin/admin-table-action';
import { DataTable } from '@/components/layout/admin/data-table';
import { StatusModal } from '@/components/layout/share/status-modal';
import { Button } from '@/components/ui/button';
import {
	useProductAdminTableLogic,
	UseProductAdminTableLogicReturn,
} from '@/hooks/products/admin/use-product-admin-table-logic';
import { ProductAdminSortField } from '@/types/products/admin/ProductAdminSort';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { Column } from '@/types/uis/Column';
import { formatDate } from '@/utils/shared/date';
import { getStatusModalTitle } from '@/utils/shared/mappers/modalTitleMap';
import Image from 'next/image';
import { JSX } from 'react';
import ProductStatusBadge from './detail/product-status-badge';
import ProductSystemStatusBadge from './detail/product-system-status-badge';

interface ProductAdminTableProps {
	products: ProductListInfoAdmin[];
	handleSort: (field: ProductAdminSortField) => void;
	renderSortIcon: (field: ProductAdminSortField) => JSX.Element | null;
	onView: (id: string) => void;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
	productApproval?: boolean;
}

export default function ProductAdminTable({
	products,
	productApproval = false,
	handleSort,
	renderSortIcon,
	onView,
	onEdit,
	onDelete,
}: ProductAdminTableProps): JSX.Element {
	const logic = useProductAdminTableLogic({
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
			key: 'status',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Trạng thái</span>
					{renderSortIcon('status')}
				</div>
			),
			onHeaderClick: (): void => handleSort('status'),
			render: (row: ProductListInfoAdmin): JSX.Element => {
				if (productApproval) {
					return <ProductSystemStatusBadge status={row.systemStatus} />;
				} else {
					return <ProductStatusBadge status={row.status} />;
				}
			},
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

		...(!productApproval
			? [
					{
						key: 'actions',
						header: <span className='text-right block'>Hành động</span>,
						render: (row: ProductListInfoAdmin): JSX.Element => (
							<AdminTableAction
								id={row.id}
								onDelete={onDelete}
								onEdit={onEdit}
							/>
						),
					},
				]
			: []),
	];

	return (
		<>
			<DataTable
				data={products}
				columns={columns}
				onRowClick={(row: ProductListInfoAdmin): void => onView(row.id)}
				getRowKey={(row: ProductListInfoAdmin): string => row.id}
				selectable={{
					selected: logic.selected,
					onToggle: logic.onToggle,
					onToggleAll: logic.onToggleAll,
					isAllSelected: logic.isAllSelected,
					isIndeterminate: logic.isIndeterminate,
				}}
			/>

			<StatusModal
				isOpen={logic.modal.isOpen}
				onClose={logic.handleCancelDelete}
				status={logic.modal.status}
				title={getStatusModalTitle(logic.modal.status)}
				description={logic.modal.message}
				confirmText={logic.modal.status === 'warning' ? 'Hủy' : 'Đóng'}
			>
				{logic.modal.status === 'warning' && (
					<div className='flex w-full justify-center mt-4'>
						<Button
							onClick={logic.handleConfirmDelete}
							className='bg-red-600 hover:bg-red-700 text-white min-w-30 cursor-pointer'
						>
							Xác nhận xoá
						</Button>
					</div>
				)}
			</StatusModal>
		</>
	);
}
