import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
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
import { getPaymentMethodLabel, PaymentMethod } from '@/types/invoices/user/PaymentMethod';
import { InvoiceFilters } from '@/types/invoices/admin/InvoiceFilters';

const paymentMethods: PaymentMethod[] = ['COD', 'VNPAY', 'MoMo', 'CREDIT_CARD', 'BANK_TRANSFER'];

interface Props {
	onApply: (filters: InvoiceFilters) => void;
}

export default function InvoiceFilter({ onApply }: Props): JSX.Element {
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | 'ALL'>('ALL');

	const [dateFrom, setDateFrom] = useState('');
	const [dateTo, setDateTo] = useState('');

	const [minTotal, setMinTotal] = useState('');
	const [maxTotal, setMaxTotal] = useState('');

	const [minItems, setMinItems] = useState('');

	function applyFilter(): void {
		const filters: InvoiceFilters = {};

		if (paymentMethod !== 'ALL') filters.paymentMethod = paymentMethod;

		if (dateFrom) filters.dateFrom = dateFrom;
		if (dateTo) filters.dateTo = dateTo;

		if (minTotal) filters.minTotal = minTotal;
		if (maxTotal) filters.maxTotal = maxTotal;

		if (minItems) filters.minItems = minItems;

		onApply(filters);
	}

	function resetFilter(): void {
		setPaymentMethod('ALL');
		setDateFrom('');
		setDateTo('');
		setMinTotal('');
		setMaxTotal('');
		setMinItems('');
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='rounded-full'>Lọc</Button>
			</DialogTrigger>

			<DialogContent className='max-w-lg'>
				<DialogHeader>
					<DialogTitle>Bộ lọc hóa đơn</DialogTitle>
				</DialogHeader>

				<div className='space-y-4'>
					{/* PAYMENT METHOD */}
					<div className='space-y-2'>
						<p className='text-sm font-medium'>Phương thức thanh toán</p>

						<Select
							value={paymentMethod}
							onValueChange={(v) => setPaymentMethod(v as PaymentMethod | 'ALL')}
						>
							<SelectTrigger>
								<SelectValue placeholder='Phương thức thanh toán' />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value='ALL'>Tất cả</SelectItem>

								{paymentMethods.map(
									(method: PaymentMethod): JSX.Element => (
										<SelectItem
											key={method}
											value={method}
										>
											{getPaymentMethodLabel(method)}
										</SelectItem>
									),
								)}
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
