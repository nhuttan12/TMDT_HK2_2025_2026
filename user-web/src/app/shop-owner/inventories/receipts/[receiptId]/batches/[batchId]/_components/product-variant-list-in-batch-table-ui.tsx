'use client';

import { DataTable } from '@/components/layout/admin/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BatchItem } from '@/types/inventories/receipts/uis/BatchItem';
import { ProductBatchReceiptFormType } from '@/types/inventories/receipts/uis/ProductBatchReceiptFormType';
import { Column } from '@/types/uis/Column';
import { Trash2 } from 'lucide-react';
import React, { ChangeEvent, JSX } from 'react';

interface Props {
	data: BatchItem[];
	isView: boolean;
	mode: ProductBatchReceiptFormType;
	onUpdate: (id: string, fields: Partial<BatchItem>) => void;
	onRemove: (id: string) => void;
	onRedirect?: (row: BatchItem) => void;
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

	const columns: Column<BatchItem>[] = [
		{
			key: 'productVariantName',
			header: 'Sản phẩm phân loại',
			render: (row: BatchItem): JSX.Element => <span>{row.productVariantName}</span>,
		},
		{
			key: 'costPrice',
			header: 'Giá nhập',
			render: (row: BatchItem): JSX.Element =>
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
		...(!isView
			? [
					{
						key: 'id',
						header: 'Hành động',
						render: (row: BatchItem): JSX.Element => (
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
		<DataTable<BatchItem>
			data={data}
			columns={columns}
			getRowKey={(row: BatchItem): string => {
				return row.id;
			}}
			tableHeight={400}
			onRowClick={onRedirect}
		/>
	);
}
