'use client';

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { JSX, useState } from 'react';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FilterState } from '@/types/uis/FilterState';

export default function ProductFilter(): JSX.Element {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const getParams = (): FilterState => ({
		minPrice: searchParams.get('minPrice'),
		maxPrice: searchParams.get('maxPrice'),
		rating: searchParams.get('rating'),
		brand: searchParams.get('brand'),
	});

	const [localMinPrice, setLocalMinPrice] = useState<number | undefined>();
	const [localMaxPrice, setLocalMaxPrice] = useState<number | undefined>();
	const [localRating, setLocalRating] = useState<number | undefined>();
	const [localBrand, setLocalBrand] = useState<string>('');

	const handleOpenChange = (open: boolean) => {
		if (!open) return;

		const { minPrice, maxPrice, rating, brand } = getParams();

		setLocalMinPrice(minPrice ? Number(minPrice) : undefined);
		setLocalMaxPrice(maxPrice ? Number(maxPrice) : undefined);
		setLocalRating(rating ? Number(rating) : undefined);
		setLocalBrand(brand || '');
	};

	const applyFilterToUrl = () => {
		const params = new URLSearchParams(searchParams.toString());

		if (localMinPrice !== undefined) params.set('minPrice', String(localMinPrice));
		else params.delete('minPrice');

		if (localMaxPrice !== undefined) params.set('maxPrice', String(localMaxPrice));
		else params.delete('maxPrice');

		if (localRating !== undefined) params.set('rating', String(localRating));
		else params.delete('rating');

		if (localBrand.trim()) params.set('brand', localBrand.trim());
		else params.delete('brand');

		router.push(`?${params.toString()}`);
	};

	const handleReset = () => {
		const params = new URLSearchParams(searchParams.toString());

		params.delete('minPrice');
		params.delete('maxPrice');
		params.delete('rating');
		params.delete('brand');

		router.push(`?${params.toString()}`);
	};

	return (
		<Dialog onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant='outline'>Lọc sản phẩm</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Bộ lọc sản phẩm</DialogTitle>
				</DialogHeader>

				<div className='space-y-6'>
					{/* Price */}
					<div className='space-y-2'>
						<Label>Khoảng giá</Label>
						<div className='flex gap-2'>
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
					<div className='space-y-2'>
						<Label>Đánh giá</Label>
						<Select
							value={localRating ? String(localRating) : undefined}
							onValueChange={(value: string): void => setLocalRating(Number(value))}
						>
							<SelectTrigger>
								<SelectValue placeholder='Chọn đánh giá' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='5'>5 sao</SelectItem>
								<SelectItem value='4'>4 sao trở lên</SelectItem>
								<SelectItem value='3'>3 sao trở lên</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Brand */}
					<div className='space-y-2'>
						<Label>Thương hiệu</Label>
						<Input
							type='text'
							value={localBrand}
							onChange={(e): void => setLocalBrand(e.target.value)}
							placeholder='Nhập thương hiệu'
						/>
					</div>
				</div>

				<DialogFooter className='mt-6'>
					<Button
						onClick={applyFilterToUrl}
						className='w-full cursor-pointer'
					>
						Áp dụng
					</Button>

					<Button
						variant='outline'
						onClick={handleReset}
						className='w-full'
					>
						Đặt lại
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
