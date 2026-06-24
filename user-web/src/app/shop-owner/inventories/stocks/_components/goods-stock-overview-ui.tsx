'use client';

import { GoodsStockSummaryItem } from '@/types/inventories/stocks/GoodsStockSummaryItem';
import { JSX } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import { ProductInStockFilterValues } from '@/types/inventories/stocks/ProductInStockFilterValues';
import { FilterField } from '@/types/uis/FilterField';

interface GoodsStockOverviewProps {
	goodsStockSummary: GoodsStockSummaryItem[];
}

export default function GoodsStockOverviewUi({
	goodsStockSummary,
}: GoodsStockOverviewProps): JSX.Element {
	const productInStockFilterFields: FilterField<ProductInStockFilterValues>[] = [
		{
			key: 'name',
			label: 'Tên sản phẩm',
			type: 'text',
		},
		{
			key: 'variantSku',
			label: 'Mã SKU',
			type: 'text',
		},
		{
			key: 'supplierName',
			label: 'Nhà cung cấp',
			type: 'text',
		},
		{
			key: 'replenishment',
			label: 'Mức độ bổ sung hàng',
			type: 'select',
			options: [
				{ label: 'Bổ sung ngay (Hết hàng)', value: 'immediate' },
				{ label: 'Sắp hết hàng', value: 'early' },
				{ label: 'Bình thường', value: 'normal' },
			],
		},
		{
			key: 'minStock',
			label: 'Tồn kho tối thiểu',
			type: 'number',
		},
		{
			key: 'maxStock',
			label: 'Tồn kho tối đa',
			type: 'number',
		},
		{
			key: 'minSales7d',
			label: 'Đã bán 7 ngày (tối thiểu)',
			type: 'number',
		},
		{
			key: 'maxSales7d',
			label: 'Đã bán 7 ngày (tối đa)',
			type: 'number',
		},
		{
			key: 'minSales30d',
			label: 'Đã bán 30 ngày (tối thiểu)',
			type: 'number',
		},
		{
			key: 'maxSales30d',
			label: 'Đã bán 30 ngày (tối đa)',
			type: 'number',
		},
	];

	return (
		<div className='space-y-4'>
			{/* Phần Header */}
			<div className='flex items-baseline gap-2 px-6 py-4 border-b bg-white'>
				<AdminTableHeader<ProductInStockFilterValues>
					title='Tổng quan tồn kho'
					description='Quản lý thông tin số lượng tồn kho của từng sản phẩm phân loại'
					searchPlaceholder='Tìm theo tên phân loại'
					filter
					filterField={productInStockFilterFields}
				/>
			</div>

			{/* Phần Nội dung: Dùng grid chia 5 cột và divide-x để tạo đường kẻ dọc */}
			<div className='grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x bg-white'>
				{goodsStockSummary.map(
					(item): JSX.Element => (
						<div
							key={item.id}
							className='flex flex-col items-center justify-center p-6 text-center hover:bg-slate-50 transition-colors'
						>
							<span className='text-3xl font-bold text-slate-900 mb-2'>
								{item.value.toLocaleString()}
							</span>

							<div className='flex items-center gap-1.5 text-sm text-slate-600'>
								<span>{item.label}</span>

								{/* Tooltip giải thích ý nghĩa */}
								<TooltipProvider delayDuration={200}>
									<Tooltip>
										<TooltipTrigger asChild>
											<HelpCircle className='w-4 h-4 text-slate-400 hover:text-slate-600 cursor-help outline-none' />
										</TooltipTrigger>
										<TooltipContent
											side='top'
											className='max-w-[200px] text-center'
										>
											<p>{item.tooltipText}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
}
