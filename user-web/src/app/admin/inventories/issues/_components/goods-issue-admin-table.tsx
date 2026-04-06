import { DataTable } from '@/components/layout/admin/data-table';
import { Column } from '@/types/uis/Column';
import { JSX } from 'react';
import { GoodsIssueList } from '@/types/inventories/issues/uis/GoodsIssueList';
import { GoodsIssueSortField } from '@/types/inventories/issues/uis/GoodsIssueSortField';
import { getGoodsIssueTypeLabel } from '@/types/inventories/issues/uis/GoodsIssueTypeLabel';
import GoodsIssueStatusBadge from '@/app/admin/inventories/issues/_components/goods-issue-status-badge';
import GoodsIssueActions from './goods-issue-actions';
import useConfirmDelete from '@/hooks/share/admin/use-confirm-delete';
import DeleteConfirmModal from '@/components/layout/admin/delete-confirm-modal';

interface Props {
	issues: GoodsIssueList[];
	handleSort: (field: GoodsIssueSortField) => void;
	renderSortIcon: (field: GoodsIssueSortField) => JSX.Element | null;

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
	const { selectedItem, isOpen, openConfirm, closeConfirm } = useConfirmDelete<GoodsIssueList>();

	function handleExecuteDelete(): void {
		if (selectedItem) {
			console.log('Thực hiện gọi API xóa ID:', selectedItem.id);
			// Logic gọi API...
			closeConfirm();
		}
	}

	const goodsIssueColumns: Column<GoodsIssueList>[] = [
		{
			key: 'code',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Mã phiếu</span>
					{renderSortIcon('code')}
				</div>
			),
			onHeaderClick: function (): void {
				handleSort('code');
			},
		},
		{
			key: 'type',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Loại xuất</span>
					{renderSortIcon('type')}
				</div>
			),
			onHeaderClick: function (): void {
				handleSort('type');
			},
			render: function (row: GoodsIssueList): string {
				return getGoodsIssueTypeLabel(row.type);
			},
		},
		{
			key: 'exportDate',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Ngày xuất</span>
					{renderSortIcon('exportDate')}
				</div>
			),
			onHeaderClick: function (): void {
				handleSort('exportDate');
			},
			render: function (row: GoodsIssueList): string {
				return new Date(row.exportDate).toLocaleDateString('vi-VN');
			},
		},
		{
			key: 'totalQuantity',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Số lượng</span>
					{renderSortIcon('totalQuantity')}
				</div>
			),
			onHeaderClick: function (): void {
				handleSort('totalQuantity');
			},
			render: function (row: GoodsIssueList): string {
				return row.totalQuantity.toLocaleString('vi-VN');
			},
		},
		{
			key: 'totalAmount',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Tổng tiền</span>
					{renderSortIcon('totalAmount')}
				</div>
			),
			onHeaderClick: function (): void {
				handleSort('totalAmount');
			},
			render: function (row: GoodsIssueList): string {
				return row.totalAmount.toLocaleString('vi-VN') + ' ₫';
			},
		},
		{
			key: 'status',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Trạng thái</span>
					{renderSortIcon('status')}
				</div>
			),
			onHeaderClick: (): void => {
				handleSort('status');
			},
			render: (row: GoodsIssueList): React.JSX.Element => {
				return <GoodsIssueStatusBadge status={row.status} />;
			},
		},
		{
			key: 'actions',
			header: <span className='text-right block px-4'>Hành động</span>,
			render: (row: GoodsIssueList): JSX.Element => {
				return (
					<GoodsIssueActions
						id={row.id}
						onEdit={onEdit}
						onDelete={(): void => {
							openConfirm(row);
						}}
					/>
				);
			},
		},
	];

	return (
		<>
			<DataTable<GoodsIssueList>
				data={issues}
				columns={goodsIssueColumns}
				getRowKey={(row: GoodsIssueList): number => row.id}
				onRowClick={(row: GoodsIssueList): void => onView(row.id)}
			/>

			<DeleteConfirmModal
				isOpen={isOpen}
				title='Xác nhận xóa phiếu xuất?'
				description={`Bạn có chắc chắn muốn xóa phiếu ${selectedItem?.code}? Hành động này không thể hoàn tác.`}
				onClose={closeConfirm}
				onConfirm={handleExecuteDelete}
			/>
		</>
	);
}
