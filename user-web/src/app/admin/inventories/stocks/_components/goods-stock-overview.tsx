'use client'

import { GoodsStockSummaryItem } from '@/types/inventories/stocks/GoodsStockSummaryItem';
import { JSX } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface GoodsStockOverviewProps {
	goodsStockSummary: GoodsStockSummaryItem[];
}

export default function GoodsStockOverview({
	goodsStockSummary,
}: GoodsStockOverviewProps): JSX.Element {
	return (
		<div className='w-full rounded-lg border bg-white shadow-sm overflow-hidden'>
			{/* Phần Header */}
			<div className='flex items-baseline gap-2 px-6 py-4 border-b bg-white'>
				<h2 className='text-lg font-semibold text-slate-900'>Tổng quan tồn kho</h2>
			</div>

			{/* Phần Nội dung: Dùng grid chia 5 cột và divide-x để tạo đường kẻ dọc */}
			<div className='grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x bg-white'>
				{goodsStockSummary.map(
					(item: GoodsStockSummaryItem): JSX.Element => (
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
