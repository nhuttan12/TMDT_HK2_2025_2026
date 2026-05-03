import { ReplenishmentLevel } from '@/types/inventories/stocks/ReplenishmentLevel';
import React, { JSX } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ProductInStock } from '@/types/inventories/stocks/ProductInStock';
import { getReplenishmentLabel } from '@/utils/inventories/stocks/replenishment-level-label';
import { Column } from '@/types/uis/Column';
import { DataTable } from '@/components/layout/admin/data-table';
import Pagination from '@/components/layout/share/pagination';
import { UseGoodsStockLogicReturn } from '@/hooks/inventories/stocks/use-goods-stock-logic';

interface GoodsStockTableProps extends UseGoodsStockLogicReturn {
	products: ProductInStock[];
}

export default function GoodsStockTableUi({
	products,
	handleViewVariant,
	handleEditVariant,
	handleSort,
	renderSortIcon,
	currentPage,
	changePage,
}: GoodsStockTableProps): JSX.Element {
	const replenishmentConfigs: Record<ReplenishmentLevel, string> = {
		immediate:
			'bg-red-100 text-red-700 border border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900',
		early: 'bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900',
		normal: 'bg-slate-100 text-slate-700 border dark:bg-slate-900 dark:text-slate-300',
	};

	const columns: Column<ProductInStock>[] = [
		{
			key: 'name',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Sản phẩm</span>
					{renderSortIcon('name')}
				</div>
			),
			onHeaderClick: () => handleSort('name'),
			render: (row: ProductInStock): JSX.Element => (
				<div className='flex items-center gap-3'>
					<Avatar className='w-10 h-10 rounded border'>
						<AvatarImage
							src={row.image}
							alt={row.name}
						/>
						<AvatarFallback className='rounded text-xs'>SP</AvatarFallback>
					</Avatar>
					<div className='max-w-75'>
						<p className='font-medium text-slate-900 truncate'>{row.name}</p>
						<p className='text-[13px] text-slate-500 font-mono leading-tight'>
							SKU biến thể sản phẩm: {row.variantSku}
						</p>
					</div>
				</div>
			),
		},
		{
			key: 'replenishment',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Mức độ bổ sung</span>
					{renderSortIcon('replenishment')}
				</div>
			),
			onHeaderClick: (): void => handleSort('replenishment'),
			render: (row: ProductInStock): JSX.Element => (
				<Badge
					className={`px-2 py-0.5 font-normal rounded-full ${replenishmentConfigs[row.replenishment]}`}
					variant='outline'
				>
					{getReplenishmentLabel(row.replenishment)}
				</Badge>
			),
		},
		{
			key: 'stock',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Tồn kho</span>
					{renderSortIcon('stock')}
				</div>
			),
			onHeaderClick: () => handleSort('stock'),
			render: (row: ProductInStock): JSX.Element => (
				<span className='font-semibold'>{row.stock.toLocaleString()}</span>
			),
		},
		{
			key: 'sales7d',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Bán 7 ngày</span>
					{renderSortIcon('sales7d')}
				</div>
			),
			onHeaderClick: () => handleSort('sales7d'),
			render: (row: ProductInStock): JSX.Element => (
				<span>{row.sales7d.toLocaleString()}</span>
			),
		},
		{
			key: 'sales30d',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Bán 30 ngày</span>
					{renderSortIcon('sales30d')}
				</div>
			),
			onHeaderClick: () => handleSort('sales30d'),
			render: (row: ProductInStock): JSX.Element => (
				<span>{row.sales30d.toLocaleString()}</span>
			),
		},
		{
			key: 'supplierName',
			header: (
				<div className='flex items-center gap-1 cursor-pointer select-none'>
					<span>Nhà cung cấp</span>
					{renderSortIcon('supplierName')}
				</div>
			),
			onHeaderClick: (): void => handleSort('supplierName'),
			render: (row: ProductInStock): JSX.Element => <span>{row.supplierName}</span>,
		},
	];

	const getRowKey = (row: ProductInStock): number => {
		return row.id || 0;
	};

	return (
		<Card className='border shadow-sm mt-3'>
			<CardHeader className='py-4 px-6 border-b bg-white'>
				<CardTitle className='text-base font-bold flex items-center gap-2'>
					Danh sách tồn kho sản phẩm
				</CardTitle>
			</CardHeader>
			<CardContent className='rounded-xl border bg-white'>
				<DataTable<ProductInStock>
					data={products}
					columns={columns}
					getRowKey={getRowKey}
					onRowClick={handleViewVariant}
					tableHeight={600}
					stickyHeader={true}
				/>
			</CardContent>

			<div className='pb-5'>
				<Pagination
					currentPage={currentPage}
					totalPages={10}
					onPageChange={changePage}
				/>
			</div>
		</Card>
	);
}
