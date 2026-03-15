import { InvoiceItem } from './InvoiceItem';
import { InvoiceStatus } from './InvoiceStatus';
import { PaymentMethod } from './PaymentMethod';
import { ShippingStatus } from './ShippingStatus';

export interface InvoiceDetail {
	invoiceID: number;
	createdAt: string;
	paidAt?: string;
	cancelledAt?: string;
	completedAt?: string;

	status: InvoiceStatus;
	shippingStatus: ShippingStatus;

	paymentMethod: PaymentMethod;

	recipientName: string;
	recipientPhone: string;
	address: string;

	items: InvoiceItem[];

	subTotal: number;
	shippingFee: number;
	discountAmount: number;
	grandTotal: number;

	trackingCode: string;
	estimatedDelivery: string;
}
