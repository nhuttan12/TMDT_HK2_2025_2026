import { ChangeEvent, JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import Field from '@/components/layout/admin/field';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { DataTable } from '@/components/layout/admin/data-table';
import { formatDateForInput } from '@/utils/shared/date';
import { Column } from '@/types/uis/Column';
import { GoodsReceiptBatch } from '@/types/inventories/receipts/uis/GoodsReceiptBatch';
import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { UseGoodsReceiptDetailLogicReturn } from '@/hooks/inventories/goods-receipts/use-goods-receipt-logic';
import GoodsReceiptStatusBadge from './goods-receipt-status-badge';
import { ProductSelectionGoodsReceiptModal } from '../product-selection-goods-receipt-modal';

// Extends trực tiếp Interface, chỉ khai báo thêm data tĩnh
interface GoodsReceiptDetailUiProps extends UseGoodsReceiptDetailLogicReturn {
	products: ProductForGoodsReceipt[];
}

export function GoodsReceiptDetailUi({
	form,
	batches,
	isView,
	isCreate,
	totalQuantity,
	totalAmount,
	products,
	updateReceiptField,
	handleSubmit,
	handleProductSelection,
	handleRedirectToBatchDetail,
	updateBatch,
}: GoodsReceiptDetailUiProps): JSX.Element {
	const itemColumns: Column<GoodsReceiptBatch>[] = [
		{ key: 'productName', header: 'Tên sản phẩm' },
		{
			key: 'batchNumber',
			header: 'Mã lô',
			render: (item: GoodsReceiptBatch): JSX.Element => (
				<Input
					value={item.batchNumber}
					disabled={isView}
					onChange={(e: ChangeEvent<HTMLInputElement>): void => {
						updateBatch(item.id, { batchNumber: e.target.value });
					}}
				/>
			),
		},
		{
			key: 'quantity',
			header: 'Số lượng',
			render: (item: GoodsReceiptBatch): JSX.Element => (
				<span className='text-slate-700 font-medium'>{item.quantity}</span>
			),
		},
		{
			key: 'unitPrice',
			header: 'Đơn giá',
			render: (item: GoodsReceiptBatch): JSX.Element => (
				<span className='text-slate-700 font-medium'>{item.unitPrice}</span>
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
						updateBatch(item.id, { expiredAt: e.target.value });
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
						value={formatDateForInput(form.importDate)}
						disabled={isView}
						onChange={(e: ChangeEvent<HTMLInputElement>): void =>
							updateReceiptField('importDate', e.target.value)
						}
					/>
				</Field>
			</div>

			<div className='mt-4'>
				<Field label='Ghi chú đợt nhập'>
					<RichTextEditor
						value={form?.note || ''}
						disabled={isView}
						onChange={(val: string): void => updateReceiptField('note', val)}
					/>
				</Field>
			</div>

			<div className='mt-8'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='font-bold text-lg'>Danh sách lô hàng chi tiết</h2>
					{isCreate && (
						<ProductSelectionGoodsReceiptModal
							products={products}
							onSelectProduct={handleProductSelection}
							trigger={<Button className='cursor-pointer'>Thêm lô hàng mới</Button>}
						/>
					)}
				</div>

				<DataTable<GoodsReceiptBatch>
					data={batches}
					columns={itemColumns}
					getRowKey={(item: GoodsReceiptBatch): number => item.id}
					onRowClick={(row: GoodsReceiptBatch): void => {
						handleRedirectToBatchDetail(row.id, row.isNew ? 'create' : 'view');
					}}
				/>
			</div>

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
