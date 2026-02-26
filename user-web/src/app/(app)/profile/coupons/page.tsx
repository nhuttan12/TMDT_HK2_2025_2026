'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Coupon } from '@/types/coupons/Coupon';
import { TicketPercent, Truck } from 'lucide-react';
import { JSX } from 'react';

const coupons: Coupon[] = [
	{
		couponID: '1',
		title: 'Giảm 20%',
		couponType: 'Sale',
		description: 'Giảm tối đa 100.000đ cho đơn từ 500.000đ',
		expiredAt: '28/02/2026',
		code: 'SALE20',
	},
	{
		couponID: '2',
		title: 'Freeship',
		couponType: 'Ship',
		description: 'Miễn phí vận chuyển cho đơn từ 200.000đ',
		expiredAt: '05/03/2026',
		code: 'FREESHIP',
	},
];

export default function CouponsPage(): JSX.Element {
	return (
		<div className='min-h-screen bg-slate-50 p-6'>
			<div className='max-w-4xl mx-auto space-y-6'>
				<div>
					<h1 className='text-2xl font-bold text-slate-800'>
						<strong>Mã giảm giá của bạn</strong>
					</h1>
					<p className='text-slate-500 text-sm'>Sử dụng trước khi hết hạn</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					{coupons.map(
						(coupon: Coupon): JSX.Element => (
							<Card
								key={coupon.couponID}
								className='flex overflow-hidden rounded-2xl shadow-sm border border-slate-200'
							>
								{/* Left */}
								<div className='w-32 bg-red-500 text-white flex flex-col items-center justify-center p-4 relative'>
									{coupon.couponType == 'Sale' ? (
										<TicketPercent size={28} />
									) : (
										<Truck size={28} />
									)}
									<div className='text-lg font-bold mt-2'>{coupon.title}</div>

									{/* Dashed divider effect */}
									<div className='absolute right-0 top-0 h-full w-2 bg-slate-50'>
										<div className='h-full border-r-2 border-dashed border-red-400'></div>
									</div>
								</div>

								{/* Right */}
								<div className='flex-1 p-2 flex flex-col justify-between'>
									<div>
										<h2 className='font-semibold text-slate-800'>
											{coupon.description}
										</h2>
										<p className='text-sm text-slate-500 mt-1'>
											HSD: {coupon.expiredAt}
										</p>
										<p className='text-sm text-slate-400 mt-1'>
											Mã: {coupon.code}
										</p>
									</div>
								</div>
							</Card>
						),
					)}
				</div>
			</div>
		</div>
	);
}
