'use client';

import { JSX } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import GoodsReceiptAdminTable from '@/app/admin/inventories/receipts/_components/goods-receipt-admin-table';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import { FilterField } from '@/types/uis/FilterField';
import { ReceiptAdminFilterValues } from '@/types/inventories/receipts/uis/ReceiptAdminFilterValues';
import { FilterSupplier } from '@/types/inventories/suppliers/FilterSupplier';
import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';
import Pagination from '@/components/layout/share/pagination';
import { useTableSort } from '@/hooks/use-table-sort';
import { usePagination } from '@/hooks/use-pagination';
import { GoodsReceiptSortField } from '@/types/inventories/receipts/uis/GoodsReceiptSortField';

const suppliers: FilterSupplier[] = [
	{ id: 1, code: 'NCC01', name: 'ABC' },
	{ id: 2, code: 'NCC02', name: 'XYZ' },
];

const receiptFilterFields: FilterField<ReceiptAdminFilterValues>[] = [
	{
		key: 'status',
		label: 'Trạng thái',
		type: 'select',
		options: [
			{ label: 'Bản nháp', value: 'draft' },
			{ label: 'Đã xác nhận', value: 'confirmed' },
			{ label: 'Đã huỷ', value: 'cancelled' },
		],
	},
	{
		key: 'supplierID',
		label: 'Nhà cung cấp',
		type: 'select',
		options: suppliers.map((s) => ({
			label: s.name,
			value: String(s.id),
		})),
	},
	{
		key: 'importDateFrom',
		label: 'Từ ngày',
		type: 'date',
	},
	{
		key: 'importDateTo',
		label: 'Đến ngày',
		type: 'date',
	},
];

interface Props {
	receipts: GoodsReceiptList[];
}

export default function GoodsReceiptAdminPageClient({ receipts }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<GoodsReceiptSortField>();
	const { currentPage, changePage } = usePagination();

	const handleRedirectToAddNewReceiptDetail = () => {
		router.push(`/admin/inventories/receipts/add-new`);
	};

	const handleRedirectToEditReceiptDetail = (receiptID: number) => {
		router.push(`/admin/inventories/receipts/${receiptID}/edit`);
	};

	const handleRedirectToReceiptDetail = (receiptID: number): void => {
		router.push(`/admin/inventories/receipts/${receiptID}`);
	};

	return (
		<div className='space-y-4'>
			{/* Header */}
			<AdminTableHeader<ReceiptAdminFilterValues>
				title='Quản lý đơn nhập kho'
				description='Quản lý thông tin đơn nhập kho'
				searchPlaceholder='Tìm theo mã phiếu'
				filter
				filterField={receiptFilterFields}
				onAdd={handleRedirectToAddNewReceiptDetail}
				addLabel='Nhập kho'
			/>

			{/* Table */}
			<div className='rounded-xl border bg-white'>
				<GoodsReceiptAdminTable
					handleSort={handleSort}
					renderSortIcon={renderSortIcon}
					receipts={receipts}
					onView={handleRedirectToReceiptDetail}
					onEdit={handleRedirectToEditReceiptDetail}
				/>
			</div>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalPages={10}
				onPageChange={changePage}
			/>
		</div>
	);
}
