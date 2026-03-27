'use client';

import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProductVariantDetail } from '@/types/products/admin/variant/ProductVariantDetail';
import { getProductVariantStatusLabel } from '@/types/products/admin/variant/ProductVariantStatusLabel';
import { ChangeEvent, FormEvent, JSX, SetStateAction, useEffect, useState } from 'react';
import { MultiImageUpload } from '@/components/image/admin/multi-image-upload';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { calculateDiscount } from '@/utils/shared/calculateDiscount';
import Field from '@/components/layout/admin/field';
import ProductVariantDetailUI
	from '@/app/admin/products/[productID]/variant/_components/product-variant-detail-ui';

interface Props {
	initialData: ProductVariantDetail;
	mode: AdminFormType;
}

export default function ProductVariantDetailContainer({ initialData, mode }: Props): JSX.Element {
	const [form, setForm] = useState<ProductVariantDetail>(initialData);
	const [loading, setLoading] = useState<boolean>(false);

	const isView: boolean = mode === 'view';
	const isCreate: boolean = mode === 'create';
	const isUpdate: boolean = mode === 'update';

	useEffect(() => {
		setForm(initialData);
	}, [initialData]);

	const handleSubmit = async (e: FormEvent): Promise<void> => {
		e.preventDefault();

		if (isView) return;

		try {
			setLoading(true);

			if (isCreate) {
				console.log('CALL API CREATE', form);
				// await createVariant(form);
			}

			if (isUpdate) {
				console.log('CALL API UPDATE', form);
				// await updateVariant(form.id, form);
			}
		} catch (error) {
			console.error('Submit error:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ProductVariantDetailUI
			form={form}
			setForm={setForm}
			disabled={isView || loading}
			onSubmit={handleSubmit}
			mode={mode}
			loading={loading}
		/>
	);
}
