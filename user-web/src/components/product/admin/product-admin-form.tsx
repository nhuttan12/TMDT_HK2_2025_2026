'use client';

import { ChangeEvent, FormEvent, JSX, SetStateAction, useEffect, useState } from 'react';
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
import { calculateDiscount } from '@/utils/shared/calculateDiscount';
import { ProductFormState } from '@/types/products/admin/ProductFormState';

interface Props {
	formType: AdminFormType;
}

const mockProductAdmin: ProductDetailInfoAdmin = {
	id: 1,
	name: 'iPhone 15 Pro Max 256GB',
	slug: 'iphone-15-pro-max-256gb',
	brand: 'Apple',
	description: 'Phiên bản cao cấp nhất của iPhone 15 series.',

	importPrice: 30000000,
	salePrice: 34990000,
	discount: calculateDiscount(34990000, 30000000),

	status: true,
	categoryID: 1,

	images: [
		{
			localID: crypto.randomUUID(),
			imageUrl:
				'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/Phone/Apple/iphone_15/dien-thoai-iphone-15-pro-max-1.jpg',
			order: 0,
			isPrimary: true,
			status: 'done',
			progress: 100,
		},
		{
			localID: crypto.randomUUID(),
			imageUrl:
				'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/Phone/Apple/iphone_15/dien-thoai-iphone-15-pro-max-2.jpg',
			order: 1,
			isPrimary: false,
			status: 'done',
			progress: 100,
		},
	],

	createdAt: '2024-01-10T10:00:00Z',
	updatedAt: '2024-02-01T15:30:00Z',
};

const emptyProduct: ProductDetailInfoAdmin = {
	id: 0,
	name: '',
	slug: '',
	brand: '',
	description: '',

	importPrice: 0,
	salePrice: 0,
	discount: 0,

	status: true,
	categoryID: 0,
	images: [],

	createdAt: '',
	updatedAt: '',
};

export default function ProductAdminForm({ formType }: Props): JSX.Element {
	const isView: boolean = formType === 'view';
	const isCreate: boolean = formType === 'create';

	const getInitialForm = (): ProductDetailInfoAdmin => {
		if (formType === 'view' || formType === 'update') {
			return mapProductAdminToFormState(mockProductAdmin);
		}
		return emptyProduct;
	};

	const [form, setForm] = useState<ProductDetailInfoAdmin>(getInitialForm);

	useEffect(() => {
		setForm(getInitialForm());
	}, [formType]);


	// ===== INPUT =====
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;

		setForm((prev) => {
			let parsed: string | number = value;

			if (name === 'salePrice' || name === 'importPrice' || name === 'categoryID') {
				parsed = Number(value);
			}

			const updated = {
				...prev,
				[name]: parsed,
				slug: name === 'name' ? generateSlug(value) : prev.slug,
			};

			if (name === 'salePrice' || name === 'importPrice') {
				const sale: number =
					name === 'salePrice' ? (parsed as number) : prev.salePrice;

				const importP: number =
					name === 'importPrice' ? (parsed as number) : prev.importPrice;

				updated.discount = calculateDiscount(sale, importP);
			}

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
							setForm((prev: ProductDetailInfoAdmin) => ({ ...prev, status: checked }))
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
					value={form.salePrice}
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
							images:
								typeof updater === 'function'
									? updater(prev.images)
									: updater,
						}))
					}
					disabled={isView}
				/>
			</div>
		</AdminFormWrapper>
	);
}