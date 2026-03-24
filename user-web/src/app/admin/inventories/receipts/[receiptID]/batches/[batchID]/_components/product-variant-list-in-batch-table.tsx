'use client';

import { JSX } from 'react';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
import { getBatchItemStatusLabel } from '@/types/inventories/receipts/uis/BatchItemStatus';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import Pagination from '@/components/layout/share/pagination';
import { useTableSort } from '@/hooks/use-table-sort';
import { usePagination } from '@/hooks/use-pagination';
import { ProductVariantInBatchSortField } from '@/types/inventories/receipts/uis/ProductVariantInBatchSortField';

interface Props {
	productVariants: BatchItemSerial[];
}

export default function ProductVariantListInBatchTable({ productVariants }: Props): JSX.Element {
	const { handleSort, renderSortIcon } = useTableSort<ProductVariantInBatchSortField>();
	const { currentPage, changePage } = usePagination();

	const columns: Column<BatchItemSerial>[] = [
		{
			key: 'serialNumber',
			header: (
				<span
					className='cursor-pointer select-none'
					onClick={() => handleSort('serialNumber')}
				>
					Số Serial {renderSortIcon('serialNumber')}
				</span>
			),
		},
		{
			key: 'productVariantName',
			header: (
				<span
					className='cursor-pointer select-none'
					onClick={() => handleSort('productVariantName')}
				>
					Tên sản phẩm {renderSortIcon('productVariantName')}
				</span>
			),
		},
		{
			key: 'appearanceCondition',
			header: (
				<span
					className='cursor-pointer select-none'
					onClick={() => handleSort('appearanceCondition')}
				>
					Tình trạng {renderSortIcon('appearanceCondition')}
				</span>
			),
			render: (row: BatchItemSerial) => row.appearanceCondition || '-',
		},
		{
			key: 'status',
			header: (
				<span
					className='cursor-pointer select-none'
					onClick={() => handleSort('status')}
				>
					Trạng thái {renderSortIcon('status')}
				</span>
			),
			render: (row: BatchItemSerial) => getBatchItemStatusLabel(row.status),
		},
		{
			key: 'importDate',
			header: (
				<span
					className='cursor-pointer select-none'
					onClick={() => handleSort('importDate')}
				>
					Ngày nhập {renderSortIcon('importDate')}
				</span>
			),
			render: (row: BatchItemSerial) => new Date(row.importDate).toLocaleDateString('vi-VN'),
		},
		{
			key: 'expiredAt',
			header: (
				<span
					className='cursor-pointer select-none'
					onClick={() => handleSort('expiredAt')}
				>
					Hạn bảo hành {renderSortIcon('expiredAt')}
				</span>
			),
			render: (row: BatchItemSerial) =>
				row.expiredAt ? new Date(row.expiredAt).toLocaleDateString('vi-VN') : '-',
		},
	];

	return (
		<div className='space-y-6'>
			<AdminTableHeader
				title='Sản phẩm trong lô hàng'
				description='Quản lý thông tin chi tiết các sản phẩm trong lô hàng'
				searchPlaceholder='Tìm kiếm theo số serial, tên sản phẩm...'
				searchKey='productVariantName'
			/>

			<DataTable
				data={productVariants}
				columns={columns}
				getRowKey={(row: BatchItemSerial) => row.id}
				tableHeight={400}
			/>

			{productVariants.length > 10 && (
				<Pagination
					currentPage={currentPage}
					totalPages={10}
					onPageChange={changePage}
				/>
			)}
		</div>
	);
}
