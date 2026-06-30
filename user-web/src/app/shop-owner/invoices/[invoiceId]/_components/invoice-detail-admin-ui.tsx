import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableHeader,
	TableRow,
	TableHead,
	TableBody as TableBodyUi, // Đổi alias nhẹ để tránh trùng lặp nếu cần, hoặc giữ nguyên TableBody
	TableCell,
} from '@/components/ui/table';
import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import { JSX } from 'react';
import Image from 'next/image';
import { getPaymentMethodLabel } from '@/utils/invoices/payment-method-label';
import { InvoiceStatusBadge } from '@/components/invoices/invoice-status-badge';
import { ShippingStatusBadge } from '@/components/invoices/shipping-status-badge';

interface Props {
	invoice: InvoiceDetail;
}

export default function InvoiceDetailAdminUi({ invoice }: Props): JSX.Element {
	return (
		<div className='space-y-6'>
			{/* HEADER */}
			<Card>
				<CardHeader>
					<CardTitle>Hóa đơn #{invoice.invoiceId}</CardTitle>
				</CardHeader>

				<CardContent className='grid grid-cols-2 gap-6'>
					<div className='space-y-2'>
						<div>
							<strong>Ngày tạo:</strong>{' '}
							{new Date(invoice.createdAt).toLocaleString()}
						</div>

						<div>
							<strong>Thanh toán:</strong>{' '}
							{/* Đã FIX: invoice.paymentMethod -> invoice.payment.paymentMethod */}
							{getPaymentMethodLabel(invoice.payment.paymentMethod)}
						</div>

						<div>
							<strong>Trạng thái hóa đơn:</strong>{' '}
							<InvoiceStatusBadge status={invoice.status} />
						</div>

						<div>
							<strong>Trạng thái giao hàng:</strong>{' '}
							{/* Đã FIX: invoice.shippingStatus -> invoice.delivery.shippingStatus */}
							<ShippingStatusBadge status={invoice.delivery.shippingStatus} />
						</div>
					</div>

					<div className='space-y-2'>
						<div>
							{/* Đã FIX: invoice.trackingCode -> invoice.delivery.trackingCode */}
							<strong>Mã vận đơn:</strong> {invoice.delivery.trackingCode}
						</div>

						<div>
							{/* Đã FIX: invoice.estimatedDelivery -> invoice.delivery.estimatedDelivery */}
							<strong>Dự kiến giao:</strong>{' '}
							{new Date(invoice.delivery.estimatedDelivery).toLocaleDateString()}
						</div>

						{/* Đã FIX: invoice.paidAt -> invoice.payment.paidAt */}
						{invoice.payment.paidAt && (
							<div>
								<strong>Thanh toán lúc:</strong>{' '}
								{new Date(invoice.payment.paidAt).toLocaleString()}
							</div>
						)}

						{invoice.completedAt && (
							<div>
								<strong>Hoàn tất:</strong>{' '}
								{new Date(invoice.completedAt).toLocaleString()}
							</div>
						)}

						{invoice.cancelledAt && (
							<div>
								<strong>Đã hủy:</strong>{' '}
								{new Date(invoice.cancelledAt).toLocaleString()}
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* SHIPPING INFO */}
			<Card>
				<CardHeader>
					<CardTitle>Thông tin người nhận</CardTitle>
				</CardHeader>

				<CardContent className='space-y-2'>
					<p>
						{/* Đã FIX: invoice.recipientName -> invoice.delivery.recipientName */}
						<strong>Người nhận:</strong> {invoice.delivery.recipientName}
					</p>

					<p>
						{/* Đã FIX: invoice.recipientPhone -> invoice.delivery.recipientPhone */}
						<strong>SĐT:</strong> {invoice.delivery.recipientPhone}
					</p>

					<p>
						{/* Đã FIX: invoice.address -> invoice.delivery.address */}
						<strong>Địa chỉ:</strong> {invoice.delivery.address}
					</p>
				</CardContent>
			</Card>

			{/* PRODUCTS */}
			<Card>
				<CardHeader>
					<CardTitle>Sản phẩm</CardTitle>
				</CardHeader>

				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Sản phẩm</TableHead>
								<TableHead>Giá</TableHead>
								<TableHead>Số lượng</TableHead>
								<TableHead>Giảm giá</TableHead>
								<TableHead>Tổng</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{invoice.items.map((item) => (
								<TableRow key={item.productId}>
									<TableCell className='flex items-center gap-3'>
										<Image
											src={item.imageUrl}
											alt={item.productName}
											width={50}
											height={50}
											className='h-12 w-12 aspect-square object-cover rounded-full border border-gray-200'
										/>

										<span>{item.productName}</span>
									</TableCell>

									<TableCell>{item.price.toLocaleString()} đ</TableCell>

									<TableCell>{item.quantity}</TableCell>

									<TableCell>
										{item.discount
											? `${item.discount.toLocaleString()} đ`
											: '-'}
									</TableCell>

									<TableCell className='font-medium'>
										{item.totalPrice.toLocaleString()} đ
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* TOTAL */}
			<Card>
				<CardHeader>
					<CardTitle>Tổng thanh toán</CardTitle>
				</CardHeader>

				<CardContent className='space-y-2 max-w-sm'>
					<div className='flex justify-between'>
						<span>Tạm tính</span>
						<span>{invoice.subTotal.toLocaleString()} đ</span>
					</div>

					<div className='flex justify-between'>
						<span>Phí vận chuyển</span>
						{/* Đã FIX: invoice.shippingFee -> invoice.delivery.shippingFee */}
						<span>{invoice.delivery.shippingFee.toLocaleString()} đ</span>
					</div>

					<div className='flex justify-between'>
						<span>Giảm giá</span>
						<span>-{invoice.discountAmount.toLocaleString()} đ</span>
					</div>

					<div className='flex justify-between font-bold text-lg border-t pt-2'>
						<span>Tổng cộng</span>
						<span>{invoice.grandTotal.toLocaleString()} đ</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
