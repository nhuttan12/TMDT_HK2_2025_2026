'use client';

import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import Field from '@/components/layout/admin/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { ChangeEvent, FormEvent, JSX, useState } from 'react';
import GoodsReceiptStatusBadge from './goods-receipt-status-badge';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { Column } from '@/types/uis/Column';
import { GoodsReceiptBatch } from '@/types/inventories/receipts/uis/GoodsReceiptBatch';
import { DataTable } from '@/components/layout/admin/data-table';
import { GoodsReceiptDetail } from '@/types/inventories/receipts/uis/GoodsReceiptDetail';
import { formatDateForInpu } from '@/utils/shared/date';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';

export const emptyGoodsReceiptDetail: GoodsReceiptDetail = {
	id: 0,
	code: '',
	supplierID: 0,
	supplierName: '',
	importDate: '',
	importStatus: 'draft',
	batches: [],
};

export const mockGoodsReceiptDetails: GoodsReceiptDetail[] = [
	{
		id: 1,
		code: 'PNK-001',
		supplierID: 1,
		supplierName: 'Công ty ABC',
		importDate: new Date().toISOString(),
		importStatus: 'draft',
		note: 'Hàng test',
		batches: [
			{
				id: 1,
				productID: 101,
				productName: 'iPhone 15 Pro Max',
				batchNumber: 'BATCH-001',
				quantity: 10,
				unitPrice: 30000000,
				totalPrice: 300000000,
				manufacturedAt: '2025-01-01',
				expiredAt: undefined,
				isSerialInputted: true,
			},
			{
				id: 2,
				productID: 102,
				productName: 'Samsung S24 Ultra',
				batchNumber: 'BATCH-002',
				quantity: 5,
				unitPrice: 25000000,
				totalPrice: 125000000,
				isSerialInputted: false,
			},
		],
	},
	{
		id: 2,
		code: 'PNK-002',
		supplierID: 2,
		supplierName: 'Công ty XYZ',
		importDate: new Date().toISOString(),
		importStatus: 'confirmed',
		batches: [
			{
				id: 3,
				productID: 103,
				productName: 'MacBook Pro M3',
				batchNumber: 'BATCH-003',
				quantity: 3,
				unitPrice: 50000000,
				totalPrice: 150000000,
				manufacturedAt: '2024-12-01',
				isSerialInputted: true,
			},
		],
	},
	{
		id: 3,
		code: 'PNK-003',
		supplierID: 3,
		supplierName: 'Nhà cung cấp DEF',
		importDate: new Date().toISOString(),
		importStatus: 'cancelled',
		batches: [],
	},
	{
		id: 4,
		code: 'PNK-004',
		supplierID: 4,
		supplierName: 'Công ty GHI',
		importDate: new Date().toISOString(),
		importStatus: 'confirmed',
		note: 'Hàng nhập số lượng lớn',
		batches: [
			{
				id: 4,
				productID: 104,
				productName: 'Tai nghe Sony WH-1000XM5',
				batchNumber: 'BATCH-004',
				quantity: 20,
				unitPrice: 8000000,
				totalPrice: 160000000,
				expiredAt: undefined,
				isSerialInputted: false,
			},
			{
				id: 5,
				productID: 105,
				productName: 'Chuột Logitech MX Master 3S',
				batchNumber: 'BATCH-005',
				quantity: 15,
				unitPrice: 2500000,
				totalPrice: 37500000,
				isSerialInputted: false,
			},
		],
	},
];

interface Props {
	formType: AdminFormType;
}

