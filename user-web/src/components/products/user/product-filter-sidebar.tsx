'use client';

import { JSX } from 'react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Import Custom Hook vừa tạo (chỉnh lại đường dẫn cho đúng dự án của bạn)
import { useProductFilterLogic } from '@/hooks/products/user/use-product-filter-logic';

export default function ProductFilterSidebar(): JSX.Element {
	// Gọi Logic Hook và giải nén (destructure) toàn bộ Data + Actions
	const {
		localMinPrice,
		localMaxPrice,
		localRating,
		localBrand,
		setLocalMinPrice,
		setLocalMaxPrice,
		setLocalRating,
		setLocalBrand,
		applyFilterToUrl,
		handleReset,
	} = useProductFilterLogic();

	return (
		<div className='flex flex-col w-full gap-2 p-5 bg-white border border-slate-200 rounded-xl'>
			<div>
				<h3 className='text-lg font-bold text-slate-800'>Bộ lọc sản phẩm</h3>
			</div>

			<div className='space-y-2'>
				{/* Price */}
				<div className='space-y-3'>
					<Label className='font-semibold'>Khoảng giá (VNĐ)</Label>
					<div className='flex items-center gap-2'>
						<Input
							type='number'
							placeholder='Từ'
							value={localMinPrice ?? ''}
							onChange={(e): void =>
								setLocalMinPrice(
									e.target.value ? Number(e.target.value) : undefined,
								)
							}
						/>
						<span className='text-slate-400'>-</span>
						<Input
							type='number'
							placeholder='Đến'
							value={localMaxPrice ?? ''}
							onChange={(e): void =>
								setLocalMaxPrice(
									e.target.value ? Number(e.target.value) : undefined,
								)
							}
						/>
					</div>
				</div>

				{/* Rating */}
				<div className='space-y-3'>
					<Label className='font-semibold'>Đánh giá</Label>
					<Select
						value={localRating ? String(localRating) : undefined}
						onValueChange={(value: string): void => setLocalRating(Number(value))}
					>
						<SelectTrigger>
							<SelectValue placeholder='Chọn đánh giá' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='5'>5 sao</SelectItem>
							<SelectItem value='4'>Từ 4 sao</SelectItem>
							<SelectItem value='3'>Từ 3 sao</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Brand */}
				<div className='space-y-3'>
					<Label className='font-semibold'>Thương hiệu</Label>
					<Input
						type='text'
						value={localBrand}
						onChange={(e): void => setLocalBrand(e.target.value)}
						placeholder='Ví dụ: TerraCraft'
					/>
				</div>
			</div>

			{/* Actions */}
			<div className='flex flex-col gap-3 mt-2'>
				<Button
					onClick={applyFilterToUrl}
					className='w-full cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90'
				>
					Áp dụng
				</Button>

				<Button
					variant='outline'
					onClick={handleReset}
					className='w-full cursor-pointer text-slate-600'
				>
					Xóa bộ lọc
				</Button>
			</div>
		</div>
	);
}
