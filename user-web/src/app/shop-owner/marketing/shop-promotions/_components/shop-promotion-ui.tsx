import { JSX } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { StatusModal } from '@/components/layout/share/status-modal';
import { UseShopPromotionLogicReturn } from '@/hooks/marketing/shop-promotions/use-shop-promotion-logic';
import { ShopPromotion } from '@/types/marketing/shop-promotions/ShopPromotion';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';
import { getStatusModalTitle } from '@/utils/shared/mappers/modalTitleMap';
import { formatDateTimeWithBrackets } from '@/utils/shared/date';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import AdminTableAction from '@/components/layout/admin/admin-table-action';

interface Props extends UseShopPromotionLogicReturn {
	promotions: ShopPromotion[];
}

export default function ShopPromotionUi({
	promotions,
	selected,
	onToggle,
	onToggleAll,
	isAllSelected,
	isIndeterminate,
	modal,
	handleViewPromotion,
	handleAddPromotion,
	handleEditPromotion,
	handleDeletePromotion,
	handleTriggerToggleStatus,
	handleConfirmAction,
	handleCancelModal,
}: Props): JSX.Element {
	const columns: Column<ShopPromotion>[] = [
		{
			key: 'name',
			header: 'Tên Khuyến Mãi',
			render: (row: ShopPromotion): JSX.Element => (
				<span className='font-medium text-slate-900'>{row.name}</span>
			),
		},
		{
			key: 'arrange',
			header: 'Thời Gian Áp Dụng',
			render: (row: ShopPromotion): JSX.Element => (
				<div className='flex flex-col text-sm text-slate-600 gap-1'>
					<span>Từ: {formatDateTimeWithBrackets(row.arrange.fromDate)}</span>
					<span>Đến: {formatDateTimeWithBrackets(row.arrange.toDate)}</span>
				</div>
			),
		},
		{
			key: 'status',
			header: 'Trạng Thái',
			render: (row: ShopPromotion): JSX.Element => (
				<div onClick={(e) => e.stopPropagation()}>
					<Switch
						checked={row.status}
						onCheckedChange={() => handleTriggerToggleStatus(row)}
						className='cursor-pointer'
					/>
				</div>
			),
		},
		{
			key: 'createdAt',
			header: 'Ngày Tạo',
			render: (row: ShopPromotion): JSX.Element => (
				<span className='text-muted-foreground'>
					{new Date(row.createdAt).toLocaleDateString('vi-VN')}
				</span>
			),
		},
		{
			key: 'updatedAt',
			header: 'Cập Nhật',
			render: (row: ShopPromotion): JSX.Element => (
				<span className='text-muted-foreground'>
					{new Date(row.updatedAt).toLocaleDateString('vi-VN')}
				</span>
			),
		},
		{
			key: 'actions',
			header: <span className='text-right block'>Hành Động</span>,
			render: (row: ShopPromotion): JSX.Element => (
				<AdminTableAction
					id={row.id}
					onEdit={handleEditPromotion}
					onDelete={handleDeletePromotion}
				/>
			),
		},
	];

	return (
		<div className='space-y-4'>
			{/* Phần Table */}
			<AdminTableHeader
				title={'Quản lý chương trình khuyến mãi'}
				description={'Quản lý các chương trình khuyến mãi do chủ shop tạo ra.'}
				addLabel='+ Tạo chương trình khuyến mãi mới'
				onAdd={handleAddPromotion}
				filter={false}
			/>

			<div className='bg-white rounded-lg border'>
				<DataTable
					data={promotions}
					columns={columns}
					getRowKey={(row: ShopPromotion): number => row.id}
					onRowClick={(row: ShopPromotion): void => handleViewPromotion(row.id)}
					selectable={{
						selected,
						onToggle,
						onToggleAll,
						isAllSelected,
						isIndeterminate,
					}}
				/>
			</div>

			{/* Phần Modal Xác Nhận */}
			<StatusModal
				isOpen={modal.isOpen}
				onClose={handleCancelModal}
				status={modal.status}
				title={getStatusModalTitle(modal.status)}
				description={modal.message}
				confirmText={modal.status === 'warning' ? 'Hủy' : 'Đóng'}
			>
				{modal.status === 'warning' && (
					<div className='flex w-full justify-center mt-4'>
						<Button
							onClick={handleConfirmAction}
							className='bg-amber-600 hover:bg-amber-700 text-white min-w-[120px] cursor-pointer'
						>
							Xác nhận
						</Button>
					</div>
				)}
			</StatusModal>
		</div>
	);
}
