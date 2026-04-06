'use client';

import { JSX } from 'react';
import GoodsReceiptAdminTable from '@/app/admin/inventories/receipts/_components/goods-receipt-admin-table';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import { FilterField } from '@/types/uis/FilterField';
import { ReceiptAdminFilterValues } from '@/types/inventories/receipts/uis/ReceiptAdminFilterValues';
import { FilterSupplier } from '@/types/inventories/suppliers/FilterSupplier';
import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';
import Pagination from '@/components/layout/share/pagination';
import { useTableSort } from '@/hooks/share/use-table-sort';
import { usePagination } from '@/hooks/share/use-pagination';
import { GoodsReceiptSortField } from '@/types/inventories/receipts/uis/GoodsReceiptSortField';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ProductSelectionGoodsReceiptModal } from '@/app/admin/inventories/receipts/_components/product-selection-goods-receipt-modal';
import { ProductBatchItemModal } from '@/app/admin/inventories/receipts/[receiptId]/batches/[batchId]/_components/product-batch-item-modal';
import { useGoodsReceiptData } from '@/hooks/inventories/receipts/use-goods-receipt-data';
import { useProductVariantListData } from '@/hooks/inventories/receipts/use-product-variant-list-data';
import { useGoodsReceiptExcel } from '@/hooks/inventories/receipts/use-goods-receipt-excel';
import { useGoodsReceiptNavigation } from '@/hooks/inventories/receipts/use-goods-receipt-navigation';

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

export default function GoodsReceiptAdminContainer({ receipts }: Props): JSX.Element {
	const { mockProducts } = useGoodsReceiptData();
	const { availableVariants } = useProductVariantListData();

	// Chỉ lấy Logic Excel (Bỏ qua hoàn toàn Logic Form)
	const {
		isProductModalOpen,
		setIsProductModalOpen,
		isVariantModalOpen,
		setIsVariantModalOpen,
		handleStartExcelFlow,
		handleProductSelected,
		handleVariantsSelected,
	} = useGoodsReceiptExcel();

	// Chỉ lấy Logic Navigation
	const {
		handleRedirectToAddNewReceiptDetail,
		handleRedirectToEditReceiptDetail,
		handleRedirectToReceiptDetail,
	} = useGoodsReceiptNavigation();

	const { handleSort, renderSortIcon } = useTableSort<GoodsReceiptSortField>();
	const { currentPage, changePage } = usePagination();

	return (
		<div className='space-y-4'>
			{/* Header */}
			<AdminTableHeader<ReceiptAdminFilterValues>
				title='Quản lý đơn nhập kho'
				description='Quản lý thông tin đơn nhập kho'
				searchPlaceholder='Tìm theo mã phiếu'
				filter
				filterField={receiptFilterFields}
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

			{/* Modal 1: Choosing product modal */}
			<ProductSelectionGoodsReceiptModal
				products={mockProducts}
				open={isProductModalOpen}
				onOpenChange={setIsProductModalOpen}
				onSelectProduct={handleProductSelected}
			/>

			{/* Modal 2: Choosing variants modal */}
			<ProductBatchItemModal
				variants={availableVariants}
				open={isVariantModalOpen}
				onOpenChange={setIsVariantModalOpen}
				onSelect={handleVariantsSelected}
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
