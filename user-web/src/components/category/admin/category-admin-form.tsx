'use client';

import { ChangeEvent, FormEvent, JSX, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { CategoryDetailInfoAdmin } from '@/types/categories/admin/CategoryDetailInfoAdmin';
import {
	mapCategoryFormToCreateDTO,
	mapCategoryFormToUpdateDTO,
	mapCategoryResponseToAdmin,
} from '@/utils/mappers/categories/admin-categories';
import { generateSlug } from '@/utils/mappers/shared/slug';
import { CategoryCreateDTO } from '@/types/categories/admin/CategoryCreateDTO';
import { CategoryUpdateDTO } from '@/types/categories/admin/CategoryUpdateDTO';
import { CategoryResponse } from '@/types/categories/admin/CategoryResponse';
import Image from 'next/image';
import { CategoryImage } from '@/types/images/admin/CategoryImage';

interface Props {
	formType: AdminFormType;
}

const mockCategoryResponse: CategoryResponse = {
	categoryID: 1,
	name: 'Điện thoại',
	slug: 'dien-thoai',
	description: 'Danh mục điện thoại cao cấp',
	status: true,
	productCount: 120,
	imageUrl:
		'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_1.png',
	createdAt: '2024-01-01T10:00:00Z',
	updatedAt: '2024-02-01T10:00:00Z',
};

const emptyCategory: CategoryDetailInfoAdmin = {
	categoryID: 0,
	name: '',
	slug: '',
	description: '',
	status: true,
	image: undefined,
	productCount: 0,
	createdAt: '',
	updatedAt: '',
};

export default function CategoryAdminForm({ formType }: Props): JSX.Element {
	const FILE_INPUT_ID = 'category-image';
	const isCreate: boolean = formType === 'create';
	const isUpdate: boolean = formType === 'update';
	const isView: boolean = formType === 'view';

	const [form, setForm] = useState<CategoryDetailInfoAdmin>(() => {
		if (formType === 'view' || formType === 'update') {
			return mapCategoryResponseToAdmin(mockCategoryResponse);
		}
		return emptyCategory;
	});

	// ===== TEXT INPUT =====
	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value,
			slug: name === 'name' ? generateSlug(value) : prev.slug,
		}));
	};

	// ===== IMAGE =====
	const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const image = {
			file,
			url: undefined,
		};

		setForm((prev) => ({
			...prev,
			image,
		}));

		e.target.value = '';
	};

	const handleRemoveImage = () => {
		setForm((prev) => ({
			...prev,
			image: undefined,
		}));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (formType === 'create') {
			const dto: CategoryCreateDTO = mapCategoryFormToCreateDTO(form);
			console.log('Create DTO:', dto);
		}

		if (formType === 'update') {
			const dto: CategoryUpdateDTO = mapCategoryFormToUpdateDTO(form);
			console.log('Update DTO:', dto);
		}
	};

	const getImageSrc = (img?: CategoryImage): string | undefined => {
		if (!img) return undefined;

		if (img.file) {
			return URL.createObjectURL(img.file);
		}

		return img.imageUrl;
	};

	return (
		<>
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold'>Quản lý danh mục</h1>
					<p className='text-sm text-muted-foreground'>
						Tạo hoặc chỉnh sửa danh mục sản phẩm
					</p>
				</div>
			</div>

			<form
				onSubmit={handleSubmit}
				className='space-y-6 w-full max-w-3xl mx-auto mt-5 shadow-xl pt-3 p-7 rounded-2xl border'
			>
				{/* Name */}
				<div className='space-y-2'>
					<Label htmlFor='name'>Tên danh mục</Label>
					<Input
						id='name'
						name='name'
						value={form.name}
						onChange={handleInputChange}
						disabled={isView}
					/>
				</div>

				{/* Slug */}
				<div className='space-y-2'>
					<Label htmlFor='slug'>Slug</Label>
					<Input
						id='slug'
						name='slug'
						value={form.slug}
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

				{/* Status */}
				{(isUpdate || isView) && (
					<div className='flex items-center gap-3'>
						<Switch
							checked={form.status}
							onCheckedChange={(checked) =>
								setForm((prev) => ({ ...prev, status: checked }))
							}
							disabled={isView}
						/>
						<span>Hoạt động</span>
					</div>
				)}

				{/* Image */}
				<div className='space-y-4'>
					<div className='flex justify-between items-center'>
						<Label>Hình đại diện</Label>

						<Input
							id={FILE_INPUT_ID}
							type='file'
							accept='image/*'
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
								<span>Chọn ảnh</span>
							</Button>
						</Label>
					</div>

					{form.image && (
						<div className='mt-4 space-y-3'>
							<Image
								src={getImageSrc(form.image)!}
								alt={''}
								width={128}
								height={128}
								className='w-40 h-40 object-cover rounded border'
							/>

							{(isCreate || isUpdate) && (
								<Button
									type='button'
									variant='destructive'
									onClick={handleRemoveImage}
									className='cursor-pointer'
								>
									Xoá ảnh
								</Button>
							)}
						</div>
					)}
				</div>

				{!isView && (
					<Button type='submit'>
						{formType === 'create' ? 'Thêm danh mục' : 'Cập nhật danh mục'}
					</Button>
				)}
			</form>
		</>
	);
}
