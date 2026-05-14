import { JSX } from 'react';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import Pagination from '@/components/layout/share/pagination';

import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';
import { ReceiptAdminFilterValues } from '@/types/inventories/receipts/uis/ReceiptAdminFilterValues';
import { GoodsReceiptSortField } from '@/types/inventories/receipts/uis/GoodsReceiptSortField';
import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { UsePaginationReturn } from '@/hooks/share/use-pagination';
import { UseTableSortReturn } from '@/hooks/share/use-table-sort';
import { UseGoodsReceiptExcelLogicReturn } from '@/hooks/inventories/goods-receipts/use-goods-receipt-excel-logic';
import { UseGoodsReceiptNavigationLogicReturn } from '@/hooks/inventories/goods-receipts/use-goods-receipt-navigation-logic';
import { ProductSelectionGoodsReceiptModal } from '../product-selection-goods-receipt-modal';
import { ProductBatchItemModal } from './product-batch-item-modal';
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
	variants: ProductVariantRow[];
}

export default function GoodsReceiptAdminUi({
	receipts,
	products,
	variants,
	currentPage,
	changePage,
	handleSort,
	renderSortIcon,
	isProductModalOpen,
	setIsProductModalOpen,
	isVariantModalOpen,
	setIsVariantModalOpen,
	handleStartExcelFlow,
	handleProductSelected,
	handleVariantsSelected,
	handleRedirectToAddNewReceiptDetail,
	handleRedirectToReceiptDetail,
	handleRedirectToEditReceiptDetail,
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
				products={products}
				open={isProductModalOpen}
				onOpenChange={setIsProductModalOpen}
				onSelectProduct={handleProductSelected}
			/>

			<ProductBatchItemModal
				variants={variants}
				open={isVariantModalOpen}
				onOpenChange={setIsVariantModalOpen}
				onSelect={handleVariantsSelected}
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
				totalPages={10}
				onPageChange={changePage}
			/>
		</div>
	);
}
