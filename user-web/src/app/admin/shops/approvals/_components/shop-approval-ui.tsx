'use client';

import GlobalLoading from '@/app/loading';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import { DataTable } from '@/components/layout/admin/data-table';
import Pagination from '@/components/layout/share/pagination';
import { ShopApprovalLogicReturn } from '@/hooks/shops/admin/use-shop-approval-logic';
import { ShopApproval } from '@/types/shops/admin/ShopApproval';
import { JSX } from 'react';

// Tận dụng DRY: Kế thừa toàn bộ logic return, loại bỏ 'data' và truyền cụ thể những thứ cần
export interface ShopApprovalUiProps extends Omit<ShopApprovalLogicReturn, 'data'> {
	shops: ShopApproval[];
	totalPages: number;
	isLoading: boolean;
}

export function ShopApprovalUi({
	shops,
	columns,
	filterFields,
	isLoading,
	pagination,
	totalPages,
	handleRowClick,
}: ShopApprovalUiProps): JSX.Element {
	return (
		<>
			{isLoading && <GlobalLoading />}
            
			<div className='p-6 space-y-6 min-h-screen'>
				{/* Header có Search và Filter, KHÔNG CÓ nút Add */}
				<AdminTableHeader<ShopApproval>
					title='Phê duyệt cửa hàng'
					description='Danh sách các đơn đăng ký mở gian hàng mới cần kiểm duyệt.'
					searchPlaceholder='Tìm tên cửa hàng...'
					searchKey='name'
					filter={true}
					filterField={filterFields}
				/>

				{/* Table Container */}
				<div className='bg-white border rounded-lg shadow-sm relative'>
					{isLoading && (
						<div className='absolute inset-0 z-20 bg-white/60 flex items-center justify-center'>
							<div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
						</div>
					)}

					<DataTable<ShopApproval>
						data={shops}
						columns={columns}
						getRowKey={(row) => row.id}
						onRowClick={handleRowClick}
						tableHeight={600}
					/>
				</div>

				{/* Phân trang */}
				{totalPages > 1 && (
					<Pagination
						currentPage={pagination.currentPage}
						totalPages={totalPages}
						onPageChange={pagination.changePage}
					/>
				)}
			</div>
		</>
	);
}
