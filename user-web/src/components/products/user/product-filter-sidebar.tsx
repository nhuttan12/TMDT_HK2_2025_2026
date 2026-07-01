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
import { CategoryOption } from '@/types/products/user/CategoryOption';
import { ShopOption } from '@/types/products/user/ShopOption';

interface ProductFilterSidebarProps {
	categories: CategoryOption[];
	shops: ShopOption[];
}

export default function ProductFilterSidebar({
	categories,
	shops,
}: ProductFilterSidebarProps): JSX.Element {
	// Gọi Logic Hook và giải nén (destructure) toàn bộ Data + Actions
	const {
		localMinPrice,
		localMaxPrice,
		localCategory,
		localShopName,
		setLocalMinPrice,
		setLocalMaxPrice,
		setLocalCategory,
		setLocalShopName,
		applyFilterToUrl,
		handleReset,
	} = useProductFilterLogic();

	return (
		<div className='flex flex-col w-full gap-2 p-5 bg-white border border-slate-200 rounded-xl'>
			<div>
				<h3 className='text-lg font-bold text-slate-800'>Bộ lọc sản phẩm</h3>
			</div>

			<div className='space-y-2'>
				{/* Khoảng giá */}
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

				{/* Danh mục */}
				<div className='space-y-3'>
					<Label className='font-semibold'>Danh mục</Label>
					<Select
						value={localCategory || undefined}
						onValueChange={(value: string): void => setLocalCategory(value)}
					>
						<SelectTrigger>
							<SelectValue placeholder='Chọn danh mục' />
						</SelectTrigger>
						<SelectContent>
							{categories.map((category) => (
								<SelectItem key={category.id} value={category.name}>
									{category.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Tên cửa hàng */}
				<div className='space-y-3'>
					<Label className='font-semibold'>Tên cửa hàng</Label>
					<Select
						value={localShopName || undefined}
						onValueChange={(value: string): void => setLocalShopName(value)}
					>
						<SelectTrigger>
							<SelectValue placeholder='Chọn cửa hàng' />
						</SelectTrigger>
						<SelectContent>
							{shops.map((shop) => (
								<SelectItem key={shop.id} value={shop.name}>
									{shop.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
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
