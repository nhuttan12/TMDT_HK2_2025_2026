'use client';

import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import Field from '@/components/layout/admin/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { GoodsReceipt } from '@/types/inventories/receipts/GoodsReceipt';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { FormEvent, useState } from 'react';
import GoodsReceiptStatusBadge from './goods-receipt-status-badge';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { GoodsReceiptSupplier } from '@/types/inventories/receipts/GoodsReceiptSupplier';
import { Column } from '@/types/uis/Column';
import { GoodsReceiptItem } from '@/types/inventories/receipts/GoodsReceiptItem';
import { DataTable } from '@/components/layout/admin/data-table';

export default function GoodsReceiptDetail({
	receipt,
	formType,
}: {
	receipt: GoodsReceipt;
	formType: AdminFormType;
}) {
	const isView: boolean = formType === 'view';
	const isCreate: boolean = formType === 'create';

	const [form, setForm] = useState<GoodsReceipt>(receipt);

	const handleChange = <K extends keyof GoodsReceipt>(key: K, value: GoodsReceipt[K]) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log('submit', form);
	};

	const itemColumns: Column<GoodsReceiptItem>[] = [
		{
			key: 'sku',
			header: 'SKU',
		},
		{
			key: 'productName',
			header: 'Tên',
		},
		{
			key: 'quantity',
			header: 'Số lượng',
			render: (item: GoodsReceiptItem, rowIndex) => {
				if (isView) return item.quantity;

				return (
					<Input
						type='number'
						value={item.quantity}
						onChange={(e) => {
							const quantity = Number(e.target.value);

							setForm((prev: GoodsReceipt) => {
								const newItems: GoodsReceiptItem[] = [...prev.items];
								newItems[rowIndex!].quantity = quantity;
								newItems[rowIndex!].totalPrice =
									quantity * newItems[rowIndex!].unitPrice;

								const totalQuantity: number = newItems.reduce(
									(sum: number, i: GoodsReceiptItem): number => sum + i.quantity,
									0,
								);
								const totalAmount: number = newItems.reduce(
									(sum: number, i: GoodsReceiptItem): number =>
										sum + i.totalPrice,
									0,
								);

								return {
									...prev,
									items: newItems,
									totalQuantity,
									totalAmount,
								};
							});
						}}
					/>
				);
			},
		},
		{
			key: 'unitPrice',
			header: 'Đơn giá',
		},
		{
			key: 'totalPrice',
			header: 'Thành tiền',
		},
	];

	return (
		<AdminFormWrapper
			title='Chi tiết phiếu nhập kho'
			description='Xem / tạo / cập nhật phiếu nhập kho'
			onSubmit={handleSubmit}
			actions={
				!isView && (
					<div className='flex gap-2 justify-end'>
						<Button type='submit'>{isCreate ? 'Tạo phiếu' : 'Cập nhật'}</Button>
					</div>
				)
			}
		>
			{/* ===== Info ===== */}
			<div className='grid grid-cols-2 gap-4'>
				<Field label='Mã phiếu'>
					<Input
						value={form.code}
						disabled
					/>
				</Field>

				<Field label='Trạng thái'>
					<GoodsReceiptStatusBadge status={form.status} />
				</Field>

				<Field label='Nhà cung cấp'>
					<Input
						value={form.supplier?.name || ''}
						disabled={isView}
						onChange={(e) =>
							handleChange('supplier', {
								...(form.supplier as GoodsReceiptSupplier),
								name: e.target.value,
							})
						}
					/>
				</Field>

				<Field label='Ngày nhập'>
					<Input
						type='date'
						value={form.importDate}
						disabled={isView}
						onChange={(e) => handleChange('importDate', e.target.value)}
					/>
				</Field>
			</div>

			{/* ===== Note ===== */}
			<Field label='Ghi chú'>
				<RichTextEditor
					value={form.note || ''}
					disabled={isView}
					onChange={(val: string): void => handleChange('note', val)}
				/>
			</Field>

			{/* ===== Items ===== */}
			<div>
				<h2 className='font-semibold mb-2'>Danh sách sản phẩm</h2>
				<DataTable
					data={form.items}
					columns={itemColumns}
					getRowKey={(item: GoodsReceiptItem): number => item.id}
				/>
			</div>

			{/* ===== Summary ===== */}
			<div className='flex justify-end gap-10 text-right'>
				<div>
					<p className='text-sm text-muted-foreground'>Tổng số lượng</p>
					<p className='font-semibold'>{form.totalQuantity}</p>
				</div>
				<div>
					<p className='text-sm text-muted-foreground'>Tổng tiền</p>
					<p className='font-semibold'>{form.totalAmount}</p>
				</div>
			</div>
		</AdminFormWrapper>
	);
}
