'use client';

import { ChangeEvent, FormEvent, JSX, useState } from 'react';
import { CreateProductInput } from '@/types/products/admin/CreateProductInput';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ImageFormAdmin } from '@/types/products/admin/ImageFormAdmin';
import { AdminFormType } from '@/types/products/admin/AdminFormType';
import RichTextEditor from '@/components/admin/rich-text-editor';

interface Props {
	formType: AdminFormType;
}

export default function ProductAdminForm({ formType }: Props): JSX.Element {
	const FILE_INPUT_ID = 'product-images';

	const [form, setForm] = useState<CreateProductInput>({
		name: '',
		brand: '',
		description: '',
		price: 0,
		discount: 0,
		categoryID: 0,
		images: [],
	});

	// ===== TEXT / NUMBER =====
	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: type === 'number' ? Number(value) : value,
		}));
	};

	// ===== ADD IMAGE =====
	const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		const newImages: ImageFormAdmin[] = Array.from(files).map((file, index) => ({
			file,
			preview: URL.createObjectURL(file),
			isPrimary: form.images.length === 0 && index === 0,
			order: form.images.length + index,
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

		const updated = [...form.images];

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

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log('Submit:', form);
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
					/>
				</div>

				{/* Description */}
				<div className='space-y-2'>
					<Label htmlFor='description'>Mô tả</Label>
					<RichTextEditor
						value={form.description}
						onChange={(val: string): void =>
							setForm((prev: CreateProductInput) => ({
								...prev,
								description: val,
							}))
						}
					/>
				</div>

				{/* Price */}
				<div className='space-y-2'>
					<Label htmlFor='price'>Giá</Label>
					<Input
						type='number'
						id='price'
						name='price'
						value={form.price}
						onChange={handleInputChange}
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
					/>
				</div>

				{/* Category */}
				<div className='space-y-2'>
					<Label htmlFor='categoryId'>Danh mục</Label>
					<Input
						type='number'
						id='categoryId'
						name='categoryId'
						value={form.categoryID}
						onChange={handleInputChange}
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
						/>
						<Label
							htmlFor={FILE_INPUT_ID}
							className='cursor-pointer'
						>
							<Button
								type='button'
								asChild
							>
								<span>Thêm ảnh</span>
							</Button>
						</Label>
					</div>

					{form.images.map((img, index) => (
						<div
							key={index}
							className='border p-4 rounded space-y-3'
						>
							<div className='flex gap-4 items-start'>
								{/* IMAGE PREVIEW */}
								<img
									src={img.preview}
									alt=''
									className='w-32 h-32 object-cover rounded border'
								/>

								<div className='flex flex-col gap-2 flex-1'>
									{/* PRIMARY BUTTON */}
									<Button
										type='button'
										variant={img.isPrimary ? 'default' : 'outline'}
										onClick={() => handleSetPrimary(index)}
									>
										{img.isPrimary ? 'Ảnh chính' : 'Chọn làm ảnh chính'}
									</Button>

									{/* MOVE UP */}
									{index > 0 && (
										<Button
											type='button'
											variant='outline'
											onClick={() => handleMoveUp(index)}
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
										>
											↓ Xuống
										</Button>
									)}

									{/* DELETE */}
									<Button
										type='button'
										variant='destructive'
										onClick={() => handleRemoveImage(index)}
									>
										Xoá
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>

				<Button type='submit'>Lưu sản phẩm</Button>
			</form>
		</>
	);
}
