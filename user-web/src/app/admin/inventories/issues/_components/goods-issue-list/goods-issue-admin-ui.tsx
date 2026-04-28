import { JSX } from 'react';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import { DataTable } from '@/components/layout/admin/data-table';
import Pagination from '@/components/layout/share/pagination';
import DeleteConfirmModal from '@/components/layout/admin/delete-confirm-modal';
import GoodsIssueStatusBadge from '@/app/admin/inventories/issues/_components/goods-issue-status-badge';

import { Column } from '@/types/uis/Column';
import { FilterField } from '@/types/uis/FilterField';
import { GoodsIssueList } from '@/types/inventories/issues/uis/GoodsIssueList';
import { GoodsIssueAdminFilterValues } from '@/types/inventories/issues/uis/GoodsIssueAdminFilterValues';
import { getGoodsIssueTypeLabel } from '@/types/inventories/issues/uis/GoodsIssueTypeLabel';
import { formatDateTimeWithBrackets } from '@/utils/shared/date';
import { GoodsIssueAdminLogicReturn } from '@/hooks/inventories/goods-issues/use-goods-issue-admin-logic';
import AdminTableAction from "@/components/layout/admin/admin-table-action";

interface GoodsIssueAdminUiProps extends GoodsIssueAdminLogicReturn {
	issues: GoodsIssueList[];
	isLoading: boolean;
}

// Cấu hình Filter tĩnh
const issueFilterFields: FilterField<GoodsIssueAdminFilterValues>[] = [
	{ key: 'code', label: 'Mã phiếu', type: 'text' },
	{
		key: 'type',
		label: 'Loại xuất kho',
		type: 'select',
		options: [
			{ label: 'Bán lẻ', value: 'RETAIL' },
			{ label: 'Bán sỉ', value: 'WHOLESALE' },
			{ label: 'Trả hàng hỏng', value: 'RETURN_DEFECTIVE' },
		],
	},
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
	{ key: 'exportDate', label: 'Ngày', type: 'date' },
	{ key: 'minQuantity', label: 'Số lượng tối thiểu', type: 'number' },
	{ key: 'maxQuantity', label: 'Số lượng tối đa', type: 'number' },
	{ key: 'minAmount', label: 'Số tiền tối thiểu', type: 'number' },
	{ key: 'maxAmount', label: 'Số tiền tối đa', type: 'number' },
];

export function GoodsIssueAdminUi({
	issues,
	isLoading,
	handleRedirectToAddNew,
	handleRedirectToView,
	handleRedirectToEdit,
	handleSort,
	renderSortIcon,
	pagination,
	deleteModal,
	handleExecuteDelete,
}: GoodsIssueAdminUiProps): JSX.Element {
	// Khai báo Column động trực tiếp trong UI để dễ dàng sử dụng props logic
	const columns: Column<GoodsIssueList>[] = [
		{
			key: 'code',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Mã phiếu</span>
					{renderSortIcon('code')}
				</div>
			),
			onHeaderClick: () => handleSort('code'),
		},
		{
			key: 'type',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Loại xuất</span>
					{renderSortIcon('type')}
				</div>
			),
			onHeaderClick: () => handleSort('type'),
			render: (row) => getGoodsIssueTypeLabel(row.type),
		},
		{
			key: 'exportDate',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Ngày xuất</span>
					{renderSortIcon('exportDate')}
				</div>
			),
			onHeaderClick: () => handleSort('exportDate'),
			render: (row) => formatDateTimeWithBrackets(row.exportDate),
		},
		{
			key: 'totalQuantity',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Số lượng</span>
					{renderSortIcon('totalQuantity')}
				</div>
			),
			onHeaderClick: () => handleSort('totalQuantity'),
			render: (row) => row.totalQuantity.toLocaleString('vi-VN'),
		},
		{
			key: 'totalAmount',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Tổng tiền</span>
					{renderSortIcon('totalAmount')}
				</div>
			),
			onHeaderClick: () => handleSort('totalAmount'),
			render: (row) => `${row.totalAmount.toLocaleString('vi-VN')} ₫`,
		},
		{
			key: 'createdAt',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Ngày tạo</span>
					{renderSortIcon('createdAt')}
				</div>
			),
			onHeaderClick: () => handleSort('createdAt'),
			render: (row) => formatDateTimeWithBrackets(row.createdAt),
		},
		{
			key: 'status',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Trạng thái</span>
					{renderSortIcon('status')}
				</div>
			),
			onHeaderClick: () => handleSort('status'),
			render: (row) => <GoodsIssueStatusBadge status={row.status} />,
		},
		{
			key: 'actions',
			header: <span className='text-right block px-4'>Hành động</span>,
			render: (row) => (
				<AdminTableAction
					id={row.id}
					onEdit={handleRedirectToEdit}
					onDelete={() => deleteModal.openConfirm(row)}
				/>
			),
		},
	];

	return (
		<div className='space-y-4'>
			<AdminTableHeader<GoodsIssueAdminFilterValues>
				title='Quản lý đơn xuất kho'
				description='Quản lý thông tin đơn xuất kho'
				searchPlaceholder='Tìm theo mã phiếu'
				filter
				filterField={issueFilterFields}
				onAdd={handleRedirectToAddNew}
				addLabel='Xuất kho'
			/>

			<div className='rounded-xl border bg-white relative'>
				{isLoading && (
					<div className='absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center'>
						<span className='text-slate-500 font-medium'>Đang tải dữ liệu...</span>
					</div>
				)}
				<DataTable<GoodsIssueList>
					data={issues}
					columns={columns}
					getRowKey={(row) => row.id}
					onRowClick={(row) => handleRedirectToView(row.id)}
				/>
			</div>

			{!isLoading && (
				<Pagination
					currentPage={pagination.currentPage}
					totalPages={10}
					onPageChange={pagination.changePage}
				/>
			)}

			<DeleteConfirmModal
				isOpen={deleteModal.isOpen}
				title='Xác nhận xóa phiếu xuất?'
				description={`Bạn có chắc chắn muốn xóa phiếu ${deleteModal.selectedItem?.code}? Hành động này không thể hoàn tác.`}
				onClose={deleteModal.closeConfirm}
				onConfirm={handleExecuteDelete}
			/>
		</div>
	);
}
