'use client';

import { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronUp, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { CategoryListItemAdmin } from '@/types/categories/admin/CategoryListItemAdmin';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import {
	CategoryAdminSortField,
	CategoryAdminSortOrder,
} from '@/types/categories/admin/CategoryAdminSort';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';

interface Props {
	categories: CategoryListItemAdmin[];
}

export default function CategoryAdminTable({ categories }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const sortField = searchParams.get('sort') as CategoryAdminSortField | null;
	const sortOrder = searchParams.get('order') as CategoryAdminSortOrder;

	const handleSort = (field: CategoryAdminSortField): void => {
		const currentSort = searchParams.get('sort');
		const currentOrder = searchParams.get('order');

		let newOrder: CategoryAdminSortOrder = 'asc';

		if (currentSort === field) {
			newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
		}

		const params = new URLSearchParams(searchParams.toString());
		params.set('sort', field);
		params.set('order', newOrder);

		router.push(`?${params.toString()}`);
	};

	const renderSortIcon = (field: CategoryAdminSortField): JSX.Element | null => {
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
		router.push('/admin/categories/add-new');
	};

	const handleRedirectToCategoryViewMode = (categoryID: number) => {
		router.push(`/admin/categories/${categoryID}`);
	};

	const handleRedirectToEditCategoryEditMode = (categoryID: number) => {
		router.push(`/admin/categories/update/${categoryID}`);
	};

	return (
		<div className='space-y-4'>
			{/* Header */}
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold'>Quản lý danh mục</h1>
					<p className='text-sm text-muted-foreground'>
						Quản lý toàn bộ danh mục sản phẩm trong hệ thống
					</p>
				</div>

				<Button onClick={handleRedirectToAddNewProduct}>+ Thêm danh mục</Button>
			</div>

			{/* Search */}
			<div className='flex justify-between items-center'>
				<Input
					placeholder='Tìm danh mục...'
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
								<div className='flex items-center gap-1'>
									<span>Tên danh mục</span>
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
								onClick={() => handleSort('productCount')}
							>
								<div className='flex items-center gap-1'>
									<span>Số sản phẩm</span>
									{renderSortIcon('productCount')}
								</div>
							</TableHead>

							<TableHead
								className='cursor-pointer select-none'
								onClick={() => handleSort('status')}
							>
								<div className='flex items-center gap-1'>
									<span>Trạng thái</span>
									{renderSortIcon('status')}
								</div>
							</TableHead>

							<TableHead
								className='cursor-pointer select-none'
								onClick={() => handleSort('createdAt')}
							>
								<div className='flex items-center gap-1'>
									<span>Ngày tạo</span>
									{renderSortIcon('createdAt')}
								</div>
							</TableHead>

							<TableHead
								className='cursor-pointer select-none'
								onClick={() => handleSort('updatedAt')}
							>
								<div className='flex items-center gap-1'>
									<span>Ngày cập nhật</span>
									{renderSortIcon('updatedAt')}
								</div>
							</TableHead>

							<TableHead className='text-right'>Hành động</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody>
						{categories.map(
							(category: CategoryListItemAdmin): JSX.Element => (
								<TableRow
									key={category.categoryID}
									className='cursor-pointer'
									onClick={(): void =>
										handleRedirectToCategoryViewMode(category.categoryID)
									}
								>
									<TableCell>
										<div className='flex items-center gap-3'>
											<div className='relative w-12 h-12 rounded-md overflow-hidden border'>
												<Image
													src={category.image}
													alt={category.name}
													fill
													className='object-cover'
												/>
											</div>
											<span className='font-medium'>{category.name}</span>
										</div>
									</TableCell>

									<TableCell className='text-muted-foreground'>
										/{category.slug}
									</TableCell>

									<TableCell>
										{category.productCount > 0 ? (
											<span>{category.productCount}</span>
										) : (
											<Badge variant='secondary'>0 sản phẩm</Badge>
										)}
									</TableCell>

									<TableCell>
										{category.status ? (
											<Badge>Hoạt động</Badge>
										) : (
											<Badge variant='secondary'>Ẩn</Badge>
										)}
									</TableCell>

									<TableCell className='text-muted-foreground'>
										{category.createdAt}
									</TableCell>

									<TableCell className='text-muted-foreground'>
										{category.updatedAt}
									</TableCell>

									<TableCell className='text-right'>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant='ghost'
													size='icon'
													className='cursor-pointer'
												>
													<MoreHorizontal size={16} />
												</Button>
											</DropdownMenuTrigger>

											<DropdownMenuContent align='end'>
												<DropdownMenuItem
													onClick={(e): void => {
														e.stopPropagation();
														handleRedirectToEditCategoryEditMode(
															category.categoryID,
														);
													}}
												>
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
