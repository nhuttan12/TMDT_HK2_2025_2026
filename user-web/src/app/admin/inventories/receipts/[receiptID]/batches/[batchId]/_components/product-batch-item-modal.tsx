'use client';

import { ChangeEvent, JSX, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ProductVariantForReceipt } from '@/types/inventories/receipts/uis/ProductVariantForReceipt';
import { BatchItemStatus } from '@/types/inventories/receipts/uis/BatchItemStatus';
import { Package, Plus, X } from 'lucide-react';
import {getBatchItemStatusLabel} from "@/types/inventories/receipts/uis/BatchItemStatusLabel";

interface ProductBatchItemModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (items: ProductVariantForReceipt[]) => void;
}

const createInitialVariant = (): ProductVariantForReceipt => ({
	serialNumber: '',
	productVariantName: '',
	appearanceCondition: '',
	status: 'in_stock',
});

export function ProductBatchItemModal({
	open,
	onOpenChange,
	onSubmit,
}: ProductBatchItemModalProps): JSX.Element {
	const [productVariants, setProductVariants] = useState<ProductVariantForReceipt[]>([
		createInitialVariant(),
	]);

	// Add dòng
	const addProductVariant = () => {
		setProductVariants((prev: ProductVariantForReceipt[]): ProductVariantForReceipt[] => [
			...prev,
			createInitialVariant(),
		]);
	};

	// Remove dòng
	const removeProductVariant = (index: number) => {
		setProductVariants((prev: ProductVariantForReceipt[]): ProductVariantForReceipt[] =>
			prev.filter((_: ProductVariantForReceipt, i: number): boolean => i !== index),
		);
	};

	// Update field
	const updateProductVariant = (
		index: number,
		field: keyof ProductVariantForReceipt,
		value: string | BatchItemStatus,
	) => {
		setProductVariants((prev: ProductVariantForReceipt[]): ProductVariantForReceipt[] => {
			const next: ProductVariantForReceipt[] = [...prev];
			next[index] = { ...next[index], [field]: value };
			return next;
		});
	};

	// Submit
	const handleSubmit = () => {
		const validVariants: ProductVariantForReceipt[] = productVariants.filter(
			(v: ProductVariantForReceipt): string => v.serialNumber && v.productVariantName,
		);

		if (validVariants.length === 0) return;

		// Call onSubmit prop for backward compatibility
		onSubmit(validVariants);

		// reset + close
		setProductVariants([createInitialVariant()]);
		onOpenChange(false);
	};

	// Close modal
	const handleClose = () => {
		setProductVariants([createInitialVariant()]);
		onOpenChange(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent className='max-w-4xl max-h-[80vh] overflow-hidden flex flex-col'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<Package className='w-5 h-5' />
						Thêm sản phẩm trong lô hàng
					</DialogTitle>
				</DialogHeader>

				{/* List */}
				<div className='flex-1 overflow-y-auto space-y-4'>
					{productVariants.map(
						(variant: ProductVariantForReceipt, index: number): JSX.Element => (
							<div
								key={index} // có thể cải thiện bằng uuid nếu cần
								className='border rounded-lg p-4 space-y-4'
							>
								<div className='flex justify-between items-center'>
									<h3 className='font-medium'>Sản phẩm {index + 1}</h3>

									{productVariants.length > 1 && (
										<Button
											type='button'
											variant='outline'
											size='sm'
											onClick={() => removeProductVariant(index)}
										>
											<X className='w-4 h-4' />
										</Button>
									)}
								</div>

								<div className='grid grid-cols-2 gap-4'>
									{/* Serial */}
									<div className='space-y-2'>
										<Label>Số Serial *</Label>
										<Input
											placeholder='Nhập số serial...'
											value={variant.serialNumber}
											onChange={(e: ChangeEvent<HTMLInputElement>): void =>
												updateProductVariant(
													index,
													'serialNumber',
													e.target.value,
												)
											}
										/>
									</div>

									{/* Name */}
									<div className='space-y-2'>
										<Label>Tên sản phẩm *</Label>
										<Input
											placeholder='Nhập tên sản phẩm...'
											value={variant.productVariantName}
											onChange={(e: ChangeEvent<HTMLInputElement>): void =>
												updateProductVariant(
													index,
													'productVariantName',
													e.target.value,
												)
											}
										/>
									</div>

									{/* Condition */}
									<div className='space-y-2'>
										<Label>Tình trạng</Label>
										<Input
											placeholder='Nhập tình trạng...'
											value={variant.appearanceCondition}
											onChange={(e: ChangeEvent<HTMLInputElement>): void =>
												updateProductVariant(
													index,
													'appearanceCondition',
													e.target.value,
												)
											}
										/>
									</div>

									{/* Status */}
									<div className='space-y-2'>
										<Label>Trạng thái</Label>
										<Select
											value={variant.status}
											onValueChange={(value: BatchItemStatus) =>
												updateProductVariant(index, 'status', value)
											}
										>
											<SelectTrigger>
												<SelectValue placeholder='Chọn trạng thái' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='in_stock'>
													{getBatchItemStatusLabel('in_stock')}
												</SelectItem>
												<SelectItem value='sold'>
													{getBatchItemStatusLabel('sold')}
												</SelectItem>
												<SelectItem value='defective'>
													{getBatchItemStatusLabel('defective')}
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						),
					)}
				</div>

				{/* Actions */}
				<div className='flex justify-between items-center pt-4 border-t'>
					<Button
						type='button'
						variant='outline'
						onClick={addProductVariant}
					>
						<Plus className='w-4 h-4 mr-2' />
						Thêm dòng sản phẩm
					</Button>

					<div className='flex gap-2'>
						<Button
							variant='outline'
							onClick={handleClose}
						>
							Hủy
						</Button>

						<Button
							onClick={handleSubmit}
							disabled={
								!productVariants.some((v) => v.serialNumber && v.productVariantName)
							}
						>
							Thêm sản phẩm
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
