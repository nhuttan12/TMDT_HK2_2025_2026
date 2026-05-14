import { JSX } from 'react';
import { Column } from '@/types/uis/Column';

import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import { DataTable } from '@/components/layout/admin/data-table';
import Pagination from '@/components/layout/share/pagination';
import { Button } from '@/components/ui/button';
import { UseShopProductPromotionLogicReturn } from '@/hooks/marketing/shop-promotions/use-shop-product-promotion-logic';
import { ShopProductPromotion } from '@/types/marketing/shop-promotions/ShopProductPromotion';
import { formatDateTimeWithBrackets } from '@/utils/shared/date';
import { Switch } from '@/components/ui/switch';
import { StatusModal } from '@/components/layout/share/status-modal';
import { getStatusModalTitle } from '@/utils/shared/mappers/modalTitleMap';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';

interface Props extends UseShopProductPromotionLogicReturn {
	promotions: ShopProductPromotion[];
	mode: AdminFormType;
}

export default function ShopProductPromotionUi({
	promotions,
	mode,

	currentPage,
	changePage,
	filterSchema,
	handleViewProductVariant,
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
	const columns: Column<ShopProductPromotion>[] = [
		{
			key: 'productName',
			header: 'Tên Sản Phẩm',
			render: (row: ShopProductPromotion): JSX.Element => (
				<span className='font-medium'>{row.productName}</span>
			),
		},
		{
			key: 'salePrice',
			header: 'Giá bán',
			render: (row: ShopProductPromotion): JSX.Element => (
				<p className='text-muted-foreground line-through'>
					{row.salePrice.toLocaleString()} đ
				</p>
			),
		},
		{
			key: 'discountPrice',
			header: 'Giá Khuyến Mãi',
			render: (row: ShopProductPromotion): JSX.Element => (
				<span className='text-red-600 font-semibold'>
					{row.discountPrice.toLocaleString()} đ
				</span>
			),
		},
		{
			key: 'discount',
			header: 'Giảm giá',
			render: (row: ShopProductPromotion): JSX.Element => <span>{row.discount}%</span>,
		},
		{
			key: 'status',
			header: 'Trạng thái',
			render: (row: ShopProductPromotion): JSX.Element => (
				<div onClick={(e) => e.stopPropagation()}>
					{/* Bọc div stopPropagation để bấm Switch không bị trigger sự kiện Click dòng (onRowClick) của Table */}
					<Switch
						checked={row.status}
						onCheckedChange={() => handleTriggerToggleStatus(row)}
						disabled={mode === 'view'}
						className={
							mode === 'view' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
						}
					/>
				</div>
			),
		},
		{
			key: 'createdAt',
			header: 'Ngày tạo',
			render: (row: ShopProductPromotion): JSX.Element => (
				<span className='text-muted-foreground'>
					{formatDateTimeWithBrackets(row.createdAt)}
				</span>
			),
		},
		{
			key: 'updatedAt',
			header: 'Cập nhật',
			render: (row: ShopProductPromotion): JSX.Element => (
				<span className='text-muted-foreground'>
					{formatDateTimeWithBrackets(row.updatedAt)}
				</span>
			),
		},
	];

	return (
		<div className='space-y-4'>
			{/* Header tích hợp sẵn thanh Search và Modal Filter */}
			<AdminTableHeader
				title='Danh sách sản phẩm khuyến mãi của chương trình'
				description='Quản lý thông tin của sản phẩm trong đợt ưu đãi của cửa hàng.'
				searchPlaceholder='Tìm theo tên sản phẩm...'
				searchKey='productName'
				filter={true}
				filterField={filterSchema}
			/>

			{/* Bảng Dữ Liệu */}
			<div className='bg-white rounded-lg border'>
				<DataTable
					data={promotions}
					columns={columns}
					getRowKey={(row: ShopProductPromotion): number => row.id}
					onRowClick={(row: ShopProductPromotion): void => {
						handleViewProductVariant(row.productId, row.productVariantId);
					}}
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
