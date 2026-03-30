'use client';

import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import { getInvoiceStatusLabel } from '@/types/invoices/user/InvoiceStatus';
import { getPaymentMethodLabel } from '@/types/invoices/user/PaymentMethod';
import { getShippingStatusLabel } from '@/types/invoices/user/ShippingStatus';

interface Props {
	invoice: InvoiceDetail;
}

export default function InvoiceDetailClient({ invoice }: Props) {
	const formatDate = (date?: string) => (date ? new Date(date).toLocaleString('vi-VN') : '-');

	const formatMoney = (amount: number) => amount.toLocaleString('vi-VN') + ' ₫';

	return (
		<div className='w-full mx-auto p-6 space-y-8 bg-slate-50 min-h-screen'>
			{/* HEADER */}
			<div className='bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold text-slate-800'>
						Hóa đơn #{invoice.invoiceId}
					</h1>
					<p className='text-slate-500 mt-1'>Ngày tạo: {formatDate(invoice.createdAt)}</p>
				</div>

				<span className='px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-medium'>
					{getInvoiceStatusLabel(invoice.status) || 'Không xác định'}
				</span>
			</div>

			{/* THÔNG TIN NGƯỜI NHẬN */}
			<div className='bg-white rounded-xl shadow-sm border border-slate-200 p-6'>
				<h2 className='text-lg font-semibold text-slate-700 mb-4'>Thông tin giao hàng</h2>

				<div className='grid md:grid-cols-2 gap-4 text-slate-600'>
					<div>
						<p className='font-medium text-slate-800'>Người nhận</p>
						<p>{invoice.recipientName}</p>
					</div>

					<div>
						<p className='font-medium text-slate-800'>Số điện thoại</p>
						<p>{invoice.recipientPhone}</p>
					</div>

					<div className='md:col-span-2'>
						<p className='font-medium text-slate-800'>Địa chỉ</p>
						<p>{invoice.address}</p>
					</div>

					<div>
						<p className='font-medium text-slate-800'>Phương thức thanh toán</p>
						<p>
							{getPaymentMethodLabel(invoice.paymentMethod) ?? invoice.paymentMethod}
						</p>
					</div>

					<div>
						<p className='font-medium text-slate-800'>Trạng thái vận chuyển</p>
						<p>
							{getShippingStatusLabel(invoice.shippingStatus) ??
								invoice.shippingStatus ??
								'-'}
						</p>
					</div>
				</div>
			</div>

			{/* DANH SÁCH SẢN PHẨM */}
			<div className='bg-white rounded-xl shadow-sm border border-slate-200 p-6'>
				<h2 className='text-lg font-semibold text-slate-700 mb-4'>Sản phẩm</h2>

				<div className='divide-y divide-slate-200'>
					{invoice.items.map((item) => (
						<div
							key={item.productId}
							className='flex justify-between py-4'
						>
							<div>
								<p className='font-medium text-slate-800'>{item.productName}</p>
								<p className='text-sm text-slate-500'>Số lượng: {item.quantity}</p>
							</div>

							<div className='text-right'>
								<p className='text-slate-600'>{formatMoney(item.price)}</p>
								<p className='font-semibold text-slate-800'>
									{formatMoney(item.subTotal)}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* TỔNG KẾT THANH TOÁN */}
			<div className='bg-white rounded-xl shadow-sm border border-slate-200 p-6'>
				<h2 className='text-lg font-semibold text-slate-700 mb-4'>Thanh toán</h2>

				<div className='space-y-2 text-slate-600'>
					<div className='flex justify-between'>
						<span>Tạm tính</span>
						<span>{formatMoney(invoice.subTotal)}</span>
					</div>

					<div className='flex justify-between'>
						<span>Phí vận chuyển</span>
						<span>{formatMoney(invoice.shippingFee)}</span>
					</div>

					<div className='flex justify-between text-red-500'>
						<span>Giảm giá</span>
						<span>- {formatMoney(invoice.discountAmount)}</span>
					</div>

					<hr className='my-3 border-slate-200' />

					<div className='flex justify-between text-lg font-bold text-slate-800'>
						<span>Tổng cộng</span>
						<span>{formatMoney(invoice.grandTotal)}</span>
					</div>
				</div>
			</div>

			{/* TRACKING */}
			{invoice.trackingCode && (
				<div className='bg-white rounded-xl shadow-sm border border-slate-200 p-6'>
					<h2 className='text-lg font-semibold text-slate-700 mb-4'>Theo dõi đơn hàng</h2>

					<p className='text-slate-600'>
						Mã vận đơn:{' '}
						<span className='font-medium text-slate-800'>{invoice.trackingCode}</span>
					</p>

					<p className='text-slate-600 mt-2'>
						Dự kiến giao:{' '}
						<span className='font-medium text-slate-800'>
							{formatDate(invoice.estimatedDelivery)}
						</span>
					</p>
				</div>
			)}
		</div>
	);
}
