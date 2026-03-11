'use client';

import { ChangeEvent, FormEvent, JSX, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { Switch } from '@/components/ui/switch';
import {
	mapFormToCreateDTO,
	mapFormToUpdateDTO,
	mapProductAdminToFormState,
} from '@/utils/mappers/products/admin-product';
import { generateSlug } from '@/utils/mappers/shared/slug';
import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import Image from 'next/image';

interface Props {
	formType: AdminFormType;
}

const mockProductAdmin: ProductDetailInfoAdmin = {
	productID: 1,
	name: 'iPhone 15 Pro Max 256GB',
	slug: 'iphone-15-pro-max-256gb',
	brand: 'Apple',
	description: 'Phiên bản cao cấp nhất của iPhone 15 series.',
	price: 34990000,
	discount: 5,
	status: true,
	categoryID: 1,

	images: [
		{
			imageUrl:
				'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/Phone/Apple/iphone_15/dien-thoai-iphone-15-pro-max-1.jpg',
			order: 0,
			isPrimary: true,
		},
		{
			imageUrl:
				'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/Phone/Apple/iphone_15/dien-thoai-iphone-15-pro-max-2.jpg',
			order: 1,
			isPrimary: false,
		},
	],

	createdAt: '2024-01-10T10:00:00Z',
	updatedAt: '2024-02-01T15:30:00Z',
};

const emptyProduct: ProductDetailInfoAdmin = {
	productID: 0,
	name: '',
	slug: '',
	brand: '',
	description: '',
	price: 0,
	discount: 0,
	status: true,
	categoryID: 0,
	images: [],
	createdAt: '',
	updatedAt: '',
};

export default function ProductAdminForm({ formType }: Props): JSX.Element {
	const FILE_INPUT_ID = 'product-images';
	const isView: boolean = formType === 'view';

	const [form, setForm] = useState<ProductDetailInfoAdmin>((): ProductDetailInfoAdmin => {
		if (formType === 'view' || formType === 'update') {
			return mapProductAdminToFormState(mockProductAdmin);
		}
		return emptyProduct;
	});

	// ===== TEXT / NUMBER =====
	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: type === 'number' ? Number(value) : value,
			slug: name === 'name' ? generateSlug(value) : prev.slug,
		}));
	};

	// ===== ADD IMAGE =====
	const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
		const files: FileList | null = e.target.files;
		if (!files) return;

		const startOrder: number = form.images.length;

		const newImages: SortableImageForm[] = Array.from(files).map((file, index) => ({
			file,
			isPrimary: startOrder === 0 && index === 0,
			order: startOrder + index,
			imageUrl: '',
		}));

		setForm((prev) => ({
			...prev,
			images: [...prev.images, ...newImages],
		}));

		e.target.value = ''; // reset input
	};

	// ===== SET PRIMARY IMAGE =====
	const handleSetPrimary = (index: number) => {
		const updatedImages = form.images.map((img, i) => ({
			...img,
			isPrimary: i === index,
		}));

		setForm((prev) => ({
			...prev,
			images: updatedImages,
		}));
	};

	// ===== REMOVE IMAGE =====
	const handleRemoveImage = (index: number) => {
		const updatedImages = form.images
			.filter((_, i) => i !== index)
			.map((img, i) => ({
				...img,
				order: i,
			}));

		setForm((prev) => ({
			...prev,
			images: updatedImages,
		}));
	};

	const handleMoveUp = (index: number) => {
		if (index === 0) return;

		const updated = [...form.images];

		// hoán đổi vị trí
		[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];

		// cập nhật lại order
		const reordered = updated.map((img, i) => ({
			...img,
			order: i,
		}));

		setForm((prev) => ({
			...prev,
			images: reordered,
		}));
	};

	const handleMoveDown = (index: number) => {
		if (index === form.images.length - 1) return;

		const updated: SortableImageForm[] = [...form.images];

		// hoán đổi vị trí
		[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];

		// cập nhật lại order
		const reordered = updated.map((img, i) => ({
			...img,
			order: i,
		}));

		setForm((prev) => ({
			...prev,
			images: reordered,
		}));
	};

	const getImageSrc = (img: SortableImageForm): string =>
		img.file ? URL.createObjectURL(img.file) : img.imageUrl;

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (formType === 'create') {
			const dto = mapFormToCreateDTO(form);
			console.log('Create DTO:', dto);
		}

		if (formType === 'update') {
			const dto = mapFormToUpdateDTO(form);
			console.log('Update DTO:', dto);
		}
	};

	return (
		<>
			{/* Header */}
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold'>Quản lý sản phẩm</h1>
					<p className='text-sm text-muted-foreground'>
						Quản lý toàn bộ sản phẩm trong hệ thống
					</p>
				</div>
			</div>
			<form
				onSubmit={handleSubmit}
				className='space-y-6 w-full max-w-4xl mx-auto mt-5 shadow-xl pt-3 p-7 rounded-2xl border! border-slate-200!'
			>
				{/* Name */}
				<div className='space-y-2'>
					<Label htmlFor='name'>Tên sản phẩm</Label>
					<Input
						id='name'
						name='name'
						value={form.name}
						onChange={handleInputChange}
						disabled={isView}
					/>
				</div>

				{/* Brand */}
				<div className='space-y-2'>
					<Label htmlFor='brand'>Thương hiệu</Label>
					<Input
						id='brand'
						name='brand'
						value={form.brand}
						onChange={handleInputChange}
						disabled={isView}
					/>
				</div>

				{/* Description */}
				<div className='space-y-2'>
					<Label htmlFor='description'>Mô tả</Label>
					<RichTextEditor
						value={form.description}
						onChange={(val: string): void =>
							setForm((prev) => ({
								...prev,
								description: val,
							}))
						}
						disabled={isView}
					/>
				</div>

				{/* Active */}
				{formType === 'update' && (
					<div className='flex items-center gap-3'>
						<Switch
							checked={form.status}
							onCheckedChange={(checked) =>
								setForm((prev) => ({ ...prev, status: checked }))
							}
						/>
						<span>Hoạt động</span>
					</div>
				)}

				{/* Price */}
				<div className='space-y-2'>
					<Label htmlFor='price'>Giá</Label>
					<Input
						type='number'
						id='price'
						name='price'
						value={form.price}
						onChange={handleInputChange}
						disabled={isView}
					/>
				</div>

				{/* Discount */}
				<div className='space-y-2'>
					<Label htmlFor='discount'>Giảm giá</Label>
					<Input
						type='number'
						id='discount'
						name='discount'
						value={form.discount}
						onChange={handleInputChange}
						disabled={isView}
					/>
				</div>

				{/* Category */}
				<div className='space-y-2'>
					<Label htmlFor='categoryID'>Danh mục</Label>
					<Input
						type='number'
						id='categoryID'
						name='categoryID'
						value={form.categoryID}
						onChange={handleInputChange}
						disabled={isView}
					/>
				</div>

				{/* Images Section */}
				<div className='space-y-4'>
					<div className='flex justify-between items-center'>
						<Label>Hình ảnh</Label>

						<Input
							id={FILE_INPUT_ID}
							type='file'
							accept='image/*'
							multiple
							className='hidden'
							onChange={handleAddImage}
							disabled={isView}
						/>
						<Label
							htmlFor={isView ? undefined : FILE_INPUT_ID}
							className={isView ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
						>
							<Button
								type='button'
								asChild
								disabled={isView}
							>
								<span>Thêm ảnh</span>
							</Button>
						</Label>
					</div>

					{form.images.map(
						(img: SortableImageForm, index: number): JSX.Element => (
							<div
								key={`${img.order}-${index}`}
								className='border p-4 rounded space-y-3'
							>
								<div className='flex gap-4 items-start'>
									{/* IMAGE PREVIEW */}
									<Image
										src={getImageSrc(img)}
										alt=''
										width={128}
										height={128}
										className='object-cover rounded border'
									/>

									<div className='flex flex-col gap-2 flex-1'>
										{/* PRIMARY BUTTON */}
										<Button
											type='button'
											variant={img.isPrimary ? 'default' : 'outline'}
											onClick={() => handleSetPrimary(index)}
											className='cursor-pointer'
											disabled={isView}
										>
											{img.isPrimary ? 'Ảnh chính' : 'Chọn làm ảnh chính'}
										</Button>

										{/* MOVE UP */}
										{index > 0 && (
											<Button
												type='button'
												variant='outline'
												onClick={() => handleMoveUp(index)}
												className='cursor-pointer'
												disabled={isView}
											>
												↑ Lên
											</Button>
										)}

										{/* MOVE DOWN */}
										{index < form.images.length - 1 && (
											<Button
												type='button'
												variant='outline'
												onClick={() => handleMoveDown(index)}
												className='cursor-pointer'
												disabled={isView}
											>
												↓ Xuống
											</Button>
										)}

										{/* DELETE */}
										<Button
											type='button'
											variant='destructive'
											onClick={() => handleRemoveImage(index)}
											className='cursor-pointer'
											disabled={isView}
										>
											Xoá
										</Button>
									</div>
								</div>
							</div>
						),
					)}
				</div>

				{!isView && (
					<Button type='submit'>
						{formType === 'create' ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}
					</Button>
				)}
			</form>
		</>
	);
}
