'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { JSX } from 'react';

export default function ThankYouPage(): JSX.Element {
	return (
		<div className='min-h-screen flex items-center justify-center bg-muted/40 p-6'>
			<Card className='w-full max-w-lg shadow-lg rounded-2xl'>
				<CardHeader className='text-center space-y-4'>
					<div className='flex justify-center'>
						<div className='bg-green-100 text-green-600 p-4 rounded-full'>
							<CheckCircle2 className='h-10 w-10' />
						</div>
					</div>
					<CardTitle className='text-2xl font-bold text-green-600'>
						Thanh toán thành công!
					</CardTitle>
					<p className='text-muted-foreground text-sm'>
						Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận và đang được xử
						lý.
					</p>
				</CardHeader>

				<Separator />

				<CardContent className='space-y-6 pt-6'>
					<div className='text-sm text-muted-foreground text-center'>
						Chúng tôi đã gửi email xác nhận đến bạn. Bạn có thể theo dõi trạng thái đơn
						hàng trong tài khoản.
					</div>

					<div className='flex flex-col sm:flex-row gap-3'>
						<Button
							asChild
							className='flex-1'
						>
							<Link href='/profile/invoices'>
								<span className='text-white'>Xem đơn hàng</span>
							</Link>
						</Button>

						<Button
							asChild
							variant='outline'
							className='flex-1'
						>
							<Link href='/'>Tiếp tục mua sắm</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
