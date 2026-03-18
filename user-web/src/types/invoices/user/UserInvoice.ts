import { InvoiceStatus } from './InvoiceStatus';

export interface UserInvoice {
	id: number;
	createdAt: string;

	status: InvoiceStatus;
	paymentMethod: string;

	totalAmount: number;
	totalItems: number;
}
