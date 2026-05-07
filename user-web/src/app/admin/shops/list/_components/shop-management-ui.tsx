'use client';

import React, { JSX } from 'react';
import AdminTableHeader from '@/components/layout/admin/admin-table-header'; // Path của bạn
import { DataTable } from '@/components/layout/admin/data-table'; // Path của bạn
import Pagination from '@/components/layout/share/pagination'; // Path của bạn
import { FilterField } from '@/types/uis/FilterField';
import { ShopAdmin } from '@/types/shops/admin/ShopAdmin';
import { UsePaginationReturn } from '@/hooks/share/use-pagination'; // Path chuẩn
import { Column } from '@/types/uis/Column';
import { ShopAdminTableLogicReturn } from '@/hooks/shops/admin/use-shop-admin-logic';

export interface ShopManagementUiProps extends Omit<ShopAdminTableLogicReturn, 'data'> {
	shops: ShopAdmin[];
	totalPages: number;
}

export function ShopManagementUi({
	shops,
	columns,
	isLoading,
	pagination,
	totalPages,
	handleRowClick,
	handleAddShop,
}: ShopManagementUiProps): JSX.Element {
	// Cấu hình filter field
	const filterFields: FilterField<ShopAdmin>[] = [
		{
			key: 'status',
			label: 'Trạng thái',
			type: 'select',
			options: [
				{ label: 'Hoạt động', value: 'ACTIVE' },
				{ label: 'Tạm khóa', value: 'INACTIVE' },
				{ label: 'Bị cấm', value: 'BANNED' },
			],
		},
	];

	return (
		<div className='p-6 space-y-6 min-h-screen'>
			<AdminTableHeader<ShopAdmin>
				title='Quản lý Cửa Hàng'
				description='Xem danh sách, tìm kiếm và quản lý trạng thái của các cửa hàng trên hệ thống.'
				searchPlaceholder='Tìm kiếm theo tên cửa hàng...'
				searchKey='name'
				onAdd={handleAddShop}
				addLabel='+ Thêm Cửa Hàng'
				filter={true}
				filterField={filterFields}
			/>

			<div className='bg-white border rounded-lg shadow-sm relative'>
				{isLoading && (
					<div className='absolute inset-0 z-20 bg-white/60 flex items-center justify-center'>
						<div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
					</div>
				)}

				<DataTable<ShopAdmin>
					data={shops}
					columns={columns}
					getRowKey={(row) => row.id}
					onRowClick={handleRowClick}
					tableHeight={600}
				/>
			</div>

			{totalPages > 1 && (
				<Pagination
					currentPage={pagination.currentPage}
					totalPages={totalPages}
					onPageChange={pagination.changePage}
				/>
			)}
		</div>
	);
}
