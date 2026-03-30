'use client';

import React, { JSX, useState, useMemo, useRef, useEffect, RefObject } from 'react';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import Pagination from '@/components/layout/share/pagination';
import { useTableSort } from '@/hooks/use-table-sort';
import { usePagination } from '@/hooks/use-pagination';
import { ProductVariantInBatchSortField } from '@/types/inventories/receipts/uis/ProductVariantInBatchSortField';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ProductVariantForReceipt } from '@/types/inventories/receipts/uis/ProductVariantForReceipt';
import { ProductBatchReceiptFormType } from '@/types/inventories/receipts/uis/ProductBatchReceiptFormType';
import { Button } from '@/components/ui/button';
import { BatchReceiptStore, useBatchReceiptStore } from '@/stores/batch-receipt.store';
import { Trash2 } from 'lucide-react';
import { getBatchItemStatusLabel } from '@/types/inventories/receipts/uis/BatchItemStatusLabel';
import {
	ProductBatchItemModal,
} from '@/app/admin/inventories/receipts/[receiptId]/batches/[batchId]/_components/product-batch-item-modal';
import { shallow } from 'zustand/shallow';

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

	const { handleSort, renderSortIcon } = useTableSort<ProductVariantInBatchSortField>();
	const { currentPage, changePage } = usePagination();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const EMPTY_ARRAY: BatchItemSerial[] = [];

	// Get store data
	const batchItems: BatchItemSerial[] = useBatchReceiptStore(
		(s: BatchReceiptStore): BatchItemSerial[] => s.batchItemsByBatchId[batchId] || EMPTY_ARRAY,
	);
	const addBatchItems = useBatchReceiptStore((s: BatchReceiptStore) => s.addBatchItems);
	const removeBatchItem = useBatchReceiptStore((s: BatchReceiptStore) => s.removeBatchItem);
	const generateId = useBatchReceiptStore((s: BatchReceiptStore) => s.generateId);

	// Combined data for display
	const allProductVariants: BatchItemSerial[] = useMemo(
		(): BatchItemSerial[] => [...productVariants, ...batchItems],
		[productVariants, batchItems],
	);

	const handleAddProductVariant = (variants: ProductVariantForReceipt[]) => {
		// Convert ProductVariantForReceipt to BatchItemSerial format
		const newBatchItems: BatchItemSerial[] = variants.map((v: ProductVariantForReceipt) => ({
			id: generateId(),

			productId: 0, // set từ batch nếu cần
			batchId: batchId,

			productVariantId: 0,
			productVariantName: v.productVariantName,

			serialNumber: v.serialNumber,
			appearanceCondition: v.appearanceCondition,
			status: v.status,

			importDate: new Date().toISOString(),
			expiredAt: undefined,
		}));

		// Update nextId for future items

		// Add to store
		addBatchItems(batchId, newBatchItems);

		// API call simulation - replace with actual API call when ready
		console.log('API CALL - Adding product variants:', newBatchItems);
		console.log('POST /api/batch-items', newBatchItems);

		// Close modal after submission
		setIsModalOpen(false);
	};

	const renderCount: RefObject<number> = useRef(0);

	useEffect((): void => {
		renderCount.current++;
		console.log('render count:', renderCount.current);
	}, []);

	const columns: Column<BatchItemSerial>[] = [
		{
			key: 'serialNumber',
			header: (
				<span
					className="cursor-pointer select-none"
					onClick={() => handleSort('serialNumber')}
				>
					Số Serial {renderSortIcon('serialNumber')}
				</span>
			),
		},
		{
			key: 'productVariantName',
			header: (
				<span
					className="cursor-pointer select-none"
					onClick={() => handleSort('productVariantName')}
				>
					Tên sản phẩm {renderSortIcon('productVariantName')}
				</span>
			),
		},
		{
			key: 'appearanceCondition',
			header: (
				<span
					className="cursor-pointer select-none"
					onClick={() => handleSort('appearanceCondition')}
				>
					Tình trạng {renderSortIcon('appearanceCondition')}
				</span>
			),
			render: (row: BatchItemSerial) => row.appearanceCondition || '-',
		},
		{
			key: 'status',
			header: (
				<span
					className="cursor-pointer select-none"
					onClick={() => handleSort('status')}
				>
					Trạng thái {renderSortIcon('status')}
				</span>
			),
			render: (row: BatchItemSerial) => getBatchItemStatusLabel(row.status),
		},
		{
			key: 'importDate',
			header: (
				<span
					className="cursor-pointer select-none"
					onClick={() => handleSort('importDate')}
				>
					Ngày nhập {renderSortIcon('importDate')}
				</span>
			),
			render: (row: BatchItemSerial) => new Date(row.importDate).toLocaleDateString('vi-VN'),
		},
		{
			key: 'expiredAt',
			header: (
				<span
					className="cursor-pointer select-none"
					onClick={() => handleSort('expiredAt')}
				>
					Hạn bảo hành {renderSortIcon('expiredAt')}
				</span>
			),
			render: (row: BatchItemSerial) =>
				row.expiredAt ? new Date(row.expiredAt).toLocaleDateString('vi-VN') : '-',
		},
		...(mode === 'create'
			? [
				{
					key: 'actions',
					header: 'Thao tác',
					render: (row: BatchItemSerial) => (
						<Button
							variant="outline"
							size="sm"
							onClick={() => handleDeleteItem(row.id)}
							className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
						>
							<Trash2 className="w-4 h-4" />
						</Button>
					),
				},
			]
			: []),
	];

	const handleRedirectToProductVariantDetail = (row: BatchItemSerial) => {
		router.push(`/admin/products/${row.productId}/variant/${row.productVariantId}`);
	};

	const handleDeleteItem = (id: number) => {
		// Remove from store (only works for items added via store)
		removeBatchItem(batchId, id);

		// Log for debugging
		console.log('Deleted item with ID:', id);
	};

	return (
		<div className="space-y-6">
			<AdminTableHeader
				title="Sản phẩm trong lô hàng"
				description="Quản lý thông tin chi tiết các sản phẩm trong lô hàng"
				searchPlaceholder="Tìm kiếm theo số serial, tên sản phẩm..."
				searchKey="productVariantName"
				{...(mode === 'create' && {
					onAdd: (): void => setIsModalOpen(true),
					addLabel: 'Thêm sản phẩm trong lô hàng',
				})}
			/>

			<ProductBatchItemModal
				open={isModalOpen}
				onOpenChange={setIsModalOpen}
				onSubmit={handleAddProductVariant}
			/>

			<DataTable
				data={allProductVariants}
				columns={columns}
				getRowKey={(row: BatchItemSerial): number => row.id}
				onRowClick={handleRedirectToProductVariantDetail}
				tableHeight={400}
			/>

			{allProductVariants.length > 10 && (
				<Pagination
					currentPage={currentPage}
					totalPages={10}
					onPageChange={changePage}
				/>
			)}

			{mode == 'create' && <Button className="cursor-pointer">Lưu lô hàng</Button>}
		</div>
	);
}