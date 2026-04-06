'use client';

import React, { JSX, useState } from 'react';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import Pagination from '@/components/layout/share/pagination';
import { usePagination } from '@/hooks/share/use-pagination';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ProductBatchReceiptFormType } from '@/types/inventories/receipts/uis/ProductBatchReceiptFormType';
import { Button } from '@/components/ui/button';
import { ProductBatchItemModal } from '@/app/admin/inventories/receipts/[receiptId]/batches/[batchId]/_components/product-batch-item-modal';
import { useProductVariantListData } from '@/hooks/inventories/receipts/use-product-variant-list-data';
import { useProductVariantListLogic } from '@/hooks/inventories/receipts/use-product-variant-list-logic';
import { ProductVariantListInBatchTableUI } from '@/app/admin/inventories/receipts/[receiptId]/batches/[batchId]/_components/product-variant-list-in-batch-table-ui';

interface Props {
	batchId: number;
	productVariants: BatchItemSerial[];
	mode: ProductBatchReceiptFormType;
}

export default function ProductVariantListInBatchTable({
	batchId,
	productVariants,
	mode,
}: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();
	const isView: boolean = mode === 'view';

	const { currentPage, changePage } = usePagination();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { generateId, displayData, availableVariants } = useProductVariantListData({
		batchId,
		initialProductVariants: productVariants,
	});

	const {
		handleSelectVariants,
		handleUpdateItem,
		handleRemoveItem,
		handleRedirectToDetail,
		handleRedirectToCreateBatchReceipt,
	} = useProductVariantListLogic({
		batchId,
		router,
		generateId,
		onCloseModal: function (): void {
			setIsModalOpen(false);
		},
	});

	return (
		<div className='space-y-6'>
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

			<ProductBatchItemModal
				variants={availableVariants}
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				onSelect={handleSelectVariants}
			/>

			<div className='space-y-4 border p-4 rounded-lg'>
				<h3 className='font-semibold'>Danh sách biến thể sản phẩm trong lô</h3>

				<ProductVariantListInBatchTableUI
					mode={mode}
					data={displayData}
					isView={isView}
					onUpdate={handleUpdateItem}
					onRemove={handleRemoveItem}
					onRedirect={handleRedirectToDetail}
				/>

				{mode == 'create' && (
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

			{displayData.length > 10 && (
				<Pagination
					currentPage={currentPage}
					totalPages={10}
					onPageChange={changePage}
				/>
			)}
		</div>
	);
}
