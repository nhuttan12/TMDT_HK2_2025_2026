import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';
import { JSX } from 'react';
import Image from 'next/image';
import {getPaymentMethodLabel} from "@/utils/invoices/payment-method-label";
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
							{getPaymentMethodLabel(invoice.paymentMethod)}
						</div>

						<div>
							<strong>Trạng thái hóa đơn:</strong>{' '}
							<InvoiceStatusBadge status={invoice.status} />
						</div>

						<div>
							<strong>Trạng thái giao hàng:</strong>{' '}
							<ShippingStatusBadge status={invoice.shippingStatus} />
						</div>
					</div>

					<div className='space-y-2'>
						<div>
							<strong>Mã vận đơn:</strong> {invoice.trackingCode}
						</div>

						<div>
							<strong>Dự kiến giao:</strong>{' '}
							{new Date(invoice.estimatedDelivery).toLocaleDateString()}
						</div>

						{invoice.paidAt && (
							<div>
								<strong>Thanh toán lúc:</strong>{' '}
								{new Date(invoice.paidAt).toLocaleString()}
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
						<strong>Người nhận:</strong> {invoice.recipientName}
					</p>

					<p>
						<strong>SĐT:</strong> {invoice.recipientPhone}
					</p>

					<p>
						<strong>Địa chỉ:</strong> {invoice.address}
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
											className='rounded'
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
						<span>{invoice.shippingFee.toLocaleString()} đ</span>
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
