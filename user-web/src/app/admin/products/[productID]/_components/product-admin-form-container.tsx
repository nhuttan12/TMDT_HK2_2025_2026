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
import ProductAdminFormUI from '@/app/admin/products/[productID]/_components/product-admin-form-ui';

interface Props {
	formType: AdminFormType;
	productAdmin: ProductDetailInfoAdmin;
	productVariants?: ProductVariant[];
}

export default function ProductAdminFormContainer({
	formType,
	productAdmin,
	productVariants,
}: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const isCreate: boolean = formType === 'create';
	const isView: boolean = formType === 'view';

	const allKeys: number[] = productVariants?.map((p: ProductVariant): number => p.id) ?? [];

	const { selected, toggle, toggleAll, isAllSelected, isIndeterminate } =
		useTableSelection<number>(allKeys);

	const [form, setForm] = useState<ProductDetailInfoAdmin>(productAdmin);

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

	const handleStatusChange = (checked: boolean) => {
		setForm((prev: ProductDetailInfoAdmin) => ({
			...prev,
			status: checked,
		}));
	};

	const handleImagesChange = (updater: SetStateAction<SortableImageForm[]>) => {
		setForm((prev: ProductDetailInfoAdmin) => ({
			...prev,
			images: typeof updater === 'function' ? updater(prev.images) : updater,
		}));
	};

	const handleDescriptionChange = (val: string) => {
		setForm((prev: ProductDetailInfoAdmin) => ({ ...prev, description: val }));
	};

	const handleRedirectToProductVariantDetail = (variantID: number) => {
		router.push(`/admin/products/${form.id}/variant/${variantID}`);
	};

	const handleAddNewVariant = () => {
		router.push(`/admin/products/${form.id}/variant/add-new`);
	};

	return (
		<ProductAdminFormUI
			form={form}
			mode={formType}
			disabled={isView}
			productVariants={productVariants}
			selected={selected}
			onToggle={toggle}
			onToggleAll={toggleAll}
			isAllSelected={isAllSelected}
			isIndeterminate={isIndeterminate}
			onInputChange={handleInputChange}
			onDescriptionChange={handleDescriptionChange}
			onImagesChange={handleImagesChange}
			onStatusChange={handleStatusChange}
			onSubmit={handleSubmit}
			onVariantClick={handleRedirectToProductVariantDetail}
			onAddVariant={handleAddNewVariant}
		/>
	);
}
