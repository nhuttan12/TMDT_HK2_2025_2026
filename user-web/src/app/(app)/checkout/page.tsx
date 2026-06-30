import { Metadata } from 'next';
import { JSX } from 'react';
import { CheckoutPaypal } from './_components/check-out-paypal';

export const metadata: Metadata = {
	title: 'Thanh toán sản phẩm',
};

export default function OrderReviewPage(): JSX.Element {
	// 1. Dữ liệu tĩnh giả định tổng tiền của hóa đơn (VND)
	const totalVND = 500000;

	// 2. Định nghĩa tỷ giá hối đoái (Ví dụ: 1 USD = 25,000 VND)
	// Trong thực tế, bạn nên gọi API để lấy tỷ giá realtime hoặc cấu hình trong database
	const exchangeRate = 25000;

	// 3. Quy đổi sang USD và làm tròn 2 chữ số thập phân (bắt buộc đối với PayPal)
	const totalUSD = (totalVND / exchangeRate).toFixed(2);

	return (
		<div className='mx-auto max-w-4xl p-6'>
			<h1 className='mb-6 text-3xl font-bold tracking-tight'>Kiểm tra đơn hàng</h1>

			<div className='grid gap-6 md:grid-cols-2'>
				{/* Khối hiển thị thông tin hóa đơn cho khách hàng */}
				<div className='rounded-lg border bg-card p-6 text-card-foreground shadow-sm'>
					<h2 className='mb-4 text-xl font-semibold'>Chi tiết thanh toán</h2>

					<div className='space-y-3'>
						<div className='flex justify-between'>
							<span className='text-muted-foreground'>Bể kính Terrarium Size M</span>
							<span className='font-medium'>450,000 ₫</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-muted-foreground'>Phí giao hàng</span>
							<span className='font-medium'>50,000 ₫</span>
						</div>

						<div className='my-4 h-px w-full bg-border' />

						<div className='flex justify-between text-lg font-bold'>
							<span>Tổng thanh toán</span>
							<span className='text-primary'>
								{totalVND.toLocaleString('vi-VN')} ₫
							</span>
						</div>
						<div className='flex justify-between text-sm'>
							<span className='text-muted-foreground'>Quy đổi ngoại tệ (USD)</span>
							<span className='text-muted-foreground'>${totalUSD}</span>
						</div>
					</div>
				</div>

				{/* Khối chứa nút thanh toán PayPal */}
				<div className='flex flex-col items-center justify-start'>
					{/* Gọi component bạn đã viết và truyền tiền USD vào prop */}
					<CheckoutPaypal totalAmount={totalUSD} />
				</div>
			</div>
		</div>
	);
}
