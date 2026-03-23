'use client';

import { JSX } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import GoodsIssueAdminTable from '@/app/admin/inventories/issues/_components/goods-issue-admin-table';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import { FilterField } from '@/types/uis/FilterField';
import { GoodsIssueAdminFilterValues } from '@/types/inventories/issues/GoodsIssueAdminFilterValues';
import { GoodsIssueList } from '@/types/inventories/issues/GoodsIssueList';
import Pagination from '@/components/layout/share/pagination';
import { useTableSort } from '@/hooks/use-table-sort';
import { CategoryAdminSortField } from '@/types/categories/admin/CategoryAdminSort';
import { usePagination } from '@/hooks/use-pagination';

interface Props {
	goodsIssues: GoodsIssueList[]
}

const issueFilterFields: FilterField<GoodsIssueAdminFilterValues>[] = [
	{
		key: 'code',
		label: 'Mã phiếu',
		type: 'text',
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
	{
		key: 'exportDate',
		label: 'Ngày',
		type: 'date',
	},
	{
		key: 'minQuantity',
		label: 'Số lượng tối thiểu',
		type: 'number',
	},
	{
		key: 'maxQuantity',
		label: 'Số lượng tối đa',
		type: 'number',
	},
	{
		key: 'minAmount',
		label: 'Số tiền tối thiểu',
		type: 'number',
	},
	{
		key: 'maxAmount',
		label: 'Số tiền tối đa',
		type: 'number',
	},
];

export default function GoodsIssueAdminPageClient({goodsIssues}: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<CategoryAdminSortField>();
	const { currentPage, changePage } = usePagination();

	const handleRedirectToAddNewIssueDetail = () => {
		router.push(`/admin/inventories/issues/add-new`);
	};

	const handleRedirectToEditIssueDetail = (issueID: number) => {
		router.push(`/admin/inventories/issues/${issueID}/edit`);
	};

	const handleRedirectToIssueDetail = (issueID: number): void => {
		router.push(`/admin/inventories/issues/${issueID}`);
	};

	return (
		<div className='space-y-4'>
			{/* Header */}
			<AdminTableHeader<GoodsIssueAdminFilterValues>
				title='Quản lý đơn xuất kho'
				description='Quản lý thông tin đơn xuất kho'
				searchPlaceholder='Tìm theo mã phiếu'
				filter
				filterField={issueFilterFields}
				onAdd={handleRedirectToAddNewIssueDetail}
				addLabel='Xuất kho'
			/>

			{/* Table */}
			<div className='rounded-xl border bg-white'>
				<GoodsIssueAdminTable
					handleSort={handleSort}
					renderSortIcon={renderSortIcon}
					issues={goodsIssues}
					onView={handleRedirectToIssueDetail}
					onEdit={handleRedirectToEditIssueDetail}
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
