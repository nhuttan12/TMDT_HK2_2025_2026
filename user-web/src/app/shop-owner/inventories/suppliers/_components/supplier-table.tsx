'use client';

import { DataTable } from '@/components/layout/admin/data-table';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import { Column } from '@/types/uis/Column';
import React, { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { StatusModal } from '@/components/layout/share/status-modal';
import { getStatusModalTitle } from '@/utils/shared/mappers/modalTitleMap';
import { UseSupplierListLogicReturn } from '@/hooks/inventories/suppliers/use-supplier-list-logic';

// Kế thừa toàn bộ logic từ Hook, ngoại trừ các biến của Pagination do Container đã xài
interface SupplierTableProps extends Omit<
	UseSupplierListLogicReturn,
	'currentPage' | 'changePage'
> {
	suppliers: Supplier[];
}
export default function SupplierTable({
	suppliers,
	handleSort,
	renderSortIcon,
	handleViewSupplier,
	handleEditSupplier,
	handleTriggerDelete,
	handleConfirmDelete,
	handleCancelDelete,
	modal,
}: SupplierTableProps): JSX.Element {
	const columns: Column<Supplier>[] = [
		{
			key: 'name',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Tên nhà cung cấp</span>
					{renderSortIcon('name')}
				</div>
			),
			onHeaderClick: (): void => handleSort('name'),
			render: (row: Supplier): JSX.Element => (
				<span className='font-medium text-slate-900'>{row.name}</span>
			),
		},
		{
			key: 'taxCode',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Mã số thuế</span>
					{renderSortIcon('taxCode')}
				</div>
			),
			onHeaderClick: (): void => handleSort('taxCode'),
			render: (row: Supplier): JSX.Element => (
				<span className='font-mono text-sm text-slate-600'>{row.taxCode}</span>
			),
		},
		{
			key: 'contactName',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Liên hệ</span>
					{renderSortIcon('contactName')}
				</div>
			),
			onHeaderClick: (): void => handleSort('contactName'),
			render: (row: Supplier): JSX.Element => (
				<div className='flex flex-col'>
					<span className='text-sm font-medium text-slate-800'>
						{row.contactName || '—'}
					</span>
					{(row.phone || row.email) && (
						<span className='text-xs text-slate-500 mt-0.5'>
							{row.phone} {row.phone && row.email ? ' • ' : ''} {row.email}
						</span>
					)}
				</div>
			),
		},
		{
			key: 'address',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Địa chỉ</span>
					{renderSortIcon('address')}
				</div>
			),
			onHeaderClick: (): void => handleSort('address'),
			render: (row: Supplier): JSX.Element => (
				<span
					className='text-slate-700 truncate max-w-62.5 block'
					title={row.address}
				>
					{row.address}
				</span>
			),
		},
		{
			key: 'action',
			header: 'Thao tác',
			render: (row: Supplier): JSX.Element => (
				<div className='flex items-center gap-4'>
					<Button
						variant='link'
						size='sm'
						className='text-blue-600 p-0 h-auto font-medium cursor-pointer'
						onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
							e.stopPropagation();
							handleEditSupplier(row);
						}}
					>
						Sửa
					</Button>
					<Button
						variant='link'
						size='sm'
						className='text-red-600 hover:text-red-800 p-0 h-auto font-medium cursor-pointer'
						onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
							e.stopPropagation();
							handleTriggerDelete(row);
						}}
					>
						Xoá
					</Button>
				</div>
			),
		},
	];

	const getRowKey = (row: Supplier): string => {
		return row.id;
	};

	return (
		<>
			<DataTable<Supplier>
				data={suppliers}
				columns={columns}
				getRowKey={getRowKey}
				onRowClick={(row: Supplier): void => handleViewSupplier(row)}
				tableHeight={500}
				stickyHeader={true}
			/>

			{/* Modal Xác Nhận */}
			<StatusModal
				isOpen={modal.isOpen}
				onClose={handleCancelDelete}
				status={modal.status}
				title={getStatusModalTitle(modal.status)}
				description={modal.message}
				confirmText={modal.status === 'warning' ? 'Hủy' : 'Đóng'}
			>
				{/* Khi trạng thái là warning (chuẩn bị xoá), ta tiêm thêm nút Xác Nhận màu đỏ vào Custom Content */}
				{modal.status === 'warning' && (
					<div className='flex w-full justify-center mt-4'>
						<Button
							onClick={handleConfirmDelete}
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
