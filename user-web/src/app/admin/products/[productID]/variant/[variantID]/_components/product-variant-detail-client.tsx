'use client';

import { AdminFormWrapper } from '@/components/layout/admin/admin-form-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProductVariantDetail } from '@/types/products/admin/variant/ProductVariantDetail';
import { getProductVariantStatusLabel } from '@/types/products/admin/variant/ProductVariantStatusLabel';
import { ChangeEvent, FormEvent, JSX, SetStateAction, useState } from 'react';
import { MultiImageUpload } from '@/components/image/admin/multi-image-upload';
import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { calculateDiscount } from '@/utils/shared/calculateDiscount';
import Field from '@/components/layout/admin/field';

interface Props {
	variant: ProductVariantDetail;
	formType: AdminFormType;
}

export default function ProductVariantDetailClient({ variant, formType }: Props): JSX.Element {
	const isView = formType === 'view';
	const isCreate = formType === 'create';

	const [form, setForm] = useState<ProductVariantDetail>(variant);

	// ===== handlers =====
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;

		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: FormEvent): void => {
		e.preventDefault();
	};

	const discount: number = calculateDiscount(form.pricing.salePrice, form.pricing.costPrice);

	return (
		<AdminFormWrapper
			title='Chi tiết biến thể sản phẩm'
			description='Quản lý thông tin biến thể'
			onSubmit={handleSubmit}
			actions={
				!isView && (
					<Button type='submit'>
						{isCreate ? 'Tạo biến thể' : 'Cập nhật biến thể'}
					</Button>
				)
			}
		>
			{/* ===== BASIC ===== */}
			<Field label='Tên biến thể'>
				<Input
					name='name'
					value={form.name}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</Field>

			<Field label='SKU'>
				<Input
					name='sku'
					value={form.sku}
					onChange={handleInputChange}
					disabled={isView}
				/>
			</Field>

			<Field label='Trạng thái'>
				<Input value={getProductVariantStatusLabel(form.status)} disabled />
			</Field>

			{/* ===== ATTRIBUTES ===== */}
			<div className='space-y-2'>
				<Label className='text-lg font-semibold'>Thuộc tính</Label>

				<div className='grid grid-cols-2 gap-4'>
					<Field label='Size'>
						<Input
							value={form.attributes?.[0]?.size || ''}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setForm((prev) => ({
									...prev,
									attributes: [{ ...prev.attributes[0], size: e.target.value }],
								}))
							}
							disabled={isView}
						/>
					</Field>

					<Field label='Màu sắc'>
						<Input
							value={form.attributes?.[0]?.color || ''}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setForm((prev) => ({
									...prev,
									attributes: [{ ...prev.attributes[0], color: e.target.value }],
								}))
							}
							disabled={isView}
						/>
					</Field>
				</div>
			</div>

			{/* ===== PRICING ===== */}
			<div className='space-y-2'>
				<Label className='text-lg font-semibold'>Giá</Label>

				<div className='grid grid-cols-2 gap-4'>
					<Field label='Giá bán'>
						<Input
							type='number'
							value={form.pricing.salePrice}
							onChange={(e) =>
								setForm((prev) => ({
									...prev,
									pricing: {
										...prev.pricing,
										salePrice: Number(e.target.value),
									},
								}))
							}
							disabled={isView}
						/>
					</Field>

					<Field label='Giá nhập'>
						<Input
							type='number'
							value={form.pricing.costPrice}
							onChange={(e) =>
								setForm((prev) => ({
									...prev,
									pricing: {
										...prev.pricing,
										costPrice: Number(e.target.value),
									},
								}))
							}
							disabled={isView}
						/>
					</Field>

					<Field label='Chiết khấu (%)'>
						<div className='relative'>
							<Input value={discount} disabled />
							<span className='absolute right-3 top-1/2 -translate-y-1/2 text-sm'>
					%
				</span>
						</div>
					</Field>
				</div>
			</div>

			{/* ===== INVENTORY ===== */}
			<div className='space-y-2'>
				<Label className='text-lg font-semibold'>Tồn kho</Label>

				<div className='grid grid-cols-3 gap-4'>
					<Field label='Có thể bán'>
						<Input value={form.inventory.available} disabled />
					</Field>

					<Field label='Đang giữ'>
						<Input value={form.inventory.reserved} disabled />
					</Field>

					<Field label='Sắp về'>
						<Input value={form.inventory.incoming} disabled />
					</Field>
				</div>
			</div>

			{/* ===== SHIPPING ===== */}
			{form.shipping && (
				<div className='space-y-2'>
					<Label className='text-lg font-semibold'>Vận chuyển</Label>

					<Field label='Khối lượng (gram)'>
						<Input
							type='number'
							value={form.shipping.weightInGram || ''}
							onChange={(e) =>
								setForm((prev) => ({
									...prev,
									shipping: {
										...prev.shipping!,
										weightInGram: Number(e.target.value),
									},
								}))
							}
							disabled={isView}
						/>
					</Field>

					<div className='grid grid-cols-3 gap-4'>
						<Field label='Dài'>
							<Input
								value={form.shipping.dimensionsInCm?.length || ''}
								onChange={(e) =>
									setForm((prev) => ({
										...prev,
										shipping: {
											...prev.shipping!,
											dimensionsInCm: {
												...prev.shipping!.dimensionsInCm!,
												length: Number(e.target.value),
											},
										},
									}))
								}
								disabled={isView}
							/>
						</Field>

						<Field label='Rộng'>
							<Input
								value={form.shipping.dimensionsInCm?.width || ''}
								onChange={(e) =>
									setForm((prev) => ({
										...prev,
										shipping: {
											...prev.shipping!,
											dimensionsInCm: {
												...prev.shipping!.dimensionsInCm!,
												width: Number(e.target.value),
											},
										},
									}))
								}
								disabled={isView}
							/>
						</Field>

						<Field label='Cao'>
							<Input
								value={form.shipping.dimensionsInCm?.height || ''}
								onChange={(e) =>
									setForm((prev) => ({
										...prev,
										shipping: {
											...prev.shipping!,
											dimensionsInCm: {
												...prev.shipping!.dimensionsInCm!,
												height: Number(e.target.value),
											},
										},
									}))
								}
								disabled={isView}
							/>
						</Field>
					</div>
				</div>
			)}

			{/* ===== IMAGES ===== */}
			<Field label='Hình ảnh'>
				<MultiImageUpload
					value={form.images}
					onChange={(updater: SetStateAction<SortableImageForm[]>): void =>
						setForm((prev: ProductVariantDetail) => ({
							...prev,
							images: typeof updater === 'function' ? updater(prev.images) : updater,
						}))
					}
					disabled={isView}
				/>
			</Field>
		</AdminFormWrapper>
	);
}
