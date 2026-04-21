'use client';

import { JSX } from 'react';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';
import { Column } from '@/types/uis/Column';
import { useTableSelection } from '@/hooks/share/use-table-selection';
import { DataTable } from '@/components/layout/admin/data-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ProductBatchItemModalProps {
	variants: ProductVariantRow[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSelect: (items: ProductVariantRow[]) => void;
}

const variantColumns: Column<ProductVariantRow>[] = [
	{
		key: 'name',
		header: 'Tên biến thể',
	},
	{
		key: 'sku',
		header: 'SKU',
	},
];

export function ProductBatchItemModal({
	variants,
	open,
	onOpenChange,
	onSelect,
}: ProductBatchItemModalProps): JSX.Element {
	const allKeys: number[] = variants.map((v: ProductVariantRow): number => v.id);

	const { selected, toggle, toggleAll, isAllSelected, isIndeterminate } =
		useTableSelection<number>(allKeys);

	const handleConfirm = (): void => {
		const selectedVariants: ProductVariantRow[] = variants.filter(
			(v: ProductVariantRow): boolean => selected.includes(v.id),
		);

		onSelect(selectedVariants);
		onOpenChange(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className='max-w-3xl'>
				<DialogHeader>
					<DialogTitle>Chọn biến thể sản phẩm</DialogTitle>
				</DialogHeader>

				<DataTable<ProductVariantRow>
					data={variants}
					columns={variantColumns}
					getRowKey={(row: ProductVariantRow): number => row.id}
					selectable={{
						selected,
						onToggle: toggle,
						onToggleAll: toggleAll,
						isAllSelected,
						isIndeterminate,
					}}
				/>

				<div className='flex justify-end gap-2 mt-4'>
					<Button
						variant='outline'
						onClick={(): void => onOpenChange(false)}
					>
						Hủy
					</Button>
					<Button
						onClick={handleConfirm}
						disabled={!selected.length}
					>
						Xác nhận
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
