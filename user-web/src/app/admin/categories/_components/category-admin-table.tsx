import { JSX } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { CategoryListItemAdmin } from '@/types/categories/admin/CategoryListItemAdmin';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { CategoryAdminSortField } from '@/types/categories/admin/CategoryAdminSort';
import CategoryStatusBadge from '@/components/category/admin/category-status-badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';

interface Props {
	categories: CategoryListItemAdmin[];
	handleSort: (field: CategoryAdminSortField) => void;
	renderSortIcon: (field: CategoryAdminSortField) => JSX.Element | null;

	onView: (id: number) => void;
	onEdit: (id: number) => void;
}

export default function CategoryAdminTable({
	categories,
	handleSort,
	renderSortIcon,
	onView,
	onEdit,
}: Props): JSX.Element {
	return (
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
							onClick={(): void => onView(category.categoryID)}
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
								<CategoryStatusBadge status={category.status} />
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
												onEdit(category.categoryID);
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
	);
}
