'use client';

import React, { ChangeEvent, FormEvent, JSX, SetStateAction, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';

import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';

import {
	mapFormToCreateDTO,
	mapFormToUpdateDTO,
	mapProductAdminToFormState,
} from '@/utils/products/mappers/admin-product';

import { generateSlug } from '@/utils/shared/mappers/slug';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { MultiImageUpload } from '@/components/image/admin/multi-image-upload';
import { ProductCreateDTO } from '@/types/products/admin/ProductCreateDTO';
import { ProductUpdateDTO } from '@/types/products/admin/ProductUpdateDTO';
import { Column } from '@/types/uis/Column';
import { ProductVariant } from '@/types/products/admin/variant/ProductVariant';
import { DataTable } from '@/components/layout/admin/data-table';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useTableSelection } from '@/hooks/use-table-selection';

interface Props {
	formType: AdminFormType;
	productAdmin?: ProductDetailInfoAdmin;
	productVariants?: ProductVariant[];
}

const emptyProduct: ProductDetailInfoAdmin = {
	id: 0,
	name: '',
	slug: '',
	brand: '',
	description: '',

	importPrice: 0,
	discount: 0,

	status: true,
	categoryID: 0,
	images: [],

	createdAt: '',
	updatedAt: '',
};

export default function ProductAdminFormClient({
	formType,
	productAdmin,
	productVariants,
}: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const allKeys: number[] = productVariants?.map((p: ProductVariant): number => p.id) ?? [];

	const { selected, toggle, toggleAll, isAllSelected, isIndeterminate } =
		useTableSelection<number>(allKeys);

	const isView: boolean = formType === 'view';
	const isCreate: boolean = formType === 'create';

	const getInitialForm = (): ProductDetailInfoAdmin => {
		if ((formType === 'view' || formType === 'update') && productAdmin) {
			return mapProductAdminToFormState(productAdmin);
		}
		return emptyProduct;
	};

	const [form, setForm] = useState<ProductDetailInfoAdmin>(getInitialForm);

	// ===== INPUT =====
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;

		setForm((prev) => {
			const parsed: string | number = value;

			const updated = {
				...prev,
				[name]: parsed,
				slug: name === 'name' ? generateSlug(value) : prev.slug,
			};

			return updated;
		});
	};

	// ===== SUBMIT =====
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (isCreate) {
			const dto: ProductCreateDTO = mapFormToCreateDTO(form);
			console.log('Create DTO:', dto);
		} else {
			const dto: ProductUpdateDTO = mapFormToUpdateDTO(form);
			console.log('Update DTO:', dto);
		}
	};

	const handleRedirectToProductVairantDetail = (variantID: number) => {
		router.push(`/admin/products/${form.id}/variant/${variantID}`);
	};

	const handleAddNewVariant = () => {
		router.push(`/admin/products/${form.id}/variant/add-new`);
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
	];

	return (
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
			{/* Name */}
			<div className='space-y-2'>
				<Label>Tên sản phẩm</Label>
				<Input
					name='name'
					value={form.name}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</div>

			{/* Brand */}
			<div className='space-y-2'>
				<Label>Thương hiệu</Label>
				<Input
					name='brand'
					value={form.brand}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</div>

			{/* Description */}
			<div className='space-y-2'>
				<Label>Mô tả</Label>
				<RichTextEditor
					value={form.description}
					onChange={(val: string): void =>
						setForm((prev: ProductDetailInfoAdmin) => ({ ...prev, description: val }))
					}
					disabled={isView}
				/>
			</div>

			{/* Status */}
			{formType === 'update' && (
				<div className='flex items-center gap-3'>
					<Switch
						checked={form.status}
						onCheckedChange={(checked: boolean): void =>
							setForm((prev: ProductDetailInfoAdmin) => ({
								...prev,
								status: checked,
							}))
						}
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
					onChange={handleInputChange}
					disabled={isView}
				/>
			</div>

			{/* Import price */}
			<div className='space-y-2'>
				<Label>Giá nhập</Label>
				<Input
					type='number'
					name='importPrice'
					value={form.importPrice}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</div>

			{/* Discount */}
			<div className='space-y-2'>
				<Label>Giảm giá</Label>
				<Input
					type='number'
					name='discount'
					value={form.discount}
					onChange={handleInputChange}
					disabled
				/>
			</div>

			{/* Category */}
			<div className='space-y-2'>
				<Label>Danh mục</Label>
				<Input
					type='number'
					name='categoryID'
					value={form.categoryID}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</div>

			{/* Images */}
			<div className='space-y-4'>
				<Label>Hình ảnh</Label>
				<MultiImageUpload
					value={form.images}
					onChange={(updater: SetStateAction<SortableImageForm[]>): void =>
						setForm((prev: ProductDetailInfoAdmin) => ({
							...prev,
							images: typeof updater === 'function' ? updater(prev.images) : updater,
						}))
					}
					disabled={isView}
				/>
			</div>
			<div className='mt-8'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='font-bold text-lg'>Danh sách biến thể sản phẩm</h2>

					<Button
						onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
							e.preventDefault();
							handleAddNewVariant();
						}}
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
						onRowClick={(row: ProductVariant): void =>
							handleRedirectToProductVairantDetail(row.id)
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
			</div>
		</AdminFormWrapper>
	);
}
