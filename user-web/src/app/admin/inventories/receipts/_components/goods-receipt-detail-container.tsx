'use client';

import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import Field from '@/components/layout/admin/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { ChangeEvent, FormEvent, JSX, useEffect, useState } from 'react';
import GoodsReceiptStatusBadge from './goods-receipt-status-badge';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { Column } from '@/types/uis/Column';
import { GoodsReceiptBatch } from '@/types/inventories/receipts/uis/GoodsReceiptBatch';
import { DataTable } from '@/components/layout/admin/data-table';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { formatDateForInpu } from '@/utils/shared/date';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ProductSelectionGoodsReceiptModal } from '@/app/admin/inventories/receipts/_components/product-selection-goods-receipt-modal';
import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { BatchReceiptStore, useBatchReceiptStore } from '@/stores/batch-receipt.store';

interface Props {
	formType: AdminFormType;
	goodsReceipt: GoodsReceiptDetail;
}

export default function GoodsReceiptDetailContainer({
	formType,
	goodsReceipt,
}: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const isView: boolean = formType === 'view';
	const isCreate: boolean = formType === 'create';

	const [form, setForm] = useState<GoodsReceiptDetail>(goodsReceipt);

	const batches = useBatchReceiptStore((s: BatchReceiptStore) => s.batches);
	const addBatch = useBatchReceiptStore((s: BatchReceiptStore) => s.addBatch);
	const updateBatch = useBatchReceiptStore((s: BatchReceiptStore) => s.updateBatch);
	const generateId = useBatchReceiptStore((s: BatchReceiptStore) => s.generateId);
	const batchItemsByBatchId = useBatchReceiptStore(
		(s: BatchReceiptStore) => s.batchItemsByBatchId,
	);

	useEffect((): void => {
		if (goodsReceipt.batches?.length) {
			useBatchReceiptStore.setState({
				batches: goodsReceipt.batches,
			});
		}
	}, [goodsReceipt.batches]);

	const updateReceiptField = <K extends keyof GoodsReceiptDetail>(
		key: K,
		value: GoodsReceiptDetail[K],
	): void => {
		setForm((prev: GoodsReceiptDetail) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (e: FormEvent): void => {
		e.preventDefault();

		const payload: GoodsReceiptDetail = {
			...form,
			batches: batches.map((batch: GoodsReceiptBatch) => ({
				...batch,
				items: batchItemsByBatchId[batch.id] || [],
			})),
		};

		console.log('Submit:', payload);
	};

	const handleChange = <K extends keyof GoodsReceiptDetail>(
		key: K,
		value: GoodsReceiptDetail[K],
	) => {
		setForm((prev: GoodsReceiptDetail) => ({ ...prev, [key]: value }));
	};

	const totalQuantity: number = batches.reduce(
		(sum: number, i: GoodsReceiptBatch): number => sum + i.quantity,
		0,
	);
	const totalAmount: number = batches.reduce(
		(sum: number, i: GoodsReceiptBatch): number => sum + i.totalPrice,
		0,
	);

	const handleRedirectToBatchDetailViewMode = (batchID: number): void => {
		router.push(`/admin/inventories/receipts/${form.id}/batches/${batchID}`);
	};

	const handleRedirectToBatchDetailCreateMode = (batchID: number): void => {
		router.push(`/admin/inventories/receipts/${form.id}/batches/${batchID}/add-new`);
	};

	const handleProductSelection = (product: ProductForGoodsReceipt): void => {
		const id: number = generateId();

		const newBatch: GoodsReceiptBatch = {
			id: id,
			isNew: true,
			productId: product.id,
			productName: product.name,
			batchNumber: '',
			quantity: 1,
			unitPrice: 0,
			totalPrice: 0,
			isSerialInputted: false,
		};

		addBatch(newBatch);
	};

	const itemColumns: Column<GoodsReceiptBatch>[] = [
		{
			key: 'productName',
			header: 'Tên sản phẩm',
		},
		{
			key: 'batchNumber',
			header: 'Mã lô',
			render: (item: GoodsReceiptBatch): JSX.Element => (
				<Input
					value={item.batchNumber}
					disabled={isView}
					onChange={(e: ChangeEvent<HTMLInputElement>): void => {
						updateBatch(item.id, {
							batchNumber: e.target.value,
						});
					}}
				/>
			),
		},
		{
			key: 'quantity',
			header: 'Số lượng',
			render: (item: GoodsReceiptBatch): number | JSX.Element =>
				isView ? (
					item.quantity
				) : (
					<Input
						type='number'
						value={item.quantity}
						onChange={(e: ChangeEvent<HTMLInputElement>): void => {
							const qty: number = Number(e.target.value);

							updateBatch(item.id, {
								quantity: qty,
								totalPrice: qty * item.unitPrice,
							});
						}}
					/>
				),
		},
		{
			key: 'unitPrice',
			header: 'Đơn giá',
			render: (item: GoodsReceiptBatch): string | JSX.Element =>
				isView ? (
					item.unitPrice.toLocaleString() + ' ₫'
				) : (
					<Input
						type='number'
						value={item.unitPrice}
						onChange={(e: ChangeEvent<HTMLInputElement>): void => {
							const price: number = Number(e.target.value);

							updateBatch(item.id, {
								unitPrice: price,
								totalPrice: price * item.quantity,
							});
						}}
					/>
				),
		},
		{
			key: 'totalPrice',
			header: 'Thành tiền',
			render: (item: GoodsReceiptBatch): string =>
				(item.quantity * item.unitPrice).toLocaleString() + ' ₫',
		},
		{
			key: 'expiredAt',
			header: 'Ngày hết hạn',
			render: (item: GoodsReceiptBatch): JSX.Element => (
				<Input
					type='date'
					value={item.expiredAt || ''}
					disabled={isView}
					onChange={(e: ChangeEvent<HTMLInputElement>): void => {
						updateBatch(item.id, {
							expiredAt: e.target.value,
						});
					}}
				/>
			),
		},
		{
			key: 'isSerialInputted',
			header: 'IMEI',
			render: (item: GoodsReceiptBatch): JSX.Element => (
				<span className={item.isSerialInputted ? 'text-green-600' : 'text-amber-600'}>
					{item.isSerialInputted ? 'Đã quét' : 'Chờ quét'}
				</span>
			),
		},
	];

	return (
		<AdminFormWrapper
			title='Chi tiết đơn hàng nhập'
			description='Quản lý thông tin phiếu nhập và danh sách các lô hàng'
			onSubmit={handleSubmit}
			actions={
				!isView && <Button type='submit'>{isCreate ? 'Tạo phiếu' : 'Cập nhật'}</Button>
			}
		>
			{/* Info */}
			<div className='grid grid-cols-2 gap-4 p-4 rounded-lg border shadow-sm'>
				<Field label='Mã phiếu'>
					<Input
						value={form.code}
						disabled={isView}
						onChange={(e: ChangeEvent<HTMLInputElement>): void =>
							updateReceiptField('code', e.target.value)
						}
					/>
				</Field>

				<Field label='Trạng thái'>
					<div className='p-1'>
						<GoodsReceiptStatusBadge status={form.importStatus} />
					</div>
				</Field>

				<Field label='Nhà cung cấp'>
					<Input
						key={form.supplierID}
						value={form.supplierName}
						disabled={isView}
						onChange={(e: ChangeEvent<HTMLInputElement>): void =>
							updateReceiptField('supplierName', e.target.value)
						}
					/>
				</Field>

				<Field label='Ngày nhập'>
					<Input
						type='date'
						value={formatDateForInpu(form.importDate)}
						disabled={isView}
						onChange={(e: ChangeEvent<HTMLInputElement>): void =>
							updateReceiptField('importDate', e.target.value)
						}
					/>
				</Field>
			</div>

			{/* ===== Note ===== */}
			<div className='mt-4'>
				<Field label='Ghi chú đợt nhập'>
					<RichTextEditor
						value={form?.note || ''}
						disabled={isView}
						onChange={(val: string): void => handleChange('note', val)}
					/>
				</Field>
			</div>

			{/* ===== Items Table ===== */}
			<div className='mt-8'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='font-bold text-lg'>Danh sách lô hàng chi tiết</h2>
					{isCreate && (
						<ProductSelectionGoodsReceiptModal
							onSelectProduct={handleProductSelection}
							trigger={<Button className='cursor-pointer'>Thêm dòng hàng</Button>}
						/>
					)}
				</div>

				{/* Goods Receipt Batch List */}
				<DataTable<GoodsReceiptBatch>
					data={batches}
					columns={itemColumns}
					getRowKey={(item: GoodsReceiptBatch): number => item.id}
					onRowClick={(row: GoodsReceiptBatch): void => {
						if (row.isNew) {
							handleRedirectToBatchDetailCreateMode(row.id);
						} else {
							handleRedirectToBatchDetailViewMode(row.id);
						}
					}}
				/>
			</div>

			{/* ===== Summary ===== */}
			<div className='flex justify-end gap-12 mt-8 pt-4 border-t'>
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
		</AdminFormWrapper>
	);
}
