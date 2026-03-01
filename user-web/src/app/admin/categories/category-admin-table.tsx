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
import { CategoryAdmin } from '@/types/categories/admin/CategoryAdmin';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import {
	CategoryAdminSortField,
	CategoryAdminSortOrder,
} from '@/types/categories/admin/CategoryAdminSort';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface Props {
	categories: CategoryAdmin[];
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

				<Button>+ Thêm danh mục</Button>
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
							(category: CategoryAdmin): JSX.Element => (
								<TableRow key={category.categoryID}>
									<TableCell className='font-medium'>{category.name}</TableCell>

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
										{category.isActive ? (
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
