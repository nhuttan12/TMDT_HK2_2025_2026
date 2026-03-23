import { DataTable } from '@/components/layout/admin/data-table';
import { getGoodsReceiptStatusLabel } from '@/types/inventories/receipts/GoodsReceiptStatus';
import { Column } from '@/types/uis/Column';
import { JSX, useState } from 'react';
import { GoodsReceiptList } from '@/types/inventories/receipts/GoodsReceiptList';
import { CategoryAdminSortField } from '@/types/categories/admin/CategoryAdminSort';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';

interface Props {
	receipts: GoodsReceiptList[];
	handleSort: (field: CategoryAdminSortField) => void;
	renderSortIcon: (field: CategoryAdminSortField) => JSX.Element | null;

	onView: (id: number) => void;
	onEdit: (id: number) => void;
}

export default function GoodsReceiptAdminTable({
	receipts,
	handleSort,
	renderSortIcon,
	onView,
	onEdit,
}: Props): JSX.Element {
	const [selected, setSelected] = useState<number[]>([]);

	const toggleSelect = (receiptID: number): void => {
		setSelected((prev: number[]): number[] =>
			prev.includes(receiptID)
				? prev.filter((x: number): boolean => x !== receiptID)
				: [...prev, receiptID],
		);
	};

	const toggleSelectAll = (): void => {
		if (selected.length === receipts.length) {
			setSelected([]);
		} else {
			setSelected(receipts.map((i: GoodsReceiptList): number => i.id));
		}
	};

	const goodsReceiptColumns: Column<GoodsReceiptList>[] = [
		{
			key: 'code',
			header: 'Mã phiếu',
		},
		{
			key: 'supplierName',
			header: 'Nhà cung cấp',
		},
		{
			key: 'importDate',
			header: 'Ngày nhập',
			render: (row: GoodsReceiptList): string =>
				new Date(row.importDate).toLocaleDateString('vi-VN'),
		},
		{
			key: 'totalQuantity',
			header: 'SL',
		},
		{
			key: 'totalAmount',
			header: 'Tổng tiền',
			render: (row: GoodsReceiptList): string => row.totalAmount.toLocaleString('vi-VN') + ' ₫',
		},
		{
			key: 'status',
			header: 'Trạng thái',
			render: (row: GoodsReceiptList): React.JSX.Element => {
				const label: string = getGoodsReceiptStatusLabel(row.status);

				return (
					<span
						className={`px-2 py-1 rounded text-sm ${
							row.status === 'draft'
								? 'bg-gray-200'
								: row.status === 'confirmed'
									? 'bg-green-200'
									: 'bg-red-200'
						}`}
					>
					{label}
				</span>
				);
			},
		},
		{
			key: 'actions',
			header: <span className='text-right block'>Hành động</span>,
			render: (row: GoodsReceiptList): JSX.Element => (
				<div
					className='text-right'
					onClick={(e) => e.stopPropagation()}
				>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
							>
								<MoreHorizontal size={16} />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align='end'>
							<DropdownMenuItem onClick={() => onEdit(row.id)}>
								<Pencil
									size={14}
									className='mr-2'
								/>
								Chỉnh sửa
							</DropdownMenuItem>

							<DropdownMenuItem className='text-red-500'>
								<Trash
									size={14}
									className='mr-2'
								/>
								Xóa
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			),
		},
	];

	return (
		<DataTable<GoodsReceiptList>
			data={receipts}
			columns={goodsReceiptColumns}
			getRowKey={(row: GoodsReceiptList): number => row.id}
			onRowClick={(row: GoodsReceiptList): void => onView(row.id)}
			selectable={{
				selected: selected,
				onToggle: toggleSelect,
				onToggleAll: toggleSelectAll,
			}}
		/>
	);
}
