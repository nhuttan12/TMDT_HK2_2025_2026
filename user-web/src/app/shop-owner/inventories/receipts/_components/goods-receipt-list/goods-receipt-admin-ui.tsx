import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import Pagination from '@/components/layout/share/pagination';
import { JSX } from 'react';

import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';
import { GoodsReceiptSortField } from '@/types/inventories/receipts/uis/GoodsReceiptSortField';
import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { ReceiptAdminFilterValues } from '@/types/inventories/receipts/uis/ReceiptAdminFilterValues';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UseGoodsReceiptExcelLogicReturn } from '@/hooks/inventories/goods-receipts/use-goods-receipt-excel-logic';
import { UseGoodsReceiptNavigationLogicReturn } from '@/hooks/inventories/goods-receipts/use-goods-receipt-navigation-logic';
import { UsePaginationReturn } from '@/hooks/share/use-pagination';
import { UseTableSortReturn } from '@/hooks/share/use-table-sort';
import { ProductSelectionGoodsReceiptModal } from '../product-selection-goods-receipt-modal';
import GoodsReceiptAdminTable from './goods-receipt-admin-table';

interface GoodsReceiptAdminUiProps
	extends
		UseGoodsReceiptExcelLogicReturn,
		UseTableSortReturn<GoodsReceiptSortField>,
		UsePaginationReturn,
		UseGoodsReceiptNavigationLogicReturn {
	// Chỉ cần khai báo thêm Data vì hook không chứa Data Fetching
	receipts: GoodsReceiptList[];
	products: ProductForGoodsReceipt[];
    totalPages?: number;
}

export default function GoodsReceiptAdminUi({
	receipts,
	products,
	currentPage,
	changePage,
	handleSort,
	renderSortIcon,
	isProductModalOpen,
	setIsProductModalOpen,
	handleStartExcelFlow,
	handleProductSelected,
	handleRedirectToAddNewReceiptDetail,
	handleRedirectToReceiptDetail,
	handleRedirectToEditReceiptDetail,
    totalPages = 10
}: GoodsReceiptAdminUiProps): JSX.Element {
	return (
		<div className='space-y-4'>
			<AdminTableHeader<ReceiptAdminFilterValues>
				title='Quản lý đơn nhập kho'
				description='Quản lý thông tin đơn nhập kho'
				searchPlaceholder='Tìm theo mã phiếu'
				actions={
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className='cursor-pointer'>Nhập kho</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem onClick={handleRedirectToAddNewReceiptDetail}>
								Nhập thủ công
							</DropdownMenuItem>
							<DropdownMenuItem onClick={handleStartExcelFlow}>
								Nhập bằng Excel
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				}
			/>

			<ProductSelectionGoodsReceiptModal
				productSelection={products}
				open={isProductModalOpen}
				onOpenChange={setIsProductModalOpen}
				onSelectProduct={handleProductSelected}
			/>

			<div className='rounded-xl border bg-white'>
				<GoodsReceiptAdminTable
					receipts={receipts}
					handleSort={handleSort}
					renderSortIcon={renderSortIcon}
					onView={handleRedirectToReceiptDetail}
					onEdit={handleRedirectToEditReceiptDetail}
				/>
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={changePage}
			/>
		</div>
	);
}
