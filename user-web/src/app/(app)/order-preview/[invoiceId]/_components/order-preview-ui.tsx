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
import { PaymentInfo } from '@/types/invoices/user/PaymentInfo';
import { RecipientInfo } from '@/types/invoices/user/RecipientInfo';
import { OrderLogicReturn } from '@/hooks/carts/use-checkout-preview-logic';

interface OrderPreviewUIProps extends OrderLogicReturn {
	recipientInfo: RecipientInfo;
	paymentInfo: PaymentInfo;
	invoiceId: string;
}

export default function OrderPreviewUI({
	items,
	total,
	recipientInfo,
	paymentInfo,
	handleBack: onBack,
	handleCheckout,
	invoiceId,
}: OrderPreviewUIProps): JSX.Element {
	if (!items.length) {
		return (
			<div className='text-center py-10 text-muted-foreground'>
				Không có sản phẩm nào để thanh toán.
			</div>
		);
	}

	return (
		<div className='pt-5'>
			<h5 className='text-2xl font-bold mb-6'>Xác nhận đơn hàng</h5>

			<div className='border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm p-6'>
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
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 p-6 bg-slate-50 border border-slate-100 rounded-xl'>
				{/* Thông tin người nhận */}
				<div className='space-y-3'>
					<h3 className='text-lg font-bold text-slate-800 border-b pb-2'>
						Thông tin người nhận
					</h3>
					<div className='text-sm space-y-2 text-slate-600'>
						<p>
							<span className='font-semibold text-slate-700'>Họ và tên:</span>{' '}
							{recipientInfo.recipientName}
						</p>
						<p>
							<span className='font-semibold text-slate-700'>Số điện thoại:</span>{' '}
							{recipientInfo.recipientPhone}
						</p>
						<p>
							<span className='font-semibold text-slate-700'>Địa chỉ giao hàng:</span>{' '}
							{recipientInfo.address}
						</p>
					</div>
				</div>

				{/* Thông tin tiền của đơn hàng */}
				<div className='space-y-3'>
					<h3 className='text-lg font-bold text-slate-800 border-b pb-2 md:text-right'>
						Chi tiết thanh toán
					</h3>
					<div className='text-sm space-y-2 text-slate-600'>
						<div className='flex justify-between'>
							<span>Tổng tiền hàng:</span>
							<span>{paymentInfo.totalAmount.toLocaleString('vi-VN')} ₫</span>
						</div>
						<div className='flex justify-between'>
							<span>Phí vận chuyển:</span>
							<span>+{paymentInfo.shippingFee.toLocaleString('vi-VN')} ₫</span>
						</div>
						<div className='flex justify-between text-rose-600'>
							<span>Giảm giá bộ lọc/Khuyến mãi:</span>
							<span>-{paymentInfo.discountAmount.toLocaleString('vi-VN')} ₫</span>
						</div>
						<div className='flex justify-between border-t pt-3 font-bold text-base text-slate-900'>
							<span>Tổng số tiền thanh toán:</span>
							<span className='text-xl text-emerald-600'>
								{paymentInfo.finalAmount.toLocaleString('vi-VN')} ₫
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className='mt-6 flex justify-end gap-3'>
				<Button
					variant='outline'
					onClick={onBack}
				>
					Quay lại giỏ hàng
				</Button>
				<button onClick={() => handleCheckout(invoiceId)}>Xác nhận đặt hàng</button>
			</div>
		</div>
	);
}
