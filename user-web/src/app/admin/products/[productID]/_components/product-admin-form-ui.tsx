import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { ProductVariant } from '@/types/products/admin/variant/ProductVariant';
import React, { ChangeEvent, FormEvent, JSX, SetStateAction } from 'react';
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
}: Props): JSX.Element {
	const isCreate: boolean = mode === 'create';
	const isView: boolean = mode === 'view';
	const isUpdate: boolean = mode === 'update';

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
	];

	return (
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
	);
}
