import { DashboardStatsResponse } from '@/types/analyst/DashboardStatsResponse';
import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { getInvoiceStatusHexColor } from '@/utils/invoices/invoice-status-hex-color';
import { getInvoiceStatusLabel } from '@/utils/invoices/invoice-status-label';
import { getInvoiceStatusTextClassColor } from '@/utils/invoices/invoice-status-text-class-color';
import { formatDate } from '@/utils/shared/date';
import { RefreshCcw } from 'lucide-react';
import React from 'react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

export interface DashboardChartsUiProps {
	data: DashboardStatsResponse;
	timeRange: string;
	isFetching: boolean;
	onTimeRangeChange: (range: string) => void;
	onRefresh: () => void;
}

export const DashboardChartsUi = ({
	data,
	timeRange,
	isFetching,
	onTimeRangeChange,
	onRefresh,
}: DashboardChartsUiProps): React.ReactElement => {
	// Hàm hỗ trợ format tiền tệ cho trục Y và Tooltip
	const formatCurrency = (value: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(value);
	};

	return (
		<div className='flex flex-col gap-6 p-6'>
			{/* Header & Controls */}
			<div className='flex items-center justify-between'>
				<h2 className='text-2xl font-bold text-slate-800'>Tổng quan kinh doanh</h2>
				<div className='flex items-center gap-4'>
					<select
						className='p-2 text-sm border rounded-md border-slate-300'
						value={timeRange}
						onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => {
							onTimeRangeChange(e.target.value);
						}}
					>
						<option value='7_days'>7 ngày qua</option>
						<option value='30_days'>30 ngày qua</option>
					</select>

					<button
						onClick={onRefresh}
						disabled={isFetching}
						className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
					>
						<RefreshCcw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
						Làm mới
					</button>
				</div>
			</div>

			{/* Charts Grid */}
			<div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
				{/* 1. Cơ cấu trạng thái (Pie Chart) */}
				<div className='p-4 bg-white border rounded-lg shadow-sm border-slate-200 h-80'>
					<h3 className='mb-4 text-sm font-semibold text-slate-600'>Cơ cấu trạng thái</h3>
					<ResponsiveContainer
						width='100%'
						height='100%'
					>
						<PieChart>
							<Pie
								data={data.statusStructure}
								dataKey='count'
								nameKey='status'
								cx='50%'
								cy='50%'
								innerRadius={60}
								outerRadius={80}
								paddingAngle={5}
							>
								{data.statusStructure.map((entry, index) => {
									const color: string = getInvoiceStatusHexColor(entry.status);
									return (
										<Cell
											key={`cell-${index}`}
											fill={color}
										/>
									);
								})}
							</Pie>
							<Tooltip
								formatter={(
									value:
										| number
										| string
										| ReadonlyArray<number | string>
										| undefined,
									name: number | string | undefined,
								): [number, string] => {
									// 1. Type Guard & Fallback an toàn cho value
									// Nếu value là number thì lấy, nếu là string có thể convert thì ép sang Number, còn lại cho bằng 0
									const safeValue: number =
										typeof value === 'number' ? value : Number(value) || 0;

									// 2. Type Guard & Fallback an toàn cho name
									const safeName: string =
										typeof name === 'string' ? name : String(name ?? '');

									// 3. Mapping label với kiểu dữ liệu đã được bảo kê (safe)
									const label: string = getInvoiceStatusLabel(
										safeName as InvoiceStatus,
									);

									// Trả về tuple chuẩn [ValueType, NameType] để render lên UI
									return [safeValue, label];
								}}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>

				{/* 2. Biến động GMV (Line Chart) */}
				<div className='p-4 bg-white border rounded-lg shadow-sm border-slate-200 h-80'>
					<h3 className='mb-4 text-sm font-semibold text-slate-600'>Biến động GMV</h3>
					<ResponsiveContainer
						width='100%'
						height='100%'
					>
						<LineChart data={data.gmvFluctuation}>
							<CartesianGrid
								strokeDasharray='3 3'
								vertical={false}
							/>
							<XAxis
								dataKey='date'
								tickFormatter={(val: string): string => formatDate(val)}
								tick={{ fontSize: 12 }}
							/>
							<YAxis
								tickFormatter={(val: number): string => formatCurrency(val)}
								width={100}
								tick={{ fontSize: 12 }}
							/>
							<Tooltip
								labelFormatter={(label: React.ReactNode): React.ReactNode => {
									// 1. Type Guard: Chỉ xử lý format ngày tháng nếu label thực sự là chuỗi hoặc số
									if (typeof label === 'string' || typeof label === 'number') {
										return formatDate(String(label));
									}

									// Fallback an toàn cho các trường hợp label là null, undefined hoặc 1 Component
									return '';
								}}
								formatter={(
									value:
										| number
										| string
										| ReadonlyArray<number | string>
										| undefined,
								): [string, string] => {
									const safeValue: number =
										typeof value === 'number' ? value : Number(value) || 0;
									return [formatCurrency(safeValue), 'Doanh thu'];
								}}
							/>
							<Line
								type='monotone'
								dataKey='value'
								stroke='#2563eb'
								strokeWidth={2}
								dot={{ r: 4 }}
								activeDot={{ r: 6 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				{/* 3. Lưu lượng hóa đơn (Bar Chart) */}
				<div className='p-4 bg-white border rounded-lg shadow-sm border-slate-200 h-80'>
					<h3 className='mb-4 text-sm font-semibold text-slate-600'>Lưu lượng hóa đơn</h3>
					<ResponsiveContainer
						width='100%'
						height='100%'
					>
						<BarChart data={data.invoiceVolume}>
							<CartesianGrid
								strokeDasharray='3 3'
								vertical={false}
							/>
							<XAxis
								dataKey='date'
								tickFormatter={(val: string): string => formatDate(val)}
								tick={{ fontSize: 12 }}
							/>
							<YAxis tick={{ fontSize: 12 }} />
							<Tooltip
								labelFormatter={(label: React.ReactNode): React.ReactNode => {
									// Type Guard: Chỉ xử lý format nếu label là string hoặc number
									if (typeof label === 'string' || typeof label === 'number') {
										// Ép về string an toàn trước khi đẩy vào hàm formatDate
										return formatDate(String(label));
									}

									// Fallback an toàn cho các trường hợp null, undefined, hoặc component
									return '';
								}}
								formatter={(
									value:
										| number
										| string
										| ReadonlyArray<number | string>
										| undefined,
								): [string, string] => {
									// Type Guard an toàn cho value: Lấy number hoặc tự động fallback về 0
									const safeValue: number =
										typeof value === 'number' ? value : Number(value) || 0;

									return [`${safeValue} đơn`, 'Số lượng'];
								}}
								cursor={{ fill: '#f1f5f9' }}
							/>
							<Bar
								dataKey='value'
								fill='#0d9488'
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};
