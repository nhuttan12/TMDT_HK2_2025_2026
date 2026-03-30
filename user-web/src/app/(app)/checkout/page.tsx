'use client';

import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { CartItem } from '@/types/carts/CartItem';
import Image from 'next/image';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckoutStore } from '@/stores/checkout.store';

export default function CheckoutPreview() {
	const router = useRouter();
	const items: CartItem[] = useCheckoutStore((s) => s.items);

	const total = useMemo(() => {
		return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
	}, [items]);

	if (!items.length) {
		return (
			<div className='text-center py-10 text-muted-foreground'>
				Không có sản phẩm nào để thanh toán.
			</div>
		);
	}

	return (
		<>
			<h2 className='text-2xl font-bold mb-6'>Xác nhận đơn hàng</h2>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Sản phẩm</TableHead>
						<TableHead>Giá</TableHead>
						<TableHead className='text-center'>Số lượng</TableHead>
						<TableHead className='text-right'>Thành tiền</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{items.map((item) => (
						<TableRow key={item.productId}>
							<TableCell className='flex items-center gap-3'>
								<Image
									src={item.imageUrl}
									alt={item.name}
									width={60}
									height={60}
									className='rounded-md'
								/>
								<span className='font-medium'>{item.name}</span>
							</TableCell>

							<TableCell>{item.price.toLocaleString('vi-VN')} ₫</TableCell>

							<TableCell className='text-center'>{item.quantity}</TableCell>

							<TableCell className='text-right font-semibold'>
								{(item.price * item.quantity).toLocaleString('vi-VN')} ₫
							</TableCell>
						</TableRow>
					))}
				</TableBody>

				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Tổng cộng</TableCell>
						<TableCell className='text-right font-bold text-lg'>
							{total.toLocaleString('vi-VN')} ₫
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>

			<div className='mt-6 flex justify-end gap-3'>
				<Button
					variant='outline'
					onClick={() => router.back()}
				>
					Quay lại giỏ hàng
				</Button>

				<Button
					onClick={() => {
						// TODO: call API create order
						router.push('/orders/success');
					}}
				>
					Xác nhận đặt hàng
				</Button>
			</div>
		</>
	);
}
