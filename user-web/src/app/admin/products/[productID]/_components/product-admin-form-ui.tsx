import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { ProductVariant } from '@/types/products/admin/variant/ProductVariant';
import React, { ChangeEvent, FormEvent, JSX, SetStateAction, useState } from 'react';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { Column } from '@/types/uis/Column';
import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { Switch } from '@/components/ui/switch';
import { MultiImageUpload } from '@/components/image/admin/multi-image-upload';
import { DataTable } from '@/components/layout/admin/data-table';
import Image from 'next/image';
import { useStatusModal, UseStatusModalReturn } from '@/hooks/share/use-status-modal';
import { StatusModal } from '@/components/layout/share/status-modal';
import { MODAL_TITLE_MAP } from '@/utils/shared/mappers/modalTitleMap';

interface Props {
	form: ProductDetailInfoAdmin;
	mode: AdminFormType;
	disabled: boolean;

	productVariants?: ProductVariant[];

	selected: number[];
	onToggle: (id: number) => void;
	onToggleAll: () => void;
	isAllSelected: boolean;
	isIndeterminate: boolean;

	onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onDescriptionChange: (val: string) => void;
	onImagesChange: (updater: SetStateAction<SortableImageForm[]>) => void;
	onStatusChange: (checked: boolean) => void;
	onSubmit: (e: FormEvent) => void;

	onVariantClick: (id: number) => void;
	onAddVariant: () => void;
	onDeleteVariant: (id: number) => void;
	onEditVariant: (id: number) => void;
}

export default function ProductAdminFormUI({
	form,
	mode,
	disabled,
	productVariants,
	selected,
	onToggle,
	onToggleAll,
	isAllSelected,
	isIndeterminate,
	onInputChange,
	onDescriptionChange,
	onImagesChange,
	onStatusChange,
	onSubmit,
	onVariantClick,
	onAddVariant,
	onDeleteVariant,
	onEditVariant,
}: Props): JSX.Element {
	const isCreate: boolean = mode === 'create';
	const isView: boolean = mode === 'view';
	const isUpdate: boolean = mode === 'update';

	const modal: UseStatusModalReturn = useStatusModal();
	const [deletingId, setDeletingId] = useState<number | null>(null);

	const handleConfirmDelete = (): void => {
		if (deletingId !== null) {
			onDeleteVariant(deletingId);
			setDeletingId(null);
			modal.closeModal();
		}
	};

	const handleCancelDelete = (): void => {
		setDeletingId(null);
		modal.closeModal();
	};

	const productVariantColumns: Column<ProductVariant>[] = [
		{
			key: 'name',
			header: 'Tên',
		},
		{
			key: 'sku',
			header: 'SKU',
		},
		{
			key: 'quantity',
			header: 'Tồn kho',
		},
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
							onEditVariant(row.id);
						}}
					>
						Sửa
					</Button>

					<Button
						variant='link'
						size='lg'
						className='text-blue-600 p-0 h-auto font-medium cursor-pointer'
						onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
							e.stopPropagation();
							e.preventDefault();
							setDeletingId(row.id);
							modal.showWarning(
								`Bạn có chắc chắn muốn xoá biến thể "${row.name}" không?`,
							);
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
				onSubmit={onSubmit}
				actions={
					!isView && (
						<Button type='submit'>
							{isCreate ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}
						</Button>
					)
				}
			>
				{/* Name */}
				<div className='space-y-2'>
					<Label>Tên sản phẩm</Label>
					<Input
						name='name'
						value={form.name}
						onChange={onInputChange}
						disabled={disabled}
					/>
				</div>

				{/* Brand */}
				<div className='space-y-2'>
					<Label>Thương hiệu</Label>
					<Input
						name='brand'
						value={form.brand}
						onChange={onInputChange}
						disabled={disabled}
					/>
				</div>

				{/* Brand */}
				<div className='space-y-2'>
					<Label>Nhà cung cấp</Label>
					<Input
						name='supplier'
						value={form.supplierName}
						onChange={onInputChange}
						disabled={disabled}
					/>
				</div>

				{/* Description */}
				<div className='space-y-2'>
					<Label>Mô tả</Label>
					<RichTextEditor
						value={form.description}
						onChange={onDescriptionChange}
						disabled={disabled}
					/>
				</div>

				{/* Status */}
				{isUpdate && (
					<div className='flex items-center gap-3'>
						<Switch
							checked={form.status}
							onCheckedChange={onStatusChange}
						/>
						<span>Hoạt động</span>
					</div>
				)}

				{/* Sale price */}
				<div className='space-y-2'>
					<Label>Giá bán</Label>
					<Input
						type='number'
						name='salePrice'
						onChange={onInputChange}
						disabled={disabled}
					/>
				</div>

				{/* Import price */}
				<div className='space-y-2'>
					<Label>Giá nhập</Label>
					<Input
						type='number'
						name='importPrice'
						value={form.importPrice}
						onChange={onInputChange}
						disabled={disabled}
					/>
				</div>

				{/* Discount */}
				<div className='space-y-2'>
					<Label>Giảm giá</Label>
					<Input
						type='number'
						name='discount'
						value={form.discount}
						onChange={onInputChange}
						disabled
					/>
				</div>

				{/* Category */}
				<div className='space-y-2'>
					<Label>Danh mục</Label>
					<Input
						type='number'
						name='categoryId'
						value={form.categoryId}
						onChange={onInputChange}
						disabled={disabled}
					/>
				</div>

				{/* Images */}
				<div className='space-y-4'>
					<Label>Hình ảnh</Label>
					<MultiImageUpload
						value={form.images}
						onChange={onImagesChange}
						disabled={disabled}
					/>
				</div>
				<div className='mt-8'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='font-bold text-lg'>Danh sách biến thể sản phẩm</h2>

						<Button
							onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
								e.preventDefault();
								onAddVariant();
							}}
							className='cursor-pointer'
						>
							Thêm biến thể
						</Button>
					</div>

					{/* Product Variant List */}
					{!isCreate && productVariants && (
						<DataTable
							data={productVariants}
							columns={productVariantColumns}
							stickyHeader={false}
							getRowKey={(row: ProductVariant): number => row.id}
							onRowClick={(row: ProductVariant): void => onVariantClick(row.id)}
							selectable={{
								selected,
								onToggle,
								onToggleAll,
								isAllSelected,
								isIndeterminate,
							}}
						/>
					)}
				</div>
			</AdminFormWrapper>

			{/* Modal Xác Nhận */}
			<StatusModal
				isOpen={modal.isOpen}
				onClose={handleCancelDelete}
				status={modal.status}
				title={MODAL_TITLE_MAP[modal.status] || 'Thông báo'}
				description={modal.message}
				confirmText={modal.status === 'warning' ? 'Hủy' : 'Đóng'}
			>
				{/* Khi trạng thái là warning (chuẩn bị xoá), ta tiêm thêm nút Xác Nhận màu đỏ vào Custom Content */}
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