export default function GoodsReceiptDetailClient({ formType }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const isView: boolean = formType === 'view';
	const isCreate: boolean = formType === 'create';

	const receipt: GoodsReceiptDetail = isCreate
		? emptyGoodsReceiptDetail
		: mockGoodsReceiptDetails[0];

	const [form, setForm] = useState<GoodsReceiptDetail>(receipt);
	const [batches, setBatches] = useState<GoodsReceiptBatch[]>(receipt.batches);

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
			batches,
		};

		console.log('Submit:', payload);
	};

	const handleChange = <K extends keyof GoodsReceiptDetail>(
		key: K,
		value: GoodsReceiptDetail[K],
	) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	const totalQuantity: number = batches.reduce(
		(sum: number, i: GoodsReceiptBatch) => sum + i.quantity,
		0,
	);
	const totalAmount: number = batches.reduce(
		(sum: number, i: GoodsReceiptBatch) => sum + i.totalPrice,
		0,
	);

	const handleRedirectToBatchDetail = (batchID: number): void => {
		router.push(`/admin/inventories/receipts/${form.id}/batches/${batchID}`);
	};

	const itemColumns: Column<GoodsReceiptBatch>[] = [
		{
			key: 'sku',
			header: 'SKU',
		},
		{
			key: 'productName',
			header: 'Tên sản phẩm',
		},
		{
			key: 'batchNumber',
			header: 'Mã lô',
			render: (item: GoodsReceiptBatch, rowIndex: number | undefined): JSX.Element => (
				<Input
					value={item.batchNumber}
					disabled={isView}
					onChange={(e: ChangeEvent<HTMLInputElement>): void => {
						const newItems: GoodsReceiptBatch[] = [...batches];
						newItems[rowIndex!].batchNumber = e.target.value;
						setBatches(newItems);
					}}
				/>
			),
		},
		{
			key: 'quantity',
			header: 'Số lượng',
			render: (
				item: GoodsReceiptBatch,
				rowIndex: number | undefined,
			): number | JSX.Element =>
				isView ? (
					item.quantity
				) : (
					<Input
						type='number'
						value={item.quantity}
						onChange={(e: ChangeEvent<HTMLInputElement>): void => {
							const qty: number = Number(e.target.value);
							const newItems: GoodsReceiptBatch[] = [...batches];
							newItems[rowIndex!].quantity = qty;
							newItems[rowIndex!].totalPrice = qty * newItems[rowIndex!].unitPrice;
							setBatches(newItems);
						}}
					/>
				),
		},
		{
			key: 'unitPrice',
			header: 'Đơn giá',
			render: (
				item: GoodsReceiptBatch,
				rowIndex: number | undefined,
			): string | JSX.Element =>
				isView ? (
					item.unitPrice.toLocaleString() + ' ₫'
				) : (
					<Input
						type='number'
						value={item.unitPrice}
						onChange={(e: ChangeEvent<HTMLInputElement>): void => {
							const price: number = Number(e.target.value);
							const newItems: GoodsReceiptBatch[] = [...batches];
							newItems[rowIndex!].unitPrice = price;
							newItems[rowIndex!].totalPrice = price * newItems[rowIndex!].quantity;
							setBatches(newItems);
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
			render: (item: GoodsReceiptBatch, rowIndex: number | undefined): JSX.Element => (
				<Input
					type='date'
					value={item.expiredAt || ''}
					disabled={isView}
					onChange={(e: ChangeEvent<HTMLInputElement>): void => {
						const newItems: GoodsReceiptBatch[] = [...batches];
						newItems[rowIndex!].expiredAt = e.target.value;
						setBatches(newItems);
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
						<Button
							onClick={(): void => {
								const newBatch: GoodsReceiptBatch = {
									id: Date.now(),
									productID: 0,
									productName: '',
									batchNumber: '',
									quantity: 1,
									unitPrice: 0,
									totalPrice: 0,
									isSerialInputted: false,
								};

								setBatches([...batches, newBatch]);
							}}
						>
							Thêm dòng hàng
						</Button>
					)}
				</div>

				<DataTable<GoodsReceiptBatch>
					data={batches}
					columns={itemColumns}
					getRowKey={(item: GoodsReceiptBatch): number => item.id}
					onRowClick={(row: GoodsReceiptBatch): void => handleRedirectToBatchDetail(row.id)}
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
