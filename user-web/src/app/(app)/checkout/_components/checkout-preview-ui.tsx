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
import Image from 'next/image';
import { JSX } from 'react';
import { CheckoutLogicReturn } from '@/hooks/carts/use-checkout-preview-logic';

type CheckoutPreviewUIProps = CheckoutLogicReturn;

export default function CheckoutPreviewUI({
	items,
	total,
	handleBack: onBack,
	handleOrder: onRedirectToOrder,
}: CheckoutPreviewUIProps): JSX.Element {
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
					onClick={onBack}
				>
					Quay lại giỏ hàng
				</Button>

				<Button onClick={onRedirectToOrder}>Xác nhận đặt hàng</Button>
			</div>
		</>
	);
}
