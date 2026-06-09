'use client';

import AdminTableAction from '@/components/layout/admin/admin-table-action';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import { DataTable } from '@/components/layout/admin/data-table';
import Pagination from '@/components/layout/share/pagination';
import { Badge } from '@/components/ui/badge';
import { CouponManagementLogicReturn } from '@/hooks/marketing/coupons/admin/use-coupon-management-logic';
import { AdminCoupon } from '@/types/marketing/coupons/admin/AdminCoupon';
import { CouponFilterParams } from '@/types/marketing/coupons/admin/CouponFilterParams';
import { Column } from '@/types/uis/Column';
import { FilterField } from '@/types/uis/FilterField';
import { getCouponStatusLabel } from '@/utils/marketings/coupons/coupon-status-label-mapping';
import { getDiscountTypeLabel } from '@/utils/marketings/coupons/discount-type-label-mapping';
import { formatDateTimeWithBrackets } from '@/utils/shared/date';
import { formatMoney } from '@/utils/shared/money';
import { JSX } from 'react';

interface CouponManagementUiProps extends CouponManagementLogicReturn {
	isLoading: boolean;
}

const FILTER_SCHEMA: FilterField<CouponFilterParams>[] = [
	{
		key: 'status',
		label: 'Trạng thái',
		type: 'select',
		options: [
			{ value: 'upcoming', label: 'Sắp diễn ra' },
			{ value: 'active', label: 'Đang hoạt động' },
			{ value: 'expired', label: 'Đã hết hạn' },
			{ value: 'disabled', label: 'Đã vô hiệu hóa' },
		],
	},
	{
		key: 'scope',
		label: 'Phạm vi',
		type: 'select',
		options: [
			{ value: 'platform', label: 'Toàn sàn' },
			{ value: 'shop', label: 'Của Shop' },
		],
	},
	{
		key: 'discountType',
		label: 'Loại giảm giá',
		type: 'select',
		options: [
			{ value: 'fixed_amount', label: 'Số tiền cố định' },
			{ value: 'percentage', label: 'Phần trăm (%)' },
		],
	},
];

export const CouponManagementUi = ({
	coupons,
	onSearchChange,
	onDeleteCoupon,
	onEditCoupon,
	onViewCoupon,
    onAddCoupon,
	pagination,
	sortConfig,
	isLoading,
}: CouponManagementUiProps): JSX.Element => {
	const columns: Column<AdminCoupon>[] = [
		{
			key: 'code',
			header: (
				<div className='flex items-center gap-1'>
					Mã Coupon {sortConfig.renderSortIcon('code')}
				</div>
			),
			onHeaderClick: (): void => sortConfig.handleSort('code'),
			render: (row: AdminCoupon): JSX.Element => (
				<div className='flex flex-col'>
					<span className='font-bold text-blue-600'>{row.code}</span>
					<span className='text-xs text-gray-500'>{row.name}</span>
				</div>
			),
		},
		{
			key: 'type',
			header: 'Loại',
			render: (row: AdminCoupon): JSX.Element => (
				<span className='font-medium'>{getDiscountTypeLabel(row.discountType)}</span>
			),
		},
		{
			key: 'discount',
			header: 'Mức giảm',
			render: (row: AdminCoupon): JSX.Element => {
				if (row.discountType === 'percentage') {
					return (
						<span className='font-medium text-red-600'>Giảm {row.discountValue}%</span>
					);
				}
				return (
					<span className='font-medium text-red-600'>
						Giảm {formatMoney(row.discountValue)}
					</span>
				);
			},
		},
		{
			key: 'condition',
			header: 'Điều kiện',
			render: (row: AdminCoupon): JSX.Element => (
				<div className='flex flex-col text-sm'>
					<span>Từ {formatMoney(row.minOrderValue)}</span>
					{row.maxDiscountAmount && (
						<span className='text-xs text-gray-500'>
							Tối đa: {formatMoney(row.maxDiscountAmount)}
						</span>
					)}
				</div>
			),
		},
		{
			key: 'validTime',
			header: 'Thời gian',
			render: (row: AdminCoupon): JSX.Element => (
				<div className='flex flex-col text-xs text-gray-600'>
					<span>Từ: {formatDateTimeWithBrackets(row.validTime.fromDate)}</span>
					<span>Đến: {formatDateTimeWithBrackets(row.validTime.toDate)}</span>
				</div>
			),
		},
		{
			key: 'usedQuantity',
			header: (
				<div className='flex items-center gap-1'>
					Đã dùng {sortConfig.renderSortIcon('usedQuantity')}
				</div>
			),
			onHeaderClick: (): void => sortConfig.handleSort('usedQuantity'),
			render: (row: AdminCoupon): JSX.Element => (
				<span>
					{row.usedQuantity} / {row.totalQuantity}
				</span>
			),
		},
		{
			key: 'status',
			header: (
				<div className='flex items-center gap-1'>
					Trạng thái {sortConfig.renderSortIcon('status')}
				</div>
			),
			onHeaderClick: (): void => sortConfig.handleSort('status'),
			render: (row: AdminCoupon): JSX.Element => (
				<Badge variant={row.status === 'active' ? 'default' : 'secondary'}>
					{getCouponStatusLabel(row.status)}
				</Badge>
			),
		},
		{
			key: 'actions',
			header: <div className='text-right'>Hành động</div>,
			render: (row: AdminCoupon): JSX.Element => (
				<AdminTableAction
					id={row.id}
					onEdit={onEditCoupon}
					onDelete={onDeleteCoupon}
				/>
			),
		},
	];

	return (
		<div className='space-y-6 p-6'>
			<AdminTableHeader<CouponFilterParams>
				title='Quản lý Coupon'
				description='Quản lý danh sách và thiết lập các mã giảm giá'
				searchPlaceholder='Tìm mã hoặc tên coupon...'
				searchKey='search'
				filter={true}
				filterField={FILTER_SCHEMA}
				onAdd={onAddCoupon}
				addLabel='Tạo Coupon'
			/>

			{isLoading ? (
				<div className='py-10 text-center text-gray-500'>Đang tải dữ liệu coupon...</div>
			) : (
				<div className='space-y-4'>
					<DataTable<AdminCoupon>
						data={coupons}
						columns={columns}
						// Tạm thời dùng Regex để bóc số từ string ID (ví dụ 'v1' -> 1).
						// Thực tế nên đổi getRowKey trong DataTable sang string.
						getRowKey={(row: AdminCoupon): string => row.id}
						onRowClick={(row: AdminCoupon) => onViewCoupon(row.id)}
						tableHeight={600}
					/>

					{pagination.totalPages > 1 && (
						<Pagination
							currentPage={pagination.currentPage}
							totalPages={pagination.totalPages}
							onPageChange={pagination.changePage}
						/>
					)}
				</div>
			)}
		</div>
	);
};
