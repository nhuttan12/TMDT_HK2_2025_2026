import { JSX } from 'react';
import InvoiceDetailAdmin from '@/app/admin/invoices/[invoiceID]/_components/invoice-detail-admin';
import { InvoiceDetail } from '@/types/invoices/user/InvoiceDetail';

const mockInvoice: InvoiceDetail = {
	invoiceID: 1024,
	createdAt: '2026-03-12T10:20:00',
	paidAt: '2026-03-12T10:22:00',
	completedAt: undefined,
	cancelledAt: undefined,

	status: 'PAID',
	shippingStatus: 'SHIPPING',

	paymentMethod: 'VNPAY',

	recipientName: 'Nguyễn Văn A',
	recipientPhone: '0901234567',
	address: 'Quận 1, TP Hồ Chí Minh',

	trackingCode: 'GHN845923452',
	estimatedDelivery: '2026-03-17T00:00:00',

	items: [
		{
			productID: 1,
			productName: 'Mechanical Keyboard RK84',
			imageUrl:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJY_rdiAA2nRvjtwKfi_mz4VB9_GlS7wGVcg&s',
			price: 1200000,
			quantity: 1,
			discount: 100000,
			subTotal: 1200000,
			totalPrice: 1100000,
		},
		{
			productID: 2,
			productName: 'Logitech G Pro X Superlight',
			imageUrl:
				'https://product.hstatic.net/200000722513/product/3_7c1bf2ff4e504450a42de78e6cc48087.jpg',
			price: 1500000,
			quantity: 1,
			discount: 200000,
			subTotal: 1500000,
			totalPrice: 1300000,
		},
		{
			productID: 3,
			productName: 'Artisan Mousepad',
			imageUrl:
				'https://cdn.hstatic.net/products/200000637319/image_-_2025-08-05t092620.319_e4af81103b9d42d8a44230ec64a29ea8_master.png',
			price: 500000,
			quantity: 2,
			subTotal: 1000000,
			totalPrice: 1000000,
		},
	],

	subTotal: 3700000,
	shippingFee: 30000,
	discountAmount: 300000,
	grandTotal: 3430000,
};

export default function Page(): JSX.Element {
	return <InvoiceDetailAdmin invoice={mockInvoice} />;
}
