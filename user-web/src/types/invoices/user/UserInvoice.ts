import { InvoiceStatus } from './InvoiceStatus';
import { PaymentMethod } from './PaymentMethod';

export interface UserInvoice {
	id: string;
	createdAt: string;

	status: InvoiceStatus;
	paymentMethod: PaymentMethod;

	totalAmount: number;
	totalItems: number;
}

export interface BackEndUserInvoice {
	id: string;
	createdAt: string;

	status: string;
	paymentMethod: string;

	totalAmount: number;
	totalItems: number;
}
