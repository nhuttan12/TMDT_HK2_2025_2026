import { DataTable } from '@/components/layout/admin/data-table';
import { getGoodsReceiptStatusLabel } from '@/types/inventories/receipts/uis/GoodsReceiptStatus';
import { Column } from '@/types/uis/Column';
import { JSX } from 'react';
import { GoodsReceiptList } from '@/types/inventories/receipts/uis/GoodsReceiptList';
import { GoodsReceiptSortField } from '@/types/inventories/receipts/uis/GoodsReceiptSortField';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { formatDateTimeWithBrackets } from '@/utils/shared/date';
import AdminTableAction from '@/components/layout/admin/admin-table-action';

interface Props {
	receipts: GoodsReceiptList[];
	handleSort: (field: GoodsReceiptSortField) => void;
	renderSortIcon: (field: GoodsReceiptSortField) => JSX.Element | null;

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
	const goodsReceiptColumns: Column<GoodsReceiptList>[] = [
		{
			key: 'code',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Mã phiếu</span>
					{renderSortIcon('code')}
				</div>
			),
			onHeaderClick: (): void => handleSort('code'),
		},
		{
			key: 'supplierName',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Nhà cung cấp</span>
					{renderSortIcon('supplierName')}
				</div>
			),
			onHeaderClick: (): void => handleSort('supplierName'),
		},
		{
			key: 'importDate',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Ngày nhập</span>
					{renderSortIcon('importDate')}
				</div>
			),
			onHeaderClick: (): void => handleSort('importDate'),
			render: (row: GoodsReceiptList): string => formatDateTimeWithBrackets(row.importDate),
		},
		{
			key: 'totalBatches',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Số lô</span>
					{renderSortIcon('totalBatches')}
				</div>
			),
			onHeaderClick: (): void => handleSort('totalBatches'),
		},
		{
			key: 'totalQuantity',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Số lượng máy</span>
					{renderSortIcon('totalQuantity')}
				</div>
			),
			onHeaderClick: (): void => handleSort('totalQuantity'),
		},
		{
			key: 'totalAmount',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Tổng tiền</span>
					{renderSortIcon('totalAmount')}
				</div>
			),
			onHeaderClick: (): void => handleSort('totalAmount'),
			render: (row: GoodsReceiptList): string =>
				row.totalAmount.toLocaleString('vi-VN') + ' ₫',
		},
		{
			key: 'status',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Trạng thái</span>
					{renderSortIcon('status')}
				</div>
			),
			onHeaderClick: (): void => handleSort('status'),
			render: (row: GoodsReceiptList): React.JSX.Element => {
				const label: string = getGoodsReceiptStatusLabel(row.status);

				return (
					<span
						className={`px-2 py-1 rounded text-[12px] font-medium ${
							row.status === 'draft'
								? 'bg-amber-100 text-amber-700'
								: row.status === 'confirmed'
									? 'bg-emerald-100 text-emerald-700'
									: 'bg-rose-100 text-rose-700'
						}`}
					>
						{label}
					</span>
				);
			},
		},
		{
			key: 'createdAt',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Ngày tạo</span>
					{renderSortIcon('createdAt')}
				</div>
			),
			onHeaderClick: (): void => handleSort('createdAt'),
			render: (row: GoodsReceiptList): string => formatDateTimeWithBrackets(row.createdAt),
		},
		{
			key: 'actions',
			header: <span className='text-right block'>Hành động</span>,
			render: (row: GoodsReceiptList): JSX.Element => (
				<AdminTableAction
					id={row.id}
					onEdit={onEdit}
					onDelete={() => {}}
				/>
			),
		},
	];

	return (
		<DataTable<GoodsReceiptList>
			data={receipts}
			columns={goodsReceiptColumns}
			getRowKey={(row: GoodsReceiptList): number => row.id}
			onRowClick={(row: GoodsReceiptList): void => onView(row.id)}
		/>
	);
}
