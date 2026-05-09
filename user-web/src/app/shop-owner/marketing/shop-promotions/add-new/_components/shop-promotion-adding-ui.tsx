import { JSX } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { UseShopPromotionAddingLogicReturn } from '@/hooks/marketing/shop-promotions/use-shop-promotion-adding-logic';
import { ProductPromotionForAdding } from '@/types/marketing/shop-promotions/ProductPromotionForAdding';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';
import { Plus, Trash2 } from 'lucide-react';
import { getProductVariantStatusLabel } from '@/utils/products/product-variant-status-label';
import { StatusModal } from '@/components/layout/share/status-modal';
import { getStatusModalTitle } from '@/utils/shared/mappers/modalTitleMap';
import { ProductSelectionModal } from './product-selection-modal';

interface Props extends UseShopPromotionAddingLogicReturn {
	availableProducts: ProductPromotionForAdding[];
}

export default function ShopPromotionAddingUi({
	availableProducts,
	form,
	selection,
	sorting,
	handleInputChange,
	handleDateChange,
	handleStatusChange,
	handleSubmit,
	isSubmitting,

	isModalOpen,
	openModal,
	closeModal,
	modalSelection,
	handleConfirmSelection,
	selectedProducts,
	handleDiscountPriceChange,
	handleRemoveProduct,

	statusModal,
}: Props): JSX.Element {
	// Định nghĩa Columns, tích hợp Sorting Header
	const columns: Column<ProductPromotionForAdding>[] = [
		{
			key: 'productVariantName',
			header: 'Tên Phân Loại / Sản Phẩm',
			render: (row: ProductPromotionForAdding): JSX.Element => (
				<span className='font-medium'>{row.productVariantName}</span>
			),
		},
		{
			key: 'salePrice',
			header: 'Giá Gốc',
			render: (row: ProductPromotionForAdding): JSX.Element => (
				<span className='text-muted-foreground line-through'>
					{row.salePrice.toLocaleString()} đ
				</span>
			),
		},
		{
			key: 'discountPrice',
			header: 'Giá Sau Giảm (VNĐ)',
			render: (row: ProductPromotionForAdding): JSX.Element => {
				// Kiểm tra lỗi Real-time để bôi đỏ Input
				const isError: boolean =
					row.discountPrice > 0 && row.discountPrice >= row.salePrice;

				return (
					<div
						data-no-row-click
						onClick={(e) => e.stopPropagation()}
					>
						<Input
							type='number'
							placeholder='Nhập giá...'
							value={row.discountPrice === 0 ? '' : row.discountPrice}
							onChange={(e) => handleDiscountPriceChange(row.id, e.target.value)}
							className={`w-36 transition-colors ${
								isError
									? 'border-red-500 bg-red-50 text-red-700 focus-visible:ring-red-500'
									: 'border-blue-200 focus-visible:ring-blue-500'
							}`}
						/>
						{isError && (
							<span className='text-xs text-red-500 mt-1 block'>
								Phải nhỏ hơn giá gốc
							</span>
						)}
					</div>
				);
			},
		},
		{
			key: 'discount',
			header: 'Mức Chênh Lệch',
			render: (row: ProductPromotionForAdding): JSX.Element => (
				<span
					className={`font-semibold ${row.discount > 0 ? 'text-green-600' : 'text-slate-400'}`}
				>
					{row.discount}%
				</span>
			),
		},
		{
			key: 'status',
			header: 'Trạng Thái',
			render: (row: ProductPromotionForAdding): JSX.Element => (
				<span>{getProductVariantStatusLabel(row.status)}</span>
			),
		},
		{
			key: 'actions',
			header: <span className='block text-right'>Xóa</span>,
			render: (row: ProductPromotionForAdding): JSX.Element => (
				<div className='flex justify-end'>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => handleRemoveProduct(row.id)}
					>
						<Trash2
							size={16}
							className='text-red-500'
						/>
					</Button>
				</div>
			),
		},
	];

	return (
		<div className='max-w-5xl mx-auto space-y-6'>
			<div className='mb-6'>
				<h1 className='text-2xl font-bold'>Thêm Mới Khuyến Mãi</h1>
				<p className='text-muted-foreground'>
					Tạo chương trình giảm giá và chọn sản phẩm áp dụng.
				</p>
			</div>
			<form
				onSubmit={handleSubmit}
				className='space-y-8'
			>
				{/* Block 1: Thông tin cấu hình */}
				<div className='bg-white p-6 rounded-lg border shadow-sm space-y-4'>
					<h2 className='text-lg font-semibold mb-4'>Thông tin cơ bản</h2>

					<div className='space-y-2'>
						<Label>Tên chương trình khuyến mãi</Label>
						<Input
							name='promotionName'
							value={form.promotionName}
							onChange={handleInputChange}
							placeholder='VD: Siêu Sale Sinh Nhật 4.4'
							required
						/>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-2'>
							<Label>Từ ngày</Label>
							<Input
								type='datetime-local'
								value={form.arrange.fromDate}
								onChange={(e) => handleDateChange('fromDate', e.target.value)}
								required
							/>
						</div>
						<div className='space-y-2'>
							<Label>Đến ngày</Label>
							<Input
								type='datetime-local'
								value={form.arrange.toDate}
								onChange={(e) => handleDateChange('toDate', e.target.value)}
								required
							/>
						</div>
					</div>

					<div className='flex items-center gap-3 pt-2'>
						<Switch
							checked={form.status}
							onCheckedChange={handleStatusChange}
						/>
						<Label>Kích hoạt ngay sau khi tạo</Label>
					</div>
				</div>

				{/* Block 2: Danh sách sản phẩm (DataTable) */}
				<div className='bg-white rounded-lg border shadow-sm overflow-hidden'>
					<div className='p-4 border-b bg-slate-50 flex justify-between items-center'>
						<div>
							<h2 className='text-lg font-semibold'>Sản phẩm áp dụng</h2>
							<p className='text-sm text-slate-500'>
								Thiết lập giá trị khuyến mãi cho từng sản phẩm
							</p>
						</div>
						<Button
							type={'button'}
							onClick={openModal}
							className='cursor-pointer bg-blue-600 hover:bg-blue-700'
						>
							<Plus
								size={16}
								className='mr-2'
							/>{' '}
							Thêm Sản Phẩm
						</Button>
					</div>

					{selectedProducts.length > 0 ? (
						<DataTable
							data={selectedProducts}
							columns={columns}
							getRowKey={(row: ProductPromotionForAdding): number => row.id}
						/>
					) : (
						<div className='p-12 text-center text-slate-500'>
							Chưa có sản phẩm nào được chọn. Vui lòng nhấn &#34;Thêm Sản Phẩm&#34; để
							bắt đầu.
						</div>
					)}
				</div>

				{/* Block 3: Action Buttons */}
				<div className='flex justify-end gap-4'>
					<Button
						type='button'
						variant='outline'
						onClick={() => window.history.back()}
					>
						Hủy bỏ
					</Button>
					<Button
						type='submit'
						disabled={isSubmitting || selectedProducts.length === 0}
					>
						{isSubmitting ? 'Đang lưu...' : 'Lưu Khuyến Mãi'}
					</Button>
				</div>
			</form>
			{/* Chèn Component Modal vào (Nó tự ẩn hiện qua prop isOpen) */}
			<ProductSelectionModal
				isOpen={isModalOpen}
				onClose={closeModal}
				availableProducts={availableProducts}
				selection={modalSelection}
				onConfirm={handleConfirmSelection}
			/>
			{/*THÊM STATUS MODAL CHO CẢNH BÁO LỖI VÀ THÀNH CÔNG*/}
			<StatusModal
				isOpen={statusModal.isOpen}
				onClose={statusModal.closeModal}
				status={statusModal.status}
				title={getStatusModalTitle(statusModal.status)}
				description={statusModal.message}
			/>
		</div>
	);
}
