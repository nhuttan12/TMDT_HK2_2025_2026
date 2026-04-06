'use client'

import React, { ChangeEvent, JSX } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
import { ProductBatchReceiptFormType } from '@/types/inventories/receipts/uis/ProductBatchReceiptFormType';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';
import { getBatchItemStatusLabel } from '@/types/inventories/receipts/uis/BatchItemStatusLabel';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { BatchItemStatus } from '@/types/inventories/receipts/uis/BatchItemStatus';

interface Props {
	data: BatchItemSerial[];
	isView: boolean;
	mode: ProductBatchReceiptFormType;
	onUpdate: (id: number, fields: Partial<BatchItemSerial>) => void;
	onRemove: (id: number) => void;
	onRedirect: (row: BatchItemSerial) => void;
}

export function ProductVariantListInBatchTableUI({
	data,
	isView,
	onUpdate,
	onRemove,
	onRedirect,
}: Props): React.JSX.Element {
	const columns: Column<BatchItemSerial>[] = [
		{
			key: 'productVariantName',
			header: 'Biến thể',
			render: (row: BatchItemSerial): JSX.Element => <span>{row.productVariantName}</span>,
		},
		{
			key: 'serialNumber',
			header: 'Serial *',
			render: (row: BatchItemSerial): JSX.Element =>
				isView ? (
					<span>{row.serialNumber}</span>
				) : (
					<Input
						value={row.serialNumber}
						onChange={(e: ChangeEvent<HTMLInputElement>): void =>
							onUpdate(row.id, { serialNumber: e.target.value })
						}
					/>
				),
		},
		{
			key: 'appearanceCondition',
			header: 'Tình trạng',
			render: (row: BatchItemSerial): JSX.Element =>
				isView ? (
					<span>{row.appearanceCondition}</span>
				) : (
					<Input
						placeholder='Ví dụ: Mới 100%...'
						onChange={(e: ChangeEvent<HTMLInputElement>): void =>
							onUpdate(row.id, { appearanceCondition: e.target.value })
						}
					/>
				),
		},
		{
			key: 'status',
			header: 'Trạng thái',
			render: (row: BatchItemSerial): JSX.Element =>
				isView ? (
					<span>{getBatchItemStatusLabel(row.status)}</span>
				) : (
					<Select
						value={row.status}
						onValueChange={(value: BatchItemStatus): void =>
							onUpdate(row.id, { status: value })
						}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='in_stock'>Trong kho</SelectItem>
							<SelectItem value='sold'>Đã bán</SelectItem>
							<SelectItem value='defective'>Lỗi</SelectItem>
						</SelectContent>
					</Select>
				),
		},
		{
			key: 'id',
			header: '',
			render: (row: BatchItemSerial): JSX.Element => (
				<Button
					variant='ghost'
					size='icon'
					className='text-red-500 hover:text-red-700'
					onClick={(): void => onRemove(row.id)}
				>
					<Trash2 size={18} />
				</Button>
			),
		},
	];

	return (
		<DataTable<BatchItemSerial>
			data={data}
			columns={columns}
			getRowKey={(row: BatchItemSerial): number => {
				return row.id;
			}}
			tableHeight={400}
			onRowClick={onRedirect}
		/>
	);
}
