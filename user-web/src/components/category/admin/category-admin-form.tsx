'use client';

import { ChangeEvent, FormEvent, JSX, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ImageFormAdmin } from '@/types/products/admin/ImageFormAdmin';
import { AdminFormType } from '@/types/products/admin/AdminFormType';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { CategoryInputForm } from '@/types/categories/admin/CategoryInputForm';

interface Props {
	formType: AdminFormType;
}

export default function CategoryAdminForm({ formType }: Props): JSX.Element {
	const FILE_INPUT_ID = 'category-image';
	const isView: boolean = formType === 'view';

	const [form, setForm] = useState({
		name: '',
		slug: '',
		description: '',
		isActive: true,
		image: undefined as ImageFormAdmin | undefined,
	});

	// ===== TEXT INPUT =====
	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// ===== IMAGE =====
	const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const image: ImageFormAdmin = {
			file,
			preview: URL.createObjectURL(file),
			isPrimary: true,
			order: 0,
		};

		setForm((prev) => ({
			...prev,
			image,
		}));

		e.target.value = '';
	};

	const handleRemoveImage = () => {
		if (form.image?.preview) {
			URL.revokeObjectURL(form.image.preview);
		}

		setForm((prev) => ({
			...prev,
			image: undefined,
		}));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log('Submit category:', form);
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
							setForm((prev: CategoryInputForm) => ({
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
							checked={form.isActive}
							onCheckedChange={(checked) =>
								setForm((prev) => ({ ...prev, isActive: checked }))
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
							<img
								src={form.image.preview}
								alt=''
								className='w-40 h-40 object-cover rounded border'
							/>

							<Button
								type='button'
								variant='destructive'
								onClick={handleRemoveImage}
								className='cursor-pointer'
							>
								Xoá ảnh
							</Button>
						</div>
					)}
				</div>

				{!isView && <Button type='submit'>
					{formType === 'create' ? 'Thêm danh mục' : 'Cập nhật danh mục'}
				</Button>}
			</form>
		</>
	);
}
