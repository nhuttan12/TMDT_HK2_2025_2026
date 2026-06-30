'use client';

import { RevenueDashboardLogicReturn } from '@/hooks/analyst/use-revenue-dashboard-logic';
import { CategoryRevenue } from '@/types/analyst/CategoryRevenue';
import { RevenueChartItem } from '@/types/analyst/RevenueChartItem';
import { Loader2, TrendingUp, PieChart as PieIcon } from 'lucide-react';
import { JSX } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatMoney } from '@/utils/shared/money';

interface RevenueDashboardUIProps {
	logic: RevenueDashboardLogicReturn;
	chartData: RevenueChartItem[];
	categoryData: CategoryRevenue[];
	isLoading: boolean;
}

type RechartsTooltipValue = string | number | readonly (string | number)[] | undefined;

export function RevenueDashboardUI({
	logic,
	chartData,
	categoryData,
	isLoading,
}: RevenueDashboardUIProps): JSX.Element {
	// Bảng màu sắc tĩnh cho biểu đồ tròn, được suy luận kiểu tự động
	const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

	const pieChartData = categoryData.map((entry: CategoryRevenue, index: number) => ({
		...entry,
		fill: COLORS[index % COLORS.length],
	}));

	if (isLoading) {
		return (
			<div className='flex h-96 w-full items-center justify-center gap-2'>
				<Loader2 className='h-6 w-6 animate-spin text-primary' />
				<span className='text-sm text-muted-foreground'>Đang tải dữ liệu thống kê...</span>
			</div>
		);
	}

	return (
		<div className='w-full space-y-6 p-6'>
			{/* Khối bộ lọc thời gian */}
			<div className='flex flex-wrap items-center justify-between gap-4 border-b pb-4'>
				<div>
					<h1 className='text-2xl font-bold tracking-tight'>Thống kê doanh thu</h1>
					<p className='text-sm text-muted-foreground'>
						Quản lý và theo dõi hiệu suất dòng tiền của cửa hàng.
					</p>
				</div>

				<div className='flex items-center gap-3'>
					{/* Bộ chọn khoảng thời gian cho biểu đồ cột */}
					<div className='flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 shadow-sm'>
						<div className='flex items-center gap-1.5'>
							<span className='text-xs font-medium text-muted-foreground'>Từ:</span>
							<input
								type='date'
								value={logic.dateRange.start}
								className='bg-transparent text-sm focus:outline-none'
								onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
									logic.handleStartDateChange(e.target.value)
								}
							/>
						</div>

						<div className='h-4 w-px bg-border' />

						<div className='flex items-center gap-1.5'>
							<span className='text-xs font-medium text-muted-foreground'>Đến:</span>
							<input
								type='date'
								value={logic.dateRange.end}
								className='bg-transparent text-sm focus:outline-none'
								onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
									logic.handleEndDateChange(e.target.value)
								}
							/>
						</div>
					</div>

					{/* Bộ chọn tháng cho biểu đồ tròn */}
					<Select
						defaultValue={logic.selectedMonth}
						onValueChange={(value: string): void => logic.handleMonthChange(value)}
					>
						<SelectTrigger className='w-[150px]'>
							<SelectValue placeholder='Chọn tháng' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='2026-06'>Tháng 06/2026</SelectItem>
							<SelectItem value='2026-05'>Tháng 05/2026</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Grid chứa biểu đồ */}
			<div className='grid gap-6 md:grid-cols-3'>
				{/* Biểu đồ cột doanh thu hằng ngày (Chiếm 2 phần chiều rộng) */}
				<Card className='md:col-span-2'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<div className='space-y-1'>
							<CardTitle className='text-base font-medium'>
								Doanh thu theo thời gian
							</CardTitle>
						</div>
						<TrendingUp className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent className='pt-4'>
						<div className='h-[350px] w-full'>
							<ResponsiveContainer
								width='100%'
								height='100%'
							>
								<BarChart
									data={chartData}
									margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
								>
									<XAxis
										dataKey='label'
										stroke='#888888'
										fontSize={12}
										tickLine={false}
										axisLine={false}
										minTickGap={20}
									/>
									<YAxis
										stroke='#888888'
										fontSize={12}
										tickLine={false}
										axisLine={false}
										tickFormatter={(value: number): string =>
											`${value / 1000000}M`
										}
									/>
									<Tooltip
										formatter={(
											value: RechartsTooltipValue,
										): [string, string] => {
											if (Array.isArray(value)) {
												return [
													formatMoney(Number(value[0]) || 0),
													'Doanh thu',
												];
											}
											const numValue =
												typeof value === 'number'
													? value
													: Number(value) || 0;
											return [formatMoney(numValue), 'Doanh thu'];
										}}
										labelClassName='text-black font-semibold'
									/>
									<Bar
										dataKey='revenue'
										fill='#2563eb'
										radius={[4, 4, 0, 0]}
										maxBarSize={50}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>

						<div className='grid grid-cols-2 gap-2 text-xs'>
							{pieChartData.map(
								(entry): JSX.Element => (
									<div
										key={entry.categoryName}
										className='flex items-center gap-2'
									>
										{/* Sử dụng lại entry.fill thay vì tính toán lại COLORS */}
										<span
											className='h-3 w-3 shrink-0 rounded-full'
											style={{ backgroundColor: entry.fill }}
										/>
										<span
											className='truncate text-muted-foreground'
											title={entry.categoryName}
										>
											{entry.categoryName} ({entry.percentage}%)
										</span>
									</div>
								),
							)}
						</div>
					</CardContent>
				</Card>

				{/* Biểu đồ tròn cơ cấu danh mục hàng hóa (Chiếm 1 phần chiều rộng) */}
				<Card className='md:col-span-1'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<div className='space-y-1'>
							<CardTitle className='text-base font-medium'>
								Doanh thu theo danh mục
							</CardTitle>
						</div>
						<PieIcon className='h-4 w-4 text-muted-foreground' />
					</CardHeader>
					<CardContent className='pt-4'>
						<div className='flex h-[350px] flex-col justify-between'>
							<div className='h-[240px] w-full'>
								<ResponsiveContainer
									width='100%'
									height='100%'
								>
									<PieChart>
										<Pie
											data={pieChartData}
											cx='50%'
											cy='50%'
											innerRadius={60}
											outerRadius={80}
											paddingAngle={4}
											dataKey='revenue'
											nameKey='categoryName'
										/>
										<Tooltip
											formatter={(
												value: RechartsTooltipValue,
											): [string, string] => {
												if (Array.isArray(value)) {
													return [
														formatMoney(Number(value[0]) || 0),
														'Doanh thu',
													];
												}
												const numValue =
													typeof value === 'number'
														? value
														: Number(value) || 0;
												return [formatMoney(numValue), 'Doanh thu'];
											}}
										/>
									</PieChart>
								</ResponsiveContainer>
							</div>

							{/* Custom Chú thích danh mục phía dưới */}
							<div className='grid grid-cols-2 gap-2 text-xs'>
								{categoryData.map(
									(entry: CategoryRevenue, index: number): JSX.Element => (
										<div
											key={entry.categoryName}
											className='flex items-center gap-2'
										>
											<span
												className='h-3 w-3 shrink-0 rounded-full'
												style={{
													backgroundColor: COLORS[index % COLORS.length],
												}}
											/>
											<span
												className='truncate text-muted-foreground'
												title={entry.categoryName}
											>
												{entry.categoryName} ({entry.percentage}%)
											</span>
										</div>
									),
								)}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
