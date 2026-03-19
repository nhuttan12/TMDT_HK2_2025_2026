import { JSX, useState } from 'react';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import Image from 'next/image';
import ProductStatusBadge from '@/components/product/admin/product-status-badge';
import { formatDate } from '@/utils/shared/date';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { ProductAdminSortField } from '@/types/products/admin/ProductAdminSort';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';

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
	const [selected, setSelected] = useState<number[]>([]);

	const toggleSelect = (productID: number): void => {
		setSelected((prev: number[]): number[] =>
			prev.includes(productID)
				? prev.filter((x: number): boolean => x !== productID)
				: [...prev, productID],
		);
	};

	const toggleSelectAll = (): void => {
		if (selected.length === products.length) {
			setSelected([]);
		} else {
			setSelected(products.map((i: ProductListInfoAdmin): number => i.id));
		}
	};

	const columns: Column<ProductListInfoAdmin>[] = [
		{
			key: 'name',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Sản phẩm</span>
					{renderSortIcon('name')}
				</div>
			),
			onHeaderClick: (): void => handleSort('name'),
			render: (row: ProductListInfoAdmin): JSX.Element => (
				<div className='flex items-center gap-3'>
					<div className='relative w-12 h-12 rounded-md overflow-hidden border'>
						<Image
							src={row.image}
							alt={row.name}
							fill
							className='object-cover'
						/>
					</div>
					<span className='font-medium'>{row.name}</span>
				</div>
			),
		},
		{
			key: 'slug',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Slug</span>
					{renderSortIcon('slug')}
				</div>
			),
			onHeaderClick: (): void => handleSort('slug'),
			render: (row: ProductListInfoAdmin): JSX.Element => (
				<span className='text-muted-foreground'>{row.slug}</span>
			),
		},
		{
			key: 'salePrice',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Giá</span>
					{renderSortIcon('price')}
				</div>
			),
			onHeaderClick: (): void => handleSort('price'),
			render: (row: ProductListInfoAdmin): string => `${row.salePrice.toLocaleString()}₫`,
		},
		{
			key: 'status',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Trạng thái</span>
					{renderSortIcon('isActive')}
				</div>
			),
			onHeaderClick: (): void => handleSort('isActive'),
			render: (row: ProductListInfoAdmin): JSX.Element => (
				<ProductStatusBadge status={row.status} />
			),
		},
		{
			key: 'createdAt',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Ngày thêm</span>
					{renderSortIcon('createdAt')}
				</div>
			),
			onHeaderClick: (): void => handleSort('createdAt'),
			render: (row: ProductListInfoAdmin): JSX.Element => (
				<span className='text-muted-foreground'>{formatDate(row.createdAt)}</span>
			),
		},
		{
			key: 'updatedAt',
			header: (
				<div
					className='flex items-center gap-1 cursor-pointer select-none'
					onClick={() => handleSort('updatedAt')}
				>
					<span>Ngày điều chỉnh</span>
					{renderSortIcon('updatedAt')}
				</div>
			),
			render: (row: ProductListInfoAdmin): JSX.Element => (
				<span className='text-muted-foreground'>{formatDate(row.updatedAt)}</span>
			),
		},
		{
			key: 'actions',
			header: <span className='text-right block'>Hành động</span>,
			render: (row: ProductListInfoAdmin): JSX.Element => (
				<div
					className='text-right'
					onClick={(e) => e.stopPropagation()}
				>
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
							<DropdownMenuItem onClick={() => onEdit(row.id)}>
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
				</div>
			),
		},
	];

	return (
		<DataTable
			data={products}
			columns={columns}
			onRowClick={(row: ProductListInfoAdmin): void => onView(row.id)}
			getRowKey={(row: ProductListInfoAdmin): number => row.id}
			selectable={{
				selected: selected,
				onToggle: toggleSelect,
				onToggleAll: toggleSelectAll,
			}}
		/>
	);
}
