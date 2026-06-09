'use client';

import { DataTable } from '@/components/layout/admin/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { BatchItemSerial } from '@/types/inventories/receipts/uis/BatchItemSerial';
import { BatchItemStatus } from '@/types/inventories/receipts/uis/BatchItemStatus';
import { ProductBatchReceiptFormType } from '@/types/inventories/receipts/uis/ProductBatchReceiptFormType';
import { Column } from '@/types/uis/Column';
import { Trash2 } from 'lucide-react';
import React, { ChangeEvent, JSX } from 'react';
import BatchItemStatusBadge from './batch-item-status-badge';

interface Props {
	data: BatchItemSerial[];
	isView: boolean;
	mode: ProductBatchReceiptFormType;
	onUpdate: (id: string, fields: Partial<BatchItemSerial>) => void;
	onRemove: (id: string) => void;
	onRedirect: (row: BatchItemSerial) => void;
}

export function ProductVariantListInBatchTableUI({
	data,
	isView,
	onUpdate,
	onRemove,
	onRedirect,
}: Props): React.JSX.Element {
	const handleCostPriceChange = (id: string, e: ChangeEvent<HTMLInputElement>): void => {
		const rawValue: string = e.target.value;

		if (rawValue === '') {
			onUpdate(id, { costPrice: 0 });
			return;
		}

		const numericValue: number = parseFloat(rawValue);
		if (!Number.isNaN(numericValue) && numericValue >= 0) {
			onUpdate(id, { costPrice: numericValue });
		}
	};

	const columns: Column<BatchItemSerial>[] = [
		{
			key: 'productVariantName',
			header: 'Sản phẩm phân loại',
			render: (row: BatchItemSerial): JSX.Element => <span>{row.productVariantName}</span>,
		},
		{
			key: 'serialNumber',
			header: 'Mã Serial *',
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
			key: 'costPrice',
			header: 'Giá nhập',
			render: (row: BatchItemSerial): JSX.Element =>
				isView ? (
					<span>{row.costPrice}</span>
				) : (
					<Input
						value={row.costPrice}
						onChange={(e: ChangeEvent<HTMLInputElement>): void =>
							handleCostPriceChange(row.id, e)
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
					<BatchItemStatusBadge status={row.status} />
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
		...(!isView
			? [
					{
						key: 'id',
						header: 'Hành động',
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
				]
			: []),
	];

	return (
		<DataTable<BatchItemSerial>
			data={data}
			columns={columns}
			getRowKey={(row: BatchItemSerial): string => {
				return row.id;
			}}
			tableHeight={400}
			onRowClick={onRedirect}
		/>
	);
}
