import { ProductVariantAdmin } from '@/types/products/admin/variant/ProductVariantAdmin';
import React, { JSX } from 'react';
import { Column } from '@/types/uis/Column';
import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/components/layout/admin/data-table';
import Image from 'next/image';
import { StatusModal } from '@/components/layout/share/status-modal';
import { getStatusModalTitle } from '@/utils/shared/mappers/modalTitleMap';
import Field from '@/components/layout/admin/field';
import { UseProductAdminFormLogicReturn } from '@/hooks/products/admin/use-product-admin-form-logic';
import { MultiImageUpload } from '@/components/images/admin/multi-image-upload';
import AdminTableAction from '@/components/layout/admin/admin-table-action';

// Kế thừa toàn bộ interface từ hook
interface ProductAdminFormUIProps extends UseProductAdminFormLogicReturn {
	productApproval?: boolean;
}

export default function ProductAdminFormUI({
	form,
	productApproval = false,
	isCreate,
	isView,
	isUpdate,
	isShopOwner,
	isAdmin,
	selected,
	onToggle,
	onToggleAll,
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
	handleApproveProduct,
	handleRejectProduct,
}: ProductAdminFormUIProps): JSX.Element {
	const isFieldDisabledForShopOwner = !isView && isShopOwner;

	let productVariantColumns: Column<ProductVariantAdmin>[] = [
		{ key: 'name', header: 'Tên' },
		{ key: 'sku', header: 'SKU' },
		{ key: 'quantity', header: 'Tồn kho' },
		{
			key: 'costPrice',
			header: 'Giá nhập',
			render: (row: ProductVariantAdmin): string => row.costPrice.toLocaleString('vi-VN') + ' đ',
		},
		{
			key: 'salePrice',
			header: 'Giá bán',
			render: (row: ProductVariantAdmin): string => row.salePrice.toLocaleString('vi-VN') + ' đ',
		},
		{
			key: 'image',
			header: 'Ảnh',
			render: (row: ProductVariantAdmin): JSX.Element =>
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

		...(!isAdmin
			? [
					{
						key: 'action',
						header: <span className='block px-4'>Thao tác</span>,
						render: (row: ProductVariantAdmin): JSX.Element => (
							<AdminTableAction
								id={row.id}
								onDelete={handleTriggerDeleteVariant}
								onEdit={handleEditVariant}
							/>
						),
					},
				]
			: []),
	];

	return (
		<>
			<AdminFormWrapper
				title='Quản lý sản phẩm'
				description='Quản lý thông tin chi tiết của sản phẩm'
				onSubmit={handleSubmit}
				actions={
					isFieldDisabledForShopOwner ? (
						<Button
							type='submit'
							className='cursor-pointer'
						>
							{isCreate ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}
						</Button>
					) : isAdmin && productApproval ? (
						<div className='flex gap-3'>
							<Button
								variant='outline'
								className='cursor-pointer'
								onClick={handleRejectProduct}
							>
								Từ chối
							</Button>
							<Button
								type='submit'
								className='cursor-pointer'
								onClick={handleApproveProduct}
							>
								Phê duyệt sản phẩm
							</Button>
						</div>
					) : null
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
						isAdmin={isAdmin}
						onChange={handleImagesChange}
						disabled={isView}
					/>
				</Field>

				<div className='flex justify-between items-center mb-4'>
					<h2 className='font-bold text-lg'>Danh sách sản phẩm phân loại</h2>
					{!isAdmin && (
						<Button
							onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
								e.preventDefault();
								handleAddNewVariant();
							}}
							className='cursor-pointer'
							disabled={isView}
						>
							Thêm phân loại sản phẩm
						</Button>
					)}
				</div>

				{!isCreate && form.productVariants && (
					<DataTable
						data={form.productVariants}
						columns={productVariantColumns}
						stickyHeader={false}
						getRowKey={(row: ProductVariantAdmin): string => row.id}
						onRowClick={(row: ProductVariantAdmin): void =>
							handleRedirectToProductVariantDetail(row.id)
						}
						selectable={{
							selected,
							onToggle: onToggle,
							onToggleAll: onToggleAll,
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
				title={getStatusModalTitle(modal.status)}
				description={modal.message}
				confirmText={modal.status === 'warning' ? 'Hủy' : 'Đóng'}
			>
				{modal.status === 'warning' && (
					<div className='flex w-full justify-center mt-4'>
						<Button
							onClick={handleConfirmDelete}
							className='bg-red-600 hover:bg-red-700 text-white min-w-30 cursor-pointer'
						>
							Xác nhận xoá
						</Button>
					</div>
				)}
			</StatusModal>
		</>
	);
}
