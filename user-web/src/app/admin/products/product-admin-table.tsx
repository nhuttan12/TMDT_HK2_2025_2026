'use client';

import { JSX, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronUp, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { ProductAdmin } from '@/types/products/admin/ProductAdmin';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { formatDate } from '@/utils/date';
import {
	ProductAdminSortField,
	ProductAdminSortOrder,
} from '@/types/products/admin/ProductAdminSort';

interface Props {
	products: ProductAdmin[];
	sortField: ProductAdminSortField;
	sortOrder: ProductAdminSortOrder;
}

export default function ProductAdminTable({ products }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const sortField = searchParams.get('sort') as ProductAdminSortField | null;
	const sortOrder = searchParams.get('order') as ProductAdminSortOrder;

	const handleSort = (field: ProductAdminSortField) => {
		const currentSort: string | null = searchParams.get('sort');
		const currentOrder: string | null = searchParams.get('order');

		let newOrder: ProductAdminSortOrder = 'asc';

		if (currentSort === field) {
			if (currentOrder === 'asc') newOrder = 'desc';
			else newOrder = 'asc';
		}

		const params = new URLSearchParams(searchParams.toString());
		params.set('sort', field);
		params.set('order', newOrder);

		router.push(`?${params.toString()}`);
	};

	const renderSortIcon = (field: ProductAdminSortField) => {
		if (sortField !== field) return null;

		if (sortOrder === 'asc')
			return (
				<ChevronUp
					size={14}
					className='inline ml-1'
				/>
			);

		if (sortOrder === 'desc')
			return (
				<ChevronDown
					size={14}
					className='inline ml-1'
				/>
			);

		return null;
	};

	const handleRedirectToAddNewProduct = () => {
		router.push('/admin/products/add-new');
	};

	return (
		<div className='space-y-4'>
			{/* Header */}
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold'>Quản lý sản phẩm</h1>
					<p className='text-sm text-muted-foreground'>
						Quản lý toàn bộ sản phẩm trong hệ thống
					</p>
				</div>

				<Button onClick={handleRedirectToAddNewProduct}>+ Thêm sản phẩm</Button>
			</div>

			{/* Search */}
			<div className='flex justify-between items-center'>
				<Input
					placeholder='Tìm sản phẩm...'
					className='max-w-sm'
				/>
			</div>

			{/* Table */}
			<div className='rounded-xl border bg-white'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead
								className='cursor-pointer select-none'
								onClick={() => handleSort('name')}
							>
								<div className='flex items-center justify-start gap-1'>
									<span>Sản phẩm</span>
									{renderSortIcon('name')}
								</div>
							</TableHead>

							<TableHead
								className='cursor-pointer select-none'
								onClick={() => handleSort('slug')}
							>
								<div className='flex items-center gap-1'>
									<span>Slug</span>
									{renderSortIcon('slug')}
								</div>
							</TableHead>

							<TableHead
								className='cursor-pointer select-none'
								onClick={() => handleSort('price')}
							>
								<div className='flex items-center justify-start gap-1'>
									<span>Giá</span>
									{renderSortIcon('price')}
								</div>
							</TableHead>

							<TableHead
								className='cursor-pointer select-none'
								onClick={() => handleSort('stock')}
							>
								<div className='flex items-center justify-start gap-1'>
									<span>Tồn kho</span>
									{renderSortIcon('stock')}
								</div>
							</TableHead>

							<TableHead
								className='cursor-pointer select-none'
								onClick={() => handleSort('isActive')}
							>
								<div className='flex items-center justify-start gap-1'>
									<span>Trạng thái</span>
									{renderSortIcon('isActive')}
								</div>
							</TableHead>

							<TableHead
								className='cursor-pointer select-none'
								onClick={() => handleSort('createdAt')}
							>
								<div className='flex items-center gap-1'>
									<span>Ngày thêm</span>
									{renderSortIcon('createdAt')}
								</div>
							</TableHead>

							<TableHead
								className='cursor-pointer select-none'
								onClick={() => handleSort('updatedAt')}
							>
								<div className='flex items-center gap-1'>
									<span>Ngày điều chỉnh</span>
									{renderSortIcon('updatedAt')}
								</div>
							</TableHead>

							<TableHead className='text-right'>Hành động</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{products.map(
							(product: ProductAdmin): JSX.Element => (
								<TableRow key={product.productID}>
									{/* Product Info */}
									<TableCell>
										<div className='flex items-center gap-3'>
											<div className='relative w-12 h-12 rounded-md overflow-hidden border'>
												<Image
													src={product.image}
													alt={product.name}
													fill
													className='object-cover'
												/>
											</div>
											<span className='font-medium'>{product.name}</span>
										</div>
									</TableCell>

									{/*Slug*/}
									<TableCell className='text-muted-foreground'>
										{product.slug}
									</TableCell>

									{/* Price */}
									<TableCell>{product.price.toLocaleString()}₫</TableCell>

									{/* Stock */}
									<TableCell>
										{product.stock > 0 ? (
											<span>{product.stock}</span>
										) : (
											<Badge variant='destructive'>Hết hàng</Badge>
										)}
									</TableCell>

									{/* Status */}
									<TableCell>
										{product.isActive ? (
											<Badge>Đang bán</Badge>
										) : (
											<Badge variant='secondary'>Ẩn</Badge>
										)}
									</TableCell>

									{/* Create At */}
									<TableCell className='text-muted-foreground'>
										{formatDate(product.createdAt)}
									</TableCell>

									{/* Update At */}
									<TableCell className='text-muted-foreground'>
										{formatDate(product.updatedAt)}
									</TableCell>

									{/* Actions */}
									<TableCell className='text-right'>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant='ghost'
													size='icon'
												>
													<MoreHorizontal size={16} />
												</Button>
											</DropdownMenuTrigger>

											<DropdownMenuContent align='end'>
												<DropdownMenuItem>
													<Pencil
														size={14}
														className='mr-2'
													/>
													Chỉnh sửa
												</DropdownMenuItem>

												<DropdownMenuItem className='text-red-500'>
													<Trash
														size={14}
														className='mr-2'
													/>
													Xóa
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							),
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
