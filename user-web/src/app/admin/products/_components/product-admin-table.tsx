import { JSX } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import Image from 'next/image';
import ProductStatusBadge from '@/components/product/admin/product-status-badge';
import { formatDate } from '@/utils/date';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { ProductAdminSortField } from '@/types/products/admin/ProductAdminSort';

interface Props {
	products: ProductListInfoAdmin[];
	handleSort: (field: ProductAdminSortField) => void;
	renderSortIcon: (field: ProductAdminSortField) => JSX.Element | null;

	onView: (id: number) => void;
	onEdit: (id: number) => void;
}

export default function ProductAdminTable({
	products,
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
					(product: ProductListInfoAdmin): JSX.Element => (
						<TableRow
							key={product.productID}
							className='cursor-pointer'
							onClick={(): void => onView(product.productID)}
						>
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
							<TableCell className='text-muted-foreground'>{product.slug}</TableCell>

							{/* Price */}
							<TableCell>{product.price.toLocaleString()}₫</TableCell>

							{/* Status */}
							<TableCell>
								<ProductStatusBadge status={product.status} />
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
											className='cursor-pointer'
										>
											<MoreHorizontal size={16} />
										</Button>
									</DropdownMenuTrigger>

									<DropdownMenuContent align='end'>
										<DropdownMenuItem
											onClick={(e): void => {
												e.stopPropagation();
												onEdit(product.productID);
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
