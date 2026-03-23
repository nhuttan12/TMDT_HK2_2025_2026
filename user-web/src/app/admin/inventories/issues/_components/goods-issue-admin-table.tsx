import { DataTable } from '@/components/layout/admin/data-table';
import { getGoodsIssueStatusLabel } from '@/types/inventories/issues/GoodsIssueStatus';
import { Column } from '@/types/uis/Column';
import { JSX, useState } from 'react';
import { GoodsIssueList } from '@/types/inventories/issues/GoodsIssueList';
import { CategoryAdminSortField } from '@/types/categories/admin/CategoryAdminSort';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';

interface Props {
	issues: GoodsIssueList[];
	handleSort: (field: CategoryAdminSortField) => void;
	renderSortIcon: (field: CategoryAdminSortField) => JSX.Element | null;

	onView: (id: number) => void;
	onEdit: (id: number) => void;
}

export default function GoodsIssueAdminTable({
	issues,
	handleSort,
	renderSortIcon,
	onView,
	onEdit,
}: Props): JSX.Element {
	const [selected, setSelected] = useState<number[]>([]);

	const toggleSelect = (issueID: number): void => {
		setSelected((prev: number[]): number[] =>
			prev.includes(issueID)
				? prev.filter((x: number): boolean => x !== issueID)
				: [...prev, issueID],
		);
	};

	const toggleSelectAll = (): void => {
		if (selected.length === issues.length) {
			setSelected([]);
		} else {
			setSelected(issues.map((i: GoodsIssueList): number => i.id));
		}
	};

	const goodsIssueColumns: Column<GoodsIssueList>[] = [
		{
			key: 'code',
			header: 'Mã phiếu',
		},
		{
			key: 'customerName',
			header: 'Khách hàng',
		},
		{
			key: 'exportDate',
			header: 'Ngày xuất',
			render: (row: GoodsIssueList): string =>
				new Date(row.exportDate).toLocaleDateString('vi-VN'),
		},
		{
			key: 'totalQuantity',
			header: 'SL',
		},
		{
			key: 'totalAmount',
			header: 'Tổng tiền',
			render: (row: GoodsIssueList): string => row.totalAmount.toLocaleString('vi-VN') + ' ₫',
		},
		{
			key: 'status',
			header: 'Trạng thái',
			render: (row: GoodsIssueList): React.JSX.Element => {
				const label: string = getGoodsIssueStatusLabel(row.status);

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
			render: (row: GoodsIssueList): JSX.Element => (
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
		<DataTable<GoodsIssueList>
			data={issues}
			columns={goodsIssueColumns}
			getRowKey={(row: GoodsIssueList): number => row.id}
			onRowClick={(row: GoodsIssueList): void => onView(row.id)}
			selectable={{
				selected: selected,
				onToggle: toggleSelect,
				onToggleAll: toggleSelectAll,
			}}
		/>
	);
}
