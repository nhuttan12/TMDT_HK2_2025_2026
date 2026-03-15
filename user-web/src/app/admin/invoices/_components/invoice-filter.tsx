import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { JSX, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function InvoiceFilter(): JSX.Element {
	const router: AppRouterInstance = useRouter();
	const searchParams: ReadonlyURLSearchParams = useSearchParams();

	const [status, setStatus] = useState<InvoiceStatus | 'ALL'>(
		(searchParams.get('status') as InvoiceStatus) || 'ALL',
	);

	const [dateFrom, setDateFrom] = useState(searchParams.get('dateFrom') || '');
	const [dateTo, setDateTo] = useState(searchParams.get('dateTo') || '');

	const [minTotal, setMinTotal] = useState(searchParams.get('minTotal') || '');
	const [maxTotal, setMaxTotal] = useState(searchParams.get('maxTotal') || '');

	const [minItems, setMinItems] = useState(searchParams.get('minItems') || '');

	function applyFilter(): void {
		const params = new URLSearchParams();

		if (status !== 'ALL') params.set('status', status);

		if (dateFrom) params.set('dateFrom', dateFrom);
		if (dateTo) params.set('dateTo', dateTo);

		if (minTotal) params.set('minTotal', minTotal);
		if (maxTotal) params.set('maxTotal', maxTotal);

		if (minItems) params.set('minItems', minItems);

		router.push(`/admin/invoices?${params.toString()}`);
	}

	function resetFilter(): void {
		setStatus('ALL');
		setDateFrom('');
		setDateTo('');
		setMinTotal('');
		setMaxTotal('');
		setMinItems('');
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Lọc</Button>
			</DialogTrigger>

			<DialogContent className='max-w-lg'>
				<DialogHeader>
					<DialogTitle>Bộ lọc hóa đơn</DialogTitle>
				</DialogHeader>

				<div className='space-y-4'>
					{/* STATUS */}
					<div className='space-y-2'>
						<p className='text-sm font-medium'>Trạng thái</p>

						<Select
							value={status}
							onValueChange={(v) => setStatus(v as InvoiceStatus | 'ALL')}
						>
							<SelectTrigger>
								<SelectValue placeholder='Trạng thái' />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value='ALL'>Tất cả</SelectItem>
								<SelectItem value='PENDING'>Chờ thanh toán</SelectItem>
								<SelectItem value='PAID'>Đã thanh toán</SelectItem>
								<SelectItem value='COMPLETED'>Hoàn tất</SelectItem>
								<SelectItem value='CANCELLED'>Đã hủy</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* DATE */}
					<div className='grid grid-cols-2 gap-3'>
						<div className='space-y-2'>
							<p className='text-sm font-medium'>Từ ngày</p>
							<Input
								type='date'
								value={dateFrom}
								onChange={(e) => setDateFrom(e.target.value)}
							/>
						</div>

						<div className='space-y-2'>
							<p className='text-sm font-medium'>Đến ngày</p>
							<Input
								type='date'
								value={dateTo}
								onChange={(e) => setDateTo(e.target.value)}
							/>
						</div>
					</div>

					{/* TOTAL */}
					<div className='grid grid-cols-2 gap-3'>
						<Input
							type='number'
							placeholder='Tổng tiền từ'
							value={minTotal}
							onChange={(e) => setMinTotal(e.target.value)}
						/>

						<Input
							type='number'
							placeholder='Tổng tiền đến'
							value={maxTotal}
							onChange={(e) => setMaxTotal(e.target.value)}
						/>
					</div>

					{/* ITEMS */}
					<div className='space-y-2'>
						<p className='text-sm font-medium'>Số sản phẩm ≥</p>

						<Input
							type='number'
							placeholder='Ví dụ: 2'
							value={minItems}
							onChange={(e) => setMinItems(e.target.value)}
						/>
					</div>

					{/* ACTION */}
					<div className='flex justify-between pt-3'>
						<Button
							variant='ghost'
							onClick={resetFilter}
						>
							Reset
						</Button>

						<Button onClick={applyFilter}>Áp dụng</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
