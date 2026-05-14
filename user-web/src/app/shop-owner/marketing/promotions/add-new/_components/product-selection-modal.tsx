import { JSX } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/layout/admin/data-table';
import { UseTableSelectionReturn } from '@/hooks/share/use-table-selection';
import { ProductPromotionForSelection } from '@/types/marketing/shop-promotions/ProductPromotionForSelection';
import { Column } from '@/types/uis/Column';

interface ProductSelectionModalProps {
	isOpen: boolean;
	onClose: () => void;
	availableProducts: ProductPromotionForSelection[];
	selection: UseTableSelectionReturn<number>;
	onConfirm: () => void;
}

export function ProductSelectionModal({
	isOpen,
	onClose,
	availableProducts,
	selection,
	onConfirm,
}: ProductSelectionModalProps): JSX.Element {
	const columns: Column<ProductPromotionForSelection>[] = [
		{
			key: 'id',
			header: 'Mã SP',
			render: (row: ProductPromotionForSelection): JSX.Element => (
				<span className='text-muted-foreground'>#{row.id}</span>
			),
		},
		{
			key: 'productVariantName',
			header: 'Tên Sản Phẩm',
			render: (row: ProductPromotionForSelection): JSX.Element => (
				<span className='font-medium'>{row.productVariantName}</span>
			),
		},
		{
			key: 'salePrice',
			header: 'Giá Bán',
			render: (row: ProductPromotionForSelection): JSX.Element => (
				<span className='text-red-600'>{row.salePrice.toLocaleString()} đ</span>
			),
		},
	];

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => !open && onClose()}
		>
			<DialogContent className='max-w-4xl'>
				<DialogHeader>
					<DialogTitle className='text-xl'>Chọn sản phẩm khuyến mãi</DialogTitle>
				</DialogHeader>

				<div className='mt-4'>
					<DataTable
						data={availableProducts}
						columns={columns}
						getRowKey={(row: ProductPromotionForSelection): number => row.id}
						selectable={{
							selected: selection.selected,
							onToggle: selection.onToggle,
							onToggleAll: selection.onToggleAll,
							isAllSelected: selection.isAllSelected,
							isIndeterminate: selection.isIndeterminate,
						}}
						tableHeight={400}
					/>
				</div>

				<DialogFooter className='mt-4'>
					<div className='flex items-center justify-between w-full'>
						<span className='text-sm text-muted-foreground'>
							Đã chọn:{' '}
							<strong className='text-blue-600'>{selection.selected.length}</strong>{' '}
							sản phẩm
						</span>
						<div className='flex gap-2'>
							<Button
								variant='outline'
								onClick={onClose}
								className='cursor-pointer'
							>
								Hủy
							</Button>
							<Button
								onClick={onConfirm}
								className='cursor-pointer'
							>
								Xác nhận
							</Button>
						</div>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
