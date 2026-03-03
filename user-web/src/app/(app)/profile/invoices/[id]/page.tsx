import { InvoiceDetail } from '@/types/invoices/InvoiceDetail';
import InvoiceDetailClient from './_components/invoices-detail-client';

interface Props {
	params: { invoiceID: string };
}

const mockInvoiceDetail: InvoiceDetail = {
	invoiceID: 1024,
	createdAt: '2026-02-20T10:15:00Z',
	paidAt: '2026-02-20T10:17:32Z',
	completedAt: '2026-02-23T15:45:00Z',

	status: 'COMPLETED',
	shippingStatus: 'DELIVERED',

	paymentMethod: 'BANK_TRANSFER',

	recipientName: 'Nguyễn Nhựt Tân',
	recipientPhone: '0901234567',
	address: '123 Lý Thường Kiệt, Quận 10, TP.HCM',

	items: [
		{
			productID: 11,
			productName: 'Tai nghe Bluetooth Sony WH-1000XM5',
			imageUrl: '/images/products/sony-wh1000xm5.jpg',
			price: 7500000,
			quantity: 1,
			subTotal: 7500000,
			discount: 500000,
			totalPrice: 7000000,
		},
		{
			productID: 25,
			productName: 'Chuột Logitech MX Master 3S',
			imageUrl: '/images/products/logitech-mx-master-3s.jpg',
			price: 2900000,
			quantity: 1,
			subTotal: 2900000,
			discount: 200000,
			totalPrice: 2700000,
		},
	],

	subTotal: 10400000,
	shippingFee: 30000,
	discountAmount: 700000,
	grandTotal: 9730000,

	trackingCode: 'GHN123456789VN',
	estimatedDelivery: '2026-02-23T18:00:00Z',
};

export default function InvoiceDetailPage({ params }: Props) {
	return <InvoiceDetailClient invoice={mockInvoiceDetail} />;
}
