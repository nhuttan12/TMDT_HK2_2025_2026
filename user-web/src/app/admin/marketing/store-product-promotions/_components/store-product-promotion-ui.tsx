import { JSX } from 'react';
import { Column } from '@/types/uis/Column';

import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import { DataTable } from '@/components/layout/admin/data-table';
import Pagination from '@/components/layout/share/pagination';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { UseStoreProductPromotionLogicReturn } from '@/hooks/marketing/store-product-promotions/use-store-product-promotion-logic';
import { StoreProductPromotion } from '@/types/marketing/store-product-promotions/StoreProductPromotion';
import { formatDateTimeWithBrackets } from '@/utils/shared/date';
import { Switch } from '@/components/ui/switch';
import { StatusModal } from '@/components/layout/share/status-modal';
import { getStatusModalTitle } from '@/utils/shared/mappers/modalTitleMap';

interface Props extends UseStoreProductPromotionLogicReturn {
	promotions: StoreProductPromotion[];
}

export default function StoreProductPromotionUi({
	promotions,
	currentPage,
	changePage,
	filterSchema,
	handleAddNewPromotion,
	handleEditPromotion,
	handleDeletePromotion,
	selected,
	onToggle,
	onToggleAll,
	isAllSelected,
	isIndeterminate,

	modal,
	handleTriggerToggleStatus,
	handleConfirmToggleStatus,
	handleCancelModal,
}: Props): JSX.Element {
	// Khai báo cột cho DataTable
	const columns: Column<StoreProductPromotion>[] = [
		{
			key: 'productName',
			header: 'Tên Sản Phẩm',
			render: (row: StoreProductPromotion): JSX.Element => (
				<span className='font-medium'>{row.productName}</span>
			),
		},
		{
			key: 'promotionPrice',
			header: 'Giá Khuyến Mãi',
			render: (row) => (
				<span className='text-red-600 font-semibold'>
					{row.promotionPrice.toLocaleString()} đ
				</span>
			),
		},
		{
			key: 'discount',
			header: 'Giảm giá',
			render: (row: StoreProductPromotion): JSX.Element => <span>{row.discount}%</span>,
		},
		{
			key: 'status',
			header: 'Trạng thái',
			render: (row: StoreProductPromotion): JSX.Element => (
				<div onClick={(e) => e.stopPropagation()}>
					{/* Bọc div stopPropagation để bấm Switch không bị trigger sự kiện Click dòng (onRowClick) của Table */}
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
			header: 'Ngày tạo',
			render: (row: StoreProductPromotion): JSX.Element => (
				<span className='text-muted-foreground'>
					{formatDateTimeWithBrackets(row.createdAt)}
				</span>
			),
		},
		{
			key: 'updatedAt',
			header: 'Cập nhật',
			render: (row: StoreProductPromotion): JSX.Element => (
				<span className='text-muted-foreground'>
					{formatDateTimeWithBrackets(row.updatedAt)}
				</span>
			),
		},
		// {
		// 	key: 'actions',
		// 	header: <span className='text-right block'>Hành động</span>,
		// 	render: (row: StoreProductPromotion): JSX.Element => (
		// 		<div className='flex justify-end gap-2'>
		// 			<Button
		// 				variant='ghost'
		// 				size='icon'
		// 				onClick={() => handleEditPromotion(row.id)}
		// 			>
		// 				<Pencil
		// 					size={16}
		// 					className='text-blue-600'
		// 				/>
		// 			</Button>
		// 			<Button
		// 				variant='ghost'
		// 				size='icon'
		// 				onClick={() => handleDeletePromotion(row.id)}
		// 			>
		// 				<Trash
		// 					size={16}
		// 					className='text-red-600'
		// 				/>
		// 			</Button>
		// 		</div>
		// 	),
		// },
	];

	return (
		<div className='space-y-4'>
			{/* Header tích hợp sẵn thanh Search và Modal Filter */}
			<AdminTableHeader
				title='Chương trình khuyến mãi'
				description='Quản lý giá ưu đãi và các đợt giảm giá sản phẩm của cửa hàng.'
				searchPlaceholder='Tìm theo tên sản phẩm...'
				searchKey='productName'
				addLabel='+ Tạo khuyến mãi mới'
				onAdd={handleAddNewPromotion}
				filter={true}
				filterField={filterSchema}
			/>

			{/* Bảng Dữ Liệu */}
			<div className='bg-white rounded-lg border'>
				<DataTable
					data={promotions}
					columns={columns}
					getRowKey={(row: StoreProductPromotion): number => row.id}
					onRowClick={(row: StoreProductPromotion): void => handleEditPromotion(row.id)}
					selectable={{
						selected,
						onToggle,
						onToggleAll,
						isAllSelected,
						isIndeterminate,
					}}
				/>
			</div>

			{/* Phân trang */}
			<Pagination
				currentPage={currentPage}
				totalPages={10} // Giả lập
				onPageChange={changePage}
			/>

			{/* MODAL XÁC NHẬN Ở DƯỚI CÙNG */}
			<StatusModal
				isOpen={modal.isOpen}
				onClose={handleCancelModal}
				status={modal.status}
				title={getStatusModalTitle(modal.status)}
				description={modal.message}
				confirmText={modal.status === 'warning' ? 'Hủy' : 'Đóng'}
			>
				{/* Nút Xác nhận chỉ hiện ra khi trạng thái là warning (Cảnh báo hỏi có chắc không) */}
				{modal.status === 'warning' && (
					<div className='flex w-full justify-center mt-4'>
						<Button
							onClick={handleConfirmToggleStatus}
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
