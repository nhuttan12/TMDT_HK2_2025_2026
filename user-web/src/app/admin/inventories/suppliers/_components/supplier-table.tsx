'use client';

import { DataTable } from '@/components/layout/admin/data-table';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import { Column } from '@/types/uis/Column';
import React, { JSX, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SupplierSortField } from '@/types/inventories/suppliers/SupplierSortField';
import { useTableSort } from '@/hooks/share/use-table-sort';
import { useStatusModal, UseStatusModalReturn } from '@/hooks/share/use-status-modal';
import { StatusModal } from '@/components/layout/share/status-modal';
import { MODAL_TITLE_MAP } from '@/utils/shared/mappers/modalTitleMap';

interface SupplierTableProps {
	suppliers: Supplier[];

	onViewSupplier: (id: number) => void;
	onEditSupplier: (id: number) => void;
	onDeleteSupplier: (id: number) => void;
}

export default function SupplierTable({
	suppliers,
	onViewSupplier,
	onEditSupplier,
	onDeleteSupplier,
}: SupplierTableProps): JSX.Element {
	const { handleSort, renderSortIcon } = useTableSort<SupplierSortField>();
	const modal: UseStatusModalReturn = useStatusModal();
	const [deletingId, setDeletingId] = useState<number | null>(null);

	const handleConfirmDelete = (): void => {
		if (deletingId !== null) {
			onDeleteSupplier(deletingId);
			setDeletingId(null);
			modal.closeModal();
		}
	};

	const handleCancelDelete = (): void => {
		setDeletingId(null);
		modal.closeModal();
	};

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
					className='text-slate-700 truncate max-w-[250px] block'
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
							onEditSupplier(row.id);
							console.log('Sửa nhà cung cấp:', row.id);
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
							setDeletingId(row.id);
							modal.showWarning(
								`Bạn có chắc chắn muốn xoá biến thể "${row.name}" không?`,
							);
						}}
					>
						Xoá
					</Button>
				</div>
			),
		},
	];

	const getRowKey = (row: Supplier): number => {
		return row.id;
	};

	return (
		<>
			<DataTable<Supplier>
				data={suppliers}
				columns={columns}
				getRowKey={getRowKey}
				onRowClick={(row: Supplier): void => onViewSupplier(row.id)}
				tableHeight={500}
				stickyHeader={true}
			/>

			{/* Modal Xác Nhận */}
			<StatusModal
				isOpen={modal.isOpen}
				onClose={handleCancelDelete}
				status={modal.status}
				title={MODAL_TITLE_MAP[modal.status] || 'Thông báo'}
				description={modal.message}
				confirmText={modal.status === 'warning' ? 'Hủy' : 'Đóng'}
			>
				{/* Khi trạng thái là warning (chuẩn bị xoá), ta tiêm thêm nút Xác Nhận màu đỏ vào Custom Content */}
				{modal.status === 'warning' && (
					<div className='flex w-full justify-center mt-4'>
						<Button
							onClick={handleConfirmDelete}
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
