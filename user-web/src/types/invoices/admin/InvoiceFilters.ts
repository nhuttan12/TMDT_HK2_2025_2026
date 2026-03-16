import { InvoiceStatus } from '@/types/invoices/user/InvoiceStatus';
import { PaymentMethod } from '@/types/invoices/user/PaymentMethod';

export interface InvoiceFilters {
	status?: InvoiceStatus;
	paymentMethod?: PaymentMethod;
	dateFrom?: string;
	dateTo?: string;
	minTotal?: string;
	maxTotal?: string;
	minItems?: string;
}
