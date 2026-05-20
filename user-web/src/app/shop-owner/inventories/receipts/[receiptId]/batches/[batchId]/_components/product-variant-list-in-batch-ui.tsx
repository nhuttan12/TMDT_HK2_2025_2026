import React, { JSX } from 'react';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/layout/share/pagination';
import { UseProductVariantListLogicReturn } from '@/hooks/inventories/goods-receipts/use-product-variant-list-logic';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';
import { ProductBatchReceiptFormType } from '@/types/inventories/receipts/uis/ProductBatchReceiptFormType';
import { ProductBatchItemModal } from '../../../../_components/goods-receipt-list/product-batch-item-modal';
import { ProductVariantListInBatchTableUI } from './product-variant-list-in-batch-table-ui';

interface ProductVariantListInBatchTableUIProps extends UseProductVariantListLogicReturn {
	availableVariants: ProductVariantRow[];
	mode: ProductBatchReceiptFormType;
}

export default function ProductVariantListInBatchUi({
	availableVariants,
	mode,
	displayData,
	isModalOpen,
	setIsModalOpen,
	currentPage,
	totalPages,
	totalQuantity,
	totalAmount,
	changePage,
	handleSelectVariants,
	handleUpdateItem,
	handleRemoveItem,
	handleRedirectToDetail,
	handleRedirectToCreateBatchReceipt,
}: ProductVariantListInBatchTableUIProps): JSX.Element {
	const isView: boolean = mode === 'view';

	return (
		<div className='space-y-6'>
			{/* Header */}
			<AdminTableHeader
				title='Sản phẩm trong lô hàng'
				description='Quản lý thông tin chi tiết các sản phẩm trong lô hàng'
				searchPlaceholder='Tìm kiếm theo số serial, tên sản phẩm...'
				searchKey='productVariantName'
				{...(mode === 'create' && {
					onAdd: (): void => setIsModalOpen(true),
					addLabel: 'Thêm sản phẩm trong lô hàng',
				})}
			/>

			{/* Modal chọn sản phẩm phân loại (Chỉ sử dụng data từ Query) */}
			<ProductBatchItemModal
				variants={availableVariants}
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				onSelect={handleSelectVariants}
			/>

			{/* Content Table */}
			<div className='space-y-4 border p-4 rounded-lg'>
				<h3 className='font-semibold'>Danh sách sản phẩm phân loại trong lô</h3>

				<ProductVariantListInBatchTableUI
					mode={mode}
					data={displayData}
					isView={isView}
					onUpdate={handleUpdateItem}
					onRemove={handleRemoveItem}
					onRedirect={handleRedirectToDetail}
				/>

				{mode === 'create' && (
					<div className='flex justify-end pt-4 border-t gap-3'>
						<Button
							className='cursor-pointer'
							onClick={handleRedirectToCreateBatchReceipt}
						>
							Xác nhận & Lưu lô hàng
						</Button>
					</div>
				)}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages} // Nên được tính toán từ backend hoặc logic pagination nếu có
					onPageChange={changePage}
				/>
			)}

			{/* Total amount */}
			<div className='flex justify-end gap-12 mt-8 pt-6 pb-6 border-t'>
				<div className='text-right'>
					<p className='text-sm text-muted-foreground'>Tổng số lượng</p>
					<p className='text-2xl font-bold'>{totalQuantity}</p>
				</div>
				<div className='text-right'>
					<p className='text-sm text-muted-foreground'>Tổng giá trị</p>
					<p className='text-2xl font-bold text-blue-600'>
						{totalAmount.toLocaleString()} ₫
					</p>
				</div>
			</div>
		</div>
	);
}
