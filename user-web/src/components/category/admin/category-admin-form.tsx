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
} from '@/utils/categories/mappers/admin-categories';
import { generateSlug } from '@/utils/shared/mappers/slug';
import { CategoryCreateDTO } from '@/types/categories/admin/CategoryCreateDTO';
import { CategoryUpdateDTO } from '@/types/categories/admin/CategoryUpdateDTO';
import { CategoryResponse } from '@/types/categories/admin/CategoryResponse';
import Image from 'next/image';
import { CategoryImage } from '@/types/images/admin/CategoryImage';
import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import Field from '@/components/layout/admin/field';
import SingleImageUpload from '@/components/image/admin/single-image-upload';
import { BaseImage } from '@/types/images/admin/BaseImage';

interface Props {
	formType: AdminFormType;
}

const mockCategoryResponse: CategoryResponse = {
	id: 1,
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
	id: 0,
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

	return (
		<AdminFormWrapper
			title="Quản lý danh mục"
			description="Tạo hoặc chỉnh sửa danh mục"
			onSubmit={handleSubmit}
			actions={
				!isView && (
					<Button type="submit">
						{isCreate ? 'Thêm danh mục' : 'Cập nhật danh mục'}
					</Button>
				)
			}
		>
			<Field label="Tên danh mục">
				<Input
					name="name"
					value={form.name}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</Field>

			<Field label="Slug">
				<Input
					name="slug"
					value={form.slug}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</Field>

			<Field label="Mô tả">
				<RichTextEditor
					value={form.description}
					onChange={(val: string): void =>
						setForm((prev: CategoryDetailInfoAdmin) => ({ ...prev, description: val }))
					}
					disabled={isView}
				/>
			</Field>

			<Field label="Hình ảnh">
				<SingleImageUpload
					value={form.image}
					onChange={(img: BaseImage | undefined): void =>
						setForm((prev: CategoryDetailInfoAdmin) => ({
							...prev,
							image: img,
						}))
					}
					disabled={isView}
				/>
			</Field>
		</AdminFormWrapper>
	);
}
