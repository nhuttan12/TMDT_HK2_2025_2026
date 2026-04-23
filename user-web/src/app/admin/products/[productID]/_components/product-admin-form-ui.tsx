import { ProductVariant } from '@/types/products/admin/variant/ProductVariant';
import React, { JSX } from 'react';
import { Column } from '@/types/uis/Column';
import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { Switch } from '@/components/ui/switch';
import { MultiImageUpload } from '@/components/image/admin/multi-image-upload';
import { DataTable } from '@/components/layout/admin/data-table';
import Image from 'next/image';
import { StatusModal } from '@/components/layout/share/status-modal';
import { MODAL_TITLE_MAP } from '@/utils/shared/mappers/modalTitleMap';
import Field from '@/components/layout/admin/field';
import { UseProductAdminFormLogicReturn } from '@/hooks/products/admin/use-product-admin-form-logic';

// Kế thừa toàn bộ interface từ hook
type Props = UseProductAdminFormLogicReturn;

export default function ProductAdminFormUI({
	form,
	isCreate,
	isView,
	isUpdate,
	selected,
	toggle,
	toggleAll,
	isAllSelected,
	isIndeterminate,
	handleInputChange,
	handleDescriptionChange,
	handleImagesChange,
	handleStatusChange,
	handleSubmit,
	handleRedirectToProductVariantDetail,
	handleAddNewVariant,
	handleTriggerDeleteVariant,
	handleEditVariant,
	modal,
	handleConfirmDelete,
	handleCancelDelete,
}: Props): JSX.Element {
	const productVariantColumns: Column<ProductVariant>[] = [
		{ key: 'name', header: 'Tên' },
		{ key: 'sku', header: 'SKU' },
		{ key: 'quantity', header: 'Tồn kho' },
		{
			key: 'costPrice',
			header: 'Giá nhập',
			render: (row: ProductVariant): string => row.costPrice.toLocaleString('vi-VN') + ' đ',
		},
		{
			key: 'salePrice',
			header: 'Giá bán',
			render: (row: ProductVariant): string => row.salePrice.toLocaleString('vi-VN') + ' đ',
		},
		{
			key: 'image',
			header: 'Ảnh',
			render: (row: ProductVariant): JSX.Element =>
				row.image ? (
					<Image
						src={row.image}
						alt={row.name}
						width={35}
						height={35}
						className='object-cover'
					/>
				) : (
					<span>—</span>
				),
		},
		{
			key: 'action',
			header: <span className='block px-4'>Thao tác</span>,
			render: (row: ProductVariant): JSX.Element => (
				<div className='flex justify-center items-center w-full gap-4'>
					<Button
						variant='link'
						size='lg'
						className='text-blue-600 p-0 h-auto font-medium cursor-pointer'
						onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
							e.stopPropagation();
							handleEditVariant(row.id);
						}}
					>
						Sửa
					</Button>
					<Button
						variant='link'
						size='lg'
						className='text-red-600 p-0 h-auto font-medium cursor-pointer'
						onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
							e.stopPropagation();
							e.preventDefault();
							handleTriggerDeleteVariant(row);
						}}
					>
						Xoá
					</Button>
				</div>
			),
		},
	];

	return (
		<>
			<AdminFormWrapper
				title='Quản lý sản phẩm'
				description='Quản lý thông tin chi tiết của sản phẩm'
				onSubmit={handleSubmit}
				actions={
					!isView && (
						<Button type='submit'>
							{isCreate ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}
						</Button>
					)
				}
			>
				<Field label='Tên sản phẩm'>
					<Input
						name='name'
						value={form.name}
						onChange={handleInputChange}
						disabled={isView}
					/>
				</Field>

				<Field label='Danh mục'>
					<Input
						type='number'
						name='categoryId'
						value={form.categoryId}
						onChange={handleInputChange}
						disabled={isView}
					/>
				</Field>

				<Field label='Nhà cung cấp'>
					<Input
						name='supplierName'
						value={form.supplierName}
						onChange={handleInputChange}
						disabled={isView}
					/>
				</Field>

				<Field label='Mô tả'>
					<RichTextEditor
						value={form.description}
						onChange={handleDescriptionChange}
						disabled={isView}
					/>
				</Field>

				{isUpdate && (
					<div className='flex items-center gap-3'>
						<Switch
							checked={form.status}
							onCheckedChange={handleStatusChange}
						/>
						<span>Hoạt động</span>
					</div>
				)}

				<Field label='Giá nhập'>
					<Input
						type='number'
						name='importPrice'
						value={form.importPrice}
						onChange={handleInputChange}
						disabled={isView}
					/>
				</Field>

				<Field label='Giảm giá'>
					<Input
						type='number'
						name='discount'
						value={form.discount}
						onChange={handleInputChange}
						disabled
					/>
				</Field>

				<Field label='Hình ảnh'>
					<MultiImageUpload
						value={form.images}
						onChange={handleImagesChange}
						disabled={isView}
					/>
				</Field>

				<div className='flex justify-between items-center mb-4'>
					<h2 className='font-bold text-lg'>Danh sách biến thể sản phẩm</h2>
					<Button
						onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
							e.preventDefault();
							handleAddNewVariant();
						}}
						className='cursor-pointer'
						disabled={isView}
					>
						Thêm biến thể
					</Button>
				</div>

				{!isCreate && form.productVariants && (
					<DataTable
						data={form.productVariants}
						columns={productVariantColumns}
						stickyHeader={false}
						getRowKey={(row: ProductVariant): number => row.id}
						onRowClick={(row: ProductVariant): void =>
							handleRedirectToProductVariantDetail(row.id)
						}
						selectable={{
							selected,
							onToggle: toggle,
							onToggleAll: toggleAll,
							isAllSelected,
							isIndeterminate,
						}}
					/>
				)}
			</AdminFormWrapper>

			<StatusModal
				isOpen={modal.isOpen}
				onClose={handleCancelDelete}
				status={modal.status}
				title={MODAL_TITLE_MAP[modal.status] || 'Thông báo'}
				description={modal.message}
				confirmText={modal.status === 'warning' ? 'Hủy' : 'Đóng'}
			>
				{modal.status === 'warning' && (
					<div className='flex w-full justify-center mt-4'>
						<Button
							onClick={handleConfirmDelete}
							className='bg-red-600 hover:bg-red-700 text-white min-w-[120px] cursor-pointer'
						>
							Xác nhận xoá
						</Button>
					</div>
				)}
			</StatusModal>
		</>
	);
}
